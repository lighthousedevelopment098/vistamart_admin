import React from "react";

const Card2 = ({ icons, Title, Count }) => {
  return (
    <div className="flex justify-between items-center bg-[#F8F9FB] gap-4 px-3 py-3  rounded-lg cursor-pointer hover:shadow-md  p-2 ${bgColor} mb-2">
      <div className="flex justify-start items-center gap-2 ">
        <img src={icons} alt="" className="h-6 w-6" />
        <h1 className="text-[.7rem] font-bold">{Title}</h1>
      </div>

      <h1 className="text-[.9rem]">{Count}</h1>
    </div>
  );
};

export default Card2;
