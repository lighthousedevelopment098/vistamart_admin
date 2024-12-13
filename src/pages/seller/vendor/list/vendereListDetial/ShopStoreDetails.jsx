import React, { useState } from "react";
import { FiStar, FiGlobe, FiDollarSign } from "react-icons/fi";
import Swal from "sweetalert2";
import "./VenderList.css";
import VendorWallet from "./ShopStoreWallet";
import VendorDetailes from "./Detail";
// import VendorDetailes from "./Detail";

const ShopStoreDetails = () => {
  return (
    <div className="content container-fluid snipcss-XDKLR">
      <VendorDetailes />
      <VendorWallet />
    </div>
  );
};

export default ShopStoreDetails;
