import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchBrands,
  fetchColors,
  fetchAttributes,
  fetchSubCategories,
  fetchSubSubCategories,
} from "../../../../../redux/slices/admin/categorybrandSlice";

import "react-quill/dist/quill.snow.css";
import "./form.css";
// import ProductAttributes from "./addProductFormComponent/productAttributes";
import ProductImageWrapper from "./addProductFormComponent/productImageUpload";
import ProductForm from "./addProductFormComponent/productForm";
import ProductGeneral from "./addProductFormComponent/productGeneral";
import ProductAdditional from "./addProductFormComponent/productAdditional";
import ProductVideo from "./addProductFormComponent/productVideo";
import SeoSection from "./addProductFormComponent/SeoSection";
import Swal from "sweetalert2";
import apiConfig from "../../../../../config/apiConfig";
import { getAuthData } from "../../../../../utils/authHelper";

import { toast } from "react-toastify";
import uploadProductImagesToS3 from "./uploadImages";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";
import Uploading from "../../../../../components/LoodingSpinner/Uploading";

const API_URL = `${apiConfig.seller}/products`;

const AddNewProduct = () => {
  const dispatch = useDispatch();

  const {
    categories,
    subCategories,
    subSubCategories,
    brands,
    colors,
    attributes,
  } = useSelector((state) => state.category);
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    description: "",
    brand: "",
    productType: "",
    digitalProductType: "",
    sku: "",
    unit: "",
    tags: [""],
    price: "",
    discount: "",
    discountType: "percent",
    discountAmount: "",
    taxAmount: "",
    taxIncluded: false,
    minimumOrderQty: "3",
    shippingCost: "",
    stock: "",
    isFeatured: false,
    videoLink: "",
    metaTitle: "title",
    metaDescription: "metadescription",
    userType: "in-house",
    status: "approved",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [productAttributes, setProductAttributes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchAttributes());
  }, [dispatch]);

  useEffect(() => {
    if (formData.category) {
      dispatch(fetchSubCategories(formData.category));
    }
  }, [dispatch, formData.category]);

  useEffect(() => {
    if (formData.subCategory) {
      dispatch(fetchSubSubCategories(formData.subCategory));
    }
  }, [dispatch, formData.subCategory]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  // const handleChange = (e) => {
  // 	const { name, value, type, checked } = e.target;

  // 	setFormData((prev) => ({
  // 	  ...prev,
  // 	  [name]: type === "checkbox"
  // 		? checked
  // 		: (["price", "discountAmount", "taxAmount", "discount"].includes(name)
  // 			? parseInt(value, 10) || 0
  // 			: value),
  // 	  // Reset dependent fields if parent category changes
  // 	  ...(name === "category" && { subCategory: null, subSubCategory: null }),
  // 	  ...(name === "subCategory" && { subSubCategory: null }),
  // 	}));
  //   };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "discountType" && !value
          ? "percent" // Default to 'percent'
          : ["price", "discountAmount", "taxAmount", "discount"].includes(name)
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true at the start of submission

    const uploadResult = await uploadProductImagesToS3(thumbnail, images);

    // Check if the uploadResult is null before destructuring
    if (!uploadResult) {
      setLoading(false);

      return; // Exit the function if upload failed
    }

    const { thumbnailKey, imageKeys } = uploadResult;

    try {
      const { token, user } = getAuthData();
      const userId = user?._id;

      if (!userId) {
        throw new Error("admin does not exist or is not authenticated.");
      }

      const productData = {
        ...formData,
        userId,
        thumbnail: thumbnailKey,
        images: imageKeys,
        // colors: selectedColors.map((color) => color._id),
        // attributes: productAttributes.map((attr) => attr._id),
        category: formData.category,
        subCategory: formData.subCategory,
        subSubCategory: formData.subSubCategory,
        ...(formData.productType !== "physical" && {
          digitalProductType: formData.digitalProductType,
        }),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      Swal.fire({
        icon: "success",
        title: "Product created successfully!",
        showConfirmButton: false,

        timer: 1000,
      }).then(() => {
        // This will execute after Swal notification is completed
        navigate("/inhouseproductlist");
      });
      // Reset form
      setThumbnail(null);
      // setImages([]);
      setSelectedColors([]);
      setProductAttributes([]);
      setFormData({ ...initialFormState });
      navigate("/inhouseproductlist");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to create product",
        text: error.message || "Please try again.",
        showConfirmButton: true,
      });
      setErrorMessage("Failed to create product. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };
  return (
    <form onSubmit={handleSubmit} className="add-product-form p-6">
      {loading && <Uploading />}

      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleDescriptionChange={handleDescriptionChange}
        errorMessage={errorMessage}
      />
      <ProductGeneral
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
        categories={categories}
        subCategories={subCategories}
        subSubCategories={subSubCategories}
        brands={brands}
      />
      <ProductAdditional formData={formData} handleChange={handleChange} />
      <ProductVideo formData={formData} handleChange={handleChange} />

      <ProductImageWrapper
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        images={images}
        setImages={setImages} // Pass the setter function to update images
      />
      <SeoSection formData={formData} handleChange={handleChange} />

      <div className="flex justify-end m-5">
        <button
          type="submit"
          className="btn mt-3 flex justify-end text-white btn-submit bg-primary--500 hover:bg-primary-dark-500 outline-none"
          disabled={loading} // Disable button while loading
          style={{ color: "white" }}
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </div>
    </form>
  );
};

export default AddNewProduct;
