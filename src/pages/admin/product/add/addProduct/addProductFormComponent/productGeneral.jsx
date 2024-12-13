import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose, AiOutlineSync } from "react-icons/ai";
import {
  fetchAttributes,
  fetchBrands,
  fetchCategories,
  fetchColors,
} from "../../../../../../redux/slices/admin/categorybrandSlice";
import { IoIosInformationCircleOutline, IoMdPerson } from "react-icons/io";
import FormSection from "../../../../../../components/FormInput/FormSection";
import FormSelect from "../../../../../../components/FormInput/FormSelect";

// Function to generate a 6-digit random SKU
const generateSKU = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const ProductGeneral = ({ formData, handleChange, setFormData }) => {
  const dispatch = useDispatch();
  const { categories, subCategories, subSubCategories, brands } = useSelector(
    (state) => state.category
  );

  const [tags, setTags] = useState(
    (formData.tags || []).filter((tag) => tag.trim() !== "")
  );

  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState([]);

  // Fetch categories, brands, colors, and attributes on mount
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    dispatch(fetchColors());
    dispatch(fetchAttributes());
  }, [dispatch]);

  // Fetch subcategories based on selected category
  useEffect(() => {
    if (formData.category) {
      // console.log("SubCategories before filter:", subCategories);
      const relevantSubCategories = subCategories.filter(
        (sub) => sub.mainCategory._id === formData.category
      );
      // console.log("Filtered SubCategories:", relevantSubCategories);
      setFilteredSubCategories(relevantSubCategories);
      setFilteredSubSubCategories([]); // Reset sub-sub-categories
    }
  }, [formData.category, subCategories]);

  useEffect(() => {
    if (formData.subCategory) {
      const relevantSubSubCategories =
        subSubCategories.doc?.filter(
          (subSub) => subSub?.subCategory?._id === formData.subCategory
        ) || [];
      setFilteredSubSubCategories(relevantSubSubCategories);
    }
  }, [formData.subCategory, subSubCategories]);

  // SKU generation
  const handleGenerateSKU = () => {
    const newSKU = generateSKU();
    setFormData((prevData) => ({
      ...prevData,
      sku: newSKU,
    }));
  };

  // Adding a tag
  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setFormData((prevData) => ({
          ...prevData,
          tags: updatedTags, // Store tags as an array in formData
        }));
      }
      e.target.value = ""; // Clear input after adding tag
    }
  };

  // Removing a tag
  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    setFormData((prevData) => ({
      ...prevData,
      tags: updatedTags, // Update tags array in formData
    }));
  };

  return (
    <>
      {/* General Product Information Section */}
      <FormSection title="General Information" icon={<IoMdPerson />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div className="flex flex-col px-2">
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={
                categories.length > 0
                  ? categories.map((category) => ({
                      value: category._id,
                      label: category.name,
                    }))
                  : [{ value: "", label: "Not Category Found" }]
              }
              required
            />
          </div>

          {/* <div className="flex flex-col px-2">
  <FormSelect
    label="Sub-Category"
    name="subCategory"
    value={formData.subCategory} // Corrected the key to match its singular form
    onChange={(e) =>
      setFormData({ ...formData, subCategory: e.target.value })
    }
    options={
      filteredSubCategories.length > 0
        ? filteredSubCategories.map((subCategory) => ({
            value: subCategory._id, // Ensure you're setting the correct _id here
            label: subCategory.name,
          }))
        : []
    }
  
    disabled={filteredSubCategories.length === 0} // Disable if no options are available
  />
</div> */}

          <div className="flex flex-col px-2">
            <FormSelect
              label="Sub-Category"
              name="subCategory"
              value={formData.subCategory || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subCategory: e.target.value === "" ? null : e.target.value,
                })
              }
              options={[
                ...(filteredSubCategories.length > 0
                  ? filteredSubCategories.map((subCategory) => ({
                      value: subCategory._id,
                      label: subCategory.name,
                    }))
                  : []),
              ]}
            />
          </div>

          {/* Sub-Sub-Category */}
          {/* <div className="flex flex-col px-2">
            <FormSelect
              label="Sub-Sub-Category"
              name="subSubCategory"
              value={formData.subSubCategory}
              onChange={handleChange}
              options={
                filteredSubSubCategories.length > 0
                  ? filteredSubSubCategories.map((subSubCategory) => ({
                      value: subSubCategory._id, // Ensure correct field here
                      label: subSubCategory.name,
                    }))
                  : [{ value: "", label: "Not Sub-Sub-Category Found" }]
              }
            />
          </div> */}

          <div className="flex flex-col px-2">
            <FormSelect
              label="Sub-Sub-Category"
              name="subSubCategory"
              value={formData.subSubCategory}
              onChange={handleChange}
              options={
                filteredSubSubCategories.length > 0
                  ? filteredSubSubCategories.map((subSubCategory) => ({
                      value: subSubCategory._id, // Ensure correct field here
                      label: subSubCategory.name,
                    }))
                  : [] // Leave empty array if no options are available
              }
            />
          </div>

          {/* Brand */}
          <div className="flex flex-col px-2">
            <FormSelect
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              options={
                brands.length > 0
                  ? brands.map((brand) => ({
                      value: brand._id,
                      label: brand.name,
                    }))
                  : [{ value: "", label: "Not Brand Found" }]
              }
              required
            />
          </div>
          {/* Product Type */}
          <div className="flex flex-col px-2">
            <FormSelect
              label="Product Type"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              options={[
                { value: "physical", label: "Physical" },
                { value: "digital", label: "Digital" },
              ]}
              required
            />
          </div>
          {/* Conditionally Render Digital Product Type */}
          {formData.productType === "digital" && (
            <div className="flex flex-col px-2">
              <FormSelect
                label="Digital Product Type"
                name="digitalProductType"
                value={formData.digitalProductType}
                onChange={handleChange}
                options={[
                  { value: "readyAfterSell", label: "Ready After Sell" },
                  { value: "readyProduct", label: "Ready Product" },
                ]}
              />
            </div>
          )}
          {/* SKU */}
          <div className="flex flex-col px-2">
            <div className="flex justify-between items-center">
              <label className="">Product SKU</label>
              <button
                className="text-primary-500   flex g items-center hover:text-primary-dark-500"
                onClick={handleGenerateSKU}
              >
                <IoIosInformationCircleOutline className="text-[1rem] text-primary-500 hover:text-primary-dark-500" />
                Generate Code
              </button>
            </div>

            <div className="form-group flex items-center">
              <input
                type="text"
                className="form-control form-control-user flex-1 outline-none hover:border-primary-500"
                name="sku"
                placeholder="Code"
                value={formData.sku}
                readOnly // Keep SKU input read-only to prevent manual editing
              />
              <AiOutlineSync
                onClick={handleGenerateSKU}
                className="cursor-pointer text-primary-500 hover:text-primary-dark-500 ml-2"
                title="Generate SKU"
                size={24} // Set size for the icon
              />
            </div>
          </div>
          {/* Unit */}
          <div className="flex flex-col px-2">
            <FormSelect
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              options={[
                { value: "piece", label: "Piece" },
                { value: "kg", label: "Kilogram" },
                { value: "liter", label: "Liter" },
                { value: "box", label: "Box" },
                { value: "packet", label: "Packet" },
                { value: "dozen", label: "Dozen" },
                { value: "mL", label: "Milliliter" },
                { value: "g", label: "Gram" },
                { value: "ton", label: "Ton" },
                { value: "bottle", label: "Bottle" },
                { value: "set", label: "Set" },
              ]}
              required
            />
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex flex-col mt-4">
          <label className="font-semibold"> Search Tags</label>
          <div className="flex flex-wrap border border-gray-300 p-2 rounded">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 m-1 rounded inline-flex items-center"
              >
                {tag}
                <AiOutlineClose
                  onClick={() => removeTag(index)}
                  className="cursor-pointer border border-primary-500 font-semibold  ml-1 rounded-full text-red-500"
                />
              </span>
            ))}
            <input
              type="text"
              className="flex-1 border-none outline-none focus:ring-0 p-1 hover:border-primary-500"
              placeholder="Press Enter to add tag"
              onKeyPress={handleTagInput}
            />
          </div>
        </div>
      </FormSection>
    </>
  );
};

export default ProductGeneral;
