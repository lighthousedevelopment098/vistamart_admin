// ThirdPartySettings.js

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // Import React icon for WhatsApp
import "./OtherConfig.css";
import SocialLoginSettings from "./SocialLogin/SocialLoginSettings";
import MailConfiguration from "./SocialLogin/Mail/MailConfiguration";
import SmsGatewayContainer from "./SocialLogin/Mail/SmGate/SmGate";
import RecaptchaSettings from "./ReCap/RecaptchaSettings";
import MapApiSetup from "./MapApi/MapApi";
import GoogleMapAnalyticsForm from "./GoogleMap/GoogleMap";

const Page = () => {
  const [currentTab, setCurrentTab] = useState("socialMediaChat"); // State to manage active tab

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  // Function to render content based on currentTab state
  const renderContent = () => {
    switch (currentTab) {
      case "socialMediaChat":
        return (
          <form
            action="https://6valley.6amtech.com/admin/social-media-chat/update/whatsapp"
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
                <FaWhatsapp size={16} />
                <h4 className="text-center mb-0">WhatsApp</h4>
              </div>
              <label className="switcher">
                <input
                  className="switcher_input toggle-switch-message"
                  type="checkbox"
                  value="1"
                  id="whatsapp-id"
                  name="status"
                  checked=""
                  data-modal-id="toggle-modal"
                  data-toggle-id="whatsapp-id"
                  data-on-image="social/whatsapp-on.png"
                  data-off-image="social/whatsapp-off.png"
                  data-on-title="Want to turn ON WhatsApp as social media chat option?"
                  data-off-title="Want to turn OFF WhatsApp as social media chat option?"
                  data-on-message="<p>If enabled WhatsApp chatting option will be available in the system</p>"
                  data-off-message="<p>If enabled WhatsApp chatting option will be hidden from the system</p>"
                />
                <span className="switcher_control"></span>
              </label>
            </div>
            <div className="card-body text-start">
              <div className="form-group  gap-2">
                <label className="title-color font-weight-bold text-capitalize">
                  Whatsapp number
                </label>
                {/* <span className="ml-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Provide a WhatsApp number without country code">
                                    <img className="info-img" src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg" alt="img" />
                                </span> */}
                <input
                  type="text"
                  className="form-control form-ellipsis"
                  name="phone"
                  value="00000000000"
                  placeholder="Ex:1234567890"
                />
              </div>
              <div className="d-flex justify-content-end flex-wrap gap-3">
                <button type="reset" className="btn btn-secondary px-5">
                  Reset
                </button>
                <button
                  type="button"
                  className="btn px-4 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37]"
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
    <div className="content container-fluid snipcss-YGKeU">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png"
            alt=""
          />{" "}
          3rd party
        </h2>
      </div>

      {/* Inline page menu */}
      <div className="inline-page-menu my-4">
        <ul className="list-unstyled">
          <li className={currentTab === "socialMediaChat" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("socialMediaChat")}
            >
              Social media chat
            </button>
          </li>
          <li className={currentTab === "socialMediaLogin" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("socialMediaLogin")}
            >
              Social media login
            </button>
          </li>
          <li className={currentTab === "mailConfig" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("mailConfig")}
            >
              Mail config
            </button>
          </li>
          <li className={currentTab === "smsConfig" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("smsConfig")}
            >
              SMS config
            </button>
          </li>
          <li className={currentTab === "recaptcha" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("recaptcha")}
            >
              Recaptcha
            </button>
          </li>
          <li className={currentTab === "googleMapAPIs" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("googleMapAPIs")}
            >
              Google map APIs
            </button>
          </li>
          <li className={currentTab === "analyticScripts" ? "active" : ""}>
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

export default Page;
