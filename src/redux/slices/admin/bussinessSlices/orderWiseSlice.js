// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for orderWise API
const API_URL = `${apiConfig.admin}/orderWise`;

// Fetch orderWise data
export const fetchOrderWise = createAsyncThunk(
  'orderWise/fetchOrderWise',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains orderWise data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create orderWise entry
export const createOrderWise = createAsyncThunk(
  'orderWise/createOrderWise',
  async (orderData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created order data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update orderWise entry
export const updateOrderWise = createAsyncThunk(
  'orderWise/updateOrderWise',
  async ({ orderId, orderData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in orderData) {
        formData.append(key, orderData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${orderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated order data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update orderWise status (e.g., active/inactive)
export const updateOrderStatus = createAsyncThunk(
  'orderWise/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${orderId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated order
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete orderWise entry
export const deleteOrderWise = createAsyncThunk(
  'orderWise/deleteOrderWise',
  async (orderId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return orderId; // Return the deleted order ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state for orderWise
const initialState = {
  orders: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice for orderWise
const orderWiseSlice = createSlice({
  name: 'orderWise',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orderWise data
      .addCase(fetchOrderWise.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderWise.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderWise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create orderWise entry
      .addCase(createOrderWise.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderWise.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderWise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update orderWise entry
      .addCase(updateOrderWise.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateOrderWise.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderWise.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update orderWise status
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete orderWise entry
      .addCase(deleteOrderWise.fulfilled, (state, action) => {
        const orderId = action.payload;
        state.orders = state.orders.filter((order) => order._id !== orderId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = orderWiseSlice.actions;

export default orderWiseSlice.reducer;
