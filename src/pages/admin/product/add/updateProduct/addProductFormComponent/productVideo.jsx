import React from "react";
import { IoMdPerson } from "react-icons/io";
import FormSection from "../../../../../../components/FormInput/FormSection";
import FormInput from "../../../../../../components/FormInput/FormInput";

const ProductVideo = ({ formData, handleChange }) => {
  return (
    <FormSection title={"Product video"} icon={<IoMdPerson />}>
      {/* video link  */}
      <div className="flex flex-col px-2 mb-5">
        <label className="">Video Link</label>
        <FormInput
          type="text"
          name="videoLink"
          value={formData.videoLink}
          onChange={handleChange}
          placeholder="Video Link"
        />
      </div>
    </FormSection>
  );
};

export default ProductVideo;