import React, { useEffect, useState } from "react";
import "./BussniesWallet.css";
import axios from "axios";
import LoadingSpinner from "../../components/LoodingSpinner/LoadingSpinner";
import apiConfig from "../../config/apiConfig";
import { getAuthData } from "../../utils/authHelper";
import { Link } from "react-router-dom";
// import { getAuthData } from '../../utils/authHelper';

const ApiUrl = `${apiConfig.admin}`;

const BusinessAnalytics = () => {
  const [businessAnalytics, setBusinessAnalytics] = useState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function walletAnalytics() {
      try {
        const { token } = getAuthData();
        const response = await axios.get(`${ApiUrl}/business-analytics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setBusinessAnalytics(response.data.doc);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    walletAnalytics();
  }, []);
  // console.log(businessAnalytics ?  businessAnalytics:"")
  // if(loading) {
  //   return  <LoadingSpinner/>
  // }
  return (
    <div className="card-body snipcss-ti2xq">
      <div className="row flex-between align-items-center g-2 mb-3">
        <div className="col-sm-6">
          <h4 className="d-flex align-items-center text-capitalize gap-4 font-semibold mb-0">
            <img
              src="https://6valley.6amtech.com/public/assets/back-end/img/business_analytics.png"
              alt="Business Analytics"
            />
            Business analytics
          </h4>
        </div>
        <div className="col-sm-6 d-flex justify-content-sm-end">
          <select
            className="custom-select w-auto"
            name="statistics_type"
            id="statistics_type"
          >
            <option value="overall">Overall statistics</option>
            <option value="today">Today's Statistics</option>
            <option value="this_month">This Month's Statistics</option>
          </select>
        </div>
      </div>
      {businessAnalytics ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          id="order_stats"
        >
          <div className="col-sm-3 col-lg-2">
            <Link to={"/allorders"} className="business-analytics card">
              <h5 className="business-analytics__subtitle">Total order</h5>
              <h2 className="business-analytics__title">
                {businessAnalytics.totalOrders}
              </h2>
              {/* <h2 className="business-analytics__title">0</h2> */}
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Order"
              />
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/venderlist"}
              className="business-analytics get-view-by-onclick card"
            >
              <h5 className="business-analytics__subtitle">Total Stores</h5>
              <h2 className="business-analytics__title">
                {businessAnalytics.totalStores}
              </h2>
              {/* <h2 className="business-analytics__title">0</h2> */}
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/total-stores.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Stores"
              />
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="business-analytics card">
              <h5 className="business-analytics__subtitle">Total Products</h5>
              <h2 className="business-analytics__title">
                {businessAnalytics.totalProducts}
              </h2>
              {/* <h2 className="business-analytics__title">0</h2> */}
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/total-product.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Products"
              />
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link to={"/customerlist"} className="business-analytics card">
              <h5 className="business-analytics__subtitle">Total Customers</h5>
              <h2 className="business-analytics__title">
                {businessAnalytics.totalCustomers}
              </h2>
              {/* <h2 className="business-analytics__title">0</h2> */}
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/total-customer.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Customers"
              />
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/pendingorder"}
              className="order-stats order-stats_pending"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
                  width="20"
                  alt="Pending"
                />
                <h6 className="order-stats__subtitle">Pending</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.pending}
              </span>
              {/* <span className="order-stats__title">0</span> */}
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/confirmedorder"}
              className="order-stats order-stats_confirmed"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png"
                  width="20"
                  alt="Confirmed"
                />
                <h6 className="order-stats__subtitle">Confirmed</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.confirmed}
              </span>
              {/* <span className="order-stats__title">0</span> */}
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/packagingorder"}
              className="order-stats order-stats_packaging"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/packaging.png"
                  width="20"
                  alt="Packaging"
                />
                <h6 className="order-stats__subtitle">Packaging</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.packaging}
              </span>
              {/* <span className="order-stats__title">0</span> */}
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/outfordelivery"}
              className="order-stats order-stats_out-for-delivery"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png"
                  width="20"
                  alt="Out for Delivery"
                />
                <h6 className="order-stats__subtitle">Out for delivery</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.out_for_delivery}
              </span>
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/deliveredorder"}
              className="order-stats order-stats_delivered cursor-pointer get-view-by-onclick"
              // data-link="https://6valley.6amtech.com/admin/orders/list/delivered"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/delivered.png"
                  width="20"
                  alt="Delivered"
                />
                <h6 className="order-stats__subtitle">Delivered</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.delivered}
              </span>
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/cancel"}
              className="order-stats order-stats_canceled cursor-pointer get-view-by-onclick"
              // data-link="https://6valley.6amtech.com/admin/orders/list/canceled"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/canceled.png"
                  width="20"
                  alt="Canceled"
                />
                <h6 className="order-stats__subtitle">Canceled</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.canceled}
              </span>
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/returnedorder"}
              className="order-stats order-stats_returned cursor-pointer get-view-by-onclick"
              // data-link="https://6valley.6amtech.com/admin/orders/list/returned"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/returned.png"
                  width="20"
                  alt="Returned"
                />
                <h6 className="order-stats__subtitle">Returned</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.returned}
              </span>
            </Link>
          </div>
          <div className="col-sm-3 col-lg-2">
            <Link
              to={"/failedorder"}
              className="order-stats order-stats_failed cursor-pointer get-view-by-onclick"
              // data-link="https://6valley.6amtech.com/admin/orders/list/failed"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/failed-to-deliver.png"
                  width="20"
                  alt="Failed to Delivery"
                />
                <h6 className="order-stats__subtitle">Failed to delivery</h6>
              </div>
              <span className="order-stats__title">
                {businessAnalytics.ordersByStatus.failed_to_deliver}
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          id="order_stats"
        >
          <div className="col-sm-3 col-lg-2">
            <a className="business-analytics card">
              <h5 className="business-analytics__subtitle">Total order</h5>
              <h2 className="business-analytics__title"></h2>
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Order"
              />
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="business-analytics get-view-by-onclick card">
              <h5 className="business-analytics__subtitle">Total Stores</h5>
              <h2 className="business-analytics__title">0</h2>
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/total-stores.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Stores"
              />
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="business-analytics card">
              <h5 className="business-analytics__subtitle">Total Products</h5>
              <h2 className="business-analytics__title">0</h2>
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/total-product.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Products"
              />
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="business-analytics card">
              <h5 className="business-analytics__subtitle">Total Customers</h5>
              <h2 className="business-analytics__title">0</h2>
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/total-customer.png"
                width="30"
                height="30"
                className="business-analytics__img"
                alt="Total Customers"
              />
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="order-stats order-stats_pending">
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
                  width="20"
                  alt="Pending"
                />
                <h6 className="order-stats__subtitle">Pending</h6>
              </div>
              <span className="order-stats__title">0</span>
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="order-stats order-stats_confirmed">
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png"
                  width="20"
                  alt="Confirmed"
                />
                <h6 className="order-stats__subtitle">Confirmed</h6>
              </div>
              <span className="order-stats__title">0</span>
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="order-stats order-stats_packaging">
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/packaging.png"
                  width="20"
                  alt="Packaging"
                />
                <h6 className="order-stats__subtitle">Packaging</h6>
              </div>
              <span className="order-stats__title">0</span>
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <a className="order-stats order-stats_out-for-delivery">
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png"
                  width="20"
                  alt="Out for Delivery"
                />
                <h6 className="order-stats__subtitle">Out for delivery</h6>
              </div>
              <span className="order-stats__title">0</span>
            </a>
          </div>
          <div className="col-sm-3 col-lg-2">
            <div
              className="order-stats order-stats_delivered cursor-pointer get-view-by-onclick"
              data-link="https://6valley.6amtech.com/admin/orders/list/delivered"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/delivered.png"
                  width="20"
                  alt="Delivered"
                />
                <h6 className="order-stats__subtitle">Delivered</h6>
              </div>
              <span className="order-stats__title">0</span>
            </div>
          </div>
          <div className="col-sm-3 col-lg-2">
            <div
              className="order-stats order-stats_canceled cursor-pointer get-view-by-onclick"
              // data-link="https://6valley.6amtech.com/admin/orders/list/canceled"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/canceled.png"
                  width="20"
                  alt="Canceled"
                />
                <h6 className="order-stats__subtitle">Canceled</h6>
              </div>
              <span className="order-stats__title">0</span>
            </div>
          </div>
          <div className="col-sm-3 col-lg-2">
            <div
              className="order-stats order-stats_returned cursor-pointer get-view-by-onclick"
              data-link="https://6valley.6amtech.com/admin/orders/list/returned"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/returned.png"
                  width="20"
                  alt="Returned"
                />
                <h6 className="order-stats__subtitle">Returned</h6>
              </div>
              <span className="order-stats__title">0</span>
            </div>
          </div>
          <div className="col-sm-3 col-lg-2">
            <div
              className="order-stats order-stats_failed cursor-pointer get-view-by-onclick"
              data-link="https://6valley.6amtech.com/admin/orders/list/failed"
            >
              <div className="order-stats__content">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/failed-to-deliver.png"
                  width="20"
                  alt="Failed to Delivery"
                />
                <h6 className="order-stats__subtitle">Failed to delivery</h6>
              </div>
              <span className="order-stats__title">0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessAnalytics;
