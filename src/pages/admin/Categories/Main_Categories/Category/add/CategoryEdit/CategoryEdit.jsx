import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthData } from "../../../../../../../utils/authHelper"; // Import function to get token
import apiConfig from "../../../../../../../config/apiConfig"; // Import apiConfig for API URLs
import {
  getUploadUrl,
  uploadImageToS3,
} from "../../../../../../../utils/helpers";

const ApiUrl = `${apiConfig.admin}`; // Use admin role

const CategoryUpdate = () => {
  const { id } = useParams(); // Extract category ID from URL params
  const navigate = useNavigate(); // To navigate after successful update
  const [categoryData, setCategoryData] = useState({
    name: "",
    priority: 0,
    logo: "",
    shippingCategoryId:1

  });
  const [selectedFile, setSelectedFile] = useState(null); // To store selected file for upload
  const [previewUrl, setPreviewUrl] = useState(""); // To store the image preview URL
  const [selectedLang, setSelectedLang] = useState("en"); // Set default language to English

   
  // Fetch category data by ID
  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id]);

  // const fetchCategoryById = async (categoryId) => {
  //   try {
  //     const { token } = getAuthData(); // Get token
  //     const response = await axios.get(`${ApiUrl}/categories/${categoryId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const { name, priority, logo, shippingCategoryId } = response.data.doc;
  //     setCategoryData({ name, priority, logo,shippingCategoryId });
  //     setPreviewUrl(`${apiConfig.bucket}/${logo}`); // Set initial preview URL
  //   } catch (error) {
  //     console.error("Failed to fetch category:", error);
  //     toast.error("Failed to fetch category data");
  //   }
  // };

  // List of Track Categories
  
  const fetchCategoryById = async (categoryId) => {
    try {
      const { token } = getAuthData(); // Get token
      const response = await axios.get(`${ApiUrl}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Ensure shippingCategoryId is available in the response
      const { name, priority, logo, shippingCategoryId } = response.data.doc;
  
      // Set category data with a default value for shippingCategoryId if not available
      setCategoryData({
        name,
        priority,
        logo,
        shippingCategoryId: shippingCategoryId || 1, // Default to 1 if not available
      });
      setPreviewUrl(`${apiConfig.bucket}/${logo}`); // Set initial preview URL
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to fetch category data");
    }
  };
  
  const trackCategories = [
    { id: 1, description: "Apparel" },
    { id: 2, description: "Automotive Parts" },
    { id: 3, description: "Accessories" },
    { id: 4, description: "Personal Electronics (Mobile Phones, Laptops, etc.)" },
    { id: 5, description: "Electronics Accessories (Cases, Chargers, etc.)" },
    { id: 6, description: "Gadgets" },
    { id: 7, description: "Jewellery" },
    { id: 8, description: "Cosmetics" },
    { id: 9, description: "Stationery" },
    { id: 10, description: "Handicrafts" },
    { id: 11, description: "Home-made Items" },
    { id: 12, description: "Footwear" },
    { id: 13, description: "Watches" },
    { id: 14, description: "Leather Items" },
    { id: 15, description: "Organic and Health Products" },
    { id: 16, description: "Appliances and Consumer Electronics" },
    { id: 17, description: "Home Decor and Interior Items" },
    { id: 18, description: "Toys" },
    { id: 19, description: "Pet Supplies" },
    { id: 20, description: "Athletics and Fitness Items" },
    { id: 21, description: "Vouchers and Coupons" },
    { id: 22, description: "Marketplace" },
    { id: 23, description: "Documents and Letters" },
    { id: 24, description: "Other" },
  ];

  // Handle input change for category form fields
  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  
  // Handle file selection for logo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Create a preview URL for the selected file
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let logoKey = categoryData.logo; // Keep existing logo if no new file is uploaded

    if (selectedFile) {
      try {
        // Ensure to get the correct upload URL
        const uploadConfig = await getUploadUrl(selectedFile.type, "category");
        const { url } = uploadConfig; // Ensure you extract the url correctly
        await uploadImageToS3(url, selectedFile); // Pass only the URL and the file
        logoKey = uploadConfig.key; // Use the key from the uploadConfig
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image"); // Show error toast
        return; // Exit if image upload fails
      }
    }
    console.log("category data====", categoryData)
    const formData = {
      name: categoryData.name,
      priority: categoryData.priority,
      logo: logoKey, // Use the new logo key from upload or existing
      shippingCategoryId: categoryData.shippingCategoryId
    };

    try {
      const { token } = getAuthData(); // Get token
      console.log("Updating category with ID:", id);
      const response = await fetch(`${ApiUrl}/categories/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const responseData = await response.json();
      toast.success("Category updated successfully"); // Show success toast
 
      setTimeout(() => {
        navigate("/categories");
      }, 2000); // Delay of 2 seconds
        
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category"); // Show error toast
    }
  };

  return (
    <div className="content container-fluid px-10">
      <ToastContainer />
      <div className="mb-3">
        <h2 className="h1 mb-0 d-flex gap-10">
          {id ? "Edit Category" : "Add Category"}
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body text-start">
              <form onSubmit={handleSubmit}>
                <ul className="nav nav-tabs w-fit-content mb-4">
                  {["en", "sa", "bd", "in"].map((lang) => (
                    <li className="nav-item text-capitalize" key={lang}>
                      <span
                        className={`nav-link form-system-language-tab cursor-pointer ${
                          selectedLang === lang ? "active" : ""
                        }`}
                        onClick={() => setSelectedLang(lang)}
                      >
                        {lang === "en" && "English(EN)"}
                        {/* {lang === "sa" && "Arabic(SA)"}
                        {lang === "bd" && "Bangla(BD)"}
                        {lang === "in" && "Hindi(IN)"} */}
                      </span>
                    </li>
                  ))}
                </ul>
                <CategoryForm
                  selectedLang={selectedLang}
                  categoryData={categoryData}
                  
                  onInputChange={handleInputChange}
                  onFileChange={handleFileChange}
                  previewUrl={previewUrl} // Pass previewUrl to CategoryForm
                  trackCategories={trackCategories} // Pass trackCategories to CategoryForm
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryForm = ({
  selectedLang,
  categoryData,
  onInputChange,
  onFileChange,
  previewUrl, // Accept previewUrl as a prop
  trackCategories, // Receive trackCategories as a prop
}) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        {["en", "sa", "bd", "in"].map((lang) => (
          <div
            className={`form-group ${
              selectedLang === lang ? "" : "d-none"
            } form-system-language-form`}
            key={lang}
          >
            <label className="title-color">
              Category Name<span className="text-danger">*</span> (
              {lang.toUpperCase()})
            </label>
            <input
              type="text"
              name="name"
              className="form-control outline-none hover:border-primary-500"
              placeholder="New Category"
              required={lang === "en"}
              value={categoryData.name || ""} // Ensure value is a string
              onChange={onInputChange}
            />
          </div>
        ))}
{
  console.log("categoery daa===", categoryData)
}
        
<div className="form-group">
              <label className="title-color">Select  Category</label>
              <select
                className="form-control outline-none hover:border-primary-500"
                name="shippingCategoryId"
                value={categoryData.shippingCategoryId}
                onChange={onInputChange}
                required
              >
                <option value="" disabled>
                  Select a  Category
                </option>
                {trackCategories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.description}
                  </option>
                ))}
              </select>
            </div>
        <div className="form-group">
          <label className="title-color" htmlFor="priority">
            Priority
          </label>
          <select
            className="form-control outline-none hover:border-primary-500"
            name="priority"
            required
            value={categoryData.priority}
            onChange={onInputChange}
          >
            <option disabled>Set Priority</option>
            {[...Array(11).keys()].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="title-color">Category Logo</label>
          <span className="text-info">
            <span className="text-danger">*</span> Ratio 1:1 (500 x 500 px)
          </span>
          <div className="custom-file text-left">
            <input
              type="file"
              name="logo"
              id="category-image"
              className="custom-file-input"
              accept="image/*"
              onChange={onFileChange}
            />
            <label className="custom-file-label" htmlFor="category-image">
              Choose File
            </label>
          </div>
        </div>
      </div>
      <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
        <div className="form-group flex">
          <div
            className="text-center flex justify-center"
            style={{ width: "50%" }}
          >
            <img
              className="upload-img-view"
              id="viewer"
              src={previewUrl || `${apiConfig.bucket}/image-place-holder.png`} // Use previewUrl
              alt="Category Logo"
              width="500"
              height="500"
            />
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-end">
        <button
          type="submit"
          className="btn bg-primary-500 text-white"
          style={{
            color: "white",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CategoryUpdate;
