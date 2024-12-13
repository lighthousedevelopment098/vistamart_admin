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
const ExpenceTranscation = () => {
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
        <div className="grid grid-cols-3 gap-3">
          <select
            name=""
            id=""
            className="text-md  bg-white px-2 rounded py-2 outline-none"
          >
            <option value="">This Year</option>
            <option value="">This Month</option>
            <option value="">This Week</option>
          </select>
          <div className="">
            <button
              className="px-6  py-2 rounded border border-primary-500  bg-primary-500 hover:bg-primary-dark-500 text-white"
              style={{ color: "white" }}
            >
              Filter
            </button>
          </div>
        </div>{" "}
        <br />
      </div>
      <div className="  pt-5">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-5">
          {/* ////////// */}

          <div className="col-span-4 flex flex-col gap-5">
            <div className="bg-white py-16 px-4 rounded-lg shadow-md">
              <div className="flex  gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/expense.svg"
                  alt=""
                  className="h-10 w-10 "
                />
                <div>
                  <p className="text-xl font-bold pb-3">PKR 0</p>
                  <h2 className="font-bold text-[.9rem] ">Total Expense</h2>
                </div>
              </div>
            </div>
            {/* //////////////////// */}
            <div className="bg-white py-16 px-4 rounded-lg shadow-md">
              <div className="flex  gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/free-delivery.svg"
                  alt=""
                  className="h-10 w-10 "
                />
                <div>
                  <p className="text-xl font-bold pb-3">PKR 0</p>
                  <h2 className="font-bold text-[.9rem] ">Free Delivery</h2>
                </div>
              </div>
            </div>
            <div className="bg-white py-16 px-4 rounded-lg shadow-md">
              <div className="flex  gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/coupon-discount.svg"
                  alt=""
                  className="h-10 w-10 "
                />
                <div>
                  <p className="text-xl font-bold pb-3">PKR 0</p>
                  <h2 className="font-bold text-[.9rem] ">Coupon Discount </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4  md:col-span-6">
            {/* -------------------- */}
            <div className="bg-white p-6 rounded-lg shadow-md h-full  flex flex-col gap-5">
              <h2 className="text-xl font-semibold">Order Statistics</h2>
              <Line data={graphdata} options={options} className="" />
            </div>
          </div>
          {/* <div className="col-span-3 md:col-span-3">
           
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Payment Statistics</h2>
              <div className="flex justify-center mt-4">
                <div className="w-32 h-32 bg-blue-500 rounded-full relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                    $221.7K+
                  </div>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                <li>Cash payments ($195,512.81)</li>
                <li>Digital payments ($19,786.00)</li>
                <li>Offline payments ($0.00)</li>
                <li>Wallet ($6,355.00)</li>
              </ul>
            </div>
          </div> */}
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

            <div className="flex  gap-3 flex-col lg:flex-row w-40 md:w-full lg:w-[30vw]">
              <form
                action="https://6valley.6amtech.com/admin/customer/subscriber-list"
                method="GET"
                className="w-80 "
              >
                <div className="input-group input-group-merge input-group-custom w-40  md:w-full">
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
                filename="ExpenceTranscation" // Optional filename for the exported file
                icon={FaDownload} // Icon for the button
                label="Export " // Button label
                className="bg-primary-500 text-white hover:bg-primary-dark-500 w-40 " // Tailwind classes for styling
                style={{ color: "white" }} // Optional inline styles
              />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table overflow-y-auto table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left">
            <thead className="thead-light thead-50 text-capitalize ">
              <tr>
                <th>SL</th>
                <th>XID</th>
                <th>Transaction Date</th>

                <th>Order ID </th>

                <th className="">Expense Amount</th>
                <th className="">Expense Type</th>

                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.sl}>
                  <td>{index + 1}</td>
                  <td>{item.orderid}</td>
                  <td>3 May 2023 04:20:30 pm</td>
                  {/* <td>
                    <div>{item.duration}</div>
                  </td> */}
                  <td className="">{item.inHouse}</td>
                  <td>
                    <div className="">
                      <span>{item.commission}</span>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <span>{item.commission}</span>
                    </div>
                  </td>

                  <td className="   text-primary-500 ">
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

export default ExpenceTranscation;
