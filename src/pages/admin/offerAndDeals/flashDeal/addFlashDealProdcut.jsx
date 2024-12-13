import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFlashDealById,
  addProductToFlashDeal,
  removeProductFromFlashDeal,
} from "../../../../redux/slices/admin/flashDealSlice";
import { fetchProducts } from "../../../../redux/slices/admin/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import apiConfig from "../../../../config/apiConfig";

const AddFlashDealProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const { flashDeal } = useSelector((state) => state.flashDeals);
  const { flashDeals } = useSelector((state) => state.flashDeals);
  const flashDeal = flashDeals.find((deal) => deal._id === id); // Assuming 'id' is available in the component

  const { products } = useSelector((state) => state.product);

  console.log("State of flashDeals:", flashDeal);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProductsData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFlashDealById(id));
  }, [dispatch, id]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedProduct) {
      dispatch(
        addProductToFlashDeal({ id: id, productId: selectedProduct._id })
      )
        .then(() => {
          toast.success("Product added successfully.");
          dispatch(fetchFlashDealById(id));
        })
        .catch((error) => {
          console.error("Error adding product to flash deal:", error);
          toast.error("Error adding product to flash deal.");
        });
    } else {
      toast.warn("Please select a product.");
    }
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProductFromFlashDeal({ flashDealId: id, productId }))
          .then(() => {
            toast.success("Product removed successfully.");
          })
          .catch((error) => {
            console.error("Error removing product from flash deal:", error);
            toast.error("Error removing product from flash deal.");
          });
      }
    });
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
              <h3 className="mb-0 text-capitalize">
                Add Product to Flash Deal
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label htmlFor="product" className="text-gray-700">
                        Products
                      </label>
                      <div ref={dropdownRef} className="relative">
                        <button
                          type="button"
                          className="w-full bg-white-200 border text-left p-2 rounded-lg focus:outline-none"
                          onClick={toggleDropdown}
                        >
                          {selectedProduct
                            ? selectedProduct.name
                            : "Select product"}
                        </button>
                        {dropdownOpen && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
                            <div className="flex items-center p-2">
                              <button type="button" className="">
                                <AiOutlineSearch />
                              </button>
                              <input
                                type="text"
                                className="ml-2 border rounded-lg p-1 w-full"
                                placeholder="Search products..."
                              />
                            </div>
                            <div className="max-h-40 overflow-y-auto">
                              {products.map((product) => (
                                <div
                                  key={product._id}
                                  className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                                  onClick={() => handleProductSelect(product)}
                                >
                                  <img
                                    className="h-10 w-10 rounded border"
                                    src={`${apiConfig.bucket}/${product?.thumbnail}`}
                                    alt="product"
                                  />
                                  <div className="ml-2 flex-1">
                                    <h5 className="text-gray-800">
                                      {product?.name}
                                    </h5>
                                    <div className="text-gray-500 text-sm">
                                      {/* {product?.category} - {product?.brand} */}
                                    </div>
                                  </div>
                                  <div>
                                    <AiOutlineCheckCircle className="text-primary-500" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-dark-500"
                    style={{ color: "white", fontWeight: "bold" }}
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
                  {flashDeal ? flashDeal.activeProducts : 0}
                </span>
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-borderless table-nowrap table-align-middle w-full">
                <thead className="bg-secondary-500 text-gray-600">
                  <tr>
                    <th>SL</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {flashDeal &&
                  Array.isArray(flashDeal.products) &&
                  flashDeal.products.length > 0 ? (
                    flashDeal.products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${apiConfig.bucket}/${product?.thumbnail}`}
                            alt={product.name}
                            className="h-16 w-16 rounded"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td className="text-center">
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <AiOutlineDelete />
                          </button>
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

export default AddFlashDealProduct;
