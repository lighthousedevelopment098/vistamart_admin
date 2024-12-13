import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for deals
const API_URL = `${apiConfig.admin}/featured-deals`;

// Fetch all deals
export const fetchDeals = createAsyncThunk(
  'featureDeal/fetchDeals',
  async (searchQuery = '', { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token for authorization
      const response = await axiosInstance.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new deal
export const createDeal = createAsyncThunk(
  'featureDeal/createDeal',
  async (dealData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token for authorization
      const response = await axiosInstance.post(API_URL, dealData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update the status of a deal
export const updateDealStatus = createAsyncThunk(
  'featureDeal/updateDealStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token for authorization
      const response = await axiosInstance.put(`${API_URL}/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a deal
export const deleteDeal = createAsyncThunk(
  'featureDeal/deleteDeal',
  async (id, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Get the token for authorization
      await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // Return the ID of the deleted deal for removing it from state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state for the slice
const initialState = {
  deals: [],
  loading: false,
  error: null,
};

// Slice creation
const featureDealSlice = createSlice({
  name: 'featureDeal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch deals
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        ErrorMessage(action.payload); // Display error message
      })

      // Create deal
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        ErrorMessage(action.payload); // Display error message
      })

      // Update deal status
      .addCase(updateDealStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDealStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDeal = action.payload;
        state.deals = state.deals.map((deal) =>
          deal._id === updatedDeal._id ? updatedDeal : deal
        );
      })
      .addCase(updateDealStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        ErrorMessage(action.payload); // Display error message
      })

      // Delete deal
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = state.deals.filter(deal => deal._id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        ErrorMessage(action.payload); // Display error message
      });
  },
});

// Export the reducer
export default featureDealSlice.reducer;
