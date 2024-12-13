import React from "react";
import TopCustomers from "./TopCustomers";
import MostCustomers from "./MostP/MostP";
// Import your TopCustomers component

const TopCustomersSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 ">
    <TopCustomers />
    {/* <MostCustomers /> */}
    {/* <MostCustomers /> */}
  </div>
);

export default TopCustomersSection;
