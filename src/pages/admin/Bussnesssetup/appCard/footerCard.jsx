import React, { useState } from 'react';

const WebsiteFooterLogoCard = () => {
  const [footerLogo, setFooterLogo] = useState(
    '/vistalogo.png'
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFooterLogo(fileURL);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg h-full w-full md:w-2/4">
      <div className="p-3 bg-white shadow-md    flex items-center gap-2">
        <h5 className="mb-0 text-sm font-bold  flex items-center gap-2 capitalize">
          <img src="https://6valley.6amtech.com/public/assets/back-end/img/footer-logo.png" alt="Website Footer Logo" />
          Website Footer Logo
        </h5>
        <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-xs  rounded">
          (1000 x 308 px)
        </span>
      </div>
      <div className="p-4 flex flex-col justify-around h-full">
        {/* Footer Logo Preview */}
        <div className="flex justify-center w-52 ml-20">
          <img height="60" id="view-website-footer-logo" src={footerLogo} alt="Website Footer Logo" />
        </div>
        
        {/* File Input */}
        <div className="mt-4 relative">
          <input
            type="file"
            name="company_footer_logo"
            id="website-footer-logo"
            accept=".webp, .jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <label
            htmlFor="website-footer-logo"
            className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded-md cursor-pointer capitalize"
          >
            Choose file
          </label>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFooterLogoCard;




// import React, { useState } from 'react';

// const WebsiteFooterLogoCard = ({ footerLogo }) => {
//   const [logo, setLogo] = useState(footerLogo);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileURL = URL.createObjectURL(file);
//       setLogo(fileURL);
//     }
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg shadow-lg h-full w-full md:w-2/4">
//       <div className="p-3 bg-white shadow-md flex items-center gap-2">
//         <h5 className="mb-0 text-sm font-bold flex items-center gap-2 capitalize">
//           <img src="/default-footer-logo.png" alt="Website Footer Logo" />
//           Website Footer Logo
//         </h5>
//         <span className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
//           (1000 x 308 px)
//         </span>
//       </div>
//       <div className="p-4 flex flex-col justify-around h-full">
//         <div className="flex justify-center w-52 ml-20">
//           <img height="60" id="view-website-footer-logo" src={logo} alt="Website Footer Logo" />
//         </div>
//         <div className="mt-4 relative">
//           <input
//             type="file"
//             name="company_footer_logo"
//             id="website-footer-logo"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="absolute inset-0 opacity-0 cursor-pointer"
//           />
//           <label
//             htmlFor="website-footer-logo"
//             className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded-md cursor-pointer capitalize"
//           >
//             Choose file
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WebsiteFooterLogoCard;
