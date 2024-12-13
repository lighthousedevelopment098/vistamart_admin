import React, { useState } from "react";
import { FaChevronDown, FaEdit, FaFileImport, FaTrash } from "react-icons/fa";
import { FiSearch, FiEdit, FiTrash } from "react-icons/fi"; // Importing icons
import { CiImport } from "react-icons/ci";
import { BiHide } from "react-icons/bi";
import Switcher from "../../../components/FormInput/Switcher";
const DeliveryManList = () => {
  const list = [
    {
      id: 27,
      name: "Computer, Office & Security",
      img: "https://6valley.6amtech.com/storage/app/public/category/2023-06-13-64881969b0222.png",
      priority: 3,
    },
    // {
    //   id: 26,
    //   name: "Mobile Accessories",
    //   img: "https://6valley.6amtech.com/storage/app/public/category/2023-06-13-64881b1462dd9.png",
    //   priority: 4,
    // },
    // {
    //   id: 25,
    //   name: "Beauty, Health & Hair",
    //   img: "https://6valley.6amtech.com/storage/app/public/category/2023-06-13-64881a1265b65.png",
    //   priority: 5,
    // },
  ];
  const deliveryMen = [
    // {
    //   id: 1,
    //   name: "Will Smith",
    //   email: "w********@gmail.com",
    //   phone: "8**********",
    //   orders: 13,
    //   rating: 4.5,
    //   status: true,
    //   image:
    //     "https://6valley.6amtech.com/storage/app/public/delivery-man/2022-11-20-6379f432228b8.png", // Replace with actual image path
    // },
    // Add more delivery men as needed
  ];
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex align-items-center gap-3">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/deliveryman.png"
            alt=""
            className="w-7 h-7"
          />
          <h1 className="text-2xl font-semibold">Delivery Man 4</h1>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md">
        <div className="p-4 border-b border-gray-300 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-300 rounded-md py-2 px-4 w-24 md:w-40 lg:w-full outline-none"
              placeholder="Search by name, contact info"
            />
            <button
              className="bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-dark-500 "
              style={{ color: "white" }}
            >
              Search
            </button>
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row gap-3 w-40 md:w-auto">
            <button className="border-2 border-primary-500 bg-white text-primary-500 items-center flex-grow flex gap-2 py-2 px-4 rounded-md hover:bg-primary-dark-500">
              <FaChevronDown />
              Export
            </button>
            <button
              className="bg-primary-500 text-white text-nowrap flex-grow py-2 px-4 rounded-md hover:bg-primary-dark-500"
              style={{ color: "white" }}
            >
              + Add Delivery Man
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-50 text-blue-900 ">
                <tr className="text-[.7rem] font-semibold">
                  <th className="px-4 py-2"> SL</th>
                  <th className="px-4 py-2 text-center"> Name</th>
                  <th className="px-4 py-2 text-center">Contact Info</th>
                  <th className="px-4 py-2"> Total Orders</th>

                  <th className="px-4 py-2 text-center"> Rating</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {deliveryMen.map((deliveryMan, index) => (
                  <tr key={deliveryMan.id} className=" hover:bg-gray-100">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {index + 1}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                      <img
                        src={deliveryMan.image}
                        alt="profile"
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      {deliveryMan.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div>{deliveryMan.email}</div>
                      <div>{deliveryMan.phone}</div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {deliveryMan.orders}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center">
                        {deliveryMan.rating} <span className="ml-2">⭐</span>
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <form>
                        {/* <label className="switch flex justify-center items-center">
                          <input
                            type="checkbox"
                            className=""
                            name="featured"
                            checked={deliveryMan.featured}
                            readOnly
                          />
                          <span
                            className={`slider ${
                              deliveryMan.name ? "bg-primary-500" : "bg-gray-300"
                            }`}
                          />
                        </label> */}

                        <Switcher />
                      </form>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary-500 btn-sm text-primary-500 border-primary-500"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary-500 btn-sm text-primary-500  border-primary-500"
                        >
                          <BiHide />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm text-pink-500 border-pink-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManList;
