import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import Switcher from "../../../../../../components/FormInput/Switcher";
const RecaptchaSettings = () => {
  
  const [isChecked, setIsChecked] = useState(true); // Initialize the state
  // State for input fields
  const [formData, setFormData] = useState({
    siteKey: "",
    secretKey: "",
  });
  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle reset button click
  const handleReset = () => {
    setFormData({
      siteKey: "",
      secretKey: "",
    });
  };

  // Function to handle save button click
  const handleSave = () => {
    // Implement save logic here (e.g., send data to an API)
    console.log("Saved data:", formData);
  };
  const handleToggle = () => {
    setIsChecked(prevState => !prevState); 
  };
  return (
    <div className="card-body snipcss-afQV6">
      <div className="d-flex justify-content-between gap-2 align-items-center mb-3">
        <div>Status</div>
        <div className="text-primary d-flex align-items-center gap-3 font-weight-bolder mb-2 text-capitalize">
          How it works
          <div
            className="ripple-animation"
            data-toggle="modal"
            data-target="#getInformationModal"
          >
            <BsInfoCircle />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-bottom overflow-hidden mb-4">
      <div className="border rounded border-color-c1 px-4 py-3 d-flex justify-content-between">
        <h5 className="mb-0 d-flex gap-1 c1">
          {isChecked ? 'Turn OFF' : 'Turn ON'} {/* Conditional rendering */}
        </h5>
        <div className="position-relative">
          <label className="switcher">
            <input
              className="switcher_input toggle-switch-message"
              type="checkbox"
              name="status"
              id="recaptcha-id"
              checked={isChecked} // Bind the checked state
              onChange={handleToggle} // Handle change
            />
            <span className="switcher_label">
              <Switcher />
            </span>
          </label>
        </div>
      </div>
    </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label className="title-color font-weight-bold d-flex">
              Site Key
            </label>
            <input
              type="text"
              className="form-control outline-none hover:border-primary"
              name="siteKey"
              value={formData.siteKey}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label className="title-color font-weight-bold d-flex">
              Secret Key
            </label>
            <input
              type="text"
              className="form-control outline-none hover:border-primary"
              name="secretKey"
              value={formData.secretKey}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <h5 className="mt-4 mb-3 d-flex">Instructions</h5>
      <ol className="pl-4 instructions-list">
        <li>
          To get site key and secret key Go to the Credentials page (
          <a
            href="https://www.google.com/recaptcha/admin/create"
            target="_blank"
          >
            Click here
          </a>
          )
        </li>
        <li>Add a label (Ex: abc company)</li>
        <li>Select reCAPTCHA v2 as ReCAPTCHA Type</li>
        <li>Select sub type: I'm not a robot checkbox</li>
        <li>Add Domain (For ex: demo.6amtech.com)</li>
        <li>messages.check_in_Accept_the_reCAPTCHA_Terms_of_Service</li>
        <li>Press Submit</li>
        <li>
          Copy Site Key and Secret Key, paste in the input fields below and
          Save.
        </li>
      </ol>
      <div className="d-flex justify-content-end gap-3 mt-3 ">
        <button
          type="reset"
          className="btn btn-secondary px-5"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn px-4 py-2 bg-primary hover:bg-primary-dark call-demo"
          style={{ color: "white" }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default RecaptchaSettings;
