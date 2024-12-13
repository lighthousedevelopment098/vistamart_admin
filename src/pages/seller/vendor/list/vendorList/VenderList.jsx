import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteVendor,
  fetchVendors,
  resetError,
  updateVendorStatus,
} from "../../../../../redux/slices/seller/vendorSlice";
import VendorTable from "./VendorTable";
import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";
import usePagination from "../../../../../hooks/usePagination";
import Pagination from "../../../../../components/Pagination";

// Lazy load VendorSearch and VendorTable components

const VendorList = () => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState({});
  const vendors = useSelector((state) => state.vendor?.vendors || []);
  const paginations = useSelector((state) => state.vendor?.pagination || []);
  const loading = useSelector((state) => state.vendor?.loading || false);
  const error = useSelector((state) => state.vendor?.error || null);
  const [deleting, setDeleting] = useState(false); 
  const { pagination, setPage } = usePagination(); 
  useEffect(() => {
    dispatch(fetchVendors({ page: pagination.page, limit: pagination.limit }));
  }, [dispatch, pagination.page, pagination.limit]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonText: "OK",
      });
      dispatch(resetError()); // Reset error after showing
    }
  }, [error, dispatch]);


 

  const handleDeleteVendor = async (vendorId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this vendor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true, // Show SweetAlert loader
      allowOutsideClick: () => !Swal.isLoading(), // Prevent closing while loading
      preConfirm: async () => {
        try {
          setDeleting(true); // Show the loading spinner
          await dispatch(deleteVendor({ vendorId }));
          await dispatch(fetchVendors());

          return true;
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        } finally {
          setDeleting(false); // Hide the loading spinner
        }
      },
    });

    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Vendor has been deleted.", "success");
    }
  };

  const handleUpdateStatus = async (vendorId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to update the status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      dispatch(updateVendorStatus({ vendorId, status: newStatus }));
      Swal.fire(
        "Updated!",
        `Vendor status has been updated to ${newStatus}.`,
        "success"
      );
    }
  };

  const memoizedVendors = useMemo(() => vendors, [vendors]);

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  else if (error)
    return (
      <div>
        <h2>Error: {error}</h2>
      </div>
    );

    const handlePageChange = (page) => {
      setPage(page); // Update the page number using usePagination hook
    };
 

  return (
   <>
   
    <VendorTable
      vendors={memoizedVendors}
      pagenations = { paginations }
      onDeleteVendor={handleDeleteVendor}
      onUpdateStatus={handleUpdateStatus}
      setImageLoading={setImageLoading}
      imageLoading={imageLoading}
    />

     <Pagination
        currentPage={paginations?.currentPage}
        totalPages={paginations?.totalPages}
        paginate={handlePageChange}
      />
</>
  );
};

export default VendorList;
