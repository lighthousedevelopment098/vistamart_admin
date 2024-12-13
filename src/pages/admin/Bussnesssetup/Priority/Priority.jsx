import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs"; // Icon for info
import "./Priority.css";
const Priority = () => {
  const [showCustomSorting, setShowCustomSorting] = useState(false);
  const [showCustomASorting, setShowCustomASorting] = useState(false);
  const [showCustomBSorting, setShowCustomBSorting] = useState(false);
  const [showCustomCSorting, setShowCustomCSorting] = useState(false);
  const [showCustomDSorting, setShowCustomDSorting] = useState(false);
  const [showCustomESorting, setShowCustomESorting] = useState(false);
  const [showCustomFSorting, setShowCustomFSorting] = useState(false);
  const [showCustomGSorting, setShowCustomGSorting] = useState(false);
  const [showCustomHSorting, setShowCustomHSorting] = useState(false);
  const [showCustomISorting, setShowCustomISorting] = useState(false);
  const [showCustomJSorting, setShowCustomJSorting] = useState(false);

  const handleToggle = (e) => {
    setShowCustomSorting(e.target.checked);
  };
  const handleToggleA = (e) => {
    setShowCustomASorting(e.target.checked);
  };
  const handleToggleB = (e) => {
    setShowCustomBSorting(e.target.checked);
  };
  const handleToggleC = (e) => {
    setShowCustomCSorting(e.target.checked);
  };
  const handleToggleD = (e) => {
    setShowCustomDSorting(e.target.checked);
  };
  const handleToggleE = (e) => {
    setShowCustomESorting(e.target.checked);
  };
  const handleToggleF = (e) => {
    setShowCustomFSorting(e.target.checked);
  };
  const handleToggleG = (e) => {
    setShowCustomGSorting(e.target.checked);
  };
  const handleToggleH = (e) => {
    setShowCustomHSorting(e.target.checked);
  };
  const handleToggleI = (e) => {
    setShowCustomISorting(e.target.checked);
  };
  const handleToggleJ = (e) => {
    setShowCustomJSorting(e.target.checked);
  };

  return (
    <div className="card-body snipcss0-0-0-1 snipcss-ME33Y">
      <div className="row snipcss0-1-1-2 bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize font-bold text-base">Brand</h3>
            <p className="max-w-400 snipcss0-4-4-6">
              Brands are lists of the specific products, organized by putting
              the newest ones at the top and arranging everything
              alphabetically.
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14 ">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16 ">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomSorting}
                    onChange={handleToggle}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomSorting}
                      onChange={handleToggle}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2 snipcss0-5-47-48"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Category
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              The category list groups similar products together arranged with
              the latest category first and in alphabetical order
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomASorting}
                    onChange={handleToggleA}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20  bg-white p-0 border-r-5 mb-3 ">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold ">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomASorting}
                      onChange={handleToggleA}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomASorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn btn-primary px-3 snipcss0-5-47-48 bg-primary hover:bg-primary-dark"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Vendor list
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              The Vendor list arranges all vendors based on the latest join that
              are highly rated by customer choice and also in alphabetic order.
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomBSorting}
                    onChange={handleToggleB}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23  text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomBSorting}
                      onChange={handleToggleB}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomBSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by reviews count{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by average ratings{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Featured Products
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              The featured product means the product list which are mostly
              ordered , customers choice and have good reviews & ratings
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomCSorting}
                    onChange={handleToggleC}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomCSorting}
                      onChange={handleToggleC}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomCSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>

                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by reviews count{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by average ratings{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              New arrival products
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              These new arrival products are items recently added to the list
              within a specific time frame and have positive reviews & ratings
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomDSorting}
                    onChange={handleToggleD}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomDSorting}
                      onChange={handleToggleD}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomDSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="border rounded p-3 flex flex-col gap-2 mt-4">
                        <h6 className="mb-0 text-capitalize">Set duration</h6>
                        <p>
                          Products are considered as{" "}
                          <span className="font-bold text-capitalize">
                            New arrival
                          </span>
                          , If it is added within X Days/Months)
                        </p>

                        <div className="flex">
                          <input
                            type="number"
                            className="form-control border border-r-0 p-2 rounded-l-md"
                            name="duration"
                            min="1"
                            placeholder="Ex: 5"
                            defaultValue="1"
                            required
                          />
                          <select
                            className="form-control outline-none px-5 rounded-r-md border border-l-0"
                            name="duration_type"
                          >
                            <option value="days">Days</option>
                            <option value="month">Month</option>
                          </select>
                        </div>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                      <div className="border rounded p-3 flex flex-col gap-2 mt-3">
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="out_of_stock_product"
                            value="desc"
                            id="new-arrival-product-stock-out-remove"
                            className="form-radio"
                          />
                          <label
                            htmlFor="new-arrival-product-stock-out-remove"
                            className="mb-0"
                          >
                            Show stock out products in the last
                          </label>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="out_of_stock_product"
                            value="hide"
                            id="new-arrival-product-stock-out-last"
                            className="form-radio"
                          />
                          <label
                            htmlFor="new-arrival-product-stock-out-last"
                            className="mb-0"
                          >
                            Remove stock out products from the list
                          </label>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="out_of_stock_product"
                            value="default"
                            id="new-arrival-product-stock-out-default"
                            className="form-radio"
                            defaultChecked
                          />
                          <label
                            htmlFor="new-arrival-product-stock-out-default"
                            className="mb-0"
                          >
                            None
                          </label>
                        </div>
                      </div>
                      <div className="border rounded p-3 flex flex-col gap-2 mt-3">
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="out_of_stock_product"
                            value="desc"
                            id="new-arrival-product-stock-out-remove"
                            className="form-radio"
                          />
                          <label
                            htmlFor="new-arrival-product-stock-out-remove"
                            className="mb-0"
                          >
                            Show product in the last if store is temporarily off
                          </label>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="out_of_stock_product"
                            value="hide"
                            id="new-arrival-product-stock-out-last"
                            className="form-radio"
                          />
                          <label
                            htmlFor="new-arrival-product-stock-out-last"
                            className="mb-0"
                          >
                          Remove product from the list if store is temporarily off
                          </label>
                        </div>
                        <div className="flex gap-2 items-center">
                          <input
                            type="radio"
                            name="out_of_stock_product"
                            value="default"
                            id="new-arrival-product-stock-out-default"
                            className="form-radio"
                            defaultChecked
                          />
                          <label
                            htmlFor="new-arrival-product-stock-out-default"
                            className="mb-0"
                          >
                            None
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">Top vendor</h3>
            <p className="max-w-400 snipcss0-4-4-6">
              Top vendor list refers to displaying a list based on most ordered
              items of that vendor and highly rated.
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomESorting}
                    onChange={handleToggleE}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomESorting}
                      onChange={handleToggleE}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomESorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="4"
          id="top-vendor-minimum-rating-4"
        />
        <label htmlFor="top-vendor-minimum-rating-4" className="mb-0">
          Show 4+ rated sellers
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="3.5"
          id="top-vendor-minimum-rating-3-5"
        />
        <label htmlFor="top-vendor-minimum-rating-3-5" className="mb-0">
          Show 3.5+ rated sellers
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="2"
          id="top-vendor-minimum-rating-2"
        />
        <label htmlFor="top-vendor-minimum-rating-2" className="mb-0">
          Show 2+ rated sellers
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="default"
          id="top-vendor-minimum-rating-0"
          defaultChecked
        />
        <label htmlFor="top-vendor-minimum-rating-0" className="mb-0">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="4"
          id="top-vendor-minimum-rating-4"
        />
        <label htmlFor="top-vendor-minimum-rating-4" className="mb-0">
        Sort by order
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="3.5"
          id="top-vendor-minimum-rating-3-5"
        />
        <label htmlFor="top-vendor-minimum-rating-3-5" className="mb-0">
        Sort by reviews count
        </label>
      </div>
      
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="default"
          id="top-vendor-minimum-rating-0"
          defaultChecked
        />
        <label htmlFor="top-vendor-minimum-rating-0" className="mb-0">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="4"
          id="top-vendor-minimum-rating-4"
        />
        <label htmlFor="top-vendor-minimum-rating-4" className="mb-0">
        Show currently closed stores in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="3.5"
          id="top-vendor-minimum-rating-3-5"
          defaultChecked
        />
        <label htmlFor="top-vendor-minimum-rating-3-5" className="mb-0">
        Remove currently closed stores from the list
        </label>
      </div>
      
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="default"
          id="top-vendor-minimum-rating-0"
          defaultChecked
        />
        <label htmlFor="top-vendor-minimum-rating-0" className="mb-0">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="4"
          id="top-vendor-minimum-rating-4"
        />
        <label htmlFor="top-vendor-minimum-rating-4" className="mb-0">
        Show temporarily off stores in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="3.5"
          id="top-vendor-minimum-rating-3-5"
        />
        <label htmlFor="top-vendor-minimum-rating-3-5" className="mb-0">
        Remove temporarily off stores from the list
        </label>
      </div>
      
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="default"
          id="top-vendor-minimum-rating-0"
          defaultChecked
        />
        <label htmlFor="top-vendor-minimum-rating-0" className="mb-0">
          None
        </label>
      </div>
    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Category wise product list
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              Category or subcategory wise product list is for displaying the
              products which are mostly ordered, have positive reviews & ratings
              and in alphabetical order
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomFSorting}
                    onChange={handleToggleF}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomFSorting}
                      onChange={handleToggleF}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomFSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                      <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="desc"
          data-parent-class="category-wise-product"
          id="category-wise-product-stock-out-remove"
        />
        <label htmlFor="category-wise-product-stock-out-remove" className="mb-0">
          Show stock out products in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="hide"
          data-parent-class="category-wise-product"
          id="category-wise-product-stock-out-last"
        />
        <label htmlFor="category-wise-product-stock-out-last" className="mb-0">
          Remove stock out products from the list
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="default"
          data-parent-class="category-wise-product"
          id="category-wise-product-stock-out-default"
          defaultChecked
        />
        <label htmlFor="category-wise-product-stock-out-default" className="mb-0">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="desc"
          data-parent-class="category-wise-product"
          id="category-wise-product-temporary-close-last"
        />
        <label htmlFor="category-wise-product-temporary-close-last" className="mb-0 cursor-pointer">
          Show product in the last if store is temporarily off
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="hide"
          data-parent-class="category-wise-product"
          id="category-wise-product-temporary-close-remove"
          defaultChecked
        />
        <label htmlFor="category-wise-product-temporary-close-remove" className="mb-0 cursor-pointer">
          Remove product from the list if store is temporarily off
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="default"
          data-parent-class="category-wise-product"
          id="category-wise-product-temporary-close-default"
        />
        <label htmlFor="category-wise-product-temporary-close-default" className="mb-0 cursor-pointer">
          None
        </label>
      </div>
    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Top rated products
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              Top rated products are the mostly ordered product list of customer
              choice which are highly rated & reviewed
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomGSorting}
                    onChange={handleToggleG}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomGSorting}
                      onChange={handleToggleG}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomGSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="4"
          id="top-rated-product-minimum-rating-4"
        />
        <label htmlFor="top-rated-product-minimum-rating-4" className="mb-0">
          Show 4+ rated products
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          value="3.5"
          id="top-rated-product-minimum-rating-3-5"
        />
        <label htmlFor="top-rated-product-minimum-rating-3-5" className="mb-0">
          Show 3.5+ rated products
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          id="top-rated-product-minimum-rating-2"
          value="2"
        />
        <label htmlFor="top-rated-product-minimum-rating-2" className="mb-0">
          Show 2+ rated products
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="minimum_rating_point"
          id="top-rated-product-minimum-rating-0"
          value="default"
          defaultChecked
        />
        <label htmlFor="top-rated-product-minimum-rating-0" className="mb-0">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="sort_by"
          value="most_order"
          id="top-rated-product-sort-by-most-order"
          defaultChecked
        />
        <label htmlFor="top-rated-product-sort-by-most-order" className="mb-0">
          Sort by most order
        </label>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="sort_by"
          value="reviews_count"
          id="top-rated-product-sort-by-reviews-count"
        />
        <label htmlFor="top-rated-product-sort-by-reviews-count" className="mb-0">
          Sort by reviews count
        </label>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="sort_by"
          value="rating"
          id="top-rated-product-sort-by-ratings"
        />
        <label htmlFor="top-rated-product-sort-by-ratings" className="mb-0">
          Sort by average ratings
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="desc"
          data-parent-class="top-rated-product"
          id="top-rated-product-stock-out-remove"
        />
        <label className="mb-0" htmlFor="top-rated-product-stock-out-remove">
          Show stock out products in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="hide"
          data-parent-class="top-rated-product"
          id="top-rated-product-stock-out-last"
        />
        <label className="mb-0" htmlFor="top-rated-product-stock-out-last">
          Remove stock out products from the list
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="default"
          data-parent-class="top-rated-product"
          id="top-rated-product-stock-out-default"
          defaultChecked
        />
        <label className="mb-0" htmlFor="top-rated-product-stock-out-default">
          None
        </label>
      </div>
    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Best selling products
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              Best selling products are those items that are purchased by
              customers mostly compared to other products within a specific
              period
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomHSorting}
                    onChange={handleToggleH}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomHSorting}
                      onChange={handleToggleH}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomHSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                   <div className="border rounded p-3 flex flex-col gap-2 mt-4">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="sort_by"
          value="most_order"
          id="best-selling-product-sort-by-most-order"
          defaultChecked
        />
        <label className="mb-0" htmlFor="best-selling-product-sort-by-most-order">
          Sort by most order
        </label>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="sort_by"
          value="reviews_count"
          id="best-selling-product-sort-by-reviews-count"
        />
        <label className="mb-0" htmlFor="best-selling-product-sort-by-reviews-count">
          Sort by reviews count
        </label>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="radio"
          className="show"
          name="sort_by"
          value="rating"
          id="best-selling-product-sort-by-ratings"
        />
        <label className="mb-0" htmlFor="best-selling-product-sort-by-ratings">
          Sort by average ratings
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="desc"
          data-parent-class="best-selling-product"
          id="best-selling-product-stock-out-remove"
        />
        <label className="mb-0" htmlFor="best-selling-product-stock-out-remove">
          Show stock out products in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="hide"
          data-parent-class="best-selling-product"
          id="best-selling-product-stock-out-last"
        />
        <label className="mb-0" htmlFor="best-selling-product-stock-out-last">
          Remove stock out products from the list
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="default"
          data-parent-class="best-selling-product"
          id="best-selling-product-stock-out-default"
          defaultChecked
        />
        <label className="mb-0" htmlFor="best-selling-product-stock-out-default">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="desc"
          data-parent-class="best-selling-product"
          id="best-selling-product-temporary-close-last"
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="best-selling-product-temporary-close-last"
        >
          Show product in the last if store is temporarily off
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="hide"
          data-parent-class="best-selling-product"
          id="best-selling-product-temporary-close-remove"
          defaultChecked
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="best-selling-product-temporary-close-remove"
        >
          Remove product from the list if store is temporarily off
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="default"
          data-parent-class="best-selling-product"
          id="best-selling-product-temporary-close-default"
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="best-selling-product-temporary-close-default"
        >
          None
        </label>
      </div>
    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Products list (Search Bar)
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              The product list (Search Bar) is the list of those products which
              appear during search based on product availability
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomISorting}
                    onChange={handleToggleI}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomISorting}
                      onChange={handleToggleI}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomISorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    
    <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="desc"
          className="check-box"
          data-parent-class="searched-product-list"
          id="show-in-last"
        />
        <label className="mb-0 cursor-pointer" htmlFor="show-in-last">
          Show stock out products in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="hide"
          className="check-box"
          data-parent-class="searched-product-list"
          id="remove-product"
        />
        <label className="mb-0 cursor-pointer" htmlFor="remove-product">
          Remove stock out products from the list
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="default"
          className="check-box"
          data-parent-class="searched-product-list"
          id="default"
          defaultChecked
        />
        <label className="mb-0 cursor-pointer" htmlFor="default">
          None
        </label>
      </div>
    </div>
    <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="desc"
          data-parent-class="searched-product-list"
          id="searched-product-list-temporary-close-last"
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="searched-product-list-temporary-close-last"
        >
          Show product in the last if store is temporarily off
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="hide"
          data-parent-class="searched-product-list"
          id="searched-product-list-temporary-close-remove"
          defaultChecked
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="searched-product-list-temporary-close-remove"
        >
          Remove product from the list if store is temporarily off
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="temporary_close_sorting"
          value="default"
          data-parent-class="searched-product-list"
          id="searched-product-list-temporary-close-default"
          defaultChecked
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="searched-product-list-temporary-close-default"
        >
          None
        </label>
      </div>
    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row snipcss0-1-1-2  bg-white p-5 border-r-5 mb-3">
        <div className="col-lg-6 snipcss0-2-2-3">
          <div className="snipcss0-3-3-4">
            <h3 className="mb-3 text-capitalize snipcss0-4-4-5 text-base font-bold">
              Vendor product list
            </h3>
            <p className="max-w-400 snipcss0-4-4-6">
              The vendor product list is for displaying the products which are
              mostly ordered, have good reviews & sorted alphabetically
            </p>
          </div>
        </div>
        <div className="col-lg-6 snipcss0-2-2-7">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/priority-setup?type=brand"
            method="post"
            className="snipcss0-3-7-8"
          >
            <input
              type="hidden"
              name="_token"
              value="VskzJfjPNzjzx00GEqv2qOd7ajBHZAcX6mVmKcfE"
              autoComplete="off"
              className="snipcss0-4-8-9"
            />
            <div className="border rounded p-3 d-flex gap-4 flex-column snipcss0-4-8-10">
              <div className="d-flex gap-2 justify-content-between pb-3 border-bottom snipcss0-5-10-11">
                <div className="d-flex flex-column snipcss0-6-11-12">
                  <h5 className="text-capitalize snipcss0-7-12-13 text-sm font-bold">
                    Use default sorting list
                  </h5>
                  <div className="d-flex gap-2 align-items-center snipcss0-7-12-14">
                    <BsInfoCircle size={14} />
                    <span className="text-dark fz-12 snipcss0-8-14-16">
                      Currently sorting this section based on latest add
                    </span>
                  </div>
                </div>
                <label className="switcher snipcss0-6-11-17">
                  <input
                    type="checkbox"
                    className="switcher_input switcher-input-js snipcss0-7-17-18"
                    data-parent-class="brand"
                    data-from="default-sorting"
                    checked={!showCustomJSorting}
                    onChange={handleToggleJ}
                  />
                  <span className="switcher_control snipcss0-7-17-19"></span>
                </label>
              </div>
              <div className="snipcss0-5-10-20">
                <div className="d-flex gap-2 justify-content-between snipcss0-6-20-21">
                  <div className="d-flex flex-column snipcss0-7-21-22">
                    <h5 className="text-capitalize snipcss0-8-22-23 text-sm font-bold">
                      Use custom sorting list
                    </h5>
                    <div className="d-flex gap-2 align-items-center snipcss0-8-22-24">
                      <BsInfoCircle size={14} />
                      <span className="text-dark fz-12 snipcss0-9-24-26">
                        You can sort this section by other ways
                      </span>
                    </div>
                  </div>
                  <label className="switcher snipcss0-7-21-27">
                    <input
                      type="checkbox"
                      className="switcher_input switcher-input-js snipcss0-8-27-28"
                      name="custom_sorting_status"
                      value="1"
                      data-parent-class="brand"
                      data-from="custom-sorting"
                      checked={showCustomJSorting}
                      onChange={handleToggleJ}
                    />
                    <span className="switcher_control snipcss0-8-27-29"></span>
                  </label>
                </div>
                {showCustomJSorting && (
                  <div
                    className="custom-sorting-radio-list snipcss0-6-20-30 style-ZO8AU"
                    id="style-ZO8AU"
                  >
                    <div className="border rounded p-3 d-flex flex-column gap-2 mt-4 snipcss0-7-30-31">
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-32">
                        <input
                          type="radio"
                          className="show snipcss0-9-32-33"
                          name="sort_by"
                          value="latest_created"
                          id="brand-sort-by-latest-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-32-34"
                          htmlFor="brand-sort-by-latest-created"
                        >
                          {" "}
                          Sort by latest created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-35">
                        <input
                          type="radio"
                          className="show snipcss0-9-35-36"
                          name="sort_by"
                          value="first_created"
                          id="brand-sort-by-first-created"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-35-37"
                          htmlFor="brand-sort-by-first-created"
                        >
                          {" "}
                          Sort by first created{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-38">
                        <input
                          type="radio"
                          className="show snipcss0-9-38-39"
                          name="sort_by"
                          value="most_order"
                          id="brand-sort-by-most-order"
                          defaultChecked
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-38-40"
                          htmlFor="brand-sort-by-most-order"
                        >
                          {" "}
                          Sort by most order{" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-41">
                        <input
                          type="radio"
                          className="show snipcss0-9-41-42"
                          name="sort_by"
                          value="a_to_z"
                          id="brand-alphabetic-order"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-41-43"
                          htmlFor="brand-alphabetic-order"
                        >
                          {" "}
                          Sort by Alphabetical (A To Z){" "}
                        </label>
                      </div>
                      <div className="d-flex gap-2 align-items-center snipcss0-8-31-44">
                        <input
                          type="radio"
                          className="show snipcss0-9-44-45"
                          name="sort_by"
                          value="z_to_a"
                          id="brand-alphabetic-order-reverse"
                        />
                        <label
                          className="mb-0 cursor-pointer snipcss0-9-44-46"
                          htmlFor="brand-alphabetic-order-reverse"
                        >
                          {" "}
                          Sort by Alphabetical (Z To A){" "}
                        </label>
                      </div>
                      <div className="border rounded p-3 flex flex-col gap-2 mt-3">
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="desc"
          data-parent-class="feature-product"
          id="feature-product-stock-out-remove"
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="feature-product-stock-out-remove"
        >
          Show stock out products in the last
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="hide"
          data-parent-class="feature-product"
          id="feature-product-stock-out-last"
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="feature-product-stock-out-last"
        >
          Remove stock out products from the list
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="radio"
          name="out_of_stock_product"
          value="default"
          data-parent-class="feature-product"
          id="feature-product-stock-out-default"
          defaultChecked
        />
        <label
          className="mb-0 cursor-pointer"
          htmlFor="feature-product-stock-out-default"
        >
          None
        </label>
      </div>
    </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 snipcss0-4-8-47">
              <button
                type="submit"
                className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                style={{ color: "white" }}
              >
                {" "}
                Save{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Priority;
