import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast library
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import apiConfig from "../../config/apiConfig";
import { getAuthData } from "../../utils/authHelper";
import { useNavigate } from "react-router-dom";


const AddPickupAddress = () => {
  const { token, user } = getAuthData();
  const navigate = useNavigate(); // Initialize the navigate function

  const [formData, setFormData] = useState({
    person_of_contact: "",
    phone_number: "",
    email_address: "",
    address: "",
    city_id: "",
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const result = await axios.get("https://app.sonic.pk/api/cities", {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        });
        console.log("city result",result)
        setCities(result.data.cities || []);
      } catch (err) {
        toast.error("Failed to fetch city list. Please try again later.");
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { person_of_contact, email_address, address, city_id } = formData;
    if (!person_of_contact || person_of_contact.length > 50) {
      return "Invalid contact person name.";
    }
    if (!email_address.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return "Invalid email address.";
    }
    if (!address || address.length > 190) {
      return "Invalid address.";
    }
    if (!city_id) {
      return "City selection is required.";
    }
    return null;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationError = validateForm();
  //   if (validationError) {
  //     toast.error(validationError);
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // Add Pickup Address
  //     const pickupResult = await axios.post(
  //       "https://app.sonic.pk/api/pickup_address/add",
  //       formData,
  //       {
  //         headers: { Authorization: import.meta.env.VITE_API_KEY },
  //       }
  //     );
  //     const { status, message, id: pickingAddressId } = pickupResult.data;

  //     // Handle response status
  //     if (status === 1) {
  //       toast.error(message); // Show error message from API
  //       return;
  //     }

  //     // Prepare Shipping Data
  //     const shippingData = {
  //       vendorId: user?._id,
  //       pickingAddressId,
  //       shippingMethod: "Trax",
  //     };

  //     // Check Existing Shipping Info
  //     const shippingExists = await axios.get(
  //       `${apiConfig.seller}/shippingInfo?vendorId=${user._id}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (shippingExists.data.doc.length > 0) {
  //       // Update existing shipping info
  //       await axios.put(`${apiConfig.seller}/shippingInfo/`, shippingData, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //     } else {
  //       // Create new shipping info
  //       console.log("shipping data ===", shippingData)
  //       await axios.post(`${apiConfig.seller}/shippingInfo`, shippingData, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //     }

  //     toast.success("Pickup address added and shipping info updated!");
      
  //     setFormData({
  //       person_of_contact: "",
  //       phone_number: "",
  //       email_address: "",
  //       address: "",
  //       city_id: "",
  //     });

  //     // Navigate to /orderlist after success
  //   setTimeout(() => {
  //     navigate("/orderlist");
  //   }, 2000); 
    
  //   } catch (err) {
  //     const errorMessage =
  //       err.response?.data?.message || "Failed to complete the process.";
  //     toast.error(errorMessage); // Show specific error from server
  //     console.error("Error:", err.response || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }
  
    setLoading(true);
  
    try {
      // Add Pickup Address
      const pickupResult = await axios.post(
        "https://app.sonic.pk/api/pickup_address/add",
        formData,
        {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        }
      );
  
      const { status, message, id: pickingAddressId } = pickupResult.data;
  
      // Handle response status
      if (status === 1) {
        toast.error(message); // Show error message from API
        return;
      }
  
      const { city_id } = formData; // Access city_id from formData
      console.log("city id", city_id);
  
      // Prepare Shipping Data
      const shippingData = {
        vendorId: user?._id,
        pickingAddressId,
        shippingMethod: "Trax",
        originCityId: city_id,
      };
      console.log("city id====", city_id);
  
      // Check Existing Shipping Info
      const shippingExists = await axios.get(
        `${apiConfig.seller}/shippingInfo?vendorId=${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (shippingExists.data.doc.length > 0) {
        // Update existing shipping info
        await axios.put(`${apiConfig.seller}/shippingInfo/`, shippingData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new shipping info
        await axios.post(`${apiConfig.seller}/shippingInfo`, shippingData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
  
      toast.success("Pickup address added and shipping info updated!");
      setFormData({
        person_of_contact: "",
        phone_number: "",
        email_address: "",
        address: "",
        city_id: "",
      });
  
      // Navigate to /packagingorder after success
      setTimeout(() => {
        navigate("/orderlist");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to complete the process.";
      toast.error(errorMessage); // Show specific error from server
      console.error("Error:", err.response || err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
   <>
     <ToastContainer />

   <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Add Pickup Address</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            aria-label="Contact Person"
            type="text"
            name="person_of_contact"
            value={formData.person_of_contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Person of Contact"
            required
          />
          <input
            aria-label="Phone Number"
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., 03123456789"
            required
          />
          <input
            aria-label="Email Address"
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Email"
            required
          />
          <textarea
            aria-label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Address"
            required
          />
          <select
            aria-label="City"
            name="city_id"
            value={formData.city_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${
              loading ? "bg-primary-500" : "bg-primary-500 hover:bg-primary-dark-500"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Pickup Address"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddPickupAddress;
