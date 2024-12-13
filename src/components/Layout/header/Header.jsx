import React, { useState, useEffect, useMemo } from "react";
import { FaGlobe, FaCommentDots, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/admin/authSlice";
import { getAuthData } from "../../../utils/authHelper";
import apiConfig from "../../../config/apiConfig";

const Header = ({ handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useMemo(() => getAuthData(), []); // Empty array to ensure it only runs once
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleUserLogout = () => {
    dispatch(logout());
    handleLogout(); // Logout and redirect to login page
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#dropdown")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <div className="header flex items-center justify-between py-2 px-6 shadow fixed top-0 left-0 right-0 bg-white z-50">
          <div>
            <img
              src="/logo2.png"
              alt="Logo"
              className="md:h-12 h-8 w-full object-center"
            />
          </div>

          <div className="right flex items-center space-x-4">
            <div className="relative" id="dropdown">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                {/* <img
  src={user?.image ? `${apiConfig.bucket}/${user?.image}` : "https://cdn.vectorstock.com/i/1000x1000/23/85/courier-checks-parcels-list-boxes-for-sending-vector-13222385.webp"}
  className="w-15 h-10"
  alt="admin"
/> */}
                {/* <img src={user?.vendorImage || "man.jpg"} alt="User" className="w-8 h-8 rounded-full" /> */}
                <span
                  className="ml-2 "
                  style={{ fontWeight: "500", textTransform: "uppercase" }}
                >
                  {user?.role?.name || "Employee"}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-66 bg-white border rounded-lg shadow-lg z-50">
                  <div className="flex gap-2 p-4">
                    {/* <img
  src={user?.image ? `${apiConfig.bucket}/${user?.image}` : "https://cdn.vectorstock.com/i/1000x1000/23/85/courier-checks-parcels-list-boxes-for-sending-vector-13222385.webp"}
  className="w-12 h-10"
  alt="admin"
/> */}

                    <div>
                      <h1 className="font-bold">{user?.name || ""}</h1>
                      <h2 className="text-sm">
                        {user?.email || "a...@gmail.com"}
                      </h2>
                    </div>
                  </div>
                  <Link
                    to={"/profileinformation"}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Setting
                  </Link>
                  <div className="border-t my-2"></div>
                  <button
                    onClick={handleUserLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-16"></div>
      </div>
    </>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import { FaGlobe, FaCommentDots, FaShoppingCart } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/slices/admin/authSlice";

// const Header = ({ setIsLoggedIn }) => {
//   const dispatch = useDispatch();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsLoggedIn(false); // Set logged out state
//     toast.success("Logged out successfully!");
//   };

//   const handleOutsideClick = (e) => {
//     if (!e.target.closest("#dropdown")) {
//       setIsDropdownOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleOutsideClick);
//     return () => {
//       document.removeEventListener("click", handleOutsideClick);
//     };
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <div>
//         {/* Header Component */}
//         <div className="header flex items-center justify-between py-2 px-6 shadow fixed top-0 left-0 right-0 bg-white z-50">
//           {/* Left Section: Logo */}
//           <div className=" ">
//             <img
//               src="/vistalogo.png"
//               alt="Logo"
//               className="md:h-12 h-8 w-full object-center"
//             />
//           </div>

//           {/* Right Section: Menu and Icons */}
//           <div className="right flex items-center space-x-4">
//             {/* User Icon and Dropdown */}
//             <div className="relative" id="dropdown">
//               <div
//                 className="flex items-center cursor-pointer"
//                 onClick={toggleDropdown}
//               >
//                 <img
//                   src="man.jpg"
//                   alt="User"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="ml-2">Admin</span>
//               </div>

//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
//                   <div className="flex gap-2 p-4">
//                     <img
//                       src="https://cdn.vectorstock.com/i/1000x1000/23/85/courier-checks-parcels-list-boxes-for-sending-vector-13222385.webp"
//                       className="w-10 h-10"
//                       alt="Admin"
//                     />
//                     <div>
//                       <h1 className="font-bold">Admin</h1>
//                       <h2 className="text-sm text-wrap">
//                         a...@admin@gmail.com
//                       </h2>
//                     </div>
//                   </div>
//                   <Link
//                     to={"/profileinformation"}
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Setting
//                   </Link>
//                   <div className="border-t my-2"></div>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Spacer for Header */}
//         <div className="h-16"></div>
//       </div>
//     </>
//   );
// };

// export default Header;
