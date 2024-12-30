import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Switcher from "../../../../components/FormInput/Switcher";
import { getAuthData } from "../../../../utils/authHelper";
import CompanyInformationForm from "../Company information/companyInformation";
import BusinessInformationCard from "../BussinessInformation/bussinessInformation";
import AppDownloadInfoCard from "../appCard/appCard";
import WebsiteColorCard from "../appCard/colourCard";
import WebsiteHeaderLogoCard from "../appCard/headerLogoCard";
import WebsiteFooterLogoCard from "../appCard/footerCard";
import WebsiteFaviconCard from "../appCard/FaviconCard";
import apiConfig from "../../../../config/apiConfig";
import LoadingGifCard from "../appCard/loadingGifCard";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";

const MaintenanceCard = () => {
  const [loading, setLoading] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
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
    appleStoreLink: "",
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
          setMaintenanceMode(response.data.doc[0].maintenanceMode);
        }
      } catch (error) {
        console.error("Error fetching business data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  const handleInputChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (imageKey, uploadedKey) => {
    setData((prev) => ({ ...prev, [imageKey]: uploadedKey }));
  };

  const handleMaintenanceSave = async () => {
    setLoading(true);

    try {
      const { token } = getAuthData();
      const payload = { ...data, maintenanceMode };

      const response = await axios.put(
        `${apiConfig.admin}/businessgeneral/${data._id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Business information updated successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMaintenanceModeChange = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  const handleColorChange = ({ primaryColor, secondaryColor }) => {
    setData((prevData) => ({
      ...prevData,
      primaryColor,
      secondaryColor,
    }));
  };
  
  if (loading) {
    return <div><LoadingSpinner /></div>;
  }

  return (
    <div>
      <div className="border mb-2 rounded-lg shadow-sm">
        <div className="p-3 shadow-lg rounded-t-lg">
          <h1 className="text-sm font-bold">System Maintenance</h1>
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="md:w-2/3 xl:w-3/4">
              <p>
                *By turning on maintenance mode, control all your system &
                functions.
              </p>
            </div>
            <div className="md:w-1/3 xl:w-1/4">
              <div className="flex justify-between items-center border rounded px-3 py-2">
                <h5 className="text-md font-semibold">Maintenance Mode</h5>
                <Switcher
                  checked={maintenanceMode}
                  onChange={handleMaintenanceModeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {data && (
        <>
          <CompanyInformationForm
            companyInfo={data}
            onInputChange={handleInputChange}
          />
          <BusinessInformationCard
            businessInfo={data}
            onInputChange={handleInputChange}
          />
          <AppDownloadInfoCard
            appLinks={data}
            onInputChange={handleInputChange}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <WebsiteColorCard
              primaryColor={data.primaryColor}
              secondaryColor={data.secondaryColor}
              onColorChange={handleColorChange}
            />
                    
            <WebsiteHeaderLogoCard
              initialLogo={data.headerLogo}
              onImageChange={(uploadedKey) =>
                handleLogoChange("headerLogo", uploadedKey)
              }
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-3">
            {/* <WebsiteFooterLogoCard
              footerLogo={data.footerLogo}
              onImageChange={(uploadedKey) =>
                handleLogoChange("footerLogo", uploadedKey)
              }
            /> */}
            
            <WebsiteFaviconCard
              initialFavicon={data?.favicon}
              onImageChange={(uploadedKey) =>
                handleLogoChange("favicon", uploadedKey)
              }
            />
             <LoadingGifCard 
          initialLoadingGif={data?.loadingGif} 
           onImageChange={(uploadedKey) =>
            handleLogoChange("loadingGif", uploadedKey)
          }
           />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-3">
         
          </div>
          <button
            onClick={handleMaintenanceSave}
            className="btn bg-primary-dark-500 text-white mt-4"
          >
            Save Changes
          </button>
        </>
      )}
    </div>
  );
};

export default MaintenanceCard;
