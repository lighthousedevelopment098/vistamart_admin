// Helper function to make API calls with authorization
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for banners
const API_URL = `${apiConfig.admin}/banners`;

// Fetch banners
export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the banner data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create banner
export const createBanner = createAsyncThunk(
  'banner/createBanner',
  async (bannerData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.post(API_URL, bannerData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created banner
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update banner
export const updateBanner = createAsyncThunk(
  'banner/updateBanner',
  async ({ bannerId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
       console.log(bannerId, status);
       console.log(" status ===",status);
      const response = await axiosInstance.put(`${API_URL}/${bannerId}`, { publish: status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      consol.log("update banner response ===",response.data.doc);
      return response.data.doc; // Assuming the response contains the updated banner
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update banner status
export const updateBannerStatus = createAsyncThunk(
  'banner/updateBannerStatus',
  async ({ bannerId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      const response = await axiosInstance.put(`${API_URL}/publish/${bannerId}`, { publish: status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated banner
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Delete banner
export const deleteBanner = createAsyncThunk(
  'banner/deleteBanner',
  async (bannerId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Retrieve token for authorization
      await axiosInstance.delete(`${API_URL}/${bannerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return bannerId; // Return the deleted banner ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  banners: [],
  loading: false,
  error: null,
};

// Create slice
const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create banner
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banners.push(action.payload);
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update banner
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBanner = action.payload;
        state.banners = state.banners.map((banner) =>
          banner._id === updatedBanner._id ? updatedBanner : banner
        );
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update banner status
      .addCase(updateBannerStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBannerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBanner = action.payload;
        state.banners = state.banners.map((banner) =>
          banner._id === updatedBanner._id ? updatedBanner : banner
        );
      })
      .addCase(updateBannerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete banner
      .addCase(deleteBanner.fulfilled, (state, action) => {
        const bannerId = action.payload;
        state.banners = state.banners.filter((banner) => banner._id !== bannerId);
      });
  },
});

export default bannerSlice.reducer;
