import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaCalendarAlt, FaEdit } from "react-icons/fa";
import axios from "axios";
import "./employeeDetail.css";
import { getAuthData } from "../../../../utils/authHelper";
import apiConfig from "../../../../config/apiConfig";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";

const ApiUrl = `${apiConfig.admin}`;

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const { token } = getAuthData(); // Assuming this function retrieves the token
        const response = await axios.get(`${ApiUrl}/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data.doc);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (!employee)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  const { name, email, role, image, phoneNumber, createdAt } = employee;

  return (
    <div className="content container-fluid snipcss-gbEEi">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img src="/employee.png" width="20" alt="Employee Icon" />
          Employee Details
        </h2>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="mb-3 text-primary-500">#EMP {employee?._id}</h3>
          <div className="row g-2">
            <div className="col-lg-7 col-xl-8">
              <div className="media align-items-center flex-wrap flex-sm-nowrap gap-3">
                <img
                  width="250"
                  className="rounded"
                  src={`${apiConfig.bucket}/${employee?.image}`}
                  alt="Employee"
                />
                <div className="media-body">
                  <div className="text-capitalize mb-4">
                    <h4 className="mb-2">{name}</h4>
                    <p>{role?.name}</p>
                  </div>
                  <ul className="d-flex flex-column gap-3 px-0">
                    <li className="d-flex gap-2 align-items-center">
                      <FaPhone />
                      <a
                        href={`tel:${employee?.phoneNumber || "N/A"}`}
                        className="text-dark"
                      >
                        {employee?.phoneNumber ? employee?.phoneNumber : "N/A"}
                      </a>
                    </li>
                    <li className="d-flex gap-2 align-items-center">
                      <FaEnvelope />
                      <a href={`mailto:${email}`} className="text-dark">
                        {email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="bg-primary-light rounded p-3">
                <div className="bg-white rounded p-3">
                  {/* <div className="d-flex gap-2 align-items-center">
                    <FaCalendarAlt />
                    <span className="text-dark">Join: {new Date(createdAt).toLocaleDateString()}</span>
                  </div> */}
                </div>
                <div className="bg-white rounded p-3 mt-3">
                  <div className="d-flex justify-content-between gap-3">
                    <div className="d-flex flex-column gap-4">
                      <div className="d-flex gap-2 align-items-center">
                        <FaEdit />
                        <h6 className="text-dark mb-0 text-capitalize">
                          Access available:
                        </h6>
                      </div>
                      <div className="tags d-flex gap-2 flex-wrap">
                        {role?.modules.map((module, index) => (
                          <span
                            key={index}
                            className="badge  text-capitalize"
                          >
                            {module.replace("-", " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* <Link to={`/admin/employee/update/${id}`}>
                      <FaEdit title="Edit Employee Role" />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-12">
              <div className="d-flex justify-content-end">
                <Link to={`/admin/employee/update/${id}`} className="btn btn--primary px-5">
                  <FaEdit /> Edit
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
