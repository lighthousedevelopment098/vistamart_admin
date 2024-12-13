import React, { useState } from "react";
import { FiUserPlus, FiInfo, FiImage, FiMail } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthData } from "../../../../../utils/authHelper";
import FormSection from "../../../../../components/FormInput/FormSection";
import FormInput from "../../../../../components/FormInput/FormInput";
import PreviewImage from "../../../../../components/FormInput/PreviewImage";
import FileUpload from "../../../../../components/FormInput/FileUpload";
import FormTextArea from "../../../../../components/FormInput/FormTextArea";
import {
  deleteUploadedImages,
  getUploadUrl,
  uploadImageToS3,
} from "../../../../../utils/helpers";

import apiConfig from "../../../../../config/apiConfig";
import axiosInstance from "../../../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddVendorForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    shopName: "",
    address: "",
    vendorImage: null,
    logo: null,
    banner: null,
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [vendorPreview, setVendorPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;

  //   if (["firstName", "lastName", "shopName"].includes(name)) {
  //     if (value.length > 40) {
  //       toast.error(`${name.replace(/^\w/, (c) => c.toUpperCase())} is limited to 50 characters.`);
  //       return;
  //     }
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
      return;
    }

    const previewMap = {
      logo: setLogoPreview,
      banner: setBannerPreview,
      vendorImage: setVendorPreview,
    };

    const setPreview = previewMap[name];
    if (setPreview) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);

  //   if (!validatePassword(formData.password)) {
  //     toast.error(
  //       "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
  //     );
  //     setLoading(false);
  //     return;
  //   }

  //   const { token } = getAuthData();

  //   const logoFile = formData.logo || null;
  //   const bannerFile = formData.banner || null;
  //   const vendorFile = formData.vendorImage || null;

  //   try {
  //     const [logoUploadConfig, bannerUploadConfig, vendorUploadConfig] =
  //       await Promise.all([
  //         getUploadUrl(logoFile.type, "vendors"),
  //         getUploadUrl(bannerFile.type, "vendors"),
  //         getUploadUrl(vendorFile.type, "vendors"),
  //       ]);

  //     const uploadedKeys = await Promise.all([
  //       uploadImageToS3(logoUploadConfig.url, logoFile),
  //       uploadImageToS3(bannerUploadConfig.url, bannerFile),
  //       uploadImageToS3(vendorUploadConfig.url, vendorFile),
  //     ]);

  //     const vendorData = {
  //       ...formData,
  //       logo: uploadedKeys[0],
  //       banner: uploadedKeys[1],
  //       vendorImage: uploadedKeys[2],
  //     };

  //     const response = await axiosInstance.post(
  //       `${apiConfig.seller}/vendors/signup`,
  //       vendorData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.data.doc) {
  //       toast.success("Vendor added successfully!");
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         phoneNumber: "",
  //         email: "",
  //         password: "",
  //         shopName: "",
  //         address: "",
  //         vendorImage: null,
  //         logo: null,
  //         banner: null,
  //       });
  //       setLogoPreview(null);
  //       setBannerPreview(null);
  //       setVendorPreview(null);
  //       navigate("/venderlist");
  //     }
  //   } catch (error) {
  //     console.error("Error adding vendor:", error);
  //     toast.error("Failed to add vendor.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (["firstName", "lastName", "shopName"].includes(name)) {
      // Check for non-alphabetic characters
      const alphabetRegex = /^[a-zA-Z\s]*$/;
      if (!alphabetRegex.test(value)) {
        toast.error(`${name.replace(/^\w/, (c) => c.toUpperCase())} must contain only alphabetic characters.`);
        return;
      }
  
      // Limit length to 50 characters
      if (value.length > 30) {
        toast.error(`${name.replace(/^\w/, (c) => c.toUpperCase())} is limited to 50 characters.`);
        return;
      }
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate required fields
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email", "password", "shopName", "address"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`${field.replace(/^\w/, (c) => c.toUpperCase())} is required.`);
        return;
      }
    }
  
    // Validate password
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }
  
    setLoading(true);
  
    try {
      const { token } = getAuthData();
  
      // Prepare files for upload
      const filesToUpload = [
        { file: formData.logo, field: "logo" },
        { file: formData.banner, field: "banner" },
        { file: formData.vendorImage, field: "vendorImage" },
      ];
  
      const uploadedKeys = await Promise.all(
        filesToUpload.map(async ({ file, field }) => {
          if (file) {
            const uploadConfig = await getUploadUrl(file.type, "vendors");
            await uploadImageToS3(uploadConfig.url, file);
            return uploadConfig.key; // Store the returned key
          }
          return null; // If no file, return null
        })
      );
  
      // Build the vendorData object with uploaded file URLs
      const vendorData = {
        ...formData,
        logo: uploadedKeys[0], // URL for logo
        banner: uploadedKeys[1], // URL for banner
        vendorImage: uploadedKeys[2], // URL for vendorImage
      };
  
      // Make API request to add vendor
      const response = await axiosInstance.post(
        `${apiConfig.seller}/vendors/signup`,
        vendorData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.doc) {
        toast.success("Vendor added successfully!");
        resetForm(); // Clear form and reset previews
        navigate("/venderlist");
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast.error(error.response?.data?.message || "Failed to add vendor.");
    } finally {
      setLoading(false);
    }
  };
  
  // Reset the form and previews
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      shopName: "",
      address: "",
      vendorImage: null,
      logo: null,
      banner: null,
    });
    setLogoPreview(null);
    setBannerPreview(null);
    setVendorPreview(null);
  };
  
  
  return (
    <div className="content container-fluid main-card ltr snipcss-B2K3K">
      <div className="mb-4">
        <h2 className="h1 mb-0 text-capitalize text-[1rem] font-semibold d-flex align-items-center gap-2">
          <FiUserPlus className="mb-1" /> Add new Vendor
        </h2>
      </div>
      <form
        className="user"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="add-vendor-form"
      >
        <FormSection
          icon={<FiInfo className="mb-1" />}
          title="Vendor information"
        >
          <div className="row align-items-center p-4">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <FormInput
                label="First name"
                name="firstName"
                type="text"
                placeholder="Ex: John"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <FormInput
                label="Last name"
                name="lastName"
                type="text"
                placeholder="Ex: Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <div className="form-group ">
                <label
                  htmlFor="exampleInputPhone"
                  className="title-color d-flex gap-1 align-items-center "
                >
                  Phone
                </label>
                <PhoneInput
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                    autoFocus: false,
                    placeholder: "Enter phone number",
                    autoComplete: "off",
                  }}
                  country={"us"}
                  value={formData.phoneNumber}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "phoneNumber", value },
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-6 ">
              <PreviewImage
                image={vendorPreview} // Use imagePreview for preview
                altText="Vendor image"
                style={{ width: "200px" }}
              />
              <FileUpload
                name="vendorImage"
                label="Vendor Image "
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<FiMail className="mb-1" />}
          title="Account information"
        >
          <div className="row p-4">
            <div className="col-lg-4">
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Ex: John@company.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-lg-4">
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password minimum 8 characters"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<FiImage className="mb-1" />}
          title="Shop information"
        >
          <div className="row p-4">
            <div className="col-lg-6">
              <FormInput
                label="Shop name"
                name="shopName"
                type="text"
                placeholder="Shop name"
                value={formData.shopName}
                onChange={handleInputChange}
                required
              />
              <FormTextArea
                label="Address"
                name="address"
                placeholder="Enter shop address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-lg-6">
              <PreviewImage image={logoPreview} altText="Shop Logo" />
              <FileUpload
                name="logo"
                label="Shop Logo"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                onChange={handleImageChange}
              />
              <PreviewImage image={bannerPreview} altText="Shop Banner" />
              <FileUpload
                name="banner"
                label="Shop Banner"
                accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </FormSection>

        <div className="form-group col-lg-12 text-right">
          <button
            type="submit"
            className="btn bg-primary hover:bg-primary-dark hover:text-white mt-3 text-white"
            style={{ color: "white" }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Add Vendor"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddVendorForm;



