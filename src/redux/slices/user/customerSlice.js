// Helper function to make API calls with authorization
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for customers
const API_URL = `${apiConfig.user}/customers`;
const { token } = getAuthData(); 

// Async thunk to fetch customers
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains customers in data.doc
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Async thunk to update customer status (block/unblock)
export const updateCustomerStatus = createAsyncThunk(
  'customers/updateCustomerStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/status/${id}`, 
        { status }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("customer block response", response)
      return { id, status: response.data.status }; // Return the updated status
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Async thunk to delete a customer
export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the deleted customer's ID
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Async thunk to update customer details
export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async ({ id, customerData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`${API_URL}/${id}`, customerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Return the updated customer data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    // Synchronous actions if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch customers
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload; // Set the fetched customers
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update customer status
      .addCase(updateCustomerStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomerStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const existingCustomer = state.customers.find((customer) => customer._id === id);
        if (existingCustomer) {
          existingCustomer.status = status; // Update the status in the state
        }
        state.status = 'succeeded';
      })
      .addCase(updateCustomerStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update customer details
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const updatedCustomer = action.payload; // Get the updated customer data
        const index = state.customers.findIndex((customer) => customer._id === updatedCustomer._id);
        if (index !== -1) {
          state.customers[index] = updatedCustomer; // Update the customer in the state
        }
        state.status = 'succeeded';
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete customer
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = state.customers.filter((customer) => customer._id !== action.payload); // Remove the deleted customer from the state
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
