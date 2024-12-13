import React, { useState } from "react";
import OrderTranscation from "./OrderTranscation";
import ExpenceTranscation from "./ExpenceTranscation";
import RefoundTranscation from "./RefoundTranscation";

const TranscatioReports = () => {
  const [activeSection, setActiveSection] = useState("ordertranscation"); // State to track active section

  // Function to handle section button click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="content container-fluid snipcss-KUtWb ">
      <div className="mb-4 pb-2 px-5 pt-5 flex items-center ">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/order_report.png"
            alt=""
            className="w-7 h-7"
          />{" "}
          Transaction Report
        </h2>
      </div>
      {/* Top Navbar for sections */}
      <div className="inline-page-menu px-5">
        <ul className="list-unstyled flex gap-3 font-bold text-nowrap w-60 p-2 md:w-full overflow-x-scroll md:overflow-x-hidden scroll-smooth">
          <li
            className={`${
              activeSection === "ordertranscation"
                ? "active border-b-2 border-primary-500"
                : ""
            }`}
          >
            <button onClick={() => handleSectionClick("ordertranscation")}>
              Order Transactions
            </button>
          </li>
          <li
            className={`${
              activeSection === "expencetranscation"
                ? "active border-b-2 border-primary-500"
                : ""
            }`}
          >
            <button onClick={() => handleSectionClick("expencetranscation")}>
              Expense Transactions
            </button>
          </li>
          <li
            className={`${
              activeSection === "refoundtranscation"
                ? "active border-b-2 border-primary-500"
                : ""
            }`}
          >
            <button onClick={() => handleSectionClick("refoundtranscation")}>
              Refound Transaction
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
        {activeSection === "ordertranscation" && <OrderTranscation />}
        {activeSection === "expencetranscation" && <ExpenceTranscation />}
        {activeSection === "refoundtranscation" && <RefoundTranscation />}

        {/* Add more conditional rendering for additional sections */}
      </div>
    </div>
  );
};

export default TranscatioReports;
