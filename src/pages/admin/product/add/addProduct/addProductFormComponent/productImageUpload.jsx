import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../../../components/FormInput/Imagepreview.css";
import FileUpload from "./imageFileUpload";

const ProductImageWrapper = ({
  thumbnail,
  setThumbnail,
  images,
  setImages,
}) => {
  const [additionalImages, setAdditionalImages] = useState([]);

  const validateFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/tiff",
    ];
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid file format. Please upload a JPG, PNG, WEBP, GIF, BMP, or TIFF image."
      );
      return false;
    }
    if (file.size > maxSize) {
      toast.error("File size exceeds 2 MB. Please upload a smaller image.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e, isThumbnail = false, index = null) => {
    const file = e.target.files[0];
    if (!file || !validateFile(file)) return;

    const previewUrl = URL.createObjectURL(file);

    if (isThumbnail) {
      setThumbnail({ preview: previewUrl, file });
    } else {
      setAdditionalImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index ?? prevImages.length] = { preview: previewUrl, file };
        return newImages;
      });
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index ?? prevImages.length] = { preview: previewUrl, file };
        return newImages;
      });
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = additionalImages.filter((_, idx) => idx !== index);
    setAdditionalImages(updatedImages);
    setImages(updatedImages);
  };

  return (
    <div className=" flex  items-start  mt-6 mb-3">
      <ToastContainer />
      {/* Thumbnail Section */}
      <div className=" flex flex-col md:flex-row gap-4">
        <div className="md:w-96 h-96">
          <FileUpload
            label="Product Thumbnail"
            ratio="1:1 (500 x 500 px)"
            image={thumbnail?.preview || null}
            onChange={(e) => handleImageChange(e, true)}
            onDelete={() => setThumbnail(null)}
            isThumbnail
          />
        </div>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
          {additionalImages.map((img, idx) => (
            <FileUpload
              key={idx}
              label={`Additional Image ${idx + 1}`}
              image={img.preview}
              onChange={(e) => handleImageChange(e, false, idx)}
              onDelete={() => handleDeleteImage(idx)}
            />
          ))}
          <FileUpload
            label="Upload Additional Image"
            ratio="1:1 (500 x 500 px)"
            onChange={(e) => handleImageChange(e)}
          />
        </div>
      </div>

      {/* Additional Images Section */}
    </div>
  );
};

export default ProductImageWrapper;
