// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for delivery man API
const API_URL = `${apiConfig.admin}/deliveryMan`;

// Fetch delivery man data
export const fetchDeliveryMen = createAsyncThunk(
  'deliveryMan/fetchDeliveryMen',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains delivery man data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create delivery man entry
export const createDeliveryMan = createAsyncThunk(
  'deliveryMan/createDeliveryMan',
  async (deliveryData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, deliveryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created delivery man data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update delivery man entry
export const updateDeliveryMan = createAsyncThunk(
  'deliveryMan/updateDeliveryMan',
  async ({ deliveryId, deliveryData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in deliveryData) {
        formData.append(key, deliveryData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${deliveryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated delivery man data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update delivery man status (e.g., active/inactive)
export const updateDeliveryManStatus = createAsyncThunk(
  'deliveryMan/updateDeliveryManStatus',
  async ({ deliveryId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${deliveryId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated delivery man
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete delivery man entry
export const deleteDeliveryMan = createAsyncThunk(
  'deliveryMan/deleteDeliveryMan',
  async (deliveryId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${deliveryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return deliveryId; // Return the deleted delivery ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  deliveryMen: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice
const deliveryManSlice = createSlice({
  name: 'deliveryMan',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch delivery man data
      .addCase(fetchDeliveryMen.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeliveryMen.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryMen = action.payload;
      })
      .addCase(fetchDeliveryMen.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create delivery man entry
      .addCase(createDeliveryMan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDeliveryMan.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryMen.push(action.payload);
      })
      .addCase(createDeliveryMan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update delivery man entry
      .addCase(updateDeliveryMan.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateDeliveryMan.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedDeliveryMan = action.payload;
        state.deliveryMen = state.deliveryMen.map((deliveryMan) =>
          deliveryMan._id === updatedDeliveryMan._id ? updatedDeliveryMan : deliveryMan
        );
      })
      .addCase(updateDeliveryMan.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update delivery man status
      .addCase(updateDeliveryManStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateDeliveryManStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedDeliveryMan = action.payload;
        state.deliveryMen = state.deliveryMen.map((deliveryMan) =>
          deliveryMan._id === updatedDeliveryMan._id ? updatedDeliveryMan : deliveryMan
        );
      })
      .addCase(updateDeliveryManStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete delivery man entry
      .addCase(deleteDeliveryMan.fulfilled, (state, action) => {
        const deliveryId = action.payload;
        state.deliveryMen = state.deliveryMen.filter((deliveryMan) => deliveryMan._id !== deliveryId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = deliveryManSlice.actions;

export default deliveryManSlice.reducer;
