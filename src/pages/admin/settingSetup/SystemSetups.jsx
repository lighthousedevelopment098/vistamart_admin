import React, { useState } from "react";
import { FaCog, FaDatabase, FaGlobe, FaLock, FaServer } from "react-icons/fa";
import EnvironmentSettings from "./EnvironmentSettings";
import AppSettings from "./AppSettings";
import SoftwareUpdate from "./SoftwareUpdate";
import LanguageTable from "./Language/LanguageTable";
import CurrencyCard from "./Currency/Currency";
import CookieSettings from "./Cookies/CookieSettings";
import DbCleanSettings from "./DbCleanSettings/DbCleanSettings";
import GenerateSitemap from "./GenerateSitemap";

// Sample component imports (replace with actual components)

const SystemSetups = () => {
  const [activeSection, setActiveSection] = useState("environment"); // State to track active section

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
        <ul className="list-unstyled flex gap-3 w-96 md:w-full text-nowrap p-2 overflow-x-scroll md:overflow-x-hidden scroll-smooth">
          <li
            className={
              activeSection === "environment"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("environment")}>
              Environment Settings
            </button>
          </li>
          <li
            className={
              activeSection === "appSettings"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("appSettings")}>
              App Settings
            </button>
          </li>
          <li
            className={
              activeSection === "softwareUpdate"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("softwareUpdate")}>
              Software Update
            </button>
          </li>
          <li
            className={
              activeSection === "language"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("language")}>
              Language
            </button>
          </li>
          <li
            className={
              activeSection === "currency"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("currency")}>
              Currency
            </button>
          </li>
          {/* <li className={activeSection === "cookies" ? "border-b-2 border-green-500" : ""}>
      <button onClick={() => handleSectionClick("cookies")}>
        DB Clean
      </button>
    </li> */}
          <li
            className={
              activeSection === "dbcleaning"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("dbcleaning")}>
              Cookies
            </button>
          </li>
          <li
            className={
              activeSection === "sitemap" ? "border-b-2 border-primary-500" : ""
            }
          >
            <button onClick={() => handleSectionClick("sitemap")}>
              SiteMap
            </button>
          </li>
        </ul>
      </div>

      {/* Conditional rendering of section content */}
      <div className="card">
        {activeSection === "environment" && <EnvironmentSettings />}
        {activeSection === "appSettings" && <AppSettings />}
        {activeSection === "softwareUpdate" && <SoftwareUpdate />}
        {activeSection === "language" && <LanguageTable />}
        {activeSection === "currency" && <CurrencyCard />}
        {activeSection === "cookies" && <CookieSettings />}
        {/* {activeSection === " dbclean" && <DbCleanSettings />} */}
        {activeSection === "dbcleaning" && <DbCleanSettings />}
        {activeSection === "sitemap" && <GenerateSitemap />}

        {/* Add more conditional rendering for additional sections */}
      </div>
    </div>
  );
};

export default SystemSetups;
