import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="rounded border border-gray-200 bg-white ml-8 mt-24 w-[65vw]">
      <div className="flex">
        <div className="w-[15vw] h-[40vh]">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="w-full">
          <button className="bg-green-500  px-5 py-2 rounded-r ml-[84%] text-white w-28 mr-12 hover:bg-[#268ebb] hover:text-white">
            product info
          </button>
          <p className="pt-3 text-sm font-bold">
            {product.name} <br />
            {product.category}
          </p>

          <p className="pt-14 font-semibold">General Information</p>
          <div className="flex pt-5">
            <div>
              <p>Brand</p>
              <p>Category</p>
              <p>Product Type</p>
              <p>Product Unit</p>
              <p>Current Stock</p>
              <p>Product SKU</p>
            </div>
            <div className="ml-3">
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>

            <div className="ml-10">
              <p>{product.brand}</p>
              <p>{product.category}</p>
              <p>{product.type}</p>
              <p>{product.unit}</p>
              <p>{product.stock}</p>
              <p>{product.sku}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="ml-3">Description :</p>
        <p className="text-sm text-zinc-600 ml-3">{product.description}</p>
      </div>
      {showMore && (
        <div className="ml-3 mt-2 text-sm text-zinc-600">
          {product.moreInfo.map((info, index) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      )}
      <button
        onClick={toggleShowMore}
        className="text-blue-500 ml-80 mt-3 focus:outline-none"
      >
        {showMore ? "View Less" : "View More"}
      </button>
    </div>
  );
};

const ProductGallery = () => {
  const products = [
    {
      image:
        "https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-648862d93c9d7.png",
      name: "Silicone Strap Analogue Sports Watch Rectangular Dial New Model 2023 Men Watches",
      brand: "Triangle",
      category: "Jewelry & Watches",
      type: "Physical",
      unit: "pc",
      stock: "1000",
      sku: "134244",
      description:
        "Specifications of OLEVS 5563 Quartz wrist watch waterproof watch for Men and Women",
      moreInfo: [
        "Brand: OLEVS",
        "SKU: 183922704_BD-1*********",
        "Strap Material: Alloy",
        "Model: 5563",
        "Dial Size: 40mm",
        "Watch Type: Analogue",
        "Movement: Japanese Quartz",
        "Watch Movement Country: China",
        "Watch's Water Resistance: 300m",
        "85% Polyester and 15% Spandex Fabric",
        "Size: our sofa slipcovers have 3 sizes. Chair slipcover measures up to 32in-47in wide (80-120cm), Loveseat slipcover measures up to 57in-70in wide (145-180cm), Sofa slipcover measures up to 72in-92in (185-235cm). PLEASE measure your sofa before choosing our sofa slipcovers.",
        "Fabric: Our Stretchable Sofa Slipcovers Which Are Made of 85% Polyester and 15% Spandex Fabric, Are Suitable for 90% Sofas. The Great Elasticity Could Fit Your Sofa More Perfect and Cover Sofa in Ever Edge. And Unique Dyeing Technology Keeps Your Sofa Slipcovers Not Fade. Please Note: Our Sofa Slipcovers Are Not Water-proof.",
        "Protection: Our sofa slipcovers could help protect your furniture from daily tear, spills, stains, and so on. It is a great choice for families with children and pets. It's easy to install and take off, machine washable, and the best partner for household life.",
        "Lifetime: We are confident in our products’ quality. If you are unsatisfied with our products whichever aspects, please connect with us firstly, and we will give you a satisfying result, no matter refund or sending new slipcovers for replacement. We will do our best.",
        "Attention: Due to the different light and computer screen resolution, The color displayed on the screen may be different from the actual product. If you are not sure about the color or anything else, PLEASE contact US and we will assist you.",
      ],
    },
    {
      image:
        "https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-648862d93c9d7.png",
      name: "Digital Sports Watch with LED Display",
      brand: "TechTime",
      category: "Electronics",
      type: "Digital",
      unit: "pc",
      stock: "500",
      sku: "987654",
      description:
        "High-quality digital sports watch with multiple functions and LED display",
      moreInfo: [
        "Brand: TechTime",
        "SKU: 9876543210",
        "Strap Material: Silicone",
        "Model: DT2023",
        "Dial Size: 45mm",
        "Watch Type: Digital",
        "Movement: Quartz",
        "Watch Movement Country: Japan",
        "Watch's Water Resistance: 200m",
        "Battery Life: 2 years",
        "Additional Features: Stopwatch, Alarm, Backlight",
        "Color: Black",
        "Weight: 80g",
        "Warranty: 1 year",
        "Suitable for: Outdoor activities, sports, daily use",
        "Attention: Avoid exposing to extreme temperatures.",
      ],
    },
  ];

  return (
    <div className=" h-full w-full">
      <div className="flex pt-5 pl-8 items-center">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/all-orders.png"
          alt="All Orders"
          className="mr-2"
        />
        <p className="text-lg text-[#334257] font-bold">Product gallery</p>
        <p className="text-xs font-semibold text-[#334257] ml-4 bg-slate-400 rounded-full px-2 py-1">
          50
        </p>
      </div>

      <div className="bg-white rounded-lg w-[70vw] mt-5 ml-8 h-full shadow-sm border ">
        <div className="flex flex-cols-3 pl-4 pr-3 pt-6">
          <p className="text-gray-500">Store</p>
          <p className="text-gray-500 pl-[21%]">Brand</p>
          <p className="text-gray-500 pl-[21%]">Category</p>
        </div>
        <div className="grid grid-cols-5 gap-2 pl-4 pt-3 pr-4 justify-between">
          <select className="border border-gray-300 bg-white rounded text-base w-48 h-10 text-gray-700 hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="ALL">ALL Shop</option>
            <option value="In HOUSE Order">In HOUSE Order</option>
            <option value="Vendor Order">Vendor Order</option>
            <option value="POS Order">POS Order</option>
          </select>

          <select className="border border-gray-300 rounded bg-white text-base ml-8 w-48 h-10 text-gray-700 hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="ALL">ALL Shop</option>
            <option value="In HOUSE Order">In HOUSE Order</option>
            <option value="Vendor Order">Vendor Order</option>
            <option value="POS Order">POS Order</option>
          </select>

          <select className="border border-gray-300 rounded ml-16 text-base w-48 h-10 text-gray-700 bg-white hover:border-blue-500 hover:bg-white hover:text-black">
            <option value="ALL">ALL Shop</option>
            <option value="In HOUSE Order">In HOUSE Order</option>
            <option value="Vendor Order">Vendor Order</option>
            <option value="POS Order">POS Order</option>
          </select>
          <input
            type="text"
            name="username"
            placeholder="search by product"
            className="border border-gray-300 rounded ml-24 text-base w-56 h-10 text-gray-700 hover:border-primary-500 hover:bg-white hover:text-black"
          ></input>

          <button
            type="submit"
            className=" rounded-r-md px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
            style={{ color: "white" }}
          >
            Search
          </button>
        </div>

        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
