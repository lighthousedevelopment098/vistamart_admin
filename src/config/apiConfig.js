

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BUCKET_URL = import.meta.env.VITE_BUCKET_URL;


const apiConfig = {
  admin: `${BASE_URL}/api/v1/admin`,
  user: `${BASE_URL}/api/v1/user`,
  seller: `${BASE_URL}/api/v1/seller`,
  transaction: `${BASE_URL}/api/v1/transaction`,
  bucket: BUCKET_URL,
};

export default apiConfig;

