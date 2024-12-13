import React, { useState } from "react";

const SmsGatewayCard = ({ gatewayName, onSubmit }) => {
  // Manage form state
  const [formData, setFormData] = useState({
    api_key: "",
    auth_key: "",
    otp_template: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as submitting it via fetch or axios
    console.log("Form submitted:", formData);

    // You can trigger the parent onSubmit callback if needed
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="col-md-6">
      <div className="card h-100">
        <form
          onSubmit={handleSubmit}
          id={`${gatewayName}-form`}
          encType="multipart/form-data"
        >
          <div className="card-header d-flex flex-wrap align-content-around">
            <h5>
              <span className="text-uppercase">{gatewayName}</span>
            </h5>
            <label className="switcher show-status-text">
              <input
                className="switcher_input toggle-switch-message "
                type="checkbox"
                name="status"
                value="1"
                id={gatewayName}
              />
              <span className="switcher_control" data-ontitle="On" data-offtitle="Off"></span>
            </label>
          </div>
          <div className="card-body">
            <input name="gateway" value={gatewayName} className="d-none" />
            <input name="mode" value="live" className="d-none" />

            {gatewayName === "alphanet_sms" && (
              <div className="form-group mb-10px mt-20px">
                <label htmlFor="otp_template" className="form-label">
                  Otp Template <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control hover:border-primary outline-none"
                  name="otp_template"
                  placeholder="Otp Template"
                  value={formData.otp_template}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="form-group mb-10px mt-20px">
              <label htmlFor="api_key" className="form-label">
                Api Key <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control outline-none hover:border-primary"
                name="api_key"
                placeholder="Api Key"
                value={formData.api_key}
                onChange={handleInputChange}
              />
            </div>

            {gatewayName !== "2factor" && (
              <div className="form-group mb-10px mt-20px">
                <label htmlFor="auth_key" className="form-label">
                  Auth Key <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control hover:border-primary outline-none"
                  name="auth_key"
                  placeholder="Auth Key"
                  value={formData.auth_key}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="text-right mt-20px">
              <button
                type="submit"
                className="btn px-4 py-2 bg-primary hover:bg-primary-dark"
                style={{ color: "white" }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmsGatewayCard;
