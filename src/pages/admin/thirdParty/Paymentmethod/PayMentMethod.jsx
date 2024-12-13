import React from "react";

const PayMentMethod = () => {
  return (
    <div className="row gy-3" id="payment-gateway-cards">
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5>
                <span className="text-uppercase text-md font-extrabold">
                  mercadopago
                </span>
              </h5>
              <label className="switcher show-status-text">
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/storage/app/public/payment_modules/gateway_image/2024-01-28-65b6439e44330.png"
                  alt="Public"
                />
              </div>

              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Access Token <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Access Token *"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Public Key * <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Public Key **"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Payment Gateway Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Payment Gateway Title *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-5"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Liqpay Card */}
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5>
                <span className="text-uppercase text-md font-extrabold">
                  LIQPAY
                </span>
              </h5>
              <label className="switcher show-status-text">
                {/* Replace input and label with dynamic data */}
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/storage/app/public/payment_modules/gateway_image/2024-01-28-65b643b137b00.png"
                  alt="Public"
                />
              </div>
              {/* Replace form fields dynamically */}
              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Access Token <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Access Token *"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Public Key * <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Public Key **"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Payment Gateway Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Payment Gateway Title *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-5"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* PayPal Card */}
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5 className="">
                <span className="text-uppercase text-md font-extrabold">
                  PAYPAL
                </span>
              </h5>
              <label className="switcher show-status-text">
                {/* Replace input and label with dynamic data */}
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/storage/app/public/payment_modules/gateway_image/2024-01-28-65b643be8a4b9.png"
                  alt="Public"
                />
              </div>
              {/* Replace form fields dynamically */}
              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Client Id <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Client Id *"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Client Secret* <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Client Secret**"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Payment Gateway Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Payment Gateway Title *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-5"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Stripe Card */}
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5 className="">
                <span className="text-uppercase text-md font-extrabold">
                  Strip
                </span>
              </h5>
              <label className="switcher show-status-text">
                {/* Replace input and label with dynamic data */}
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/storage/app/public/payment_modules/gateway_image/2024-01-28-65b643c85feaf.png"
                  alt="Public"
                />
              </div>
              {/* Replace form fields dynamically */}
              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Api Key<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Api Key*"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Published Key * <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Published Key **"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Payment Gateway Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Payment Gateway Title *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-4 py-2"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Razor Pay Card */}
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5 className="">
                <span className="text-uppercase text-md font-extrabold">
                  RAZOR PAY
                </span>
              </h5>
              <label className="switcher show-status-text">
                {/* Replace input and label with dynamic data */}
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/storage/app/public/payment_modules/gateway_image/2024-01-28-65b643d5d97ed.png"
                  alt="Public"
                />
              </div>
              {/* Replace form fields dynamically */}
              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Api Key<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Api Key*"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Api Secret * <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Api Secret **"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Payment Gateway Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Payment Gateway Title *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-5"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* SSL COMMERZ Card */}
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5 className="">
                <span className="text-uppercase text-md font-extrabold">
                  SSL COMMERZ
                </span>
              </h5>
              <label className="switcher show-status-text">
                {/* Replace input and label with dynamic data */}
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/storage/app/public/payment_modules/gateway_image/2023-10-31-6540ae52594a5.png"
                  alt="Public"
                />
              </div>
              {/* Replace form fields dynamically */}
              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Store Id<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Store Id*"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Store Password* <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Store Password*"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Payment Gateway Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Payment Gateway Title *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark-500 px-5"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/*PAYTMCard */}
      <div className="col-md-6">
        <div className="card">
          <form
            action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set"
            method="POST"
            id="mercadopago-form"
            encType="multipart/form-data"
          >
            {/* Replace hidden inputs and other form elements as per your need */}
            <div className="card-header d-flex flex-wrap align-content-around">
              <h5 className="">
                <span className="text-uppercase text-md font-extrabold">
                  PAYTM
                </span>
              </h5>
              <label className="switcher show-status-text">
                {/* Replace input and label with dynamic data */}
                <input
                  className="switcher_input toggle-switch-dynamic-image"
                  type="checkbox"
                  name="status"
                  value="1"
                  id="mercadopago"
                />
                <span
                  className="switcher_control"
                  data-ontitle="On"
                  data-offtitle="Off"
                ></span>
              </label>
            </div>
            <div className="card-body">
              <div className="payment--gateway-img">
                {/* Replace image source dynamically */}
                <img
                  className="height-80px"
                  id="gateway-image-mercadopago"
                  src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/placeholder-4-1.png"
                  alt="Public"
                />
              </div>
              {/* Replace form fields dynamically */}
              <div className="form-group">
                <input name="gateway" value="mercadopago" className="d-none" />
                <select
                  name=""
                  id=""
                  className="form-label form-control outline-none hover:border-primary-500 mb-10px "
                >
                  <option value="">All</option>
                  <option value="">Live </option>
                  <option value="">Test</option>
                </select>
              </div>
              <div className="form-group ">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Profile Id<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Profile Id*"
                  value=""
                />
              </div>
              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Server Key* <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Server Key*"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Base Url <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control outline-none hover:border-primary-500"
                  name="access_token"
                  placeholder="Base Url *"
                  value=""
                />
              </div>

              <div className="form-group mb-10px">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Choose Logo <span className="text-danger">*</span>
                </label>
                <input
                  className="block form-control outline-none hover:border-primary-500 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="file_input"
                  type="file"
                />
              </div>

              {/* Add more fields as needed */}
              <div className="text-right mb-20px">
                <button
                  type="submit"
                  className="btn bg-primary-500 text-white hover:bg-primary-dark px-5"
                  style={{ color: "white" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayMentMethod;

// import React from 'react';
// import PaymentGatewayCard from './PaymentGatewayCard';

// const PayMentMethod = () => {
//   // Define state or fetch data for each payment gateway
//   const paymentGateways = [
//     {
//       gatewayName: 'mercadopago',
//       gatewayTitle: 'Mercadopago',
//       status: true,
//       mode: 'test',
//       accessKey: 'Your Access Token',
//       publicKey: 'Your Public Key',
//       gatewayImage: 'https://example.com/path-to-image.png', // Replace with actual image URL
//     },
//     {
//       gatewayName: 'paypal',
//       gatewayTitle: 'Paypal',
//       status: true,
//       mode: 'test',
//       clientId: 'Your Client Id',
//       clientSecret: 'Your Client Secret',
//       gatewayImage: 'https://example.com/path-to-image.png', // Replace with actual image URL
//     },
//     // Add more payment gateways as needed
//   ];

//   const toggleHandler = (event) => {
//     // Handle toggle switch logic here
//     console.log('Toggle handler');
//   };

//   return (
//     <div className="content container-fluid snipcss-MTeLU">
//       <div className="mb-4 pb-2">
//         <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
//           <img src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png" alt="" /> 3rd party
//         </h2>
//       </div>
//       <div className="inline-page-menu my-4">
//         <ul className="list-unstyled">
//           <li className="active"><a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/payment-method">Digital payment methods</a></li>
//           <li><a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/offline-payment-method/index">Offline payment methods</a></li>
//         </ul>
//       </div>
//       <div className="row gy-3" id="payment-gateway-cards">
//         {paymentGateways.map((gateway) => (
//           <PaymentGatewayCard key={gateway.gatewayName} {...gateway} toggleHandler={toggleHandler} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PayMentMethod;
