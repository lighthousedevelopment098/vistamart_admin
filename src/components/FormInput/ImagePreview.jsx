// import React, { useState } from 'react';
// import { AiOutlineDelete } from 'react-icons/ai';
// import './imagepreview.css'

// const ProductImageWrapper = () => {
//   const [thumbnail, setThumbnail] = useState(null);
//   const [additionalImages, setAdditionalImages] = useState([]);
//   const [previewFile, setPreviewFile] = useState(null);

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setThumbnail(URL.createObjectURL(file));
//     }
//   };

//   const handleDeleteThumbnail = () => {
//     setThumbnail(null);
//   };

//   const handleAdditionalImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newImages = [...additionalImages];
//       newImages[index] = URL.createObjectURL(file);
//       setAdditionalImages(newImages);
//     }
//   };

//   const handleDeleteImage = (index) => {
//     const updatedImages = additionalImages.filter((_, idx) => idx !== index);
//     setAdditionalImages(updatedImages);
//   };

//   return (
//     <div className="product-image-wrapper">
//       {/* Thumbnail Section */}
//       <div className="item-1">
//         <div className="card h-100">
//           <div className="card-body">
//             <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
//               <div>
//                 <label className="title-color text-capitalize font-weight-bold mb-0">
//                   Product thumbnail <span className="input-required-icon">*</span>
//                 </label>
//                 <span className="badge badge-soft-info">Ratio 1:1 (500 x 500 px)</span>
//               </div>
//             </div>
//             <div className="custom_upload_input">
//               <input
//                 type="file"
//                 onChange={handleThumbnailChange}
//                 accept=".jpg, .webp, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
//               />
//               {thumbnail && (
//                 <>
//                   <span
//                     className="delete_file_input btn btn-outline-danger btn-sm square-btn d-flex"
//                     onClick={handleDeleteThumbnail}
//                   >
//                     <AiOutlineDelete />
//                   </span>
//                   <div className="img_area_with_preview position-absolute z-index-2">
//                     <img
//                       src={thumbnail}
//                       className="h-auto aspect-1 bg-white"
//                       alt="Product Thumbnail"
//                     />
//                   </div>
//                 </>
//               )}
//               {!thumbnail && (
//                 <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
//                   <div className="d-flex flex-column justify-content-center align-items-center">
//                     <img
//                       src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg"
//                       alt="Upload"
//                       className="w-75"
//                     />
//                     <h3 className="text-muted">Upload Image</h3>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <p className="text-muted mt-2">
//               Image format : Jpg, png, jpeg, webp <br /> Image size : Max 2 MB
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Additional Images Section */}
//       <div className="additional_image_column item-2 col-md-9">
//         <div className="card h-100">
//           <div className="card-body">
//             <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
//               <label className="title-color text-capitalize font-weight-bold mb-0">
//                 Upload additional image
//               </label>
//               <span className="badge badge-soft-info">Ratio 1:1 (500 x 500 px)</span>
//             </div>
//             <p className="text-muted">Upload additional product images</p>
//             <div className="coba-area">
//               <div className="row g-2" id="additional_Image_Section">
//                 {additionalImages.map((img, idx) => (
//                   <div key={idx} className="col-sm-12 col-md-4">
//                     <div className="custom_upload_input position-relative border-dashed-2">
//                       <img
//                         src={img}
//                         alt={`Additional ${idx + 1}`}
//                         className="h-auto aspect-1 bg-white"
//                       />
//                       <span
//                         className="delete_file_input btn btn-outline-danger btn-sm square-btn"
//                         onClick={() => handleDeleteImage(idx)}
//                       >
//                         <AiOutlineDelete />
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="col-sm-12 col-md-4">
//                   <div className="custom_upload_input position-relative border-dashed-2">
//                     <input
//                       type="file"
//                       onChange={(e) => handleAdditionalImageChange(e, additionalImages.length)}
//                       accept=".jpg, .webp, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
//                     />
//                     <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
//                       <div className="d-flex flex-column justify-content-center align-items-center">
//                         <img
//                           src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg"
//                           alt="Upload"
//                           className="w-75"
//                         />
//                         <h3 className="text-muted">Upload Image</h3>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductImageWrapper;



import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import './imagepreview.css';

// FileUpload component for handling both thumbnail and additional images
const FileUpload = ({ label, ratio, image, onChange, onDelete, isThumbnail }) => {
  return (
    <div className="card h-100">
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
                  alt={isThumbnail ? 'Product Thumbnail' : 'Additional Image'}
                />
              </div>
            </>
          )}
          {!image && (
            <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src="/product-upload-icon.svg"
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

const ProductImageWrapper = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleDeleteThumbnail = () => {
    setThumbnail(null);
  };

  const handleAdditionalImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...additionalImages];
      newImages[index] = URL.createObjectURL(file);
      setAdditionalImages(newImages);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = additionalImages.filter((_, idx) => idx !== index);
    setAdditionalImages(updatedImages);
  };

  return (
    <div className="product-image-wrapper">
      {/* Thumbnail Section */}
      <div className="item-1">
        <FileUpload 

          label="Product Thumbnail"
          ratio="1:1 (500 x 500 px)"
          image={thumbnail}
          onChange={handleThumbnailChange}
          onDelete={handleDeleteThumbnail}
          isThumbnail
        />
      </div>

      {/* Additional Images Section */}
      <div className="additional_image_column item-2 col-md-9">
        <div className="card h-100">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
              <label className="title-color text-capitalize font-weight-bold mb-0">
                Upload additional images
              </label>
              <span className="badge badge-soft-info">Ratio 1:1 (500 x 500 px)</span>
            </div>
            <p className="text-muted">Upload additional product images</p>
            <div className="coba-area">
              <div className="row g-2" id="additional_Image_Section">
                {additionalImages.map((img, idx) => (
                  <div key={idx} className="col-sm-12 col-md-4">
                    <FileUpload
                      label={`Additional Image ${idx + 1}`}
                      ratio="1:1 (500 x 500 px)"
                      image={img}
                      onDelete={() => handleDeleteImage(idx)}
                    />
                  </div>
                ))}
                <div className="col-sm-12 col-md-4">
                  <FileUpload
                    label="Upload Additional Image"
                    ratio="1:1 (500 x 500 px)"
                    onChange={(e) => handleAdditionalImageChange(e, additionalImages.length)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageWrapper;


