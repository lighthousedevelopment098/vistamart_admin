import React, { useState } from "react";
const AppSettings = () => {
  const [androidVersion1, setAndroidVersion1] = useState("");
  const [iosVersion1, setIosVersion1] = useState("");
  const [androidVersion2, setAndroidVersion2] = useState("");
  const [iosVersion2, setIosVersion2] = useState("");
  const [androidMinVersion1, setAndroidMinVersion1] = useState("");
  const [iosMinVersion1, setIosMinVersion1] = useState("");
  const [androidMinVersion2, setAndroidMinVersion2] = useState("");
  const [iosMinVersion2, setIosMinVersion2] = useState("");
  const [androidMinVersionA, setAndroidMinVersionA] = useState("");
  const [iosMinVersionA, setIosMinVersionA] = useState("");
  const [androidMinVersionB, setAndroidMinVersionB] = useState("");
  const [iosMinVersionB, setIosMinVersionB] = useState("");

  // Handle form submission
 // Handle form submission
 const handleSave1 = () => {
  const formData1 = {
    androidVersion1,
    iosVersion1,
    androidVersion2,
    iosVersion2,
  };
  console.log("Form Data 1 Saved:", formData1);
  // You can add API call or other save logic here for formData1
};

// Handle form submission for the second data set
const handleSave2 = () => {
  const formData2 = {
    androidMinVersion1,
    iosMinVersion1,
    androidMinVersion2,
    iosMinVersion2,
  };
  console.log("Form Data 2 Saved:", formData2);
  // You can add API call or other save logic here for formData2
};

// Handle form submission for the third data set
const handleSave3 = () => {
  const formData3 = {
    androidMinVersionA,
    iosMinVersionA,
    androidMinVersionB,
    iosMinVersionB,
  };
  console.log("Form Data 3 Saved:", formData3);
  // You can add API call or other save logic here for formData3
};
  return (
    <div className="content container-fluid gap-7 flex flex-col p-2">
      <div className="d-flex gap-2 mb-3">
        <img
          width="16"
          src="https://6valley.6amtech.com/public/assets/back-end/img/settings.png"
          alt=""
        />
        <h5 className="mb-0">User app version control</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <form >
            <div className="row g-2">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                    alt="android"
                  />
                  <h5 className="mb-0 text-capitalize">
                    android minimum version
                  </h5>
                </div>
                <input
                  type="text"
                  name="min_version1"
                  id="min_version1"
                  className="form-control outline-none hover:border-primary"
                  value={androidVersion1}
                  onChange={(e) => setAndroidVersion1(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  {/* <img
                width="22"
                src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                alt="ios"
              /> */}
                  <h5 className="mt-1 text-capitalize">ios minimum version</h5>
                </div>
                <input
                  type="text"
                  name="ios_version1"
                  id="ios_version1"
                  className="form-control outline-none hover:border-primary"
                  value={iosVersion1}
                  onChange={(e) => setIosVersion1(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                    alt="android"
                  />
                  <h5 className="mb-0 text-capitalize">
                    android minimum version
                  </h5>
                </div>
                <input
                  type="text"
                  name="min_version2"
                  id="min_version2"
                  className="form-control outline-none hover:border-primary"
                  value={androidVersion2}
                  onChange={(e) => setAndroidVersion2(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  {/* <img
                width="22"
                src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                alt="ios"
              /> */}
                  <h5 className="mt-1 text-capitalize">ios minimum version</h5>
                </div>
                <input
                  type="text"
                  name="ios_version2"
                  id="ios_version2"
                  className="form-control outline-none hover:border-primary"
                  value={iosVersion2}
                  onChange={(e) => setIosVersion2(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn px-4 py-2 mt-2 bg-primary text-white hover:bg-primary-dark ripple-surface"
              style={{ color: "white" }}
              onClick={handleSave1}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <img
          width="16"
          src="https://6valley.6amtech.com/public/assets/back-end/img/settings.png"
          alt=""
        />
        <h5 className="mb-0">Vendor app version control</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <form >
            <div className="row g-2">
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                    alt="android"
                  />
                  <h5 className="mb-0 text-capitalize">
                    android minimum version
                  </h5>
                </div>
                <input
                  type="text"
                  name="android_min_version1"
                  id="android_min_version1"
                  className="form-control outline-none hover:border-primary"
                  value={androidMinVersion1}
                  onChange={(e) => setAndroidMinVersion1(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  {/* <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                    alt="ios"
                  /> */}
                  <h5 className="mt-1 text-capitalize">ios minimum version</h5>
                </div>
                <input
                  type="text"
                  name="ios_min_version1"
                  id="ios_min_version1"
                  className="form-control outline-none hover:border-primary"
                  value={iosMinVersion1}
                  onChange={(e) => setIosMinVersion1(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                    alt="android"
                  />
                  <h5 className="mb-0 text-capitalize">
                    android minimum version
                  </h5>
                </div>
                <input
                  type="text"
                  name="android_min_version2"
                  id="android_min_version2"
                  className="form-control outline-none hover:border-primary"
                  value={androidMinVersion2}
                  onChange={(e) => setAndroidMinVersion2(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center gap-2 mb-3">
                  {/* <img
                    width="22"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                    alt="ios"
                  /> */}
                  <h5 className="mt-1 text-capitalize">ios minimum version</h5>
                </div>
                <input
                  type="text"
                  name="ios_min_version2"
                  id="ios_min_version2"
                  className="form-control outline-none hover:border-primary"
                  value={iosMinVersion2}
                  onChange={(e) => setIosMinVersion2(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn px-4 py-2 mt-2 bg-primary text-white hover:bg-primary-dark ripple-surface"
              style={{ color: "white" }}
              onClick={handleSave2}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      <div className="d-flex gap-2 mb-1">
        <img
          width="16"
          src="https://6valley.6amtech.com/public/assets/back-end/img/settings.png"
          alt=""
        />
        <h5 className="mb-0">Delivery man app version control</h5>
      </div>
      <div className="card">
      <div className="card-body">
      <form >
        <div className="row g-2">
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                width="22"
                src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                alt="android"
              />
              <h5 className="mb-0 text-capitalize">android minimum version</h5>
            </div>
            <input
              type="text"
              name="min_version_a"
              id="min_version_a"
              className="form-control outline-none hover:border-primary"
              value={androidMinVersionA}
              onChange={(e) => setAndroidMinVersionA(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              {/* <img
                width="22"
                src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                alt="ios"
              /> */}
              <h5 className=" text-capitalize mt-1">ios minimum version</h5>
            </div>
            <input
              type="text"
              name="ios_version_a"
              id="ios_version_a"
              className="form-control outline-none hover:border-primary"
              value={iosMinVersionA}
              onChange={(e) => setIosMinVersionA(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                width="22"
                src="https://6valley.6amtech.com/public/assets/back-end/img/android.png"
                alt="android"
              />
              <h5 className="mb-0 text-capitalize">android minimum version</h5>
            </div>
            <input
              type="text"
              name="min_version_b"
              id="min_version_b"
              className="form-control outline-none hover:border-primary"
              value={androidMinVersionB}
              onChange={(e) => setAndroidMinVersionB(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              {/* <img
                width="22"
                src="https://6valley.6amtech.com/public/assets/back-end/img/ios.png"
                alt="ios"
              /> */}
              <h5 className="mt-1 text-capitalize">ios minimum version</h5>
            </div>
            <input
              type="text"
              name="ios_version_b"
              id="ios_version_b"
              className="form-control outline-none hover:border-primary"
              value={iosMinVersionB}
              onChange={(e) => setIosMinVersionB(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn px-4 py-2 mt-2 bg-primary text-white hover:bg-primary-dark ripple-surface"
          style={{ color: "white" }}
          onClick={handleSave3}
        >
          Save Changes
        </button>
      </form>
    </div>
      </div>
    </div>
  );
};

export default AppSettings;
