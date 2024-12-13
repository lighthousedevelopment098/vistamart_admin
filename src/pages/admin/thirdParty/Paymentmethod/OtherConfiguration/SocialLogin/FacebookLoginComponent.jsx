import React, { useState } from "react";
import Switcher from "../../../../../../components/FormInput/Switcher";

const TwitterLoginComponent = () => {
  const [apiKey, setApiKey] = useState(""); // State for API key
  const [apiSecret, setApiSecret] = useState(""); // State for API secret

  // Handle reset button click
  const handleReset = () => {
    setApiKey(""); // Clear API key
    setApiSecret(""); // Clear API secret
  };

  // Handle save button click
  const handleSave = () => {
    // Here you can handle the save logic, like sending the data to an API or storing it
    console.log("API Key:", apiKey);
    console.log("API Secret:", apiSecret);

    // You can display a message or do further actions based on the save process
    alert("Credentials saved successfully!");
  };

  return (
    <div className="card overflow-hidden">
      <form
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
              width="20"
              src="https://static.vecteezy.com/system/resources/previews/034/800/663/non_2x/x-new-twitter-logo-free-png.png"
              alt="Twitter Logo"
            />
            <h4 className="mb-0">Twitter Login</h4>
          </div>
          <label className="switcher">
            <input
              className="switcher_input toggle-switch-message"
              type="checkbox"
              name="status"
              id="twitter-id"
              value="1"
              checked
            />
            <span className=""><Switcher/></span>
          </label>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end mb-2">
            <button
              className="btn-link text-capitalize text-green-500 d-flex align-items-center gap-2"
              type="button"
              data-toggle="modal"
              data-target="#twitter-modal"
            >
              Credential setup
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="svg replaced-svg"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
              </svg>
            </button>
          </div>
          <div className="">
            <div className="d-flex mb-2 gap-2 align-items-center">
              <label className="font-semibold  mb-0">Callback URI</label>
              <span data-toggle="tooltip" data-title="Add the OAuth authorization URL">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="svg replaced-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </span>
            </div>
            <div className="form-control d-flex align-items-center justify-content-between py-1 pl-3 pr-2 outline-none hover:border-primary">
              <span className="form-ellipsis d-flex" id="id_twitter">
              vistamart.biz/facebook/callback/
              </span>
              <span className="btn-link copy-to-clipboard" data-id="#id_twitter">
                <i className="tio-copy"></i>
              </span>
            </div>
          </div>
          <div className="">
            <div className="d-flex mb-2 gap-2 align-items-center">
              <label className="font-semibold mt-2 mb-0">Store API key</label>
              <span data-toggle="tooltip" data-title="Add the unique API key">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="svg replaced-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-ellipsis outline-none hover:border-primary"
              name="api_key"
              placeholder="Ex: API Key"
              value={apiKey} // Set the value from state
              onChange={(e) => setApiKey(e.target.value)} // Update state on change
            />
          </div>
          <div className="">
            <div className="d-flex mb-2 gap-2 align-items-center">
              <label className="font-semibold mt-2 mb-0">Store API Secret Key</label>
              <span data-toggle="tooltip" data-title="Store API Secret Key">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="svg replaced-svg"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="form-control form-ellipsis outline-none hover:border-primary"
              name="api_secret"
              placeholder="Ex: API Secret"
              value={apiSecret} // Set the value from state
              onChange={(e) => setApiSecret(e.target.value)} // Update state on change
            />
          </div>
          <div className="d-flex justify-content-end flex-wrap gap-3 mt-4">
            {/* Reset Button */}
            <button
              type="button"
              className="btn btn-secondary px-5"
              onClick={handleReset}
            >
              Reset
            </button>
            {/* Save Button */}
            <button
              type="button"
              className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark"
              style={{color:"white"}}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TwitterLoginComponent;
