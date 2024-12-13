import React, { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../../components/FormInput/FileUpload";
import PreviewImage from "../../../components/FormInput/PreviewImage";
import { createBrand } from "../../../redux/slices/admin/brandSlice";
import "react-toastify/dist/ReactToastify.css";
import { fetchBrands } from "../../../redux/slices/admin/brandSlice";
import { getUploadUrl, uploadImageToS3 } from "../../../utils/helpers";

const AddNewBrand = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [imagePreview, setImagePreview] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [status, setStatus] = useState("inactive");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageAltText, setImageAltText] = useState("");
  // const [imageBase64, setImageBase64] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve loading and error states from the brand slice
  const { loading, error } = useSelector((state) => state.brand);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  async function uploadImage(uploadConfig, file) {
    try {
      await uploadImageToS3(uploadConfig.url, file);
      return uploadConfig.key; // Return the key if successful
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
      return null; // Return null on failure
    }
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    const maxSizeInBytes = 2 * 1024 * 1024; // 5MB

    if (!file) return;

    // File Type Validation
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
      return;
    }

    // File Size Validation
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    // Set the selected file
    setSelectedFile(file);

    // Generate object URL for preview and set it
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);


    // Revoke object URL when the component unmounts or file changes to avoid memory leaks
    return () => URL.revokeObjectURL(objectUrl);
  };
  // ------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadConfig = await getUploadUrl(selectedFile.type, "brands");

    const imageKey = await uploadImage(uploadConfig, selectedFile);

    const data = {
      name: brandName,
      logo: imageKey,
      imageAltText,
    };

    console.log("dataaa", data);
    // Dispatch the createBrand action
    dispatch(createBrand(data))
      .unwrap() // unwrap to handle async response
      .then(() => {
        toast.success("Brand added successfully!");

        dispatch(fetchBrands());
        setTimeout(() => {
          navigate("/brandlist");
        }, 3000);
      })
      .catch((err) => {
        toast.error(`Error adding brand: ${err.message}`);
      });
  };

  const handleReset = () => {
    setSelectedLanguage("en");
    setImagePreview(null);
    setBrandName("");
    setImageAltText("");
  };

  const handleBrandNameChange = (e) => {
    const value = e.target.value;
    const alphabetRegex = /^[a-zA-Z\s]*$/; // Regex for alphabetic characters and spaces

    if (!alphabetRegex.test(value)) {
      toast.error("Brand Name must contain only alphabetic characters.");
      return;
    }

    if (value.length > 50) {
      toast.error("Brand Name must not exceed 50 characters.");
      return;
    }

    setBrandName(value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!brandName.trim()) {
  //     toast.error("Brand Name is required.");
  //     return;
  //   }

  //   const data = {
  //     name: brandName,
  //   };

  //   dispatch(createBrand(data))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Brand added successfully!");
  //       dispatch(fetchBrands());
  //       setTimeout(() => {
  //         navigate("/brandlist");
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       toast.error(`Error adding brand: ${err.message}`);
  //     });
  // };
  return (
    <div className="content container-fluid snipcss-AwJk2">
      <ToastContainer /> {/* Toast notifications container */}
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/brand.png"
            alt="Brand"
          />{" "}
          Brand Setup
        </h2>
      </div>
      <div className="row g-3">
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="card-body text-start">
              <form className="brand-setup-form" onSubmit={handleSubmit}>
                <ul className="nav nav-tabs w-fit-content mb-4">
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "en" ? "active" : ""
                      }`}
                      onClick={() => handleLanguageChange("en")}
                    >
                      {" "}
                      English(EN){" "}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "sa" ? "" : ""
                      }`}
                      onClick={() => handleLanguageChange("sa")}
                    >
                      {" "}
                      Arabic(SA){" "}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "bd" ? "" : ""
                      }`}
                      onClick={() => handleLanguageChange("bd")}
                    >
                      {" "}
                      Bangla(BD){" "}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "in" ? "" : ""
                      }`}
                      onClick={() => handleLanguageChange("in")}
                    >
                      {" "}
                      Hindi(IN){" "}
                    </span>
                  </li>
                </ul>
                <div className="row flex">
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div
                        className={`form-group form-system-language-form ${
                          selectedLanguage === "en" ? "" : "d-none"
                        }`}
                        id="en-form"
                      >
                        <label htmlFor="name-en" className="title-color">
                          {" "}
                          Brand Name <span className="text-danger">
                            *
                          </span> (EN){" "}
                        </label>
                        {/* <input
                          type="text"
                          name="name-en"
                          className="form-control outline-none hover:border-primary"
                          id="name-en"
                          placeholder="Ex : LUX"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                        /> */}

                        <input
                          type="text"
                          name="brandName"
                          className="form-control outline-none hover:border-primary-500"
                          id="name-en"
                          placeholder="Ex: LUX"
                          required
                          value={brandName}
                          onChange={handleBrandNameChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div
                        className={`form-group form-system-language-form ${
                          selectedLanguage === "en" ? "" : "d-none"
                        }`}
                        id="en-alt-form"
                      >
                        <label htmlFor="alt-text-en" className="title-color">
                          {" "}
                          Image Alt Text <span className="text-danger">
                            *
                          </span>{" "}
                          (EN){" "}
                        </label>
                        <input
                          type="text"
                          name="alt-text-en"
                          className="form-control outline-none hover:border-primary-500"
                          id="alt-text-en"
                          placeholder="Ex : Brand Logo"
                          required
                          value={imageAltText}
                          onChange={(e) => setImageAltText(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {imagePreview ? (
                      <PreviewImage
                        image={imagePreview}
                        altText={imageAltText}
                      />
                    ) : (
                      <PreviewImage image={null} altText={imageAltText} />
                    )}
                    <FileUpload
                      name="image"
                      label="Logo"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="reset"
                    className="btn border border-secondary-500 bg-secondary-500 mx-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn bg-primary-500 hover:bg-primary-dark-500 text-white"
                    style={{ color: "white" }}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBrand;
