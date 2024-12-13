// Helper function to make API calls with authorization
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Use the admin endpoint for subscribers
const API_URL = `${apiConfig.user}/subscribers`;

// Fetch subscribers
export const fetchSubscribers = createAsyncThunk(
  'subscriber/fetchSubscribers',
  async (searchParams, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Get subscriber by ID
export const fetchSubscriberById = createAsyncThunk(
  'subscriber/fetchSubscriberById',
  async (subscriberId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.get(`${API_URL}/${subscriberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Create subscriber
export const createSubscriber = createAsyncThunk(
  'subscriber/createSubscriber',
  async (subscriberData, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.post(API_URL, subscriberData, {
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

// Update subscriber
export const updateSubscriber = createAsyncThunk(
  'subscriber/updateSubscriber',
  async ({ subscriberId, subscriberData }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); 
      const formData = new FormData();
      for (const key in subscriberData) {
        formData.append(key, subscriberData[key]);
      }

      const response = await axiosInstance.put(`${API_URL}/${subscriberId}`, formData, {
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

// Update subscriber status
export const updateSubscriberStatus = createAsyncThunk(
  'subscriber/updateSubscriberStatus',
  async ({ subscriberId, status }, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      const response = await axiosInstance.put(`${API_URL}/status/${subscriberId}`, { status }, {
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

// Delete subscriber
export const deleteSubscriber = createAsyncThunk(
  'subscriber/deleteSubscriber',
  async (subscriberId, { rejectWithValue }) => {
    try {
      const { token } = getAuthData(); // Use getAuthData to retrieve token
      await axiosInstance.delete(`${API_URL}/${subscriberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return subscriberId;
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  subscribers: [],
  currentSubscriber: null,
  loading: false,
  error: null,
};

// Create slice
const subscriberSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers = action.payload.doc; // Assuming response has a 'doc' field with subscribers
        state.createAt = action.payload.createAt;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchSubscriberById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriberById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscriber = action.payload;
      })
      .addCase(fetchSubscriberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createSubscriber.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers.push(action.payload);
      })
      .addCase(createSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateSubscriber.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscriber.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubscriber = action.payload;
        state.subscribers = state.subscribers.map((s) =>
          s._id === updatedSubscriber._id ? updatedSubscriber : s
        );
        if (state.currentSubscriber && state.currentSubscriber._id === updatedSubscriber._id) {
          state.currentSubscriber = updatedSubscriber;
        }
      })
      .addCase(updateSubscriber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateSubscriberStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubscriberStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubscriber = action.payload;
        state.subscribers = state.subscribers.map((s) =>
          s._id === updatedSubscriber._id ? updatedSubscriber : s
        );
        if (state.currentSubscriber && state.currentSubscriber._id === updatedSubscriber._id) {
          state.currentSubscriber = updatedSubscriber;
        }
      })
      .addCase(updateSubscriberStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        const subscriberId = action.payload;
        state.subscribers = state.subscribers.filter((s) => s._id !== subscriberId);
        if (state.currentSubscriber && state.currentSubscriber._id === subscriberId) {
          state.currentSubscriber = null;
        }
      });
  },
});

export default subscriberSlice.reducer;
