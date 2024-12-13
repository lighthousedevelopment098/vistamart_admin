import React from "react";

const CompanyInformationForm = ({ companyInfo, onInputChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value); // Pass the name and value up to the parent component
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h5 className="mb-0 text-capitalize d-flex gap-1">
          <h1 className="text-sm font-bold">Company Information</h1>
        </h5>
      </div>
      <div className="card-body">
        <div className="row">
          {/* Company Name */}
          <div className="col-sm-6 col-lg-4">
            <div className="form-group">
              <label className="title-color d-flex">Company Name</label>
              <input
                className="form-control outline-none hover:border-primary"
                type="text"
                name="companyName"
                value={companyInfo?.companyName || ""}
                placeholder="Enter company name"
                onChange={handleChange} // Attach the onChange handler
              />
            </div>
          </div>

          {/* Phone */}
          <div className="col-sm-6 col-lg-4">
            <div className="form-group">
              <label className="title-color d-flex">Phone</label>
              <input
                className="form-control outline-none hover:border-primary"
                type="text"
                name="phone"
                value={companyInfo?.phone || ""}
                placeholder="Enter phone number"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-sm-6 col-lg-4">
            <div className="form-group">
              <label className="title-color d-flex">Email</label>
              <input
                className="form-control outline-none hover:border-primary"
                type="email"
                name="email"
                value={companyInfo?.email || ""}
                placeholder="Enter company email"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Country */}
          <div className="col-sm-6 col-lg-4">
            <div className="form-group">
              <label className="title-color d-flex">Country</label>
              <select
                id="country"
                name="country"
                className="form-control outline-none hover:border-primary"
                value={companyInfo?.country || ""}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="Canada">PK</option>
                {/* <option value="USA">USA</option>
                <option value="UK">United Kingdom</option> */}
              </select>
            </div>
          </div>

          {/* Timezone */}
          <div className="col-sm-6 col-lg-4">
            <div className="form-group">
              <label className="title-color d-flex">Time Zone</label>
              <select
                name="timezone"
                className="form-control outline-none hover:border-primary"
                value={companyInfo?.timezone || ""}
                onChange={handleChange}
              >
                <option value="">Select Time Zone</option>
                <option value="America/Toronto">(GMT-5:00) Toronto</option>
                <option value="America/New_York">(GMT-5:00) New York</option>
                <option value="Europe/London">(GMT+0:00) London</option>
              </select>
            </div>
          </div>

          {/* Language */}
          <div className="col-sm-6 col-lg-4">
            <div className="form-group">
              <label className="title-color d-flex">Language</label>
              <select
                name="language"
                className="form-control outline-none hover:border-primary"
                value={companyInfo?.language || ""}
                onChange={handleChange}
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                {/* <option value="French">French</option>
                <option value="Spanish">Spanish</option> */}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationForm;
