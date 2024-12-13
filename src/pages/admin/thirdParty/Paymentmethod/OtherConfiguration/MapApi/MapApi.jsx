import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

const MapApiSetup = () => {
  // State for managing input fields
  const [formData, setFormData] = useState({
    mapApiKeyClient: "",
    mapApiKeyServer: "",
  });
  const [showText, setShowText] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      mapApiKeyClient: "",
      mapApiKeyServer: "",
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Here you can add the logic to send data to the server or handle it as needed
  };

  return (
    <div className="card-body snipcss-dkxUU">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-center gap-2 justify-content-between mb-3">
          <h4 className="text-capitalize mb-0">Google map API setup</h4>
          <div className="d-flex align-items-center gap-4">
            <div>
              <label className="switcher">
                <input
                  className="switcher_input toggle-switch-message"
                  type="checkbox"
                  defaultChecked
                />
                <span className="switcher_control"></span>
              </label>
            </div>
            <div className="btn-group">
              <div className="relative inline-block ">
                <div
                  className="ripple-animation cursor-pointer"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseEnter={() => setShowText(true)}
                  onMouseLeave={() => setShowText(false)}
                  onClick={() => setShowText((prev) => !prev)} // Toggle text on click
                >
                  <BsInfoCircle />
                </div>

                {showText && (
                  <div className="absolute z-50  text-nowrap  mt-1 p-4 -ml-72 bg-green-300 border  border-gray-300 rounded shadow-lg">
                   Without configuring this section map <br /> functionality will not work properly Thus the <br /> whole system will not work as it planned
                  </div>
                )}
              </div>
              <div className="dropdown-menu dropdown-menu-right bg-aliceblue border border-color-primary-light p-4 dropdown-w-lg">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="20"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/note.png"
                    alt=""
                  />
                  <h5 className="text-primary mb-0">Note</h5>
                </div>
                <p className="title-color font-weight-medium mb-0">
                  Without configuring this section, the map functionality will
                  not work properly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-2 mb-4 valley-alert flex items-start gap-2 border-l-4 border-green-500 border-t border-green-500  border-r  border-b  p-4">
          <img
            width="16"
            className="mt-1"
            src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
            alt=""
          />
          <p className="mb-0">
            <strong>NB:</strong> Client key should have map JavaScript API
            enabled. You can restrict it with HTTP referrers. The server key
            should have the Place API enabled, and you can restrict it with IP.
            You can use the same API for both fields without any restrictions.
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="title-color d-flex">Map API Key (Client)</label>
              <input
                type="text"
                placeholder="Map API Key (Client)"
                className="form-control outline-none hover:border-primary"
                name="mapApiKeyClient"
                value={formData.mapApiKeyClient}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="title-color d-flex">Map API Key (Server)</label>
              <input
                type="text"
                placeholder="Map API Key (Server)"
                className="form-control outline-none hover:border-primary"
                name="mapApiKeyServer"
                value={formData.mapApiKeyServer}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3">
          <button
            type="reset"
            className="btn btn-secondary px-5"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark"
            style={{ color: "white" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MapApiSetup;
