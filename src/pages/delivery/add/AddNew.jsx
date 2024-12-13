import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";

const AddNewDelivery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMultipleImage, setSelectedMultipleImage] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle single image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set the image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle multiple images selection
  const handleMultipleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    const imageURLs = files.map((file) => URL.createObjectURL(file)); // Convert each file to a URL
    setSelectedMultipleImage((prevImages) => [...prevImages, ...imageURLs]); // Append new images to existing ones
  };

  const handleMultipleDeleteImage = (indexToDelete) => {
    const updatedImages = selectedMultipleImage.filter(
      (image, index) => index !== indexToDelete
    );
    setSelectedMultipleImage(updatedImages); // Update the array after deletion
  };
  // Function to trigger file input click for multiple images
  const triggerFileInput = () => {
    document.getElementById("multipleImageInput").click();
  };
  const handleDeleteImage = () => {
    setSelectedImage(null); // Clear the selected image
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <>
      <div className="font-semibold bg-secondary-500 px-5 py-5 h-full w-full text-[1rem]">
        <div className="flex gap-3">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/add-new-delivery-man.png"
            alt=""
            className="w-7 h-7"
          />
          <h1 className="text-lg"> Add New Delivery Man</h1>
        </div>
        <div className=" w-full  bg-white rounded-lg mt-3 px-10 py-8">
          <h3 className="text-base font-bold text-gray-600 mb-2 border-b-2 border-b-gray-300 w-100 flex gap-3 align-items-center">
            <IoMdPerson />
            General Information
          </h3>
          <form>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full outline-none text-sm font-medium border px-3 py-2 hover:border-primary-500 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Identity Type
                  </label>
                  <select className="w-full border px-3 py-2 font-medium outline-none bg-white hover:border-primary-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50">
                    <option className="text-sm font-light">Passport</option>
                    <option className="text-sm font-light">National ID</option>
                    <option className="text-sm font-light">
                      Driver's License
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="text-sm font-medium w-full border px-3 py-2 border-primary-500 rounded-md hover:border-primary-500 outline-none shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Identity Number
                  </label>
                  <input
                    type="text"
                    placeholder="Ex:DH-23434-LS"
                    className="w-full text-sm font-medium border px-3 py-2 outline-none hover:border-primary-500 bg-white rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <div className="flex">
                    <select className="w-1/4 px-3 py-2 text-sm font-medium outline-none bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                      <option>UK (+44)</option>
                      <option>US (+1)</option>
                      <option>IN (+91)</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Ex:017********"
                      className="w-3/4 outline-none text-sm font-medium ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-3 py-2 text-sm font-medium outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Deliveryman Image{" "}
                    <span className="text-sm font-medium text-gray-500">
                      (Ratio 1:1)
                    </span>
                  </label>
                  <div className="relative grid grid-cols-1 w-full items-center justify-center sm:w-full sm:max-w-xs lg:max-w-sm">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="border text-sm font-medium px-3 py-2 hover:border-primary-500 bg-white rounded-md border-gray-300 shadow-sm cursor-pointer mb-4"
                    />
                    {selectedImage ? (
                      <div className="relative">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="h-[30vh] w-[50vw] lg:w-[15vw] lg:h-[30vh] object-cover rounded-md"
                        />
                        <span
                          className="delete_file_input btn btn-outline-danger btn-sm square-btn  items-center justify-center flex absolute top-2 right-0 p-2 mr-6 md:mr-48 "
                          onClick={handleDeleteImage} // Handle delete
                        >
                          <AiOutlineDelete />
                        </span>
                      </div>
                    ) : (
                      <img
                        src="https://6valley.6amtech.com/public/assets/back-end/img/400x400/img2.jpg"
                        alt="Placeholder"
                        className="h-[30vh] w-[50vw] lg:w-[15vw] lg:h-[30vh] object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Identity Image
                  </label>
                  <div className="flex flex-wrap gap-4 relative">
                    {/* Render selected images or placeholder image if no image is selected */}
                    {selectedMultipleImage.map((image, index) => (
                      <div
                        key={index}
                        className="relative border-dashed border-2 border-gray-300 h-full w-full sm:w-[60vw] sm:h-[30vh] md:w-[40vw] md:h-[32vh] lg:w-[16vw] lg:h-[36vh] rounded flex items-center justify-center"
                      >
                        <img
                          src={image}
                          alt={`Selected ${index + 1}`}
                          className="h-full w-full object-cover rounded-md"
                        />
                        {/* Delete Icon */}
                        <span
                          className=" delete_file_input btn btn-outline-danger btn-sm square-btn absolute top-2 right-2  p-2 text-red-500 cursor-pointer flex items-center"
                          onClick={() => handleMultipleDeleteImage(index)} // Delete specific image
                        >
                          <AiOutlineDelete className="w-5 h-5" />
                        </span>
                      </div>
                    ))}

                    {/* Show the first box when no image is selected */}
                    {selectedMultipleImage.length === 0 && (
                      <div
                        onClick={triggerFileInput}
                        className="border-dashed border-2 border-gray-300 h-full w-full sm:w-[60vw] sm:h-[30vh] md:w-[40vw] md:h-[32vh] lg:w-[16vw] lg:h-[36vh] rounded flex items-center justify-center cursor-pointer"
                      >
                        <img
                          src="https://6valley.6amtech.com/public/assets/back-end/img/400x400/img2.jpg"
                          alt="Placeholder"
                          className="h-[30vh] w-[33vh] object-cover rounded-md"
                        />
                      </div>
                    )}

                    {/* Always show an extra box to allow adding another image when an image is already selected */}
                    {selectedMultipleImage.length > 0 && (
                      <div
                        onClick={triggerFileInput}
                        className="border-dashed border-2 border-gray-300 h-full w-full sm:w-[60vw] sm:h-[30vh] md:w-[40vw] md:h-[32vh] lg:w-[16vw] lg:h-[36vh] rounded flex items-center justify-center cursor-pointer"
                      >
                        <img
                          src="https://6valley.6amtech.com/public/assets/back-end/img/400x400/img2.jpg"
                          alt="Add more"
                          className="h-[30vh] w-[33vh] object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Hidden file input for selecting images */}
                  <input
                    type="file"
                    id="multipleImageInput"
                    onChange={handleMultipleImageChange}
                    multiple
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className=" w-full z-50 bg-white rounded-lg md:mt-3 px-10 py-8">
          <h3 className="text-base font-bold text-gray-600 mb-2 border-b-2 border-b-gray-300 w-100 flex gap-3 align-items-center">
            <IoMdPerson />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Ex:ex@example.com"
                className="mt-1 block font-medium outline-none text-sm w-full border px-3 py-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="block font-medium outline-none text-sm w-full border px-3 py-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    // Show "hide" icon when password is visible
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-gray-500"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  ) : (
                    // Show "eye" icon when password is hidden
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-gray-500"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="block font-medium outline-none text-sm w-full border px-3 py-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    // Show "hide" icon when confirm password is visible
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-gray-500"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  ) : (
                    // Show "eye" icon when confirm password is hidden
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-gray-500"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end mt-6 items-center gap-2  ">
            <button className="px-4 py-2 bg-gray-200 rounded font-medium ">
              Reset
            </button>
            <button
              className="bg-primary-500 hover:bg-primary-dark-500 font-medium py-2 px-4 rounded"
              style={{ color: "white" }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewDelivery;
