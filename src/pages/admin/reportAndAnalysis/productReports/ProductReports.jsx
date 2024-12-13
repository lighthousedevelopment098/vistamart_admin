import React, { useState } from "react";
import { FaCog, FaDatabase, FaGlobe, FaLock, FaServer } from "react-icons/fa";
import AllProduct from "./AllProduct/AllProduct";
import ProductStock from "./ProductStock/ProductStock";
import ListedProduct from "./ListedProduct/ListedProduct";
const ProductReports = () => {
  const [activeSection, setActiveSection] = useState("allproduct"); // State to track active section

  // Function to handle section button click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="content container-fluid snipcss-KUtWb ">
      <div className="mb-4 pb-2 px-5 pt-5 flex items-center ">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/seller_sale.png"
            alt=""
            className="w-7 h-7"
          />{" "}
          Product Report
        </h2>
      </div>
      {/* Top Navbar for sections */}
      <div className="inline-page-menu px-5 ">
        <ul className="list-unstyled flex gap-3 font-bold p-2 text-nowrap w-60 md:w-full overflow-x-scroll md:overflow-hidden scroll-smooth ">
          <li
            className={`${
              activeSection === "allproduct"
                ? "border-b-2 border-primary-500"
                : ""
            }`}
          >
            <button onClick={() => handleSectionClick("allproduct")}>
              All Products
            </button>
          </li>
          <li
            className={`${
              activeSection === "productstock"
                ? "border-b-2 border-primary-500"
                : ""
            }`}
          >
            <button onClick={() => handleSectionClick("productstock")}>
              Product Stock
            </button>
          </li>
          <li
            className={`${
              activeSection === "listedproduct"
                ? "border-b-2 border-primary-500"
                : ""
            }`}
          >
            <button onClick={() => handleSectionClick("listedproduct")}>
              Wish Listed Products
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
        {activeSection === "allproduct" && <AllProduct />}
        {activeSection === "productstock" && <ProductStock />}
        {activeSection === "listedproduct" && <ListedProduct />}
        {/* Add more conditional rendering for additional sections */}
      </div>
    </div>
  );
};

export default ProductReports;
