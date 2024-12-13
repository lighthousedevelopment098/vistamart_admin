import axios from "axios";
import { getAuthData } from "./authHelper";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Function to get a pre-signed upload URL
export const getUploadUrl = async (type, folder) => {
	try {
	  const query = {
		fileType: type.split('/')[1],
		folder,
	  };
	  console.log("Query to upload in getUploadUrl:", query);
  
	  // Fetching the pre-signed URL
	  const response = await axios.get(`${BASE_URL}/api/v1/image/upload`, {
		params: query,
	  });
	  console.log("Response in getUploadUrl:", response);
  
	  // Ensure the response contains both URL and key
	  if (!response.data || !response.data.key) {
		throw new Error('Upload response is missing key property.');
	  }
  
	  // Returning URL and key for S3 upload
	  return response.data;
	} catch (error) {
	  console.error("Error fetching upload URL:", error);
	  throw new Error("Failed to get upload URL");
	}
  };
  
  
// export const getProductUploadUrl = async (type) => {
// 	try {
// 		const query = {
// 			fileType: type.split("/")[1],
// 		};

// 		const { token } = getAuthData();

// 		const response = await axios.get(
// 			`${BASE_URL}/api/v1/image/upload/`,
// 			{
// 				params: query,
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 			}
// 		);

// 		return response.data; // Contains the URL and the key for S3 storage
// 	} catch (error) {
// 		console.error("Error fetching upload URL: ", error);
// 		throw new Error("Failed to get upload URL");
// 	}
// };


// Modify getProductUploadUrl to accept a folder parameter


export const getProductUploadUrl = async (type, folder) => {
     console.log("file ", type)
     console.log("folder to uplaod", folder)
	try {
        const query = {
            fileType: type.split("/")[1],
            folder, // Include the folder in the query
        };

        const { token } = getAuthData();

        const response = await axios.get(
            `${BASE_URL}/api/v1/image/upload/`,
            {
                params: query,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data; // Contains the URL and the key for S3 storage
    } catch (error) {
        console.error("Error fetching upload URL: ", error);
        throw new Error("Failed to get upload URL");
    }
};

// Function to upload an image to S3
// Function to upload an image to S3
export const uploadImageToS3 = async (uploadUrl, file) => {
	try {
	  console.log("upload Url=====", uploadUrl);
	  console.log("upload file=====", file);
  
	  // Perform the file upload
	  const response = await axios.put(uploadUrl, file, {
		headers: {
		  "Content-Type": file.type,
		},
	  });
  
	  // Check if the upload is successful (status code 200 or 201)
	  if (response.status === 200 || response.status === 201) {
		console.log("File uploaded successfully!");
		return true;
	  } else {
		throw new Error("Upload failed with status: " + response.status);
	  }
	} catch (error) {
	  console.error("Error uploading image", error);
	  throw new Error("Failed to upload image");
	}
  };
  
export const deleteUploadedImages = async (keys) => {
	try {
		await axios.delete(`${BASE_URL}/api/v1/image/delete-images`, {
			data: { keys },
		});
	} catch (error) {
		console.error("Error deleting images", error);
		throw new Error("Failed to delete images");
	}
};

export const formatPrice = (value) => {
	return Number(value).toLocaleString("en-PK", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};


