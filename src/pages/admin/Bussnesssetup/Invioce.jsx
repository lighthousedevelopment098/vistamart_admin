import React, { useState } from "react";
const InvoiceSettings = () => {
  const [selectedMultipleImage, setSelectedMultipleImage] = useState([]);
  const [formData, setFormData] = useState({
    terms_and_condition: "",
    business_identity: "",
    business_identity_value: "",
    image: null,
  });

  // Handle form inputs change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Get selected files
    const imageUrls = files.map((file) => URL.createObjectURL(file)); // Create URLs for display
    setSelectedMultipleImage(imageUrls); // Update state with image URLs
  };


  return (
    <div className="card snipcss-Of6G1">
      <div className="border-bottom px-4 py-3">
        <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/header-logo.png"
            alt="Invoice Logo"
          />{" "}
          Invoice settings
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} id="update-invoice-settings">
          <input
            type="hidden"
            name="_token"
            value="1I376oev7rTjCrynaBneLy7MPY6CaQg4Qg2KcjWg"
            autoComplete="off"
          />
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="title-color text-capitalize">
                  Terms &amp; Condition
                </label>
                <input
                  type="text"
                  name="terms_and_condition"
                  value={formData.terms_and_condition}
                  onChange={handleChange}
                  className="form-control"
                  id="terms_and_condition"
                  placeholder="Terms &amp; Condition"
                />
              </div>
              <div className="form-group mb-3">
                <div className="d-flex flex-wrap gap-3">
                  <label className="title-color text-capitalize">
                    Business identity
                  </label>
                  <div className="d-flex gap-3 flex-wrap ml-auto">
                    <label className="form--check">
                      <input
                        type="radio"
                        name="business_identity"
                        className="business-identity form--check-input"
                        value="Tax ID"
                        onChange={handleChange}
                      />
                      <span className="form--check-label">Tax Id</span>
                    </label>
                    <label className="form--check">
                      <input
                        type="radio"
                        name="business_identity"
                        className="business-identity form--check-input"
                        value="Bin Number"
                        onChange={handleChange}
                      />
                      <span className="form--check-label">Bin Number</span>
                    </label>
                    <label className="form--check">
                      <input
                        type="radio"
                        name="business_identity"
                        className="business-identity form--check-input"
                        value="Musak"
                        onChange={handleChange}
                      />
                      <span className="form--check-label">Musak</span>
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  name="business_identity_value"
                  value={formData.business_identity_value}
                  onChange={handleChange}
                  className="form-control"
                  id="business-identity-value"
                  placeholder="Enter"
                />
              </div>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center">
    <div>
      <div className="flex gap-2">
      <label className="text-sm  text-gray-700">
        Invoice Logo
      </label>
      <h3 className="">(1000 x 308Px)</h3>
      </div>
      <div className="flex flex-wrap gap-4 relative">
        {/* If images are selected, render them; otherwise, show empty box */}
        {selectedMultipleImage.length > 0 ? (
          selectedMultipleImage.map((image, index) => (
            <div
              key={index}
              className="relative border-dashed border-2 border-green-300 h-full w-full sm:w-[32vw] sm:h-[20vh] md:w-[40vw] md:h-[32vh] lg:w-[32vw] lg:h-[20vh] rounded flex items-center justify-center"
            >
              <img
                src={image}
                alt={`Selected ${index + 1}`}
                className="h-[20vh] w-[32vw] object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <label
            htmlFor="multipleImageInput"
            className="border-dashed border-2 border-green-500 text-green-500 h-full w-full sm:w-[60vw] sm:h-[30vh] md:w-[40vw] md:h-[32vh] lg:w-[32vw] lg:h-[20vh] rounded flex items-center justify-center  cursor-pointer"
          >
            Drag and drop file or Browse file
          </label>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        id="multipleImageInput"
        onChange={handleImageChange}
        multiple
        className="hidden"
      />
    </div>
            </div>
            <div className="col-md-12 d-flex justify-content-end gap-3">
              <button
                type="submit"
                className="btn bg-primary  hover:bg-primary-dark px-4 py-2 form-submit"
                style={{color:"white"}}
                data-form-id="update-invoice-settings"
                data-message="Want update this invoice settings?"
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

export default InvoiceSettings;
