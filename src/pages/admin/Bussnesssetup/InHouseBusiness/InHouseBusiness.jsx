import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs"; // Example React icon
import { FiImage } from "react-icons/fi"; // Placeholder icon for image
import "./Inhouse.css";
const InHouseBusiness = () => {
  return (
    <div className="content container-fluid snipcss-Wtfkc">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          {/* Replace img tag with a React icon or an image */}
          <FiImage size={24} /> Business Setup
        </h2>
        <div className="btn-group">
          <div
            className="ripple-animation"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <BsThreeDotsVertical size={18} />
          </div>
          <div className="dropdown-menu dropdown-menu-right bg-aliceblue border border-color-primary-light p-4 dropdown-w-lg">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FiImage width={20} /> {/* Replace img tag with React icon */}
              <h5 className="text-primary-500 mb-0">Note</h5>
            </div>
            <p className="title-color font-weight-medium mb-0">
              Please click the Save button below to save all the changes
            </p>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <form
            action="https://6valley.6amtech.com/admin/product-settings/inhouse-shop-temporary-close"
            method="post"
            id="temporary-close-form"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
            />
            <div className="border rounded border-color-c1 px-4 py-3 d-flex justify-content-between mb-1">
              <h5 className="mb-0 d-flex gap-1 c1"> Temporary close </h5>
              <div className="position-relative">
                <label className="switcher">
                  <input
                    type="checkbox"
                    className="switcher_input toggle-switch-message"
                    name="status"
                    id="temporary-close"
                    value="1"
                    data-modal-id="toggle-status-modal"
                    data-toggle-id="temporary-close"
                    data-on-image="store-temporary-close-on.png"
                    data-off-image="store-temporary-close-off.png"
                    data-on-title="Want to Turn ON the Temporary Close option"
                    data-off-title="Want to Turn OFF the Temporary Close option"
                    data-on-message="<p>If enabled admin can temporarily pause his shop activities</p>"
                    data-off-message="<p>If disabled this feature will be hidden from the system</p>"
                  />
                  <span className="switcher_control"></span>
                </label>
              </div>
            </div>
            <p>
              *By turning on the "Temporary Close” Button admin can pause his
              shop activities and his shop will be shown as "Temporary Close” In
              the system. Customers will not be able to order or purchase from
              his shop
            </p>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3 justify-content-between mb-4">
            <div className="d-flex flex-column gap-1">
              <h3 className="mb-0 d-flex gap-2 flex-wrap">Shop details</h3>
              <p className="mb-0">Created at 13 Jun, 2023</p>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <button
                className="btn btn-outline--primary"
                data-toggle="modal"
                data-target="#vacation_mode_modal"
              >
                {" "}
                Go to Vacation Mode{" "}
              </button>
              <a
                href="https://6valley.6amtech.com/admin/product-settings/inhouse-shop"
                className="btn px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500 d-flex gap-2 align-items-center"
                style={{ color: "white" }}
              >
                Back
              </a>
            </div>
          </div>
          <div className="mt-5">
            <form
              action="https://6valley.6amtech.com/admin/product-settings/inhouse-shop"
              method="POST"
              encType="multipart/form-data"
            >
              <input
                type="hidden"
                name="_token"
                value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
                autoComplete="off"
              />
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <img
                      className="upload-img-view upload-img-view__banner"
                      id="viewerBanner"
                      src="https://6valley.6amtech.com/storage/app/public/shop/2023-06-14-64886fc2abca5.png"
                      alt="Shop Banner"
                    />
                  </div>
                  <div className="position-relative mt-4">
                    <div className="d-flex gap-1 align-items-center title-color mb-2">
                      {" "}
                      Shop cover image{" "}
                      <span className="text-info">
                        Ratio 4:1 (2000 x 500 px)
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="shop_banner"
                        data-preview="#viewerBanner"
                        className="custom-file-input image-preview-before-upload"
                        accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileUploadShop"
                      >
                        {" "}
                        Choose File{" "}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-30">
                <button
                  type="submit"
                  className="btn px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500 "
                  style={{ color: "white" }}
                >
                  {" "}
                  Save information{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="vacation_mode_modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content text-start">
            <form
              action="https://6valley.6amtech.com/admin/product-settings/vacation-add"
              method="post"
            >
              <input
                type="hidden"
                name="_token"
                value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
                autoComplete="off"
              />
              <div className="modal-header border-bottom pb-2">
                <div>
                  <h5 className="modal-title" id="exampleModalLabel">
                    Vacation Mode
                  </h5>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="switcher">
                      <input
                        type="checkbox"
                        name="status"
                        className="switcher_input"
                        id="vacation_close"
                      />
                      <span className="switcher_control"></span>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="close pt-0"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                <div className="mb-5">
                  * Set vacation mode for shop means you will be not available
                  to receive orders and provide products for placed orders at
                  that time.
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Vacation Start</label>
                    <input
                      type="date"
                      name="vacation_start_date"
                      id="inhouse-vacation-start-date"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Vacation End</label>
                    <input
                      type="date"
                      name="vacation_end_date"
                      id="inhouse-vacation-end-date"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-12 mt-2">
                    <label>Vacation Note</label>
                    <textarea
                      className="form-control"
                      name="vacation_note"
                      id="vacation_note"
                    ></textarea>
                  </div>
                </div>
                <div className="text-end gap-5 mt-2">
                  <button
                    type="button"
                    className="btn btn-secondary-500"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn bg-primary-500">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InHouseBusiness;
