// import React from "react";
// const FilterForm = ({
//   filters,
//   onInputChange,
//   onReset,
//   categories = [],
//   brands = [],
// }) => {
//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="row gx-2">
//             <div className="col-12">
//               <h4 className="mb-3">Filter Products</h4>
//             </div>
//             <div className="col-sm-6 col-lg-3 col-xl-3">
//               <div className="form-group">
//                 <label className="title-color" htmlFor="brand">
//                   Brand
//                 </label>
//                 <select
//                   name="brand"
//                   className="form-control"
//                   onChange={onInputChange}
//                   value={filters.brand}
//                 >
//                   <option value="">All Brands</option>
//                   {brands.map((brand) => (
//                     <option key={brand._id} value={brand._id}>
//                       {brand.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className="col-sm-6 col-lg-3 col-xl-3">
//               <div className="form-group">
//                 <label className="title-color" htmlFor="category">
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   className="form-control"
//                   onChange={onInputChange}
//                   value={filters.category}
//                 >
//                   <option value="">Select category</option>
//                   {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {/* User Type Filter */}
//             <div className="col-sm-6 col-lg-3 col-xl-3">
//               <div className="form-group">
//                 <label className="title-color" htmlFor="userType">
//                   User Type
//                 </label>
//                 <select
//                   name="userType"
//                   className="form-control"
//                   onChange={onInputChange}
//                   value={filters.userType}
//                 >
//                   <option value="">All Users</option>
//                   <option value="vendor">Vendor</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//             </div>

//             {/* 
//                      <div className="col-sm-6 col-lg-3 col-xl-3">
//               <div className="form-group">
//                 <label className="title-color" htmlFor="minPrice">Min Price</label>
//                 <input
//                   type="number"
//                   name="minPrice"
//                   className="form-control"
//                   onChange={onInputChange}
//                   value={filters.minPrice}
//                 />
//               </div>
//             </div>

        
//             <div className="col-sm-6 col-lg-3 col-xl-3">
//               <div className="form-group">
//                 <label className="title-color" htmlFor="maxPrice">Max Price</label>
//                 <input
//                   type="number"
//                   name="maxPrice"
//                   className="form-control"
//                   onChange={onInputChange}
//                   value={filters.maxPrice}
//                 />
//               </div>
//             </div> */}

//             <div className="col-12">
//               <div className="d-flex gap-3 justify-content-end">
//                 <button
//                   type="button"
//                   className="btn  px-5 bg-secondary border border-gray-300 text-white"
//                   onClick={onReset}
//                 >
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default React.memo(FilterForm);





import React from 'react';
const FilterForm = ({ filters, onInputChange, onReset, categories = [], brands = [] }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row gx-2">
            <div className="col-12">
              <h4 className="mb-3">Filter Products</h4>
            </div>
            <div className="col-sm-6 col-lg-3 col-xl-3">
              <div className="form-group">
                <label className="title-color" htmlFor="brand">Brand</label>
                <select
                  name="brand"
                  className="form-control outline-none hover:border-primary"
                  onChange={onInputChange}
                  value={filters.brand}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-xl-3">
              <div className="form-group">
                <label className="title-color" htmlFor="category">Category</label>
                <select
                  name="category"
                  className="form-control outline-none hover:border-primary"
                  onChange={onInputChange}
                  value={filters.category}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
                 {/* User Type Filter */}
                 <div className="col-sm-6 col-lg-3 col-xl-3">
              <div className="form-group">
                <label className="title-color" htmlFor="userType">User Type</label>
                <select
                  name="userType"
                  className="form-control outline-none hover:border-primary"
                  onChange={onInputChange}
                  value={filters.userType}
                >
                  <option value="">All Users</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

{/* 
                     <div className="col-sm-6 col-lg-3 col-xl-3">
              <div className="form-group">
                <label className="title-color" htmlFor="minPrice">Min Price</label>
                <input
                  type="number"
                  name="minPrice"
                  className="form-control"
                  onChange={onInputChange}
                  value={filters.minPrice}
                />
              </div>
            </div>

        
            <div className="col-sm-6 col-lg-3 col-xl-3">
              <div className="form-group">
                <label className="title-color" htmlFor="maxPrice">Max Price</label>
                <input
                  type="number"
                  name="maxPrice"
                  className="form-control"
                  onChange={onInputChange}
                  value={filters.maxPrice}
                />
              </div>
            </div> */}

            <div className="col-12">
              <div className="d-flex gap-3 justify-content-end">
                <button type="button" className="btn  px-5 bg-red-400 text-white" onClick={onReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(FilterForm);
