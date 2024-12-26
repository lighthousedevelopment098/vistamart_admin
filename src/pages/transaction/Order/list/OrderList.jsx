import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaDownload,
  FaSearch,
  FaSort,
  FaSortUp,
  FaChevronRight,
  FaChevronLeft,
  FaSortDown,
  FaTrashAlt,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteOrder,
  fetchOrder,
  updateOrderStatus,
} from "../../../../redux/slices/transaction/orderSlice";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import ExportButton from "../../../../components/ActionButton/Export";
import ActionButton from "../../../../components/ActionButton/Action";

const OrderList = () => {
  const dispatch = useDispatch();
  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.vendorOrder || {});

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const handleUpdateStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
    toast.success("Order status updated successfully!");
  };

  const handleDeleteOrder = (orderId) => {
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
        dispatch(deleteOrder(orderId));
        toast.success("Order deleted successfully!");
      }
    });
  };

  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Search Logic
  const filteredOrders = sortedOrders.filter((order) => {
    const searchTerm = searchValue.toLowerCase();
    return (
      String(order?.orderId || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(order?.customer?.firstName || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(order?.customer?.lastName || "")
        .toLowerCase()
        .includes(searchTerm) ||
      String(order?.totalAmount || "")
        .toLowerCase()
        .includes(searchTerm)
    );
  });

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );


  const totalOrders = filteredOrders.length;
  
  const totalPages = Math.ceil(totalOrders / ordersPerPage); // Calculate total pages

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // const getSortIcon = (key) => {
  //   if (sortConfig.key === key) {
  //     return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  //   }
  //   return <FaSort />;
  // };

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  // Calculate the range of page numbers to display
  const pageRange = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(pageRange / 2));

  // Ensure that we always display `pageRange` number of buttons if possible
  if (endPage - startPage < pageRange - 1) {
    if (startPage > 1) {
      startPage = Math.max(1, endPage - pageRange + 1);
    } else {
      endPage = Math.min(totalPages, startPage + pageRange - 1);
    }
  }

  return (
    <div className="content container-fluid">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h2 className="h1 mb-0 flex">
          <img src="/all-orders.png" className="mb-1 mr-1" alt="Orders" />
          <span className="page-header-title">All Orders</span>
        </h2>
        <span className="badge badge-soft-dark radius-50 fz-14">
          {orders.length}
        </span>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <div className="px-3 py-4 light-bg">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between align-items-center">
              <h5 className="mb-0 text-capitalize font-bold d-flex gap-2 mr-auto">
                Order List
                <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                  {orders.length}
                </span>
              </h5>
              <div className="flex flex-col md:flex-row items-end gap-4">
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
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="rounded-r-md px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
                <ExportButton
                  data={orders}
                  filename="OrderList"
                  icon={FaDownload}
                  label="Export"
                  className="bg-primary-500 text-white hover:bg-primary-dark-500"
                  style={{ color: "white" }}
                />
              </div>
            </div>
          </div>

          <div className="" style={{ overflowX: "scroll" }}>
            <table className="table  table-hover mb-0">
              <thead className="table-light  bg-secondary-500">
                <tr className="w-full ">
                  <th onClick={() => requestSort("orderId")} scope="flex">
                    ID
                  </th>
                  <th onClick={() => requestSort("trackingId")} scope="flex">
                    Tracking ID
                  </th>

                  <th onClick={() => requestSort("createdAt")} scope="flex">
                    Date
                  </th>
                  <th onClick={() => requestSort("customerName")} scope="flex">
                    C_Name
                  </th>
                  {/* <th onClick={() => requestSort("store")} scope="flex">
                    Store
                  </th> */}
                  <th onClick={() => requestSort("totalAmount")} scope="flex">
                    Amount
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="text-truncate" style={{ maxWidth: "150px" }}>
                      {order?.orderId}
                    </td>
                    <td className="text-center text-primary-500 font-bold">
  {order?.trackingId == 0
    ? "Not Booked"
    : order?.trackingId !== undefined && order?.trackingId !== null
    ? order.trackingId
    : "Not Booked"}
</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      {order.customer
                        ? `${order.customer.firstName} ${order.customer.lastName}`
                        : "Unknown Customer"}
                    </td>
                    {/* <td>{order.vendors?.[0]?.shopName || "Unknown Store"}</td> */}
                    <td>PKR {order.totalAmount}</td>
                    <td>
                      {(() => {
                        const statusClass =
                          {
                            pending: "bg-primary-500",
                            confirmed: "bg-blue-300",
                            packaging: "bg-yellow-300",
                            out_for_delivery: "bg-orange-300",
                            delivered: "bg-primary-500",
                            failed_to_deliver: "bg-red-500",
                            returned: "bg-gray-500",
                            canceled: "bg-red-300",
                          }[order.status] || "bg-gray-400";
                        return (
                          <span className={`badge ${statusClass} text-white`}>
                            {order.status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="flex items-center gap-2">
                      {/* <Link
                        to={`/orderdetail/${order._id}`}
                          className="btn border-green-300 text-green-500 btn-sm"
                        >
                          <FaEye size={18} />
                        </Link>  */}
                      <ActionButton
                        to={`/orderdetail/${order._id}`}
                        icon={FaEye} // Pass dynamic icon
                        className="ml-4"
                      />
                      <button
                        className="btn border-alert text-alert hover:bg-alert hover:text-white "
                        // style={{ color: "red" }}
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pageination */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                currentPage === 1
                  ? "bg-black text-white cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-dark-500 text-white"
              }`}
              style={{ color: "white" }}
            >
              <FaChevronLeft />
            </button>

            {/* Page Numbers */}
            {[...Array(endPage - startPage + 1)].map((_, index) => {
              const page = startPage + index;
              return (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`w-6 h-6 flex items-center justify-center rounded-full font-medium transition-all ${
                    currentPage === page
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-primary-dark-500 hover:bg-primary-500 text-white"
                  }`}
                  style={{ color: "white" }}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
                currentPage === totalPages
                  ? "bg-black cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-dark-500 text-white"
              }`}
              style={{ color: "white" }}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
