import React from "react";

const FirebaseConfig = () => {
  return (
    <>
      <div>
        {" "}
        <label htmlFor="" className="text-xl  px-4 pt-5">
          Service Account Content
        </label>{" "}
        <br />
        <textarea
          name=""
          rows={14}
          cols={110}
          id=""
          placeholder="Ex.123ABCdsdsfsferfe"
          className="border border-gray-300 hover:border-blue-300 mx-5 px-3 py-2"
        ></textarea>
        <div className="flex justify-end items-end gap-3 py-6 px-4">
          <button className="bg-[#EDEDED] rounded-md px-4 py-1 border border-gray-300">
            Rest{" "}
          </button>
          <button className="rounded-md px-4 bg-blue-500 text-white py-1 border border-gray-300">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default FirebaseConfig;
