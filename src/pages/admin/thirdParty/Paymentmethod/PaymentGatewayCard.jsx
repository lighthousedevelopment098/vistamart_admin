import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PaymentGatewayCard = ({
  gatewayName,
  gatewayTitle,
  status,
  toggleHandler,
  mode,
  accessKey,
  publicKey,
  clientId,
  clientSecret,
  apiKey,
  publishedKey,
  gatewayImage,
}) => {
  const toggleIcon = status ? faCheckCircle : faTimesCircle;

  return (
    <div className="col-md-6">
      <div className="card">
        <form action="https://6valley.6amtech.com/admin/business-settings/payment-method/addon-payment-set" method="POST" id={`${gatewayName}-form`} encType="multipart/form-data">
          <input type="hidden" name="_token" value="NUpqhZtm7pRjhaqQhQPJVPmT5ShZIbb5yd6KyYU7" autoComplete="off" />
          <input type="hidden" name="_method" value="PUT" />
          <div className="card-header d-flex flex-wrap align-content-around">
            <h5>
              <span className="text-uppercase">{gatewayTitle}</span>
            </h5>
            <label className="switcher show-status-text">
              <input
                className="switcher_input toggle-switch-dynamic-image"
                type="checkbox"
                name="status"
                value="1"
                id={gatewayName}
                checked={status}
                onChange={toggleHandler}
                data-modal-id="toggle-modal"
                data-toggle-id={gatewayName}
                data-on-image={gatewayImage}
                data-off-image={gatewayImage}
                data-on-title={`Want to Turn ON ${gatewayTitle.toUpperCase()} as the Digital Payment method?`}
                data-off-title={`Want to Turn OFF ${gatewayTitle.toUpperCase()} as the Digital Payment method?`}
                data-on-message="<p>If enabled customers can use this payment method</p>"
                data-off-message="<p>If disabled this payment method will be hidden from the checkout page</p>"
              />
              <span className="switcher_control" data-ontitle="On" data-offtitle="Off">
                <FontAwesomeIcon icon={toggleIcon} className={`text-${status ? 'success' : 'danger'}`} />
              </span>
            </label>
          </div>
          <div className="card-body">
            <div className="payment--gateway-img">
              <img className="height-80px" id={`gateway-image-${gatewayName}`} src={gatewayImage} alt="Public" />
            </div>
            <input name="gateway" value={gatewayName} className="d-none" />
            <div className="form-group mb-10px">
              <select className="js-example-responsive form-control select2-hidden-accessible" name="mode" value={mode} tabIndex="-1" aria-hidden="true">
                <option value="live">Live</option>
                <option value="test">Test</option>
              </select>
            </div>
            {gatewayName === 'mercadopago' && (
              <>
                <div className="form-group mb-10px">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Access Token <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="access_token" placeholder="Access Token *" value={accessKey} />
                </div>
                <div className="form-group mb-10px">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Public Key <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="public_key" placeholder="Public Key *" value={publicKey} />
                </div>
              </>
            )}
            {gatewayName === 'paypal' && (
              <>
                <div className="form-group mb-10px">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Client Id <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="client_id" placeholder="Client Id *" value={clientId} />
                </div>
                <div className="form-group mb-10px">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Client Secret <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="client_secret" placeholder="Client Secret *" value={clientSecret} />
                </div>
              </>
            )}
            {gatewayName === 'stripe' && (
              <>
                <div className="form-group mb-10px">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Api Key <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="api_key" placeholder="Api Key *" value={apiKey} />
                </div>
                <div className="form-group mb-10px">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Published Key <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="published_key" placeholder="Published Key *" value={publishedKey} />
                </div>
              </>
            )}
            <div className="form-group mb-10px">
              <label htmlFor="exampleFormControlInput1" className="form-label">Payment gateway title <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="gateway_title" placeholder="Payment gateway title" value={gatewayTitle} required />
            </div>
            <div className="form-group mb-10px">
              <label htmlFor="exampleFormControlInput1" className="form-label text-capitalize">Choose logo </label>
              <input type="file" className="form-control image-input" name="gateway_image" accept=".jpg, .png, .jpeg|image/*" data-image-id={`gateway-image-${gatewayName}`} />
            </div>
            <div className="text-right mb-20px">
              <button type="submit" className="btn btn-primary px-5">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentGatewayCard;
