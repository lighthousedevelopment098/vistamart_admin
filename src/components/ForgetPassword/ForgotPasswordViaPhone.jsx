import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css"; // Import PhoneInput styles
import PhoneInput from "react-phone-input-2";
import apiConfig from "../../config/apiConfig"; // Importing apiConfig
import { useNavigate } from "react-router-dom";

const ForgotPasswordViaPhone = () => {
  const [phone, setPhone] = useState(""); // Store phone number without country code
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [stage, setStage] = useState(1); // Track stage: 1 = phone entry, 2 = OTP entry, 3 = password reset
  const [isValid, setIsValid] = useState(true); // For phone validation
  const [otpValid, setOtpValid] = useState(true); // For OTP validation
  const [countryCode, setCountryCode] = useState("pk"); // Default to Pakistan's country code
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // if (!validatePhoneNumber(phone)) {
    //   setIsValid(false);
    //   toast.error("Invalid phone number");
    //   return;
    // }
    try {
      const response = await axios.post(
        `${apiConfig.admin}/employees/forgot-password-on-sms`,
        { phone }
      );
  
      if (response.data.status === "success") {
        setStage(2);
        toast.success("OTP has been sent to your phone number");
      } else {
        toast.error(response.data.message || "Error sending OTP");
      }
    } catch (error) {
      toast.error("Incorrect Number, please try again later");
    }
  };
  

  const handleOtpValidation = async (e) => {
    e.preventDefault();
  
  
    if (!otp) {
      setOtpValid(false);
      toast.error("Please enter the OTP");
      return;
    }
  
    try {
      const response = await axios.post(
        `${apiConfig.admin}/employees/validate-otp`,
        { phone, otp }
      );
  
      if (response.data.status === "success") {
        setStage(3);
        toast.success("OTP validated successfully");
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Error validating OTP. Please try again later.");
    }
  };
  

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    // const fullPhoneNumber = `+${phone}`;
  
    try {
      const response = await axios.put(
        `${apiConfig.admin}/employees/reset-password-on-sms`,
        { phone, otp, passwordNew: newPassword, passwordConfirm: confirmPassword }
      );
  
      if (response.data.status === "success") {
        toast.success("Password reset successfully");

        // Use setTimeout to navigate to the login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Error resetting password");
      }
    } catch (error) {
      toast.error("Error resetting password. Please try again later.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>

        {stage === 1 && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="form-group">
              <label htmlFor="phone" className="block mb-2">
                Enter your phone number to reset your password
              </label>
              <PhoneInput
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: false,
                  placeholder: "Enter phone number",
                  autoComplete: "off",
                }}
                country={countryCode} // Dynamically set the country code
                value={phone}
                onChange={(value) => setPhone(value)} // Retain phone number without country code
                onCountryChange={(value) => setCountryCode(value)} // Update country code when changed
                enableAreaCodes={true}
                countryCodeEditable={false}
              />
              {!isValid && (
                <p className="text-red-500 text-sm mt-2">
                  Please enter a valid phone number.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-block p-3 rounded bg-primary-500 hover:bg-primary-dark-500 hover:text-black text-white font-semibold"
              style={{color:"white"}}
            >
              Send OTP
            </button>
          </form>
        )}

        {stage === 2 && (
          <form onSubmit={handleOtpValidation} className="space-y-4">
            <div className="form-group">
              <label htmlFor="otp" className="block mb-2">
                Enter the OTP sent to your phone
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control p-3 border border-gray-300 rounded"
                placeholder="Enter OTP"
              />
              {!otpValid && (
                <p className="text-red-500 text-sm mt-2">Invalid OTP</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-block p-3 rounded bg-primary-500 hover:bg-primary-dark-500 hover:text-black text-white font-semibold"
              style={{color:"white"}}

            >
              Validate OTP
            </button>
          </form>
        )}

        {stage === 3 && (
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="form-group">
              <label htmlFor="new-password" className="block mb-2">
                Enter new password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control p-3 border border-gray-300 rounded"
                placeholder="New password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password" className="block mb-2">
                Confirm new password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control p-3 border border-gray-300 rounded"
                placeholder="Confirm password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-block p-3 rounded bg-primary-500 hover:bg-primary-dark-500 hover:text-black text-white font-semibold"
              style={{color:"white"}}

            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordViaPhone;
