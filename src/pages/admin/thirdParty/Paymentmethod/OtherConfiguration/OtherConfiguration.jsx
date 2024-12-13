// ThirdPartySettings.js

import React, { useState } from "react";
// import { FaWhatsapp } from "react-icons/fa"; // Import React icon for WhatsApp
import SocialLoginSettings from "./SocialLogin/SocialLoginSettings";
import MailConfiguration from "./SocialLogin/Mail/MailConfiguration";
import SmsGatewayContainer from "./SocialLogin/Mail/SmGate/SmGate";
import RecaptchaSettings from "./ReCap/RecaptchaSettings";
import MapApiSetup from "./MapApi/MapApi";
import GoogleMapAnalyticsForm from "./GoogleMap/GoogleMap";
import Switcher from "../../../../../components/FormInput/Switcher";

const OtherConfiguration = () => {
  const [currentTab, setCurrentTab] = useState("socialMediaChat"); // State to manage active tab
  const [phone, setPhone] = useState('00000000000'); // Default phone value
  const [whatsappStatus, setWhatsappStatus] = useState(true); // Default checkbox status
  // Function to handle tab change
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  const handleReset = () => {
    setPhone(''); // Clear phone number
    setWhatsappStatus(false); // Uncheck the checkbox
  };

  // Handle Save button click
  const handleSave = () => {
    // Perform save operation (you can replace this with actual save logic)
    console.log('Saving data:', { phone, whatsappStatus });
    alert('Data Saved Successfully!'); // Alert user for demo purpose
  };

  // Function to render content based on currentTab state
  const renderContent = () => {
    switch (currentTab) {
      case "socialMediaChat":
        return (
          <form
      action="#"
      method="post"
    >
      <input
        type="hidden"
        name="_token"
        value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
        autoComplete="off"
      />
      <div className="card-header mb-3">
        <div className="d-flex align-items-center gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" className="h-8 w-8" />
          <h4 className="text-center mb-0">WhatsApp</h4>
        </div>
        <label className="switcher">
          <input
            className="switcher_input toggle-switch-message"
            type="checkbox"
            value="1"
            id="whatsapp-id"
            name="status"
            checked={whatsappStatus} // Bind state to checkbox
            onChange={() => setWhatsappStatus(!whatsappStatus)} // Toggle checkbox state
          />
          <span className=""> <Switcher /></span>
        </label>
      </div>
      <div className="card-body text-start">
        <div className="form-group gap-2">
          <label className="title-color font-weight-bold text-capitalize">
            WhatsApp number
          </label>
          <input
            type="number"
            className="form-control form-ellipsis outline-none hover:border-primary"
            name="phone"
            value={phone} // Bind state to input
            onChange={(e) => setPhone(e.target.value)} // Update state on input change
            placeholder="Ex: 1234567890"
          />
        </div>
        <div className="d-flex justify-content-end flex-wrap gap-3">
          {/* Reset Button */}
          <button
            type="reset"
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
        );
      case "socialMediaLogin":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/social-login/view">Social media login content goes here</a>
          // Replace with actual content for social media login
          <SocialLoginSettings />
        );
      case "mailConfig":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/mail"> Mail config content goes here</a>
          // Replace with actual content for mail config
          <MailConfiguration />
        );
      case "smsConfig":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/sms-module">SMS config content goes here</a>
          <SmsGatewayContainer />
          // Replace with actual content for SMS config
        );
      case "recaptcha":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/recaptcha">Recaptcha content goes here</a>
          <RecaptchaSettings />
          // Replace with actual content for Recaptcha
        );
      case "googleMapAPIs":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/map-api">Google map APIs content goes here</a>
          <MapApiSetup />
          // Replace with actual content for Google map APIs
        );
      case "analyticScripts":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/analytics-index">Analytic Scripts content goes here</a>
          <GoogleMapAnalyticsForm />
          // Replace with actual content for Analytic Scripts
        );
      default:
        return null;
    }
  };

  return (
    <div className="content container-fluid snipcss-YGKeU p-2">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2 m-4">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png"
            alt=""
          />{" "}
          Othe Configuration
        </h2>
      </div>

      {/* Inline page menu */}
      <div className="inline-page-menu my-4 ">
      <ul className="list-none text-nowrap flex gap-10  overflow-x-auto scroll-smooth w-96 p-3  md:overflow-x-visible md:w-auto">
  <li className={`text-capitalize ${currentTab === "socialMediaChat" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("socialMediaChat")}
    >
      Social media chat
    </button>
  </li>
  <li className={`text-capitalize ${currentTab === "socialMediaLogin" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("socialMediaLogin")}
    >
      Social media login
    </button>
  </li>
  <li className={`text-capitalize ${currentTab === "mailConfig" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("mailConfig")}
    >
      Mail config
    </button>
  </li>
  <li className={`text-capitalize ${currentTab === "smsConfig" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("smsConfig")}
    >
      SMS config
    </button>
  </li>
  <li className={`text-capitalize ${currentTab === "recaptcha" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("recaptcha")}
    >
      Recaptcha
    </button>
  </li>
  <li className={`text-capitalize ${currentTab === "googleMapAPIs" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("googleMapAPIs")}
    >
      Google map APIs
    </button>
  </li>
  <li className={`text-capitalize ${currentTab === "analyticScripts" ? "border-b-2 border-green-500" : ""}`}>
    <button
      className="text-capitalize"
      onClick={() => handleTabChange("analyticScripts")}
    >
      Analytic Scripts
    </button>
  </li>
</ul>

      </div>

      {/* Render content based on currentTab */}
      <div className="card overflow-hidden">{renderContent()}</div>
    </div>
  );
};

export default OtherConfiguration;
