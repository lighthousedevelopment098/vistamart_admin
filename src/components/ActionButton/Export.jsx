// import React from "react";
// import * as XLSX from "xlsx"; // Import XLSX for exporting data

// const ExportButton = ({
//   onClick,
//   icon: Icon,
//   label,
//   className,
//   style,
//   data,
//   filename,
// }) => {
//   // Default export function that converts data to Excel
//   const handleExport = () => {
//     if (data && data.length > 0) {
//       const worksheet = XLSX.utils.json_to_sheet(data); // Convert the passed data to worksheet
//       const workbook = XLSX.utils.book_new(); // Create a new workbook
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append the worksheet
//       XLSX.writeFile(workbook, `${filename || "ExportedData"}.xlsx`); // Download the file
//     } else {
//       console.error("No data provided for export"); // Handle case when no data is passed
//     }
//   };

//   return (
//     <button
//       type="button"
       
//       className={`btn px-4 py-2 justify-center text-white align-items-center flex gap-2 ${className}`}
//       onClick={onClick || handleExport} // Either use passed onClick or default export handler
//       // style={style}
//       style={{...style, color: "#FFFFFF"  }}
//     >
//       {Icon && <Icon className="text-white" />} {/* Render icon dynamically */}
//       {label}
//     </button>
//   );
// };

// export default ExportButton;


import React from "react";
import * as XLSX from "xlsx"; // Import XLSX for exporting data

const ExportButton = ({
  onClick,
  icon: Icon,
  label,
  className,
  style,
  data,
  filename,
}) => {
  // Export function that filters out specified fields
  const handleExport = () => {
    if (data && data.length > 0) {
      // Transform data to exclude specified fields
      const filteredData = data.map(({ slug, createdAt, updatedAt,__v, ...rest }) => rest);

      const worksheet = XLSX.utils.json_to_sheet(filteredData); // Convert filtered data to worksheet
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append the worksheet
      XLSX.writeFile(workbook, `${filename || "ExportedData"}.xlsx`); // Download the file
    } else {
      console.error("No data provided for export"); // Handle case when no data is passed
    }
  };

  return (
    <button
      type="button"
      className={`btn px-4 py-2 justify-center text-white align-items-center flex gap-2 ${className}`}
      onClick={onClick || handleExport} // Either use passed onClick or default export handler
      style={{ ...style, color: "#FFFFFF" }}
    >
      {Icon && <Icon className="text-white" />} {/* Render icon dynamically */}
      {label}
    </button>
  );
};

export default ExportButton;
