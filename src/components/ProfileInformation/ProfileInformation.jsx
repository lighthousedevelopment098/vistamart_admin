import React, { useRef, useState } from "react";
import { HiEyeDropper } from "react-icons/hi2";
import { IoIosLock } from "react-icons/io";
import { IoHomeSharp, IoPerson } from "react-icons/io5";
import { MdSettingsApplications } from "react-icons/md";
import { Link } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import { getAuthData } from "../../utils/authHelper";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const ProfileInformation = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    bannerImage: "",
    vendorImage: "",
  });

  const { token, user } = getAuthData();

  // State for password fields
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Ref for scrolling to the password section
  const passwordSectionRef = useRef(null);

  const handleScrollToPassword = () => {
    if (passwordSectionRef.current) {
      passwordSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${apiConfig.admin}/employees/update-password`,
        {
          passwordCurrent: passwords.currentPassword,
          passwordNew: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your token logic
            "Content-Type": "application/json",
          },
        }
      );
      alert("Password updated successfully!");
      setPasswords({ currentPassword: "", newPassword: "" });
      // Clear token and user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row bottom-0 justify-between items-center mx-4 md:mx-16 my-10">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <IoPerson className="text-2xl font-semibold" />
          <h1 className="font-bold text-xl">Profile Information</h1>
        </div>
        <div className="px-3 py-2 rounded bg-primary-500 hover:bg-primary-dark-500 text-white">
          <Link to={"/"} className="flex gap-2 md:gap-4 items-center">
            <IoHomeSharp className="font-semibold text-white" />
            <h1 className="text-white font-semibold">Dashboard</h1>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mx-4 md:mx-16 gap-1">
        {/* Profile Image */}
        <div className="w-full h-[35vh] md:w-1/4 bg-white shadow-md p-4 rounded mb-4 md:mb-0">
          <img
            src={`${apiConfig.bucket}/${user?.image}`}
            alt=""
            className="h-full"
          />
        </div>

        {/* Profile Details */}
        <div className="w-full md:w-3/4 rounded">
          <div className="relative bg-white px-5 py-3 border border-gray-300 shadow rounded">
            <div className="pt-6 pb-6 flex justify-between flex-wrap items-center w-full">
              <div className="flex items-center gap-2 px-4 py-3">
                <IoPerson className="font-bold text-xl" />
                <h1 className="font-bold text-md">Basic Information</h1>
              </div>
              <div className="flex items-center gap-2 px-4 py-3">
                <Link
                  to={`/employeesdit/${user?._id}`}
                  className="btn border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white "
                  title="Edit info"
                >
                  <FaEdit className="" />
                </Link>
              </div>
            </div>
            <form
              action=""
              className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5"
            >
              <div className="">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  value={user?.name}
                  className="px-3 py-2 rounded border-gray-400 border w-full"
                  readOnly
                />
              </div>
              <div className="">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  value={user?.email}
                  className="px-3 py-2 rounded border-gray-400 border w-full"
                  readOnly
                />
              </div>
            </form>
          </div>

          {/* Update Password Section */}
          <div
            ref={passwordSectionRef}
            className="mt-10 bg-white px-5 py-3 border border-gray-300 shadow rounded"
          >
            <div className="flex items-center gap-2 px-4 py-3">
              <IoIosLock className="font-bold text-xl" />
              <h1 className="font-bold text-md">Update Password</h1>
            </div>
            <form
              onSubmit={handlePasswordUpdate}
              className="grid grid-cols-1 gap-5 px-5"
            >
              <div className="">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded border-gray-400 border w-full"
                  required
                />
              </div>
              <div className="">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  className="px-3 py-2 rounded border-gray-400 border w-full"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary-500 hover:bg-primary-dark-500 text-white rounded"
                  style={{ color: "white" }}
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInformation;
