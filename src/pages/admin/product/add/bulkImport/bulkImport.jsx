import React, { useState } from "react";
const BulkImport = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleReset = () => {
    setFile(null);
    document.getElementById("bulkImportForm").reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }
    const formData = new FormData();
    formData.append("products_file", file);
    formData.append("_token", "ChWFIlGtnDfQo1PE6cDKl9lLWLOyMQwknpw3ZBtZ");

    fetch("https://6valley.6amtech.com/admin/products/bulk-import", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <div className="content container-fluid snipcss-cx7xo">
      <div className="mb-4">
        <h2 className="h1 mb-1 text-capitalize d-flex gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/bulk-import.png"
            alt=""
          />{" "}
          Bulk Import
        </h2>
      </div>
      <div className="row text-start">
        <div className="col-12">
          <div className="card card-body">
            <h1 className="display-5">Instructions :</h1>
            <p>1. Download the format file and fill it with proper data.</p>
            <p>
              2. You can download the example file to understand how the data
              must be filled.
            </p>
            <p>
              3. Once you have downloaded and filled the format file, Upload it
              in the form below and submit.
            </p>
            <p>
              4. After uploading products you need to edit them and set product
              images and choices.
            </p>
            <p>
              5. You can get brand and category id from their list please input
              the right ids.
            </p>
            <p>
              6. You can upload your product images in product folder from
              gallery and copy image path.
            </p>
          </div>
        </div>
        <div className="col-md-12 mt-2">
          <form
            id="bulkImportForm"
            className="product-form"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="_token"
              value="ChWFIlGtnDfQo1PE6cDKl9lLWLOyMQwknpw3ZBtZ"
            />
            <div className="card rest-part">
              <div className="px-3 py-4 d-flex flex-wrap align-items-center gap-10 justify-content-center">
                <h4 className="mb-0">Do not have the template ?</h4>
                <a
                  href="https://6valley.6amtech.com/public/assets/product_bulk_format.xlsx"
                  download
                  className="btn-link text-capitalize fz-16 font-weight-medium"
                >
                  Download here
                </a>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <div className="uploadDnD">
                        <div
                          className="form-group inputDnD input_image input_image_edit"
                          data-title="Drag & drop file or browse file"
                        >
                          <input
                            type="file"
                            name="products_file"
                            accept=".xlsx, .xls"
                            className="form-control-file text-primary-500 font-weight-bold action-upload-section-dot-area"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-10 align-items-center justify-content-end">
                  <button
                    type="button"
                    className="btn border border-secondary-500 bg-secondary-500 px-4 action-onclick-reload-page"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-4"
                    style={{ color: "white" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkImport;
