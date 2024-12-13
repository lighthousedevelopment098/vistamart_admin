import React from "react";
// import { AiOutlineFileText } from 'react-icons/ai'; // Importing necessary icon from react-icons
const CouponUpdate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="content container-fluid snipcss-ofOF4">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize flex  gap-3">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/coupon_setup.png"
            className="mb-1 mr-1"
            alt=""
          />{" "}
          Coupon update
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={handleSubmit}
                action="https://6valley.6amtech.com/admin/coupon/update/5"
                method="post"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="TUklnbbAElLTM1jngpkiLNvSXF1NzXeMgvvCAT5G"
                  autoComplete="off"
                />
                <div className="row">
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="coupon_type"
                      className="title-color text-capitalize"
                    >
                      Coupon type
                    </label>
                    <select
                      className="form-control"
                      id="coupon_type"
                      name="coupon_type"
                      required
                    >
                      <option disabled selected>
                        Select Coupon Type
                      </option>
                      <option value="discount_on_purchase">
                        Discount on Purchase
                      </option>
                      <option value="free_delivery">Free Delivery</option>
                      <option value="first_order" selected>
                        First Order
                      </option>
                    </select>
                  </div>
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="title"
                      className="title-color text-capitalize"
                    >
                      Coupon title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      id="title"
                      value="Get discount on first order"
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="code"
                      className="title-color text-capitalize"
                    >
                      Coupon code
                    </label>
                    {/* <a href="javascript:void(0)" className="float-right" id="generateCode">Generate code</a> */}
                    <input
                      type="text"
                      name="code"
                      value="ogpuqyeeoe"
                      className="form-control"
                      id="code"
                      placeholder="Ex: EID100"
                      required
                    />
                  </div>
                  <div
                    className="col-md-6 col-lg-4 form-group first_order style-LfHLb"
                    id="style-LfHLb"
                  >
                    <label
                      htmlFor="coupon_bearer"
                      className="title-color font-weight-medium d-flex"
                    >
                      Coupon bearer
                    </label>
                    <select
                      className="form-control"
                      name="coupon_bearer"
                      id="coupon_bearer"
                    >
                      <option disabled selected>
                        Select coupon bearer
                      </option>
                      <option value="seller">Vendor</option>
                      <option value="inhouse" selected>
                        Admin
                      </option>
                    </select>
                  </div>
                  <div
                    className="col-md-6 col-lg-4 form-group coupon_by first_order style-iIZt5"
                    id="style-iIZt5"
                  >
                    <label
                      htmlFor="vendor_wise_coupon"
                      className="title-color font-weight-medium d-flex"
                    >
                      Vendor
                    </label>
                    <select
                      className="form-control"
                      name="seller_id"
                      id="vendor_wise_coupon"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <option disabled selected>
                        messages.select_Vendor
                      </option>
                      <option value="0">messages.all_Vendor</option>
                      <option value="inhouse" selected data-select2-id="19">
                        Inhouse
                      </option>
                      <option value="1">Deluxe Online</option>
                      <option value="2">Mart Morning</option>
                      <option value="3">Wellness Fair</option>
                      <option value="4">Bicycle Shop</option>
                      <option value="5">KR Fashion</option>
                      <option value="6">Country Fair</option>
                      <option value="7">Tech Shop</option>
                      <option value="8">Royal Crown</option>
                      <option value="9">Super Store Online</option>
                      <option value="10">Digital House</option>
                    </select>
                  </div>
                  <div
                    className="col-md-6 col-lg-4 form-group coupon_type first_order style-DW3Ao"
                    id="style-DW3Ao"
                  >
                    <label
                      htmlFor="customer_id"
                      className="title-color font-weight-medium d-flex"
                    >
                      Customer
                    </label>
                    <select
                      className="form-control"
                      name="customer_id"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <option disabled selected>
                        Select customer
                      </option>
                      <option value="0" selected data-select2-id="30">
                        All customer
                      </option>
                      <option value="2">fatema subarna</option>
                      <option value="4">Md.Safayet Hossain</option>
                      <option value="5">Jocky Lop</option>
                      <option value="6">Demo user</option>
                      <option value="7">Bsgsh Nsbdv</option>
                      <option value="8">Joy Joy</option>
                      <option value="9">Devid Jack</option>
                    </select>
                  </div>
                  <div
                    className="col-md-6 col-lg-4 form-group first_order style-cHE7L"
                    id="style-cHE7L"
                  >
                    <label
                      htmlFor="coupon_limit"
                      className="title-color text-capitalize"
                    >
                      Limit for same user
                    </label>
                    <input
                      type="number"
                      name="limit"
                      min="0"
                      value="0"
                      id="coupon_limit"
                      className="form-control"
                      placeholder="messages.ex:10"
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 form-group free_delivery">
                    <label
                      htmlFor="discount_type"
                      className="title-color text-capitalize"
                    >
                      Discount type
                    </label>
                    <select
                      id="discount_type"
                      className="form-control"
                      name="discount_type"
                    >
                      <option value="amount" selected>
                        Amount
                      </option>
                      <option value="percentage">Percentage</option>
                    </select>
                  </div>
                  <div className="col-md-6 col-lg-4 form-group free_delivery">
                    <label
                      htmlFor="discount"
                      className="title-color text-capitalize"
                    >
                      Discount Amount{" "}
                      <span id="discount_percent" className="style-mSyZA">
                        {" "}
                        (%)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000000"
                      step=".01"
                      name="discount"
                      className="form-control"
                      id="discount"
                      value="100"
                      placeholder="Ex:500"
                      required
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="minimum_purchase"
                      className="title-color text-capitalize"
                    >
                      Minimum purchase
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000000"
                      step=".01"
                      name="min_purchase"
                      className="form-control"
                      id="minimum_purchase"
                      value="200"
                      placeholder="Minimum purchase"
                      required
                    />
                  </div>
                  <div
                    className="col-md-6 col-lg-4 form-group free_delivery style-Z6cZs"
                    id="max-discount"
                  >
                    <label
                      htmlFor="maximum_discount"
                      className="title-color text-capitalize"
                    >
                      Maximum discount
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1000000"
                      step=".01"
                      name="max_discount"
                      className="form-control"
                      id="maximum_discount"
                      value="100"
                      placeholder="Maximum discount"
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="start_date"
                      className="title-color text-capitalize"
                    >
                      Start date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      className="form-control"
                      id="start_date"
                      value="2023-01-10"
                      placeholder="Start date"
                      required
                      min="2024-07-07"
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="expire_date"
                      className="title-color text-capitalize"
                    >
                      Expire date
                    </label>
                    <input
                      type="date"
                      name="expire_date"
                      className="form-control"
                      id="expire_date"
                      value="2028-10-06"
                      placeholder="Expire date"
                      required
                      min="2024-07-07"
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end flex-wrap gap-10">
                  <button type="reset" className="btn btn-secondary-500 px-4">
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary-500 px-4">
                    Update
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

export default CouponUpdate;
