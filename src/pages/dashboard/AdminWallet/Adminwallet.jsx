import React, { useEffect, useState } from "react";
import {
  FaWallet,
  FaMoneyCheckAlt,
  FaTruckLoading,
  FaPercentage,
} from "react-icons/fa";

import apiConfig from "../../../config/apiConfig";
import { getAuthData } from "../../../utils/authHelper";

const ApiUrl = `${apiConfig.transaction}/admin-wallets/calculate`;

const Adminwallet = () => {
  const { token, user } = getAuthData();
  const [totals, setTotals] = useState({
    totalInhouseEarning: 0,
    totalCommissionEarned: 0,
    totalDeliveryChargeEarned: 0,
    totalTaxCollected: 0,
    totalPendingAmount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.status === "success") {
          setTotals(data.totals);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="card-body snipcss-KRwJd">
      <h4 className="d-flex align-items-center text-capitalize gap-4 font-semibold mb-3">
        <img width="20" className="mb-1" src="/admin-wallet.png" alt="" /> Admin
        Wallet
      </h4>
      <div className="row g-2 text-[1rem]" id="order_stats">
        <div className="col-lg-4">
          <div className="card h-100 d-flex justify-content-center align-items-center">
            <div className="card-body d-flex flex-column gap-10 align-items-center justify-content-center">
              <img
                width="48"
                className="mb-2"
                src="/inhouse-earning.png"
                alt=""
              />
              <h3 className="for-card-count font-semibold mb-0 fz-24">
                PKR {totals.totalInhouseEarning}
              </h3>
              <div className="text-capitalize mb-30">In-house earning</div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row g-2">
            {/* <div className="col-md-6">
              <div className="card card-body h-100 justify-content-center">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <h3 className="mb-1 font-semibold fz-24">
                      PKR {totals.totalCommissionEarned}
                    </h3>
                    <div className="text-capitalize mb-0">
                      Commission earned
                    </div>
                  </div>
                  <div>
                    <img src="/ce.png" alt="img" className="h-10 w-10 " />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-md-6">
              <div className="card card-body h-100 justify-content-center">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <h3 className="mb-1 font-semibold fz-24">
                      PKR {totals.totalDeliveryChargeEarned}
                    </h3>
                    <div className="text-capitalize mb-0">
                      Delivery charge earned
                    </div>
                  </div>
                  <div>
                    <img src="/dce.png" alt="img" className="h-10 w-10 " />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-body h-100 justify-content-center">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <h3 className="mb-1 font-semibold fz-24">
                      PKR {totals.totalTaxCollected}
                    </h3>
                    <div className="text-capitalize mb-0">
                      Total tax collected
                    </div>
                  </div>
                  <div>
                    <img src="/ttc.png" className="h-10 w-10" alt="img" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-body h-100 justify-content-center">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <div className="d-flex flex-column align-items-start">
                    <h3 className="mb-1 font-semibold fz-24">
                      PKR {totals.totalPendingAmount}
                    </h3>
                    <div className="text-capitalize mb-0">Pending amount</div>
                  </div>
                  <div>
                    <img src="/pa.png" alt="img" className="h-10 w-10 " />
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

export default Adminwallet;
