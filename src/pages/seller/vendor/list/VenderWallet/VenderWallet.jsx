import React, { useEffect, useState } from "react";
import { FaDownload, FaEye } from "react-icons/fa";
import ExportButton from "../../../../../components/ActionButton/Export";
import ActionButton from "../../../../../components/ActionButton/Action";
import { getAuthData } from "../../../../../utils/authHelper";
import apiConfig from "../../../../../config/apiConfig";
import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";

const ApiUrl = `${apiConfig.transaction}/withdraws`;

const VenderWallet = () => {
  const { token } = getAuthData();
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      try {
        const response = await fetch(ApiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const formattedData = data.doc.map((item, index) => ({
          sl: index + 1,
          amount: `PKR${item.amount}`,
          name: item.accountName || "Not found",
          requestTime: new Date(item.createdAt).toLocaleString(),
          status: item.status,
          actionLink: `/venderwalletdetail/${item._id}`,
          actionIcon: <FaEye />,
        }));
        setWithdrawRequests(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawRequests();
  }, [token]);

  if (loading) {
    return <div><LoadingSpinner /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="content container-fluid snipcss-l7stG">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
            alt="Withdraw Icon"
          />{" "}
          Withdraw
        </h2>
      </div>
      <div className="">
        <div className="">
          <div className="card">
            <div className="p-4">
              <div className="row gy-1 align-items-center justify-content-between">
                <div className="text-[1rem] font-semibold ">
                  <h5 className="text-capitalize">Withdraw request table</h5>
                </div>
                <div className="d-flex col-auto gap-3">
                  <select
                    name="withdraw_status_filter"
                    className="custom-select min-w-120 withdraw-status-filter outline-none hover:border-primary-500"
                  >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                    <option value="pending">Pending</option>
                  </select>
                  <div>
                    <ExportButton
                      data={withdrawRequests}
                      filename="VendorWallet"
                      icon={FaDownload}
                      label="Export "
                      className="bg-primary-500 text-white hover:bg-primary-dark-500"
                      style={{ color: "white" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                <thead className="thead-light thead-50 text-capitalize">
                  <tr>
                    <th>SL</th>
                    <th>Amount</th>
                    <th>Name</th>
                    <th>Request time</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.sl}</td>
                      <td>{request.amount}</td>
                      <td>
                        <span>{request.name}</span>
                      </td>
                      <td>{request.requestTime}</td>
                      <td className="text-center">
                        <label
                          className={`badge badge-soft-${
                            request.status === "Approved"
                              ? "success"
                              : request.status === "Denied"
                              ? "danger"
                              : "primary"
                          }`}
                        >
                          {request.status}
                        </label>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <ActionButton
                            to={request.actionLink}
                            icon={FaEye}
                            className="ml-4"
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
    </div>
  );
};

export default VenderWallet;
