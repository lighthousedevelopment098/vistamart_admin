// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedin,
//   FaPinterest,
//   FaTrash,
// } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";
// import { toast } from "react-toastify";
// import ActionButton from "../../../../components/ActionButton/Action";
// import apiConfig from "../../../../config/apiConfig";
// import { getAuthData } from "../../../../utils/authHelper";

// const API_URL = `${apiConfig.admin}/social-media`;
// const { token } = getAuthData();

// const SocialMedia = () => {
//   const [socialMediaLinks, setSocialMediaLinks] = useState([]);
//   const [formData, setFormData] = useState({ name: "", link: "" });

//   // Fetch all social media links on component mount
//   useEffect(() => {
//     const fetchSocialMediaLinks = async () => {
//       try {
//         const response = await axios.get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setSocialMediaLinks(response.data.doc);
//       } catch (error) {
//         console.error("Error fetching social media links:", error);
//         toast.error("Failed to fetch social media links.");
//       }
//     };

//     fetchSocialMediaLinks();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission for add/update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (formData._id) {
//         // Update existing social media link
//         await axios.put(`${API_URL}/${formData._id}`, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setSocialMediaLinks((prev) =>
//           prev.map((link) => (link._id === formData._id ? formData : link))
//         );
//         toast.success("Social media link updated successfully!");
//       } else {
//         // Add new social media link
//         console.log("form data-====", formData)
//         const response = await axios.post(API_URL, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setSocialMediaLinks((prev) => [...prev, response.data.doc]);
//         toast.success("Social media link added successfully!");
//       }
//       setFormData({ name: "", link: "", id: null });
//     } catch (error) {
//       console.error("Error submitting social media link:", error);
//       toast.error("Failed to save social media link.");
//     }
//   };

//   // Handle edit action
//   const handleEdit = (id) => {
//     const link = socialMediaLinks.find((link) => link._id === id);
//     setFormData({ ...link });
//   };

//   // Handle delete action
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSocialMediaLinks((prev) => prev.filter((link) => link._id !== id));
//       toast.success("Social media link deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting social media link:", error);
//       toast.error("Failed to delete social media link.");
//     }
//   };

//   return (
//     <div className="content container-fluid">
//       <div className="mb-3">
//         <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
//           <FaFacebook size={20} /> Social media
//         </h2>
//       </div>

//       <div className="row">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-header">
//               <h5 className="mb-0">Social Media Form</h5>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="name">Name</label>
//                   <select
//                     className="form-control"
//                     name="name"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">---Select---</option>
//                     <option value="Instagram">Instagram</option>
//                     <option value="Facebook">Facebook</option>
//                     <option value="Twitter">Twitter</option>
//                     <option value="Linkedin">LinkedIn</option>
//                     <option value="Pinterest">Pinterest</option>
//                   </select>
//                 </div>

//                 <div className="form-group mt-3">
//                   <label htmlFor="link">Social Media Link</label>
//                   <input
//                     type="url"
//                     name="link"
//                     id="link"
//                     className="form-control"
//                     value={formData.link}
//                     onChange={handleInputChange}
//                     placeholder="Enter Social Media Link"
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary mt-3">
//                   Save
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="row mt-3">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-header">
//               <h5>Social Media Table</h5>
//             </div>
//             <div className="card-body">
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Sl</th>
//                     <th>Name</th>
//                     <th>Social Links</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {socialMediaLinks.map((link, index) => (
//                     <tr key={link._id}>
//                       <td>{index + 1}</td>
//                       <td>{link.name}</td>
//                       <td>{link.link}</td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             link.status === "true" ? "bg-success" : "bg-danger"
//                           }`}
//                         >
//                           {link.status === "true" ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-warning btn-sm me-2"
//                           onClick={() => handleEdit(link._id)}
//                         >
//                           <MdEdit /> Edit
//                         </button>
//                         <button
//                           className="btn btn-danger btn-sm"
//                           onClick={() => handleDelete(link._id)}
//                         >
//                           <FaTrash /> Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialMedia;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import apiConfig from "../../../../config/apiConfig";
import { getAuthData } from "../../../../utils/authHelper";
import TableList from "../../../../components/FormInput/TableList";
import Switcher from "../../../../components/FormInput/Switcher";
import ActionButton from "../../../../components/ActionButton/Action";

const API_URL = `${apiConfig.admin}/social-media`;
const { token } = getAuthData();

const SocialMedia = () => {
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [formData, setFormData] = useState({ name: "", link: "" });

  // Fetch all social media links on component mount
  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSocialMediaLinks(response.data.doc);
      } catch (error) {
        toast.error("Failed to fetch social media links.");
      }
    };

    fetchSocialMediaLinks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await axios.put(`${API_URL}/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSocialMediaLinks((prev) =>
          prev.map((link) => (link._id === formData._id ? formData : link))
        );
        toast.success("Social media link updated successfully!");
      } else {
        const response = await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSocialMediaLinks((prev) => [...prev, response.data.doc]);
        toast.success("Social media link added successfully!");
      }
      setFormData({ name: "", link: "" });
    } catch {
      toast.error("Failed to save social media link.");
    }
  };

  // Handle edit action
  const handleEdit = (id) => {
    const link = socialMediaLinks.find((link) => link._id === id);
    setFormData({ ...link });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete action
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSocialMediaLinks((prev) => prev.filter((link) => link._id !== id));
          Swal.fire("Deleted!", "Your link has been deleted.", "success");
        } catch {
          toast.error("Failed to delete social media link.");
        }
      }
    });
  };

  // Handle status toggle
  const handleToggleStatus = (id, currentStatus) => {
    Swal.fire({
      title: "Change Status?",
      text: "Are you sure you want to toggle the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedStatus = currentStatus === "true" ? "false" : "true";
          await axios.patch(
            `${API_URL}/${id}`,
            { status: updatedStatus },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setSocialMediaLinks((prev) =>
            prev.map((link) =>
              link._id === id ? { ...link, status: updatedStatus } : link
            )
          );
          Swal.fire("Updated!", "Status has been changed.", "success");
        } catch {
          toast.error("Failed to update status.");
        }
      }
    });
  };

  // Define table columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "link", label: "Social Links" },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <Switcher
          checked={item.status === "true"}
          onChange={() => handleToggleStatus(item._id, item.status)}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (item) => (
        <div className="flex justify-center gap-2">
          <ActionButton
            onClick={() => handleEdit(item._id)}
            icon={FaEdit}
            className="btn border border-primary-500 hover:bg-primary-dark-500 hover:text-white mt-3 text-white"
          />
          <ActionButton
            onClick={() => handleDelete(item._id)}
            icon={FaTrash}
            className="btn border border-red-600 hover:bg-red-500 hover:text-white mt-3 text-white"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="content container-fluid">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize">Social Media</h2>
      </div>

      {/* Social Media Form */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Social Media Form</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <select
                    className="form-control"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">---Select---</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Pinterest">Pinterest</option>
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="link">Social Media Link</label>
                  <input
                    type="url"
                    name="link"
                    id="link"
                    className="form-control"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="Enter Social Media Link"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-primary-500 hover:bg-primary-dark-500 hover:text-white mt-3 text-white"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Table */}
      <div className="row mt-3">
        <div className="col-md-12">
          <TableList
            title="Social Media Links"
            tableTitle="Social Media Table"
            listData={socialMediaLinks}
            columns={columns}
            searchPlaceholder="Search Social Media"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
