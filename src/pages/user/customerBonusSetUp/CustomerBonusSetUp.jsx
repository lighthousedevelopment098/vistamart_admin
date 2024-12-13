import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaTimes, FaDownload } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import ExportButton from "../../../components/ActionButton/Export";
import ActionButton from "../../../components/ActionButton/Action";
const CustomerBonusSetUp = () => {
  const [bonuses, setBonuses] = useState([
    // {
    //   id: 1,
    //   title: "Add fund Bonus",
    //   info: {
    //     minAmount: 1000,
    //     maxBonus: 5000,
    //   },
    //   amount: "35%",
    //   startDate: "12 Oct, 2023",
    //   endDate: "26 Nov, 2031",
    //   status: true,
    // },
    // {
    //   id: 2,
    //   title: "Flat Bonus",
    //   info: {
    //     minAmount: 500,
    //     maxBonus: null,
    //   },
    //   amount: "$150.00",
    //   startDate: "12 Oct, 2023",
    //   endDate: "22 Nov, 2030",
    //   status: true,
    // },
  ]);

  return (
    <div className="content container-fluid">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/admin-wallet.png"
            alt="Admin Wallet"
          />
          Wallet bonus setup
        </h2>
        <div className="text-primary-500 d-flex align-items-center gap-3 font-weight-bolder">
          How it works
          <div
            className="ripple-animation"
            data-toggle="modal"
            data-target="#howItWorksModal"
          >
            <HiInformationCircle size={18} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form
            action="https://6valley.6amtech.com/admin/customer/wallet/bonus-setup"
            id="form-submit"
            method="post"
          >
            <input
              type="hidden"
              name="_token"
              value="Twvhv0EJYa0GUycFmHJFzLVQRODPOpx9nQxb0DbE"
              autoComplete="off"
            />
            <div className="row gap-2">
              <div className="col-sm-12 col-md-12 flex flex-col md:flex-row">
                <div className="col-sm-6 col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="bonus_title"
                      className="title-color text-capitalize d-flex"
                    >
                      Bonus title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control outline-none hover:border-primary-500"
                      id="bonus_title"
                      placeholder="Ex:EID Dhamaka"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="short_desc"
                      className="title-color text-capitalize d-flex"
                    >
                      Short description
                    </label>
                    <input
                      type="text"
                      name="description"
                      className="form-control outline-none hover:border-primary-500"
                      id="short_desc"
                      placeholder="Ex:EID Dhamaka"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12  flex flex-wrap">
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label
                      htmlFor="bonus-type"
                      className="title-color text-capitalize d-flex"
                    >
                      Bonus type
                    </label>
                    <select
                      name="bonus_type"
                      id="bonus-type"
                      className="form-control outline-none hover:border-primary-500"
                      required
                    >
                      <option value="percentage">Percentage(%)</option>
                      <option value="fixed">Fixed amount</option>
                    </select>
                  </div>
                </div>
                <div
                  className="col-sm-4 col-md-4 col-lg-4"
                  id="bonus_amount_area"
                >
                  <div className="form-group">
                    <label
                      htmlFor="bonus_amount"
                      className="title-color text-capitalize d-flex"
                    >
                      Bonus amount (<span id="bonus-title-percent">%</span>)
                    </label>
                    <input
                      type="number"
                      name="bonus_amount"
                      min="0"
                      className="form-control outline-none hover:border-primary-500"
                      value="0"
                      id="bonus_amount"
                      placeholder="Ex:5"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label
                      htmlFor="min_add_money_amount"
                      className="title-color text-capitalize d-flex"
                    >
                      Minimum add amount
                    </label>
                    <input
                      type="number"
                      name="min_add_money_amount"
                      min="0"
                      className="form-control outline-none hover:border-primary-500"
                      id="min_add_money_amount"
                      value="0"
                      placeholder="Ex:100"
                      required
                    />
                  </div>
                </div>
                <div
                  className="col-sm-4 col-md-4 col-lg-4"
                  id="max-bonus-amount-area"
                >
                  <div className="form-group">
                    <label
                      htmlFor="max_bonus_amount"
                      className="title-color text-capitalize d-flex"
                    >
                      Maximum bonus
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="max_bonus_amount"
                      value="0"
                      className="form-control outline-none hover:border-primary-500"
                      id="max_bonus_amount"
                      placeholder="Ex:5000"
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label
                      htmlFor="start-date-time"
                      className="title-color text-capitalize d-flex"
                    >
                      Start date
                    </label>
                    <input
                      type="date"
                      name="start_date_time"
                      id="start-date-time"
                      className="form-control outline-none hover:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <div className="form-group">
                    <label
                      htmlFor="end-date-time"
                      className="title-color text-capitalize d-flex"
                    >
                      End date
                    </label>
                    <input
                      type="date"
                      name="end_date_time"
                      id="end-date-time"
                      className="form-control outline-none hover:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex gap-3 justify-content-end">
                  <button type="reset" className="btn btn-secondary px-5">
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn  py-2 bg-primary-500 text-white hover:bg-primary-dark-500 px-5"
                    style={{ color: "white" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card mt-3">
        <div className="px-3 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="">
              <h5 className="mb-0 d-flex align-items-center gap-2 text-[1rem] font-semibold">
                Wallet Bonus Table
                <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                  {bonuses.length}
                </span>
              </h5>
            </div>
            <div className="">
              <form
                action="https://6valley.6amtech.com/admin/customer/wallet/bonus-setup"
                method="GET"
                className="flex items-center gap-4 flex-col md:flex-row"
              >
                <div className="input-group input-group-merge input-group-custom ">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <FaSearch />
                    </div>
                  </div>
                  <input
                    id="datatableSearch_"
                    type="search"
                    name="search"
                    className="form-control"
                    placeholder="Search by bonus title"
                    aria-label="Search orders"
                  />
                  <button
                    type="submit"
                    className="btn px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500 "
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
                <ExportButton
                  data={bonuses} // Pass the data to export
                  filename="CustomerBonusSetp" // Optional filename for the exported file
                  icon={FaDownload} // Icon for the button
                  label="Export " // Button label
                  className="bg-primary-500 text-white hover:bg-primary-dark-500" // Tailwind classes for styling
                  style={{ color: "white" }} // Optional inline styles
                />
              </form>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>Bonus title</th>
                <th>Bonus info</th>
                <th className="text-center">Bonus amount</th>
                <th className="text-center">Started on</th>
                <th className="text-center">Expires on</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((bonus, index) => (
                <tr key={bonus.id}>
                  <td>{index + 1}</td>
                  <td>{bonus.title}</td>
                  <td>
                    <ul className="list-unstyled">
                      <li>Min add amount: ${bonus.info.minAmount}</li>
                      <li>
                        Max bonus: ${bonus.info.maxBonus ?? "Not required"}
                      </li>
                    </ul>
                  </td>
                  <td className="text-center">{bonus.amount}</td>
                  <td className="text-center">{bonus.startDate}</td>
                  <td className="text-center">{bonus.endDate}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span
                        className={`badge ${
                          bonus.status
                            ? "badge-soft-success"
                            : "badge-soft-danger"
                        }`}
                      >
                        {bonus.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      {/* <FaEdit className="text--primary cursor-pointer" />
                      <FaTrash className="text-danger cursor-pointer" /> */}
                      <ActionButton
                        // to={`/brandupdate/${brand._id}`}
                        icon={FaEdit} // Pass dynamic icon
                        className="ml-4"
                        label="View"
                      />
                      <ActionButton
                        // onClick={() => handleDeleteBrand(brand._id)}
                        icon={FaTrash} // Pass dynamic icon
                        className="ml-4"
                        label="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerBonusSetUp;
