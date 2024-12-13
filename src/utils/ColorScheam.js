// import apiConfig from "../config/apiConfig";

// const API_URL = apiConfig.admin;

// export const ColorScheam = async () => {
//   try {
//     const response = await fetch(`${API_URL}/businessgeneral`); // Corrected API endpoint
//     const data = await response.json();

//     if (data.status === "success" && data.doc.length > 0) {
//       const { primaryColor, secondaryColor } = data.doc[0];
//      console.log("primaryColor and secondar color", primaryColor, secondaryColor)
//       // Set the colors as CSS variables
//       document.documentElement.style.setProperty("--primary-color", primaryColor);
//       document.documentElement.style.setProperty("--secondary-color", secondaryColor);
//     } else {
//       console.error("Failed to fetch color configuration from API.");
//     }
//   } catch (error) {
//     console.error("Error fetching color configuration:", error);
//   }
// };




import apiConfig from "../config/apiConfig";

const API_URL = apiConfig.admin;

export const ColorScheam = async () => {
  try {
    const response = await fetch(`${API_URL}/businessgeneral`);
    const data = await response.json();

    if (data.status === "success" && data.doc.length > 0) {
      const { primaryColor, secondaryColor } = data.doc[0];

      // Convert colors to RGB values if necessary
      const parseColor = (color) => {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = color;
        return ctx.fillStyle; // Returns the standardized color format
      };

      const primaryRGB = parseColor(primaryColor);
      const secondaryRGB = parseColor(secondaryColor);

      // Set CSS variables
      document.documentElement.style.setProperty("--primary-color", primaryRGB);
      document.documentElement.style.setProperty("--secondary-color", secondaryRGB);
    } else {
      console.error("Failed to fetch color configuration from API.");
    }
  } catch (error) {
    console.error("Error fetching color configuration:", error);
  }
};
