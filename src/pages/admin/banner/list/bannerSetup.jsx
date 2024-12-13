import React, { useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteBanner,
  fetchBanners,
  updateBannerStatus,
  updateBanner
} from "../../../../redux/slices/admin/bannerSlice";
import ConfirmationModal from "../../../../components/FormInput/ConfirmationModal";
import Switcher from "../../../../components/FormInput/Switcher";
import ActionButton from "../../../../components/ActionButton/Action";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import apiConfig from "../../../../config/apiConfig";

const LazyTableList = lazy(() =>
  import("../../../../components/FormInput/TableList")
);

const BannerSetup = () => {
  const dispatch = useDispatch();
  const { banners, loading } = useSelector((state) => state.banner);

  // Fetch banners only once on component mount
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus ? "true" : "false";

    ConfirmationModal({
      title: "Are you sure?",
      text: `Do you want to ${newStatus} this banner?`,
    }).then((willUpdate) => {
      if (willUpdate) {
        dispatch(updateBanner({ bannerId: id, status: !currentStatus }))
          .then(() => {
            toast.success(`Banner status updated to ${newStatus}!`);
            // Fetch the updated banners to refresh the data
            dispatch(fetchBanners());
          })
          .catch(() => console.log("Failed to update banner status."));
      } else {
        toast.info("Status update canceled.");
      }
    });
  };

  const handleDeleteBanner = (id) => {
    ConfirmationModal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this banner!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBanner(id))
          .then(() => toast.success("Banner deleted successfully!"))
          .catch(() => toast.error("Failed to delete the banner."));
      } else {
        toast.info("Banner deletion canceled.");
      }
    });
  };

  const columns = [

    {
      key: "_id",
      label: "ID",
      render: (banner) => `${banner?._id.substring(0, 6)}`,
    },

    {
      key: "bannerImage",
      label: "Image",
      render: (banner) => (
        <img
        src={`${apiConfig.bucket}/${banner?.bannerImage}`} // Use the bucket URL
          alt={banner.name}
          className="h-16 w-24 object-cover "
          style={{ margin: "0 auto" }}
        />
      ),
    },
    { key: "bannerType", label: "Banner Type" },
    {
      key: "publish",
      label: "Published",
      render: (banner) => (
        <Switcher
          checked={banner.publish}
          onChange={() => handleUpdateStatus(banner._id, banner.publish)}
        />
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (banner) => (
        <div className="flex justify-center gap-2">
          {/* <ActionButton to={`/editbannerform/${banner._id}`} icon={FaEdit} /> */}
          <ActionButton
            onClick={() => handleDeleteBanner(banner._id)}
            icon={FaTrash}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FB] px-0 sm:px-6 md:px-8 lg:px-10 py-0 w-full">
      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        <React.Suspense
          fallback={
            <div>
              <LoadingSpinner />
            </div>
          }
        >
          <LazyTableList
            title="Banner"
            tableTitle="Banner List"
            imageSrc="/banner.png"
            listData={banners} // Pass the fetched banners
            columns={columns}
            headerActions={
              <>
                <ActionButton
                  to="/addbannerform"
                  className="px-4 py-2 rounded-md"
                  label="Add Banner"
                />
              </>
            }
          />
        </React.Suspense>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BannerSetup;
