import React from "react";
const SoftwareUpdate = () => {
  return (
    <div className="content container-fluid gap-7 flex flex-col">
      <div className="d-flex gap-2 mb-3">
        <img
          width="16"
          src="https://6valley.6amtech.com/public/assets/back-end/img/settings.png"
          alt=""
        />
        <h5 className="mb-0">Upload The Updated File</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/web-config/app-settings"
            method="post"
          >
            <input
              type="hidden"
              name="_token"
              value="Twvhv0EJYa0GUycFmHJFzLVQRODPOpx9nQxb0DbE"
              autoComplete="off"
            />
            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                    alt=""
                  />
                  <h5 className="mb-0 text-capitalize">Codecanyon Username</h5>
                </div>
                <input
                  type="text"
                  name="min_version"
                  id="min_version"
                  className="form-control outline-none hover:border-primary"
                  value=""
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                    alt=""
                  />
                  <h5 className="mb-0 text-capitalize">Purchase Code</h5>
                </div>
                <input
                  type="text"
                  name="ios_version"
                  id="ios_version"
                  className="form-control outline-none hover:border-primary"
                  value=""
                />
              </div>

              <div className="col-md-12 mt-6 p-2 flex items-center">
                {/* <div className="d-flex align-items-center gap-2 mb-3">
                                    <img width="22" src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png" alt="" />
                                    <h5 className="mb-0 text-capitalize">ios minimum version</h5>
                                </div> */}
                <input
                  type="file"
                  name="file"
                  id="ios_version"
                  className="form-control outline-none hover:border-primary"
                  value=""
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 bg-primary hover:bg-primary-dark mt-2 ripple-surface"
              style={{ color: "white" }}
            >
              save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoftwareUpdate;
