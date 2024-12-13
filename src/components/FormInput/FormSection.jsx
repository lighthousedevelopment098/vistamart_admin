import React from "react";

const FormSection = ({ icon, title, children }) => (
  <div className="card mt-3">
    <div className="card-body">
      <h5 className="mb-0 text-[1rem] font-semibold text-capitalize d-flex align-items-center gap-2 border-bottom pb-3 mb-4 pl-4">
        {icon}
        {title}
      </h5>
      {children}
    </div>
  </div>
);

export default FormSection;
