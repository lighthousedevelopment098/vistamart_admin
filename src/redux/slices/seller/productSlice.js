// Helper function to make API calls with authorization
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for vendors
const API_URL = `${apiConfig.seller}/products`;

// Fetch products with dynamic query parameters
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (searchParams = {}, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      const response = await axiosInstance.get(`${API_URL}`, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data; // Return the entire response data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      console.log(productId)
      const response = await axiosInstance.get(`${API_URL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.doc; // Accessing product data from the `doc` field
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      const response = await axiosInstance.post(`${API_URL}`, productData, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the headers
        }
      });
      console.log("Product created response:", response);
      return response.data.doc; // Ensure the response contains the created product
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      const response = await axiosInstance.put(`${API_URL}/${productId}`, productData, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the headers
        }
      });
      return response.data.doc; // Ensure the response contains the updated product
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      await axiosInstance.delete(`${API_URL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the headers
        }
      });
      return productId; // Return the deleted product ID
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Toggle featured status
export const toggleFeatured = createAsyncThunk(
  'product/toggleFeatured',
  async ({ productId, isFeatured }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      const response = await axiosInstance.put(`${API_URL}/${productId}/feature`, { isFeatured }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the headers
        }
      });
      return response.data.doc; // Ensure the response contains the updated product
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Update product status
export const updateProductStatus = createAsyncThunk(
  'product/updateProductStatus',
  async ({ productId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token
      const response = await axiosInstance.put(`${API_URL}/status/${productId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the headers
        }
      });
      return response.data.doc; // Ensure the response contains the updated product
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Utilize ErrorMessage utility
    }
  }
);

// Initial state
const initialState = {
  status: "", // Will store "success" or other status from the API response
  cached: false, // Will store the cached status
  results: 0, // Number of results returned
  products: [], // Array of product objects
  loading: false, // To indicate if data is being fetched
  error: null, 
};

// Create slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { status, cached, results, doc } = action.payload;
        state.status = status || "";
        state.cached = cached || false;
        state.results = results || 0;
        state.products = doc || []; // Update with the product list
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        );
        if (state.currentProduct && state.currentProduct._id === updatedProduct._id) {
          state.currentProduct = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        state.products = state.products.filter((p) => p._id !== productId);
        if (state.currentProduct && state.currentProduct._id === productId) {
          state.currentProduct = null;
        }
      })
      // Toggle featured status
      .addCase(toggleFeatured.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFeatured.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        );
        if (state.currentProduct && state.currentProduct._id === updatedProduct._id) {
          state.currentProduct = updatedProduct;
        }
      })
      .addCase(toggleFeatured.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update product status
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        );
        if (state.currentProduct && state.currentProduct._id === updatedProduct._id) {
          state.currentProduct = updatedProduct;
        }
      })
      .addCase(updateProductStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Export actions and reducer
export const productActions = productSlice.actions;
export default productSlice.reducer;
