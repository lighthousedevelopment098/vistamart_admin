import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const OtpLoginSettings = () => {
  return (
    <div className="col-md-12 snipcss-izPKE">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center gap-2">
            <img
              width="20"
              src="https://6valley.6amtech.com/public/assets/back-end/img/otp.png"
              alt="otp icon"
            />
            <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
              OTP & login settings
            </h5>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="form-group">
                <label
                  className="input-label flex items-center gap-1"
                  htmlFor="maximum_otp_hit"
                >
                  Maximum OTP hit{" "}
                  <FaInfoCircle
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Set how many times a user can hit the wrong OTPs. After reaching this limit the user will be blocked for a time."
                  />
                </label>
                <input
                  type="number"
                  min="0"
                  defaultValue="5"
                  name="maximum_otp_hit"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="Ex: 5"
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="form-group">
                <label
                  className="input-label flex items-center gap-1"
                  htmlFor="otp_resend_time"
                >
                  OTP resend time <small>(Sec)</small>{" "}
                  <FaInfoCircle
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Set the time for requesting a new OTP."
                  />
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="30"
                  name="otp_resend_time"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="Ex: 30"
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="form-group">
                <label
                  className="input-label flex items-center gap-1"
                  htmlFor="temporary_block_time"
                >
                  Temporary block time <small>(Sec)</small>{" "}
                  <FaInfoCircle
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Within this time users can not make OTP requests again."
                  />
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="120"
                  name="temporary_block_time"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="Ex: 120"
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="form-group">
                <label
                  className="input-label flex items-center gap-1"
                  htmlFor="maximum_login_hit"
                >
                  Maximum Login hit{" "}
                  <FaInfoCircle
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Set the maximum unsuccessful login attempts users can make using wrong passwords. After reaching this limit they will be blocked for a time."
                  />
                </label>
                <input
                  type="number"
                  min="0"
                  defaultValue="10"
                  name="maximum_login_hit"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="Ex: 10"
                  required
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="form-group">
                <label
                  className="input-label flex items-center gap-1"
                  htmlFor="temporary_login_block_time"
                >
                  Temporary login block time <small>(Sec)</small>{" "}
                  <FaInfoCircle
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Set a time duration during which users cannot log in after reaching the Maximum Login Hit limit."
                  />
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue="120"
                  name="temporary_login_block_time"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="Ex: 120"
                  required
                />
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <button type="reset" className="btn btn-secondary px-5">
              Reset
            </button>
            <button
              type="button"
              className="btn px-4 py-2 bg-primary-500 hover:bg-primary-dark-500  call-demo"
              style={{ color: "white" }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpLoginSettings;
