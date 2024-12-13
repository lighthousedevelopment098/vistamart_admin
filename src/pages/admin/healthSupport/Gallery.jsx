import React from "react";

const PageGallery = () => {
  return (
    <>
      <div className="bg-secondary-500 h-full w-full">
        {/* Header section */}
        <div className="flex items-center pt-6 pl-8">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/file-manager.png"
            alt="Gallery"
            className="w-8 h-8 md:w-[2vw] md:h-[4vh]"
          />
          <p className="text-[#334257] pl-3  text-lg md:text-[1rem] font-semibold">
            File Manager
          </p>
        </div>

        {/* Title and button */}
        <div className="flex justify-between gap-2 items-center pl-10 pt-5 pr-10">
          <p className="text-lg  text-nowrap  md:text-[1rem] font-semibold text-[#334257]">
            File Manager
          </p>
          <button
            className="bg-primary-500 text-nowrap rounded text-sm text-white px-4 py-2 hover:bg-primary-dark-500"
            style={{ color: "white" }}
          >
            + Add New
          </button>
        </div>

        {/* Main content container */}
        <div className="bg-white shadow-xl w-full  mt-5 rounded-lg p-6 hover:shadow-2xl">
          {/* Folder section title */}
          <div className="flex items-center">
            <p className="text-lg text-[#334257] font-semibold">Public</p>
            <p className="text-xs font-semibold text-[#334257] ml-2 bg-secondary-500 rounded-full px-2 py-1">
              15
            </p>
          </div>

          {/* Divider */}
          <p className="border-2 border-secondary-500 mt-3"></p>

          {/* Folders grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 ml-8 mt-8">
            {[
              "review",
              "seller",
              "notific",
              "Brand",
              "admin",
              "company",
              "deal",
              "profile",
              "product",
              "banner",
            ].map((folder, index) => (
              <div
                key={index}
                className="border border-gray-300 w-40 h-40 md:w-32 md:h-32 rounded-lg flex flex-col items-center justify-center"
              >
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/folder.png"
                  className="w-20 h-20"
                  alt="folder icon"
                />
                <p className="text-sm text-[#334257] mt-2">{folder}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageGallery;
