import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import "../addProduct/form.css";
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
import uploadProductImagesToS3 from "./addProductFormComponent/uploadImages";

const API_URL = `${apiConfig.seller}/products`;

const InhouseProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    categories,
    subCategories,
    subSubCategories,
    brands,
    colors,
    attributes,
  } = useSelector((state) => state.category);

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
  };

  const [formData, setFormData] = useState(initialFormState);
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [initialThumbnail, setInitialThumbnail] = useState(null);
  const [initialImages, setInitialImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchAttributes());
  }, [dispatch]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { token } = getAuthData();
        const response = await fetch(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch product data");

        const product = await response.json();

        setFormData({
          ...product.doc,
          category: product.doc.category._id,
          subCategory: product.doc.subCategory,
          subSubCategory: product.doc.subSubCategory,
          brand: product.doc.brand._id,
          tags: product.doc.tags || [],
        });

        setThumbnail(product.doc.thumbnail);
        setImages(product.doc.images);
        setInitialThumbnail(product.doc.thumbnail);
        setInitialImages(product.doc.images);

        if (product.doc.category._id) {
          dispatch(fetchSubCategories(product.doc.category._id));
        }
        if (product.doc.subCategory) {
          dispatch(fetchSubSubCategories(product.doc.subCategory));
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id, dispatch]);

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

  const hasChanges = () => {
    return (
      JSON.stringify(formData) !== JSON.stringify(initialFormState) ||
      thumbnail !== initialThumbnail ||
      JSON.stringify(images) !== JSON.stringify(initialImages)
    );
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : ["price", "discountAmount", "taxAmount", "discount"].includes(name)
          ? parseInt(value, 10) || 0
          : value,
      // Reset dependent fields if parent category changes
      ...(name === "category" && { subCategory: null, subSubCategory: null }),
      ...(name === "subCategory" && { subSubCategory: null }),
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  //////////// ok for both but not new images

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!hasChanges()) {
  //         toast.info("No changes detected.");
  //         navigate(-1);
  //         return;
  //     }

  //     // Ensure initialThumbnail and initialImages are correctly initialized
  //     let thumbnailKey = initialThumbnail;  // Assuming initialThumbnail is coming from state or props
  //     let imageKeys = initialImages;  // Assuming initialImages is coming from state or props
  //     console.log("file of thumbnail", thumbnail);
  //     console.log("file of images", images);

  //     // Check if thumbnail or images have changed
  //     if (thumbnail?.file && thumbnail.file !== initialThumbnail?.file) {
  //         // Upload new thumbnail if it has changed
  //         const uploadResult = await uploadProductImagesToS3(thumbnail, images, initialThumbnail);
  //         if (!uploadResult) {
  //             console.error("Thumbnail and image upload failed.");
  //             return;
  //         }
  //         thumbnailKey = uploadResult.thumbnailKey;
  //     }

  //     if (images.length > 0 && images.some((img, i) => img.file && img.file !== initialImages[i]?.file)) {
  //         // Upload new images if they have changed
  //         const uploadResult = await uploadProductImagesToS3(null, images, initialThumbnail);
  //         if (!uploadResult) {
  //             console.error("Image upload failed.");
  //             return;
  //         }
  //         imageKeys = uploadResult.imageKeys;
  //     }

  //     try {
  //         const { token, user } = getAuthData();
  //         const userId = user?._id;
  //         if (!userId) throw new Error("User not authenticated.");

  //         const productData = {
  //             ...formData,
  //             userId,
  //             thumbnail: thumbnailKey,
  //             images: imageKeys,
  //             category: formData.category,
  //             subCategory: formData.subCategory,
  //             subSubCategory: formData.subSubCategory,
  //         };

  //         const response = await fetch(`${API_URL}/${id}`, {
  //             method: "PUT",
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: `Bearer ${token}`,
  //             },
  //             body: JSON.stringify(productData),
  //         });

  //         if (response.ok) {
  //             Swal.fire("Success", "Product updated successfully", "success").then(() => navigate(-1));
  //         } else {
  //             const errorData = await response.json();
  //             console.error("Failed to update product:", errorData.message || "Unknown error");
  //             Swal.fire("Error", errorData.message || "Failed to update product", "error");
  //         }
  //     } catch (error) {
  //         console.error("Error updating product:", error);
  //     }
  // };

  // /////////////// for both images
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!hasChanges()) {
  //       toast.info("No changes detected.");
  //       navigate(-1);
  //       return;
  //   }

  //   // Ensure initialThumbnail and initialImages are correctly initialized
  //   let thumbnailKey = initialThumbnail;  // Assuming initialThumbnail is coming from state or props
  //   let imageKeys = [...initialImages];  // Assuming initialImages is coming from state or props
  //   console.log("file of thumbnail", thumbnail);
  //   console.log("file of images", images);

  //   // Check if thumbnail or images have changed
  //   if (thumbnail?.file && thumbnail.file !== initialThumbnail?.file) {
  //       // Upload new thumbnail if it has changed
  //       const uploadResult = await uploadProductImagesToS3(thumbnail, images, initialThumbnail, initialImages);
  //       if (!uploadResult) {
  //           console.error("Thumbnail and image upload failed.");
  //           return;
  //       }
  //       thumbnailKey = uploadResult.thumbnailKey;
  //   }

  //   if (images.length > 0 && images.some((img, i) => img.file && img.file !== initialImages[i]?.file)) {
  //       // Upload new images if they have changed
  //       const uploadResult = await uploadProductImagesToS3(null, images, initialThumbnail, initialImages);
  //       if (!uploadResult) {
  //           console.error("Image upload failed.");
  //           return;
  //       }
  //       imageKeys = uploadResult.imageKeys;
  //   }

  //   try {
  //       const { token, user } = getAuthData();
  //       const userId = user?._id;
  //       if (!userId) throw new Error("User not authenticated.");

  //       const productData = {
  //           ...formData,
  //           userId,
  //           thumbnail: thumbnailKey,
  //           images: imageKeys,
  //           category: formData.category,
  //           subCategory: formData.subCategory,
  //           subSubCategory: formData.subSubCategory,
  //       };

  //       const response = await fetch(`${API_URL}/${id}`, {
  //           method: "PUT",
  //           headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify(productData),
  //       });

  //       if (response.ok) {
  //           Swal.fire("Success", "Product updated successfully", "success").then(() => navigate(-1));
  //       } else {
  //           const errorData = await response.json();
  //           console.error("Failed to update product:", errorData.message || "Unknown error");
  //           Swal.fire("Error", errorData.message || "Failed to update product", "error");
  //       }
  //   } catch (error) {
  //       console.error("Error updating product:", error);
  //   }
  // };

  /////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      toast.info("No changes detected.");
      navigate(-1);
      return;
    }

    // Ensure initialThumbnail and initialImages are correctly initialized
    let thumbnailKey = initialThumbnail; // Assuming initialThumbnail is coming from state or props
    let imageKeys = [...initialImages]; // Assuming initialImages is coming from state or props
    console.log("file of thumbnail", thumbnail);
    console.log("file of images", images);

    // Check if thumbnail or images have changed
    if (thumbnail?.file && thumbnail.file !== initialThumbnail) {
      // Upload new thumbnail if it has changed
      const uploadResult = await uploadProductImagesToS3(
        thumbnail,
        images,
        initialThumbnail,
        initialImages
      );
      if (!uploadResult) {
        console.error("Thumbnail and image upload failed.");
        return;
      }
      thumbnailKey = uploadResult.thumbnailKey;
    }

    if (images.length > 0) {
      // Filter out unchanged images and only upload the changed ones
      const changedImages = images.filter(
        (img, i) => img.file && img.file !== initialImages[i]?.file
      );
      if (changedImages.length > 0) {
        const uploadResult = await uploadProductImagesToS3(
          null,
          changedImages,
          initialThumbnail,
          initialImages
        );
        if (!uploadResult) {
          console.error("Image upload failed.");
          return;
        }
        imageKeys = uploadResult.imageKeys;
      }
    }

    try {
      const { token, user } = getAuthData();
      const userId = user?._id;
      if (!userId) throw new Error("User not authenticated.");

      const productData = {
        ...formData,
        userId,
        thumbnail: thumbnailKey,
        images: imageKeys,
        category: formData.category,
        subCategory: formData.subCategory,
        subSubCategory: formData.subSubCategory,
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        Swal.fire("Success", "Product updated successfully", "success").then(
          () => navigate(-1)
        );
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to update product:",
          errorData.message || "Unknown error"
        );
        Swal.fire(
          "Error",
          errorData.message || "Failed to update product",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Update Product p-6">
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
        setImages={setImages}
      />
      <SeoSection formData={formData} handleChange={handleChange} />

      <div className="flex justify-end m-5">
        <button
          type="submit"
          className="btn mt-3 flex justify-end btn-submit bg-primary-500 hover:bg-primary-dark-500 outline-none"
          style={{ color: "white" }}
        >
          Update Product
        </button>
      </div>
    </form>
  );
};

