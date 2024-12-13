import React from "react";

const CardFirst = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className={` bg-white rounded-lg cursor-pointer hover:shadow-lg shadow-md   p-2 ${bgColor}`}
    >
      <div className=" flex justify-end pb-2 pe-3">
        <img src={icon} alt="" className="w-7 h-7" />
      </div>

      <div className="flex flex-col  justify-start pb-3 ps-3">
        <div className="text-[.8rem] font-semibold text-gray-600 pb-2">
          {title}
        </div>
        <div className="text-[1.3rem] font-bold">{value}</div>
      </div>
    </div>
  );
};

export default CardFirst;
