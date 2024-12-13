import React from "react";

import MostPopularProducts from "./MostProduct/MostProduct";
import TopSellingProducts from "./TopSelling/TopSelling";

const TopProductSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-5">
    <MostPopularProducts />
    <TopSellingProducts />
    {/* <MostPopularProducts /> */}
  </div>
);

export default TopProductSection;
