import { useState } from "react";
// import { FaCog, FaDatabase, FaGlobe, FaLock, FaServer } from "react-icons/fa";

import PayMentMethod from "./Paymentmethod/PayMentMethod";
import OfflinePaymentMethods from "./OfflinePayment/OfflinePaymentMethods";

// Sample component imports (replace with actual components)

const ThirParty = () => {
  const [activeSection, setActiveSection] = useState("paymentmethod"); // State to track active section

  // Function to handle section button click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="content container-fluid snipcss-KUtWb">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png"
            alt=""
          />{" "}
          3rd party
        </h2>
      </div>
      {/* Top Navbar for sections */}
      <div className="inline-page-menu m-2">
        <ul className=" font-semibold flex gap-3 text-nowrap">
          <li
            className={
              activeSection === "paymentmethod"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("paymentmethod")}>
              PayMent Method
            </button>
          </li>
          <li
            className={
              activeSection === "offlinepaymentmethod"
                ? "border-b-2 border-primary-500"
                : ""
            }
          >
            <button onClick={() => handleSectionClick("offlinepaymentmethod")}>
              Offline Payment Method
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
      <div className="card ">
        {activeSection === "paymentmethod" && <PayMentMethod />}
        {activeSection === "offlinepaymentmethod" && <OfflinePaymentMethods />}

        {/* Add more conditional rendering for additional sections */}
      </div>
    </div>
  );
};

export default ThirParty;
