import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

import { MdOutlineStarPurple500, MdStarBorder } from "react-icons/md";
import ApiUrl from "../../../ApiUrl";
import ImageApiUrl from "../../../ImageApiUrl";
// import { format } from 'date-fns';
const CustomerReviews = () => {
  const [products, setProducts] = useState([]);
  const [hasReviews, setHasReviews] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const id = "66a2231f79ae861206f8f8f9";
        const response = await axios.get(`${ApiUrl}reviews/`);
        const fetchedProducts = response.data.doc;

        // Filter products that have reviews
        const productsWithReviews = fetchedProducts.filter(
          (product) => product.reviews && product.reviews.length > 0
        );

        setProducts(productsWithReviews);
        setHasReviews(productsWithReviews.length > 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleStatusChange = async (reviewId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        newStatus === "Active" ? "activate" : "deactivate"
      } this review?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.patch(`${ApiUrl}/products/${reviewId}/status`, {
          status: newStatus,
        });
        // Update the local state to reflect the status change
        setProducts(
          products.map((product) => ({
            ...product,
            reviews: product.reviews.map((review) =>
              review._id === reviewId
                ? { ...review, status: newStatus }
                : review
            ),
          }))
        );

        Swal.fire(
          "Updated!",
          `The review has been ${
            newStatus === "Active" ? "activated" : "deactivated"
          }.`,
          "success"
        );
      } catch (error) {
        console.error("Error updating review status:", error);
        Swal.fire(
          "Error!",
          "There was an error updating the review status.",
          "error"
        );
      }
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("Invalid Date");
      return format(date, "d/MMM/yyyy").toLowerCase(); // 7/oct/2024
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  return (
    <div className="content container-fluid snipcss-Ms29G">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex gap-2 align-items-center">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/product-review.png"
            alt=""
          />
          Product Reviews
        </h2>
      </div>
      <div className="card card-body">
        <div className="row border-bottom pb-3 align-items-center mb-10">
          <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
            <h5 className="text-capitalize d-flex gap-2 align-items-center">
              Review table
              <span className="badge badge-soft-dark radius-50 fz-12">
                {hasReviews
                  ? products.reduce(
                      (acc, product) => acc + product.reviews.length,
                      0
                    )
                  : 0}
              </span>
            </h5>
          </div>
          <div className="col-sm-8 col-md-6 col-lg-4">
            <form action="#" method="GET" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group input-group-merge input-group-custom">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="tio-search"></i>
                  </div>
                </div>
                <input
                  id="datatableSearch_"
                  type="search"
                  name="searchValue"
                  className="form-control outline-none"
                  placeholder="Search by Product or Customer"
                  aria-label="Search orders"
                  required=""
                />
                <button
                  type="submit"
                  className="btn px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                  style={{ color: "white" }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <form action="#" method="GET" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full align-items-end">
            <div className="">
              <label htmlFor="status" className="title-color d-flex">
                Choose Status
              </label>
              <select
                className="form-control outline-none hover:border-primary-500"
                name="status"
              >
                <option value="" selected="">
                  ---Select status---
                </option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div className="">
              <div>
                <label htmlFor="from" className="title-color d-flex">
                  From
                </label>
                <input
                  type="date"
                  name="from"
                  id="start-date-time"
                  value=""
                  className="form-control outline-none hover:border-primary-500"
                  title="From date"
                />
              </div>
            </div>
            <div className="">
              <div>
                <label htmlFor="to" className="title-color d-flex">
                  To
                </label>
                <input
                  type="date"
                  name="to"
                  id="end-date-time"
                  value=""
                  className="form-control outline-none hover:border-primary-500"
                  title="To date"
                />
              </div>
            </div>
            <div className="">
              <div>
                <button
                  type="submit"
                  className="btn px-3  py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                  style={{ color: "white" }}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="table-responsive mt-3">
          <table className="table table-borderless table-thead-bordered table-align-middle table-nowrap table-hover">
            <thead className="thead-light">
              <tr>
                <th className="text-capitalize text-center">#</th>
                <th className="text-capitalize">Product</th>
                <th className="text-capitalize">Customer</th>
                <th className="text-capitalize">Rating</th>
                <th className="text-capitalize">Review</th>
                <th className="text-capitalize">Date</th>
                <th className="text-capitalize">Status</th>
                <th className="text-capitalize">Action</th>
              </tr>
            </thead>
            <tbody>
              {hasReviews ? (
                products.flatMap((product, index) =>
                  product.reviews.map((review, reviewIndex) => (
                    <tr key={`${product._id}-${reviewIndex}`}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        {product.name || "N/A"}
                        {product.thumbnail && (
                          <img
                            src={`${ImageApiUrl}/${product.thumbnail}`}
                            alt={product.name}
                            className="product-thumbnail"
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      <td>{review.customer?.name || "N/A"}</td>
                      <td className="flex justify-center mt-6 align-items-center">
                        <div className="d-flex align-items-center gap-1 text-primary-500 justify-content-center fz-14 mt-6">
                          {[...Array(5)].map((_, i) =>
                            i < review.rating ? (
                              <MdOutlineStarPurple500
                                key={i}
                                className="text-primary-500"
                              />
                            ) : (
                              <MdStarBorder key={i} className="text-gray-300" />
                            )
                          )}
                        </div>
                      </td>
                      <td>{review.reviewText || "No review text"}</td>
                      <td>
                        {new Date(review.createdAt).toLocaleDateString() ||
                          "No date"}
                      </td>

                      <td>
                        <label className="switcher mx-auto">
                          <input
                            type="checkbox"
                            className="switcher_input toggle-switch-message"
                            id={`reviews-status${review._id}`}
                            checked={review.status === "Active"}
                            onChange={() =>
                              handleStatusChange(review._id, review.status)
                            }
                          />
                          <span className="switcher_control"></span>
                        </label>
                      </td>
                      <td className="border-primary-500 border-t-0 border-b-0 text-center">
                        <FaEye
                          size={18}
                          color="#A1CB46"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleViewClick(review)}
                        />
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedReview && (
        <div
          className="modal fade show"
          id="reviewDetailsModal"
          tabIndex="-1"
          aria-labelledby="reviewDetailsModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header font-bold">
                <h5 className="modal-title" id="reviewDetailsModalLabel">
                  Review Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body p-5 mb-2">
                <h5 className="text-capitalize ">Review Details</h5>
                <p>
                  <strong>Product:</strong>{" "}
                  {selectedReview.product?.name || "N/A"}
                </p>
                <p>
                  <strong>Customer:</strong>{" "}
                  {selectedReview.customer?.name || "N/A"}
                </p>
                <p className="flex ">
                  {" "}
                  <strong>Rating:</strong>{" "}
                  {[...Array(5)].map((_, i) =>
                    i < selectedReview.rating ? (
                      <MdOutlineStarPurple500
                        key={i}
                        className="text-primary-500"
                      />
                    ) : (
                      <MdStarBorder key={i} className="text-gray-300" />
                    )
                  )}
                </p>
                <p>
                  <strong>Review:</strong>{" "}
                  {selectedReview.reviewText || "No review text"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedReview.createdAt).toLocaleDateString() ||
                    "No date"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500"
                  onClick={closeModal}
                  style={{ color: "white" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
