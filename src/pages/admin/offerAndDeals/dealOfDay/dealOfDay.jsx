import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  createDeal,
  deleteDeal,
  fetchDeals,
  updateDeal,
  updateDealStatus,
} from "../../../../redux/slices/admin/dealOfDaySlice";
import { fetchProducts } from "../../../../redux/slices/admin/productSlice";
import ActionButton from "../../../../components/ActionButton/Action";
import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai";
import apiConfig from "../../../../config/apiConfig";

const DealOfTheDay = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.dealOfTheDay.deals);
  const loading = useSelector((state) => state.dealOfTheDay.loading);
  const { products } = useSelector((state) => state.product);

  const [title, setTitle] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDealId, setCurrentDealId] = useState(null); // Track deal being updated
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDeals());
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log("deal of the day =", deals)
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setDropdownOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status of this deal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateDealStatus({ id, status: newStatus }));
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !selectedProduct) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "OK",
      });
      return;
    }

    const data = {
      title,
      product: selectedProduct._id,
    };

    try {
      if (currentDealId) {
        await dispatch(updateDeal({ id: currentDealId, data })).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Deal has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#4CAF50",
          confirmButtonText: "OK",
        });
        dispatch(fetchDeals());
        setCurrentDealId(null);
      } else {
        await dispatch(createDeal(data)).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Deal has been added successfully.",
          icon: "success",
          confirmButtonColor: "#4CAF50",
          confirmButtonText: "OK",
        });
        dispatch(fetchDeals());
      }
      setTitle("");
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error posting deal:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add or update the deal. Please try again.",
        icon: "error",
        confirmButtonColor: "#4CAF50",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEdit = (dealItem) => {
    setTitle(dealItem.title);
    setSelectedProduct(dealItem.product);
    setCurrentDealId(dealItem._id);

    // Scroll smoothly to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDeal(id));
      }
    });
  };

  return (
    <div className="content container-fluid">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex gap-2">
          <img
            width="20"
            src="/deal_of_the_day.png"
            alt=""
          />
          Deal of the Day
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="text-start">
                <ul className="nav nav-tabs w-fit-content mb-4">
                  <li className="nav-item text-capitalize">
                    <a
                      className="nav-link lang-link active"
                      href="javascript:;"
                      id="en-link"
                    >
                      English (EN)
                    </a>
                  </li>
                  {/* <li className="nav-item text-capitalize">
                    <a
                      className="nav-link lang-link"
                      href="javascript:;"
                      id="sa-link"
                    >
                      Arabic (SA)
                    </a>
                  </li>
                  <li className="nav-item text-capitalize">
                    <a
                      className="nav-link lang-link"
                      href="javascript:;"
                      id="bd-link"
                    >
                      Bangla (BD)
                    </a>
                  </li>
                  <li className="nav-item text-capitalize">
                    <a
                      className="nav-link lang-link"
                      href="javascript:;"
                      id="in-link"
                    >
                      Hindi (IN)
                    </a>
                  </li> */}
                </ul>
                <div className="form-group">
                  <div className="row lang-form" id="en-form">
                    <div className="col-md-12">
                      <label htmlFor="title">Title (EN)</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control outline-none hover:border-primary-500"
                        id="title"
                        placeholder="Ex: LUX"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label htmlFor="product" className="title-color">
                        Products
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          className="form-control text-left text-capitalize w-full bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm flex items-center justify-between"
                          onClick={toggleDropdown}
                        >
                          {selectedProduct
                            ? selectedProduct.name
                            : "Select product"}
                          <svg
                            className={`w-5 h-5 transition-transform transform ${
                              dropdownOpen ? "rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {dropdownOpen && (
                          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            <div className="relative p-2">
                              <div className="relative mb-2">
                                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                  type="text"
                                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none hover:border-primary-500 focus:border-primary-dark-500"
                                  placeholder="Search product..."
                                />
                              </div>
                              <div className="space-y-3">
                                {products.map((product) => (
                                  <div
                                    key={product._id}
                                    className="flex items-center gap-3 p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleProductSelect(product)}
                                  >
                                    <img
                                      className="w-10 h-10 border border-gray-200 rounded"
                                      src={`${apiConfig.bucket}/${product?.thumbnail}`}
                                      alt="product"
                                    />
                                    <div className="flex-1">
                                      <h5 className="text-sm font-medium text-gray-900">
                                        {product.name.length > 20
                                          ? `${product?.name.slice(0, 20)}...`
                                          : product?.name}
                                      </h5>
                                    </div>
                                    <AiOutlineCheckCircle className="text-primary-500" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-primary-dark mt-4 text-white"
                  style={{ color: "white" }}
                >
                  {currentDealId ? "Update Deal" : "Add Deal"}
                </button>
              </form>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
  {deals ? (
    Array.isArray(deals) && deals.length > 0 ? (
      deals.map((dealItem, index) => (
        <tr key={dealItem._id}>
          <td>{index + 1}</td>
          {console.log("dealitem----", dealItem)}
          <td>{dealItem.products[0]?.name || "N/A"}</td>
          <td>{dealItem.title || "N/A"}</td>
          <td>
            <label className="switcher">
              <input
                type="checkbox"
                className="switcher_input"
                checked={dealItem.status === "active"}
                onChange={() => toggleStatus(dealItem._id, dealItem.status)}
              />
              <span className="switcher_control"></span>
            </label>
          </td>
          <td className="text-center flex justify-center">
            <div className="d-flex gap-2">
              <button
                title="Edit"
                className="btn btn-sm border-green-400 hover:bg-green-400 hover:text-white"
                onClick={() => handleEdit(dealItem)}
              >
                <FaPen />
              </button>
              <ActionButton
                onClick={() => handleDelete(dealItem._id)}
                icon={FaTrash}
                className="ml-4"
                label="Delete"
              />
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5">No deals available</td>
      </tr>
    )
  ) : (
    <tr>
      <td colSpan="5">Loading deals...</td>
    </tr>
  )}
</tbody>


              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay;
