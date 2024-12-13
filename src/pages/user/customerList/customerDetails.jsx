import React, { useState } from "react";
import { FaDownload, FaEye, FaSearch, FaUser } from "react-icons/fa";
import ActionButton from "../../../components/ActionButton/Action";
import ExportButton from "../../../components/ActionButton/Export";

const CustomerDetails = ({
  customerId = "2",
  joinedAt = "18 Jul 2024 21:25:11",
  orders = [
    { id: 1, orderId: "100010", total: "Rs.5,900" },
    { id: 2, orderId: "100009", total: "Rs.24,800" },
    { id: 3, orderId: "100007", total: "Rs.4,250" },
  ],
  name = "khan",
  orderCount = 10,
  phone = "03007972196",
  email = "mirzabrother2020@gmail.com",
  logoUrl = "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleSearch = () => {
    const filtered = orders.filter(
      (order) =>
        order.orderId.includes(searchTerm) || order.total.includes(searchTerm)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="mx-5  md:p-4">
      <div className="flex items-center mb-4">
        <FaUser className="w-6 h-6 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Customer Details</h1>
      </div>

      <div className="flex gap-4 items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Customer ID #{customerId}
        </h2>
        <p className="text-sm text-gray-600">
          <span className="mr-2">📅</span>
          Joined At : {joinedAt}
        </p>
      </div>

      <div className="flex flex-col md:flex-row  gap-4 mb-6">
        <div className="flex-grow">
          {/* Search Input */}
          <div className="mb-4 flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID or Total"
              className="flex-grow border w-5 md:w-full border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary flex items-center"
            >
              <FaSearch className="w-5 h-5 text-white" />
              <span className="ml-2  sm:inline" style={{ color: "white" }}>
                Search
              </span>
            </button>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto shadow-sm rounded-md bg-white">
            <table className="w-full  border-collapse">
              <thead>
                <tr className="bg-secondary font-bold text-[1rem]">
                  <th className="border p-2 text-center">SI</th>
                  <th className="border p-2 text-center">Order ID</th>
                  <th className="border p-2 text-center">Total</th>
                  <th className="border p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.orderId}</td>
                    <td className="border p-2">{order.total}</td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        {/* <button className="btn border-primary text-primary hover:bg-primary hover:text-white">
                          <FaEye className="w-5 h-5" />
                        </button>
                        */}
                        <ActionButton
                          // to={`/brandupdate/${brand._id}`}
                          icon={FaEye} // Pass dynamic icon
                          className="ml-4"
                          label="View"
                        />
                        <button className="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded">
                          <FaDownload className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 w-full md:w-80">
          <div className="flex items-center mb-4">
            <FaUser className="w-6 h-6 text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-700">Customer</h2>
          </div>

          <div className="flex gap-4 mb-4">
            <img
              src={logoUrl}
              alt="Company logo"
              className="rounded-md h-24 w-20"
            />
            <div className="space-y-2">
              <h3 className="text-[1rem] font-semibold text-gray-800">
                {name}
              </h3>
              <p className="text-[1rem]  font-semibold text-gray-600">
                {orderCount} Orders
              </p>
              <p className="text-[1rem] text-gray-700  font-semibold">
                {phone}
              </p>
            </div>
          </div>
          <p className="text-[1rem] text-gray-700">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
