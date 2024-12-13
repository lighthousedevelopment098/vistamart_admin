import React from "react";

const AnnouncementSetup = () => {
  return (
    <div className="bg-secondary-500  px-5 py-5 w-[100%]">
      {" "}
      <div className="font-bold text-[1.3rem] flex gap-2 items-center">
        <img src="/announcement.png" alt="" className="w-6 h-6" />
        <h1>Announcement Setup</h1>
      </div>
      <div className="p-4 h-[80vh] w-full bg-white   mt-3 px-10 py-8  border border-gray-300 rounded-lg shadow-lg">
        <h1 className="w-full pb-4 border-b shadow-md border-b-gray-600 text-xl font-semibold">
          Announcement Setup
        </h1>
        <div className="mt-4">
          <div className="mb-4">
            <div className=" ">
              <label className="flex items-center space-x-2">
                <input type="radio" name="status" className="form-radio" />
                <span>Active</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  className="form-radio"
                  defaultChecked
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>
          <div className=" flex gap-8 mb-4 align-items-center ">
            <div>
              <label className="block text-gray-900 ">Background Color</label>
              <input
                type="color"
                className="w-[10vw] h-[10vh] border border-blue-300 rounded-md"
                value="#ebebeb"
              />
            </div>
            <div>
              <label className="block text-gray-700 ">Text Color</label>
              <input
                type="color"
                className="w-[10vw] h-[10vh] border border-blue-300 rounded-md"
                value="#000000"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Text</label>
            <input
              type="text"
              className="w-full h-10 border border-gray-300 rounded-md p-2 outline-none"
              value="Get 50% discount for specific products from June 2024 to December 2024."
            />
          </div>
          <div className=" text-right">
            <button
              className=" px-3   bg-primary-500 text-white py-2 rounded-md hover:bg-primary-dark-500"
              style={{ color: "white" }}
            >
              Publish
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default AnnouncementSetup;
