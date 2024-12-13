
import React from "react";

const SubCategoryForm = ({
  formData,
  categories,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <label className="title-color" htmlFor="subCategoryName">
                Sub Category Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                id="subCategoryName"
                placeholder="New Sub Category"
              />
              <input type="hidden" name="hiddenField" value="someValue" />
              <input name="position" value="1" className="d-none" />
            </div>

            <div className="form-group col-md-6 col-lg-4">
              <label className="title-color" htmlFor="mainCategory">
                Main Category <span className="text-danger">*</span>
              </label>
              <select
                id="mainCategory"
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="" disabled>
                  Select main category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-6 col-lg-4">
              <label className="title-color" htmlFor="priority">
                Priority
              </label>
              <select
                className="form-control"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                id="priority"
                required
              >
                <option value="" disabled>
                  Set Priority
                </option>
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 justify-content-end">
     
        <button
          type="submit"
          className="btn bg-primary text-white hover:bg-primary-dark hover:text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubCategoryForm;
