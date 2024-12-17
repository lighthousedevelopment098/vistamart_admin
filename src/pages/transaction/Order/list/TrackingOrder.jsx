import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch, FaTimes, FaShippingFast, FaCheckCircle, FaExclamationTriangle, FaQuestionCircle } from "react-icons/fa"; // Additional icons for statuses

const TrackingOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchTrackingDetails = async () => {
    if (!trackingId) {
      Swal.fire("Error", "Please enter a tracking ID", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://app.sonic.pk/api/shipment/track?tracking_number=${trackingId}&type=0`,
        {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        }
      );

      const data = response.data;
      if (data.status === 0) {
        setTrackingDetails(data.details);
        setShowModal(true);
      } else {
        Swal.fire("Error", "No tracking information found", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while fetching tracking details", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTrackingDetails(null);
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Ensure overflow is reset on unmount
    };
  }, [showModal]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shipment - Out for Delivery":
        return <FaShippingFast className="text-blue-500" />;
      case "Shipment - Delivery Unsuccessful":
        return <FaExclamationTriangle className="text-red-500" />;
      case "Shipment - Delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "Shipment - Booked":
        return <FaQuestionCircle className="text-yellow-500" />;
      case "Shipment - Arrived at Origin":
        return <FaQuestionCircle className="text-gray-500" />;
      default:
        return <FaQuestionCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      {/* Tracking Input Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Track Your Shipment</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            className="border border-gray-300 p-3 rounded-md w-full shadow-sm focus:ring-2 focus:ring-primary-dark-500 outline-none"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button
            onClick={fetchTrackingDetails}
            className={`bg-primary-500 text-white px-4 py-3 hover:bg-primary-dark-500 rounded-md flex items-center gap-2 ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track"}
            {!loading && <FaSearch />}
          </button>
        </div>
      </div>

      {/* Modal for Tracking Details */}
      {showModal && trackingDetails && (
        <div className="fixed overflow-y-scroll inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-start z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-3xl shadow-xl mt-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Tracking ID: {trackingDetails.tracking_number}
              </h2>
              <button className="text-gray-500 hover:text-red-500" onClick={closeModal}>
                <FaTimes size={20} />
              </button>
            </div>

            {/* Shipment Details */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Shipper Details</h3>
                  <p><strong>Name:</strong> {trackingDetails.shipper.name}</p>
                  <p><strong>Email:</strong> {trackingDetails.shipper.email}</p>
                  <p><strong>City:</strong> {trackingDetails.shipper.city}</p>
                </div>

                <div className="p-4 border rounded-md shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Pickup Details</h3>
                  <p><strong>Origin:</strong> {trackingDetails.pickup.origin}</p>
                  <p><strong>Contact:</strong> {trackingDetails.pickup.person_of_contact}</p>
                  <p><strong>Phone:</strong> {trackingDetails.pickup.phone_number}</p>
                </div>

                <div className="p-4 border rounded-md shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Consignee Details</h3>
                  <p><strong>Name:</strong> {trackingDetails.consignee.name}</p>
                  <p><strong>Phone:</strong> {trackingDetails.consignee.phone_number_1}</p>
                  <p><strong>Destination:</strong> {trackingDetails.consignee.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Order Information</h3>
                  <p><strong>Shipping Mode:</strong> {trackingDetails.order_information.shipping_mode}</p>
                  <p><strong>Weight:</strong> {trackingDetails.order_information.weight} grams</p>
                  <p><strong>Instructions:</strong> {trackingDetails.order_information.instructions}</p>
                </div>

                {/* Tracking History */}
                <div className="space-y-6 flex flex-col items-center">
              {/* Tracking History */}
              <div className="border rounded-md p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
                <div className="max-h-64 overflow-y-auto space-y-4">
                  {trackingDetails.tracking_history.map((history, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border-b last:border-b-0 bg-gray-50 hover:bg-gray-100 rounded">
                      <span className="font-semibold">{getStatusIcon(history.status)}</span>
                      <span className="flex-1">{history.status}</span>
                      <span>{history.date_time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button onClick={closeModal} className="bg-green-500 text-white px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingOrder;


