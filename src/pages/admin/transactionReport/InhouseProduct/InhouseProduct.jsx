import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

// Sample categories array
const categories = [
  { id: "all", name: "All" },
  { id: "11", name: "Home Improvement & Tools" },
  { id: "12", name: "Toys, Kids & Babies" },
  { id: "13", name: "Men's fashion" },
  { id: "14", name: "Outdoor Fun & Sports" },
  { id: "15", name: "Women's fashion" },
  { id: "16", name: "ebook" },
  { id: "24", name: "Jewelry & Watches" },
  { id: "25", name: "Beauty, Health & Hair" },
  { id: "26", name: "Mobile Accessories" },
  { id: "27", name: "Computer, Office & Security" },
  { id: "28", name: "Phones & Telecom" },
  { id: "34", name: "Home, Pet & Appliances" },
  { id: "39", name: "Bags & Shoes" },
];

// Sample table data array
const tableData = [
  {
    id: 1,
    name: "Women's long-sleeve lightweight french terry fleece quarter-zip top",
    totalSale: 7,
  },
  {
    id: 2,
    name: "Crossbody Shoulder Bag Soft Leather Bag Female Fashion",
    totalSale: 7,
  },
  {
    id: 3,
    name: "Progress lighting P4009-10 5-light chandelier, polished brass",
    totalSale: 2,
  },
  {
    id: 4,
    name: "Simple Mobile Carrier-Locked Galaxy A50 4G LTE Prepaid Smartphone - Blac",
    totalSale: 12,
  },
  {
    id: 5,
    name: "Timex marlin stainless steel hand-wound movement",
    totalSale: 1,
  },
  { id: 6, name: "Fastest Electric Spice Grinder and Blender", totalSale: 1 },
  { id: 7, name: "Enos 658 Hair Dryer for Women-Multicolor", totalSale: 5 },
  { id: 8, name: "Fashionable bag for women", totalSale: 1 },
  {
    id: 9,
    name: "New Fashionable Box Balance Heel shoes for Women",
    totalSale: 4,
  },
  {
    id: 10,
    name: "Hot Selling Sneakers, Sneakers Men Casual Shoes Men Fashion Sneakers Fly knit Li",
    totalSale: 7,
  },
  {
    id: 11,
    name: "New Design Trendy Casual Sneakers for Men Lightweight & Comfortable For Party We",
    totalSale: 1,
  },
  {
    id: 12,
    name: "Quartz wrist watch waterproof watch for Men and Women",
    totalSale: 2,
  },
  { id: 13, name: "Win - win Strategy (English) -eBook", totalSale: 3 },
  { id: 14, name: "Win - win Strategy (English) -eBook", totalSale: 0 },
  { id: 15, name: "Life of the Candle comic book", totalSale: 1 },
  { id: 16, name: "Create Your Own Business pdf version-2", totalSale: 1 },
];

const InhouseSale = () => {
  const [category, setCategory] = useState("all");

  const handleFilterChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
  };

  return (
    <div className="content container mx-auto py-8 snipcss-JovJL">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-2 capitalize">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/inhouse_sale.png"
            alt="Inhouse sale"
          />
          Inhouse sale
        </h2>
      </div>
      <div className="row">
        <div className="w-full">
          <div className="card bg-white shadow-md rounded-md">
            <div className="px-4 py-5">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-2 flex items-center gap-4">
                    <label htmlFor="category" className="text-lg font-medium">
                      Category
                    </label>
                    <select
                      className="form-select block w-full mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      name="category_id"
                      value={category}
                      onChange={handleFilterChange}
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1">
                    <button
                      type="submit"
                      className="btn w-full flex justify-center items-center px-4 py-2 bg-primary-500 hover:bg-primary-dark text-white hover:bg-primary-dark rounded-md"
                      style={{ color: "white" }}
                    >
                      <IoFilter className="mr-2" /> Filter
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="table-responsive">
              <table className="w-full table-auto border-collapse bg-white shadow-sm rounded-lg">
                <thead className="bg-gray-100">
                  <tr className="text-left text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6">SL</th>
                    <th className="py-3 px-6">Product Name</th>
                    <th className="py-3 px-6 text-center">Total Sale</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {tableData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{item.id}</td>
                      <td className="py-3 px-6">{item.name}</td>
                      <td className="py-3 px-6 text-center">
                        {item.totalSale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-responsive mt-4">
              <div className="px-4 flex justify-end">
                {/* Additional table controls could go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InhouseSale;
