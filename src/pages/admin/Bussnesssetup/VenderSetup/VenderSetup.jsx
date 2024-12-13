import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineInbox } from "react-icons/ai"; // Using AiOutlineInbox instead
import { IoSettingsSharp } from "react-icons/io5";

const BussnessVendorSetup = () => {
  const [defaultCommission, setDefaultCommission] = useState(15);
  const [isPosEnabled, setIsPosEnabled] = useState(true);
  const [isVendorRegistrationEnabled, setIsVendorRegistrationEnabled] =
    useState(true);
  const [isMinOrderAmountEnabled, setIsMinOrderAmountEnabled] = useState(false);
  const [isNewProductApprovalRequired, setIsNewProductApprovalRequired] =
    useState(true);
  const [
    isProductWiseShippingCostApprovalRequired,
    setIsProductWiseShippingCostApprovalRequired,
  ] = useState(true);

  const handleSave = (event) => {
    event.preventDefault();
    // Add your save logic here
    console.log("Settings saved:", {
      defaultCommission,
      isPosEnabled,
      isVendorRegistrationEnabled,
      isMinOrderAmountEnabled,
      isNewProductApprovalRequired,
      isProductWiseShippingCostApprovalRequired,
    });
  };

  return (
    <div className="content container-fluid snipcss-UKxOs">
      <form action="#" method="post">
        <input
          type="hidden"
          name="_token"
          value="1I376oev7rTjCrynaBneLy7MPY6CaQg4Qg2KcjWg"
          autoComplete="off"
        />
        <div className="card">
          <div className="border-bottom px-4 py-3">
            <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
              <AiOutlineInbox size={22} /> {/* Used AiOutlineInbox here */}
              Vendor setup
            </h5>
          </div>
          <div className="card-body">
            <div className="row align-items-end">
              <div className="col-xl-4 col-md-6">
                <div className="form-group">
                  <label className="title-color d-flex align-items-center gap-2">
                    Default commission
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Set the default commission amount that will be received from vendors on each order"
                    >
                      <FaInfoCircle size={16} />
                    </span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="commission"
                    value={defaultCommission}
                    onChange={(e) => setDefaultCommission(e.target.value)}
                    placeholder="Ex: 70"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control form-group">
                  <span className="title-color flex items-center">
                    Enable POS in Vendor Panel
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="If enabled POS will be available on the Vendor Panel"
                    >
                      <FaInfoCircle size={16} />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="vendor-pos">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="seller_pos"
                      id="vendor-pos"
                      value="1"
                      checked={isPosEnabled}
                      onChange={(e) => setIsPosEnabled(e.target.checked)}
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control form-group">
                  <span className="title-color flex items-center">
                    Vendor registration
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="If enabled vendors can send registration requests to admin"
                    >
                      <FaInfoCircle size={16} />
                    </span>
                  </span>
                  <label className="switcher" htmlFor="vendor-registration">
                    <input
                      type="checkbox"
                      className="switcher_input toggle-switch-message"
                      name="seller_registration"
                      id="vendor-registration"
                      checked={isVendorRegistrationEnabled}
                      onChange={(e) =>
                        setIsVendorRegistrationEnabled(e.target.checked)
                      }
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6">
                <div className="d-flex justify-content-between align-items-center gap-10 form-control form-group">
                  <span className="title-color flex items-center">
                    Set minimum order amount
                    <span
                      className="input-label-secondary cursor-pointer"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="If enabled Vendors can set minimum order amount for their stores by themselves"
                    >
                      <FaInfoCircle size={16} />
                    </span>
                  </span>
                  <label
                    className="switcher"
                    htmlFor="minimum-order-amount-by-vendor"
                  >
                    <input
                      type="checkbox"
                      value="1"
                      className="switcher_input toggle-switch-message"
                      name="minimum_order_amount_by_seller"
                      id="minimum-order-amount-by-vendor"
                      checked={isMinOrderAmountEnabled}
                      onChange={(e) =>
                        setIsMinOrderAmountEnabled(e.target.checked)
                      }
                    />
                    <span className="switcher_control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3">
          <div className="border-bottom px-4 py-3">
            <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
              <AiOutlineInbox size={20} /> {/* Used AiOutlineInbox here */}
              Need product approval
              <span
                className="input-label-secondary cursor-pointer"
                data-toggle="tooltip"
                data-placement="right"
                title="Set whether Vendors need admin approval before adding new products to their shops"
              >
                <FaInfoCircle size={16} />
              </span>
            </h5>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center flex-wrap gap-4">
              <div className="d-flex align-items-center gap-2">
                <input
                  name="new_product_approval"
                  type="checkbox"
                  value="1"
                  id="new_product_approval"
                  checked={isNewProductApprovalRequired}
                  onChange={(e) =>
                    setIsNewProductApprovalRequired(e.target.checked)
                  }
                />
                <label
                  className="title-color mb-0"
                  htmlFor="new_product_approval"
                >
                  {" "}
                  New product{" "}
                </label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  name="product_wise_shipping_cost_approval"
                  type="checkbox"
                  value="1"
                  id="product_wise_shipping_cost_approval"
                  checked={isProductWiseShippingCostApprovalRequired}
                  onChange={(e) =>
                    setIsProductWiseShippingCostApprovalRequired(
                      e.target.checked
                    )
                  }
                />
                <label
                  className="title-color mb-0 text-left"
                  htmlFor="product_wise_shipping_cost_approval"
                >
                  Product wise shipping cost
                  <span className="text-info">
                    {" "}
                    ( This feature will activate whenever a Vendor adds a
                    product or modifies the shipping cost of any product )
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            type="submit"
            className="btn bg-primary  hover:bg-primary-dark py-2 px-4"
            style={{color:"white"}}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BussnessVendorSetup;
