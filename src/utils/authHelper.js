


import CryptoJS from "crypto-js";

// Constants for storage keys
const getStorageKey = () => ({
  token: "token",
  user: "user",
});

// Secret key for encryption (ensure to use a secure secret key)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Encrypt function for user data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function for user data
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Function to save token and encrypted user data
export const saveAuthData = (token, user) => {
  // Store token as plain text
  localStorage.setItem(getStorageKey().token, token);

  // Encrypt and store user data
  const encryptedUser = encryptData(user);
  localStorage.setItem(getStorageKey().user, encryptedUser);
};

// Function to get token and decrypted user data
export const getAuthData = () => {
  const { token: tokenKey, user: userKey } = getStorageKey();

  // Retrieve token as plain text
  const token = localStorage.getItem(tokenKey);

  // Retrieve and decrypt user data
  const encryptedUser = localStorage.getItem(userKey);
  const user = encryptedUser ? decryptData(encryptedUser) : null;

  return { token, user };
};

// Function to clear token and user data
export const clearAuthData = () => {
  const { token: tokenKey, user: userKey } = getStorageKey();
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};




// without encription
// // utils/authHelper.js

// // Constants for storage keys 
// const getStorageKey = () => ({
//   token: `token`,
//   user: `user`,
// });

// // Function to save token and user data
// export const saveAuthData = (token, user) => {
//   const { token: tokenKey, user: userKey } = getStorageKey();
//   localStorage.setItem(tokenKey, token);
//   localStorage.setItem(userKey, JSON.stringify(user));
// };

// // Function to get token and user data
// export const getAuthData = () => {
//   const { token: tokenKey, user: userKey } = getStorageKey();
//   const token = localStorage.getItem(tokenKey);
//   const user = localStorage.getItem(userKey);
//   return { token, user: user ? JSON.parse(user) : null };
// };

// // Function to clear token and user data
// export const clearAuthData = () => {
//   const { token: tokenKey, user: userKey } = getStorageKey();
//   localStorage.removeItem(tokenKey);
//   localStorage.removeItem(userKey);
// };  





// import CryptoJS from "crypto-js";

// // Constants for storage keys 
// const getStorageKey = () => ({
//   token: "token",
//   user: "user",
// });

// // Secret key for encryption (ensure to use a secure secret key)
// const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// // Encrypt function
// const encryptData = (data) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
// };

// // Decrypt function
// const decryptData = (encryptedData) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };

// // Function to save encrypted token and user data
// export const saveAuthData = (token, user) => {
//   const encryptedToken = encryptData(token);
//   const encryptedUser = encryptData(user);

//   localStorage.setItem(getStorageKey().token, encryptedToken);
//   localStorage.setItem(getStorageKey().user, encryptedUser);
// };

// // Function to get decrypted token and user data
// export const getAuthData = () => {
//   const { token: tokenKey, user: userKey } = getStorageKey();
//   const encryptedToken = localStorage.getItem(tokenKey);
//   const encryptedUser = localStorage.getItem(userKey);

//   if (!encryptedToken || !encryptedUser) return { token: null, user: null };

//   const token = decryptData(encryptedToken);
//   const user = decryptData(encryptedUser);

//   return { token, user };
// };

// // Function to clear encrypted token and user data
// export const clearAuthData = () => {
//   const { token: tokenKey, user: userKey } = getStorageKey();
//   localStorage.removeItem(tokenKey);
//   localStorage.removeItem(userKey);
// };

