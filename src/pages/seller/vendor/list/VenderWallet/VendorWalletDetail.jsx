import React, { useState, useEffect } from "react";
import { FaWallet, FaArrowRight } from "react-icons/fa";
import apiConfig from "../../../../../config/apiConfig";
import { getAuthData } from "../../../../../utils/authHelper";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";
import { getUploadUrl, uploadImageToS3 } from "../../../../../utils/helpers";

const VendorWalletDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { token, user } = getAuthData();

	const [withdrawal, setWithdrawal] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [note, setNote] = useState("");
	const [status, setStatus] = useState("Pending");
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageKey, setImageKey] = useState("");

	const fetchWithdrawal = async () => {
		try {
			const response = await fetch(`${apiConfig.transaction}/withdraws/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();
			if (data.status === "success") {
				setWithdrawal(data.doc);
				setStatus(data.doc.status);
			}
		} catch (error) {
			console.error("Error fetching withdrawal data:", error);
		}
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const uploadImage = async (file) => {
		try {
			const uploadConfig = await getUploadUrl(file.type, "transaction");
			await uploadImageToS3(uploadConfig.url, file);
			setImageKey(uploadConfig.key);
			return uploadConfig.key;
		} catch (error) {
			console.error("Image upload failed:", error);
			return null;
		}
	};

	const handleSubmit = async () => {
		let uploadedImageKey = imageKey;

		// Upload image if a new file is selected
		if (selectedFile) {
			uploadedImageKey = await uploadImage(selectedFile);
			if (!uploadedImageKey) {
				Swal.fire({
					title: "Error!",
					text: "Failed to upload image. Please try again.",
					icon: "error",
					confirmButtonText: "OK",
				});
				return;
			}
		}

		try {
      console.log("uplaoded image key ", uploadedImageKey)
			const response = await fetch(
				`${apiConfig.transaction}/withdraws/request-status/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						status,
						note,
						transactionReceiptImage: uploadedImageKey,
						processedBy: user?._id,
						processedAt: new Date().toISOString(),
					}),
				}
			);
			const result = await response.json();
     console.log("result of withdraw", result)
			if (result.status === "success") {
				setWithdrawal(result.doc);
				setShowModal(false);

				Swal.fire({
					title: "Success!",
					text: `Withdrawal request has been ${status.toLowerCase()}.`,
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					navigate("/addvenderwallet");
				});
			}
		} catch (error) {
			console.error("Error updating withdrawal status:", error);
			Swal.fire({
				title: "Error!",
				text: "There was an issue updating the withdrawal status.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	useEffect(() => {
		fetchWithdrawal();
	}, [user?._id]);

	const handleModalClose = () => setShowModal(false);
	const handleModalShow = () => setShowModal(true);

	if (!withdrawal) {
		return (
			<div>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<div className="mb-6">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					<FaWallet size={20} /> Withdraw
				</h2>
			</div>
			<div className="grid grid-cols-1 gap-6">
				<div className="bg-white shadow rounded p-4">
					<div className="border-b pb-4 mb-4 flex items-center justify-between">
						<h3 className="text-lg font-semibold">Vendor Withdraw Information</h3>
						<FaWallet className="text-xl" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<div className="flex items-center">
								<h5 className="font-medium">Amount:</h5>
								<span className="ml-2">PKR {withdrawal.amount}.00</span>
							</div>
							<div className="flex items-center">
								<h5 className="font-medium">Request time:</h5>
								<span className="ml-2">
									{new Date(withdrawal.createdAt).toLocaleString()}
								</span>
							</div>
						</div>
						<div>
							<div className="flex items-center">
								<h5 className="font-medium">Note:</h5>
								<span className="ml-2">{withdrawal.note || "N/A"}</span>
							</div>
							<div className="flex items-center">
								<h5 className="font-medium">Account No:</h5>
								<span className="ml-2">{withdrawal.accountNumber || "N/A"}</span>
							</div>
							<div className="flex items-center">
								<h5 className="font-medium">Status:</h5>
								<span className="ml-2">{withdrawal.status || "Pending"}</span>
							</div>
						</div>
						<div className="text-right">
							<button
								type="button"
								className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500 flex gap-2 items-center"
								onClick={handleModalShow}
							>
								Proceed <FaArrowRight />
							</button>
						</div>
					</div>
				</div>

				{showModal && (
					<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-white rounded shadow-lg w-1/3 p-6">
							<h3 className="text-lg font-bold mb-4">Withdraw Request Process</h3>
							<div className="mb-4">
								<label htmlFor="approval" className="block font-medium mb-2">
									Request:
								</label>
								<select
									className="w-full border rounded p-2"
									id="approval"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="Pending">Pending</option>
									{withdrawal.status === "Pending" && (
										<>
											<option value="Approved">Approve</option>
											<option value="Rejected">Deny</option>
										</>
									)}
								</select>
							</div>
							<div className="mb-4">
								<label htmlFor="note" className="block font-medium mb-2">
									Note about transaction:
								</label>
								<textarea
									className="w-full border rounded p-2"
									id="note"
									rows="3"
									value={note}
									onChange={(e) => setNote(e.target.value)}
								></textarea>
							</div>
							<div className="mb-4">
								<label className="block font-medium mb-2">Upload Transaction Image:</label>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="w-full border rounded p-2"
								/>
							</div>
							<div className="flex justify-end gap-2">
								<button
									className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
									onClick={handleModalClose}
								>
									Close
								</button>
								<button
									className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-dark-500"
									onClick={handleSubmit}
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default VendorWalletDetail;
