import React, { useState } from "react";
import { FaServer } from "react-icons/fa";

const EnvironmentSettings = () => {
  const [activeMenu, setActiveMenu] = useState("environment"); // State to track active menu

  // Sample data array for menu items and corresponding forms
  const menuItems = [
    {
      id: "environment",
      icon: <FaServer />,
      title: "Environment Settings",
      url: "https://6valley.6amtech.com/admin/business-settings/web-config/environment-setup",
      formFields: [
        { label: "App name", value: "", disabled: true },
        { label: "App debug", value: "False", options: ["True", "False"] },
        { label: "App mode", value: "Live", options: ["Live", "Dev"] },
        {
          label: "App URL",
          value: "",
          disabled: true,
        },
        { label: "DB connection", value: "---", disabled: true },
        { label: "DB host", value: "---", disabled: true },
        { label: "DB port", value: "---", disabled: true },
        { label: "DB database", value: "---", disabled: true },
        { label: "DB username", value: "---", disabled: true },
        { label: "DB password", value: "---", disabled: true },
        {
          label: "Buyer username",
          value: "",
          disabled: true,
        },
        { label: "Purchase code", value: "", type: "password", disabled: true },
      ],
    },

    // Add more menu items as needed
  ];

  // Function to handle menu item click
  const handleMenuItemClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <div className="content container-fluid snipcss-KUtWb">
      <div className="card">
        {menuItems.map((item) => (
          <div key={item.id} className={item.id === activeMenu ? "" : "d-none"}>
            <div className="border-bottom px-4 py-3">
              <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
                {item.icon} {item.title}
              </h5>
            </div>
            <div className="card-body">
              <form
                action={item.url}
                method="post"
                encType="multipart/form-data"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="Twvhv0EJYa0GUycFmHJFzLVQRODPOpx9nQxb0DbE"
                  autoComplete="off"
                />
                <div className="row">
                  {item.formFields.map((field, index) => (
                    <div
                      key={index}
                      className={`col-${index === 0 ? "12" : "4"} col-md-4`}
                    >
                      <div className="form-group">
                        <label className="title-color d-flex">
                          {field.label}
                        </label>
                        {field.type === "password" ? (
                          <div className="input-icons">
                            <input
                              type="password"
                              value={field.value}
                              className="form-control"
                              placeholder={field.placeholder}
                              disabled={field.disabled}
                            />
                          </div>
                        ) : (
                          <React.Fragment>
                            {field.options ? (
                              <select
                                name={field.name}
                                className="form-control"
                                disabled={field.disabled}
                              >
                                {field.options.map((option, optIndex) => (
                                  <option key={optIndex} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={field.value}
                                name={field.name}
                                className="form-control"
                                placeholder={field.placeholder}
                                disabled={field.disabled}
                              />
                            )}
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-end flex-wrap gap-3">
                  <button type="reset" className="btn btn-secondary px-5">
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn  py-2 bg-primary text-white hover:bg-[#7e9f37] px-4 call-demo"
                    style={{color:"white"}}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentSettings;
