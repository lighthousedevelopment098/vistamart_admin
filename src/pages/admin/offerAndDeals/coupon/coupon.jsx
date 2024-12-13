// import React, { useState } from "react";
// import CouponForm from "./couponForm";
// import CouponList from "./CouponList";

// const CouponManagement = () => {
//   const [couponAdded, setCouponAdded] = useState(false);

//   const handleCouponAdded = () => {
//     setCouponAdded((prev) => !prev); // Toggle to trigger list refresh
//   };
//   return (
//     <div className="p-10">
//     <div className="mb-3">
//       <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
//         <img
//           src="/coupon_setup.png"
//           alt=""
//         />
//         Coupon setup
//       </h2>
//     </div>

//       {/* <CouponForm />
     
//       <CouponList />
//       */}
    
      
//       <CouponForm onCouponAdded={handleCouponAdded} />
//       <CouponList couponAdded={couponAdded} />
//     </div>
//   );

// };

// export default CouponManagement;



import React, { useState } from "react";
import CouponForm from "./couponForm";
import CouponList from "./CouponList";

const CouponManagement = () => {
  const [couponAdded, setCouponAdded] = useState(false);

  const handleCouponAdded = () => {
    setCouponAdded((prev) => !prev); // Toggle to trigger list refresh
  };

  return (
    <div className="p-10">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img src="/coupon_setup.png" alt="" />
          Coupon setup
        </h2>
      </div>
      <CouponForm onCouponAdded={handleCouponAdded} />
      <CouponList couponAdded={couponAdded} />
    </div>
  );
};

export default CouponManagement;
