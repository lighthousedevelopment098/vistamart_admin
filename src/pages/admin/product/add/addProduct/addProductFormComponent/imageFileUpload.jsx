

import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const FileUpload = ({
  label,
  ratio,
  image,
  onChange,
  onDelete,
  isThumbnail,
}) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <div>
            <label className="title-color text-capitalize font-weight-bold mb-0">
              {label} <span className="input-required-icon">*</span>
            </label>
            <span className="badge badge-soft-info">{`Ratio ${ratio}`}</span>
          </div>
        </div>
        <div className="custom_upload_input">
          <input
            type="file"
            name={isThumbnail ? "thumbnail" : "additionalImage"}
            onChange={onChange}
            accept=".jpg, .webp, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
          />
          {image && (
            <>
              <span
                className="delete_file_input btn btn-outline-danger btn-sm square-btn d-flex"
                onClick={onDelete}
              >
                <AiOutlineDelete />
              </span>
              <div className="img_area_with_preview position-absolute z-index-2">
                <img
                  src={image}
                  className="h-auto aspect-1 bg-white"
                  alt={isThumbnail ? "Product Thumbnail" : "Additional Image"}
                />
              </div>
            </>
          )}
          {!image && (
            <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg"
                  alt="Upload"
                  className="w-75"
                />
                <h3 className="text-muted">Upload Image</h3>
              </div>
            </div>
          )}
        </div>
        <p className="text-muted mt-2">
          Image format : Jpg, png, jpeg, webp <br /> Image size : Max 2 MB
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
