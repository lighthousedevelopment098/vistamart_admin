import React from "react";
import Switcher from "../../../../components/FormInput/Switcher";

const OrderSettingsCard = () => {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <div className="border-b px-4 py-3 flex items-center gap-2">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/header-logo.png"
          alt="logo"
        />
        <h5 className="mb-0 text-lg font-medium capitalize">Order settings</h5>
      </div>
      <div className="card-body p-4">
        <form
          action="https://6valley.6amtech.com/admin/business-settings/order-settings/update-order-settings"
          method="post"
          encType="multipart/form-data"
        >
          <input
            type="hidden"
            name="_token"
            value="QAdsdm6OzuTDdIGsP9CWEtESx57aW7EE7GhlaiCo"
            autoComplete="off"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Order Delivery Verification */}
            <div className="flex justify-between items-center h-10 p-3 border rounded-lg">
              <span className="title-color capitalize flex items-center gap-2">
                Order delivery verification
                <img
                  width="16"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                  alt=""
                  title="Customers receive a verification code after placing an order. Deliverymen verify delivery with this code."
                />
              </span>
              <div>
                <Switcher />
              </div>
            </div>

            {/* Minimum Order Amount */}
            <div className="flex justify-between items-center h-10 p-3 border rounded-lg">
              <span className="title-color flex items-center gap-2">
                Minimum order amount
                <img
                  width="16"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                  alt=""
                  title="If enabled, customers must meet the minimum order amount set by admin or vendor."
                />
              </span>
              <div>
                <Switcher />
              </div>
            </div>

            {/* Show Billing Address in Checkout */}
            <div className="flex justify-between items-center h-10 p-3 border rounded-lg">
              <span className="title-color flex items-center gap-2">
                Show billing address in checkout
                <img
                  width="16"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                  alt=""
                  title="If enabled, the billing address will be shown on the checkout page."
                />
              </span>
              <div>
                <Switcher />
              </div>
            </div>

            {/* Free Delivery */}
            <div className="flex justify-between h-10 items-center p-2 border rounded-lg mt-4">
              <span className="title-color flex items-center gap-2">
                Free delivery
                <img
                  width="16"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                  alt=""
                  title="If enabled, free delivery will be available when customers order over a certain amount."
                />
              </span>
              <div>
                <Switcher />
              </div>
            </div>

            {/* Free Delivery Responsibility */}

            <div>
              <h3 className="title-color block capitalize mb-2">
                Free delivery responsibility
              </h3>
              <div className="p-2 border rounded-lg">
                <label
                  htmlFor="free-delivery-responsibility"
                  className="sr-only"
                >
                  Free delivery responsibility
                </label>
                <select
                  id="free-delivery-responsibility"
                  name="free_delivery_responsibility"
                  className="w-full bg-white outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Vendor</option>
                </select>
              </div>
            </div>

            {/* Free Delivery Over Amount */}
            <div>
              <h3 className="title-color block capitalize mb-2">
                Free delivery over($)
              </h3>
              <div className="p-3 border rounded-lg h-10 flex items-center ">
               
                <input
                  type="number"
                  className=" w-full outline-none"
                  min="0"
                  name="free_delivery_over_amount_seller"
                  id="free_delivery_over_amount_vendor"
                  placeholder="Ex: 10"
                  defaultValue="1000"
                />
              </div>
            </div>

            {/* Refund Order Validity */}
            <div>
  <h3 className="title-color block capitalize mb-2">Refund order validity (Days)</h3>
  <div className="p-3 h-10 border rounded-lg flex items-center">
   
    <input
      type="text"
      className=" w-full outline-none "
      name="refund_day_limit"
      id="refund_day_limit"
      placeholder="Ex: 10"
      defaultValue="5"
    />
  </div>
</div>

            {/* Guest Checkout */}
            <div className="flex justify-between items-center h-10 mt-4 p-3 border rounded-lg">
              <span className="title-color flex items-center gap-2">
                Guest checkout
                <img
                  width="16"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                  alt=""
                  title="If enabled, users can complete checkout without logging in."
                />
              </span>
              <div>
                <Switcher />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              style={{color:"white"}}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderSettingsCard;