export default InhouseProductUpdate;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCategories,
//   fetchBrands,
//   fetchColors,
//   fetchAttributes,
//   fetchSubCategories,
//   fetchSubSubCategories,
// } from "../../../../../redux/slices/admin/categorybrandSlice";
// import "react-quill/dist/quill.snow.css";
// import "../addProduct/form.css";
// import ProductImageWrapper from "./addProductFormComponent/productImageUpload";
// import ProductForm from "./addProductFormComponent/productForm";
// import ProductGeneral from "./addProductFormComponent/productGeneral";
// import ProductAdditional from "./addProductFormComponent/productAdditional";
// import ProductVideo from "./addProductFormComponent/productVideo";
// import SeoSection from "./addProductFormComponent/SeoSection";
// import Swal from "sweetalert2";
// import apiConfig from "../../../../../config/apiConfig";
// import { getAuthData } from "../../../../../utils/authHelper";
// import { toast } from "react-toastify";
// import uploadProductImagesToS3 from "../addProduct/uploadImages";

// const API_URL = `${apiConfig.seller}/products`;

// const InhouseProductUpdate = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { categories, subCategories, subSubCategories, brands, colors, attributes } = useSelector((state) => state.category);

//   const initialFormState = {
//     name: "",
//     description: "",
//     brand: "",
//     productType: "",
//     digitalProductType: "",
//     sku: "",
//     unit: "",
//     tags: [""],
//     price: "",
//     discount: "",
//     discountType: "percent",
//     discountAmount: "",
//     taxAmount: "",
//     taxIncluded: false,
//     minimumOrderQty: "3",
//     shippingCost: "",
//     stock: "",
//     isFeatured: false,
//     videoLink: "",
//     metaTitle: "title",
//     metaDescription: "metadescription",
//     userType: "in-house",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [images, setImages] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedAttribute, setSelectedAttribute] = useState("");
//   const [productAttributes, setProductAttributes] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [initialThumbnail, setInitialThumbnail] = useState(null);
//   const [initialImages, setInitialImages] = useState([]);

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchBrands());
//     dispatch(fetchColors());
//     dispatch(fetchAttributes());
//   }, [dispatch]);

