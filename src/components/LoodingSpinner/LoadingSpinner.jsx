import React from "react";
// import "./LoadingSpinner.css"; // Add this file for custom styling if needed

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

// import React from "react";

// const ThreeDotLoader = () => {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="flex space-x-2">
//         <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce delay-100"></span>
//         <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce delay-200"></span>
//         <span className="w-3 h-3 bg-primary-500 rounded-full animate-bounce delay-300"></span>
//       </div>
//     </div>
//   );
// };

// export default ThreeDotLoader;
