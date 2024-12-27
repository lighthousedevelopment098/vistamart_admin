// import { useState, useEffect } from "react";
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
// import "./form.css";
// // import ProductAttributes from "./addProductFormComponent/productAttributes";
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
// import uploadProductImagesToS3 from "./uploadImages";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";
// import Uploading from "../../../../../components/LoodingSpinner/Uploading";

// const API_URL = `${apiConfig.seller}/products`;

// const AddNewProduct = () => {
//   const dispatch = useDispatch();

//   const {
//     categories,
//     subCategories,
//     subSubCategories,
//     brands,
//     colors,
//     attributes,
//   } = useSelector((state) => state.category);
//   const navigate = useNavigate();

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
//     weight: "0",
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
//     status: "approved",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [images, setImages] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedAttribute, setSelectedAttribute] = useState("");
//   const [productAttributes, setProductAttributes] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false); // Add loading state

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

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [name]: type === "checkbox" ? checked : value,
//   //   }));
//   // };

//   // const handleChange = (e) => {
//   // 	const { name, value, type, checked } = e.target;

//   // 	setFormData((prev) => ({
//   // 	  ...prev,
//   // 	  [name]: type === "checkbox"
//   // 		? checked
//   // 		: (["price", "discountAmount", "taxAmount", "discount"].includes(name)
//   // 			? parseInt(value, 10) || 0
//   // 			: value),
//   // 	  // Reset dependent fields if parent category changes
//   // 	  ...(name === "category" && { subCategory: null, subSubCategory: null }),
//   // 	  ...(name === "subCategory" && { subSubCategory: null }),
//   // 	}));
//   //   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "discountType" && !value
//           ? "percent" // Default to 'percent'
//           : ["price","weight", "discountAmount", "taxAmount", "discount"].includes(name)
//           ? parseInt(value, 10) || 0
//           : value,
//     }));
//   };

//   const handleDescriptionChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       description: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true at the start of submission

//     const uploadResult = await uploadProductImagesToS3(thumbnail, images);

//     // Check if the uploadResult is null before destructuring
//     if (!uploadResult) {
//       setLoading(false);

//       return; // Exit the function if upload failed
//     }

//     const { thumbnailKey, imageKeys } = uploadResult;

//     try {
//       const { token, user } = getAuthData();
//       const userId = user?._id;

//       if (!userId) {
//         throw new Error("admin does not exist or is not authenticated.");
//       }

