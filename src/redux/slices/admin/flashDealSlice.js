import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for flash deals
const API_URL = `${apiConfig.admin}/flash-deals`;

// Fetch all flash deals
export const fetchFlashDeals = createAsyncThunk(
  'flashDeal/fetchFlashDeals',
  async (searchQuery = '', { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch flash deal by ID
export const fetchFlashDealById = createAsyncThunk(
  'flashDeal/fetchFlashDealById',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("flash deal by id ", response)
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Create a new flash deal
export const createFlashDeal = createAsyncThunk(
  'flashDeal/createFlashDeal',
  async (dealData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.post(API_URL, dealData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Delete a flash deal
export const deleteFlashDeal = createAsyncThunk(
  'flashDeal/deleteFlashDeal',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update a flash deal
export const updateFlashDeal = createAsyncThunk(
  'flashDeal/updateFlashDeal',
  async ({ id, dealData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.put(`${API_URL}/${id}`, dealData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update the status of a flash deal
export const updateFlashDealStatus = createAsyncThunk(
  'flashDeal/updateFlashDealStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.patch(`${API_URL}/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Add a product to a flash deal
export const addProductToFlashDeal = createAsyncThunk(
  'flashDeal/addProductToFlashDeal',
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.put(`${API_URL}/add-product/${id}`, { productId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Remove product from flash deal
export const removeProductFromFlashDeal = createAsyncThunk(
  'flashDeal/removeProductFromFlashDeal',
  async ({ id, productId }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData();
      const response = await axiosInstance.delete(`${API_URL}/${id}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      ErrorMessage(error.response?.data || error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for the slice
const initialState = {
  flashDeals: [],
  loading: false,
  error: null,
};

// Slice creation
const flashDealSlice = createSlice({
  name: 'flashDeal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch flash deals
      .addCase(fetchFlashDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlashDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.flashDeals = action.payload;
      })
      .addCase(fetchFlashDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Fetch flash deal by ID
      .addCase(fetchFlashDealById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlashDealById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.flashDeals.findIndex(deal => deal._id === action.payload._id);
        if (index !== -1) {
          state.flashDeals[index] = action.payload;
        }
      })
      .addCase(fetchFlashDealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create flash deal
      .addCase(createFlashDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFlashDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.flashDeals.push(action.payload);
      })
      .addCase(createFlashDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete flash deal
      .addCase(deleteFlashDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFlashDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.flashDeals = state.flashDeals.filter(deal => deal._id !== action.payload);
      })
      .addCase(deleteFlashDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update flash deal
      .addCase(updateFlashDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFlashDeal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.flashDeals.findIndex(deal => deal._id === action.payload._id);
        if (index !== -1) {
          state.flashDeals[index] = action.payload;
        }
      })
      .addCase(updateFlashDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update flash deal status
      .addCase(updateFlashDealStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFlashDealStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.flashDeals.findIndex(deal => deal._id === action.payload._id);
        if (index !== -1) {
          state.flashDeals[index] = action.payload;
        }
      })
      .addCase(updateFlashDealStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Add product to flash deal
      .addCase(addProductToFlashDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToFlashDeal.fulfilled, (state, action) => {
        state.loading = false;
        const dealIndex = state.flashDeals.findIndex(deal => deal._id === action.payload._id);
        if (dealIndex !== -1) {
          state.flashDeals[dealIndex] = action.payload;
        }
      })
      .addCase(addProductToFlashDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Remove product from flash deal
      .addCase(removeProductFromFlashDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductFromFlashDeal.fulfilled, (state, action) => {
        state.loading = false;
        const dealIndex = state.flashDeals.findIndex(deal => deal._id === action.payload._id);
        if (dealIndex !== -1) {
          state.flashDeals[dealIndex] = action.payload;
        }
      })
      .addCase(removeProductFromFlashDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default flashDealSlice.reducer;
