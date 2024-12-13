import React, { useState } from 'react';

const LoadingGifCard = () => {
  const [loaderGif, setLoaderGif] = useState(
    'loader1.gif'
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setLoaderGif(fileURL);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg h-full w-full md:w-2/4">
      <div className="p-3 bg-white shadow-md flex items-center gap-2">
        <h5 className="mb-0 text-sm font-bold flex items-center gap-2 capitalize">
          <img
            src="/footer-logo.png"
            alt="Loading GIF Icon"
          />
          Loading gif
        </h5>
        <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
          (Ratio 1:1)
        </span>
      </div>
      <div className="p-4 flex flex-col justify-around h-full">
        {/* Loader GIF Preview */}
        <div className="flex justify-center w-20 ml-24 md:ml-44">
          <img height="60" id="view-loader-icon" src={loaderGif} alt="Loading GIF" />
        </div>
        
        {/* File Input */}
        <div className="mt-4 relative">
          <input
            type="file"
            name="loader_gif"
            id="loader-icon"
            accept=".webp, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <label
            htmlFor="loader-icon"
            className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded-md cursor-pointer capitalize"
          >
            Choose file
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoadingGifCard;
