import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaDownload,
  FaChevronDown,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { getAuthData } from "../../../../utils/authHelper";
import apiConfig from "../../../../config/apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const EmployeeRoleSetup = () => {
  const API_URL = `${apiConfig.admin}/roles/`;
  const { token } = getAuthData();
  const [roles, setRoles] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [roleName, setRoleName] = useState("");

  // Function to fetch roles
  const fetchRoles = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRoles(data.doc); // Assuming data is an array of roles
      } else {
        console.error("Error fetching roles:", data.message);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  // Fetch roles when the component mounts
  useEffect(() => {
    fetchRoles();
  }, []);

  // Function to handle checkbox change
  const handleCheckboxChange = (module) => {
    setSelectedModules((prevSelected) =>
      prevSelected.includes(module)
        ? prevSelected.filter((m) => m !== module)
        : [...prevSelected, module]
    );
  };

  // Function to handle "Select All" change
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedModules(availableModules);
    } else {
      setSelectedModules([]);
    }
  };

  // Function to handle form submission with toast notifications
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedModules = selectedModules.map((module) =>
      module.toLowerCase().replace(/\s+/g, "-")
    );

    const newRole = {
      name: roleName,
      modules: formattedModules,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRole),
      });
      const data = await response.json();

      if (response.ok) {
        setRoles((prevRoles) => [...prevRoles, data]); // Append the new role to the list
        setRoleName(""); // Reset the role name input
        setSelectedModules([]); // Reset selected modules
        toast.success("Role created successfully!");
        fetchRoles(); // Fetch roles again after creating a new role
      } else {
        toast.error(`Error submitting role: ${data.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the role.");
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
        toast.success("Role deleted successfully!");
      } else {
        toast.error("Failed to delete the role.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the role.");
    }
  };

  const availableModules = [
    "Dashboard",
    "Order management",
    "Track Order",
    "Refund management",
    "Category",
    "Brand",
    "Product attribute",
    "Inhouse Product",
    "Vendor management",
    "Vendor product",
    "Banner setup",
    "Offer and deals",
    "Notifications",
    "Announcement",
    "Inbox",
    "Message",
    "Sales and transaction",
    "Product report",
    "Order report",
    "Customer",
    "Delivery management",
    "Employee",
    "Subscribers",
    "Business setup",
    "System setup",
    "ThirdParty",
    "Page and media",
  ];
  return (
    <div className="content container-fluid">
      <ToastContainer />

      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
            alt="Employee role setup"
          />
          Employee role setup
        </h2>
      </div>

      <div className="card">
        <div className="card-body">
          <form
            id="submit-create-role"
            className="text-start"
            onSubmit={handleFormSubmit}
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-4">
                  <label htmlFor="name" className="title-color">
                    Role name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Ex: Store"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex gap-4 flex-wrap">
              <label
                htmlFor="name"
                className="title-color font-weight-bold mb-0"
              >
                Module permission
              </label>
              <div className="form-group d-flex gap-2">
                <input
                  type="checkbox"
                  id="select-all"
                  className="cursor-pointer"
                  checked={selectedModules.length === availableModules.length}
                  onChange={handleSelectAllChange}
                />
                <label
                  className="title-color mb-0 cursor-pointer text-capitalize"
                  htmlFor="select-all"
                >
                  Select all
                </label>
              </div>
            </div>
            <div className="row">
              {availableModules.map((module, index) => (
                <div key={index} className="col-md-4 col-sm-3">
                  <div className="form-group d-flex gap-2">
                    <input
                      type="checkbox"
                      id={`module-${index}`}
                      className="cursor-pointer"
                      checked={selectedModules.includes(module)}
                      onChange={() => handleCheckboxChange(module)}
                    />
                    <label
                      className="title-color mb-0 cursor-pointer text-capitalize"
                      htmlFor={`module-${index}`}
                    >
                      {module}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn bg-primary-500 text-white"
                style={{ color: "white" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card mt-3">
        <div className="px-3 py-4">
          <div className="row justify-content-between align-items-center flex-grow-1">
            <div className="col-md-4 col-lg-6 mb-2 mb-sm-0">
              <h5 className="d-flex align-items-center gap-2">
                Employee Roles{" "}
                <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                  {roles.length}
                </span>
              </h5>
            </div>
            <div className="col-md-8 col-lg-6 d-flex flex-wrap flex-sm-nowrap justify-content-sm-end gap-3">
              <form action="#" method="GET">
                <div
                  className="input-group input-group-merge input-group-custom border-primary-500"
                  style={{ borderColor: "green" }}
                >
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <FaSearch />
                    </div>
                  </div>
                  <input
                    type="search"
                    name="searchValue"
                    className="form-control border-primary-500"
                    placeholder="Search role"
                  />
                  <button
                    type="submit"
                    className="btn bg-primary-500 text-white"
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
              <div>
                <button
                  type="button"
                  className="btn bg-primary-500 text-nowrap text-white flex justify-center align-items-center gap-1"
                  style={{ color: "white" }}
                >
                  <FaDownload className="text-white" /> Export{" "}
                  <FaChevronDown className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="table-responsive">
            <table className="table table-hover table-borderless table-thead-bordered table-align-middle card-table text-start">
              <thead className="thead-light text-capitalize table-nowrap">
                <tr>
                  <th>SL</th>
                  <th>Role name</th>
                  <th>Modules</th>
                  {/* <th>Status</th> */}
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role._id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td className="w-80">
                      {Array.isArray(role.modules)
                        ? role.modules.join(", ")
                        : ""}
                    </td>

                    {/* <td>
                                            <label className="switcher">
                                                <input
                                                    type="checkbox"
                                                    className="switcher_input"
                                                    checked={role.status}
                                                    onChange={() => {}}
                                                />
                                                <span className="switcher_control"></span>
                                            </label>
                                        </td> */}
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          to={`/employeedit/${role?._id}`}
                          className="btn border-primary-500 text-primary-500"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteRole(role._id)}
                          className="btn btn-outline-danger btn-sm square-btn"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRoleSetup;
