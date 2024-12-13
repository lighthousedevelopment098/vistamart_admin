
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiConfig from "../../../../config/apiConfig";
import { getAuthData } from "../../../../utils/authHelper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // make sure to import the styles
import { toast } from 'react-toastify';  // Import toast for notifications
import FormSection from "../../../../components/FormInput/FormSection";
import FormInput from "../../../../components/FormInput/FormInput";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";

const API_URL = apiConfig.admin;
const { user, token } = getAuthData();

const Privacy = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: 'Privacy Policy',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true); // To manage loading state
  const [termsFound, setTermsFound] = useState(false); // To check if terms exist
  const [termsId, setTermsId] = useState(null); // Store terms ID for updating

  // Fetch terms and conditions on component mount
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await axios.get(`${API_URL}/pages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        const terms = response.data.doc.find(page => page.name === "Privacy Policy");
        if (terms) {
          setFormData(prevData => ({
            ...prevData,
            description: terms.description
          }));
          setTermsFound(true);
          setTermsId(terms._id);  // Save the terms ID for updating
        }
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsAndConditions();
  }, [token]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle description change (for Quill editor)
  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (termsId) {
        // If terms exist, update them
        response = await axios.put(`${API_URL}/pages/${termsId}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        toast.success('Terms and Conditions updated successfully!');
      } else {
        // If terms do not exist, create a new entry
        response = await axios.post(`${API_URL}/pages`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        toast.success('Terms and Conditions added successfully!');
      }
      console.log('Form submitted successfully:', response.data.doc);
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error('Error submitting the form. Please try again later.');
    }
  };

  // Loading state and condition check
  if (isLoading) {
    return <div><LoadingSpinner /></div>;
  }

  if (!termsFound) {
    toast.warn("Terms and Conditions not found. Please create one.");
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <FormSection title="">
          <div className="flex flex-col ">
            <label className="font-semibold">Privacy Policy</label>
            <ReactQuill
              name="description"
              value={formData.description}
              onChange={handleDescriptionChange}
              className="quill-edito overflow-auto"
              theme="snow"
              placeholder="Write the Privacy Policy..."
            />
          </div>
        </FormSection>
        <div className="w-full flex justify-end p-4">

        <button 
        type="submit" 
  className="btn bg-primary hover:bg-primary-dark hover:text-white mt-3 text-white"
  style={{ color: "white" }}    
      >
          Submit
        </button>
        </div>
        {/* Submit Button */}

      </form>
    </div>
  );
};

export default Privacy;
