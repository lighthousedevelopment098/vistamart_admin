import React, { useCallback, useState } from "react";

const CategoryForm = ({
  selectedLang,
  newCategory,
  onInputChange,
  onFileChange,
  onSubmit,
  setSelectedFile,
}) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } else {
        setPreview(null);
        onFileChange(""); // Reset if no file is selected
      }
    },
    [onFileChange]
  );

  return (
    <div className="card p-6">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-6">
            {["en", "sa", "bd", "in"].map((lang) => (
              <div
                className={`form-group ${
                  selectedLang === lang ? "" : "d-none"
                } form-system-language-form`}
                key={lang}
                id={`${lang}-form`}
              >
                <label className="title-color">
                  Category Name<span className="text-danger">*</span> (
                  {lang.toUpperCase()})
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="New Category"
                  required={lang === "en"} // Required only for English
                  value={newCategory.name}
                  onChange={onInputChange}
                />
              </div>
            ))}
            <div className="form-group">
              <label className="title-color" htmlFor="priority">
                Priority
              </label>
              <select
                className="form-control outline-none hover:border-primary-500"
                name="priority"
                required
                value={newCategory.priority}
                onChange={onInputChange}
              >
                <option disabled>Set Priority</option>
                {[...Array(11).keys()].map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="title-color">Category Logo</label>
              <span className="text-info">
                <span className="text-danger">*</span> Ratio 1:1 (500 x 500 px)
              </span>
              <div className="custom-file text-left">
                <input
                  type="file"
                  name="logo"
                  id="category-image"
                  className="custom-file-input"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                />
                <label className="custom-file-label" htmlFor="category-image">
                  Choose File
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
            <div className="form-group flex justify-center items-center">
              <div className="text-center flex justify-center items-center ">
                <img
                  className="upload-img-view"
                  id="viewer"
                  alt=""
                  src={
                    preview ||
                    "https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
                  }
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2 justify-content-end w-full p-3">
            <button
              type="reset"
              id="reset"
              className="btn bg-secondary-500 text-white border border-secondary-500 rounded-md"
              onClick={() => setPreview(null)} // Clear preview on reset
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn bg-primary-500 hover:bg-primary-dark-500 text-white"
              style={{ color: "white" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CategoryForm);
