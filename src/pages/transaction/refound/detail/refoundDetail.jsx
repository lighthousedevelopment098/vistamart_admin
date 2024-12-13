import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./RefoundDetail.css";
import Swal from "sweetalert2";

const RefundDetails = () => {
  const { id } = useParams();
  const [refundData, setRefundData] = useState(null);

  useEffect(() => {
    fetchRefundData();
  }, []);

  const fetchRefundData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/refunds/${id}`);
      const data = await response.json();
      setRefundData(data.doc);
    } catch (error) {
      console.error("Error fetching refund data:", error);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      const { value: reason } = await Swal.fire({
        title: `${status} Refund`,
        input: "textarea",
        inputLabel: "Reason",
        inputPlaceholder: "Enter the reason for the status change...",
        inputAttributes: {
          "aria-label": "Enter the reason for the status change",
        },
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        showLoaderOnConfirm: true,
        preConfirm: (reason) => {
          if (!reason) {
            Swal.showValidationMessage("Please enter a reason.");
          }
          return reason;
        },
      });

      if (reason) {
        const response = await fetch(
          `http://localhost:3000/api/refunds/${id}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status, reason }),
          }
        );

        if (response.ok) {
          Swal.fire("Success", `Refund status updated to ${status}`, "success");
          fetchRefundData(); // Refresh data
        } else {
          Swal.fire("Error", "Failed to update refund status", "error");
        }
      }
    } catch (error) {
      console.error("Error updating refund status:", error);
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  };

  const handleRejectClick = () => handleStatusUpdate("rejected");
  const handleApproveClick = () => handleStatusUpdate("approved");
  const handleRefundClick = () => handleStatusUpdate("refunded");

  if (!refundData) {
    return <div>Loading...</div>;
  }

  // Set default values
  const product = refundData.order?.products?.[0] || {};
  const productName = product.name || "Default Product Name";
  const productDescription = product.description || "No description available";
  const paymentMethod = refundData.order?.paymentMethod || "Not specified";
  const status = refundData.status || "Pending";
  const requestedAt = refundData.requestedAt
    ? new Date(refundData.requestedAt).toLocaleString()
    : "Not specified";
  const refundReason = refundData.reason || "No reason provided";
  const note = refundData.statusReason || "No notes available";
  const refundImages = product.images || []; // Assuming images are available in the product data
  const totalAmount = refundData.order?.totalAmount || 0;
  const discountAmount = product.discountAmount || 0;
  const taxAmount = product.taxAmount || 0;
  const refundableAmount = totalAmount - discountAmount;

  return (
    <div className="content container-fluid px-7">
      <div className="mb-3 p-5">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <FaRegEye size={20} /> Refund details
        </h2>
      </div>
      <div className="refund-details-card--2 p-4">
        <div className="row gy-2">
          <div className="col-lg-4">
            <div className="card h-100 refund-details-card">
              <div className="card-body">
                <h4 className="mb-3">Refund summary</h4>
                <ul className="dm-info p-0 m-0">
                  <li className="align-items-center">
                    <span className="left">Refund id</span>
                    <span>:</span>
                    <span className="right">{refundData._id || "N/A"}</span>
                  </li>
                  <li className="align-items-center">
                    <span className="left text-capitalize">
                      Refund requested date
                    </span>
                    <span>:</span>
                    <span className="right">{requestedAt}</span>
                  </li>
                  <li className="align-items-center">
                    <span className="left">Refund status</span>
                    <span>:</span>
                    <span className="right">
                      <span className="badge badge-secondary-2">{status}</span>
                    </span>
                  </li>
                  <li className="align-items-center">
                    <span className="left">Payment method</span>
                    <span>:</span>
                    <span className="right">{paymentMethod}</span>
                  </li>
                  <li className="align-items-center">
                    <span className="left">Order details</span>
                    <span>:</span>
                    <span className="right">
                      <Link
                        to={`/orderdetail/${refundData.order?._id || "#"}`}
                        className="badge py-2 badge-soft- border border-primary-500 px-2"
                      >
                        View details
                      </Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card h-100 refund-details-card">
              <div className="card-body">
                <div className="gap-3 mb-4 d-flex justify-content-between flex-wrap align-items-center">
                  <h4>Product details</h4>
                  <div className="d-flex flex-wrap gap-3">
                    <button
                      className="btn btn-soft-danger p-2 px-3 border-red-400"
                      onClick={handleRejectClick}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-soft-danger p-2 px-3 border-primary-500"
                      onClick={handleApproveClick}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-soft-danger p-2 px-3"
                      onClick={handleRefundClick}
                    >
                      Refund
                    </button>
                  </div>
                </div>
                <div className="refund-details">
                  <div className="img">
                    <div className="onerror-image border rounded">
                      {/* <img src={`http://localhost:3000/${product.thumbnail}`} alt="Product Thumbnail" /> */}
                    </div>
                  </div>
                  <div className="--content flex-grow-1">
                    <h4>
                      <Link to="#">{productName}</Link>
                    </h4>
                  </div>
                  <ul className="dm-info p-0 m-0 w-l-115">
                    <li>
                      <span className="left">QTY</span>
                      <span>:</span>
                      <span className="right">
                        <strong>{product.quantity || 0}</strong>
                      </span>
                    </li>
                    <li>
                      <span className="left">Total price</span>
                      <span>:</span>
                      <span className="right">
                        <strong>${totalAmount}</strong>
                      </span>
                    </li>
                    <li>
                      <span className="left">Total discount</span>
                      <span>:</span>
                      <span className="right">
                        <strong>${discountAmount}</strong>
                      </span>
                    </li>
                    <li>
                      <span className="left">Coupon discount</span>
                      <span>:</span>
                      <span className="right">
                        <strong>$0.00</strong>
                      </span>
                    </li>
                    <li>
                      <span className="left">Total tax</span>
                      <span>:</span>
                      <span className="right">
                        <strong>${taxAmount}</strong>
                      </span>
                    </li>
                    <li>
                      <span className="left">Subtotal</span>
                      <span>:</span>
                      <span className="right">
                        <strong>${refundableAmount}</strong>
                      </span>
                    </li>
                    <li>
                      <span className="left">Refundable amount</span>
                      <span>:</span>
                      <span className="right">
                        <strong>${refundableAmount}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card h-100 refund-details-card--2">
              <div className="card-body">
                <h4 className="mb-3 text-capitalize">
                  Refund reason by customer
                </h4>
                <p>{refundReason}</p>
                <div className="gallery grid-gallery">
                  {refundImages.length > 0 ? (
                    refundImages.map((img, index) => (
                      <a
                        href="#"
                        data-lightbox="mygallery"
                        className="d-flex"
                        key={index}
                      >
                        <img
                          src={img.url}
                          width="65"
                          height="65"
                          alt="Refund Image"
                        />
                      </a>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="card h-100 refund-details-card--2">
              <div className="card-body">
                <h4 className="mb-3">Admin note</h4>
                <p>{note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundDetails;
