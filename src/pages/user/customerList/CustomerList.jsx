import React, { useEffect, useState, useMemo } from "react";
import { FaSearch, FaDownload, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// Import deleteCustomer action
import Swal from "sweetalert2"; // Assuming SweetAlert2 for confirmation dialog
import * as XLSX from "xlsx"; // For exporting customer data as Excel
import {
  deleteCustomer,
  fetchCustomers,
  updateCustomerStatus,
} from "../../../redux/slices/user/customerSlice";
import ExportButton from "../../../components/ActionButton/Export";
import ActionButton from "../../../components/ActionButton/Action";

const CustomerList = React.memo(() => {
  const dispatch = useDispatch();
  const { customers, status, error } = useSelector((state) => state.customers);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch customer data when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const firstName = customer.firstName
        ? customer.firstName.toLowerCase()
        : "";
      const email = customer.email ? customer.email.toLowerCase() : "";
      const phoneNumber = customer.phoneNumber ? customer.phoneNumber : "";
      return (
        firstName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase()) ||
        phoneNumber.includes(searchQuery)
      );
    });
  }, [customers, searchQuery]);

  // Handle status update (block/unblock)
  // const handleStatusUpdate = (customerId, newStatus) => {
  //   Swal.fire({
  //     title: `Are you sure you want to ${
  //       newStatus === "active" ? "unblock" : "block"
  //     } this customer?`,
  //     showCancelButton: true,
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(updateCustomerStatus({ id: customerId, status: newStatus }));
  //     }
  //   });
  // };


  const handleStatusUpdate = (customerId, newStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${
        newStatus === "active" ? "unblock" : "block"
      } this customer?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        // Optimistically update the status in the UI
        dispatch(updateCustomerStatus({ id: customerId, status: newStatus }))
          .unwrap() // Ensure the Redux action resolves
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: `Customer has been ${
                newStatus === "active" ? "unblocked" : "blocked"
              } successfully.`,
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };
  

  // Handle customer deletion
  const handleDelete = (customerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCustomer(customerId)); // Dispatch the delete action
      }
    });
  };

  return (
    <div className="content container-fluid">
      <div className="mb-4">
        <h2 className="h1 mb-0 text-capitalize text-[1rem] font-semibold d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
            alt="Customer List"
          />
          Customer list
          <span className="badge badge-soft-dark radius-50">
            {customers.length}
          </span>
        </h2>
      </div>
      <div className="card">
        <div className="px-3 py-4">
          <div className="flex flex-col gap-4 md:flex-row justify-between  align-items-center">
            <h3 className=" text-[1rem] font-semibold col-lg-4">
              Customer Table
            </h3>
            <div className="flex items-center gap-4 flex-col w-full lg:w-[30vw] md:flex-row">
              <div className="">
                <div className="input-group input-group-merge input-group-custom">
                  <div className="input-group-prepend"></div>
                  <input
                    type="search"
                    className="form-control outline-none"
                    placeholder="Search by Name, Email, or Phone"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="bg-primary-500 space-x-4 text-white  hover:bg-primary-dark-500 input-group-text">
                    <FaSearch /> <h1>Search</h1>
                  </div>
                </div>
              </div>
              <div className="">
                <ExportButton
                  data={customers} // Pass the data to export
                  filename="UserList" // Optional filename for the exported file
                  icon={FaDownload} // Icon for the button
                  label="Export " // Button label
                  className="bg-primary-500 text-white hover:bg-primary-dark-500 " // Tailwind classes for styling
                  style={{ color: "white" }} // Optional inline styles
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive datatable-custom">
          <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
            <thead className="thead-light text-capitalize">
              <tr>
                <th>SL</th>
                <th>Customer Name</th>
                <th>Contact Info</th>
                <th>Total Orders</th>
                <th className="text-center">Block / Unblock</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={`/admin/customer/view/${customer._id}`}
                      className="title-color hover-c1 d-flex align-items-center gap-10"
                    >
                      <img
                        src={
                          customer.image ||
                          "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
                        }
                        className="avatar rounded-circle"
                        alt=""
                        width="40"
                      />
                      {customer.firstName} {customer.lastName}
                    </a>
                  </td>
                  <td>
                    <div className="mb-1">
                      <strong>
                        <a
                          className="title-color hover-c1"
                          href={`mailto:${customer.email}`}
                        >
                          {customer.email}
                        </a>
                      </strong>
                    </div>
                    <a
                      className="title-color hover-c1"
                      href={`tel:${customer.phoneNumber}`}
                    >
                      {customer.phoneNumber}
                    </a>
                  </td>
                  <td>
                    <label className="btn text-info bg-soft-info font-weight-bold px-3 py-1 mb-0 fz-12">
                      {customer.totalOrders || 0}
                    </label>
                  </td>
                  <td className="text-center">
                    <label className="switcher mx-auto">
                      <input
                        type="checkbox"
                        className="switcher_input"
                        checked={customer.status === "active"}
                        onChange={() =>
                          handleStatusUpdate(
                            customer._id,
                            customer.status === "active" ? "inactive" : "active"
                          )
                        }
                      />
                      <span className="switcher_control"></span>
                    </label>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      {/* <a
                        title="View"
                        className="btn btn-outline-info btn-sm square-btn"
                        href={`/admin/customer/view/${customer._id}`}
                      >
                        <FaEye />
                      </a> */}
                      {/* <button
                        title="Delete"
                        className="btn btn-outline-danger btn-sm delete square-btn"
                        onClick={() => handleDelete(customer._id)}
                      >
                        <FaTrash />
                      </button> */}
                      <ActionButton
                        // to={`/admin/customer/view/${customer._id}`}
                        to={"/customerdetails"}
                        icon={FaEye} // Pass dynamic icon
                        className="ml-4"
                      />
                      <ActionButton
                        onClick={() => handleDelete(customer._id)}
                        icon={FaTrash} // Pass dynamic icon
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
  );
});

export default CustomerList;
