import React, { useState } from "react";
import { FaCog, FaServer } from "react-icons/fa";
import AppSettingsComponent from "./SystemSetups"; // Import AppSettingsComponent

const SystemSetup = () => {
  const [activeMenu, setActiveMenu] = useState("environment"); // State to track active menu

  // Sample data array for menu items and corresponding forms
  const menuItems = [
    {
      id: "environment",
      icon: <FaServer />,
      title: "Environment Settings",
      url: "https://6valley.6amtech.com/admin/business-settings/web-config/environment-setup",
      formFields: [
        { label: "App name", value: "6valley", disabled: true },
        { label: "App debug", value: "False", options: ["True", "False"] },
        { label: "App mode", value: "Live", options: ["Live", "Dev"] },
        { label: "App URL", value: "http://6valley.6amtech.com", disabled: true },
        { label: "DB connection", value: "---", disabled: true },
        { label: "DB host", value: "---", disabled: true },
        { label: "DB port", value: "---", disabled: true },
        { label: "DB database", value: "---", disabled: true },
        { label: "DB username", value: "---", disabled: true },
        { label: "DB password", value: "---", disabled: true },
        { label: "Buyer username", value: "6valley-admin-demo-jhisdfhisufjifjfijqw5467", disabled: true },
        { label: "Purchase code", value: "", type: "password", disabled: true },
      ],
    },
    {
      id: "appSettings",
      icon: <FaCog />,
      title: "App Settings",
      url: "https://6valley.6amtech.com/admin/business-settings/web-config/app-settings",
      component: <AppSettingsComponent />, // Include AppSettingsComponent here
    },
    // Add more menu items as needed
  ];

  // Function to handle menu item click
  const handleMenuItemClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div className="content container-fluid snipcss-KUtWb">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <FaCog /> System Setup
        </h2>
      </div>
      <div className="inline-page-menu my-4">
        <ul className="list-unstyled flex gap-1">
          {menuItems.map((item) => (
            <li key={item.id} className={item.id === activeMenu ? "active" : ""}>
              <button onClick={() => handleMenuItemClick(item.id)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        {menuItems.map((item) => (
          <div key={item.id} className={item.id === activeMenu ? "" : "d-none"}>
            <div className="border-bottom px-4 py-3">
              <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
                {item.icon} {item.title}
              </h5>
            </div>
            <div className="card-body">
              {item.component && item.component} {/* Conditionally render the component */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSetup;
