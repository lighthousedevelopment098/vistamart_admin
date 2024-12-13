import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for deals
const API_URL = `${apiConfig.admin}/deal-of-day`;
const { token } = getAuthData(); // Get the token for authorization

// Fetch deals
export const fetchDeals = createAsyncThunk(
  'dealOfTheDay/fetchDeals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Create deal
export const createDeal = createAsyncThunk(
  'dealOfTheDay/createDeal',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Update deal
export const updateDeal = createAsyncThunk(
  'dealOfTheDay/updateDeal',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Update deal status
export const updateDealStatus = createAsyncThunk(
  'dealOfTheDay/updateDealStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Adjust based on your API response structure
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete deal
export const deleteDeal = createAsyncThunk(
  'dealOfTheDay/deleteDeal',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the ID of the deleted deal
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state
const initialState = {
  deals: [],
  loading: false,
  error: null,
};

// Create slice
const dealOfTheDaySlice = createSlice({
  name: 'dealOfTheDay',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDeal = action.payload;
        state.deals = state.deals.map((deal) =>
          deal._id === updatedDeal._id ? updatedDeal : deal
        );
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateDealStatus.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        const dealId = action.payload;
        state.deals = state.deals.filter((deal) => deal._id !== dealId);
      });
  },
});

// Export the reducer
export default dealOfTheDaySlice.reducer;
