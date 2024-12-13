import React from 'react'
import Switcher from '../../../../components/FormInput/Switcher'

const PaymentOption = () => {
  return (
    <div className="border rounded-lg shadow-md h-full">
    <div className="border-b p-3 text-sm shadow-md">
      <h5 className="mb-0 text-capitalize flex gap-2 items-center">
        <img
          width="20"
          src="https://6valley.6amtech.com/public/assets/back-end/img/product_setup.png"
          alt=""
        />
        Product setup
      </h5>
    </div>

    <div className="p-4">
      <form
        action="https://6valley.6amtech.com/admin/product-settings"
        method="post"
        encType="multipart/form-data"
      >
        <input type="hidden" name="_token" value="QAdsdm6OzuTDdIGsP9CWEtESx57aW7EE7GhlaiCo" autoComplete="off" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          {/* Reorder Level Input */}
          <div className="flex flex-col">
            <div className="flex gap-2 items-center ">
              <label className="text-gray-700" htmlFor="stock_limit">
                Re-order level
              </label>
              <span
                className="cursor-pointer"
                title="Set the stock limit for the Reorder level. Vendors can see all products that need to be restocked in a section when they reach this ReOrder Level"
              >
                <img
                  width="16"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                  alt=""
                />
              </span>
            </div>
            <input
              className="border border-gray-300 p-2 rounded outline-none hover:border-primary"
              type="text"
              name="stock_limit"
              id="stock_limit"
              defaultValue="10"
              placeholder="Ex:10"
            />
          </div>

          {/* Sell Digital Product Toggle */}
          <div className="flex flex-col">
            <div className="flex justify-between  items-center border border-gray-300 p-2 rounded">
              <span className="text-gray-700 flex gap-1">
                Sell digital product
                <span
                  className="cursor-pointer"
                  title="If enabled, vendors can sell digital products (Software, Ebooks, Activation keys, JPG, PNG, etc.) in their shops"
                >
                  <img
                    width="16"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                    alt=""
                  />
                </span>
              </span>
              {/* <label className="switch">
                <input
                  type="checkbox"
                  className="switch-input"
                  name="digital_product"
                  id="digital-product"
                  defaultChecked
                />
                <span className="switch-control" />
              </label> */}
              <div>
              <Switcher/>
              </div>
            </div>
          </div>

          {/* Show Brand Toggle */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center border border-gray-300 p-2 rounded">
              <span className="text-gray-700 flex gap-1">
                Show brand
                <span
                  className="cursor-pointer"
                  title="If enabled, customers can see brands on the app and website. They can browse and search for products from each brand inside any shop."
                >
                  <img
                    width="16"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                    alt=""
                  />
                </span>
              </span>
              {/* <label className="switch">
                <input
                  type="checkbox"
                  className="switch-input"
                  name="product_brand"
                  id="product-brand"
                  defaultChecked
                />
                <span className="switch-control" />
              </label> */}
              <div>
                <Switcher/>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-primary px-4 py-2 text-white rounded hover:bg-primary-dark"
          style={{color:"white"}}>
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default PaymentOption