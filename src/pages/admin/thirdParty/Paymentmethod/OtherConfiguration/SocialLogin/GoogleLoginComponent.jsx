import React, { useState } from "react";
import Switcher from "../../../../../../components/FormInput/Switcher";

const GoogleLoginComponent = () => {
  // State variables for client ID and client secret
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  // Handler to reset the form values
  const handleReset = () => {
    setClientId("");
    setClientSecret("");
  };

  // Handler to save the form values
  const handleSave = () => {
    // You can add logic to send the data to a server or save it
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);

    // Optional: Show a success message or handle the form submission
    alert("Credentials saved successfully!");
  };

  return (
    <div className="card overflow-hidden">
      <form
        // action="vistamart.biz/login//social-login/update/google"
        method="post"
      >
        <input
          type="hidden"
          name="_token"
          value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
          autoComplete="off"
        />
        <div className="card-header">
          <div className="d-flex align-items-center gap-2">
            <img
              width="16"
              src="https://6valley.6amtech.com/public/assets/back-end/img/google-logo.png"
              alt="Google Logo"
            />
            <h4 className="mb-0">Google Login</h4>
          </div>
          <label className="switcher">
            <input
              className="switcher_input toggle-switch-message bg-green-600"
              type="checkbox"
              name="status"
              id="google-id"
              value="1"
              checked
            />
            <span className=""> <Switcher/></span>
          </label>
        </div>

        <div className="card-body">
          {/* Callback URI */}
          <div className="d-flex mb-2 gap-2 align-items-center">
            <label className="title-color font-semibold mb-0">Callback URI</label>
          </div>
          <div className="form-control d-flex align-items-center justify-content-between py-1 pl-3 pr-2 outline-none hover:border-primary">
            <span className="form-ellipsis d-flex" id="id_google">
            vistamart.biz/customer/auth/login/google/callback
            </span>
            <span className="btn-link copy-to-clipboard" data-id="#id_google">
              <i className="tio-copy"></i>
            </span>
          </div>

          {/* Client ID input */}
          <div className="d-flex mb-2 gap-2 align-items-center">
            <label className="font-semibold mt-2 mb-0">Store Client ID</label>
          </div>
          <input
            type="text"
            className="form-control form-ellipsis outline-none hover:border-primary"
            name="client_id"
            placeholder="Ex: Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />

          {/* Client Secret input */}
          <div className="d-flex mb-2 gap-2 align-items-center">
            <label className="font-semibold mt-2 mb-0">Store Client Secret Key</label>
          </div>
          <input
            type="text"
            className="form-control form-ellipsis outline-none hover:border-primary"
            name="client_secret"
            placeholder="Ex: Client Secret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />

          {/* Reset and Save buttons */}
          <div className="d-flex justify-content-end flex-wrap gap-3 mt-4">
            <button
              type="button"
              className="btn btn-secondary px-5"
              onClick={handleReset} // Reset form values
            >
              Reset
            </button>
            <button
              type="button"
              className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark"
              style={{color:"white"}}
              onClick={handleSave} // Save form values
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GoogleLoginComponent;
