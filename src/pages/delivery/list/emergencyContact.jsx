import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { FaChevronDown, FaEdit, FaPen, FaTrash } from "react-icons/fa";

import { MdDelete } from "react-icons/md";
import {
  FiSearch,
  FiDownload,
  FiChevronDown,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"; // Importing icons
import { CiImport } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import ActionButton from "../../../components/ActionButton/Action";
import Switcher from "../../../components/FormInput/Switcher";

const EmergencyContact = () => {
  const list = [];
  const staticProducts = [
    // {
    //   id: 1,
    //   name: "Product A",
    //   image:
    //     "https://6valley.6amtech.com/storage/app/public/banner/2024-01-14-65a370a244906.webp",
    //   type: "Electronics",
    //   price: 100,
    //   featured: true,
    //   active: true,
    // },
    // {
    //   id: 2,
    //   name: "Product B",
    //   image: "https://via.placeholder.com/50",
    //   type: "Furniture",
    //   price: 200,
    //   featured: false,
    //   active: false,
    // },
    // Add more products as needed
  ];

  // State to manage form inputs and filtered products
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
    searchValue: "",
  });

  const [products, setProducts] = useState(staticProducts);

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Apply filtering logic
    const filteredProducts = staticProducts.filter((product) => {
      return (
        (filters.searchValue === "" ||
          product.name
            .toLowerCase()
            .includes(filters.searchValue.toLowerCase())) &&
        (filters.category === "" || product.type === filters.category)
      );
    });
    setProducts(filteredProducts);
  };

  const handleReset = () => {
    setFilters({
      brand: "",
      category: "",
      subCategory: "",
      subSubCategory: "",
      searchValue: "",
    });
    setProducts(staticProducts);
  };

  return (
    <div className="font-semibold bg-secondary-500  px-5 py-5 text-[1rem]  ">
      <div className="flex gap-3">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-delivery-man.png"
          alt=""
          className="w-7 h-7"
        />
        <h1 className="text-[1rem] font-bold"> Emergency Contact</h1>
      </div>
      <div className="h-[70vh] md:h-[50vh] w-full bg-white  rounded-lg mt-3 px-10 py-8">
        <h3 className="text-[.9rem]  font-bold text-gray-600 mb-2 border-b-2 border-b-gray-300 w-100 flex gap-3 align-items-center">
          <IoMdPerson className="text-[1.4rem]" />
          Add New Contact Information
        </h3>
        <form>
          <div className="mb-4">
            <div className="">
              <div>
                <label className="block font-medium text-sm text-gray-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  placeholder="Contact Name"
                  className="mt-1 block w-full border px-3 py-2 font-medium text-base rounded-md border-gray-300 shadow-sm outline-none hover:border-primary-500 "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Phone
                </label>
                <div className="flex ">
                  <select className="mt-1 block px-3 py-2 w-14 md:w-28 text-sm font-medium outline-none bg-white border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>UK (+44)</option>
                    <option>US (+1)</option>
                    <option>IN (+91)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Ex:017********"
                    className="mt-1 block w-3/4 outline-none text-sm font-medium rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="flex justify-center md:justify-end mt-4">
                  <button
                    type="reset"
                    className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-dark-500 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    style={{ color: "white" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mb-4 h-full w-full bg-white  rounded-lg mt-3 px-10 py-8">
        <h3 className="text-sm font-bold text-gray-600 mb-2 border-b-2 border-b-gray-300 w-100 flex gap-3 align-items-center">
          <IoMdPerson />
          Account Information
        </h3>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="min-w-full  bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-secondary-500 font-semibold">
                <tr>
                  <th className="px-4 py-2">SL</th>
                  <th className="px-4 py-2"> Name</th>
                  <th className="px-4 py-2 text-center">Phone</th>

                  <th className="px-4 py-2 text-center">Status</th>

                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((product, index) => (
                  <tr key={product.id} className=" hover:bg-gray-100">
                    <td className="p-4" key={index}>
                      {product.id}
                    </td>
                    <td className="px-4 font-normal py-2">
                      <h1>{product.name}</h1>
                    </td>
                    <td className="px-4 py-2 text-center text-[.9rem]">
                      {product.phone}
                    </td>

                    <td className="px-4 py-2 text-center">
                      <form>
                        <label className="switch flex justify-center items-center">
                          {/* <input
                            type="checkbox"
                            className=""
                            name="featured"
                            checked={product.featured}
                            readOnly
                          /> */}
                          <Switcher />
                          <span
                            className={`slider ${
                              list.name ? "bg-primary-500" : "bg-gray-300"
                            }`}
                          />
                        </label>
                      </form>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        {/* <button
                          type="button"
                          className="btn btn-outline-primary  p-2 btn-sm text-blue-500 border-blue-500"
                        >
                          <FiEdit />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger p-2  btn-sm text-pink-500 border-pink-500"
                        >
                          <FiTrash />
                        </button> */}
                        <ActionButton
                          // to={`/brandupdate/${brand._id}`}
                          icon={FaEdit} // Pass dynamic icon
                          className="ml-4"
                          label="View"
                        />
                        <ActionButton
                          // onClick={() => handleDeleteBrand(brand._id)}
                          icon={FaTrash} // Pass dynamic icon
                          className="ml-4"
                          label="Delete"
                        />
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

export default EmergencyContact;
