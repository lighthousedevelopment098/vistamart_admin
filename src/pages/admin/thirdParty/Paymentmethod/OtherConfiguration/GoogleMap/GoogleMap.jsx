import React, { useState } from "react";

const GoogleMapAnalyticsForm = () => {
  const [pixelId, setPixelId] = useState("");
  const [tagManagerId, setTagManagerId] = useState("");

  const handlePixelIdSave = () => {
    // Handle Pixel ID save logic here
    console.log("Pixel ID:", pixelId);
  };

  const handleTagManagerIdSave = () => {
    // Handle Tag Manager ID save logic here
    console.log("Tag Manager ID:", tagManagerId);
  };

  return (
    <div className="content container-fluid snipcss-ZxQnF">
      <div className="row gy-3">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <form
                action="javascript:"
                method="post"
                encType="multipart/form-data"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
                  autoComplete="off"
                />
                <div className="form-group">
                  <label className="title-color d-flex">
                    Pixel analytics your pixel id
                  </label>
                  <input type="hidden" name="type" value="pixel_analytics" />
                  <textarea
                    type="text"
                    placeholder="Pixel analytics your pixel id from facebook"
                    className="form-control outline-none hover:border-primary"
                    name="value"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark call-demo"
                    style={{color:"white"}}
                    onClick={handlePixelIdSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <form
                action="javascript:"
                method="post"
                encType="multipart/form-data"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7"
                  autoComplete="off"
                />
                <div className="form-group">
                  <label className="title-color d-flex">
                    Google tag manager id
                  </label>
                  <input
                    type="hidden"
                    name="type"
                    value="google_tag_manager_id"
                  />
                  <textarea
                    type="text"
                    placeholder="Google tag manager script id from google"
                    className="form-control outline-none hover:border-primary"
                    name="value"
                    value={tagManagerId}
                    onChange={(e) => setTagManagerId(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn px-4 py-2 bg-primary  hover:bg-primary-dark call-demo"
                    style={{color:"white"}}
                    onClick={handleTagManagerIdSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapAnalyticsForm;
