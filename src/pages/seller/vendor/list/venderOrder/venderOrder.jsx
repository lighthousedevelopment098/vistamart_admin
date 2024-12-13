import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faDownload,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { fetchOrder } from "../../../../../redux/slices/transaction/orderSlice";
import ActionButton from "../../../../../components/ActionButton/Action";
import { FaEye } from "react-icons/fa";

const VenderOrder = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Vendor ID from route params

  const {
    orders = [], // Initialize with an empty array to avoid undefined issues
    loading,
    error,
  } = useSelector((state) => state.vendorOrder || {});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch orders by vendor ID
    dispatch(fetchOrder({ vendors: id }));
  }, [dispatch, id]);

  const paginatedProducts = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="col-md-12">
      <div className="card w-100">
        <div className="card-header d-flex justify-content-between">
          <h5 className="mb-0">Order Info</h5>
          <div className="dropdown">
            <button className="btn btn-outline-primary-500">
              <FontAwesomeIcon icon={faDownload} /> Export{" "}
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <img
                    width="14"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png"
                    alt="Excel"
                  />{" "}
                  Excel
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Loading, Error, No Orders, or Orders */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">Error: {error}</p>
        ) : orders.length === 0 ? (
          <p>No orders available for this vendor.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Payment Status</th>
                  <th>Total</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{product.orderNumber}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td>{product.customerName}</td>
                    <td>{product.paymentStatus}</td>
                    <td>${product.totalPrice}</td>
                    <td>{product.orderStatus}</td>
                    <td>
                      <ActionButton
                        to={`/orderdetail/${product._id}`}
                        icon={FaEye}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={orders.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            <span className="page-link">{index + 1}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VenderOrder;
