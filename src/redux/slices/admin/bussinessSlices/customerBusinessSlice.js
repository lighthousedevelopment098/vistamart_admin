// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for customer business API
const API_URL = `${apiConfig.admin}/customerBusiness`;

// Fetch customer business data
export const fetchCustomerBusiness = createAsyncThunk(
  'customerBusiness/fetchCustomerBusiness',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains customer business data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create customer business entry
export const createCustomerBusiness = createAsyncThunk(
  'customerBusiness/createCustomerBusiness',
  async (businessData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, businessData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created customer business data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update customer business entry
export const updateCustomerBusiness = createAsyncThunk(
  'customerBusiness/updateCustomerBusiness',
  async ({ businessId, businessData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in businessData) {
        formData.append(key, businessData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${businessId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated customer business data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update customer business status (e.g., publish or active/inactive)
export const updateCustomerBusinessStatus = createAsyncThunk(
  'customerBusiness/updateCustomerBusinessStatus',
  async ({ businessId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${businessId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated customer business
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete customer business entry
export const deleteCustomerBusiness = createAsyncThunk(
  'customerBusiness/deleteCustomerBusiness',
  async (businessId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return businessId; // Return the deleted customer business ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  customerBusiness: [], // Changed to customerBusiness
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice
const customerBusinessSlice = createSlice({
  name: 'customerBusiness', // Slice name updated
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch customer business data
      .addCase(fetchCustomerBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.customerBusiness = action.payload; // Updated state to customerBusiness
      })
      .addCase(fetchCustomerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create customer business entry
      .addCase(createCustomerBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCustomerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.customerBusiness.push(action.payload); // Updated state to customerBusiness
      })
      .addCase(createCustomerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update customer business entry
      .addCase(updateCustomerBusiness.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateCustomerBusiness.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedBusiness = action.payload;
        state.customerBusiness = state.customerBusiness.map((business) => // Updated state to customerBusiness
          business._id === updatedBusiness._id ? updatedBusiness : business
        );
      })
      .addCase(updateCustomerBusiness.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update customer business status
      .addCase(updateCustomerBusinessStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateCustomerBusinessStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedBusiness = action.payload;
        state.customerBusiness = state.customerBusiness.map((business) => // Updated state to customerBusiness
          business._id === updatedBusiness._id ? updatedBusiness : business
        );
      })
      .addCase(updateCustomerBusinessStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete customer business entry
      .addCase(deleteCustomerBusiness.fulfilled, (state, action) => {
        const businessId = action.payload;
        state.customerBusiness = state.customerBusiness.filter((business) => business._id !== businessId); // Updated state to customerBusiness
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = customerBusinessSlice.actions;

export default customerBusinessSlice.reducer;