//   useEffect(() => {
//     if (formData.category) {
//       dispatch(fetchSubCategories(formData.category));
//     }
//   }, [dispatch, formData.category]);

//   useEffect(() => {
//     if (formData.subCategory) {
//       dispatch(fetchSubSubCategories(formData.subCategory));
//     }
//   }, [dispatch, formData.subCategory]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { token } = getAuthData();
//         const response = await fetch(`${API_URL}/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!response.ok) throw new Error("Failed to fetch product data");

//         const product = await response.json();

//         setFormData({
//           ...product.doc,
//           category: product.doc.category._id,
//           subCategory: product.doc.subCategory,
//           subSubCategory: product.doc.subSubCategory,
//           brand: product.doc.brand._id,
//           tags: product.doc.tags || [],
//         });

//         setThumbnail(product.doc.thumbnail);
//         setImages(product.doc.images);
//         setInitialThumbnail(product.doc.thumbnail);
//         setInitialImages(product.doc.images);

//         if (product.doc.category._id) {
//           dispatch(fetchSubCategories(product.doc.category._id));
//         }
//         if (product.doc.subCategory) {
//           dispatch(fetchSubSubCategories(product.doc.subCategory));
//         }
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       }
//     };
//     fetchProduct();
//   }, [id, dispatch]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "tags") {
//       setFormData((prev) => ({
//         ...prev,
//         tags: value.split(",").map((tag) => tag.trim()),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleDescriptionChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       description: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Initializing keys with existing data (in case no new files are uploaded)
//     let thumbnailKey = initialThumbnail;
//     let imageKeys = initialImages;

