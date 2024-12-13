import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

const DeliveryManSettings = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="card snipcss-Wg9WB">
      <div className="border-bottom px-4 py-3">
        <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2 text-capitalize">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/header-logo.png"
            alt=""
          />{" "}
          Delivery Man Settings
        </h5>
      </div>
      <div className="card-body">
        <form
          action="https://6valley.6amtech.com/admin/business-settings/delivery-man-settings/delivery-man-settings/update"
          method="post"
          encType="multipart/form-data"
          id="add_fund"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="_token"
            value="1I376oev7rTjCrynaBneLy7MPY6CaQg4Qg2KcjWg"
            autoComplete="off"
          />
          <div className="row align-items-end">
            <div className="col-xl-4 col-md-6">
              <div className="form-group d-flex justify-content-between align-items-center gap-10 form-control">
                <span className="title-color flex items-center text-nowrap">
                  Upload Picture on Delivery{" "}
                  <span
                    className="input-label-secondary cursor-pointer"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Admin can set whether deliveryman needs to upload the picture of delivery by enabling or disabling this button"
                  >
                    <AiOutlineInfoCircle width="16" />
                  </span>
                </span>
                <label
                  className="switcher"
                  htmlFor="upload_picture_on_delivery"
                >
                  <input
                    type="checkbox"
                    className="switcher_input toggle-switch-message"
                    name="upload_picture_on_delivery"
                    id="upload_picture_on_delivery"
                    value="1"
                    data-modal-id="toggle-modal"
                    data-toggle-id="upload_picture_on_delivery"
                    data-on-image="upload-picture-on.png"
                    data-off-image="upload-picture-off.png"
                    data-on-title="By Turning ON Picture Upload on Delivery"
                    data-off-title="By Turning OFF Picture Upload on Delivery"
                    data-on-message="<p>If enabled deliverymen can upload picture at the order deliveries time</p>"
                    data-off-message="<p>If enabled deliverymen can not upload picture at the order deliveries time</p>"
                  />
                  <span className="switcher_control">
                    {/* <BsToggleOn className="status" />
                    <BsToggleOff className="slider" /> */}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              id="submit"
              className="btn bg-primary  hover:bg-primary-dark py-2 px-4"
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

export default DeliveryManSettings;
