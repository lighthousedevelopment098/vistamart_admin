import React from "react";
import "./LoadingSpinner.css"; // Add this file for custom styling if needed

const Uploading = () => {
  return (
    <div className="loading-overlay">
   
      <img src="/uploading.gif" alt="" />
    </div>
  );
};

export default Uploading;
