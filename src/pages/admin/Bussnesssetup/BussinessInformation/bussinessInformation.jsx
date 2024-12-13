// import React from 'react';

// const BusinessInformationCard = () => {
//   return (
//     <div className="card mb-3 border rounded-lg shadow">
//       <div className="card-header bg-white p-3 shadow-md">
//         <h5 className="mb-0 text-capitalize flex gap-1 items-center text-gray-800">
//           <h1 className=" text-sm font-bold">Business Information</h1>
          
//         </h5>
//       </div>
//       <div className="card-body p-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
//           {/* Currency Selection */}
//           <div className="form-group">
//             <label className="title-color flex" htmlFor="currency">Currency</label>
//             <select
//               name="currency_id"
//               className="form-control border-gray-300 rounded-lg px-3 py-2 outline-none hover:border-primary"
//               defaultValue="1"
//             >
//               <option value="1">PKR</option>
//               <option value="10">USD</option>
//               <option value="2">BDT</option>
//               <option value="3">Indian Rupee</option>
//               <option value="4">Euro</option>
//               <option value="5">YEN</option>
//               <option value="6">Ringgit</option>
//               <option value="7">Rand</option>
//               <option value="11">Qatar</option>
//             </select>
//           </div>

//           {/* Currency Position */}
//           <div className="form-group">
//             <label className="title-color flex">Currency Position</label>
//             <div className="flex gap-2 items-center ">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio text-green-g00"
//                   value="left"
//                   name="currency_symbol_position"
//                   id="currency_position_left"
//                   defaultChecked
//                 />
//                 <label htmlFor="currency_position_left" className="ml-2">(PKR) Left</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio text-green-500"
//                   value="right"
//                   name="currency_symbol_position"
//                   id="currency_position_right"
//                 />
//                 <label htmlFor="currency_position_right" className="ml-2">Right (PKR)</label>
//               </div>
//             </div>
//           </div>

//           {/* Business Model */}
//           <div className="form-group">
//             <label className="title-color flex">Business Model</label>
//             <div className="flex gap-2 items-center">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio text-green-500"
//                   value="single"
//                   name="business_mode"
//                   id="single_vendor"
//                 />
//                 <label htmlFor="single_vendor" className="ml-2">Single Vendor</label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio text-green-500"
//                   value="multi"
//                   name="business_mode"
//                   id="multi_vendor"
//                   defaultChecked
//                 />
//                 <label htmlFor="multi_vendor" className="ml-2">Multi Vendor</label>
//               </div>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="form-group">
//             <label className="title-color flex items-center">
//               Pagination
//               <span
//                 className="input-label-secondary ml-1 cursor-pointer"
//                 title="This number indicates how much data will be shown in the list or table"
//               >
//                 <img
//                   width="16"
//                   src="https://6valley.6amtech.com/public/assets/back-end/img/info-circle.svg"
//                   alt="Info"
//                 />
//               </span>
//             </label>
//             <input
//               type="number"
//               defaultValue="25"
//               name="pagination_limit"
//               className="form-control border-gray-300 rounded-lg px-3 py-2 outline-none hover:border-primary"
//               placeholder="25"
//             />
//           </div>

//           {/* Company Copyright Text */}
//           <div className="form-group">
//             <label className="title-color flex">Company Copyright Text</label>
//             <input
//               type="text"
//               name="company_copyright_text"
//               defaultValue="Copyright Vistamart@2024"
//               className="form-control border-gray-300 rounded-lg px-3 py-2 outline-none hover:border-primary"
//               placeholder="Company copyright text"
//             />
//           </div>

//           {/* Decimal Point Settings */}
//           <div className="form-group">
//             <label className="input-label text-capitalize">
//               Digit after decimal point (Ex: 0.00)
//             </label>
//             <input
//               type="number"
//               defaultValue="2"
//               name="decimal_point_settings"
//               min="0"
//               className="form-control border-gray-300 rounded-lg px-3 py-2 outline-none hover:border-primary"
//               placeholder="4"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessInformationCard;

import React from 'react';

const BusinessInformationCard = ({ businessInfo, onInputChange }) => {
  const handleCurrencyChange = (e) => {
    const value = e.target.value;
    onInputChange("currencyPosition", value);
  };

  const handleCurrencyPositionChange = (e) => {
    const value = e.target.value;
    onInputChange("currencyPosition", value);
  };

  const handleBusinessModelChange = (e) => {
    const value = e.target.value;
    onInputChange("businessModel", value);
  };

  return (
    <div className="card mb-3 border rounded-lg shadow">
      <div className="card-header bg-white p-3 shadow-md">
        <h5 className="mb-0 text-capitalize flex gap-1 items-center text-gray-800">
          <h1 className="text-sm font-bold">Business Information</h1>
        </h5>
      </div>
      <div className="card-body p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Currency Selection */}
          <div className="form-group">
            <label className="title-color flex" htmlFor="currency">Currency</label>
            <select
              name="currency_id"
              className="form-control border-gray-300 rounded-lg px-3 py-2 outline-none hover:border-primary"
              value={businessInfo.currencyPosition === 'Left' ? 'PKR' : 'USD'} // Bind to state
              onChange={handleCurrencyChange} // Handle change event
            >
              <option value="1">PKR</option>
              <option value="10">USD</option>
              <option value="2">BDT</option>
              <option value="3">Indian Rupee</option>
              <option value="4">Euro</option>
              <option value="5">YEN</option>
              <option value="6">Ringgit</option>
              <option value="7">Rand</option>
              <option value="11">Qatar</option>
            </select>
          </div>

          {/* Currency Position */}
          <div className="form-group">
            <label className="title-color flex">Currency Position</label>
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-g00"
                  value="Left"
                  name="currency_symbol_position"
                  id="currency_position_left"
                  checked={businessInfo.currencyPosition === 'Left'}
                  onChange={handleCurrencyPositionChange} // Handle change event
                />
                <label htmlFor="currency_position_left" className="ml-2">(PKR) Left</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  value="Right"
                  name="currency_symbol_position"
                  id="currency_position_right"
                  checked={businessInfo.currencyPosition === 'Right'}
                  onChange={handleCurrencyPositionChange} // Handle change event
                />
                <label htmlFor="currency_position_right" className="ml-2">Right (PKR)</label>
              </div>
            </div>
          </div>

          {/* Business Model */}
          <div className="form-group">
            <label className="title-color flex">Business Model</label>
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  value="Single Vendor"
                  name="business_mode"
                  id="single_vendor"
                  checked={businessInfo.businessModel === 'Single Vendor'}
                  onChange={handleBusinessModelChange} // Handle change event
                />
                <label htmlFor="single_vendor" className="ml-2">Single Vendor</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-500"
                  value="Multi Vendor"
                  name="business_mode"
                  id="multi_vendor"
                  checked={businessInfo.businessModel === 'Multi Vendor'}
                  onChange={handleBusinessModelChange} // Handle change event
                />
                <label htmlFor="multi_vendor" className="ml-2">Multi Vendor</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformationCard;
