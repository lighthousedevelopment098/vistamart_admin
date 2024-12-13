// Helper function to make API calls with authorization
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for brands
const API_URL = `${apiConfig.admin}/brands`;

// Fetch brands
export const fetchBrands = createAsyncThunk(
  'brand/fetchBrands',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Get brand by ID
export const fetchBrandById = createAsyncThunk(
  'brand/fetchBrandById',
  async (brandId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.get(`${API_URL}/${brandId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Create brand
export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (brandData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.post(API_URL, brandData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update brand
export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async ({ brandId, brandData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); 
      const formData = new FormData();
      for (const key in brandData) {
        formData.append(key, brandData[key]);
      }

      const response = await axiosInstance.put(`${API_URL}/${brandId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update brand status
export const updateBrandStatus = createAsyncThunk(
  'brand/updateBrandStatus',
  async ({ brandId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.put(`${API_URL}/status/${brandId}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Delete brand
export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async (brandId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      await axiosInstance.delete(`${API_URL}/${brandId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return brandId;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  brands: [],
  currentBrand: null,
  loading: false,
  error: null,
};

// Create slice
const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBrand = action.payload;
      })
      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBrand = action.payload;
        state.brands = state.brands.map((b) =>
          b._id === updatedBrand._id ? updatedBrand : b
        );
        if (state.currentBrand && state.currentBrand._id === updatedBrand._id) {
          state.currentBrand = updatedBrand;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateBrandStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrandStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBrand = action.payload;
        state.brands = state.brands.map((b) =>
          b._id === updatedBrand._id ? updatedBrand : b
        );
        if (state.currentBrand && state.currentBrand._id === updatedBrand._id) {
          state.currentBrand = updatedBrand;
        }
      })
      .addCase(updateBrandStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        const brandId = action.payload;
        state.brands = state.brands.filter((b) => b._id !== brandId);
        if (state.currentBrand && state.currentBrand._id === brandId) {
          state.currentBrand = null;
        }
      });
  },
});

export default brandSlice.reducer;
