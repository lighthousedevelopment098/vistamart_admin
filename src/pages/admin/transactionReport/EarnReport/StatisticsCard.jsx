import React from "react";
import { IoLogoUsd } from "react-icons/io5";
import FilterForm from "./FilterForm";

const StatisticsCard = () => {
  const earnings = [
    {
      duration: "Jan",
      inHouseEarning: "-PKR250.00",
      commissionEarning: "PKR0.00",
      earnFromShipping: "PKR0.00",
      deliverymanIncentive: "PKR0.00",
      discountGiven: "PKR0.00",
      vatTax: "PKR250.00",
      refundGiven: "PKR0.00",
      totalEarning: "PKR0.00",
    },
    {
      duration: "Jan",
      inHouseEarning: "-PKR250.00",
      commissionEarning: "PKR0.00",
      earnFromShipping: "PKR0.00",
      deliverymanIncentive: "PKR0.00",
      discountGiven: "PKR0.00",
      vatTax: "PKR250.00",
      refundGiven: "PKR0.00",
      totalEarning: "PKR0.00",
    },
    {
      duration: "Jan",
      inHouseEarning: "-PKR250.00",
      commissionEarning: "PKR0.00",
      earnFromShipping: "PKR0.00",
      deliverymanIncentive: "PKR0.00",
      discountGiven: "PKR0.00",
      vatTax: "PKR250.00",
      refundGiven: "PKR0.00",
      totalEarning: "PKR0.00",
    },
    // Add more data as needed
  ];

  return (
    <>
      <FilterForm />
      <div className="card">
        <div className="card-header border-0">
          <div className="d-flex flex-wrap w-100 gap-3 align-items-center">
            <h4 className="mb-0 mr-auto">
              {" "}
              Total Earnings{" "}
              <span className="badge badge-soft-dark radius-50 fz-12">12</span>
            </h4>
            <div>
              <button
                type="button"
                className="btn px-4 py-2 bg-prim-500 text-white hover:bg-primary-dark-500 text-nowrap btn-block"
                data-toggle="dropdown"
                style={{ color: "white" }}
              >
                Export
              </button>
              <ul className="dropdown-menu dropdown-menu-right">
                <li>
                  <a
                    className="dropdown-item"
                    href="https://6valley.6amtech.com/admin/report/admin-earning-excel-export?date_type=this_year"
                  >
                    <img
                      width="14"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png"
                      alt="Excel"
                    />{" "}
                    Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            id="datatable"
            className="table __table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
          >
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>Duration</th>
                <th>In-House Earning</th>
                <th>Commission Earning</th>
                <th>Earn From Shipping</th>
                <th>Deliveryman incentive</th>
                <th>Discount Given</th>
                <th>VAT/TAX</th>
                <th>Refund Given</th>
                <th>Total Earning</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {earnings.map((earning, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{earning.duration}</td>
                  <td>{earning.inHouseEarning}</td>
                  <td>{earning.commissionEarning}</td>
                  <td>{earning.earnFromShipping}</td>
                  <td>{earning.deliverymanIncentive}</td>
                  <td>{earning.discountGiven}</td>
                  <td>{earning.vatTax}</td>
                  <td>{earning.refundGiven}</td>
                  <td>{earning.totalEarning}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <form
                        action="https://6valley.6amtech.com/admin/report/admin-earning-duration-download-pdf"
                        method="post"
                      >
                        <input
                          type="hidden"
                          name="_token"
                          value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
                          autoComplete="off"
                        />
                        <input
                          type="hidden"
                          name="duration"
                          value={earning.duration}
                        />
                        <input
                          type="hidden"
                          name="inhouse_earning"
                          value={earning.inHouseEarning}
                        />
                        <input
                          type="hidden"
                          name="admin_commission"
                          value={earning.commissionEarning}
                        />
                        <input
                          type="hidden"
                          name="shipping_earn"
                          value={earning.earnFromShipping}
                        />
                        <input
                          type="hidden"
                          name="discount_given"
                          value={earning.discountGiven}
                        />
                        <input
                          type="hidden"
                          name="total_tax"
                          value={earning.vatTax}
                        />
                        <input
                          type="hidden"
                          name="refund_given"
                          value={earning.refundGiven}
                        />
                        <input
                          type="hidden"
                          name="deliveryman_incentive"
                          value={earning.deliverymanIncentive}
                        />
                        <input
                          type="hidden"
                          name="total_earning"
                          value={earning.totalEarning}
                        />
                        <button
                          type="submit"
                          className="btn btn-outline-success square-btn btn-sm"
                        >
                          <IoLogoUsd />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StatisticsCard;
