import React, { useState, useEffect } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaSearch, FaTimes } from "react-icons/fa";
import ExportButton from "../../../../../components/ActionButton/Export";
import apiConfig from "../../../../../config/apiConfig";
import { getAuthData } from "../../../../../utils/authHelper";

const AllOrderTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = getAuthData();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${apiConfig.transaction}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status === "success") {
          setTransactions(result.doc);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  const fetchTrackingDetails = async (paymentRefNo) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiConfig.transaction}/payment/jazzcash/status`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txnRefNo: paymentRefNo }),
      });

      const result = await response.json();
      if (result.status === "success") {
        setTrackingDetails(result.doc);
        setShowModal(true);
      } else {
        alert("Failed to fetch tracking details.");
      }
    } catch (error) {
      console.error("Error fetching tracking details:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTrackingDetails(null);
  };

  return (
    <div className="bg-secondary-500 flex flex-col gap-4 px-5 py-5">
      <div className="card">
        <div className="px-3 py-4">
          <div className="flex justify-between gap-3 align-items-center flex-col lg:flex-row">
            <h5 className="mb-0 text-capitalize text-[1rem] font-semibold">
              Total Transactions{" "}
              <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                {transactions.length}
              </span>
            </h5>

            <div className="flex gap-3 flex-col md:flex-row w-40 lg:w-[30vw]">
              <form className="w-80">
                <div className="input-group input-group-merge input-group-custom w-44 lg:w-full">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <FaSearch />
                    </div>
                  </div>
                  <input
                    type="search"
                    className="form-control outline-none"
                    placeholder="Search by Order ID"
                  />
                  <button
                    type="submit"
                    className="btn bg-primary hover:bg-primary-dark text-white"
                  >
                    Search
                  </button>
                </div>
              </form>
              <ExportButton
                data={transactions}
                filename="OrderTransaction"
                icon={IoMdDownload}
                label="Export"
                className="bg-primary text-white hover:bg-primary-dark"
              />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table overflow-y-auto table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left">
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>Order ID</th>
                <th>Shop Name</th>
                <th>Customer Name</th>
                <th>Order Amount</th>
                <th>Payment RefNo</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
              
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{index + 1}</td>
                  <td>{transaction.orderId}</td>
                  <td>{transaction.shopName}</td>
                  <td>{transaction.customerName}</td>
                  <td>PKR{transaction.orderAmount.toFixed(2)}</td>
                  <td className="flex flex-col items-start gap-2">
  {transaction?.paymentRefNo ? (
    <>
      <span className="text-gray-800">{transaction.paymentRefNo}</span>
      <button
        onClick={() => fetchTrackingDetails(transaction.paymentRefNo)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Loading..." : "Track"}
      </button>
    </>
  ) : (
    <span className="text-gray-500 italic">No Reference Number</span>
  )}
</td>

                  <td>{transaction.paymentMethod}</td>
                  <td
                    className={
                      transaction.paymentStatus === "Completed"
                        ? "text-green-400"
                        : "text-red-500"
                    }
                  >
                    {transaction.paymentStatus}
                  </td>
              
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && trackingDetails && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-3xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Payment Details</h2>
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={closeModal}
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <p>
                <strong>Response Code:</strong> {trackingDetails.pp_ResponseCode}
              </p>
              <p>
                <strong>Response Message:</strong>{" "}
                {trackingDetails.pp_ResponseMessage}
              </p>
              <p>
                <strong>Payment Status:</strong> {trackingDetails.pp_Status}
              </p>
              <p>
                <strong>Reference No:</strong>{" "}
                {trackingDetails.pp_RetrievalReferenceNo}
              </p>
              <p>
                <strong>Settlement Date:</strong>{" "}
                {trackingDetails.pp_SettlementDate}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrderTransaction;
