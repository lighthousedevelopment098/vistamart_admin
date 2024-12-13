import React from "react";
import "./MostProduct.css"; // Import your CSS file for styling
import { FaStar } from "react-icons/fa";

const MostPopularProducts = () => {
  return (
    <div className=" snipcss-lNb6N">
      <div className="card h-100 remove-card-shadow">
        <div className="card-header">
          <h4 className="d-flex align-items-center text-capitalize gap-4 font-semibold mb-0">
            <img width="20" src="/most-popular-product.png" alt="" /> Most
            Popular Products
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="grid-card-wrap">
                <div className="cursor-pointer grid-card basic-box-shadow get-view-by-onclick ">
                  <div>
                    <img
                      className="avatar avatar-bordered border-gold avatar-60 rounded"
                      src="/2023-06-13-64884ce5791fe.png"
                      alt="Red Flash Melting Matte Waterproof Lip Stick - P05Image"
                    />
                  </div>
                  <div className="title-color text-center ">
                    {" "}
                    Red Flash Melting Matte Waterp...{" "}
                  </div>
                  <div className="d-flex align-items-center gap-1 fz-10">
                    <span className="rating-color text-[1rem] d-flex align-items-center font-weight-bold gap-1">
                      <FaStar className="text-[1rem]" /> 4.4{" "}
                    </span>
                    <span className="d-flex align-items-center gap-10">
                      {" "}
                      (5 Reviews){" "}
                    </span>
                  </div>
                </div>
                <div className="cursor-pointer grid-card basic-box-shadow get-view-by-onclick">
                  <div>
                    <img
                      className="avatar avatar-bordered border-gold avatar-60 rounded"
                      src="/2022-04-23-62636369a0855.png"
                      alt="Ladies Winter Long Sleeve SweaterImage"
                    />
                  </div>
                  <div className=" title-color text-center line--limit-1">
                    {" "}
                    Ladies Winter Long Sleeve Swea...{" "}
                  </div>
                  <div className="d-flex align-items-center gap-1 fz-10">
                    <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                      <i className="tio-star"></i> 5{" "}
                    </span>
                    <span className="d-flex align-items-center gap-10">
                      {" "}
                      (3 Reviews){" "}
                    </span>
                  </div>
                </div>
                <div className="cursor-pointer grid-card basic-box-shadow get-view-by-onclick">
                  <div>
                    <img
                      className="avatar avatar-bordered border-gold avatar-60 rounded"
                      src="/2022-04-20-625fe97736a17.png"
                      alt="Simple Mobile Carrier-Locked Galaxy A50 4G LTE Prepaid Smartphone - BlacImage"
                    />
                  </div>
                  <div className=" title-color text-center line--limit-1">
                    {" "}
                    Simple Mobile Carrier-Locked G...{" "}
                  </div>
                  <div className="d-flex align-items-center gap-1 fz-10">
                    <span className="rating-color d-flex align-items-center font-weight-bold gap-1">
                      <FaStar className="tio-star" /> 5{" "}
                    </span>
                    <span className="d-flex align-items-center gap-10">
                      {" "}
                      (2 Reviews){" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularProducts;
