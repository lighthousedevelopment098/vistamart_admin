import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import {
  FaSearch,
  FaDownload,
  FaChevronDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
const VendorSales = () => {
  const graphdata = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [0, 0, 0, 0, 55000, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#A1CB46",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  /////------------------------------
  //   ==========
  const data = [
    // {
    //   sl: 1,
    //   duration: "Abc Abc",
    //   inHouse: "$-250.00",
    //   commission: "$0.00",
    //   shipping: "$0.00",
    //   incentive: "$0.00",
    //   discount: "$0.00",
    //   tax: "$0.00",
    //   refound: "$0.00",
    //   total: "$0.00",
    // },
    // {
    //   sl: 2,
    //   duration: "Web seller",
    //   inHouse: "$10.00",
    //   commission: "$0.00",
    //   shipping: "$0.00",
    //   incentive: "$0.00",
    //   discount: "$0.00",
    //   tax: "$0.00",
    //   refound: "$0.00",
    //   total: "$0.00",
    // },
  ];
  return (
    <div className="bg-gray-100  flex flex-col gap-4 px-5 py-5">
      <div className="flex items-center gap-2 px-4 py-2">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/seller-reports.png"
          alt=""
          className="w-7 h-7"
        />
        <h1 className="text-xl font-bold text-nowrap">Vendor Reports</h1>
      </div>
      <div className="rounded-md border bg-white border-gray-300 shadow-md hover:shadow-md px-5 py-5 ">
        <h1 className="font-bold text-md">Filter Data</h1> <br />
        <div className="flex items-center gap-2 lg:gap-8">
          <select
            name=""
            id=""
            className="text-md  bg-white px-2 rounded py-2 w-52 outline-none hover:border-primary-500"
          >
            <option value="">This Year</option>
            <option value="">This Month</option>
            <option value="">This Week</option>
            <option value="">This Day</option>
            <option value="">Custom Date</option>
          </select>
          <button
            className="px-6 w-52 py-2 rounded border border-primary-500 bg-primary-500    hover:bg-primary-dark-500 text-white"
            style={{ color: "white" }}
          >
            Filter
          </button>
        </div>
      </div>
      <div className="  pt-5">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-5">
          {/* ////////// */}

          <div className="col-span-3 flex flex-col gap-5">
            <div className="bg-white p-10  rounded-lg shadow-md ">
              <div className="flex items-center gap-5">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/stores.svg"
                  alt=""
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-xl  font-bold">0</p>
                  <h2 className="text-[.8rem] font-semibold">Total Vendor</h2>
                </div>
              </div>
            </div>
            <div className="bg-white p-10  rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/cart.svg"
                  alt=""
                  className="h-10 w-10 "
                />
                <div>
                  <p className="text-xl font-bold"></p>
                  <h2 className="font-semibold text-[.7rem] ">
                    Total Vendor Products
                  </h2>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <div className="text-red-500 text-[1rem] font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.8rem]">Cancel</span>
                </div>
                <div className="text-blue-500 text-[1rem] font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.8rem]">Ongoing</span>
                </div>
                {/* <div className=" text-[1em] text-blue-500 font-semibold">
              $57,225.00 <br />{" "}
              <span className="text-gray-400 text-[.8rem] font-semibold">
                In House
              </span>
            </div> */}
                <div className="text-primary-500 text-[1rem] font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.8rem]"> Complated</span>
                </div>
              </div>
            </div>
            {/* //////////////////// */}
            <div className="bg-white p-10  rounded-lg shadow-md ">
              <div className="flex items-center gap-5">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/deliveryman.svg"
                  alt=""
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-xl  font-bold">0</p>
                  <h2 className="text-[.8rem] font-semibold">
                    Total DeliveryMan
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4  md:col-span-4">
            {/* -------------------- */}
            <div className="bg-white p-6 rounded-lg shadow-md h-full  flex flex-col gap-5">
              <h2 className="text-xl font-semibold">Order Statistics</h2>
              <Line data={graphdata} options={options} className="" />
            </div>
          </div>
          <div className="col-span-3 md:col-span-3">
            {/* -------------------------------
             */}
            <div className="bg-white flex flex-col justify-center gap-4  items-center h-full  rounded-lg shadow-md">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/earnings.svg"
                className="w-16 h-16"
                alt=""
              />
              <p className="text-[1rem]">Total Shop Earnings</p>
              <h1 className="text-xl font-semibold">PKR 0</h1>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* //////////// */}
      {/* ///////////// */}
      <div className="card ">
        <div className="px-3 py-4">
          <div className="flex justify-between gap-3 align-items-center flex-col lg:flex-row">
            <h5 className="mb-0 text-capitalize d-flex gap-2 mr-auto font-bold">
              Total Vendor{" "}
              <span className="badge badge-soft-dark radius-50 fz-12 ml-1"></span>
            </h5>

            <div className="flex  gap-3 flex-col md:flex-row">
              <form
                action="https://6valley.6amtech.com/admin/customer/subscriber-list"
                method="GET"
                className="w-[100%] "
              >
                <div className="input-group input-group-merge input-group-custom">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <FaSearch />
                    </div>
                  </div>
                  <input
                    id="datatableSearch_"
                    type="search"
                    name="searchValue"
                    className="form-control outline-none"
                    placeholder="Search by email"
                    aria-label="Search orders"
                    value=""
                  />
                  <button
                    type="submit"
                    className="btn bg-primary-500 hover:bg-primary-dark-500"
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
              <button
                type="button"
                className="rounded w-20 px-3 py-2 bg-primary-500 text-white hover:bg-primary-dark-500 text-nowrap btn-block flex gap-2 "
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  gap: "4",
                }}
                //   data-toggle="dropdown"
              >
                <FaDownload /> Export
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive ">
          <table className="table  table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left">
            <thead className="thead-light thead-50 text-capitalize ">
              <tr>
                <th>SL</th>
                <th>Vendor Info</th>
                <th>Earn From Order</th>

                <th>Earn From Shiping</th>
                <th className="">DeliveryMan Incentive</th>
                <th>Commission Given</th>
                <th>DisCount Given</th>
                <th className="">Tax Collected</th>
                <th className="">Refound Given</th>
                <th className="">Total Earning</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.sl}>
                  <td>{index + 1}</td>
                  <td>
                    <div>{item.duration}</div>
                  </td>
                  <td className="">{item.inHouse}</td>
                  <td>
                    <div className="">
                      <span>{item.commission}</span>
                    </div>
                  </td>
                  <td>{item.shipping}</td>
                  <td className="">{item.incentive}</td>
                  <td className="">{item.discount}</td>
                  <td className="">{item.incentive}</td>
                  <td className="">{item.tax}</td>
                  <td className="">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer d-flex justify-content-center align-items-center">
          {/* <p className="m-0">
    Showing 1 to {couponData.length} of {couponData.length} entries
  </p> */}
        </div>
      </div>
    </div>
  );
};

export default VendorSales;
