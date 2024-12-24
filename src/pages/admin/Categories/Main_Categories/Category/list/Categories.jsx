import React, {
	useEffect,
	useState,
	useTransition,
	lazy,
	Suspense,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import apiConfig from "../../../../../../config/apiConfig"; // Import apiConfig for API URLs
const API_URL = `${apiConfig.admin}/categories`; // Use admin role

import { getAuthData } from "../../../../../../utils/authHelper"; // Correctly import getAuthData

const CategoryForm = lazy(() => import("../add/CategoryForm")); // Lazy load CategoryForm
const CategoryList = lazy(() => import("./CategoryList")); // Lazy load CategoryList
import {
	createCategory,
	deleteCategory,
	fetchCategories,
} from "../../../../../../redux/slices/admin/categorySlice";
import ConfirmationModal from "../../../../../../components/FormInput/ConfirmationModal";
import { getUploadUrl, uploadImageToS3 } from "../../../../../../utils/helpers";
import LoadingSpinner from "../../../../../../components/LoodingSpinner/LoadingSpinner";

const Categories = () => {
	const dispatch = useDispatch();
	const { categories, loading, error } = useSelector(
		(state) => state.productCategory
	);

	const [newCategory, setNewCategory] = useState({
		name: "",
		priority: "",
		logo: "",
		traxCategoryId: "",
		
	});

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLang, setSelectedLang] = useState("en");
	const [isPending, startTransition] = useTransition();
	const [selectedFile, setSelectedFile] = useState(null);

	// Start transition for managing updates

	useEffect(() => {
		const loadCategories = async () => {
			try {
				await dispatch(fetchCategories({}));
			} catch (error) {
				toast.error("Failed to load categories");
				console.error(error.message);
			}
		};

		loadCategories(); // Load categories on component mount
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			toast.error(error); // Display Redux error message
		}
	}, [error]);

	async function uploadImage(uploadConfig, file) {
		try {
			await uploadImageToS3(uploadConfig.url, file);
			return uploadConfig.key; // Return the key if successful
		} catch (error) {
			console.error(`Failed to upload ${file.name}:`, error);
			return null; // Return null on failure
		}
	}

	const handleInputChange = (e) => {
		setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
	};

	const handleFileChange = (logoString) => {
		setNewCategory({ ...newCategory, logo: logoString });
	};


	const handleFormSubmit = async (e) => {
		e.preventDefault();
	
		const uploadConfig = await getUploadUrl(selectedFile.type, "category");
		const imageKey = await uploadImage(uploadConfig, selectedFile);
	
		if (!imageKey) {
			toast.error("Image upload failed, please try again.");
			return; // Prevent further form submission if image upload fails
		}

		const formData = {
			name: newCategory.name,
			priority: newCategory.priority,
			logo: imageKey,
			// shippingCategoryId: newCategory.traxCategoryId,
            
		};
	      console.log("form data =====", formData)
		try {
			const { token } = getAuthData(); // Use getAuthData to retrieve token
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
	
			if (!response.ok) {
				const responseData = await response.json();
				throw new Error(responseData.message || "Failed to add category");
			}
	
			toast.success(`Category "${newCategory.name}" added successfully`);
			startTransition(() => {
				dispatch(fetchCategories({})); // Refresh categories after adding
				// setNewCategory({ name: "", priority: "",shippingCategoryId:"", logo: "" }); // Clear form
				setNewCategory({ name: "", priority: "", logo: "" }); // Clear form
			});
		} catch (error) {
			toast.error(error.message || "Failed to add category");
			console.error(error); // Log the full error for debugging
		}
	};
	
	const handleDeleteCategory = async (categoryId) => {
		const confirmed = await ConfirmationModal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this category!",
			icon: "warning",
			dangerMode: true,
		});

		if (confirmed) {
			try {
				const action = await dispatch(deleteCategory(categoryId));
				if (deleteCategory.fulfilled.match(action)) {
					toast.success("Category deleted successfully");
					startTransition(() => {
						dispatch(fetchCategories({})); // Refresh categories
					});
				} else {
					toast.error(action.payload || "Failed to delete category");
				}
			} catch (error) {
				toast.error(error.message || "Failed to delete category");
				console.error(error.message);
			}
		}
	};

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredCategories = categories.filter(
		(category) =>
			category.name &&
			category.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="px-3 md:px-5 md:mx-5 md:py-8 ">
			<ToastContainer />
			<h2 className="h1 mb-4 d-flex gap-3">
				<img
					src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
					alt=""
				/>
				Category Setup
			</h2>
			{error && <div className="alert alert-danger">{error}</div>}

			<Suspense fallback={<div><LoadingSpinner /></div>}>
				<CategoryForm
					selectedLang={selectedLang}
					newCategory={newCategory}
					onInputChange={handleInputChange}
					onFileChange={handleFileChange}
					onSubmit={handleFormSubmit}
					setSelectedFile={setSelectedFile}
				/>
			</Suspense>

			<Suspense fallback={<div>Loading categories...</div>}>
				<CategoryList
					categories={filteredCategories.length > 0 ? filteredCategories : []} // Ensure categories array is valid
					handleDelete={handleDeleteCategory}
					handleSearch={handleSearch}
					searchQuery={searchQuery}
				/>
			</Suspense>
		</div>
	);
};

export default Categories;