//       const productData = {
//         ...formData,
//         userId,
//         thumbnail: thumbnailKey,
//         images: imageKeys,
//         // colors: selectedColors.map((color) => color._id),
//         // attributes: productAttributes.map((attr) => attr._id),
//         category: formData.category,
//         subCategory: formData.subCategory,
//         subSubCategory: formData.subSubCategory,
//         ...(formData.productType !== "physical" && {
//           digitalProductType: formData.digitalProductType,
//         }),
//       };

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(productData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong!");
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Product created successfully!",
//         showConfirmButton: false,

//         timer: 1000,
//       }).then(() => {
//         // This will execute after Swal notification is completed
//         navigate("/inhouseproductlist");
//       });
//       // Reset form
//       setThumbnail(null);
//       // setImages([]);
//       setSelectedColors([]);
//       setProductAttributes([]);
//       setFormData({ ...initialFormState });
//       navigate("/inhouseproductlist");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to create product",
//         text: error.message || "Please try again.",
//         showConfirmButton: true,
//       });
//       setErrorMessage("Failed to create product. Please try again.");
//     } finally {
//       setLoading(false); // Set loading to false after submission
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="add-product-form p-6">
//       {loading && <Uploading />}

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
//         setImages={setImages} // Pass the setter function to update images
//       />
//       <SeoSection formData={formData} handleChange={handleChange} />

//       <div className="flex justify-end m-5">
//         <button
//           type="submit"
//           className="btn mt-3 flex justify-end text-white btn-submit bg-primary--500 hover:bg-primary-dark-500 outline-none"
//           disabled={loading} // Disable button while loading
//           style={{ color: "white" }}
//         >
//           {loading ? "Submitting..." : "Submit Product"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddNewProduct;




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
		weight: "",
		description: "",
		brand: "",
		productType: "",
		digitalProductType: "",
		sku: "",
		unit: "",
		tags: [""],
		price: "",
		discount: "0",
		discountType: "percent",
		discountAmount: "0",
		taxAmount: "",
		taxIncluded: false,
		minimumOrderQty: "1",
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
	const [selectedColors, setSelectedColors] = useState([]);
	const [selectedAttribute, setSelectedAttribute] = useState("");
	const [productAttributes, setProductAttributes] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
    const [pickupId, setPickupId] = useState(null);

	const { token, user } = getAuthData();
	const userId = user?._id;

    // Fetch pickupId on component mount
    useEffect(() => {
        const fetchPickupId = async () => {
            try {
                const response = await axios.get(
                    `${apiConfig.seller}/shippingInfo?vendorId=${user?._id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const pickingAddressId = response.data.doc?.[0]?.pickingAddressId || null;
                setPickupId(pickingAddressId);
                if (!pickingAddressId) {
                    // Navigate to pickup page if no pickup ID is found
                    Swal.fire({
                        title: "Pickup Point Required",
                        text: "Before adding a product, you must set a pickup location where the delivery boy can collect your product.",
                        icon: "info",
                        confirmButtonText: "Add Pickup Point",
                        allowOutsideClick: false,
                    }).then(() => {
                        navigate("/addpickupaddress");
                    });
                }
            } catch (err) {
                console.error("Failed to fetch Pickup ID:", err.response || err.message);
            }
        };

        fetchPickupId();
    }, [token, user?._id, navigate]);
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
	  

	  const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" 
				? checked 
				: (["price", "discountAmount", "taxAmount", "discount"].includes(name) 
					? parseInt(value, 10) || 0 
					: value),
		}));
	};
	
	const handleDescriptionChange = (value) => {
		setFormData((prev) => ({
			...prev,
			description: value,
		}));
	};

	const resetForm = () => {
		setFormData({
		  name: "",
		  weight: "",
		  category: "",
		  subCategory: "",
		  subSubCategory: "",
		  brand: "",
		  productType: "",
		  digitalProductType: "",
		  sku: "",
		  unit: "",
		  tags: [],
		  // Add other fields and reset them accordingly
		});
		// setTags([]); // Reset tags array as well
	  };
	  
	  const handleSubmit = async (e) => {
		e.preventDefault();
	
		const uploadResult = await uploadProductImagesToS3(thumbnail, images);
	
		if (!uploadResult) {
			console.error("Image upload failed.");
			return;
		}
	
		const { thumbnailKey, imageKeys } = uploadResult;
	
		try {
			const { token, user } = getAuthData();
			const userId = user?._id;
      console.log(
       "user idd=====", userId
      )
	
			if (!userId) {
				throw new Error("Admin does not exist or is not authenticated.");
			}
	
			// Merge form data with defaults
			const productData = {
				...formData,
				price: formData.price + formData.shippingCost,
				discountType: formData.discountType || "percent", // Fallback to 'percent'
				userId,
				thumbnail: thumbnailKey,
				images: imageKeys,
				colors: selectedColors.map((color) => color._id),
				attributes: productAttributes.map((attr) => attr._id),
				category: formData.category,
				subCategory: formData.subCategory,
				subSubCategory: formData.subSubCategory,
				...(formData.productType !== "physical" && { digitalProductType: formData.digitalProductType }),
			};
	
			console.log("Submitting Product Data:", productData);
	
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
				timer: 2000,
			});
			setTimeout(() => {
				navigate("/newproductrequest"); // Navigate to /withdraw after 2 seconds
			  }, 2000);
			resetForm();
		} catch (error) {
			console.error("Product creation failed:", error);
			Swal.fire({
				icon: "error",
				title: "Failed to create product",
				text: error.message || "Please try again.",
				showConfirmButton: true,
			});
			setErrorMessage("Failed to create product. Please try again.");
		}
	};
	
	return (
		<form onSubmit={handleSubmit} className="add-product-form " style={{padding:"1rem 0rem 1rem 3rem "}}>
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

					className="btn mt-3 flex justify-end btn-submit bg-primary-500 hover:bg-primary-dark-500 outline-none"
					style={{color:"white"}}
				>
					Submit Product
				</button>
			</div>
		</form>
	);
};

export default AddNewProduct;
