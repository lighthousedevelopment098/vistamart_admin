// Helper function to make API calls with authorization
import axiosInstance from '../../../../utils/axiosConfig'; // Axios instance with interceptors
import apiConfig from '../../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for categorywise API
const API_URL = `${apiConfig.admin}/categorywise `;

// Fetch categorywise data
export const fetchCategoryWise = createAsyncThunk(
  'categoryWise/fetchCategoryWise',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains categorywise data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create categorywise entry
export const createCategoryWise = createAsyncThunk(
  'categoryWise/createCategoryWise',
  async (categoryData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created category data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update categorywise entry
export const updateCategoryWise = createAsyncThunk(
  'categoryWise/updateCategoryWise',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const formData = new FormData();
      for (const key in categoryData) {
        formData.append(key, categoryData[key]);
      }
      const response = await axiosInstance.put(`${API_URL}/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated category data
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update categorywise status (e.g., publish or active/inactive)
export const updateCategoryWiseStatus = createAsyncThunk(
  'categoryWise/updateCategoryWiseStatus',
  async ({ categoryId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.patch(
        `${API_URL}/${categoryId}/status`, // Endpoint for updating status
        { status }, // Payload containing the status to update
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.doc; // Assuming the response contains the updated category
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Delete categorywise entry
export const deleteCategoryWise = createAsyncThunk(
  'categoryWise/deleteCategoryWise',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return categoryId; // Return the deleted category ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  categories: [], // Renamed from business to categories
  loading: false,
  updateStatus: 'idle', // To track update status ('idle', 'pending', 'success', 'error')
  error: null,
};

// Create slice
const categoryWiseSlice = createSlice({
  name: 'categoryWise', // Changed slice name
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = 'idle'; // Reset update status back to idle
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categorywise data
      .addCase(fetchCategoryWise.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryWise.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Renamed from business to categories
      })
      .addCase(fetchCategoryWise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create categorywise entry
      .addCase(createCategoryWise.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryWise.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Renamed from business to categories
      })
      .addCase(createCategoryWise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update categorywise entry
      .addCase(updateCategoryWise.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateCategoryWise.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedCategory = action.payload; // Renamed from business to category
        state.categories = state.categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category // Renamed from business to category
        );
      })
      .addCase(updateCategoryWise.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Update categorywise status
      .addCase(updateCategoryWiseStatus.pending, (state) => {
        state.updateStatus = 'pending'; // Set update status to pending
      })
      .addCase(updateCategoryWiseStatus.fulfilled, (state, action) => {
        state.updateStatus = 'success'; // Set update status to success
        const updatedCategory = action.payload; // Renamed from business to category
        state.categories = state.categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category // Renamed from business to category
        );
      })
      .addCase(updateCategoryWiseStatus.rejected, (state, action) => {
        state.updateStatus = 'error'; // Set update status to error
        state.error = action.payload || action.error.message;
      })
      // Delete categorywise entry
      .addCase(deleteCategoryWise.fulfilled, (state, action) => {
        const categoryId = action.payload; // Renamed from businessId to categoryId
        state.categories = state.categories.filter((category) => category._id !== categoryId); // Renamed from business to category
      });
  },
});

// Export the action to reset update status
export const { resetUpdateStatus } = categoryWiseSlice.actions;

export default categoryWiseSlice.reducer;
