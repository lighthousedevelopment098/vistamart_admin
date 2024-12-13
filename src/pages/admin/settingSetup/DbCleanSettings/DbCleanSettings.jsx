import React, { useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { MdToggleOn, MdToggleOff } from "react-icons/md";

const DbCleanSettings = () => {
  const [isCookieEnabled, setIsCookieEnabled] = useState(true);
  const [cookieText, setCookieText] = useState(
    "By clicking “Yes, I agree”, you agree to store cookies on your device and disclose information in accordance with our Cookie Policy."
  );

  const toggleCookieSetting = () => {
    setIsCookieEnabled(!isCookieEnabled);
  };

  const handleTextChange = (e) => {
    setCookieText(e.target.value);
  };

  const handleSave = () => {
    // Logic to save the settings
    console.log("Cookie Settings Saved", { isCookieEnabled, cookieText });
  };

  return (
    <div className="card">
      <div className="border-bottom py-3 px-4">
        <div className="d-flex justify-content-between align-items-center gap-10">
          <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
            <FaCookieBite size={20} /> Cookie settings:
          </h5>
          <div className="switcher" onClick={toggleCookieSetting}>
            {isCookieEnabled ? (
              <MdToggleOn size={30} color="green" />
            ) : (
              <MdToggleOff size={30} color="red" />
            )}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div
          className="loyalty-point-section"
          id="cookie_setting_status_section"
        >
          <div className="form-group">
            <label className="title-color d-flex" htmlFor="cookie_text">
              Cookie text
            </label>
            <textarea
              name="cookie_text"
              id="cookie_text"
              cols="30"
              rows="6"
              className="form-control outline-none hover:border-primary"
              value={cookieText}
              onChange={handleTextChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              id="submit"
              className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark"
              style={{ color: "white" }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DbCleanSettings;
