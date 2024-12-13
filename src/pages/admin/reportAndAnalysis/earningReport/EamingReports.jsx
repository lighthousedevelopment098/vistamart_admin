import React, { useState } from "react";
import { FaCog, FaDatabase, FaGlobe, FaLock, FaServer } from "react-icons/fa";
import AdmingEarning from "./AdminEarning/AdmingEarning";
import VendorEarning from "./VendorEarning/VendorEarning";
const EaringReports = () => {
  const [activeSection, setActiveSection] = useState("paymentmethod"); // State to track active section

  // Function to handle section button click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="content container-fluid snipcss-KUtWb ">
      <div className="mb-4 pb-2 px-5 pt-5 flex items-center ">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/earning_report.png"
            alt=""
            className="w-10 h-10"
          />{" "}
          Earning Reports
        </h2>
      </div>
      {/* Top Navbar for sections */}
      <div className="inline-page-menu  px-5 ">
        <ul className="list-unstyled flex gap-3 font-bold">
          <li className={activeSection === "paymentmethod" ? "active" : ""}>
            <button onClick={() => handleSectionClick("paymentmethod")}>
              Admin Earning
            </button>
          </li>
          <li
            className={activeSection === "offlinepaymentmethod" ? "active" : ""}
          >
            <button onClick={() => handleSectionClick("offlinepaymentmethod")}>
              Vendor Earning
            </button>
          </li>

          {/* Add more buttons for additional sections as needed */}
        </ul>
      </div>
      {/* <div className="inline-page-menu my-4">
    <ul className="list-unstyled">
      <li className="active"><a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/payment-method">Digital payment methods</a></li>
      <li><a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/offline-payment-method/index">Offline payment methods</a></li>
    </ul>
  </div> */}
      {/* Conditional rendering of section content */}
      <div className="">
        {activeSection === "paymentmethod" && <AdmingEarning />}
        {activeSection === "offlinepaymentmethod" && <VendorEarning />}

        {/* Add more conditional rendering for additional sections */}
      </div>
    </div>
  );
};

export default EaringReports;
