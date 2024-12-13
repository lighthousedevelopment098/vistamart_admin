import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineStreetview } from "react-icons/md";

const Ticket_Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for tickets
  const tickets = [
    // {
    //   id: 1,
    //   name: "Devid Jack",
    //   priority: "Low",
    //   status: "Pending",
    //   type: "Complaint",
    //   date: "10 Jan 2023 02:38:AM",
    //   message: "While adding product",
    //   image:
    //     "https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png",
    // },
    // {
    //   id: 2,
    //   name: "Alice Brown",
    //   priority: "Medium",
    //   status: "Open",
    //   type: "Issue",
    //   date: "12 Jan 2023 11:15:AM",
    //   message: "Payment issue",
    //   image:
    //     "https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png",
    // },
    // Add more tickets as needed
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F9F9FB] min-h-screen p-5">
      <div className="flex items-center">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/support_ticket.png"
          alt="Support Ticket Icon"
          className="w-16 h-20 pt-5 pl-8"
        />
        <p className="text-lg pt-4 pl-2 font-semibold text-[#334257]">
          Support Ticket
        </p>
        <p className="text-xs font-semibold mt-4 text-[#334257] ml-4 bg-slate-400 rounded-full px-2 py-1">
          {tickets.length}
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between   mt-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Store..."
            className="border border-gray-300 rounded h-12 px-4 py-2 focus:outline-none focus:border-primary-500"
          />
          <button
            type="submit"
            className="bg-primary-500 text-white px-4 py-2 w-16 h-12  rounded hover:bg-primary-dark-500"
          >
            <FaSearch />
          </button>
        </form>

        <div className="flex mt-4 md:mt-0">
          <select className="border border-primary-500 rounded h-12 text-gray-700 px-4 mr-4">
            <option value="1">ALL Priority</option>
            <option value="2">Low</option>
            <option value="3">Medium</option>
            <option value="4">Urgent</option>
          </select>
          <select className="border border-primary-500 rounded h-12 text-gray-700 px-4">
            <option value="ALL status">All status</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
          </select>
        </div>
      </div>

      <div className="border-t-2 mt-9"></div>

      {/* Map over tickets */}
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white mt-5 w-full  rounded-lg shadow-md p-5"
        >
          <div className="flex items-center">
            <img
              src={ticket.image}
              className="h-14 w-14 rounded-full"
              alt="Profile"
            />
            <div className="ml-5">
              <p className="text-slate-700 text-xs">{ticket.name}</p>
              <div className="flex pt-2">
                <p className="text-xs text-red-700 bg-red-400 rounded-full px-3 py-1 mr-2">
                  {ticket.priority}
                </p>
                <p className="text-xs  bg-primary-500 hover:bg-primary-dark-500 text-white  rounded-full px-3 py-1 mr-2">
                  {ticket.status}
                </p>
              </div>
              <p className="text-slate-700 mt-3 text-sm">{ticket.type}</p>
              <p className="pt-4 text-sm">{ticket.date}</p>
            </div>
          </div>
          <div className="border-t-2 mt-6"></div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-slate-600">{ticket.message}</p>
            <button
              className="rounded-md bg-primary-500 hover:bg-primary-dark-500 h-10 w-20 text-white flex items-center justify-center"
              style={{ color: "white" }}
            >
              <MdOutlineStreetview className="mr-1" /> View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ticket_Support;
