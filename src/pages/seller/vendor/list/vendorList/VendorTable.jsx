import React, { memo } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications
import ActionButton from "../../../../../components/ActionButton/Action";
import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";
import apiConfig from "../../../../../config/apiConfig";
import TableList from "./TableList";

const VendorTable = memo(({ onDeleteVendor, vendors, pagenations }) => {
  // Define columns for the TableList
  const columns = [
    { key: "index", label: "SL", render: (_, index) => index + 1 },
    {
      key: "vendorImage",
      label: "Vendor Image",
      render: (vendor) => (
        <img
          width="50"
          className="avatar rounded-circle"
          src={`${apiConfig.bucket}/${vendor?.vendorImage}`}
          alt={vendor?.firstName}
        />
      ),
    },
    { key: "shopName", label: "Shop Name" },
    {
      key: "firstName",
      label: "Vendor Name",
      render: (vendor) => (
        <label className={`badge badge-${getStatusBadge(vendor?.status).text}`}>
          {vendor?.firstName}
        </label>
      ),
    },
    {
      key: "contactInfo",
      label: "Contact Info",
      render: (vendor) => (
        <>
          <strong>
            <a
              className="title-color hover-c1"
              href={`mailto:${vendor?.email}`}
            >
              {vendor?.email}
            </a>
          </strong>
          <br />
          <a
            className="title-color hover-c1"
            href={`tel:${vendor?.phoneNumber}`}
          >
            {vendor?.phoneNumber}
          </a>
        </>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (vendor) => {
        const statusClasses = getStatusBadge(vendor?.status);
        return (
          <label
            className={`badge bg-${statusClasses.bg} text-${statusClasses.text}`}
          >
            {vendor?.status}
          </label>
        );
      },
    },
    {
      key: "actions",
      label: "Action",
      render: (vendor) => (
        <div className="btn--group flex gap-2">
          <ActionButton
            to={`/vendordetail/${vendor._id}`} // Dynamic link
            icon={FaEye} // Pass dynamic icon
          />
          <ActionButton
            to={`/edit/${vendor._id}`} // Dynamic link
            icon={FaEdit} // Pass dynamic icon
          />
          <ActionButton
            onClick={() => onDeleteVendor(vendor._id)} // Handle the delete action
            icon={FaTrash} // Pass dynamic icon
          />
        </div>
      ),
    },
  ];

  // Function to get the badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return { bg: "green-400", text: "black" }; // green background with white text
      case "active":
        return { bg: "green-400", text: "white" }; // green background with white text
      case "pending":
        return { bg: "yellow-600", text: "black" }; // yellow background with black text
      case "inactive":
      case "rejected":
        return { bg: "red-400", text: "white" }; // danger background with white text
      default:
        return { bg: "", text: "black" }; // secondary background with white text
    }
  };

  return (
    <div className="bg-secondary-500 px-0 sm:px-6 md:px-8 lg:px-10 py-0 w-full">
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <React.Suspense
          fallback={
            <div>
              <LoadingSpinner />
            </div>
          }
        >
          {/* {
            console.log("pageniation in table=====", pagenations)
          } */}
          <TableList
            title="Vendor Management"
            imageSrc="/add-new-seller.png"
            tableTitle="List of Vendors"
            listData={vendors}
            pagenations={pagenations} // Pass the fetched pagenations for pagination
            columns={columns}
            exportFileName="vendors"
            headerActions={
              <>
                <ActionButton
                  to="/addvenderform"
                  className="px-4 py-2 rounded-md"
                  label="Add Vendor"
                />
              </>
            }
          />
        </React.Suspense>
      </div>
      <ToastContainer /> {/* Toast notifications will be shown here */}
    </div>
  );
});

export default VendorTable;
