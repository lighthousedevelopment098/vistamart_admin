import React from "react";
import BussniesWallet from "./BussniesWallet";

import Adminwallet from "./AdminWallet/Adminwallet";
// import OrderStatic from "./AdminWallet/OrderStatic/OrderStatic";
import OrderStatistic from "./AdminWallet/OrderStatic/OrderStatistic/OrderStatistic";
import TopCustomersSection from "./AdminWallet/adminCard/TopCustomerCard";
import TopProductSection from "./ProductAdmin/ProductAdmin";
import { getAuthData } from "../../utils/authHelper";

const Dashboard = () => {
  const { user } = getAuthData();

  return (
    <div className="grid  grid-cols-12  sm:mx-0 md:mx-10  bg-secondary-500">
      <div className="col-span-12 ">
        <div className="bg-secondary-500 mx-5  md:py-5 mt-5">
          <h1
            className="text-[1.3rem] font-bold"
            style={{ textTransform: "uppercase" }}
          >
            Welcome {user?.name}
          </h1>
          <p className="text-[.9rem] text-gray-400">
            Monitor your business analytics and statistics.
          </p>
        </div>
        <BussniesWallet />
        <Adminwallet />
        <OrderStatistic />
        <TopProductSection />
        <TopCustomersSection />
      </div>
    </div>
  );
};

export default Dashboard;
