import React, { useState } from "react";
import { BiHide } from "react-icons/bi";
import { CiImport } from "react-icons/ci";
import { FaChevronDown, FaDownload, FaEye } from "react-icons/fa";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";
import ActionButton from "../../../components/ActionButton/Action";
import ExportButton from "../../../components/ActionButton/Export";

const WithdrawRequest = () => {
  const list = [
    // {
    //   id: 1,
    //   name: "Will Smith",
    //   price: "$500.00",
    //   img: "Pending",
    //   priority: "20-Nov-2022, 01:41:01 AM",
    // },
    // {
    //   id: 2,
    //   price: "$4,000.00",
    //   name: "Will Smith",
    //   img: "Approud",
    //   priority: "20-Nov-2022, 01:40:43 AM",
    // },
  ];
  const staticProducts = [
    // {
    //   id: 1,
    //   name: "Product A",
    //   image: "https://via.placeholder.com/50",
    //   type: "Electronics",
    //   price: 100,
    //   featured: true,
    //   active: true,
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
    <div className="bg-[#F9F9FB]  px-5 py-5 w-[100%] mb-5">
      <div className="font-bold text-[1.3rem] flex gap-2 items-center">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
          alt=""
          className="h-7 w-7"
        />
        <h1>Withdraw Request</h1>
      </div>
      <div className="card mt-5 ">
        <div className="d-flex  justify-items-end  flex flex-col md:flex-row  align-items-center  px-5">
          <div className="flex gap-2">
            <h1 className="text-[1rem ] font-bold">Withdraw Request Table</h1>
            <span className="badge badge-soft-dark radius-50 fz-14 ml-1">
              {products.length}
            </span>
          </div>
          <div>
            <div className="px-3 py-4  ">
              <div className="flex flex-col md:flex-row lg:justify-between gap-4 w-full  lg:w-[50vw]">
                {/* Search Field */}
                <div className="w-full lg:w-auto">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="input-group input-group-custom input-group-merge">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FiSearch />
                        </div>
                      </div>
                      <input
                        type="search"
                        name="searchValue"
                        className="form-control outline-none "
                        placeholder="Search by Product Name"
                        value={filters.searchValue}
                        onChange={handleInputChange}
                      />
                      <button
                        type="submit"
                        className="btn  bg-primary-500 hover:bg-primary-dark-500 hover:text-white text-white"
                        style={{ color: "white" }}
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>

                {/* Export Button & Dropdown */}
                <div className="flex flex-row  items-center  justify-center w-full lg:w-auto lg:flex-row lg:items-center lg:justify-center gap-3">
                  <ExportButton
                    data={list}
                    filename="List"
                    icon={FaDownload}
                    label="Export "
                    className="bg-primary-500 text-white hover:bg-primary-dark-500"
                    style={{ color: "white" }}
                  />
                  <select
                    name="/"
                    className="border px-10 py-2 rounded outline-none border-gray-300 bg-white w-full sm:w-auto  sm:mt-0"
                  >
                    <option value="">All</option>
                    <option value="">Approved</option>
                    <option value="">Denied</option>
                    <option value="">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-secondary-500 font-semibold">
                <tr>
                  <th className="px-4 py-2">SL</th>
                  <th className="px-4 py-2 text-center">Amount</th>

                  <th className="px-4 py-2 text-center"> Name</th>

                  <th className="px-4 py-2 text-center">Request Time</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((product, index) => (
                  <tr key={product.id} className=" hover:bg-gray-100">
                    <td className=" px-3 py-4 text-center " key={index}>
                      {product.id}
                    </td>
                    <td className="px-4 py-2 text-center text-[.9rem] ">
                      {product.price}
                    </td>{" "}
                    <td className="px-4 py-2 text-center text-[.9rem] ">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 text-center ">
                      ${product.priority}
                    </td>
                    <td className="px-4 py-2 text-center  text-primary-500">
                      {product.img}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        {/* <button
                          type="button"
                          className="btn btn-outline-primary btn-sm text-blue-500 border-blue-500"
                        >
                          <BiHide />
                        </button> */}
                        <ActionButton
                          // to={`/brandupdate/${brand._id}`}
                          icon={FaEye} // Pass dynamic icon
                          className="ml-4"
                          label="View"
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

export default WithdrawRequest;
