import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
} from "react-icons/fa";
import ActionButton from "../../../../../components/ActionButton/Action";

// Sample data array
const withdrawMethods = [
  // {
  //   id: 1,
  //   name: "Bank",
  //   fields: [
  //     {
  //       label: "Name",
  //       type: "string",
  //       placeholder: "1234 5667 8976",
  //       isRequired: true,
  //     },
  //   ],
  //   isActive: true,
  //   isDefault: true,
  // },
  // {
  //   id: 2,
  //   name: "bkash",
  //   fields: [
  //     {
  //       label: "Mobile number",
  //       type: "number",
  //       placeholder: "+8**********",
  //       isRequired: true,
  //     },
  //   ],
  //   isActive: true,
  //   isDefault: false,
  // },
  // {
  //   id: 3,
  //   name: "VISA Card",
  //   fields: [
  //     {
  //       label: "Name",
  //       type: "string",
  //       placeholder: "John Doe",
  //       isRequired: true,
  //     },
  //     {
  //       label: "Card number",
  //       type: "string",
  //       placeholder: "1234 5678 9876",
  //       isRequired: true,
  //     },
  //   ],
  //   isActive: true,
  //   isDefault: false,
  // },
];

const VenderWalletMethod = () => {
  const [methods, setMethods] = useState(withdrawMethods);
  const [searchValue, setSearchValue] = useState("");

  // Function to handle the search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Function to toggle the active status
  const toggleActiveStatus = (id) => {
    const method = methods.find((method) => method.id === id);
    const newStatus = !method.isActive;

    Swal.fire({
      title: newStatus
        ? "Want to Turn ON This Withdraw Method?"
        : "Want to Turn OFF This Withdraw Method?",
      text: newStatus
        ? "If you enable this Withdraw method, it will be shown in the vendor app and vendor panel."
        : "If you disable this Withdraw method, it will not be shown in the vendor app and vendor panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: newStatus ? "Yes, turn it on!" : "Yes, turn it off!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setMethods((prevMethods) =>
          prevMethods.map((method) =>
            method.id === id ? { ...method, isActive: newStatus } : method
          )
        );
        Swal.fire(
          "Status Updated",
          "The withdraw method status has been updated.",
          "success"
        );
      }
    });
  };

  // Function to toggle the default status
  const toggleDefaultStatus = (id) => {
    const updatedMethods = methods.map((method) =>
      method.id === id ? { ...method, isDefault: !method.isDefault } : method
    );
    setMethods(updatedMethods);
  };

  // Filter methods based on search value
  const filteredMethods = methods.filter((method) =>
    method.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="content container-fluid">
      <div className="mb-3">
        <div className="page-title-wrap d-flex justify-content-between flex-wrap align-items-center gap-3 mb-3">
          <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
            <img width="20" src="/withdraw-icon.png" alt="Withdraw Icon" />
            Withdraw Method List
          </h2>
          <a
            href="#"
            className="btn bg-primary-500 hover:bg-primary-dark-500"
            style={{ color: "white" }}
          >
            + Add method
          </a>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="card">
            <div className="p-4">
              <div className="flex justify-between flex-col items-start gap-4 md:flex-row">
                <div className="text-[1rem] font-semibold">
                  <h5>
                    Methods{" "}
                    <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                      {filteredMethods.length}
                    </span>
                  </h5>
                </div>
                <div className="">
                  <div className="input-group input-group-custom input-group-merge">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaSearch />
                      </div>
                    </div>
                    <input
                      type="search"
                      className="form-control outline-none hover:border-primary-500"
                      placeholder="Search Method Name"
                      value={searchValue}
                      onChange={handleSearch}
                    />
                    <button
                      className="btn bg-primary-500 text-white border-primary-dark-500"
                      style={{ color: "white" }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                <thead className="thead-light thead-50 text-capitalize">
                  <tr>
                    <th>SL</th>
                    <th>Method Name</th>
                    <th>Method Fields</th>
                    <th className="text-center">Active Status</th>
                    <th className="text-center">Default Method</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMethods.map((method, index) => (
                    <tr key={method.id}>
                      <td>{index + 1}</td>
                      <td>{method.name}</td>
                      <td>
                        {method.fields.map((field, i) => (
                          <span
                            key={i}
                            className="badge badge-success opacity-75 fz-12 border border-white"
                          >
                            <b>{field.label}:</b> {field.placeholder} |{" "}
                            <b>Type:</b> {field.type} | <b>Is Required:</b>{" "}
                            {field.isRequired ? "Yes" : "No"}
                            <br />
                          </span>
                        ))}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => toggleActiveStatus(method.id)}
                          className="btn btn-light "
                        >
                          {method.isActive ? (
                            <FaToggleOn
                              style={{ color: "green " }}
                              className="h-8 w-12"
                            />
                          ) : (
                            <FaToggleOff className="h-8 w-12 text-red-600" />
                          )}
                        </button>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => toggleDefaultStatus(method.id)}
                          className="btn btn-light btn-sm square-btn "
                        >
                          {method.isDefault ? (
                            <FaToggleOn
                              style={{ color: "green" }}
                              className="h-8 w-12"
                            />
                          ) : (
                            <FaToggleOff className="h-8 w-12 text-red-600" />
                          )}
                        </button>
                      </td>
                      <td className="text-center d-flex justify-content-center gap-2">
                        {/* <Link
                          to="/addvenderwidthrawtmethod"
                          className="btn btn-outline--primary btn-sm square-btn"
                        >
                          <FaEdit />
                        </Link> */}
                        <ActionButton
                          // to={`/brandupdate/${brand._id}`}
                          to="/addvenderwidthrawtmethod"
                          icon={FaEdit} // Pass dynamic icon
                          className="ml-4"
                          // label="Edit"
                        />
                        {/* <a
                          href="#"
                          className="btn btn-outline-danger btn-sm square-btn"
                          onClick={() =>
                            alert("Delete functionality to be implemented")
                          }
                        >
                          <FaTrashAlt />
                        </a> */}
                        <ActionButton
                          onClick={() =>
                            alert("Delete functionality to be implemented")
                          }
                          icon={FaTrash} // Pass dynamic icon
                          className="ml-4"
                          label="Delete"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-responsive mt-4">
              <div className="px-4 d-flex justify-content-center justify-content-md-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenderWalletMethod;
