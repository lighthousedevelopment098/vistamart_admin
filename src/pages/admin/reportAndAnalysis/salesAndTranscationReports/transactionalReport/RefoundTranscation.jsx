import React from "react";
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
const RefoundTranscation = () => {
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
    <div className="card">
      <div className="px-3 py-4">
        <div className="flex justify-between gap-3 align-items-center flex-col lg:flex-row">
          <h5 className="mb-0 text-capitalize d-flex gap-2 mr-auto font-bold">
            Total Transactions{" "}
            <span className="badge badge-soft-dark radius-50 fz-12 ml-1"></span>
          </h5>

          <div className="flex flex-col md:flex-row gap-3 w-40 md:w-full  lg:w-[40vw]">
            <form
              action="https://6valley.6amtech.com/admin/customer/subscriber-list"
              method="GET"
              className="w-80 "
            >
              <div className="input-group input-group-merge input-group-custom w-52 md:w-full">
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
            <select
              name=""
              id=""
              className="text-md  bg-white px-2 rounded py-2 outline-none"
            >
              <option value="">All</option>
              <option value="">Cash</option>
              <option value="">Digitol Paid</option>
            </select>
            <button
              className="px-6  py-2 rounded border border-primary-500 bg-primary-500 hover:bg-primary-dark-500 text-white"
              style={{ color: "white" }}
            >
              Filter
            </button>

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
            <ExportButton
              data={data} // Pass the data to export
              filename="RefoundTranscation" // Optional filename for the exported file
              icon={FaDownload} // Icon for the button
              label="Export " // Button label
              className="bg-primary-500 text-white hover:bg-primary-dark-500" // Tailwind classes for styling
              style={{ color: "white" }} // Optional inline styles
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table overflow-y-auto table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left">
          <thead className="thead-light bg-secondary-500 thead-50 text-capitalize ">
            <tr>
              <th>SL</th>
              <th>Product</th>
              <th>Refund Id</th>
              <th>Order ID </th>
              <th className="">Shop Name</th>
              <th>Payment Status</th>
              <td> Paid By</td>
              <td>Amount</td>
              <td>Transaction Type</td>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.sl}>
                <td>{index + 1}</td>
                <td className="flex gap-2 items-center">
                  <img
                    src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                    alt=""
                    className="w-7 h-7"
                  />{" "}
                  <span>Women's Long-Sleeve...</span>
                </td>
                <td></td>
                {/* <td>
              <div>{item.duration}</div>
            </td> */}
                <td className=""></td>
                <td>
                  <div className="">
                    <span>Inhouse</span>
                  </div>
                </td>
                <td>
                  <div className="">
                    <span> Digitally Paid</span>
                  </div>
                </td>
                <td>Paid</td>
                <td>Admin</td>
                <td>PKR </td>
                <td>Refunded</td>
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
  );
};

export default RefoundTranscation;
