import React, { useState } from "react";
import { FaInfoCircle, FaPlus, FaCog } from "react-icons/fa";
const LanguageTable = () => {
  const [languages, setLanguages] = useState([
    {
      id: 1,
      name: "English (ltr)",
      code: "en",
      status: true,
      defaultStatus: true,
    },
    // {
    //   id: 2,
    //   name: "Arabic (rtl)",
    //   code: "sa",
    //   status: true,
    //   defaultStatus: false,
    // },
    // {
    //   id: 3,
    //   name: "Bangla (ltr)",
    //   code: "bd",
    //   status: true,
    //   defaultStatus: false,
    // },
    // {
    //   id: 4,
    //   name: "Hindi (ltr)",
    //   code: "in",
    //   status: true,
    //   defaultStatus: false,
    // },
  ]);

  const toggleStatus = (id) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, status: !lang.status } : lang
      )
    );
  };

  const toggleDefaultStatus = (id) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, defaultStatus: !lang.defaultStatus } : lang
      )
    );
  };

  const handleDelete = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <div className="col-md-12 snipcss-8AaAl">
      <div className="alert alert-danger mb-3" role="alert">
        Changing some settings will take time to show effect, please clear
        session or wait for 60 minutes else browse from incognito mode
      </div>
      <div className="card">
        <div className="px-3 py-4">
          <div className="row justify-content-between align-items-center flex-grow-1">
            <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
              <span className="title-color text-capitalize font-weight-bold flex align-items-center gap-2">
                Language table
                <span
                  className="input-label-secondary cursor-pointer"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="After adding a new language you need to translate the key contents for users to experience this feature. To translate a language, click the action button from the language table & click translate. Then change the key language value manually or click the ‘Auto Translate’ button. Finally, click ‘Update’ to save the changes."
                >
                  <FaInfoCircle />
                </span>
              </span>
            </div>
            <div className="col-sm-8 col-md-6 col-lg-4">
              {/* <div className="d-flex gap-10 justify-content-sm-end">
                <button
                  className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark btn-icon-split flex align-items-center gap-2"
                  style={{ color: "white" }}
                  data-toggle="modal"
                  data-target="#lang-modal"
                >
                  <FaPlus />
                  <span className="text">Add new language</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="table-responsive pb-3">
          <table
            className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table style-1iXq6"
            id="style-1iXq6"
          >
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th className="text-center">Status</th>
                <th className="text-center">Default status</th>
                {/* <th className="text-center">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {languages.map((lang, index) => (
                <tr key={lang.id}>
                  <td>{index}</td>
                  <td>{lang.id}</td>
                  <td>{lang.name}</td>
                  <td>{lang.code}</td>
                  <td className="text-center">
                    <label className="switcher mx-auto">
                      <input
                        type="checkbox"
                        className="switcher_input"
                        checked={lang.status}
                        onChange={() => toggleStatus(lang.id)}
                      />
                      <span className="switcher_control"></span>
                    </label>
                  </td>
                  <td className="text-center">
                    <label className="switcher mx-auto">
                      <input
                        type="checkbox"
                        className="switcher_input"
                        checked={lang.defaultStatus}
                        onChange={() => toggleDefaultStatus(lang.id)}
                      />
                      <span className="switcher_control"></span>
                    </label>
                  </td>
                  {/* <td className="text-center">
                    <div className="dropdown flex align-items-center gap-2">
                      <button
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <FaCog />
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a className="dropdown-item" href="#">
                          Translate
                        </a>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleDelete(lang.id)}
                        >
                          Delete
                        </a>
                        <a className="dropdown-item" href="#">
                          Update
                        </a>
                      </div>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LanguageTable;
