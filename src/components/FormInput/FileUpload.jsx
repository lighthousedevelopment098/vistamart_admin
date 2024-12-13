// import React from "react";

// const FileUpload = ({ name, label, accept, onChange }) => (
//   <div className="form-group">
//     <div className="title-color mb-2 d-flex gap-1 align-items-center">
//       {label}
//     </div>
//     <div className="custom-file text-left">
//       <input
//         type="file"
//         name={name}
//         id={`${name}Input`}
//         className="custom-file-input image-input"
//         accept={accept}
//         onChange={onChange}
//       />
//       <label className="custom-file-label" htmlFor={`${name}Input`}>
//         Upload {label}
//       </label>
//     </div>
//   </div>
// );

// export default FileUpload;




import React from "react";

const FileUpload = ({ name, label, accept, onChange }) => (
  <div className="form-group">
    <div className="title-color mb-2 d-flex gap-1 align-items-center">
      {label}
    </div>
    <div className="custom-file text-left">
      <input
        type="file"
        name={name}
        id={`${name}Input`}
        className="custom-file-input image-input"
        accept={accept}
        onChange={onChange}
      />
      <label className="custom-file-label" htmlFor={`${name}Input`}>
        Upload {label.toLowerCase()}
      </label>
    </div>
  </div>
);

export default FileUpload;
