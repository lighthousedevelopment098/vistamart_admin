// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for product business API
const API_URL = `${apiConfig.admin}/productBusiness`;

// Fetch product business data
export const fetchProductBusiness = createAsyncThunk(
  'productBusiness/fetchProductBusiness',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains product business data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create product business entry
export const createProductBusiness = createAsyncThunk(
  'productBusiness/createProductBusiness',
  async (productData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created product data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update product business entry
export const updateProductBusiness = createAsyncThunk(
  'productBusiness/updateProductBusiness',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in productData) {
        formData.append(key, productData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated product data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update product business status (e.g., publish or active/inactive)
export const updateProductStatus = createAsyncThunk(
  'productBusiness/updateProductStatus',
  async ({ productId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${productId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated product
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete product business entry
export const deleteProductBusiness = createAsyncThunk(
  'productBusiness/deleteProductBusiness',
  async (productId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return productId; // Return the deleted product ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state for product business
const initialState = {
  products: [],
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice for product business
const productBusinessSlice = createSlice({
  name: 'productBusiness',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch product business data
      .addCase(fetchProductBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create product business entry
      .addCase(createProductBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update product business entry
      .addCase(updateProductBusiness.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateProductBusiness.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProductBusiness.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update product business status
      .addCase(updateProductStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete product business entry
      .addCase(deleteProductBusiness.fulfilled, (state, action) => {
        const productId = action.payload;
        state.products = state.products.filter((product) => product._id !== productId);
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = productBusinessSlice.actions;

export default productBusinessSlice.reducer;
