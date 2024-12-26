// import React, { useState, useEffect } from "react";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaDownload,
//   FaEye,
//   FaSearch,
//   FaTrash,
// } from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
// import ExportButton from "../../../../components/ActionButton/Export";
// import ActionButton from "../../../../components/ActionButton/Action";
// import apiConfig from "../../../../config/apiConfig";
// import { getAuthData } from "../../../../utils/authHelper";

// const ApiUrl = `${apiConfig.transaction}/`;

// const OrderManagement = ({ status, title }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState("asc"); // Sorting state
//   const itemsPerPage = 5;

//   // Fetch orders directly using Axios
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const { token } = getAuthData(); // Replace this with your token fetching logic
//         const response = await axios.get(ApiUrl, {
//           params: { status },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(response.data.doc); // Assuming the response contains orders in data.doc
//         setLoading(false);
//       } catch (err) {
//         setError(err.message || "Failed to fetch orders.");
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [status]);

//   // Filtering orders based on search query
//   const filteredOrders = orders.filter(
//     (order) =>
//       (order.orderId &&
//         order.orderId
//           .toString()
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())) ||
//       order.customer?.firstName
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       order.customer?.lastName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Sorting orders by Order ID
//   const sortedOrders = filteredOrders.sort((a, b) => {
//     const orderIdA = String(a.orderId); // Ensure orderId is treated as a string
//     const orderIdB = String(b.orderId); // Ensure orderId is treated as a string

//     if (sortOrder === "asc") {
//       return orderIdA.localeCompare(orderIdB);
//     } else {
//       return orderIdB.localeCompare(orderIdA);
//     }
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
//   const paginatedOrders = sortedOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handle order deletion
//   const handleDeleteOrder = (orderId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const { token } = getAuthData(); // Replace this with your token fetching logic
//           await axios.delete(`${ApiUrl}${orderId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setOrders((prevOrders) =>
//             prevOrders.filter((order) => order.id !== orderId)
//           );
//           toast.success("Order deleted successfully!");
//         } catch (err) {
//           toast.error(`Failed to delete order: ${err.message}`);
//         }
//       }
//     });
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div>Error: {error}</div>;

//   // Calculate the range of page numbers to display
//   const pageRange = 8;
//   let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
//   let endPage = Math.min(totalPages, currentPage + Math.floor(pageRange / 2));

//   if (endPage - startPage < pageRange - 1) {
//     if (startPage > 1) {
//       startPage = Math.max(1, endPage - pageRange + 1);
//     } else {
//       endPage = Math.min(totalPages, startPage + pageRange - 1);
//     }
//   }

