
import axiosInstance from '../../../utils/axiosConfig'; // axios instance with interceptors
import apiConfig from '../../../config/apiConfig'; // API URLs
import { ErrorMessage } from '../../../utils/ErrorMessage'; // Error handling utility
import { getAuthData } from '../../../utils/authHelper'; // Authentication token helper
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

// Use the admin endpoint for banners
const API_URL = `${apiConfig.seller}/coupon`;
const { token } = getAuthData(); 

// Thunk for fetching coupons
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.doc;
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for creating a coupon
export const createCoupon = createAsyncThunk(
  'coupons/createCoupon',
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_URL, couponData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.doc;
    } catch (error) {
      console.error('Error creating coupon:', error.response || error);
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for updating coupon status
export const updateCouponStatus = createAsyncThunk(
  'coupons/updateCouponStatus',
  async ({ couponId, status }, { rejectWithValue }) => {
    try {
      console.log('Updating coupon status:', couponId, status);
      const response = await axiosInstance.put(
        `${API_URL}/${couponId}`,
        { status:status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.doc;
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for deleting a coupon
export const deleteCoupon = createAsyncThunk(
  'coupons/deleteCoupon',
  async (couponId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/${couponId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return couponId;
      }
    } catch (error) {
      const errorMessage = ErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const couponSlice = createSlice({
  name: 'coupons',
  initialState: {
    coupons: [], // To store the list of coupons
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload);
        Swal.fire('Success!', 'Coupon added successfully.', 'success');
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Swal.fire('Error!', 'There was an issue adding the coupon.', 'error');
      })
      .addCase(updateCouponStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCouponStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCoupon = action.payload;
        state.coupons = state.coupons.map(coupon =>
          coupon.id === updatedCoupon.id ? updatedCoupon : coupon
        );
      })
      .addCase(updateCouponStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        const deletedCouponId = action.payload;
        state.coupons = state.coupons.filter(coupon => coupon.id !== deletedCouponId);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = couponSlice.actions;
export default couponSlice.reducer;
