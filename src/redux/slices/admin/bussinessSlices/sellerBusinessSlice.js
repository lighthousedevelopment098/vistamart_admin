// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the seller endpoint for seller business general API
const API_URL = `${apiConfig.seller}/sellerBusiness`;

// Fetch seller business data
export const fetchSellerBusiness = createAsyncThunk(
  'sellerBusiness/fetchSellerBusiness',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains seller business data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create seller business entry
export const createSellerBusiness = createAsyncThunk(
  'sellerBusiness/createSellerBusiness',
  async (businessData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, businessData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created seller business data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update seller business entry
export const updateSellerBusiness = createAsyncThunk(
  'sellerBusiness/updateSellerBusiness',
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
      return response.data.doc; // Assuming the response contains the updated seller business data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update seller business status (e.g., publish or active/inactive)
export const updateSellerBusinessStatus = createAsyncThunk(
  'sellerBusiness/updateSellerBusinessStatus',
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
      return response.data.doc; // Assuming the response contains the updated seller business
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete seller business entry
export const deleteSellerBusiness = createAsyncThunk(
  'sellerBusiness/deleteSellerBusiness',
  async (businessId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return businessId; // Return the deleted seller business ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  business: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice
const sellerBusinessSlice = createSlice({
  name: 'sellerBusiness',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch seller business data
      .addCase(fetchSellerBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload;
      })
      .addCase(fetchSellerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create seller business entry
      .addCase(createSellerBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSellerBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.business.push(action.payload);
      })
      .addCase(createSellerBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update seller business entry
      .addCase(updateSellerBusiness.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateSellerBusiness.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedBusiness = action.payload;
        state.business = state.business.map((business) =>
          business._id === updatedBusiness._id ? updatedBusiness : business
        );
      })
      .addCase(updateSellerBusiness.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update seller business status
      .addCase(updateSellerBusinessStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateSellerBusinessStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedBusiness = action.payload;
        state.business = state.business.map((business) =>
          business._id === updatedBusiness._id ? updatedBusiness : business
        );
      })
      .addCase(updateSellerBusinessStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete seller business entry
      .addCase(deleteSellerBusiness.fulfilled, (state, action) => {
        const businessId = action.payload;
        state.business = state.business.filter((business) => business._id !== businessId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = sellerBusinessSlice.actions;

export default sellerBusinessSlice.reducer;