//   return (
//     <div className="content container-fluid py-10">
//       <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
//         <h2 className="h1 mb-0 flex">
//           <img src="/all-orders.png" className="mb-1 mr-1" alt="" />
//           <span className="page-header-title">{title}</span> Orders
//         </h2>
//         <span className="badge badge-soft-dark radius-50 fz-14">
//           {orders.length}
//         </span>
//       </div>
//       <div className="">
//         {/* <form id="form-data" method="GET">
//             <div className="row gx-2">
//               <div className="col-12 mb-3">
//                 <h4 className="mb-3 text-capitalize">Filter order</h4>
//               </div>
//             </div>
//           </form> */}
//         <div className="card mt-3">
//           <div className="p-4 border-0">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
//               <div className="">
//                 <h5 className="form-label text-[1rem] font-semibold space-x-2 mb-0">
//                   {title} Order Table
//                   <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
//                     {orders.length}
//                   </span>
//                 </h5>
//               </div>
//               <div className="flex flex-col md:flex-row items-end gap-4">
//                 <form className="mr-2">
//                   <div className="input-group input-group-merge input-group-custom border border-primary-500">
//                     <div className="input-group-prepend">
//                       <div className="input-group-text">
//                         <FaSearch />
//                       </div>
//                     </div>
//                     <input
//                       type="search"
//                       name="searchValue"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="form-control outline-none border border-primary-500"
//                       placeholder="Search by Order ID, Customer"
//                     />
//                     <button
//                       type="submit"
//                       className="rounded-r-md px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
//                       style={{ color: "white" }}
//                     >
//                       Search
//                     </button>
//                   </div>
//                 </form>
//                 <ExportButton
//                   data={paginatedOrders}
//                   filename="OrderManagement"
//                   icon={FaDownload}
//                   label="Export"
//                   className="bg-primary-500 text-white hover:bg-primary-dark-500"
//                   style={{ color: "white" }}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="overflow-auto mt-4">
//             <table className="table table-striped text-nowrap">
//               <thead className="bg-secondary-500">
//                 <tr>
//                   <th>SL</th>
//                   <th className="text-center">
//                     <span
//                       className="cursor-pointer"
//                       onClick={() =>
//                         setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//                       }
//                     >
//                       Order ID {sortOrder === "asc" ? "↑" : "↓"}
//                     </span>
//                   </th>
//                   <th>Order Date</th>
//                   <th>C_Info</th>
//                   <th>
//                     <span
//                       className="cursor-pointer"
//                       onClick={() =>
//                         setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//                       }
//                     >
//                       Amount {sortOrder === "asc" ? "↑" : "↓"}
//                     </span>
//                   </th>
//                   <th>Status</th>
//                   <th className="text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedOrders?.length === 0 ? (
//                   <tr>
//                     <td colSpan="20" className="text-center">
//                       No orders found
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedOrders?.map((order, index) => (
//                     <tr key={order?._id}>
//                       <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
//                       <td className="text-center">{order?.orderId}</td>
//                       <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                       <td>
//                         {order?.customer?.firstName} {order?.customer?.lastName}
//                       </td>
//                       <td> PKR {order?.totalAmount}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             order?.status === "pending"
//                               ? "border-yellow-500"
//                               : ""
//                           }`}
//                           style={{
//                             padding: "0.3rem 0.7rem",
//                             border: "1px solid rgb(221 196 23)",
//                             color: "rgb(219 187 29)",
//                             borderRadius: "10px",
//                           }}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                       <td className="text-center flex gap-2">
//                         <ActionButton
//                           to={`/orderdetail/${order?._id}`}
//                           icon={FaEye}
//                         />
//                         <ActionButton
//                           onClick={() => handleDeleteOrder(order?._id)}
//                           icon={FaTrash}
//                           label="Delete"
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="flex items-center justify-center gap-3 my-6">
//               {/* Previous Button */}
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
//                   currentPage === 1
//                     ? "bg-black text-white cursor-not-allowed"
//                     : "bg-primary-500 hover:bg-primary-dark-500 text-white"
//                 }`}
//                 style={{ color: "white" }}
//               >
//                 <FaChevronLeft />
//               </button>

//               {/* Page Numbers */}
//               {[...Array(endPage - startPage + 1)].map((_, index) => {
//                 const page = startPage + index;
//                 return (
//                   <button
//                     key={page}
//                     onClick={() => paginate(page)}
//                     className={`w-6 h-6 flex items-center justify-center rounded-full font-medium transition-all ${
//                       currentPage === page
//                         ? "bg-primary-500 text-white shadow-md"
//                         : "bg-primary-dark-500 hover:bg-primary-500 text-white"
//                     }`}
//                     style={{ color: "white" }}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}

//               {/* Next Button */}
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
//                   currentPage === totalPages
//                     ? "bg-black cursor-not-allowed"
//                     : "bg-primary-500 hover:bg-primary-dark-500 text-white"
//                 }`}
//                 style={{ color: "white" }}
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderManagement;


import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaEye,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteOrder,
  fetchOrder,
} from "../../../../redux/slices/transaction/orderSlice";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import ExportButton from "../../../../components/ActionButton/Export";
import ActionButton from "../../../../components/ActionButton/Action";
import apiConfig from "../../../../config/apiConfig";
import { getAuthData } from "../../../../utils/authHelper";
 const ApiUrl = `${apiConfig.transaction}/`
const OrderManagement = ({ status, title }) => {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const dispatch = useDispatch();
  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.vendorOrder || {});
  const {token} = getAuthData();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting state
  const itemsPerPage = 5;
  useEffect(() => {
    if (token) {
      dispatch(fetchOrder({ status}));
    }
  }, [dispatch, status, token]);
  
  // useEffect(() => {
  //   dispatch(fetchOrder({ status }));
  // }, [dispatch, status]);

  // Filtering orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      (order.orderId &&
        order.orderId
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      order.customer?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.customer?.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting orders by Order ID
  const sortedOrders = filteredOrders.sort((a, b) => {
    const orderIdA = String(a.orderId); // Ensure orderId is treated as a string
    const orderIdB = String(b.orderId); // Ensure orderId is treated as a string

    if (sortOrder === "asc") {
      return orderIdA.localeCompare(orderIdB);
    } else {
      return orderIdB.localeCompare(orderIdA);
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        dispatch(deleteOrder(orderId))
          .then(() => toast.success("Order deleted successfully!"))
          .catch((err) =>
            toast.error(`Failed to delete order: ${err.message}`)
          );
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  // Calculate the range of page numbers to display
  const pageRange = 8;
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
    <div className="content container-fluid py-10">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h2 className="h1 mb-0 flex">
          <img src="/all-orders.png" className="mb-1 mr-1" alt="" />
          <span className="page-header-title">{title}</span> Orders
        </h2>
        <span className="badge badge-soft-dark radius-50 fz-14">
          {orders.length}
        </span>
      </div>
      <div className="">
        {/* <form id="form-data" method="GET">
            <div className="row gx-2">
              <div className="col-12 mb-3">
                <h4 className="mb-3 text-capitalize">Filter order</h4>
              </div>
            </div>
          </form> */}
        <div className="card mt-3">
          <div className="p-4 border-0">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
              <div className="">
                <h5 className="form-label text-[1rem] font-semibold space-x-2 mb-0">
                  {title} Order Table
                  <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                    {orders.length}
                  </span>
                </h5>
              </div>
              <div className="flex flex-col md:flex-row items-end gap-4">
                <form className="mr-2">
                  <div className="input-group input-group-merge input-group-custom border border-primary-500">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaSearch />
                      </div>
                    </div>
                    <input
                      type="search"
                      name="searchValue"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control outline-none border border-primary-500"
                      placeholder="Search by Order ID, Customer"
                    />
                    <button
                      type="submit"
                      className="rounded-r-md px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                      style={{ color: "white" }}
                    >
                      Search
                    </button>
                  </div>
                </form>
                <ExportButton
                  data={paginatedOrders}
                  filename="OrderManagement"
                  icon={FaDownload}
                  label="Export"
                  className="bg-primary-500 text-white hover:bg-primary-dark-500"
                  style={{ color: "white" }}
                />
              </div>
            </div>
          </div>
          <div className="overflow-auto mt-4">
            <table className="table table-striped text-nowrap">
              <thead className="bg-secondary-500">
                <tr>
                  <th>SL</th>
                  <th className="text-center">
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                    >
                      Order ID {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  </th>
                  <th>Tracking ID</th>
                  <th>Order Date</th>
                  <th>C_Info</th>
                  <th>
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                    >
                      Amount {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  </th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders?.length === 0 ? (
                  <tr>
                    <td colSpan="20" className="text-center">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders?.map((order, index) => (
                    <tr key={order?._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="text-center">{order?.orderId}</td>
                      <td className="text-center text-primary-500 font-bold">
  {order?.trackingId == 0
    ? "Not Booked"
    : order?.trackingId !== undefined && order?.trackingId !== null
    ? order.trackingId
    : "Not Booked"}
</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        {order?.customer?.firstName} {order?.customer?.lastName}
                      </td>
                      <td> PKR {order?.totalAmount}</td>
                      <td>
                        <span
                          className={`badge ${
                            order?.status === "pending"
                              ? "border-yellow-500"
                              : ""
                          }`}
                          style={{
                            padding: "0.3rem 0.7rem",
                            border: "1px solid rgb(221 196 23)",
                            color: "rgb(219 187 29)",
                            borderRadius: "10px",
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="text-center flex gap-2">
                        <ActionButton
                          to={`/orderdetail/${order?._id}`}
                          icon={FaEye}
                        />
                        <ActionButton
                          onClick={() => handleDeleteOrder(order?._id)}
                          icon={FaTrash}
                          label="Delete"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="flex items-center justify-center gap-3 my-6">
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
    </div>
  );
};

export default OrderManagement;
