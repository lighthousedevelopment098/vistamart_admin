import axiosInstance from '../../../utils/axiosConfig'; // Import axiosInstance with interceptors
import apiConfig from '../../../config/apiConfig'; // Import apiConfig for API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; 
import { getAuthData } from '../../../utils/authHelper'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for subcategories
const API_URL = `${apiConfig.admin}/sub-categories`; // to use admin role

// Fetch subcategories
export const fetchSubCategories = createAsyncThunk(
  'subCategory/fetchSubCategories',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get token for authorization
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(ErrorMessage(error.response?.data) || error.message);
    }
  }
);

// Get subcategory by ID
export const fetchSubCategoryById = createAsyncThunk(
  'subCategory/fetchSubCategoryById',
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get token for authorization
      const response = await axiosInstance.get(`${API_URL}/${subCategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(ErrorMessage(error.response?.data) || error.message);
    }
  }
);

// Create subcategory
export const createSubCategory = createAsyncThunk(
  'subCategory/createSubCategory',
  async ({subCategoryData}, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get token for authorization
      const response = await axiosInstance.post(API_URL, subCategoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(ErrorMessage(error.response?.data) || error.message);
    }
  }
);

// Update subcategory
export const updateSubCategory = createAsyncThunk(
  'subCategory/updateSubCategory',
  async ({ subCategoryId, subCategoryData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get token for authorization
      const response = await axiosInstance.put(`${API_URL}/${subCategoryId}`, subCategoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(ErrorMessage(error.response?.data) || error.message);
    }
  }
);

// Update subcategory status
export const updateSubCategoryStatus = createAsyncThunk(
  'subCategory/updateSubCategoryStatus',
  async ({ subCategoryId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get token for authorization
      const response = await axiosInstance.put(`${API_URL}/${subCategoryId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(ErrorMessage(error.response?.data) || error.message);
    }
  }
);

// Delete subcategory
export const deleteSubCategory = createAsyncThunk(
  'subCategory/deleteSubCategory',
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get token for authorization
      await axiosInstance.delete(`${API_URL}/${subCategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return subCategoryId; // Return the ID of the deleted subcategory
    } catch (error) {
      return rejectWithValue(ErrorMessage(error.response?.data) || error.message);
    }
  }
);

// Initial state
const initialState = {
  subCategories: [],
  currentSubCategory: null,
  loading: false,
  error: null,
};

// Create slice
const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from ErrorMessage utility
      })
      .addCase(fetchSubCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending
      })
      .addCase(fetchSubCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubCategory = action.payload;
      })
      .addCase(fetchSubCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from ErrorMessage utility
      })
      .addCase(createSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories.push(action.payload);
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from ErrorMessage utility
      })
      .addCase(updateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubCategory = action.payload;
        state.subCategories = state.subCategories.map((s) =>
          s._id === updatedSubCategory._id ? updatedSubCategory : s
        );
        if (state.currentSubCategory && state.currentSubCategory._id === updatedSubCategory._id) {
          state.currentSubCategory = updatedSubCategory;
        }
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from ErrorMessage utility
      })
      .addCase(updateSubCategoryStatus.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error on pending
      })
      .addCase(updateSubCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubCategory = action.payload;
        state.subCategories = state.subCategories.map((s) =>
          s._id === updatedSubCategory._id ? updatedSubCategory : s
        );
        if (state.currentSubCategory && state.currentSubCategory._id === updatedSubCategory._id) {
          state.currentSubCategory = updatedSubCategory;
        }
      })
      .addCase(updateSubCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from ErrorMessage utility
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        const subCategoryId = action.payload;
        state.subCategories = state.subCategories.filter((s) => s._id !== subCategoryId);
        if (state.currentSubCategory && state.currentSubCategory._id === subCategoryId) {
          state.currentSubCategory = null;
        }
      });
  },
});

export default subCategorySlice.reducer;
