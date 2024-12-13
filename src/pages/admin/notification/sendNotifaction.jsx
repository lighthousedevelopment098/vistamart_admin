import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaRecycle,
  FaDownload,
  FaTrash,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportButton from "../../../components/ActionButton/Export";
import ActionButton from "../../../components/ActionButton/Action";

const SendNotification = () => {
  const [uploadedImage, setUploadedImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notification/");
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", uploadedImage);

    try {
      const response = await fetch("http://localhost:3000/api/notification/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create notification");
      const newNotification = await response.json();
      setNotifications([...notifications, newNotification]);
      setTitle("");
      setDescription("");
      setUploadedImage("");
      toast.success("Notification created successfully!");
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification.");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const response = await fetch(
        `http://localhost:3000/api/notification/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update status");
      const updatedNotification = await response.json();
      setNotifications(
        notifications.map((notification) =>
          notification._id === id ? updatedNotification : notification
        )
      );
      toast.success(`Notification status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update notification status.");
    }
  };

  const handleResend = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notification/${id}/increment`,
        {
          method: "PUT",
        }
      );
      if (!response.ok)
        throw new Error("Failed to increment notification count");
      const updatedNotification = await response.json();
      setNotifications(
        notifications.map((notification) =>
          notification._id === id ? updatedNotification : notification
        )
      );
      toast.success("Notification count incremented successfully!");
    } catch (error) {
      console.error("Error incrementing notification count:", error);
      toast.error("Failed to increment notification count.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/notification/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete notification");
        setNotifications(
          notifications.filter((notification) => notification._id !== id)
        );
        toast.success("Notification deleted successfully!");
      } catch (error) {
        console.error("Error deleting notification:", error);
        toast.error("Failed to delete notification.");
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="bg-[#F9F9FB] px-5 py-5 w-full ">
        <div className="font-bold text-[1.3rem] flex gap-2 items-center ">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/push_notification.png"
            alt=""
            className="w-7 h-7 "
          />
          <h1>Send Notification</h1>
        </div>
        <div className="h-[70vh] w-full bg-white grid grid-cols-1 md:grid-cols-2 rounded-lg mt-3 px-10 py-8 gap-3">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 pt-5">
                <label htmlFor="title text-[1rem]">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Notification*"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-5 py-2 border border-gray-200 rounded-md focus:outline-none hover:border-primary-500 "
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 outline-none"
                ></textarea>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-center items-center px-8 py-5">
              <div className="h-40 w-40 border-2 border-gray-300 rounded-lg overflow-hidden flex justify-center items-center">
                <img
                  src={
                    uploadedImage ||
                    "https://6valley.6amtech.com/public/assets/back-end/img/900x400/img1.jpg"
                  }
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="ms-4 flex flex-col ">
              <label htmlFor="image-upload" className="text-md">
                Image (Ratio 1:1)
              </label>
              <div>
                <input
                  type="file"
                  id="image-upload"
                  className="px-2 py-2 w-60 border outline-none border-e border-blue-300 md:w-96  "
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="flex justify-end items-end gap-3 ">
              <button
                type="reset"
                className="bg-[#EDEDED] rounded-md px-4 py-2 border border-gray-300"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md px-4  bg-primary text-white py-2 border border-primary-500 hover:bg-primary-dark"
                style={{ color: "white" }}
              >
                send notification
              </button>
            </div>
          </div>
        </div>

        <div className="container mt-3 mx-5">
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card mb-5">
                <div className="px-3 py-4">
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <h5 className="mb-0 text-capitalize text-[1rem] font-semibold d-flex gap-2 mr-auto">
                      Push Notification Table
                      <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                        {notifications.length}
                      </span>
                    </h5>
                    <form
                      action="https://6valley.6amtech.com/admin/coupon/add"
                      method="GET"
                    >
                      <div className="input-group input-group-merge input-group-custom">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <FaSearch />
                          </div>
                        </div>
                        <input
                          id="datatableSearch_"
                          type="search"
                          name="searchValue"
                          className="form-control outline-none"
                          placeholder="Search by Title or Code or Discount Type"
                          required
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                          style={{ color: "white" }}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    <div>
                      <ExportButton
                        data={notifications}
                        filename="SendNotifactionList"
                        icon={FaDownload}
                        label="Export "
                        className="bg-primary-500 text-white hover:bg-primary-dark-500  "
                        style={{ color: "white" }}
                      />
                    </div>
                  </div>
                </div>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Image</th>
                          <th>Notification count</th>
                          <th>Status</th>
                          <th>Resend</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.map((notification) => (
                          <tr key={notification._id}>
                            <td>{notification.title}</td>
                            <td>{notification.description}</td>
                            <td>
                              <img
                                src={
                                  notification.image ||
                                  "https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
                                }
                                alt={notification.title}
                                className="h-12 w-12 border border-gray-200 rounded"
                              />
                            </td>
                            <td className="text-center">
                              {notification.count}
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleStatusToggle(
                                    notification._id,
                                    notification.status
                                  )
                                }
                                className={`px-4 py-1 rounded-md ${
                                  notification.status === "Active"
                                    ? "bg-primary-500"
                                    : "bg-gray-400"
                                } text-white`}
                              >
                                {notification.status}
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => handleResend(notification._id)}
                                className="btn btn-info"
                              >
                                <FaRecycle />
                              </button>
                            </td>
                            <td className="d-flex gap-2">
                              <ActionButton
                                onClick={() => handleDelete(notification._id)}
                                icon={FaTrash}
                                className="ml-4"
                                label="Delete"
                              />

                              <ActionButton
                                to={`/notifications/${notification._id}`}
                                icon={FaEye}
                                className="ml-4"
                                label="View"
                              />
                              <ActionButton
                                to={`/notifications/edit/${notification._id}`}
                                icon={FaEdit}
                                className="ml-4"
                                label="Edit"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendNotification;
