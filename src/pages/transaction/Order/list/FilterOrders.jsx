

import React from 'react';

const FilterOrders = () => {
  return (
    <>
      <div className="bg-white border-transparent rounded-lg border-4 ml-5 mr-5 mt-8 box-border hover:shadow-lg">
        <div className="text-gray-800 pl-4 pt-3  font-semibold">
          <p>Filter Order</p>
        </div>
        <div className="grid grid-cols-4 gap-2 pl-4 pr-3 pt-3">
          <p className="text-gray-500">Order Type</p>
          <p className="text-gray-500">Store</p>
          <p className="text-gray-500">Customer</p>
          <p className="text-gray-500">Data Type</p>
        </div>
        <div className="grid grid-cols-4 gap-2 pl-4 pt-3 pr-4 justify-between">
          <select className="border border-gray-300 rounded text-base text-gray-700 hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="ALL">ALL</option>
            <option value="In HOUSE Order">In HOUSE Order</option>
            <option value="Vendor Order">Vendor Order</option>
            <option value="POS Order">POS Order</option>
          </select>

          <select className="border border-gray-300 rounded text-base text-gray-700 py-3 px-4 hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="ALL customer">ALL customer</option>
            <option value="fatema subarna">fatema subarna</option>
            <option value="md safayet">md safayet</option>
            <option value=" jocky lop">jocky lop</option>
            <option value="demo user">demo user</option>
           
          </select>
          
          <select className="border border-gray-300 rounded text-base text-gray-700 py-3 px-4 hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="Inhouse">Inhouse</option>
            <option value="ALL Shop">ALL Shop</option>
            <option value="Deluxe Online">Deluxe Online</option>
            <option value="Mart Morning">Mart Morning</option>
            <option value="Welliness Fair">Welliness Fair</option>
            <option value="Bicycle">Bicycle</option>
          </select>


          <select className="border border-gray-300 rounded text-base text-gray-700 py-3 px-4 hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="select Datatype">select Datatype</option>
            <option value="this year">this year</option>
            <option value="this month ">this month</option>
            <option value="this week">this week</option>
            
          </select>

        </div>
        <div className="flex justify-end">
      <div className="pt-4 flex">
        <button className="bg-slate-500 px-4 py-2 hover:bg-[#586266d3] hover:text-white rounded-lg text-white">
          Reset
        </button>
        <div className="pl-4">
          <button className="bg-blue-600 px-5  py-2 rounded-lg text-white hover:bg-[#268ebb] hover:text-white">
            Show Data
          </button>
        </div>
      </div>
    </div>
      </div> 
    </>
  );
};

export default FilterOrders;

