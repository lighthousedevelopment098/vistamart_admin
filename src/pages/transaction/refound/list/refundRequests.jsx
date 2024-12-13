import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaEye, FaSearch } from "react-icons/fa";

import "./RefundRequest.css";
import { fetchRefundsForVendorByStatus } from "../../../../redux/slices/transaction/refundSlice";
import ActionButton from "../../../../components/ActionButton/Action";

const RefundRequests = ({ status, title }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const dispatch = useDispatch();
  const { refunds, loading, error } = useSelector((state) => state.refund); // Adjusted to `state.refund` based on your slice name

  useEffect(() => {
    // Fetch the refunds based on the provided status
    dispatch(fetchRefundsForVendorByStatus({ status }));

    // Cleanup function to reset refunds and filteredRefunds when the status changes
    return () => {
      setFilteredRefunds([]);
    };
  }, [dispatch, status]);

  useEffect(() => {
    // Update the filtered refunds whenever the refunds or searchValue changes
    if (refunds.length > 0) {
      const lowercasedFilter = searchValue.toLowerCase();
      const filteredData = refunds.filter(
        (refund) =>
          refund.order._id.toLowerCase().includes(lowercasedFilter) ||
          refund.order.products[0]?.name
            ?.toLowerCase()
            .includes(lowercasedFilter) || // Use optional chaining here
          `${refund.order.customer.firstName} ${refund.order.customer.lastName}`
            .toLowerCase()
            .includes(lowercasedFilter)
      );
      setFilteredRefunds(filteredData);
    } else {
      setFilteredRefunds([]);
    }
  }, [refunds, searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="content container-fluid">
      <div className="mb-3 p-7">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img src="/refund-request.png" alt={`${status} Refund Requests`} />
          {`${title}`}
          <span className="badge badge-soft-dark radius-50">
            {filteredRefunds.length}
          </span>
        </h2>
      </div>

      <div className="card p-7">
        <div className="px-3 py-4 light-bg">
          <div className="d-flex flex-wrap justify-between gap-3 align-items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-auto"
            >
              <div className="input-group input-group-merge input-group-custom border border-primary-500">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <FaSearch />
                  </div>
                </div>
                <input
                  type="search"
                  name="searchValue"
                  className="form-control outline-none border border-primary-500"
                  placeholder="Search by Title, Code, or Customer"
                  // value={searchValue}
                  // onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className=" rounded-r-md px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                  style={{ color: "white" }}
                >
                  Search
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {/* <ExportButton
                data={refunds} // Pass the data to export
                filename="refundList" // Optional filename for the exported file
                icon={FaDownload} // Icon for the button
                label="Export " // Button label
                className="bg-[#A1CB46] text-white hover:bg-[#7e9f37]" // Tailwind classes for styling
                style={{ color: "white" }} // Optional inline styles
              /> */}
              <select
                name="refundFilter"
                id="refundFilter"
                className="md:w-40 lg:w-48 bg-white border-gray-500 border rounded px-3 py-2"
              >
                <option value="">All</option>
                <option value="inhouse">Inhouse Request</option>
                <option value="vendor">Vendor Request</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div className="table-responsive datatable-custom">
            <table
              className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
              style={{ textAlign: "left" }}
            >
              <thead className="thead-light thead-50 text-capitalize">
                <tr>
                  <th>SL</th>
                  <th className="text-center">Refund ID</th>
                  <th>Order ID</th>
                  <th>Product Info</th>
                  <th>Customer Info</th>
                  <th className="text-end">Total Amount</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.map((request, index) => {
                  const product = request.order.products[0] || {}; // Fallback to an empty object if no product
                  const productThumbnail =
                    product.thumbnail || "/image-place-holder.png"; // Default thumbnail
                  const productName = product.name || "Unknown Product"; // Default product name

                  return (
                    <tr key={request._id}>
                      <td>{index + 1}</td>
                      <td className="text-center">
                        {request._id.substring(0, 3)}...
                      </td>
                      <td>
                        <a href="#" className="title-color hover-c1">
                          {request.order._id.substring(0, 6)}
                        </a>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <a href="#">
                            <img
                              src={`http://localhost:3000/${productThumbnail}`}
                              className="avatar border"
                              alt={productName}
                            />
                          </a>
                          <div className="d-flex flex-column gap-1">
                            <a
                              href="#"
                              className="title-color font-weight-bold hover-c1"
                            >
                              {productName}
                            </a>
                            <span className="fz-12">
                              QTY: {product.quantity || 0}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <a
                            href="#"
                            className="title-color font-weight-bold hover-c1"
                          >
                            {request.order.customer.firstName}{" "}
                            {request.order.customer.lastName}
                          </a>
                          <a
                            href={`tel:${request.order.customer.phoneNumber}`}
                            className="title-color hover-c1 fz-12"
                          >
                            {request.order.customer.phoneNumber}
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1 text-end">
                          <div>PKR {request.order.totalAmount.toFixed(2)}</div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <ActionButton
                            to={`/refounddetail/${request._id}`}
                            icon={FaEye} // Pass dynamic icon
                            className="ml-4"
                            label="View"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundRequests;