//     // Check if a new thumbnail file is provided
//     if (thumbnail && thumbnail.file && thumbnail.file !== initialThumbnail) {
//       const uploadResult = await uploadProductImagesToS3(thumbnail.file, images);
//       if (!uploadResult) {
//         console.error("Thumbnail upload failed.");
//         return;
//       }
//       thumbnailKey = uploadResult.thumbnailKey; // Update only if new file is uploaded
//     }

//     // Check for updated additional images, avoiding re-upload if unchanged
//     if (images.length > 0 && images.some((img, i) => img.file && img.file !== initialImages[i])) {
//       const uploadResult = await uploadProductImagesToS3(null, images); // null for thumbnail if not uploading
//       if (!uploadResult) {
//         console.error("Image upload failed.");
//         return;
//       }
//       imageKeys = uploadResult.imageKeys; // Update only if new files are uploaded
//     }

//     // Proceed with submitting form data using the new or existing keys
//     try {
//       const { token, user } = getAuthData();
//       const userId = user?._id;
//       if (!userId) throw new Error("User not authenticated.");

//       const productData = {
//         ...formData,
//         userId,
//         thumbnail: thumbnailKey,
//         images: imageKeys,
//         colors: selectedColors.map((color) => color._id),
//         attributes: productAttributes.map((attr) => attr._id),
//         category: formData.category,
//         subCategory: formData.subCategory,
//         subSubCategory: formData.subSubCategory,
//       };

//       const response = await fetch(`${API_URL}/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(productData),
//       });

//       if (response.ok) {
//         Swal.fire("Success", "Product updated successfully", "success");
//       } else {
//         throw new Error("Failed to update product");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="Update Product p-6">
//       <ProductForm
//         formData={formData}
//         handleChange={handleChange}
//         handleDescriptionChange={handleDescriptionChange}
//         errorMessage={errorMessage}
//       />
//       <ProductGeneral
//         formData={formData}
//         handleChange={handleChange}
//         setFormData={setFormData}
//         categories={categories}
//         subCategories={subCategories}
//         subSubCategories={subSubCategories}
//         brands={brands}
//       />
//       <ProductAdditional formData={formData} handleChange={handleChange} />
//       <ProductVideo formData={formData} handleChange={handleChange} />
//       <ProductImageWrapper
//         thumbnail={thumbnail}
//         setThumbnail={setThumbnail}
//         images={images}
//         setImages={setImages}
//       />
//       <SeoSection formData={formData} handleChange={handleChange} />

//       <div className="flex justify-end m-5">
//         <button
//           type="submit"
//           className="btn mt-3 flex justify-end btn-submit bg-primary outline-none"
//           style={{ color: "white", background: "green" }}
//         >
//           Update Product
//         </button>
//       </div>
//     </form>
//   );
// };

// export default InhouseProductUpdate;
