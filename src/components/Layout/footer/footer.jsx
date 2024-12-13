import React from "react";
import { IoMdPerson } from "react-icons/io";
import { IoHomeSharp, IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=" flex justify-center flex-wrap gap-2  lg:flex-row lg:justify-between md:mx-8  items-center my-6">
        <div className="text-nowrap ">VistaMart CMS. Copyright@2024</div>
        <div className=" flex justify-center flex-col md:flex-row gap-4">
          <div>
            <Link
              to={"/addpickupaddress"}
              className="flex items-center text-nowrap gap-2"
            >
              <IoSettings />
              <h1>Add Pickup Address</h1>
            </Link>
          </div>
          <div>
            <Link
              to={"/profileinformation"}
              className="flex items-center gap-2 hover:text-primary-500"
            >
              <IoMdPerson />
              <h1> Profile</h1>
            </Link>
          </div>
          <div>
            <Link
              to={"/"}
              className="flex items-center  gap-2 hover:text-primary-500"
            >
              <IoHomeSharp />
              <h1>Home</h1>
            </Link>
          </div>
          <h1
            className="bg-secondary-500  border rounded  text-[#24BAC3] p-1"
            style={{ color: "#" }}
          >
            Software version:14:7
          </h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
