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
import { IoMdDownload } from "react-icons/io";
import ExportButton from "../../../../../components/ActionButton/Export";
const OrderTranscation = () => {
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
    //   orderid: "100187",
    //   duration: "Abc Abc",
    //   inHouse: "$-250.00",
    //   commission: "$0.00",
    //   shipping: "$0.00",
    //   incentive: "$0.00",
    //   discount: "$0.00",
    //   tax: "$0.00",
    //   refound: "$0.00",
    //   deliverd: "admin",
    //   total: "$0.00",
    // },
  ];
  return (
    <div className="bg-secondary-500  flex flex-col gap-4 px-5 py-5">
      <div className="rounded-md border bg-white border-gray-300 shadow-md hover:shadow-md px-5 py-5">
        <h1 className="font-bold text-md">Filter Data</h1> <br />
        <div className="grid grid-cols-4 gap-3 ">
          <select
            name=""
            id=""
            className="text-md  bg-white px-2 rounded py-2 outline-none hover:border-primary-500"
          >
            <option value="">All Status</option>
            <option value="">Hold</option>
            <option value="">Disburse</option>
          </select>
          <select
            name=""
            id=""
            className="text-md  bg-white px-2 rounded py-2  outline-none hover:border-primary-500"
          >
            <option value="">All Status</option>
            <option value="">Inhouse</option>
            <option value="">This Week</option>
            <option value="">This Day</option>
            <option value="">Custom Date</option>
          </select>
          <select
            name=""
            id=""
            className="text-md  bg-white px-2 rounded py-2  outline-none"
          >
            <option value="">All Customer</option>
            <option value="">Jack Lop</option>
            <option value="">This Week</option>
            <option value="">This Day</option>
            <option value="">Custom Date</option>
          </select>
          <select
            name=""
            id=""
            className="text-md  bg-white px-2 rounded py-2  outline-none"
          >
            <option value="">This Year</option>
            <option value="">This Month</option>
            <option value="">This Week</option>
            <option value="">This Day</option>
            <option value="">Custom Date</option>
          </select>
        </div>{" "}
        <br />
        <div className="flex justify-end">
          <button
            className="px-6  py-2 rounded border border-primary-500 bg-primary-500 hover:bg-primary-dark-500 text-white"
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
            <div className="bg-white p-10  rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/cart.svg"
                  alt=""
                  className="h-10 w-10 "
                />
                <div>
                  <p className="text-xl font-bold"></p>
                  <h2 className="font-semibold text-[.7rem] ">Total Order</h2>
                </div>
              </div>
              <div className="flex justify-between  mt-4">
                {/* <div className="text-red-500 text-[1rem] font-semibold">
                  $2,280.97 <br />{" "}
                  <span className="text-gray-400 text-[.8rem]">Commission</span>
                </div> */}
                <div className="text-primary-500 text-[1rem] text-center font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.7rem]">
                    In House Orders
                  </span>
                </div>
                {/* <div className=" text-[1em] text-blue-500 font-semibold">
              $57,225.00 <br />{" "}
              <span className="text-gray-400 text-[.8rem] font-semibold">
                In House
              </span>
            </div> */}
                <div className="text-primary-500 text-center text-[1rem] font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.7rem]">
                    {" "}
                    Vendor Orders
                  </span>
                </div>
              </div>
            </div>
            {/* //////////////////// */}
            <div className="bg-white p-10  rounded-lg shadow-md ">
              <div className="flex items-center gap-5 pb-5">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/products.svg"
                  alt=""
                  className="w-10 h-10"
                />
              </div>
              <div className=" flex justify-center items-center gap-3">
                <div className="text-secondary-500 text-[1rem] text-center font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.6rem]">
                    In House Orders
                  </span>
                </div>
                <div className="text-primary-500 text-center text-[1rem] font-semibold">
                  <br />{" "}
                  <span className="text-gray-400 text-[.6rem]">
                    {" "}
                    Vendor Orders
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-10  rounded-lg shadow-md ">
              <div className="flex items-center gap-5">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/stores.svg"
                  alt=""
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-xl  font-bold"></p>
                  <h2 className="text-[.8rem] font-semibold">Total Vendor</h2>
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Payment Statistics</h2>
              <div className="flex justify-center mt-4">
                <div className="w-32 h-32 bg-primary-500 rounded-full relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    PKR
                  </div>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                <li>Cash payments (PKR 0)</li>
                <li>Digital payments (PKR 0)</li>
                <li>Offline payments (PKR 0)</li>
                <li>Wallet (PKR 0)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* //////////// */}
      {/* ///////////// */}
      <div className="card">
        <div className="px-3 py-4">
          <div className="flex justify-between gap-3 align-items-center flex-col lg:flex-row">
            <h5 className="mb-0 text-capitalize d-flex gap-2 mr-auto text-[1rem] font-semibold">
              Total Transactions{" "}
              <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                2
              </span>
            </h5>

            <div className="flex  gap-3 flex-col md:flex-row w-40 lg:w-[30vw]">
              <form
                action="https://6valley.6amtech.com/admin/customer/subscriber-list"
                method="GET"
                className="w-80 "
              >
                <div className="input-group input-group-merge input-group-custom w-44 lg:w-full">
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
                    className="btn bg-primary hover:bg-primary-dark"
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
              {/* <button
                type="button"
                className="rounded w-40 px-3 py-2 pr-4 bg-[#A1CB46] text-white hover:bg-[#7e9f37] text-nowrap btn-block flex gap-2 "
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  gap: "4",
                }}
                //   data-toggle="dropdown"
              >
                <FaDownload className="text-md" /> DownLoad PDF
              </button> */}
              <ExportButton
                data={data} // Pass the data to export
                filename="OrderTranscation" // Optional filename for the exported file
                icon={FaDownload} // Icon for the button
                label="Export " // Button label
                className="bg-primary text-white hover:bg-primary-dark" // Tailwind classes for styling
                style={{ color: "white" }} // Optional inline styles
              />
              {/* <button
                type="button"
                className="rounded w-32 px-3 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37] text-nowrap btn-block flex gap-2 "
                style={{
                  display: "flex",
                  color: "white",
                  alignItems: "center",
                  gap: "4",
                }}
                //   data-toggle="dropdown"
              >
                <FaDownload className="text-md" /> Export
              </button> */}
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table overflow-y-auto table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left">
            <thead className="thead-light thead-50 text-capitalize ">
              <tr>
                <th>SL</th>
                <th>Order ID</th>
                <th>Shop Name</th>

                <th>Customer Name </th>

                <th className="">Total Product Amount</th>
                <th className="">Product Discount</th>
                <th className="">Coupan Discount</th>
                <th className="">Discount Amount</th>
                <th className="">VAT/TAX</th>
                <th className="">Shiping Charge</th>
                <th className="">Order Amount</th>
                <th className="">Delivered By</th>
                <th className="">Deliveryman Incentive</th>
                <th className="">Admin Discount</th>
                <th className="">Vendor Discount</th>
                <th className="">Admin Commission</th>
                <th className="">Admin Net Income</th>
                <th className="">Vendor Net Income</th>
                <th className="">Payment Method</th>
                <th className="">Payment Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.sl}>
                  <td>{index + 1}</td>
                  <td>{item.orderid}</td>
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
                  <td className="">{item.tax}</td>

                  <td className="">{item.total}</td>
                  <td>{item.deliverd}</td>

                  <td className="">{item.tax}</td>
                  <td className="">{item.total}</td>
                  <td className="">{item.tax}</td>
                  <td className="">{item.total}</td>

                  <td className="">Cash On Delivery</td>
                  <td className="text-green-400  rounded  ">Dispurse</td>
                  <td className="   text-green-500 ">
                    <IoMdDownload />
                  </td>
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

export default OrderTranscation;
