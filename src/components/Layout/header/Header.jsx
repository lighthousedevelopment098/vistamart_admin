import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/admin/authSlice";
import { getAuthData } from "../../../utils/authHelper";
import apiConfig from "../../../config/apiConfig";
import { fetchBusinessGeneral } from "../../../redux/slices/admin/bussinessSlices/generalSlice";

const Header = ({ handleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useMemo(() => getAuthData(), []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { business } = useSelector((state) => state.businessGeneral);

  useEffect(() => {
    dispatch(fetchBusinessGeneral()); 
  }, [dispatch]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserLogout = () => {
    dispatch(logout());
    handleLogout();
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
            {/* Display the header logo from API data */}
            {business?.length > 0 && (
              <img
                src={`${apiConfig.bucket}/${business[0]?.headerLogo}` || "/logo2.png"}
                alt="Logo"
                className="md:h-12 h-8 w-auto object-cover"
              />
            )}
          </div>

          <div className="right flex items-center space-x-4">
            <div className="relative" id="dropdown">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <span
                  className="ml-2"
                  style={{ fontWeight: "500", textTransform: "uppercase" }}
                >
                  {user?.role?.name || "Employee"}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-66 bg-white border rounded-lg shadow-lg z-50">
                  <div className="flex gap-2 p-4">
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
