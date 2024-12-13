import React from "react";
import "./TopSellingProducts.css"; // Import your CSS file for styling

const TopSellingProducts = () => {
  return (
    <div className=" snipcss-5ovlo">
      <div className="card h-100 remove-card-shadow">
        <div className="card-header gap-10">
          <h4 className="d-flex align-items-center text-capitalize gap-4 font-semibold mb-0">
            <img width="20" src="/top-selling-product-icon.png" alt="" /> Top
            selling products
          </h4>
        </div>
        <div className="p-4">
          <div className=" space-y-4">
            <div className=" cursor-pointer get-view-by-onclick">
              <div className="p-2 rounded-md flex justify-between items-center bg-transparent basic-box-shadow">
                <div className="d-flex gap-10 align-items-center">
                  <img
                    src="/2022-04-23-6263633d3b0a6.png"
                    className="avatar avatar-lg rounded avatar-bordered"
                    alt="Exclusive & Fashionable Suit For Men_Image"
                  />
                  <div className="title-color line--limit-2">
                    Exclusive & Fashiona ...
                  </div>
                </div>
                <div className="orders-count py-2 px-3 d-flex gap-1">
                  <div>Sold :</div>
                  <div className="font-semibold">37</div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer get-view-by-onclick">
              <div className="p-2 rounded-md  flex justify-between items-center bg-transparent basic-box-shadow">
                <div className="d-flex gap-10 align-items-center">
                  <img
                    src="/2022-04-20-625fe69f72cce.png"
                    className="avatar avatar-lg rounded avatar-bordered"
                    alt="Women's long-sleeve lightweight french terry fleece quarter-zip top_Image"
                  />
                  <div className="title-color line--limit-2">
                    Women's long-sleeve ...
                  </div>
                </div>
                <div className="orders-count py-2 px-3 d-flex gap-1">
                  <div>Sold :</div>
                  <div className="font-semibold">27</div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer get-view-by-onclick">
              <div className="p-2 rounded-md  flex justify-between items-center bg-transparent basic-box-shadow">
                <div className="d-flex gap-10 align-items-center">
                  <img
                    src="/2022-04-20-625fe97736a17.png"
                    className="avatar avatar-lg rounded avatar-bordered"
                    alt="Simple Mobile Carrier-Locked Galaxy A50 4G LTE Prepaid Smartphone - Blac_Image"
                  />
                  <div className="title-color line--limit-2">
                    Simple Mobile Carrie ...
                  </div>
                </div>
                <div className="orders-count py-2 px-3 d-flex gap-1">
                  <div>Sold :</div>
                  <div className="font-semibold">13</div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer get-view-by-onclick">
              <div className=" p-2 rounded-md flex justify-between items-center bg-transparent basic-box-shadow">
                <div className="d-flex gap-10 align-items-center">
                  <img
                    src="/2022-04-23-62636369a0855.png"
                    className="avatar avatar-lg rounded avatar-bordered"
                    alt="Ladies Winter Long Sleeve Sweater_Image"
                  />
                  <div className="title-color line--limit-2">
                    Ladies Winter Long S ...
                  </div>
                </div>
                <div className="orders-count py-2 px-3 d-flex gap-1">
                  <div>Sold :</div>
                  <div className="font-semibold">13</div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer get-view-by-onclick">
              <div className="p-2 rounded-md  flex justify-between items-center bg-transparent basic-box-shadow">
                <div className="d-flex gap-10 align-items-center">
                  <img
                    src="/2023-06-13-648830d2af5b5.png"
                    className="avatar avatar-lg rounded avatar-bordered"
                    alt="Girls Beautiful White & Purple Sneakers_Image"
                  />
                  <div className="title-color line--limit-2">
                    Girls Beautiful Whit ...
                  </div>
                </div>
                <div className="orders-count py-2 px-3 d-flex gap-1">
                  <div>Sold :</div>
                  <div className="font-semibold">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
