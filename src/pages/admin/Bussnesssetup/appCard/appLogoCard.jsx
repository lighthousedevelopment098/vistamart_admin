import React from 'react';

const AppLogoCard = () => {
  return (
    <div className="border rounded-lg shadow-lg h-full w-full md:w-2/4">
      {/* Card Header */}
      <div className="border-b p-3 shadow-md flex items-center gap-2 bg-white">
        <h5 className="text-sm font-bold  flex items-center gap-2 capitalize mb-0">
          <img
            src="/vistalogo.png"
            alt="App Logo"
            className="h-6"
          />
          App Logo
        </h5>
        <span className="ml-auto bg-blue-100 text-green-600 px-2 py-1 text-xs rounded">
          (100X60px)
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-around h-full">
        {/* Centered Image */}
        <div className="flex justify-center">
          <img
            height="60"
            id="view-app-logo"
            src="/vistalogo.png"
            alt="App Logo Preview"
            className="h-20"
          />
        </div>

        {/* File Input */}
        <div className="relative mt-4">
          <input
            type="file"
            name="company_mobile_logo"
            id="app-logo"
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept=".webp, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
          />
         
        </div>
      </div>
    </div>
  );
};

export default AppLogoCard;
