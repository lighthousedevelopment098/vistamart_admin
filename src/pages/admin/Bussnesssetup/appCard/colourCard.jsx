import React, { useState, useEffect } from 'react';

const WebsiteColorCard = ({ primaryColor: initialPrimaryColor, secondaryColor: initialSecondaryColor, onColorChange }) => {
  const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor || '#32954B');
  const [secondaryColor, setSecondaryColor] = useState(initialSecondaryColor || '#6FE291');

  // Call onColorChange when primaryColor or secondaryColor changes
  const handlePrimaryColorChange = (e) => {
    const newPrimaryColor = e.target.value;
    setPrimaryColor(newPrimaryColor);
    if (onColorChange) {
      onColorChange({ primaryColor: newPrimaryColor, secondaryColor });
    }
  };

  const handleSecondaryColorChange = (e) => {
    const newSecondaryColor = e.target.value;
    setSecondaryColor(newSecondaryColor);
    if (onColorChange) {
      onColorChange({ primaryColor, secondaryColor: newSecondaryColor });
    }
  };

  return (
    <div className="card h-full w-full md:w-2/4 border border-gray-300 rounded-lg shadow-lg">
      <div className="card-header p-3 bg-white shadow-md">
        <h5 className="mb-0 text-sm font-bold flex items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/website-color.png"
            alt="Website Color"
          />
          Website Color
        </h5>
      </div>
      <div className="card-body flex flex-wrap gap-4 justify-around p-4">
        {/* Primary Color */}
        <div className="form-group text-center">
          <input
            type="color"
            name="primary"
            value={primaryColor}
            onChange={handlePrimaryColorChange}  // Handle color change here
            className="form-control w-32 h-20 border border-green-500 cursor-pointer"
          />
          <div className="mt-3 mb-4 text-gray-700 font-semibold">{primaryColor.toUpperCase()}</div>
          <label className="text-gray-700 text-sm">Primary Color</label>
        </div>

        {/* Secondary Color */}
        <div className="form-group text-center">
          <input
            type="color"
            name="secondary"
            value={secondaryColor}
            onChange={handleSecondaryColorChange}  // Handle color change here
            className="form-control w-32 h-20 border border-green-500 cursor-pointer"
          />
          <div className="mt-3 mb-4 text-gray-700 font-semibold">{secondaryColor.toUpperCase()}</div>
          <label className="text-gray-700 text-sm">Secondary Color</label>
        </div>
      </div>
    </div>
  );
};

export default WebsiteColorCard;
