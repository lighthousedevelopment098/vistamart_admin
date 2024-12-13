import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use `useNavigate` instead of `useHistory`
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from "../../config/apiConfig";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate(); // Replacing `useHistory` with `useNavigate`
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwordNew !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        `${apiConfig.admin}/employees/reset-password/${token}`,
        { passwordNew, passwordConfirm }
      );
      if (response.data.status === "success") {
        toast.success("Password has been reset successfully!");
        setTimeout(() => {
            navigate("/login");
          }, 2000);
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="form-group">
            <label htmlFor="passwordNew" className="block mb-2">
              New Password
            </label>
            <input
              type="password"
              id="passwordNew"
              className="form-control p-3 rounded border border-gray-300 w-full"
              placeholder="New Password"
              required
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm" className="block mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="form-control p-3 rounded border border-gray-300 w-full"
              placeholder="Confirm Password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-block p-3 rounded bg-primary hover:bg-green-400 hover:text-black text-white font-semibold"
          style={{color:"white"}}
         >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
