// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for business general API
const API_URL = `${apiConfig.admin}/businessgeneral`;

// Fetch business data
export const fetchBusinessGeneral = createAsyncThunk(
  'businessGeneral/fetchBusinessGeneral',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains business general data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create business entry
export const createBusinessGeneral = createAsyncThunk(
  'businessGeneral/createBusinessGeneral',
  async (businessData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, businessData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created business data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update business entry
export const updateBusinessGeneral = createAsyncThunk(
  'businessGeneral/updateBusinessGeneral',
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
      return response.data.doc; // Assuming the response contains the updated business data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update business status (e.g., publish or active/inactive)
export const updateBusinessStatus = createAsyncThunk(
  'businessGeneral/updateBusinessStatus',
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
      return response.data.doc; // Assuming the response contains the updated business
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete business entry
export const deleteBusinessGeneral = createAsyncThunk(
  'businessGeneral/deleteBusinessGeneral',
  async (businessId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${businessId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return businessId; // Return the deleted business ID for frontend state update
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
const businessGeneralSlice = createSlice({
  name: 'businessGeneral',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch business data
      .addCase(fetchBusinessGeneral.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessGeneral.fulfilled, (state, action) => {
        state.loading = false;
        state.business = action.payload;
      })
      .addCase(fetchBusinessGeneral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create business entry
      .addCase(createBusinessGeneral.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBusinessGeneral.fulfilled, (state, action) => {
        state.loading = false;
        state.business.push(action.payload);
      })
      .addCase(createBusinessGeneral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update business entry
      .addCase(updateBusinessGeneral.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateBusinessGeneral.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedBusiness = action.payload;
        state.business = state.business.map((business) =>
          business._id === updatedBusiness._id ? updatedBusiness : business
        );
      })
      .addCase(updateBusinessGeneral.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update business status
      .addCase(updateBusinessStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateBusinessStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedBusiness = action.payload;
        state.business = state.business.map((business) =>
          business._id === updatedBusiness._id ? updatedBusiness : business
        );
      })
      .addCase(updateBusinessStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete business entry
      .addCase(deleteBusinessGeneral.fulfilled, (state, action) => {
        const businessId = action.payload;
        state.business = state.business.filter((business) => business._id !== businessId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = businessGeneralSlice.actions;

export default businessGeneralSlice.reducer;
