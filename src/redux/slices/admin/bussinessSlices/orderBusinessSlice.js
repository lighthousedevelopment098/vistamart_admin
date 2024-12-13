// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for order business API
const API_URL = `${apiConfig.admin}/orderBusiness`;

// Fetch order business data
export const fetchOrderBusiness = createAsyncThunk(
  'orderBusiness/fetchOrderBusiness',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains order business data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create order business entry
export const createOrderBusiness = createAsyncThunk(
  'orderBusiness/createOrderBusiness',
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

// Update order business entry
export const updateOrderBusiness = createAsyncThunk(
  'orderBusiness/updateOrderBusiness',
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

// Update order business status (e.g., publish or active/inactive)
export const updateOrderStatus = createAsyncThunk(
  'orderBusiness/updateOrderStatus',
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

// Delete order business entry
export const deleteOrderBusiness = createAsyncThunk(
  'orderBusiness/deleteOrderBusiness',
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

// Initial state for order business
const initialState = {
  orders: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice for order business
const orderBusinessSlice = createSlice({
  name: 'orderBusiness',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch order business data
      .addCase(fetchOrderBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create order business entry
      .addCase(createOrderBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update order business entry
      .addCase(updateOrderBusiness.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateOrderBusiness.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderBusiness.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update order business status
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
      // Delete order business entry
      .addCase(deleteOrderBusiness.fulfilled, (state, action) => {
        const orderId = action.payload;
        state.orders = state.orders.filter((order) => order._id !== orderId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = orderBusinessSlice.actions;

export default orderBusinessSlice.reducer;
