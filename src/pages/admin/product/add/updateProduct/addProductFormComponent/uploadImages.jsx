import { toast } from "react-toastify";
import {
	deleteUploadedImages,
	getProductUploadUrl,
	uploadImageToS3,
} from "../../../../../../utils/helpers";

async function uploadImage(uploadConfig, file) {
	try {
		await uploadImageToS3(uploadConfig.url, file);
		return uploadConfig.key;
	} catch (error) {
		console.error(`Failed to upload ${file.name}:`, error);
		toast.error(`Failed to upload ${file.name}. Please try again.`);
		return null;
	}
}


const uploadProductImagesToS3 = async (thumbnail, images, initialThumbnail, initialImages, maxRetries = 3) => {
    let thumbnailKey = initialThumbnail; // Default to the existing thumbnail
    const imageKeys = [...initialImages];  // Default to the existing image keys
    const imageUploadConfigs = [];
    const retryDelays = [500, 1000, 2000];
    const folder = "products"; // Specify folder for product images

    // Check if thumbnail is provided and needs to be updated
    if (thumbnail?.file && thumbnail.file !== initialThumbnail) {
        try {
            const thumbnailConfig = await getProductUploadUrl(thumbnail.file.type, folder);
            imageUploadConfigs.push({ type: "thumbnail", config: thumbnailConfig, file: thumbnail.file });
        } catch (error) {
            console.error("Failed to get upload URL for thumbnail.", error);
            toast.error("Unable to get upload URL for thumbnail. Please check permissions.");
            return null;
        }
    }

    // Upload new images if provided and different from initial ones
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (img.file && (img.file !== initialImages[i]?.file || !initialImages[i])) {
            // Only upload the image if it's new or has changed (or the initialImages slot is empty)
            try {
                const imageConfig = await getProductUploadUrl(img.file.type, folder);
                imageUploadConfigs.push({ type: "image", config: imageConfig, file: img.file, index: i });
            } catch (error) {
                console.error(`Failed to get upload URL for image: ${img.file.name}`, error);
                toast.error(`Unable to get upload URL for image: ${img.file.name}. Please check permissions.`);
                return null;
            }
        }
    }

    // Retry upload logic
    const uploadWithRetry = async (config, file, retries = 0) => {
        try {
            return await uploadImage(config, file);
        } catch (error) {
            if (retries < maxRetries) {
                console.warn(`Retrying upload for ${file.name}, attempt ${retries + 1}`);
                await new Promise((resolve) => setTimeout(resolve, retryDelays[retries]));
                return uploadWithRetry(config, file, retries + 1);
            }
            console.error(`Failed to upload ${file.name} after ${maxRetries} attempts.`);
            toast.error(`Upload failed for ${file.name} after multiple attempts.`);
            return null;
        }
    };

    try {
        const uploadResults = await Promise.all(
            imageUploadConfigs.map(async ({ type, config, file, index }) => {
                const key = await uploadWithRetry(config, file);
                if (key) {
                    if (type === "thumbnail") {
                        thumbnailKey = key;
                    } else {
                        // Replace the image at the correct index
                        imageKeys[index] = key;
                    }
                }
                return { key, type };
            })
        );

        const failedUploads = uploadResults.filter((result) => result.key === null);

        if (failedUploads.length) {
            const successfulKeys = uploadResults.filter(({ key }) => key).map(({ key }) => key);
            await deleteUploadedImages(successfulKeys);
            toast.error("Image upload failed. Deleted previously uploaded images.");
            return null;
        }

        console.log("Successfully uploaded images:", { thumbnailKey, imageKeys });
        return { thumbnailKey, imageKeys };
    } catch (error) {
        console.error("Unexpected error during image upload:", error);
        await deleteUploadedImages([thumbnailKey, ...imageKeys]);
        toast.error("An unexpected error occurred. Deleted previously uploaded images.");
        return null;
    }
};


export default uploadProductImagesToS3;




