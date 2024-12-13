import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiUserPlus, FiInfo, FiImage, FiMail } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSection from "../../../../components/FormInput/FormSection";
import FormInput from "../../../../components/FormInput/FormInput";
import PreviewImage from "../../../../components/FormInput/PreviewImage";
import FileUpload from "../../../../components/FormInput/FileUpload";
import FormSelect from "../../../../components/FormInput/FormSelect";
import axios from "axios";
import { getUploadUrl, uploadImageToS3 } from "../../../../utils/helpers";
import { getAuthData } from "../../../../utils/authHelper";
import apiConfig from "../../../../config/apiConfig";

const ApiUrl = `${apiConfig.admin}`;
const UpdateEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    identifyType: "",
    identifyNumber: "",
    identityImage: null,
    role: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [identityImagePreview, setIdentityImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIdentityFile, setSelectedIdentityFile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  // Password validation regex: 8-16 characters, uppercase, lowercase, number, special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  // Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      const { token } = getAuthData();

      try {
        const response = await axios.get(`${ApiUrl}/roles/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const formattedRoles = response.data.doc.map((role) => ({
            value: role._id,
            label: role.name,
          }));
          setRoles(formattedRoles);
        }
      } catch (error) {
        toast.error("Failed to fetch roles!");
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  // Fetch employee data by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      const { token } = getAuthData();

      try {
        const response = await axios.get(`${ApiUrl}/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const employee = response.data.doc;
          setFormData({
            name: employee.name,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            identifyType: employee.identifyType,
            identifyNumber: employee.identifyNumber,
            role: employee?.role?._id,
          });
          setImagePreview(`${apiConfig.bucket}/${employee?.image}`); // Set image URL for preview
          setIdentityImagePreview(
            `${apiConfig.bucket}/${employee?.identityImage}`
          ); // Set identity image URL for preview
        }
      } catch (error) {
        toast.error("Failed to fetch employee data!");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Additional validation before submission
    // if (!passwordRegex.test(formData.password)) {
    //   toast.error(
    //     "Password must be 8-16 characters long and include uppercase, lowercase, number, and special character."
    //   );
    //   return;
    // }
    const { token } = getAuthData(); // Get authorization token
    const uploadedKeys = []; // To store keys of uploaded images

    // Files to upload: Include new files and keep existing URLs for unchanged files
    const filesToUpload = [
      { file: selectedFile, name: "image", initialUrl: imagePreview },
      {
        file: selectedIdentityFile,
        name: "identityImage",
        initialUrl: identityImagePreview,
      },
    ];

    // Filter files that are new (File objects)
    const validFiles = filesToUpload.filter(
      (fileObj) => fileObj.file instanceof File
    );

    try {
      // Get upload URLs for new files
      const uploadConfigs = await Promise.all(
        validFiles.map((fileObj) =>
          getUploadUrl(
            fileObj.file.type,
            fileObj.name === "identityImage" ? "identity" : "employees"
          )
        )
      );

      // Upload each file and collect their keys
      for (let i = 0; i < validFiles.length; i++) {
        const uploadConfig = uploadConfigs[i];
        const file = validFiles[i].file;
        await uploadImageToS3(uploadConfig.url, file);
        uploadedKeys.push({ name: validFiles[i].name, key: uploadConfig.key });
      }
      // Construct employee data
      const employeeData = {
        ...formData,
        image:
          uploadedKeys.find((key) => key.name === "image")?.key ||
          (typeof imagePreview === "string"
            ? imagePreview.split(`${apiConfig.bucket}/`)[1]
            : null),
        identityImage:
          uploadedKeys.find((key) => key.name === "identityImage")?.key ||
          (typeof identityImagePreview === "string"
            ? identityImagePreview.split(`${apiConfig.bucket}/`)[1]
            : null),
      };

      // Send the data to the server
      const response = await axios.put(
        `${ApiUrl}/employees/${id}`,
        employeeData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Employee updated successfully!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update employee!"
      );
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "identifyNumber" && (value.length < 0 || value.length > 16)) {
      formData.error("Identification number must be between 1-16 characters.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setSelectedFile(file);
    }
  };

  const handleIdentityImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setIdentityImagePreview(objectUrl);
      setSelectedIdentityFile(file);
    }
  };

  return (
    <div className="content container-fluid main-card ltr snipcss-B2K3K">
      <div className="mb-4">
        <h2 className="h1 mb-0 text-capitalize text-[1rem] font-semibold d-flex align-items-center gap-2">
          <FiUserPlus className="mb-1" /> Update Employee
        </h2>
      </div>
      <form
        className="user"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="add-employee-form"
      >
        <FormSection
          icon={<FiInfo className="mb-1" />}
          title="Employee Information"
        >
          <div className="row align-items-center p-4">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <FormInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="form-group">
                <label
                  htmlFor="exampleInputPhone"
                  className="title-color d-flex gap-1 align-items-center"
                >
                  Phone
                </label>
                <PhoneInput
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                    autoFocus: false,
                    placeholder: "Enter phone number",
                    autoComplete: "off",
                  }}
                  country={"us"}
                  value={formData.phoneNumber}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "phoneNumber", value },
                    })
                  }
                />
              </div>
            </div>
            <div className="col-lg-6">
              <PreviewImage
                image={imagePreview}
                altText="Employee Image"
                style={{ width: "200px" }}
              />
              <FileUpload
                name="image"
                label="Upload Employee Image"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          icon={<FiMail className="mb-1" />}
          title="Account Information"
        >
          <div className="row align-items-center p-4">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <FormSelect
                label="Select Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                options={roles}
                isLoading={loadingRoles}
                required
              />
            </div>

            {/* <div className="col-lg-6 mb-4 mb-lg-0">
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password minimum 8 characters"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div> */}
          </div>
        </FormSection>

        <FormSection icon={<FiInfo className="mb-1" />} title="Identification">
          <div className="row p-4">
            <div className="col-lg-6">
              <FormSelect
                label="Identification Type"
                name="identifyType"
                value={formData.identifyType}
                onChange={handleInputChange}
                options={[
                  { value: "nid", label: "NID" },
                  { value: "passport", label: "Passport" },
                ]}
                required
              />
              <FormInput
                label="Identification Number"
                name="identifyNumber"
                type="text"
                placeholder="Enter ID number"
                value={formData.identifyNumber}
                onChange={handleInputChange}
                required
              />
              {/* Add Role Selection */}
            </div>
            <div className="col-lg-6">
              <PreviewImage
                image={identityImagePreview}
                altText="Identity Image"
                style={{ width: "200px" }}
              />
              <FileUpload
                name="identityImage"
                label="Upload Identity Image"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                onChange={handleIdentityImageChange}
              />
            </div>
          </div>
        </FormSection>

        <div className="d-flex justify-content-end align-items-center p-4">
          <button
            type="submit"
            className="btn bg-primary-500 text-white"
            style={{ color: "white" }}
          >
            Upate Employee
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateEmployee;
