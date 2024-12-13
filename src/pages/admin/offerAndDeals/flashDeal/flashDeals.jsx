// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// import { MdFlashOn } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   fetchFlashDeals,
//   createFlashDeal,
//   deleteFlashDeal,
// } from "../../../../redux/slices/admin/flashDealSlice";
// import FileUpload from "../../../../components/FormInput/FileUpload";
// import PreviewImage from "../../../../components/FormInput/PreviewImage";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
// import { getUploadUrl, uploadImageToS3 } from "../../../../utils/helpers";
// import ExportButton from "../../../../components/ActionButton/Export";
// import ActionButton from "../../../../components/ActionButton/Action";
// import { Link } from "react-router-dom";
// import apiConfig from "../../../../config/apiConfig";

// const FlashDeals = () => {
//   const dispatch = useDispatch();
//   const { flashDeals, loading, error } = useSelector(
//     (state) => state.flashDeals
//   );
//   const [formData, setFormData] = useState({
//     title: "",
//     startDate: "",
//     endDate: "",
//     image: "", // This will hold the S3 image key
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission indicator

//   useEffect(() => {
//     dispatch(fetchFlashDeals());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(`Error: ${error}`);
//     }
//   }, [error]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       const objectUrl = URL.createObjectURL(file);
//       setFormData((prevData) => ({
//         ...prevData,
//         image: objectUrl, // Display the image preview
//       }));
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setIsSubmitting(true); // Start submitting

//     if (selectedFile) {
//       // Get the upload URL from S3
//       // Upload the image to S3
//       if (imageKey) {
//         // Update formData with the image key
//         formData.image = imageKey;
//       }
//     }

//     // Dispatch createFlashDeal with formData containing the image key
//     dispatch(createFlashDeal(formData)).then((res) => {
//       setIsSubmitting(false); // Stop submitting
//       if (res.meta.requestStatus === "fulfilled") {
//         toast.success("Flash deal added successfully!");
//         setFormData({
//           title: "",
//           startDate: "",
//           endDate: "",
//           image: "",
//         });
//         setSelectedFile(null); // Reset selected file
//         dispatch(fetchFlashDeals());
//       }
//     });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteFlashDeal(id));
//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//       }
//     });
//   };

//   // const filteredDeals = flashDeals.filter((deal) =>
//   //   deal.title.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   const filteredDeals = Array.isArray(flashDeals)
//   ? flashDeals.filter((deal) =>
//       deal.title.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   : [];

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(activeLang, options);
//   };

//   return (
//     <div className="content container-fluid snipcss-SrYZc">
//       <div className="d-flex justify-content-between gap-2 mb-3">
//         <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
//           <MdFlashOn size={24} /> Flash deals
//         </h2>
//       </div>

//       <div className="row">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-body">
//               <form
//                 onSubmit={handleFormSubmit}
//                 className="text-start"
//                 encType="multipart/form-data"
//               >
//                 <div className="row">
//                   <div className="col-lg-6">
//                     <div className="form-group">
//                       <label
//                         htmlFor="title"
//                         className="title-color font-weight-medium text-capitalize"
//                       >
//                         Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         className="form-control outline-none hover:border-primary"
//                         placeholder="Enter title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label
//                         htmlFor="start-date"
//                         className="title-color font-weight-medium text-capitalize"
//                       >
//                         Start Date
//                       </label>
//                       <input
//                         type="date"
//                         name="startDate"
//                         className="form-control outline-none hover:border-primary"
//                         value={formData.startDate}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label
//                         htmlFor="end-date"
//                         className="title-color font-weight-medium text-capitalize"
//                       >
//                         End Date
//                       </label>
//                       <input
//                         type="date"
//                         name="endDate"
//                         className="form-control outline-none hover:border-primary"
//                         value={formData.endDate}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="col-lg-6">
//                     <PreviewImage image={formData.image} />
//                     <FileUpload
//                       label="Image"
//                       name="image"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                   <div className="flex justify-end m-5 w-full">
//                     <button
//                       type="submit"
//                       className="btn bg-primary hover:bg-primary-dark"
//                       style={{ color: "white" }}
//                       disabled={isSubmitting} // Disable the button while submitting
//                     >
//                       {isSubmitting ? "Submitting..." : "Add Flash Deal"}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-lg-12">
//           <div className="card">
//             <div className="card-body">
//               <div className="mb-3 d-flex justify-content-between">
//                 <div className="search-form mb-3">
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Search by title..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     <span className="input-group-text">
//                       <FaSearch />
//                     </span>
//                   </div>
//                 </div>
//                 <ExportButton />
//               </div>

