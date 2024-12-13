import React, { useState } from 'react';

const WebsiteFaviconCard = () => {
  const [favicon, setFavicon] = useState(
    '/vistalogo.png'
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFavicon(fileURL);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg h-full w-full md:w-2/4">
      <div className="p-3 bg-white shadow-md flex items-center gap-2">
        <h5 className="mb-0 text-sm font-bold flex items-center gap-2 capitalize">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/footer-logo.png"
            alt="Favicon Icon"
          />
          Website Favicon
        </h5>
        <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
          (Ratio 1:1)
        </span>
      </div>
      <div className="p-4 flex flex-col justify-around h-full">
        {/* Favicon Preview */}
        <div className="flex justify-between w-16 ml-20 md:ml-40 ">
          <img height="60" id="view-website-fav-icon" src={favicon} alt="Website Favicon" />
        </div>
        
        {/* File Input */}
        <div className="mt-4 relative">
          <input
            type="file"
            name="company_fav_icon"
            id="website-fav-icon"
            accept=".webp, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <label
            htmlFor="website-fav-icon"
            className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded-md cursor-pointer capitalize"
          >
            Choose file
          </label>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFaviconCard;




// import React, { useState } from 'react';

// const WebsiteFaviconCard = ({ favicon }) => {
//   const [faviconSrc, setFaviconSrc] = useState(favicon);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setFaviconSrc(fileURL);
//     }
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg shadow-lg h-full w-full md:w-2/4">
//       <div className="p-3 bg-white shadow-md flex items-center gap-2">
//         <h5 className="mb-0 text-sm font-bold flex items-center gap-2 capitalize">
//           <img src="/default-favicon.png" alt="Favicon Icon" />
//           Website Favicon
//         </h5>
//         <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
//           (Ratio 1:1)
//         </span>
//       </div>
//       <div className="p-4 flex flex-col justify-around h-full">
//         <div className="flex justify-center w-16 ml-20 md:ml-40">
//           <img height="60" id="view-website-fav-icon" src={faviconSrc} alt="Website Favicon" />
//         </div>
//         <div className="mt-4 relative">
//           <input
//             type="file"
//             name="company_fav_icon"
//             id="website-fav-icon"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="absolute inset-0 opacity-0 cursor-pointer"
//           />
//           <label
//             htmlFor="website-fav-icon"
//             className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded-md cursor-pointer capitalize"
//           >
//             Choose file
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebsiteFaviconCard;
