import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthData } from "../../../../utils/authHelper";
import apiConfig from "../../../../config/apiConfig";

const UpdateEmployeeRole = () => {
  const { id } = useParams();
  const { token } = getAuthData();
  const API_URL = `${apiConfig.admin}/roles/${id}`;

  const [roles, setRoles] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const [roleName, setRoleName] = useState("");

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

  // Utility function to normalize module names to lowercase hyphenated format
  const normalizeModuleName = (module) =>
    module.toLowerCase().replace(/\s+/g, "-");

  // Fetch role details by ID
  const fetchRoleById = async () => {
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
        console.log("Fetched role data:", data);
        setRoleName(data?.doc?.name);

        // Normalize and set selected modules from fetched data
        const normalizedModules = data?.doc?.modules.map(normalizeModuleName);
        const selectedModulesList = availableModules.filter((module) =>
          normalizedModules.includes(normalizeModuleName(module))
        );
        setSelectedModules(selectedModulesList);
      } else {
        console.error("Error fetching role:", data?.message);
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  useEffect(() => {
    fetchRoleById();
  }, [id]);

  const handleCheckboxChange = (module) => {
    setSelectedModules((prevSelected) =>
      prevSelected.includes(module)
        ? prevSelected.filter((m) => m !== module)
        : [...prevSelected, module]
    );
  };

  const handleSelectAllChange = (e) => {
    setSelectedModules(e.target.checked ? availableModules : []);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedModules = selectedModules.map(normalizeModuleName);

    const updatedRole = {
      name: roleName,
      modules: formattedModules,
    };

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRole),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Role updated successfully!");
      } else {
        toast.error(`Error updating role: ${data.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the role.");
    }
  };

  return (
    <div className="content container-fluid">
      <ToastContainer />

      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-seller.png"
            alt="Employee role setup"
          />
          Update Employee Role
        </h2>
      </div>

      <div className="card">
        <div className="card-body">
          <form
            id="submit-update-role"
            className="text-start"
            onSubmit={handleFormSubmit}
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group mb-4">
                  <label htmlFor="name" className="title-color">
                    Role Name
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
                Module Permission
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
                  Select All
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
                className="btn bg-primary-500 hover:bg-primary-dark-500 text-white"
                style={{ color: "white" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeRole;
