import React, { useState } from "react";
import { FaInfoCircle, FaAward } from "react-icons/fa";
import "./Customers.css";
const CustomerSettings = () => {
  const [customerWallet, setCustomerWallet] = useState(true);
  const [customerLoyaltyPoint, setCustomerLoyaltyPoint] = useState(true);
  const [refEarningStatus, setRefEarningStatus] = useState(true);
  const [refundToWallet, setRefundToWallet] = useState(true);
  const [addFundsToWallet, setAddFundsToWallet] = useState(true);

  return (
    <div className="content container-fluid">
      <form
        action="https://6valley.6amtech.com/admin/customer/customer-settings"
        method="post"
        id="update-settings"
      >
        <input
          type="hidden"
          name="_token"
          value="1I376oev7rTjCrynaBneLy7MPY6CaQg4Qg2KcjWg"
          autoComplete="off"
        />
        <div className="card mb-3">
          <div className="card-body">
            <div className="row align-items-end gy-2">
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color text-capitalize flex items-center">
                    Customer wallet
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether wallet will be available on customer profile by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="customer-wallet">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="customer_wallet"
                      id="customer-wallet"
                      value="1"
                      checked={customerWallet}
                      onChange={() => setCustomerWallet(!customerWallet)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="customer-wallet"
                      data-on-image="customer-wallet-on.png"
                      data-off-image="customer-wallet-off.png"
                      data-on-title="Want to Turn ON Customer Wallet"
                      data-off-title="Want to Turn OFF Customer Wallet"
                      data-on-message="<p>If enabled customers can have the wallet option on their account and use it while placing orders and getting refunds</p>"
                      data-off-message="<p>If disabled customer wallet option will be hidden from their account</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Customer Loyalty Point
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers will get loyalty points by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="customer-loyalty-point">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="customer_loyalty_point"
                      id="customer-loyalty-point"
                      value="1"
                      checked={customerLoyaltyPoint}
                      onChange={() =>
                        setCustomerLoyaltyPoint(!customerLoyaltyPoint)
                      }
                      data-modal-id="toggle-modal"
                      data-toggle-id="customer-loyalty-point"
                      data-on-image="loyalty-on.png"
                      data-off-image="loyalty-off.png"
                      data-on-title="Want to Turn ON Loyalty Point"
                      data-off-title="Want to Turn OFF Loyalty Point"
                      data-on-message="<p>If enabled the loyalty point option will be available to the customers account</p>"
                      data-off-message="<p>If disabled loyalty point option will be hidden from the customers account</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center gap-1">
                    Customer referral earning
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers will get referral earnings by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="ref-earning-status">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="ref_earning_status"
                      id="ref-earning-status"
                      value="1"
                      checked={refEarningStatus}
                      onChange={() => setRefEarningStatus(!refEarningStatus)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="ref-earning-status"
                      data-on-image="referral-earning-on.png"
                      data-off-image="referral-earning-off.png"
                      data-on-title="Want to Turn ON Referral And Earning option"
                      data-off-title="Want to Turn OFF Referral And Earning option"
                      data-on-message="<p>If enabled customers will receive rewards for each successful referral</p>"
                      data-off-message="<p>If disabled customers will not receive rewards for successful referral</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="border-bottom px-4 py-3">
            <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/vector.png"
                alt=""
              />{" "}
              Customer Wallet Settings
              <span
                className="input-label-secondary cursor-pointer"
                data-toggle="tooltip"
                data-placement="right"
                title=""
                data-original-title="If the Customer Wallet option is disabled above all settings of this section will be unavailable"
              >
                <FaInfoCircle width="16" />
              </span>
            </h5>
          </div>
          <div className="card-body">
            <div className="row align-items-end gy-2">
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Add Refund Amount to Wallet
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers will get refund amount to wallet by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="refund-to-wallet">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="refund_to_wallet"
                      id="refund-to-wallet"
                      value="1"
                      checked={refundToWallet}
                      onChange={() => setRefundToWallet(!refundToWallet)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="refund-to-wallet"
                      data-on-image="refund-wallet-on.png"
                      data-off-image="refund-wallet-off.png"
                      data-on-title="Want to Turn ON Refund to Wallet option"
                      data-off-title="Want to Turn OFF Refund to Wallet option"
                      data-on-message="<p>If enabled Admin can return the refund amount directly to the customers wallet</p>"
                      data-off-message="<p>If disabled Admin needs to return the refund amount manually</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Add Fund to Wallet
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers can add money to their wallets by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="add-funds-to-wallet">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="add_funds_to_wallet"
                      id="add-funds-to-wallet"
                      value="1"
                      checked={addFundsToWallet}
                      onChange={() => setAddFundsToWallet(!addFundsToWallet)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="add-funds-to-wallet"
                      data-on-image="wallet-on.png"
                      data-off-image="wallet-off.png"
                      data-on-title="Want to Turn ON Add Funds to Wallet option"
                      data-off-title="Want to Turn OFF Add Funds to Wallet option"
                      data-on-message="<p>If enabled the add fund option will be available in the customers account</p>"
                      data-off-message="<p>If disabled the add fund option will be hidden in the customers account</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center gap-1">
                    Wallet to Wallet Transfer
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers can transfer money from one wallet to another by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label
                    className="switcher"
                    htmlFor="wallet-to-wallet-transfer"
                  >
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="wallet_to_wallet_transfer"
                      id="wallet-to-wallet-transfer"
                      value="1"
                      checked={true} // Assuming it's always checked based on provided HTML
                      onChange={() => {}}
                      data-modal-id="toggle-modal"
                      data-toggle-id="wallet-to-wallet-transfer"
                      data-on-image="wallet-transfer-on.png"
                      data-off-image="wallet-transfer-off.png"
                      data-on-title="Want to Turn ON Wallet to Wallet Transfer option"
                      data-off-title="Want to Turn OFF Wallet to Wallet Transfer option"
                      data-on-message="<p>If enabled customers can transfer money from their wallet to another wallet</p>"
                      data-off-message="<p>If disabled customers cannot transfer money from their wallet to another wallet</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color d-flex align-items-center gap-1">
                    Customer Wallet Balance Adjustment
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers can adjust their wallet balance by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label
                    className="switcher"
                    htmlFor="wallet-balance-adjustment"
                  >
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="wallet_balance_adjustment"
                      id="wallet-balance-adjustment"
                      value="1"
                      checked={true} // Assuming it's always checked based on provided HTML
                      onChange={() => {}}
                      data-modal-id="toggle-modal"
                      data-toggle-id="wallet-balance-adjustment"
                      data-on-image="balance-adjustment-on.png"
                      data-off-image="balance-adjustment-off.png"
                      data-on-title="Want to Turn ON Wallet Balance Adjustment option"
                      data-off-title="Want to Turn OFF Wallet Balance Adjustment option"
                      data-on-message="<p>If enabled customers can adjust their wallet balance directly from their account</p>"
                      data-off-message="<p>If disabled customers cannot adjust their wallet balance directly from their account</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Wallet Balance Withdrawal
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title=""
                      data-original-title="Admin can set whether customers can withdraw money from their wallets by enabling or disabling this button"
                    >
                      <FaInfoCircle width="16" />
                    </span>
                  </span>
                  <label
                    className="switcher"
                    htmlFor="wallet-balance-withdrawal"
                  >
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="wallet_balance_withdrawal"
                      id="wallet-balance-withdrawal"
                      value="1"
                      checked={true} // Assuming it's always checked based on provided HTML
                      onChange={() => {}}
                      data-modal-id="toggle-modal"
                      data-toggle-id="wallet-balance-withdrawal"
                      data-on-image="wallet-withdrawal-on.png"
                      data-off-image="wallet-withdrawal-off.png"
                      data-on-title="Want to Turn ON Wallet Balance Withdrawal option"
                      data-off-title="Want to Turn OFF Wallet Balance Withdrawal option"
                      data-on-message="<p>If enabled customers can withdraw money from their wallet directly</p>"
                      data-off-message="<p>If disabled customers cannot withdraw money from their wallet directly</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customer Wallet Settings */}
        <div className="card mb-3">
          <div className="card-body">
            <div className="row align-items-end gy-2">
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color text-capitalize flex items-center">
                    Customer wallet
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Admin can set whether wallet will be available on customer profile by enabling or disabling this button"
                    >
                      <FaInfoCircle />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="customer-wallet">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="customer_wallet"
                      id="customer-wallet"
                      value="1"
                      checked={customerWallet}
                      onChange={() => setCustomerWallet(!customerWallet)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="customer-wallet"
                      data-on-image="customer-wallet-on.png"
                      data-off-image="customer-wallet-off.png"
                      data-on-title="Want to Turn ON Customer Wallet"
                      data-off-title="Want to Turn OFF Customer Wallet"
                      data-on-message="<p>If enabled customers can have the wallet option on their account and use it while placing orders and getting refunds</p>"
                      data-off-message="<p>If disabled customer wallet option will be hidden from their account</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>

              {/* Customer Loyalty Point */}
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Customer Loyalty Point
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Admin can set whether customers will get loyalty points by enabling or disabling this button"
                    >
                      <FaInfoCircle />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="customer-loyalty-point">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="customer_loyalty_point"
                      id="customer-loyalty-point"
                      value="1"
                      checked={customerLoyaltyPoint}
                      onChange={() =>
                        setCustomerLoyaltyPoint(!customerLoyaltyPoint)
                      }
                      data-modal-id="toggle-modal"
                      data-toggle-id="customer-loyalty-point"
                      data-on-image="loyalty-on.png"
                      data-off-image="loyalty-off.png"
                      data-on-title="Want to Turn ON Loyalty Point"
                      data-off-title="Want to Turn OFF Loyalty Point"
                      data-on-message="<p>If enabled the loyalty point option will be available to the customers account</p>"
                      data-off-message="<p>If disabled loyalty point option will be hidden from the customers account</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>

              {/* Customer Referral Earning */}
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color d-flex align-items-center gap-1">
                    Customer referral earning
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Admin can set whether customers will get referral earnings by enabling or disabling this button"
                    >
                      <FaInfoCircle />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="ref-earning-status">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="ref_earning_status"
                      id="ref-earning-status"
                      value="1"
                      checked={refEarningStatus}
                      onChange={() => setRefEarningStatus(!refEarningStatus)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="ref-earning-status"
                      data-on-image="referral-earning-on.png"
                      data-off-image="referral-earning-off.png"
                      data-on-title="Want to Turn ON Referral And Earning option"
                      data-off-title="Want to Turn OFF Referral And Earning option"
                      data-on-message="<p>If enabled customers will receive rewards for each successful referral</p>"
                      data-off-message="<p>If disabled customers will not receive rewards for successful referral</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Customer Wallet Settings */}
        <div className="card mb-3">
          <div className="border-bottom px-4 py-3">
            <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/vector.png"
                alt=""
              />
              Customer Wallet Settings
              <span
                className="input-label-secondary cursor-pointer"
                data-toggle="tooltip"
                data-placement="right"
                title="If the Customer Wallet option is disabled above all settings of this section will be unavailable"
              >
                <FaInfoCircle />
              </span>
            </h5>
          </div>
          <div className="card-body">
            <div className="row align-items-end gy-2">
              {/* Refund Amount to Wallet */}
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Add Refund Amount to Wallet
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Admin can set whether customers will get refund amount to wallet by enabling or disabling this button"
                    >
                      <FaInfoCircle />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="refund-to-wallet">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="refund_to_wallet"
                      id="refund-to-wallet"
                      value="1"
                      checked={refundToWallet}
                      onChange={() => setRefundToWallet(!refundToWallet)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="refund-to-wallet"
                      data-on-image="refund-wallet-on.png"
                      data-off-image="refund-wallet-off.png"
                      data-on-title="Want to Turn ON Refund to Wallet option"
                      data-off-title="Want to Turn OFF Refund to Wallet option"
                      data-on-message="<p>If enabled Admin can return the refund amount directly to the customers wallet</p>"
                      data-off-message="<p>If disabled Admin needs to return the refund amount manually</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>

              {/* Add Fund to Wallet */}
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control">
                  <span className="title-color flex items-center">
                    Add Fund to Wallet
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Admin can set whether customers can add money to their wallets by enabling or disabling this button"
                    >
                      <FaInfoCircle />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="add-funds-to-wallet">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="add_funds_to_wallet"
                      id="add-funds-to-wallet"
                      value="1"
                      checked={addFundsToWallet}
                      onChange={() => setAddFundsToWallet(!addFundsToWallet)}
                      data-modal-id="toggle-modal"
                      data-toggle-id="add-funds-to-wallet"
                      data-on-image="wallet-on.png"
                      data-off-image="wallet-off.png"
                      data-on-title="Want to Turn ON Add Fund to Wallet option"
                      data-off-title="Want to Turn OFF Add Fund to Wallet option"
                      data-on-message="<p>If enabled Admin can add fund to customer wallet</p>"
                      data-off-message="<p>If disabled Admin will not be able to add fund to customer wallet</p>"
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-primary-dark px-3 py-2"
            style={{color:"white"}}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerSettings;
