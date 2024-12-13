import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Importing the icons
const WithdrawalMethods = () => {
  // State to handle form data for the main form
  const [formData, setFormData] = useState({
    method_name: "bkash",
    field_type: "string",
    field_name: "mobile_number",
    placeholder_text: "+8801111111111",
    is_required: true,
    is_default: false,
  });

  // State to manage dynamic field sets
  const [customFields, setCustomFields] = useState([]);

  // Function to handle input changes in the main form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to handle input changes for dynamic fields
  const handleCustomFieldChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newFields = customFields.map((field, i) => {
      if (i === index) {
        return {
          ...field,
          [name]: type === "checkbox" ? checked : value,
        };
      }
      return field;
    });
    setCustomFields(newFields);
  };

  // Function to add a new set of custom fields
  const handleAddField = () => {
    setCustomFields([
      ...customFields,
      {
        field_type: "string",
        field_name: "",
        placeholder_text: "",
        is_required: false,
      },
    ]);
  };

  // Function to remove a specific set of custom fields
  const handleRemoveField = (index) => {
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission (e.g., send data to an API)
    console.log("Form submitted:", formData, customFields);
  };

  // Function to reset the main form and dynamic fields
  const handleReset = () => {
    setFormData({
      method_name: "",
      field_type: "",
      field_name: "",
      placeholder_text: "",
      is_required: false,
      is_default: false,
    });
    setCustomFields([]);
  };

  return (
    <div className="content  container-fluid p-8 snipcss-xdhtz">
      <div className="mb-3">
        <div className="page-title-wrap d-flex justify-content-between flex-wrap align-items-center gap-3 mb-3">
          <h2 className="page-title text-capitalize text-black flex gap-2">
            <img
              width="20"
              src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
              alt=""
            />
            Withdrawal methods
          </h2>
          <button
            className="btn  text-capitalize bg-primary-500 remove gap-2"
            id="add-more-field"
            style={{ backgroundColor: "", display: "flex" }}
            onClick={handleAddField}
          >
            <FaPlus className="tio-add text-white " /> Add fields
          </button>
        </div>
      </div>
      <div className="row" data-select2-id="9">
        <div className="col-md-12" data-select2-id="8">
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="_token"
              value="PwtXfCOB4jJW4r7EFP7tbQ85VIeh6Q28sCgcjoVB"
              autoComplete="off"
            />
            <input type="hidden" name="id" value="2" />
            <div className="p-30" data-select2-id="7">
              <div className="card card-body">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name="method_name"
                    id="method_name"
                    placeholder=""
                    value={formData.method_name}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Method name *</label>
                </div>
              </div>
              <div className="card card-body mt-3">
                <div className="row gy-4 align-items-center">
                  <div className="col-md-6 col-12">
                    <div>
                      <select
                        className="form-control"
                        name="field_type"
                        value={formData.field_type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="password">Password</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="field_name"
                        placeholder=""
                        value={formData.field_name}
                        onChange={handleInputChange}
                        required
                      />
                      <label>Field name *</label>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="placeholder_text"
                        placeholder=""
                        value={formData.placeholder_text}
                        onChange={handleInputChange}
                        required
                      />
                      <label>Placeholder text *</label>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="1"
                        name="is_required"
                        id="flex-check-default"
                        checked={formData.is_required}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flex-check-default"
                      >
                        This field required
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Render dynamic fields */}
              {customFields.map((field, index) => (
                <div className="card card-body mt-3" key={index}>
                  <div className="row gy-4 align-items-center">
                    <div className="col-md-6 col-12">
                      <div>
                        <select
                          className="form-control"
                          name="field_type"
                          value={field.field_type}
                          onChange={(e) => handleCustomFieldChange(index, e)}
                          required
                        >
                          <option value="string">String</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="password">Password</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="field_name"
                          placeholder=""
                          value={field.field_name}
                          onChange={(e) => handleCustomFieldChange(index, e)}
                          required
                        />
                        <label>Field name *</label>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          name="placeholder_text"
                          placeholder=""
                          value={field.placeholder_text}
                          onChange={(e) => handleCustomFieldChange(index, e)}
                          required
                        />
                        <label>Placeholder text *</label>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="is_required"
                          id={`flex-check-${index}`}
                          checked={field.is_required}
                          onChange={(e) => handleCustomFieldChange(index, e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`flex-check-${index}`}
                        >
                          This field required
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 col-12 d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn remove text-capitalize flex gap-2"
                        onClick={() => handleRemoveField(index)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-start mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="1"
                    name="is_default"
                    id="flex-check-default-method"
                    checked={formData.is_default}
                    onChange={handleInputChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flex-check-default-method"
                  >
                    Default method
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  type="reset"
                  className="btn btn--secondary mx-2"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn bg-primary-500 hover:bg-primary-dark-500 demo_check"
                  style={{ color: "white" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalMethods;
