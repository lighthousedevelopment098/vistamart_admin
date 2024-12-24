// import React, { useCallback, useState } from "react";

// const CategoryForm = ({
//   selectedLang,
//   newCategory,
//   onInputChange,
//   onFileChange,
//   onSubmit,
//   setSelectedFile,
// }) => {
//   const [preview, setPreview] = useState(null);

//   const handleFileChange = useCallback(
//     (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         setSelectedFile(file);
//         const objectUrl = URL.createObjectURL(file);
//         setPreview(objectUrl);
//       } else {
//         setPreview(null);
//         onFileChange(""); // Reset if no file is selected
//       }
//     },
//     [onFileChange]
//   );

//   return (
//     <div className="card p-6">
//       <form onSubmit={onSubmit}>
//         <div className="row">
//           <div className="col-lg-6">
//             {["en", "sa", "bd", "in"].map((lang) => (
//               <div
//                 className={`form-group ${
//                   selectedLang === lang ? "" : "d-none"
//                 } form-system-language-form`}
//                 key={lang}
//                 id={`${lang}-form`}
//               >
//                 <label className="title-color">
//                   Category Name<span className="text-danger">*</span> (
//                   {lang.toUpperCase()})
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control outline-none hover:border-primary-500"
//                   placeholder="New Category"
//                   required={lang === "en"} // Required only for English
//                   value={newCategory.name}
//                   onChange={onInputChange}
//                 />
//               </div>
//             ))}
//             <div className="form-group">
//               <label className="title-color" htmlFor="priority">
//                 Priority
//               </label>
//               <select
//                 className="form-control outline-none hover:border-primary-500"
//                 name="priority"
//                 required
//                 value={newCategory.priority}
//                 onChange={onInputChange}
//               >
//                 <option disabled>Set Priority</option>
//                 {[...Array(11).keys()].map((num) => (
//                   <option value={num} key={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label className="title-color">Category Logo</label>
//               <span className="text-info">
//                 <span className="text-danger">*</span> Ratio 1:1 (500 x 500 px)
//               </span>
//               <div className="custom-file text-left">
//                 <input
//                   type="file"
//                   name="logo"
//                   id="category-image"
//                   className="custom-file-input"
//                   accept="image/*"
//                   required
//                   onChange={handleFileChange}
//                 />
//                 <label className="custom-file-label" htmlFor="category-image">
//                   Choose File
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
//             <div className="form-group flex justify-center items-center">
//               <div className="text-center flex justify-center items-center ">
//                 <img
//                   className="upload-img-view"
//                   id="viewer"
//                   alt=""
//                   src={
//                     preview ||
//                     "https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="d-flex flex-wrap gap-2 justify-content-end w-full p-3">
//             <button
//               type="reset"
//               id="reset"
//               className="btn bg-secondary-500 text-white border border-secondary-500 rounded-md"
//               onClick={() => setPreview(null)} // Clear preview on reset
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="btn bg-primary-500 hover:bg-primary-dark-500 text-white"
//               style={{ color: "white" }}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default React.memo(CategoryForm);



import React, { useCallback, useState } from "react";

const CategoryForm = ({
  selectedLang,
  newCategory,
  onInputChange,
  onFileChange,
  onSubmit,
  setSelectedFile,
}) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } else {
        setPreview(null);
        onFileChange(""); // Reset if no file is selected
      }
    },
    [onFileChange]
  );

  // List of Track Categories
  const trackCategories = [
    { id: 1, description: "Apparel" },
    { id: 2, description: "Automotive Parts" },
    { id: 3, description: "Accessories" },
    { id: 4, description: "Personal Electronics (Mobile Phones, Laptops, etc.)" },
    { id: 5, description: "Electronics Accessories (Cases, Chargers, etc.)" },
    { id: 6, description: "Gadgets" },
    { id: 7, description: "Jewellery" },
    { id: 8, description: "Cosmetics" },
    { id: 9, description: "Stationery" },
    { id: 10, description: "Handicrafts" },
    { id: 11, description: "Home-made Items" },
    { id: 12, description: "Footwear" },
    { id: 13, description: "Watches" },
    { id: 14, description: "Leather Items" },
    { id: 15, description: "Organic and Health Products" },
    { id: 16, description: "Appliances and Consumer Electronics" },
    { id: 17, description: "Home Decor and Interior Items" },
    { id: 18, description: "Toys" },
    { id: 19, description: "Pet Supplies" },
    { id: 20, description: "Athletics and Fitness Items" },
    { id: 21, description: "Vouchers and Coupons" },
    { id: 22, description: "Marketplace" },
    { id: 23, description: "Documents and Letters" },
    { id: 24, description: "Other" },
  ];

  return (
    <div className="card p-6">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-lg-6">
            {["en", "sa", "bd", "in"].map((lang) => (
              <div
                className={`form-group ${
                  selectedLang === lang ? "" : "d-none"
                } form-system-language-form`}
                key={lang}
                id={`${lang}-form`}
              >
                <label className="title-color">
                  Category Name<span className="text-danger">*</span> (
                  {lang.toUpperCase()})
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control outline-none hover:border-primary-500"
                  placeholder="New Category"
                  required={lang === "en"} // Required only for English
                  value={newCategory.name}
                  onChange={onInputChange}
                />
              </div>
            
            ))}

<div className="form-group">
              <label className="title-color">Select  Category</label>
              <select
                className="form-control outline-none hover:border-primary-500"
                name="traxCategoryId"
                value={newCategory.traxCategoryId}
                onChange={onInputChange}
                required
              >
                <option value="" disabled>
                  Select a  Category
                </option>
                {trackCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="title-color" htmlFor="priority">
                Priority
              </label>
              <select
                className="form-control outline-none hover:border-primary-500"
                name="priority"
                required
                value={newCategory.priority}
                onChange={onInputChange}
              >
                <option disabled>Set Priority</option>
                {[...Array(11).keys()].map((num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
           
            <div className="form-group">
              <label className="title-color">Category Logo</label>
              <span className="text-info">
                <span className="text-danger">*</span> Ratio 1:1 (500 x 500 px)
              </span>
              <div className="custom-file text-left">
                <input
                  type="file"
                  name="logo"
                  id="category-image"
                  className="custom-file-input"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                />
                <label className="custom-file-label" htmlFor="category-image">
                  Choose File
                </label>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
            <div className="form-group flex justify-center items-center">
              <div className="text-center flex justify-center items-center ">
                <img
                  className="upload-img-view"
                  id="viewer"
                  alt="Category Preview"
                  src={
                    preview ||
                    "https://6valley.6amtech.com/public/assets/back-end/img/image-place-holder.png"
                  }
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap gap-2 justify-content-end w-full p-3">
            <button
              type="reset"
              id="reset"
              className="btn bg-secondary-500 text-white border border-secondary-500 rounded-md"
              onClick={() => setPreview(null)} // Clear preview on reset
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn bg-primary-500 hover:bg-primary-dark-500 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CategoryForm);
