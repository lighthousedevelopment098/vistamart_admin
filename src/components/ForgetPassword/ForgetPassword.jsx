import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from "../../config/apiConfig"; // Importing apiConfig

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiConfig.admin}/employees/forgot-password`,
        { email }
      );
      if (response.data.status === "success") {
        toast.success("Password reset link has been sent to your email");
      } else {
        toast.error(response.data.message || "Error sending reset link");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-500 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block mb-2">
              Enter your email to reset your password
            </label>
            <input
              type="email"
              id="email"
              className="form-control p-3 rounded border border-gray-300 w-full"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-block p-3 rounded bg-primary-500 hover:bg-primary-dark-500 hover:text-black text-white font-semibold"
            style={{ color: "white" }}
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
