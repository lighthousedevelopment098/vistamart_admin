import React from "react";
import FormSection from "../../../../../../components/FormInput/FormSection";
import { IoMdPerson } from "react-icons/io";
import FormInput from "../../../../../../components/FormInput/FormInput";

const SeoSection = ({ formData, handleChange }) => {
  return (
    <FormSection title={"SEO Section"} icon={<IoMdPerson />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Meta Title */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Meta Title
          </label>
          <FormInput
            type="text"
            name="metaTitle"
            value={formData?.metaTitle}
            onChange={handleChange}
          />
        </div>

        {/* Meta Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formData?.metaDescription}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-700 shadow-sm sm:text-sm p-4 outline-none"
          ></textarea>
        </div>
      </div>
    </FormSection>
  );
};

export default SeoSection;



// import React from "react";
// import FormSection from "../../../../../../components/FormInput/FormSection";
// import { IoMdPerson } from "react-icons/io";
// import FileUpload from "./imageFileUpload";
// import FormInput from "../../../../../../components/FormInput/FormInput";

// const SeoSection = () => {
//   return (
//     <FormSection title={"SEO Section"} icon={<IoMdPerson />}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Meta Title */}
//         <div className="col-span-1">
//           <label className="block text-sm font-medium text-gray-700">
//             Meta Title
//           </label>
//           <FormInput
//             type="text"
//           />
//         </div>

//         {/* Meta Description */}
//         <div className="col-span-2">
//           <label className="block text-sm font-medium text-gray-700">
//             Meta Description
//           </label>
//           <textarea
//             name="description"
//             id=""
//             rows="4"
//             className="mt-1 block w-full rounded-md border border-gray-700 shadow-sm sm:text-sm p-4 outline-none"
//           ></textarea>
//         </div>

    
//       </div>
//     </FormSection>
//   );
// };

// export default SeoSection;
