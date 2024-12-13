// Import necessary dependencies
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API URL for attributes
const API_URL = `${apiConfig.admin}/attributes`;

// Fetch attributes
export const fetchAttributes = createAsyncThunk(
  'attribute/fetchAttributes',
  async (searchParams, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.get(API_URL, {
        params: searchParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the attribute data in `doc`
    } catch (error) {
      return rejectWithValue(ErrorMessage(error)); // Handle error using utility
    }
  }
);

// Create attribute
export const createAttribute = createAsyncThunk(
  'attribute/createAttribute',
  async (attributeData, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      const response = await axiosInstance.post(API_URL, attributeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the created attribute
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Update attribute
export const updateAttribute = createAsyncThunk(
  'attribute/updateAttribute',
  async ({ id, data }, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      console.log(" attributeData: ", data);
      console.log("id: ", id);
      const response = await axiosInstance.put(`${API_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc; // Assuming the response contains the updated attribute
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Delete attribute
export const deleteAttribute = createAsyncThunk(
  'attribute/deleteAttribute',
  async (attributeId, { rejectWithValue }) => {
    const { token } = getAuthData(); // Retrieve token for authorization
    try {
      await axiosInstance.delete(`${API_URL}/${attributeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return attributeId; // Return the deleted attribute ID for frontend state update
    } catch (error) {
      return rejectWithValue(ErrorMessage(error));
    }
  }
);

// Initial state
const initialState = {
  attributes: [],
  loading: false,
  error: null,
};

// Create slice
const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch attributes
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttributes.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Create attribute
      .addCase(createAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes.push(action.payload);
      })
      .addCase(createAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update attribute
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAttribute.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAttribute = action.payload;
        state.attributes = state.attributes.map((attribute) =>
          attribute._id === updatedAttribute._id ? updatedAttribute : attribute
        );
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete attribute
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        const attributeId = action.payload;
        state.attributes = state.attributes.filter((attribute) => attribute._id !== attributeId);
      });
  },
});

export default attributeSlice.reducer;
