import React, { useState, useEffect } from "react";
import Switcher from "../../../../components/FormInput/Switcher";
import CompanyInformationForm from "../Company information/companyInformation";
import BusinessInformationCard from "../BussinessInformation/bussinessInformation";
import AppDownloadInfoCard from "../appCard/appCard";
import WebsiteColorCard from "../appCard/colourCard";
import WebsiteHeaderLogoCard from "../appCard/headerLogoCard";
import WebsiteFooterLogoCard from "../appCard/footerCard";
import WebsiteFaviconCard from "../appCard/FaviconCard";
import LoadingGifCard from "../appCard/loadingGifCard";
import AppLogoHeader from "../appCard/appLogoCard";
import axios from "axios";
import apiConfig from "../../../../config/apiConfig";
import { toast } from "react-toastify";
import { deleteUploadedImages, uploadImageToS3, getUploadUrl } from "../../../seller/vendor/add/addVender/helpers";
import { getAuthData } from "../../../../utils/authHelper";

const MaintenanceCard = () => {
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [updatedImages, setUpdatedImages] = useState({
    headerLogo: null,
    footerLogo: null,
    favicon: null,
  });

  // Initial state for the form data
  const [data, setData] = useState({
    companyName: "",
    phone: "",
    email: "",
    country: "",
    timezone: "",
    language: "",
    companyAddress: "",
    latitude: "",
    longitude: "",
    currencyPosition: "",
    forgotPasswordVerification: "",
    businessModel: "",
    pagination: false,
    companyCopyrightText: "",
    appleStoreLink: "null",
    googlePlayStoreLink: "",
    primaryColor: "",
    secondaryColor: "",
    headerLogo: "",
    footerLogo: "",
    favicon: "",
    loadingGif: "",
    appLogo: "",
  });

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`${apiConfig.admin}/businessgeneral`);
        if (response.data.status === "success" && response.data.doc.length) {
          setData(response.data.doc[0]);
            setMaintenanceMode(response.data.doc[0].maintenanceMode); // Set the maintenance mode based on fetched data
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  // Handle input change for each field
  const handleInputChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event, imageType) => {
    const file = event.target.files[0];
    if (file) {
      setUpdatedImages((prev) => ({ ...prev, [imageType]: file }));
    }
  };

  const handleDeleteImage = async (imageType) => {
    try {
      const uploadConfig = await getUploadUrl("", "business");
      await deleteUploadedImages(uploadConfig, data[imageType]);
      setUpdatedImages((prev) => ({ ...prev, [imageType]: null }));
      toast.success(`${imageType} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting ${imageType}:`, error);
      toast.error(`Failed to delete ${imageType}`);
    }
  };
  const handleColorChange = ({ primaryColor, secondaryColor }) => {
    setData((prevData) => ({
      ...prevData,
      primaryColor,
      secondaryColor,
    }));
  };
  

  const handleSave = async () => {
    setLoading(true);
    const uploadedKeys = { ...data };
  
    // Log the current state of data before proceeding
    console.log("Data before save:", uploadedKeys);
  
    // Get the token and user from auth
    const { user, token } = getAuthData();
    
    // Log token and user data for debugging
  
    try {
      const imageTypes = ["headerLogo", "footerLogo", "favicon"];
      const uploadPromises = imageTypes.map(async (type) => {
        if (updatedImages[type]) {
          // Log before the upload process for each image
          console.log(`Uploading ${type}...`);
  
          const uploadConfig = await getUploadUrl(updatedImages[type].type, "business");
          console.log("Upload Config for", type, uploadConfig);
  
          const uploadedKey = await uploadImageToS3(uploadConfig, updatedImages[type]);
          console.log(`Upload result for ${type}:`, uploadedKey);
  
          if (uploadedKey) {
            uploadedKeys[type] = uploadedKey;
          } else {
            throw new Error(`Failed to upload ${type}`);
          }
        }
      });
  
      await Promise.all(uploadPromises);
  
      // Log the final payload before the API call
      const payload = {
        ...uploadedKeys,
        maintenanceMode,
      };
      console.log("Payload to be sent:", payload);
  
      // Make the API request
      const response = await axios.put(
        `${apiConfig.admin}/businessgeneral/${data._id}`, // Pass the ID here
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // Pass the token in the headers
          },
        }
      );
  
      // Log the response from the API
      console.log("API Response:", response);
  
      if (response.data.status === "success") {
       
        //give use time out 2 second set time out
         
        toast.success("Business information updated successfully!");

      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error saving data:", error);
      toast.error("Failed to save information");
      console.log("Error details:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleMaintenanceModeChange = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <div className="border mb-2 rounded-lg shadow-sm">
        <div className="p-3 shadow-lg rounded-t-lg">
          <h5 className="text-lg font-medium flex items-center mb-0">
            <h1 className="text-sm font-bold">System Maintenance</h1>
          </h5>
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="md:w-2/3 xl:w-3/4">
              <p className="m-0">
                *By turning on maintenance mode, control all your system & functions.
              </p>
            </div>
            <div className="md:w-1/3 xl:w-1/4">
              <div className="flex justify-between items-center border rounded px-3 py-2">
                <h5 className="text-md font-semibold mb-0">Maintenance Mode</h5>
                <label className="switch ml-2 mb-0">
                  <span>
                    <Switcher
                      checked={maintenanceMode}
                      onChange={handleMaintenanceModeChange}
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {data && (
        <>
          <CompanyInformationForm companyInfo={data} onInputChange={handleInputChange} />
          <BusinessInformationCard businessInfo={data} onInputChange={handleInputChange} />
          <AppDownloadInfoCard appLinks={data}  onInputChange={handleInputChange}/>
          <div className="flex flex-col md:flex-row gap-4">
          <WebsiteColorCard
  primaryColor={data.primaryColor}
  secondaryColor={data.secondaryColor}
  onColorChange={handleColorChange}  // Corrected prop
/>

            <WebsiteHeaderLogoCard
              headerLogo={data.headerLogo}
              onImageChange={(e) => handleImageChange(e, "headerLogo")}
              onDelete={() => handleDeleteImage("headerLogo")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-3">
            <WebsiteFooterLogoCard
              footerLogo={data.footerLogo}
              onImageChange={(e) => handleImageChange(e, "footerLogo")}
              onDelete={() => handleDeleteImage("footerLogo")}
            />
            <WebsiteFaviconCard
              favicon={data.favicon}
              onImageChange={(e) => handleImageChange(e, "favicon")}
              onDelete={() => handleDeleteImage("favicon")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-3">
            <LoadingGifCard loadingGif={data.loadingGif}  onInputChange={handleInputChange}/>
            <AppLogoHeader logo={data.appLogo} onInputChange={handleInputChange} />
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-3 bg-primary hover:bg-primary-dark mt-3 rounded-md"
          style={{ color: "white" }}
        >
          Save Information
        </button>
      </div>
    </div>
  );
};

export default MaintenanceCard;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Switcher from "../../../../components/FormInput/Switcher";
// import { uploadImageToS3, getUploadUrl, deleteUploadedImages } from "../../../seller/vendor/add/addVender/helpers";
// import { getAuthData } from "../../../../utils/authHelper";
// import CompanyInformationForm from "../Company information/companyInformation";
// import BusinessInformationCard from "../BussinessInformation/bussinessInformation";
// import AppDownloadInfoCard from "../appCard/appCard";
// import WebsiteColorCard from "../appCard/colourCard";
// import WebsiteHeaderLogoCard from "../appCard/headerLogoCard";
// import WebsiteFooterLogoCard from "../appCard/footerCard";
// import WebsiteFaviconCard from "../appCard/FaviconCard";
// import apiConfig from "../../../../config/apiConfig";

// const MaintenanceCard = () => {
//   const [loading, setLoading] = useState(true);
//   const [maintenanceMode, setMaintenanceMode] = useState(false);
//   const [updatedImages, setUpdatedImages] = useState({
//     headerLogo: null,
//     footerLogo: null,
//     favicon: null,
//   });
  

//   const [data, setData] = useState({
//     companyName: "",
//     phone: "",
//     email: "",
//     country: "",
//     timezone: "",
//     language: "",
//     companyAddress: "",
//     latitude: "",
//     longitude: "",
//     currencyPosition: "",
//     forgotPasswordVerification: "",
//     businessModel: "",
//     pagination: false,
//     companyCopyrightText: "",
//     appleStoreLink: "null",
//     googlePlayStoreLink: "",
//     primaryColor: "",
//     secondaryColor: "",
//     headerLogo: "",
//     footerLogo: "",
//     favicon: "",
//     loadingGif: "",
//     appLogo: "",
//   });

//   useEffect(() => {
//     const fetchBusinessData = async () => {
//       try {
//         const response = await axios.get(`${apiConfig.admin}/businessgeneral`);
//         if (response.data.status === "success" && response.data.doc.length) {
//           setData(response.data.doc[0]);
//           setMaintenanceMode(response.data.doc[0].maintenanceMode); // Set the maintenance mode
//         }
//       } catch (error) {
//         console.error("Error fetching business data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBusinessData();
//   }, []);

//   const handleInputChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // const handleImageChange = (event, imageType) => {
//   //   const file = event.target.files[0];
//   //   console.log("file======", file)
//   //   if (file) {
//   //     setUpdatedImages((prev) => ({ ...prev, [imageType]: file }));
//   //   }
//   // };
//   const handleImageChange = (imageKey, uploadedKey) => {
//     setUpdatedImages((prev) => ({ ...prev, [imageKey]: uploadedKey }));
//   };
  

// // const handleImageChange = (event, imageType) => {
// //   if (!event || !event.target || !event.target.files) {
// //     console.error("Invalid event structure", event);
// //     return;
// //   }

// //   const file = event.target.files[0];
// //   if (!file) {
// //     console.error("No file selected");
// //     return;
// //   }

// //   console.log("Selected file:", file);
// //   // Update state with the selected file
// //   setUpdatedImages((prev) => ({ ...prev, [imageType]: file }));
// // };

  
  
//   const handleDeleteImage = async (imageType) => {
//     try {
//       const uploadConfig = await getUploadUrl("", "business");
//       await deleteUploadedImages(uploadConfig, data[imageType]);
//       setUpdatedImages((prev) => ({ ...prev, [imageType]: null }));
//       toast.success(`${imageType} deleted successfully!`);
//     } catch (error) {
//       console.error(`Error deleting ${imageType}:`, error);
//       toast.error(`Failed to delete ${imageType}`);
//     }
//   };

//   const handleMaintenanceSave = async () => {
//     setLoading(true);
//     const uploadedKeys = { ...data }; // Clone existing data
  
//     try {
//       const imageTypes = ["headerLogo", "footerLogo", "favicon"];
  
//       // Loop through image types and upload each if necessary
//       await Promise.all(
//         imageTypes.map(async (type) => {
//           if (updatedImages[type]) {
//             try {
//               const uploadConfig = await getUploadUrl(updatedImages[type].type, "business");
  
//               const uploadSuccessful = await uploadImageToS3(uploadConfig.url, updatedImages[type]);
  
//               if (uploadSuccessful) {
//                 uploadedKeys[type] = uploadConfig.key; // Store S3 key
//                 toast.success(`${type} uploaded successfully!`);
//               } else {
//                 console.error(`Failed to upload ${type}`);
//                 throw new Error(`Upload failed for ${type}`);
//               }
//             } catch (error) {
//               console.error(`Error uploading ${type}:`, error);
//               toast.error(`Failed to upload ${type}. Please retry.`);
//             }
//           }
//         })
//       );
  
//       // Save final updated data
//       const { token } = getAuthData(); // Use stored auth data
//       const payload = { ...uploadedKeys, maintenanceMode };
  
//       const response = await axios.put(
//         `${apiConfig.admin}/businessgeneral/${data._id}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       if (response.data.status === "success") {
//         toast.success("Business information updated successfully!");
//       } else {
//         console.error("API responded with failure");
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to save information. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleMaintenanceModeChange = () => {
//     setMaintenanceMode(!maintenanceMode);
//   };

//   if (loading) {
//     return <div>Loading....</div>;
//   }

//   return (
//     <div>
//       <div className="border mb-2 rounded-lg shadow-sm">
//         <div className="p-3 shadow-lg rounded-t-lg">
//           <h5 className="text-lg font-medium flex items-center mb-0">
//             <h1 className="text-sm font-bold">System Maintenance</h1>
//           </h5>
//         </div>
//         <div className="p-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="md:w-2/3 xl:w-3/4">
//               <p className="m-0">
//                 *By turning on maintenance mode, control all your system & functions.
//               </p>
//             </div>
//             <div className="md:w-1/3 xl:w-1/4">
//               <div className="flex justify-between items-center border rounded px-3 py-2">
//                 <h5 className="text-md font-semibold mb-0">Maintenance Mode</h5>
//                 <label className="switch ml-2 mb-0">
//                   <span>
//                     <Switcher
//                       checked={maintenanceMode}
//                       onChange={handleMaintenanceModeChange}
//                     />
//                   </span>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {data && (
//         <>
//           <CompanyInformationForm companyInfo={data} onInputChange={handleInputChange} />
//           <BusinessInformationCard businessInfo={data} onInputChange={handleInputChange} />
//           <AppDownloadInfoCard appLinks={data} onInputChange={handleInputChange} />
//           <div className="flex flex-col md:flex-row gap-4">
//             <WebsiteColorCard
//               primaryColor={data.primaryColor}
//               secondaryColor={data.secondaryColor}
//               onColorChange={handleInputChange} // Fix here
//             />
//             {/* <WebsiteHeaderLogoCard
//               headerLogo={data.headerLogo}
//               onImageChange={(e) => handleImageChange(e, "headerLogo")}
//               onDelete={() => handleDeleteImage("headerLogo")}
//             /> */}
//             <WebsiteHeaderLogoCard
//   initialLogo={data.headerLogo}
//   onImageChange={(uploadedKey) => handleImageChange("headerLogo", uploadedKey)}
  
// />

// {/*           
//           <WebsiteHeaderLogoCard
//   headerLogo={data.headerLogo}
//   onImageChange={(uploadedUrl) =>
//     setData((prev) => ({ ...prev, headerLogo: uploadedUrl }))
//   }
// /> */}


//           </div>
//           <div className="flex flex-col md:flex-row gap-4 mt-3">
//             <WebsiteFooterLogoCard
//               footerLogo={data.footerLogo}
//               onImageChange={(e) => handleImageChange(e, "footerLogo")}
//               onDelete={() => handleDeleteImage("footerLogo")}
//             />
//             <WebsiteFaviconCard
//               favicon={data.favicon}
//               onImageChange={(e) => handleImageChange(e, "favicon")}
//               onDelete={() => handleDeleteImage("favicon")}
//             />
//           </div>
//           <button onClick={handleMaintenanceSave} className="btn btn-primary mt-4">
//             Save Changes
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MaintenanceCard;


///////////// corect header lpogo

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Switcher from "../../../../components/FormInput/Switcher";
// import { getAuthData } from "../../../../utils/authHelper";
// import CompanyInformationForm from "../Company information/companyInformation";
// import BusinessInformationCard from "../BussinessInformation/bussinessInformation";
// import AppDownloadInfoCard from "../appCard/appCard";
// import WebsiteColorCard from "../appCard/colourCard";
// import WebsiteHeaderLogoCard from "../appCard/headerLogoCard";
// import WebsiteFooterLogoCard from "../appCard/footerCard";
// import WebsiteFaviconCard from "../appCard/FaviconCard";
// import apiConfig from "../../../../config/apiConfig";

// const MaintenanceCard = () => {
//   const [loading, setLoading] = useState(true);
//   const [maintenanceMode, setMaintenanceMode] = useState(false);
//   const [data, setData] = useState({
//     companyName: "",
//     phone: "",
//     email: "",
//     headerLogo: "",
//     footerLogo: "",
//     favicon: "",
//   });

//   useEffect(() => {
//     const fetchBusinessData = async () => {
//       try {
//         const response = await axios.get(`${apiConfig.admin}/businessgeneral`);
//         if (response.data.status === "success" && response.data.doc.length) {
//           setData(response.data.doc[0]);
//           setMaintenanceMode(response.data.doc[0].maintenanceMode);
//         }
//       } catch (error) {
//         console.error("Error fetching business data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBusinessData();
//   }, []);

//   const handleInputChange = (name, value) => {
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleLogoChange = (imageKey, uploadedKey) => {
//     setData((prev) => ({ ...prev, [imageKey]: uploadedKey }));
//   };

//   const handleMaintenanceSave = async () => {
//     setLoading(true);

//     try {
//       const { token } = getAuthData();
//       const payload = { ...data, maintenanceMode };

//       const response = await axios.put(
//         `${apiConfig.admin}/businessgeneral/${data._id}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         toast.success("Business information updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to save information. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return loading ? (
//     <div>Loading....</div>
//   ) : (
//     <div>
//       <h1 className="text-sm font-bold">System Maintenance</h1>
//       <Switcher
//         checked={maintenanceMode}
//         onChange={() => setMaintenanceMode(!maintenanceMode)}
//       />
//       <CompanyInformationForm companyInfo={data} onInputChange={handleInputChange} />
//       <BusinessInformationCard businessInfo={data} onInputChange={handleInputChange} />
//       <AppDownloadInfoCard appLinks={data} onInputChange={handleInputChange} />
//       <WebsiteHeaderLogoCard
//         initialLogo={data.headerLogo}
//         onImageChange={(uploadedKey) => handleLogoChange("headerLogo", uploadedKey)}
//       />
//       <WebsiteFooterLogoCard
//         footerLogo={data.footerLogo}
//         onImageChange={(uploadedKey) => handleLogoChange("footerLogo", uploadedKey)}
//       />
//       <WebsiteFaviconCard
//         favicon={data.favicon}
//         onImageChange={(uploadedKey) => handleLogoChange("favicon", uploadedKey)}
//       />
//       <button onClick={handleMaintenanceSave} className="btn btn-primary mt-4">
//         Save Changes
//       </button>
//     </div>
//   );
// };

// export default MaintenanceCard;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Switcher from "../../../../components/FormInput/Switcher";
// import { getAuthData } from "../../../../utils/authHelper";
// import CompanyInformationForm from "../Company information/companyInformation";
// import BusinessInformationCard from "../BussinessInformation/bussinessInformation";
// import AppDownloadInfoCard from "../appCard/appCard";
// import WebsiteColorCard from "../appCard/colourCard";
// import WebsiteHeaderLogoCard from "../appCard/headerLogoCard";
// import WebsiteFooterLogoCard from "../appCard/footerCard";
// import WebsiteFaviconCard from "../appCard/FaviconCard";
// import apiConfig from "../../../../config/apiConfig";

// const MaintenanceCard = () => {
//   const [loading, setLoading] = useState(true);
//   const [maintenanceMode, setMaintenanceMode] = useState(false);
//   const [data, setData] = useState({
//     companyName: "",
//     phone: "",
//     email: "",
//     country: "",
//     timezone: "",
//     language: "",
//     companyAddress: "",
//     latitude: "",
//     longitude: "",
//     currencyPosition: "",
//     forgotPasswordVerification: "",
//     businessModel: "",
//     pagination: false,
//     companyCopyrightText: "",
//     appleStoreLink: "",
//     googlePlayStoreLink: "",
//     primaryColor: "",
//     secondaryColor: "",
//     headerLogo: "",
//     footerLogo: "",
//     favicon: "",
//     loadingGif: "",
//     appLogo: "",
//   });

//   useEffect(() => {
//     const fetchBusinessData = async () => {
//       try {
//         const response = await axios.get(`${apiConfig.admin}/businessgeneral`);
//         if (response.data.status === "success" && response.data.doc.length) {
//           setData(response.data.doc[0]);
//           setMaintenanceMode(response.data.doc[0].maintenanceMode);
//         }
//       } catch (error) {
//         console.error("Error fetching business data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBusinessData();
//   }, []);

//   const handleInputChange = (name, value) => {
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleLogoChange = (imageKey, uploadedKey) => {
//     setData((prev) => ({ ...prev, [imageKey]: uploadedKey }));
//   };

//   const handleMaintenanceSave = async () => {
//     setLoading(true);

//     try {
//       const { token } = getAuthData();
//       const payload = { ...data, maintenanceMode };

//       const response = await axios.put(
//         `${apiConfig.admin}/businessgeneral/${data._id}`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         toast.success("Business information updated successfully!");
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to save information. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMaintenanceModeChange = () => {
//     setMaintenanceMode(!maintenanceMode);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="border mb-2 rounded-lg shadow-sm">
//         <div className="p-3 shadow-lg rounded-t-lg">
//           <h1 className="text-sm font-bold">System Maintenance</h1>
//         </div>
//         <div className="p-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="md:w-2/3 xl:w-3/4">
//               <p>
//                 *By turning on maintenance mode, control all your system &
//                 functions.
//               </p>
//             </div>
//             <div className="md:w-1/3 xl:w-1/4">
//               <div className="flex justify-between items-center border rounded px-3 py-2">
//                 <h5 className="text-md font-semibold">Maintenance Mode</h5>
//                 <Switcher
//                   checked={maintenanceMode}
//                   onChange={handleMaintenanceModeChange}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {data && (
//         <>
//           <CompanyInformationForm
//             companyInfo={data}
//             onInputChange={handleInputChange}
//           />
//           <BusinessInformationCard
//             businessInfo={data}
//             onInputChange={handleInputChange}
//           />
//           <AppDownloadInfoCard
//             appLinks={data}
//             onInputChange={handleInputChange}
//           />
//           <div className="flex flex-col md:flex-row gap-4">
//             {console.log("second color=====",data.secondaryColor)}
//             {console.log("primary color=====",data.primaryColor)}
//             <WebsiteColorCard
//               primaryColor={data.primaryColor}
//               secondaryColor={data.secondaryColor}
//               onColorChange={handleInputChange}
//             />
                    
//             <WebsiteHeaderLogoCard
//               initialLogo={data.headerLogo}
//               onImageChange={(uploadedKey) =>
//                 handleLogoChange("headerLogo", uploadedKey)
//               }
//             />
//           </div>
//           <div className="flex flex-col md:flex-row gap-4 mt-3">
//             <WebsiteFooterLogoCard
//               footerLogo={data.footerLogo}
//               onImageChange={(uploadedKey) =>
//                 handleLogoChange("footerLogo", uploadedKey)
//               }
//             />
//             <WebsiteFaviconCard
//               favicon={data.favicon}
//               onImageChange={(uploadedKey) =>
//                 handleLogoChange("favicon", uploadedKey)
//               }
//             />
//           </div>
//           <button
//             onClick={handleMaintenanceSave}
//             className="btn bg-primary-dark-500 text-white mt-4"
//           >
//             Save Changes
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default MaintenanceCard;
