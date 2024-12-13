// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for shipping methods API
const API_URL = `${apiConfig.admin}/shippinpMethod`;

// Fetch shipping methods data
export const fetchShippingMethods = createAsyncThunk(
  'shippingMethods/fetchShippingMethods',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains shipping method data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create shipping method entry
export const createShippingMethod = createAsyncThunk(
  'shippingMethods/createShippingMethod',
  async (shippingData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, shippingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created shipping data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update shipping method entry
export const updateShippingMethod = createAsyncThunk(
  'shippingMethods/updateShippingMethod',
  async ({ shippingId, shippingData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in shippingData) {
        formData.append(key, shippingData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${shippingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated shipping data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update shipping method status (e.g., active/inactive)
export const updateShippingStatus = createAsyncThunk(
  'shippingMethods/updateShippingStatus',
  async ({ shippingId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${shippingId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated shipping method
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete shipping method entry
export const deleteShippingMethod = createAsyncThunk(
  'shippingMethods/deleteShippingMethod',
  async (shippingId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${shippingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return shippingId; // Return the deleted shipping method ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  shippingMethods: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice
const shippingMethodsSlice = createSlice({
  name: 'shippingMethods',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch shipping methods data
      .addCase(fetchShippingMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShippingMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingMethods = action.payload;
      })
      .addCase(fetchShippingMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create shipping method entry
      .addCase(createShippingMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShippingMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingMethods.push(action.payload);
      })
      .addCase(createShippingMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update shipping method entry
      .addCase(updateShippingMethod.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateShippingMethod.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedShipping = action.payload;
        state.shippingMethods = state.shippingMethods.map((shipping) =>
          shipping._id === updatedShipping._id ? updatedShipping : shipping
        );
      })
      .addCase(updateShippingMethod.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update shipping method status
      .addCase(updateShippingStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateShippingStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedShipping = action.payload;
        state.shippingMethods = state.shippingMethods.map((shipping) =>
          shipping._id === updatedShipping._id ? updatedShipping : shipping
        );
      })
      .addCase(updateShippingStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete shipping method entry
      .addCase(deleteShippingMethod.fulfilled, (state, action) => {
        const shippingId = action.payload;
        state.shippingMethods = state.shippingMethods.filter(
          (shipping) => shipping._id !== shippingId
        );
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = shippingMethodsSlice.actions;
export default shippingMethodsSlice.reducer;
