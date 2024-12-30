import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadImageToS3, getUploadUrl } from "../../../seller/vendor/add/addVender/helpers";
import apiConfig from "../../../../config/apiConfig";

const WebsiteFaviconCard = ({ initialFavicon, onImageChange }) => {
  const [loading, setLoading] = useState(false);
  const [faviconPreview, setFaviconPreview] = useState(
    initialFavicon || `${apiConfig.bucket}/${initialFavicon}`
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/x-icon"];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, GIF, and ICO are allowed.");
      return;
    }

    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 1MB limit.");
      return;
    }

    try {
      setLoading(true);
      const uploadConfig = await getUploadUrl(file.type, "business");
      await uploadImageToS3(uploadConfig.url, file);
      onImageChange(uploadConfig.key); // Pass S3 key to parent
      setFaviconPreview(`${apiConfig.bucket}/${uploadConfig.key}`); // Update preview with S3 URL
      toast.success("Favicon uploaded successfully!");
    } catch (error) {
      console.error("Favicon upload failed:", error);
      toast.error("Failed to upload favicon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg h-full w-full md:w-2/4">
      <div className="p-3 bg-white shadow-md flex items-center gap-2">
        <h5 className="mb-0 text-sm font-bold flex items-center gap-2 capitalize">
        <img
             src="/footer-logo.png"
            alt="Favicon Icon"
          />
          Website Favicon
        </h5>
    
        <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
          (Ratio 1:1)
        </span>
      </div>
      <div className="p-4 flex flex-col justify-around h-full">
        {/* Favicon Preview */}
        <div className="flex justify-center w-16 ml-20 md:ml-40">
          <img
            height="60"
            id="view-website-fav-icon"
            src={`${apiConfig.bucket}/${initialFavicon}` || "/default-favicon.png"}
            alt="Website Favicon"
          />
        </div>
        {/* File Input */}
        <div className="mt-4 relative">
          <input
            type="file"
            name="company_fav_icon"
            id="website-fav-icon"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <label
            htmlFor="website-fav-icon"
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

export default WebsiteFaviconCard;
