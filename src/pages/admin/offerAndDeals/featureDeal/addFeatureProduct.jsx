import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../redux/slices/admin/productSlice"; // Import the fetchProducts action
import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axios from "axios";
import ImageApiUrl from "../../../../ImageApiUrl";
import apiConfig from "../../../../config/apiConfig";
import { getAuthData } from "../../../../utils/authHelper";

const ApiUrl = `${apiConfig.admin}`;

const AddNewProductComponent = () => {
  const { id } = useParams(); // Get the feature deal ID from the URL
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featureDeal, setFeatureDeal] = useState(null);
  const dropdownRef = useRef(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Fetch feature deal data
  const fetchFeatureDeal = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/featured-deals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from localStorage
        },
      });
      setFeatureDeal(response.data.doc);
    } catch (error) {
      //   console.error('Error fetching feature deal:', error);
      toast.error("Error fetching feature deal.");
    }
  };

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch the fetchProducts action to fetch products
    fetchFeatureDeal(); // Fetch feature deal data
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("id====", selectedProduct?._id);
    if (selectedProduct) {
      try {
        await axios.put(
          `${ApiUrl}/featured-deals/add-product/${id}`,
          {
            productId: selectedProduct._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token for authorization
            },
          }
        );
        toast.success("Product added successfully.");
        fetchFeatureDeal(); // Fetch updated feature deal data on success
      } catch (error) {
        // console.error('Error adding product to feature deal:', error);
        toast.error("Error adding product to feature deal.");
      }
    } else {
      toast.warn("Please select a product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `${ApiUrl}featured-deals/${id}/remove-product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use token for authorization
            },
          }
        );
        toast.success("Product removed successfully.");
        fetchFeatureDeal(); // Fetch updated feature deal data
      }
    } catch (error) {
      //   console.error('Error removing product from feature deal:', error);
      toast.error("Error removing product from feature deal.");
    }
  };

  return (
    <div className="content container-fluid">
      <ToastContainer />
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize flex gap-2">
          <img src="/inhouse-product-list.png" className="mb-1 mr-1" alt="" />{" "}
          Add new product
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0 text-capitalize">Featured deal</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
                                          ? `${product.name.slice(0, 20)}...`
                                          : product.name}
                                      </h5>
                                      <div className="text-xs text-gray-500">
                                        {product.category?.name ||
                                          "No category"}{" "}
                                        - {product.brand?.name || "No brand"}
                                      </div>
                                    </div>
                                    <AiOutlineCheckCircle className="text-green-500" />
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
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn text-white px-4"
                    style={{ background: "green", color: "white" }}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Product table section */}
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <h5 className="mb-0 text-capitalize">
                Product table{" "}
                <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                  {featureDeal ? featureDeal.activeProducts : 0}
                </span>
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                <thead className="thead-light thead-50 text-capitalize">
                  <tr>
                    <th>SL</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {featureDeal && featureDeal.products?.length > 0 ? (
                    featureDeal.products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        {console.log("product in table ====", product)}
                        <td>
                          <img
                            src={`${apiConfig.bucket}/${product?.thumbnail}`}
                            alt="Product"
                            className="avatar avatar-md border"
                          />
                        </td>
                        <td>
                          <span className="d-block hover:text-primary-500 mb-1">
                            {product?.name}
                          </span>
                        </td>
                        <td>
                          <span className="bg-secondary rounded text-dark px-2 py-1">
                            ${product?.price}
                          </span>
                        </td>
                        <td className="text-center">
                          <AiOutlineDelete
                            className="text-danger cursor-pointer"
                            onClick={() => handleDeleteProduct(product?._id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No products added yet.
                      </td>
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

export default AddNewProductComponent;
