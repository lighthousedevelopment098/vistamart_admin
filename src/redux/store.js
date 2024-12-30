import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/admin/authSlice';
import productReducer from './slices/admin/productSlice';
import orderReducer from './slices/transaction/orderSlice';
import categoryReducer from './slices/admin/categorybrandSlice';
import refundReducer from './slices/transaction/refundSlice';
import vendorReducer from './slices/seller/vendorSlice'; 
import brandReducer from './slices/admin/brandSlice'; 
import productCategorySlice from './slices/admin/categorySlice'; 
import productSubcategoryReducer from './slices/admin/subCategorySlice'; 
import bannerReducer from './slices/admin/bannerSlice'; 
import dealOfTheDayReducer from './slices/admin/dealOfDaySlice'; 
import FeatureDealReducer from './slices/admin/featureDealSlice'; 
import customersReducer from './slices/user/customerSlice'; 
import couponReducer from './slices/admin/couponSlice'; 
import flashDealReducer from './slices/admin/flashDealSlice'; 
import attributeReducer from './slices/admin/attributeSlice'; 
import subscriberReducer from './slices/admin/subscriberSlice'; 
import businessGeneralReducer from './slices/admin/bussinessSlices/generalSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    vendorOrder: orderReducer,
    category: categoryReducer,
    refund: refundReducer,
    vendor: vendorReducer,
    brand: brandReducer,
    productCategory: productCategorySlice,
    productSubcategory: productSubcategoryReducer,
    banner: bannerReducer,
    dealOfTheDay: dealOfTheDayReducer,
    featureDeal: FeatureDealReducer,
    customers: customersReducer,
    coupons: couponReducer, 
    flashDeals: flashDealReducer,
    attribute: attributeReducer,
    subscriber: subscriberReducer,  
    businessGeneral: businessGeneralReducer, 



  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state invariant middleware
    }),
});

export default store;
