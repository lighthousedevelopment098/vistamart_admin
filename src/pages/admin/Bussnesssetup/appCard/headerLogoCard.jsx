import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadImageToS3, getUploadUrl } from "../../../seller/vendor/add/addVender/helpers";
import apiConfig from "../../../../config/apiConfig";

const WebsiteHeaderLogoCard = ({ initialLogo,  onImageChange }) => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(
    initialLogo || `${apiConfig.bucket}/${initialLogo}`
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    try {
      setLoading(true);
      const uploadConfig = await getUploadUrl(file.type, "business");
      await uploadImageToS3(uploadConfig.url, file);
      onImageChange(uploadConfig.key); // Pass S3 key to parent
      setLogoPreview(`${apiConfig.bucket}/${uploadConfig.key}`); // Update preview with S3 URL
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg h-[49vh] w-full md:w-2/4">
      <div className="p-3 bg-white shadow-md rounded-t-md flex items-center gap-2">
        <h5 className="mb-0 text-sm font-bold flex items-center gap-2 capitalize">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/header-logo.png"
            alt="Website Header Logo"
          />
          Website Logo
        </h5>
        <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-nowrap text-xs rounded">
          (1000 x 308 px)
        </span>
      </div>
      <div className="p-4 flex flex-col justify-around mt-4">
        {/* Logo Preview */}
        <div className="flex justify-between items-center ml-14 md:ml-32 w-40 h-20">
          <img
            height="h-full w-full object-cover" 
            id="view-website-logo"
            alt="Website Logo"
            src={`${apiConfig.bucket}/${initialLogo}` || "/default-header-logo.png"}
          />
        </div>

        {/* File Input */}
        <div className="mt-4 relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <label
            htmlFor="website-logo"
            className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded-md cursor-pointer capitalize"
          >
            Choose file
          </label>
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-2">Uploading...</p>
        )}
      </div>
    </div>
  );
};

export default WebsiteHeaderLogoCard;
