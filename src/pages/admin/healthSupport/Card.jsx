


// Card.js
import React from 'react';

const Card = ({ title, description, price }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-center items-center mb-2">
        <img
          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64883e708db4e.png"
          alt="Product Thumbnail"
          className="max-w-full h-auto"
        />
      </div>
      <p className="text-lg font-bold mb-1">{title}</p>
      <p className="text-sm text-gray-600 mb-1">{description}</p>
      <p className="text-xl font-bold text-red-600">{price}</p>
    </div>
  );
};

export default Card;
