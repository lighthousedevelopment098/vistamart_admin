import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import Switcher from "../../../../components/FormInput/Switcher";

const ShippingSettings = () => {
  // Simulated data for category-wise shipping costs (replace with your own array)
  const categoryShippingCosts = [
    {
      id: 1,
      image:
        "https://6valley.6amtech.com/storage/app/public/category/2023-06-13-6488211a870e0.png",
      categoryName: "Home Improvement & Tools",
      costPerProduct: 100,
      status: true, // Assuming status is true for demonstration
    },
    // Add more items as per your data structure
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="content container-fluid snipcss-FsrHv">
      {/* Shipping Method Settings */}
      <div className="card">
        <div className="card-header">
          <h5 className="text-capitalize mb-0 d-flex align-items-center gap-2">
            <img
              width="20"
              src="https://6valley.6amtech.com/public/assets/back-end/img/delivery.png"
              alt=""
            />{" "}
            Shipping
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div>
                  <label className="title-color d-flex">
                    Shipping responsibility
                  </label>
                  <div className="form-control min-form-control-height h-auto form-group d-flex flex-wrap gap-2">
                    <div className="custom-control custom-radio flex-grow-1">
                      <input
                        type="radio"
                        className="custom-control-input toggle-switch-message"
                        value="inhouse_shipping"
                        name="shipping_method"
                        id="inhouse-shipping"
                        checked
                        data-modal-id="toggle-modal"
                        data-toggle-id="inhouse-shipping"
                        data-on-image="seller-wise-shipping.png"
                        data-off-image="inhouse-shipping.png"
                        data-on-title="Want to change the shipping responsibility to Inhouse?"
                        data-off-title="Want to change the shipping responsibility to Vendor Wise?"
                        data-on-message="<p>Admin will handle the shipping responsibilities when you choose inhouse shipping method.</p>"
                        data-off-message="<p>Admin will handle the shipping responsibilities when you choose inhouse shipping method.</p>"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="inhouse-shipping"
                      >
                        Inhouse shipping
                      </label>
                    </div>
                    <div className="custom-control custom-radio flex-grow-1">
                      <input
                        type="radio"
                        className="custom-control-input toggle-switch-message"
                        value="sellerwise_shipping"
                        name="shipping_method"
                        id="seller-wise-shipping"
                        data-modal-id="toggle-modal"
                        data-toggle-id="seller-wise-shipping"
                        data-on-image="inhouse-shipping.png"
                        data-off-image="seller-wise-shipping.png"
                        data-on-title="Want to change the shipping responsibility to Vendor Wise?"
                        data-off-title="Want to change the shipping responsibility to Inhouse?"
                        data-on-message="<p>Vendors will handle the shipping responsibilities when you choose vendor wise shipping method.</p>"
                        data-off-message="<p>Vendors will handle the shipping responsibilities when you choose vendor wise shipping method.</p>"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="seller-wise-shipping"
                      >
                        Vendor wise shipping
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    className="title-color"
                    id="for_inhouse_deliver"
                    style={{ display: "none" }}
                  >
                    Shipping method
                  </label>
                  <label className="title-color" id="for_seller_deliver">
                    Shipping method for In-house deliver
                  </label>
                  <select
                    className="form-control outline-none text-capitalize w-100 shipping-type"
                    name="shippingCategory"
                  >
                    <option value="0" disabled>
                      ---Select---
                    </option>
                    <option value="order_wise">Order wise</option>
                    <option value="category_wise" selected>
                      Category wise
                    </option>
                    <option value="product_wise">Product wise</option>
                  </select>
                  <div className="mt-2 style-rSBws" id="product_wise_note">
                    {/* <p>
                      <img
                        width="16"
                        className="mt-n1"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/danger-info.png"
                        alt=""
                      />
                      <strong>Note:</strong> When adding a product, a
                      product-specific shipping charge is added. Verify that all
                      of the products delivery costs are up to date.
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="d-flex justify-content-end gap-10">
                  <button
                    type="submit"
                    className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
                    style={{color:"white"}}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Category Wise Shipping Cost */}
      <div id="update_category_shipping_cost">
        <div className="card mt-3">
          <div className="px-3 pt-4">
            <h5 className="text-capitalize mb-0 d-flex align-items-center gap-2">
              <img
                width="20"
                src="https://6valley.6amtech.com/public/assets/back-end/img/delivery.png"
                alt=""
              />{" "}
              Category wise shipping cost
            </h5>
          </div>
          <div className="card-body px-0">
            <div className="table-responsive">
              <form>
                <table
                  className="table table-hover  table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 style-OjLNg"
                  id="style-OjLNg"
                >
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th>Image</th>
                      <th>Category name</th>
                      <th>Cost per product</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryShippingCosts.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            className="rounded"
                            width="64"
                            src={item.image}
                            alt=""
                          />
                        </td>
                        <td>{item.categoryName}</td>
                        <td>
                          <input
                            type="hidden"
                            className="form-control w-auto"
                            name="ids[]"
                            value={item.id}
                          />
                          <input
                            type="hidden"
                            className="form-control w-auto"
                            name="category_ids[]"
                            value={item.categoryId}
                          />
                          <input
                            type="number"
                            className="form-control w-auto"
                            min="0"
                            step="0.01"
                            name="cost[]"
                            value={item.costPerProduct}
                          />
                        </td>
                        <td>
                          <label className="mx-auto switcher">
                            <input
                              type="checkbox"
                              className="status switcher_input"
                              name="multiplyQTY[]"
                              id=""
                              value={item.id}
                              checked={item.status}
                            />
                            <span className="">
                              {/* <BsToggleOn className="status" />
                              <BsToggleOff className="slider" /> */}
                              <Switcher/>
                            </span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSettings;
