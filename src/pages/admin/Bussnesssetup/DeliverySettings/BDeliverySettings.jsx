import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const BDeliverySettings = () => {
  // Handler for form submission
  const handleCountryFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here for country restriction
    console.log('Country form submitted');
  };

  const handleZipFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here for zip code restriction
    console.log('Zip code form submitted');
  };

  return (
    <div className="card mb-3 snipcss-xsTns">
      <div className="card-header">
        <h5 className="mb-0 text-capitalize d-flex gap-2">
          <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/delivery2.png" alt="Delivery Icon" /> Delivery
        </h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center gap-10 form-control h-auto min-form-control-height mt-2" id="customer_wallet_section">
              <span className="title-color flex justify-center align-items-center gap-1">
                Delivery available country 
                <span className="input-label-secondary cursor-pointer" data-toggle="tooltip" data-placement="right" title="" data-original-title="If enabled, you can choose one or multiple countries for product delivery.">
                  <AiOutlineInfoCircle size={16} />
                </span>
              </span>
              <form onSubmit={handleCountryFormSubmit} id="country-area-form" data-from="delivery-restriction">
                <input type="hidden" name="_token" value="1I376oev7rTjCrynaBneLy7MPY6CaQg4Qg2KcjWg" autoComplete="off" />
                <label className="switcher">
                  <input 
                    type="checkbox" 
                    className="switcher_input toggle-switch-message" 
                    name="status" 
                    id="country-area" 
                    value="1" 
                    data-modal-id="toggle-status-modal" 
                    data-toggle-id="country-area" 
                    data-on-image="delivery-available-country-on.png" 
                    data-off-image="delivery-available-country-off.png" 
                    data-on-title="Want to Turn ON Delivery Available Country?" 
                    data-off-title="Want to Turn OFF Delivery Available Country?" 
                    data-on-message="<p>If enabled, the admin or vendor can deliver orders to the selected countries.</p>" 
                    data-off-message="<p>If disabled, there will be no delivery restrictions for admin or vendors.</p>" 
                  />
                  <span className="switcher_control"></span>
                </label>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center gap-10 form-control h-auto min-form-control-height mt-2" id="customer_wallet_section">
              <span className="title-color">
                Delivery available zip code area 
                <span className="input-label-secondary cursor-pointer" data-toggle="tooltip" data-placement="right" title="" data-original-title="If enabled, the zip code areas will be available for delivery. Please Note: If you don’t enter a specific zip code from a country, that area won’t be available for delivery.">
                  {/* <AiOutlineInfoCircle size={16} /> */}
                </span>
              </span>
              <form onSubmit={handleZipFormSubmit} id="zip-area-form" data-from="delivery-restriction">
                <input type="hidden" name="_token" value="1I376oev7rTjCrynaBneLy7MPY6CaQg4Qg2KcjWg" autoComplete="off" />
                <label className="switcher">
                  <input 
                    type="checkbox" 
                    className="switcher_input toggle-switch-message" 
                    name="status" 
                    id="zip-area" 
                    value="1" 
                    data-modal-id="toggle-status-modal" 
                    data-toggle-id="zip-area" 
                    data-on-image="zip-code-on.png" 
                    data-off-image="zip-code-off.png" 
                    data-on-title="Want to Turn ON Delivery Available Zip Code Area?" 
                    data-off-title="Want to Turn OFF Delivery Available Zip Code Area?" 
                    data-on-message="<p>If enabled, deliveries will be available only in the added zip code areas.</p>" 
                    data-off-message="<p>If disabled, there will be no delivery restrictions based on zip code areas.</p>" 
                  />
                  <span className="switcher_control"></span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BDeliverySettings;
