import React, { useState } from "react";
import { FaCog, FaDatabase, FaGlobe, FaLock, FaServer } from "react-icons/fa";
import OtpLoginSettings from "./OtpLoginSettings";
import AdminLoginPage from "./AdminLoginPage";
// Sample component imports (replace with actual components)

const LoginSetups = () => {
  const [activeSection, setActiveSection] = useState("otpSetting"); // State to track active section

  // Function to handle section button click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="content container-fluid snipcss-KUtWb">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <FaCog /> System Setup
        </h2>
      </div>
      {/* Top Navbar for sections */}
      <div className="inline-page-menu my-4">
        <ul className="list-unstyled flex gap-3">
          <li>
            <button
              onClick={() => handleSectionClick("otpSetting")}
              className={`${
                activeSection === "otpSetting"
                  ? "border-b-2 border-primary-500 "
                  : "text-gray-700"
              } pb-2 font-medium`}
            >
              OTP & Login Attempts
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSectionClick("loginUrl")}
              className={`${
                activeSection === "loginUrl"
                  ? "border-b-2 border-primary-500 "
                  : "text-gray-700"
              } pb-2 font-medium`}
            >
              Login Url
            </button>
          </li>

          {/* Add more buttons for additional sections as needed */}
        </ul>
      </div>

      {/* Conditional rendering of section content */}
      <div className="card">
        {activeSection === "otpSetting" && <OtpLoginSettings />}
        {activeSection === "loginUrl" && <AdminLoginPage />}

        {/* Add more conditional rendering for additional sections */}
      </div>
    </div>
  );
};

export default LoginSetups;
