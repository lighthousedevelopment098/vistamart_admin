
import React, { useEffect, useState } from "react";
import { FaSearch, FaDownload, FaPlus, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAuthData } from "../../../../utils/authHelper";
import apiConfig from "../../../../config/apiConfig";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import TableList from "../../../../components/FormInput/TableList";
import ActionButton from "../../../../components/ActionButton/Action";

const ApiUrl = `${apiConfig.admin}`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
 
    useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { token } = getAuthData(); // Assuming this function retrieves the token
        const response = await axios.get(`${ApiUrl}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Map response data to the required format
          const formattedEmployees = response.data.doc.map(emp => ({
            id: emp?._id,
            name: emp?.name,
            email: emp?.email,
            phone: emp?.phoneNumber,
            role: emp?.role?.name, // Assuming you want the role name
            status: emp?.status === "active", // Convert to boolean for checkbox
            imageUrl: emp?.image ? `${apiConfig.bucket}/${emp?.image}` : '/image-place-holder.png', 
          }));
          setEmployees(formattedEmployees);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employee data!");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  
  const handleDelete = async (employeeId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      try {
        const { token } = getAuthData();
        await axios.delete(`${ApiUrl}/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employees.filter(emp => emp.id !== employeeId));
        toast.success("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast.error("Failed to delete employee!");
      }
    }
  };
  const columns = [
    { key: "index", label: "SL", render: (_, index) => index + 1 },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Action",
      render: (employee) => (
        <div className="flex gap-2 justify-center">
          <Link className="btn btn-outline-info btn-sm" to={`/view/${employee.id}`}>
            <FaEye />
          </Link>
          <Link className="btn btn-outline-info btn-sm"
           to={`/employeesdit/${employee.id}`}>
            <FaEdit />
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(employee.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="content container-fluid">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableList
          title="Employee Table"
          tableTitle="Employee List"
          listData={employees}
          columns={columns}
          exportFileName="EmployeeList"
          searchPlaceholder="Search by name, email, or phone"
          headerActions={
            <>
              <ActionButton
                to="/addemploye"
                className="px-4 py-2 rounded-md"
                label="Add Employee"
              />
            </>
          }
        />
      )}
    </div>
  );
};
export default EmployeeList;
