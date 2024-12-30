import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttributes,
  fetchColors,
} from "../../../../../../redux/slices/admin/categorybrandSlice";
import { FormSelect } from "react-bootstrap";
import FormSection from "../../../../../../components/FormInput/FormSection";
import { IoMdPerson } from "react-icons/io";

const ProductAttributes = ({
  selectedColors,
  setSelectedColors,
  productAttributes,
  setProductAttributes,
}) => {

  const dispatch = useDispatch();
  const [selectedAttribute, setSelectedAttribute] = useState("");
  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchAttributes());
  }, [dispatch]);

  const { colors, attributes } = useSelector((state) => state.category);
  const handleAttributeChange = (e) => {
    const selectedAttr = attributes.find((attr) => attr._id === e.target.value);
    setSelectedAttribute(selectedAttr); // Store the whole attribute object
  };

  const addAttribute = () => {
    if (
      selectedAttribute &&
      !productAttributes.some((attr) => attr._id === selectedAttribute._id)
    ) {
      setProductAttributes([...productAttributes, selectedAttribute]);
      setSelectedAttribute(""); // Clear selection after adding
    }
  };

  const removeAttribute = (attr) => {
    setProductAttributes(
      productAttributes.filter((item) => item._id !== attr._id)
    );
  };

  const handleColorChange = (e) => {
    const selectedColor = colors.find((color) => color._id === e.target.value);
    if (
      selectedColor &&
      !selectedColors.some((color) => color._id === selectedColor._id)
    ) {
      setSelectedColors([...selectedColors, selectedColor]);
    }
  };

  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter((item) => item._id !== color._id));
  };

  return (
    <FormSection title="Produt Variation Setup" icon={<IoMdPerson />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select Color */}
        <div className="flex flex-col ">
          <div className="flex items-center">
            <FormSelect
              label="Select Color"
              name="color"
              value={""}
              onChange={handleColorChange}
              options={colors.map((color) => ({
                value: color._id,
                label: color.name,
              }))}
              className="w-full px-4 py-2 rounded-md"
            />
          </div>

          {/* Selected Colors */}
          <div className="flex flex-wrap ">
            {selectedColors.map((color, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded flex items-center mr-2 mb-2"
              >
                {color.name}
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Select Attribute */}
        <div className="flex flex-col  ">
          <div className=" flex items-center">
            <FormSelect
              label="Select Attribute"
              name="attribute"
              value={selectedAttribute ? selectedAttribute._id : ""}
              onChange={handleAttributeChange}
              options={attributes.map((attr) => ({
                value: attr._id,
                label: attr.name,
              }))}
              className="w-full px-4 py-2 rounded-md"
            />
            <button
              type="button"
              onClick={addAttribute}
              className="mt-2 bg-primary text-white px-4 py-2 rounded ml-2"
              style={{ color: "white" }}
            >
              Add Attribute
            </button>
          </div>

          {/* Selected Attributes */}
          <div className="flex flex-wrap mb-4">
            {productAttributes.map((attr, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-1 rounded flex items-center mr-2 mb-2"
              >
                {attr.name}
                <button
                  type="button"
                  onClick={() => removeAttribute(attr)}
                  className="ml-2 text-red-500"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default ProductAttributes;
