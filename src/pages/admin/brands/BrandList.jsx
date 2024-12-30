import React, { useEffect, useCallback, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchBrands,
	updateBrandStatus,
	deleteBrand,
} from "../../../redux/slices/admin/brandSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
// import TableList from "../../components/FormInput/TableList";
import ActionButton from "../../../components/ActionButton/Action";
import Switcher from "../../../components/FormInput/Switcher";
import ConfirmationModal from "../../../components/FormInput/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiConfig from "../../../config/apiConfig";
import LoadingSpinner from "../../../components/LoodingSpinner/LoadingSpinner";

// Lazy load TableList for performance
const LazyTableList = lazy(() =>
	import("../../../components/FormInput/TableList")
);



const BrandList = () => {
	const dispatch = useDispatch();
	const { brands } = useSelector((state) => state.brand);

	useEffect(() => {
		dispatch(fetchBrands());
	}, [dispatch]);

	const handleUpdateStatus = (id, currentStatus) => {
		const newStatus = currentStatus === "active" ? "inactive" : "active";
		ConfirmationModal({
			title: "Are you sure?",
			text: `Do you want to change the status to ${newStatus}?`,
		}).then((willUpdate) => {
			if (willUpdate) {
				dispatch(updateBrandStatus({ brandId: id, status: newStatus }))
					.then(() => toast.success(`Brand status updated to ${newStatus}!`))
					.catch(() => toast.error("Failed to update brand status."));
			} else {
				toast.info("Status update canceled.");
			}
		});
	};

	const handleDeleteBrand = (id) => {
		ConfirmationModal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this brand!",
		}).then((willDelete) => {
			if (willDelete) {
				dispatch(deleteBrand(id))
					.then(() => toast.success("Brand deleted successfully!"))
					.catch(() => toast.error("Failed to delete the brand."));
			} else {
				toast.info("Brand deletion canceled.");
			}
		});
	};

	const columns = [
		{
			key: "logo",
			label: "Brand Logo",
			className: "flex  justify-center",
			render: (brand) => (
				<img
					src={`${apiConfig.bucket}/${brand.logo}`}
					alt={brand.name}
					className="avatar"
				/>
			),
		},
		{ key: "name", label: "Brand Name" },
		{ key: "totalProducts", label: "Total Product" },
		{ key: "totalOrders", label: "Total Order" },
		{
			key: "status",
			label: "Status",
			render: (brand) => (
				<Switcher
					checked={brand?.status === "active"}
					onChange={() => handleUpdateStatus(brand._id, brand.status)}
				/>
			),
		},
		{
			key: "action",
			label: "Action",
			render: (brand) => (
				<div className="flex justify-center gap-2">
					<ActionButton to={`/brandupdate/${brand._id}`} icon={FaEdit} />
					<ActionButton
						onClick={() => handleDeleteBrand(brand._id)}
						icon={FaTrash}
					/>
				</div>
			),
		},
	];

	return (
		<div>
			<React.Suspense fallback={<div><LoadingSpinner /></div>}>
				<LazyTableList
					title="Brand List"
					tableTitle="Brand List"
					listData={brands}
					imageSrc="/top-selling-product-icon.png"
					fetchListData={() => dispatch(fetchBrands())}
					columns={columns}
					exportFileName="brandList"
					searchPlaceholder="Search by Brand Name"
				/>
			</React.Suspense>
			<ToastContainer />
		</div>
	);
};

// export default BrandList;

export default React.memo(BrandList);
