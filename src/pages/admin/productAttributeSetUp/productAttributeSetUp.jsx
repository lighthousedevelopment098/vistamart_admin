import React, { useState, useEffect } from "react";
import { FaDownload, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetchAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../../../redux/slices/admin/attributeSlice";
import ActionButton from "../../../components/ActionButton/Action";
import ExportButton from "../../../components/ActionButton/Export";

const AttributeSetup = () => {
  const dispatch = useDispatch();
  const { attributes, loading, error } = useSelector(
    (state) => state.attribute
  );
  const [activeTab, setActiveTab] = useState("en");
  const [searchValue, setSearchValue] = useState("");
  const [newAttribute, setNewAttribute] = useState({ name: "" });
  const [editingAttribute, setEditingAttribute] = useState(null);

  // Fetch attributes on component mount
  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  // Handle tab click
  const handleTabClick = (lang) => setActiveTab(lang);

  // Handle search input change
  const handleSearchChange = (event) => setSearchValue(event.target.value);

  // Handle input changes for new attribute
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAttribute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (add or update)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingAttribute) {
      // Update attribute
      console.log("editing attribute: ", editingAttribute._id);
      dispatch(
        updateAttribute({ id: editingAttribute._id, data: newAttribute })
      );
      toast.success("Attribute updated successfully!");
    } else {
      // Add new attribute
      dispatch(createAttribute(newAttribute));
      toast.success("Attribute added successfully!");
    }
    setNewAttribute({ name: "" });
    setEditingAttribute(null);
  };

  // Handle attribute edit (populate form)
  const handleEdit = (attribute) => {
    setNewAttribute({ name: attribute.name });
    setEditingAttribute(attribute);

    // Scroll to the form smoothly
    document.querySelector("form").scrollIntoView({ behavior: "smooth" });
  };

  // Handle attribute deletion
  const handleDelete = (id) => {
    dispatch(deleteAttribute(id));
    toast.success("Attribute deleted successfully!");
  };

  // Filter attributes based on search value
  const filteredAttributes = attributes?.filter((attribute) =>
    attribute.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      <div className="content container-fluid p-15 snipcss-oDPVp">
        <div className="mb-3">
          <h2 className="h1 mb-0 d-flex gap-2">
            <img src="/attribute.png" alt="Attribute Icon" />
            Attribute Setup
          </h2>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit} className="text-start">
                  <ul className="nav nav-tabs w-fit-content mb-4">
                    <li className="nav-item text-capitalize">
                      <a
                        className={`nav-link form-system-language-tab cursor-pointer ${
                          activeTab === "en" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("en")}
                      >
                        English
                      </a>
                    </li>
                  </ul>

                  {activeTab === "en" && (
                    <div className="form-group form-system-language-form">
                      <label className="title-color" htmlFor={`type-en`}>
                        Attribute Name <span className="text-danger">*</span>{" "}
                        (EN)
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control outline-none hover:border-primary-500"
                        id={`type-en`}
                        placeholder="Enter Attribute Name"
                        value={newAttribute.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  <div className="d-flex flex-wrap gap-2 justify-content-end">
                    <button
                      type="submit"
                      className="btn bg-primary-500 text-white hover:bg-primary-dark-500"
                      style={{ color: "white" }}
                    >
                      {editingAttribute ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="px-3 py-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                  <div className="">
                    <h5 className="mb-0 d-flex align-items-center gap-2 text-[1rem] font-semibold">
                      Attribute list{" "}
                      <span className="badge badge-soft-dark radius-50 fz-12">
                        {filteredAttributes?.length}
                      </span>
                    </h5>
                  </div>
                  <div className="">
                    <div className="flex flex-col md:flex-row items-end gap-4">
                      <form method="GET">
                        <div className="input-group input-group-custom input-group-merge border-primary-500">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <FaSearch />
                            </div>
                          </div>
                          <input
                            type="search"
                            name="searchValue"
                            className="form-control border-primary-500 outline-none"
                            placeholder="Search by Attribute Name"
                            aria-label="Search attributes"
                            value={searchValue}
                            onChange={handleSearchChange}
                          />
                          <button
                            type="button"
                            className="btn bg-primary-500 text-white hover:bg-primary-dark-500"
                            style={{ color: "white" }}
                          >
                            Search
                          </button>
                        </div>
                      </form>
                      <ExportButton
                        data={filteredAttributes} // Pass the data to export
                        filename="ProductAttributeList" // Optional filename for the exported file
                        icon={FaDownload} // Icon for the button
                        label="Export " // Button label
                        className="bg-primary-500 text-white hover:bg-primary-dark-500" // Tailwind classes for styling
                        style={{ color: "white" }} // Optional inline styles
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-start">
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                    <thead className="thead-light thead-50 text-capitalize ">
                      <tr>
                        <th>SL</th>
                        <th className="text-center">Attribute Name</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttributes.map((attribute, index) => (
                        <tr key={attribute._id}>
                          <td>{index + 1}</td>
                          <td className="text-center">{attribute.name}</td>
                          <td className="text-center">
                            {/* <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleEdit(attribute)}
                            >
                              <FaEye />
                            </button>
                        > */}
                            <ActionButton
                              onClick={() => handleEdit(attribute)}
                              icon={FaEdit} // Pass dynamic icon
                              className="ml-4"
                              label="edit"
                            />
                            {/* <ActionButton
                              onClick={() => handleEdit(attribute)}
                              icon={FaEdit} // Pass dynamic icon
                              className="ml-4"
                              label="View"
                            /> */}
                            <ActionButton
                              onClick={() => handleDelete(attribute._id)}
                              icon={FaTrash} // Pass dynamic icon
                              className="ml-4"
                              label="Delete"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AttributeSetup;
