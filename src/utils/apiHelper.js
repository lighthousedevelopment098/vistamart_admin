import apiConfig from '../config/apiConfig';

// Function to return API based on role
export const getApiForRole = (role) => {
  switch (role) {
    case 'admin':
      return apiConfig.admin;
    case 'seller':
      return apiConfig.seller;
    case 'transaction':
      return apiConfig.transaction;
    case 'delivery':
      return apiConfig.delivery;
    default:
      return apiConfig.user; // fallback to user API if role is not specified
  }
};
