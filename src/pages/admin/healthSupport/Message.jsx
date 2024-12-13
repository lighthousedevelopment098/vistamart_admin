import React from "react";

import { FaSearch } from "react-icons/fa";

const Message = () => {
  return (
    <>
      <div className="bg-secondary-500 w-full h-full p-7">
        <div className="pt-6 pl-8 gap-3 flex">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/support-ticket.png"
            alt="Support Ticket Icon"
          />
          <p className="text-slate-900 text-lg font-semibold">Chatting List</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 pt-5">
          <div className="bg-white h-[80vh] w-60 rounded-lg">
            <form className="relative pt-5 pl-2 pr-2 justify-center">
              {/* <input
                type="text"
                name="search"
                placeholder="Search..."
                aria-label="Search"
                className="w-full px-3 py-2 font-semibold bg-[#EBEDF1] placeholder-gray-500 text-black rounded-lg border-none ring-2 ring-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              /> */}

              <input
                type="text"
                name="username"
                placeholder="Search customers..."
                className="border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </form>
            <div className="h-full">
              {" "}
              {/* Ensure parent container has sufficient height */}
              <div>
                <p className="text-primary-500 pt-8 pl-6 font-semibold border-primary-500 mb-4">
                  Customer
                </p>
                <p className="border-b-4 border-primary-500 mb-6 mr-24 ml-5"></p>
                <p className="text-gray-700 pl-5">Delivery Man</p>
              </div>
            </div>
          </div>

          <div className="bg-white h-[80vh] w-full rounded-lg">
            <div className="bg-white h-full w-full rounded-lg flex flex-col items-center justify-center">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/empty-message.png"
                alt="Empty Message"
                className="max-w-full max-h-full"
              />
              <p className="mt-4 text-gray-600 text-center">
                You haven't had any conversations yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
