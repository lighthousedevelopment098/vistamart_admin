import React, { useState } from "react";
import SocialMedia from "./socialMedia/socialMedia";
import HeaderMedia from "./headerMedia/TermAndCondition";
import BusinessProcess from "./businessProcess/businessProcess";
import DownloadAppSection from "./dowloadApp/downloadApp";
import FAQ from "./faq/faq.jsx";
import FaqList from "./faq/faq.jsx";
import TermsAndConditions from "./headerMedia/TermAndCondition";
import Privacy from "./headerMedia/Privacy";
import ReturnPolicy from "./headerMedia/ReturnPolicy";
import CancellationPolicy from "./headerMedia/CancellationPolicy.JSX";
import AboutUs from "./headerMedia/AboutUs";
import RefundPolicy from "./headerMedia/RefundPolicy";

const PageAndMedia = () => {
  const [currentTab, setCurrentTab] = useState("header"); // State to manage active tab

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "Terms & Conditions":
        return <TermsAndConditions />;
      case "Privacy Policy":
        return <Privacy />;
      case "Return Policy":
        return <ReturnPolicy />;
      case "Cancellation Policy":
        return <CancellationPolicy />;
      case "Refund Policy":
        return <RefundPolicy />;
      case "About Us":
        return <AboutUs />;
      case "FAQ":
        return <FaqList />;
      default:
        return null;
    }
  };

  return (
    <div className="content container-fluid">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png"
            alt="Pages"
          />{" "}
          Pages
        </h2>
      </div>

      {/* Inline page menu */}
      <div className="inline-page-menu m-4">
        <ul className="flex flex-col md:flex-row font-semibold md:items-center gap-4">
          <li
            className={`relative ${
              currentTab === "Terms & Conditions" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "Terms & Conditions"
                  ? "text-primary-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Terms & Conditions")}
            >
              Terms & Conditions
            </button>
            {currentTab === "Terms & Conditions" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>

          <li
            className={`relative ${
              currentTab === "Privacy Policy" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "Privacy Policy"
                  ? "text-primary-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Privacy Policy")}
            >
              Privacy Policy
            </button>
            {currentTab === "Privacy Policy" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>

          <li
            className={`relative ${
              currentTab === "Return Policy" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "Return Policy"
                  ? "text-primary-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Return Policy")}
            >
              Return Policy
            </button>
            {currentTab === "Return Policy" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>

          <li
            className={`relative ${
              currentTab === "Cancellation Policy" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "Cancellation Policy"
                  ? "text-primary-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Cancellation Policy")}
            >
              Cancellation Policy
            </button>
            {currentTab === "Cancellation Policy" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>
          <li
            className={`relative ${
              currentTab === "Refund Policy" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "Refund Policy"
                  ? "text-primary-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabChange("Refund Policy")}
            >
              Refund Policy
            </button>
            {currentTab === "Refund Policy" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>
          <li
            className={`relative ${
              currentTab === "About Us" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "About Us" ? "text-primary-500" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("About Us")}
            >
              About Us
            </button>
            {currentTab === "About Us" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>

          <li
            className={`relative ${
              currentTab === "FAQ" ? "text-primary-500" : ""
            }`}
          >
            <button
              className={`text-capitalize ${
                currentTab === "FAQ" ? "text-primary-500" : "text-gray-600"
              }`}
              onClick={() => handleTabChange("FAQ")}
            >
              FAQ
            </button>
            {currentTab === "FAQ" && (
              <span className="absolute -bottom-1 left-0 w-10 md:w-full  h-1 rounded bg-primary-dark-500"></span>
            )}
          </li>
        </ul>
      </div>

      {/* Render content based on currentTab */}
      <div className="card overflow-hidden">{renderContent()}</div>
    </div>
  );
};

export default PageAndMedia;
