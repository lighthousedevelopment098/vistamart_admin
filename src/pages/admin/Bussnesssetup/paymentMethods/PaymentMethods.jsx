import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <form
          action="https://6valley.6amtech.com/admin/business-settings/payment-method/payment-option"
          method="post"
          className="text-left"
        >
         <h1 className='mb-4 font-bold'>Payment Methods</h1>
          <div className="row">
            {/* Cash on Delivery Toggle */}
            <div className="col-xl-4 col-sm-6">
              <div className="form-group">
                <div className="d-flex justify-between items-center gap-2 p-2 border rounded-lg">
                  <span className="title-color flex items-center">
                    Cash on delivery
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="If enabled, the cash on delivery option will be available on the system. Customers can use COD as a payment option."
                    >
                      <img
                        width="16"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                        alt="Info"
                      />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="cash-on-delivery">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="cash_on_delivery"
                      id="cash-on-delivery"
                      value="1"
                      defaultChecked
                      data-modal-id="toggle-modal"
                      data-toggle-id="cash-on-delivery"
                      data-on-image="cod-on.png"
                      data-off-image="cod-off.png"
                      data-on-title="Turn ON Cash On Delivery option"
                      data-off-title="Turn OFF Cash On Delivery option"
                      data-on-message="<p>If enabled customers can select Cash on Delivery as a payment method during checkout</p>"
                      data-off-message="<p>If disabled the Cash on Delivery payment method will be hidden from the checkout page</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Digital Payment Toggle */}
            <div className="col-xl-4 col-sm-6">
              <div className="form-group">
                <div className="d-flex justify-between items-center gap-2 p-2 border rounded-lg">
                  <span className="title-color flex items-center">
                    Digital payment
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="If enabled, customers can choose digital payment options during checkout."
                    >
                      <img
                        width="16"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                        alt="Info"
                      />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="digital-payment">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="digital_payment"
                      id="digital-payment"
                      value="1"
                      defaultChecked
                      data-modal-id="toggle-modal"
                      data-toggle-id="digital-payment"
                      data-on-image="digital-payment-on.png"
                      data-off-image="digital-payment-off.png"
                      data-on-title="Turn ON Digital Payment option"
                      data-off-title="Turn OFF Digital Payment option"
                      data-on-message="<p>If enabled customers can select Digital Payment during checkout</p>"
                      data-off-message="<p>If disabled Digital Payment options will be hidden from the checkout page</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Offline Payment Toggle */}
            <div className="col-xl-4 col-sm-6">

              <div className="form-group">
                
                <div className="d-flex justify-between items-center gap-2 p-2 border rounded-lg">
                  <span className="title-color flex items-center">
                    Offline payment
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Offline Payment allows customers to use external payment methods. They must share payment details with the vendor afterward."
                    >
                      <img
                        width="16"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
                        alt="Info"
                      />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="offline-payment">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="offline_payment"
                      id="offline-payment"
                      value="1"
                      defaultChecked
                      data-modal-id="toggle-modal"
                      data-toggle-id="offline-payment"
                      data-on-image="digital-payment-on.png"
                      data-off-image="digital-payment-off.png"
                      data-on-title="Turn ON Offline Payment option"
                      data-off-title="Turn OFF Offline Payment option"
                      data-on-message="<p>If enabled, customers can pay through external payment methods</p>"
                      data-off-message="<p>If disabled, customers have to use the system-added payment gateways</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="col-12">
              <div className="flex justify-end">
                <button type="submit" className="btn btn--primary bg-primary hover:bg-primary-dark px-5 uppercase"
                style={{color:"white"}}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethods;
