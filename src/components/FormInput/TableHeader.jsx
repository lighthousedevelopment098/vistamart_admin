// TableHeader.jsx
import React from "react";

const TableHeader = ({ imageSrc, title }) => {
  return (
    <div className="font-bold pb-4 text-xl flex gap-2 items-start">
      <h2 className="h1 mb-2 text-capitalize d-flex align-items-center gap-2">
        {imageSrc && (
          <img src={imageSrc} alt="Table Heading Icon" className="w-8 h-8" />
        )}
        <span className="form-label text-[1.5rem] font-semibold text-primary-500">
          {title}
        </span>
      </h2>
    </div>
  );
};

export default TableHeader;