//               {status === "loading" ? (
//                 <p>Loading...</p>
//               ) : status === "failed" ? (
//                 <p>{error}</p>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table table-hover text-nowrap">
//                     <thead className="bg-green-200 ">
//                       <tr>
//                         <th>Title</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Image</th>
//                         <th className="text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredDeals.map((deal) => (
//                         <tr key={deal._id}>
//                           <td>{deal.title}</td>
//                           <td>
//                             {new Date(deal.startDate).toLocaleDateString()}
//                           </td>
//                           <td>{new Date(deal.endDate).toLocaleDateString()}</td>
//                           <td>
//                             <img src={`${apiConfig.bucket}/${deal?.image}`} alt={deal.title} width="50" />
//                           </td>
//                           <td>
//                             <div className="d-flex justify-content-center gap-2">
//                               <Link
//                                 to={`/add-flashproduct/${deal._id}`}
//                                 className="h-30 d-flex gap-2 align-items-center btn btn-soft-info btn-sm border-green-500"
//                               >
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width="9"
//                                   height="9"
//                                   viewBox="0 0 9 9"
//                                   fill="none"
//                                   className="svg replaced-svg border-green-500"
//                                 >
//                                   <path
//                                     d="M9 3.9375H5.0625V0H3.9375V3.9375H0V5.0625H3.9375V9H5.0625V5.0625H9V3.9375Z"
//                                     fill="#00A3AD"
//                                   />
//                                 </svg>
//                                 Add product
//                               </Link>
//                               <ActionButton
//                                 onClick={() => handleDelete(deal._id)}
//                                 icon={FaTrash} // Pass dynamic icon
//                                 className="ml-4"
//                                 label="Delete"
//                               />
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashDeals;

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { MdFlashOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  fetchFlashDeals,
  createFlashDeal,
  deleteFlashDeal,
} from "../../../../redux/slices/admin/flashDealSlice";
import FileUpload from "../../../../components/FormInput/FileUpload";
import PreviewImage from "../../../../components/FormInput/PreviewImage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUploadUrl, uploadImageToS3 } from "../../../../utils/helpers";
import ExportButton from "../../../../components/ActionButton/Export";
import ActionButton from "../../../../components/ActionButton/Action";
import { Link } from "react-router-dom";
import apiConfig from "../../../../config/apiConfig";

const FlashDeals = () => {
  const dispatch = useDispatch();
  const { flashDeals, loading, error } = useSelector(
    (state) => state.flashDeals
  );
  const defaultImage = "/image-place-holder.png"; // Set your default image URL here
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    image: defaultImage,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchFlashDeals());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({ ...prevData, image: objectUrl }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let imageKey;

      if (selectedFile) {
        console.log("Selected file:", selectedFile);

        // Get the S3 upload URL for the flash deal image
        const uploadConfig = await getUploadUrl(
          selectedFile.type,
          "flash-deals"
        );

        // Use the URL to upload the image
        const uploadSuccessful = await uploadImageToS3(
          uploadConfig.url,
          selectedFile
        );
        imageKey = uploadConfig.key; // Directly retrieve the image key from uploadConfig

        if (uploadSuccessful && imageKey) {
          formData.image = imageKey;
        } else {
          throw new Error("Failed to retrieve image key from upload.");
        }
      }

      // Dispatch createFlashDeal with formData containing the image key if available
      await dispatch(createFlashDeal(formData)).unwrap();

      toast.success("Flash deal added successfully!");
      setFormData({
        title: "",
        startDate: "",
        endDate: "",
        image: defaultImage,
      });
      setSelectedFile(null);
      dispatch(fetchFlashDeals());
    } catch (err) {
      console.error("Error during form submission:", err);
      toast.error(`Error adding flash deal: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        // Optimistically remove the deal from the local state or dispatch a Redux action
        await dispatch(deleteFlashDeal(id)).unwrap();

        Swal.fire("Deleted!", "Your flash deal has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to delete flash deal. Please try again.",
          "error"
        );
      }
    }
  };

  // const filteredDeals = flashDeals.filter((deal) =>
  //   deal.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredDeals = Array.isArray(flashDeals)
    ? flashDeals.filter((deal) =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Object.values(flashDeals).filter(
        (deal) =>
          typeof deal === "object" && // Ensure it's not the `products` array
          deal.title &&
          deal.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="content container-fluid">
      <div className="d-flex justify-content-between gap-2 mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <MdFlashOn size={24} /> Flash deals
        </h2>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={handleFormSubmit}
                className="text-start"
                encType="multipart/form-data"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label
                        htmlFor="title"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control outline-none hover:border-primary-500"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="start-date"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        className="form-control outline-none hover:border-primary-500"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="end-date"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        className="form-control outline-none hover:border-primary-500"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <PreviewImage image={formData.image} />
                    <FileUpload
                      label="Image"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex justify-end m-5 w-full">
                    <button
                      type="submit"
                      className="btn bg-primary-500 hover:bg-primary-dark-500"
                      style={{ color: "white" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Add Flash Deal"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between">
                <div className="search-form mb-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                  </div>
                </div>
                <ExportButton />
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover text-nowrap">
                    <thead className="bg-secondary-500">
                      <tr>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Image</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDeals.map((deal) => (
                        <tr key={deal._id}>
                          <td>{deal.title}</td>
                          <td>
                            {new Date(deal.startDate).toLocaleDateString()}
                          </td>
                          <td>{new Date(deal.endDate).toLocaleDateString()}</td>
                          <td>
                            <img
                              src={`${apiConfig.bucket}/${deal.image}`}
                              alt={deal.title}
                              width="50"
                            />
                          </td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <Link
                                to={`/add-flashproduct/${deal._id}`}
                                className="btn btn-soft-info btn-sm border-primary-500"
                              >
                                Add product
                              </Link>
                              <ActionButton
                                onClick={() => handleDelete(deal._id)}
                                icon={FaTrash}
                                label="Delete"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashDeals;
