// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for inHouseShop API
const API_URL = `${apiConfig.admin}/inHouseShop`;

// Fetch in-house shop data
export const fetchInHouseShop = createAsyncThunk(
  'inHouseShop/fetchInHouseShop',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains in-house shop data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create in-house shop entry
export const createInHouseShop = createAsyncThunk(
  'inHouseShop/createInHouseShop',
  async (shopData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, shopData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created in-house shop data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update in-house shop entry
export const updateInHouseShop = createAsyncThunk(
  'inHouseShop/updateInHouseShop',
  async ({ shopId, shopData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in shopData) {
        formData.append(key, shopData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${shopId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated in-house shop data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update in-house shop status (e.g., publish or active/inactive)
export const updateInHouseShopStatus = createAsyncThunk(
  'inHouseShop/updateInHouseShopStatus',
  async ({ shopId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${shopId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated in-house shop
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete in-house shop entry
export const deleteInHouseShop = createAsyncThunk(
  'inHouseShop/deleteInHouseShop',
  async (shopId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${shopId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return shopId; // Return the deleted shop ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  shops: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice
const inHouseShopSlice = createSlice({
  name: 'inHouseShop',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch in-house shop data
      .addCase(fetchInHouseShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInHouseShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(fetchInHouseShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create in-house shop entry
      .addCase(createInHouseShop.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInHouseShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops.push(action.payload);
      })
      .addCase(createInHouseShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update in-house shop entry
      .addCase(updateInHouseShop.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateInHouseShop.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedShop = action.payload;
        state.shops = state.shops.map((shop) =>
          shop._id === updatedShop._id ? updatedShop : shop
        );
      })
      .addCase(updateInHouseShop.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update in-house shop status
      .addCase(updateInHouseShopStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateInHouseShopStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedShop = action.payload;
        state.shops = state.shops.map((shop) =>
          shop._id === updatedShop._id ? updatedShop : shop
        );
      })
      .addCase(updateInHouseShopStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete in-house shop entry
      .addCase(deleteInHouseShop.fulfilled, (state, action) => {
        const shopId = action.payload;
        state.shops = state.shops.filter((shop) => shop._id !== shopId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = inHouseShopSlice.actions;

export default inHouseShopSlice.reducer;
