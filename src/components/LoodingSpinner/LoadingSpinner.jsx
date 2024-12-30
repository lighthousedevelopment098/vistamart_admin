
import React from "react";
import "./LoadingSpinner.css"; 

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full z-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse delay-[0ms]"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse delay-[200ms]"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse delay-[400ms]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
