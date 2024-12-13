import React, { useState, useEffect } from "react";
import { FaDownload, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import ActionButton from "../../../../components/ActionButton/Action";
import ExportButton from "../../../../components/ActionButton/Export";
import {
  addSubSubCategory,
  deleteSubSubCategory,
  fetchCategories,
  fetchSubCategories,
  fetchSubSubCategories,
  selectCategories,
  selectSubCategories,
  selectSubSubCategories,
} from "../../../../redux/slices/admin/categorybrandSlice";
import Pagination from "../../../../components/Pagination";

const Sub_Sub_Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const subCategories = useSelector(selectSubCategories);
  const subSubCategories = useSelector(selectSubSubCategories);

  const [formData, setFormData] = useState({
    name: "",
    mainCategory: "",
    subCategory: "",
    priority: "",
  });
  const [activeTab, setActiveTab] = useState("en");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
    dispatch(fetchSubSubCategories({})).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (formData.mainCategory) {
      dispatch(fetchSubCategories(formData.mainCategory));
    }
  }, [formData.mainCategory, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addSubSubCategory(formData));
      Swal.fire(
        "Success!",
        "Sub-sub-category created successfully.",
        "success"
      );

      setFormData({
        name: "",
        mainCategory: "",
        subCategory: "",
        priority: "",
      });

      dispatch(fetchCategories());
      dispatch(fetchSubCategories());
      dispatch(fetchSubSubCategories({}));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error creating sub-sub-category:", error);
      Swal.fire("Error!", "Failed to create sub-sub-category.", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabClick = (lang) => {
    setActiveTab(lang);
  };

  const handleDelete = (subSubCategoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this sub-sub-category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteSubSubCategory(subSubCategoryId));
          Swal.fire(
            "Deleted!",
            "Your sub-sub-category has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting sub-sub-category:", error);
          Swal.fire("Error!", "Failed to delete sub-sub-category.", "error");
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredSubSubCategories = subSubCategories.doc.filter((item) => {
    const mainCategoryName =
      categories.find((cat) => cat._id === item.mainCategory)?.name || "";
    const subCategoryName =
      subCategories.find((subCat) => subCat._id === item.subCategory)?.name ||
      "";
    return (
      mainCategoryName.toLowerCase().includes(searchValue.toLowerCase()) ||
      subCategoryName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubSubCategories = filteredSubSubCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredSubSubCategories.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="content container-fluid snipcss-TxIci">
      <div className="mb-3">
        <h2 className="h1  mb-0 d-flex gap-2">
          <img src="/brand-setup.png" alt="Sub Sub Category Setup" />
          Sub Sub Category Setup
        </h2>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body text-start">
              <form onSubmit={handleSubmit}>
                <ul className="nav nav-tabs w-fit-content mb-4">
                  {["en", "sa", "bd", "in"].map((lang) => (
                    <li className="nav-item" key={lang}>
                      <span
                        className={`nav-link form-system-language-tab cursor-pointer ${
                          activeTab === lang ? "active" : ""
                        }`}
                        onClick={() => handleTabClick(lang)}
                      >
                        {lang === "en"
                          ? "English"
                          : lang === "sa"
                          ? "Arabic"
                          : lang === "bd"
                          ? "Bangla"
                          : "Hindi"}
                        ({lang.toUpperCase()})
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        {["en", "sa", "bd", "in"].map((lang) => (
                          <div
                            key={lang}
                            className={`form-group form-system-language-form ${
                              activeTab === lang ? "" : "d-none"
                            }`}
                          >
                            <label
                              className="title-color"
                              htmlFor={`subSubCategoryName-${lang}`}
                            >
                              Sub sub category name{" "}
                              <span className="text-danger">*</span> (
                              {lang.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData._id}
                              onChange={handleChange}
                              className="form-control"
                              id={`subSubCategoryName-${lang}`}
                              placeholder="New Sub Sub Category"
                            />
                            <input type="hidden" name="lang[]" value={lang} />
                          </div>
                        ))}
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
                        <label className="title-color" htmlFor="subCategory">
                          Sub Category <span className="text-danger">*</span>
                        </label>
                        <select
                          id="subCategory"
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option value="" disabled>
                            Select sub category
                          </option>
                          {subCategories.map((subCategory) => (
                            <option
                              key={subCategory._id}
                              value={subCategory._id}
                            >
                              {subCategory.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div className="form-group col-md-6 col-lg-4">
                        <label className="title-color" htmlFor="priority">
                          Priority
                        </label>
                        <input
                          type="number"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="form-control"
                          id="priority"
                          placeholder="1"
                          min="1"
                        />
                      </div> */}

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
                    <div className="form-group col-md-12 col-lg-4 justify-end flex">
                      <button
                        type="submit"
                        style={{ color: "white" }}
                        className="btn bg-primary  text-white hover:bg-primary-dark hover:text-white"
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
      </div>

      <div className="row mt-4">
        <div className="col-md-12 p-6">
          <div className="card">
            <div className="d-flex  p-6 flex-wrap justify-content-between align-items-center border-bottom pb-2 mb-3">
              <div>
                <h5 className="d-flex text-[1rem] font-semibold align-items-center text-capitalize gap-2 mb-2">
                  {/* <img src="/sub-category.png" alt="Sub Sub Category List" /> */}
                  Sub Sub Category Table
                  <span className="badge badge-soft-dark radius-50 fz-12">
                    {subSubCategories?.doc?.length}
                  </span>
                </h5>
              </div>
              <div className="d-flex flex-wrap justify-content-end">
                <form className="mr-3">
                  <div className="input-group input-group-merge input-group-flush">
                    <div className="input-group input-group-merge input-group-custom border border-primary">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FaSearch />
                        </div>
                      </div>
                      <input
                        type="search"
                        name="searchValue"
                        className="form-control outline-none border border-primary"
                        placeholder="Search by Subcategory or Main Category"
                        value={searchValue}
                        onChange={handleSearchChange}
                      />
                      <button
                        type="button"
                        onClick={handleSearchChange}
                        className="rounded-r-md px-4 py-2 bg-primary text-white hover:bg-primary-dark"
                        style={{ color: "white" }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
                <div id="datatableCounterInfo" className="mr-2 d-none">
                  <div className="d-flex align-items-center">
                    <span className="font-size-sm mr-3">
                      <span id="datatableCounter">0</span>
                      Selected
                    </span>
                    <ActionButton
                      // onClick={() => handleDelete(subCategory._id)}
                      icon={FaTrash} // Pass dynamic icon
                      className="ml-4"
                      // label="Delete"
                    />
                    {/* <button className="btn btn-sm btn-outline-danger">
                      <i className="tio-delete-outlined" /> Delete
                    </button> */}
                  </div>
                </div>
                <div className="hs-unfold">
                  <ExportButton
                    data={filteredSubSubCategories}
                    filename="refundList" // Optional filename for the exported file
                    icon={FaDownload} // Icon for the button
                    label="Export " // Button label
                    className="bg-primary text-white hover:bg-primary-dark" // Tailwind classes for styling
                    style={{ color: "white" }} // Optional inline styles
                  />
                </div>
              </div>
            </div>
            <div className="card-body text-start overflow-x-scroll">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>Sub Sub Category Name</th>
                    <th>Main Category</th>
                    <th>Sub Category</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubSubCategories.map((subSubCategory) => (
                    <tr key={subSubCategory._id}>
                      {/* <td className="table-column-pr-0">
                          <div className="custom-control custom-checkbox">
                            <input id={`datatableCheck-${index}`} type="checkbox" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor={`datatableCheck-${index}`} />
                          </div>
                        </td> */}
                      {/* <td className="table-column-pl-0">{index + 1}</td> */}
                      <td>{subSubCategory.name}</td>
                      {/* {console.log("sucbcategories----------",subSubCategories)} */}
                      <td>{subSubCategory.mainCategory?.name || "N/A"}</td>
                      <td>{subSubCategory.subCategory?.name || "N/A"}</td>
                      <td>{subSubCategory?.priority || "0"}</td>
                      <td className="text-center">
                        {/* <ActionButton
                          to={`/edit-sub-sub-category/${subSubCategory._id}`}
                          icon={FaEdit} // Pass dynamic icon
                          className="ml-4"
                          // label="View"
                        /> */}
                        <ActionButton
                          onClick={() => handleDelete(subSubCategory._id)}
                          icon={FaTrash} // Pass dynamic icon
                          className="ml-4"
                          // label="Delete"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                pageRange={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sub_Sub_Categories;
