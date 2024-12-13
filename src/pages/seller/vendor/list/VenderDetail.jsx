import React, { useState } from "react";
import { FiStar, FiGlobe } from "react-icons/fi";
import ShopStoreDetails from "./vendereListDetial/ShopStoreDetails";
import { Link } from "react-router-dom";
import VenderOrder from "./venderOrder/venderOrder";
import VenderProduct from "./vendorProduct/venderProduct";
import VendorSettings from "./VenderSetting/VenderSetting";

import TransactionTable from "./VenderTransaction/VenderTransaction";
import VenderReview from "./VenderReview/VenderReview";

const VenderListDetail = () => {
  const [activeTab, setActiveTab] = useState("shopview");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "shopview":
        return <ShopStoreDetails />;
      case "order":
        return <VenderOrder />;
      case "product":
        return <VenderProduct />;
      case "setting":
        return <VendorSettings />;
      case "transaction":
        return <TransactionTable />;
      // case 'transaction':
      //     return <ProductEdit />;
      case "review":
        return <VenderReview />;
      default:
        return <ShopStoreDetails />;
    }
  };

  return (
    <div className="content container-fluid snipcss-XDKLR">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
            alt=""
          />{" "}
          Vendor details
        </h2>
      </div>
      <div className="page-header border-0 mb-4">
        <div className="js-nav-scroller hs-nav-scroller-horizontal">
          <ul className="nav nav-tabs flex-wrap page-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "shopview" ? "active" : ""
                }`}
                onClick={() => handleTabClick("shopview")}
              >
                Shop overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "order" ? "active" : ""}`}
                onClick={() => handleTabClick("order")}
              >
                Order
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "product" ? "active" : ""
                }`}
                onClick={() => handleTabClick("product")}
              >
                Product
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "setting" ? "active" : ""
                }`}
                onClick={() => handleTabClick("setting")}
              >
                Setting
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "transaction" ? "active" : ""
                }`}
                onClick={() => handleTabClick("transaction")}
              >
                Transaction
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                onClick={() => handleTabClick("review")}
              >
                Review
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="card card-top-bg-element mb-5">
        <div className="card-body">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default VenderListDetail;
