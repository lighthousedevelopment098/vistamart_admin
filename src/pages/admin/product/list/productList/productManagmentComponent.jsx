import React from 'react';
import InHouseProductList from './productManagmentPage.jsx';

const InHouseProductPage = () => {
  return (
    <InHouseProductList
      initialTitle="In-House Products"
      initialFilters={{
        brand: '',
        category: '',
        searchValue: '',
        userType: 'in-house', // No filter for userType
        status: '', // No filter for status
        vendorNew4Days: false
      }}
    />
  );
};

const VendorPendingProductPage = () => {
  return (
    <InHouseProductList
      initialTitle="Vendor Pending Products"
      initialFilters={{
        brand: '',
        category: '',
        searchValue: '',
        userType: 'vendor', // Filter for vendor
        status: 'pending', // Filter for pending status
        vendorNew4Days: false
      }}
    />
  );
};

const VendorNewRequestProductPage = () => {
  return (
    <InHouseProductList
      initialTitle="Vendor New Requests"
      initialFilters={{
        brand: '',
        category: '',
        searchValue: '',
        userType: 'vendor', // Filter for vendor
        status: '', // No filter for status
        vendorNew4Days: true // Filter for new vendor requests
      }}
    />
  );
};

const VendorApprovedProductPage = () => {
  return (
    <InHouseProductList
      initialTitle="Vendor Approved Products"
      initialFilters={{
        brand: '',
        category: '',
        searchValue: '',
        userType: 'vendor', // Filter for vendor
        status: 'approved', // Filter for approved status
        vendorNew4Days: false
      }}
    />
  );
};

const VendorDeniedProductPage = () => {
  return (
    <InHouseProductList
      initialTitle="Vendor Denied Products"
      initialFilters={{
        brand: '',
        category: '',
        searchValue: '',
        userType: 'vendor', // Filter for vendor
        status: 'rejected', // Filter for denied status
        vendorNew4Days: false
      }}
    />
  );
};

export {
  InHouseProductPage,
  VendorPendingProductPage,
  VendorNewRequestProductPage,
  VendorApprovedProductPage,
  VendorDeniedProductPage
};
