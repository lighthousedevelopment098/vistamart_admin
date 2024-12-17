import React, { useState, useEffect } from "react";
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

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    identifyType: "",
    identifyNumber: "",
    identityImage: null,
    roleId: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [identityImagePreview, setIdentityImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIdentityFile, setSelectedIdentityFile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const API_URL = `${apiConfig.admin}/roles`;
  const API_EMP = `${apiConfig.admin}/employees`;

  // Password validation regex: 8-16 characters, uppercase, lowercase, number, special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  // Fetch roles with token
  useEffect(() => {
    const fetchRoles = async () => {
      const { token } = getAuthData();
      try {
        const response = await axios.get(API_URL, {
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
        console.error("Error fetching roles:", error);
        toast.error("Failed to fetch roles!");
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be 8-16 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!formData.name || formData.name.length > 40) {
      toast.error("Please enter a valid name (max 40 characters).");
      return;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const employeeData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        identifyType: formData.identifyType,
        identifyNumber: formData.identifyNumber,
        role: formData.roleId,
      };

      let imageKey = null;
      if (selectedFile) {
        const uploadUrlResponse = await getUploadUrl(
          selectedFile.type,
          "employees"
        );
        imageKey = uploadUrlResponse.key;
        await uploadImageToS3(uploadUrlResponse.url, selectedFile);
      }

      if (selectedIdentityFile) {
        const identityUploadUrlResponse = await getUploadUrl(
          selectedIdentityFile.type,
          "identity"
        );
        const identityImageKey = identityUploadUrlResponse.key;
        await uploadImageToS3(
          identityUploadUrlResponse.url,
          selectedIdentityFile
        );
        employeeData.identityImage = identityImageKey;
      }

      if (imageKey) {
        employeeData.image = imageKey;
      }

      const { token } = getAuthData();
      const response = await axios.post(API_EMP, employeeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Employee added successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          identifyType: "",
          identifyNumber: "",
          identityImage: null,
          role: "",
        });
        setImagePreview(null);
        setIdentityImagePreview(null);
        event.target.reset();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error(error.response?.data?.message || "Failed to add employee!");
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle name validation (alphabet only, max length)
  const handleNameChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z ]*$/.test(value) && value.length <= 40) {
      handleInputChange(event);
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateImageType(file)) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setSelectedFile(file);
    } else {
      toast.error(
        "Invalid image type! Only jpg, png, jpeg, gif, bmp, tif, tiff are allowed."
      );
    }
  };

  // Handle identity image selection
  const handleIdentityImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateImageType(file)) {
      const objectUrl = URL.createObjectURL(file);
      setIdentityImagePreview(objectUrl);
      setSelectedIdentityFile(file);
    } else {
      toast.error(
        "Invalid image type! Only jpg, png, jpeg, gif, bmp, tif, tiff are allowed."
      );
    }
  };

  // Validate image type
  const validateImageType = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/tif",
    ];
    return validTypes.includes(file.type);
  };

  return (
    <div className="content container-fluid main-card ltr snipcss-B2K3K">
      <div className="mb-4">
        <h2 className="h1 mb-0 text-capitalize text-[1rem] font-semibold d-flex align-items-center gap-2">
          <FiUserPlus className="mb-1" /> Add New Employee
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
                onChange={handleNameChange}
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
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </FormSection>
        <FormSection
          icon={<FiMail className="mb-1" />}
          title="Role and Password"
        >
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <FormSelect
                label="Role"
                name="roleId"
                value={formData.roleId}
                onChange={handleInputChange}
                options={roles}
                isLoading={loadingRoles}
                required
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </FormSection>
        <FormSection
          icon={<FiImage className="mb-1" />}
          title="Identity Details"
        >
          <div className="row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <FormInput
                label="Identity Number"
                name="identifyNumber"
                type="text"
                placeholder="Enter identity number"
                value={formData.identifyNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <PreviewImage
                image={identityImagePreview}
                altText="Identity Image"
                style={{ width: "200px" }}
              />
              <FileUpload
                name="identityImage"
                label="Upload Identity Image"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff"
                onChange={handleIdentityImageChange}
              />
            </div>
          </div>
        </FormSection>

        <div className="d-flex justify-content-end gap-3 mb-4">
          <button
            type="submit"
            className="btn bg-primary-500 text-white"
            style={{ color: "white" }}
          >
            Add Employee
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddEmployee;
