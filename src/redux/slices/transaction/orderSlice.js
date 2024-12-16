import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthData } from '../../../utils/authHelper';

// Use the transaction endpoint for orders
const API_URL = `${apiConfig.transaction}/orders`;


const { token } = getAuthData(); 

// Async thunk to fetch orders
export const fetchOrder = createAsyncThunk(
  'vendorOrder/fetchOrders',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return response.data.doc; // Assuming the response contains orders in data.doc
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Use ErrorMessage utility for error handling
    }
  }
);

// Async thunk to fetch orders with filters
export const fetchOrdersWithFilters = createAsyncThunk(
  'vendorOrder/fetchOrdersWithFilters',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); 

      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      return response.data.docs; // Assuming the response contains filtered orders in data.docs
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Use ErrorMessage utility for error handling
    }
  }
);

// Async thunk to fetch order by ID
export const fetchOrderById = createAsyncThunk(
  'vendorOrder/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); 

      const response = await axiosInstance.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      return response.data.doc; // Assuming the response contains the order in data.doc
      
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Use ErrorMessage utility for error handling
    }
  }
);

// Async thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  'vendorOrder/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); 
  
      const response = await axiosInstance.put(
        `${API_URL}/status/${orderId}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      return { orderId, status: response.data.status }; // Return the updated status
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Use ErrorMessage utility for error handling
    }
  }
);

// Async thunk to delete order
export const deleteOrder = createAsyncThunk(
  'vendorOrder/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); 

      await axiosInstance.delete(`${API_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      return orderId; // Return the deleted order ID
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Use ErrorMessage utility for error handling
    }
  }
);

// Async thunk to update an order
export const updateOrder = createAsyncThunk(
  'vendorOrder/updateOrder',
  async ({ orderId, trackingId }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();

      const response = await axiosInstance.put(
        `${API_URL}/${orderId}`,
        { trackingId: trackingId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      console.log("response update order", response)
      return response.data.doc; // Assuming the updated order is returned in data.doc
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Use ErrorMessage utility for error handling
    }
  }
);


const initialState = {
  orders: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

const vendorOrderSlice = createSlice({
  name: 'vendorOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload; // Set the fetched orders
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set error message
      })
      // Fetch orders with filters
      .addCase(fetchOrdersWithFilters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersWithFilters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload; // Set the filtered orders
      })
      .addCase(fetchOrdersWithFilters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set error message
      })
      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const order = action.payload;
        const index = state.orders.findIndex((o) => o._id === order._id);
        if (index !== -1) {
          state.orders[index] = order; // Update the order in the state
        } else {
          state.orders.push(order); // Add new order if not found
        }
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set error message
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const existingOrder = state.orders.find((order) => order._id === orderId);
        if (existingOrder) {
          existingOrder.orderStatus = status; // Update the order status in the state
        }
        state.status = 'succeeded';
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set error message
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const orderId = action.payload;
        state.orders = state.orders.filter((order) => order._id !== orderId); // Remove the deleted order from the state
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set error message
      })

        // Update order
    .addCase(updateOrder.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
      if (index !== -1) {
        state.orders[index] = updatedOrder; // Update the order in the state
      }
      state.status = 'succeeded';
    })
    .addCase(updateOrder.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set error message
    });
  },
});

export default vendorOrderSlice.reducer;
