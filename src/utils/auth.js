import { login } from '../redux/slices/admin/authSlice';

export const checkAuth = (dispatch) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log("user ----", user)
  if (token && user) {
    dispatch(login({ token, user: JSON.parse(user) }));
  }
};




// console.log('Loading jwt-decode...');
// import {jwt_decode} from 'jwt-decode';
// console.log('jwt_decode loaded:', jwt_decode); 

// import { login, logout } from '../redux/slices/admin/authSlice';

// export const checkAuth = (dispatch) => {
//   const token = localStorage.getItem('token');
//   const user = localStorage.getItem('user');

//   if (token && user) {
//     try {
//       const decodedToken = jwt_decode(token);
//       const currentTime = Date.now() / 1000; // Current time in seconds

//       // If token is expired, log out the user
//       if (decodedToken.exp < currentTime) {
//         dispatch(logout());
//         return;
//       }

//       // If token is valid, log the user in
//       dispatch(login({ token, user: JSON.parse(user) }));
//     } catch (error) {
//       console.error('Token decoding failed:', error);
//       dispatch(logout());
//     }
//   }
// };
