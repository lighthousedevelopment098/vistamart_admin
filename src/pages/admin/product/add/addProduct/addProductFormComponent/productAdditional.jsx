import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdPerson } from "react-icons/io";
import FormInput from "../../../../../../components/FormInput/FormInput";
import FormSection from "../../../../../../components/FormInput/FormSection";
import FormSelect from "../../../../../../components/FormInput/FormSelect";

const ProductAdditional = ({ formData = {}, handleChange }) => {
  useEffect(() => {
    // Ensure discount values don't exceed limits
    if (formData.discountType === "percent" && formData.discount > 100) {
      handleChange({
        target: {
          name: "discount",
          value: 100, // Cap at 100%
        },
      });
    } else if (formData.discountType === "flat" && formData.discountAmount > formData.price) {
      handleChange({
        target: {
          name: "discountAmount",
          value: formData.price, // Cap at the price
        },
      });
    }
  }, [formData.discountType, formData.discountAmount, formData.discount, formData.price, handleChange]);

  useEffect(() => {
    if (formData.discountType === "percent" && formData.discount > 100) {
      toast.error("Discount amount cannot exceed 100%.");
    } else if (formData.discountType === "flat" && formData.discountAmount > formData.price) {
      toast.error("Discount amount cannot exceed the price.");
    }
  }, [formData.discountAmount, formData.discount, formData.discountType, formData.price]);

  const handleDiscountFocus = (e) => {
    // Reset the relevant discount field when focused
    if (e.target.name === "discount" && formData.discount === 0) {
      handleChange({
        target: {
          name: "discount",
          value: "", // Clear the input field
        },
      });
    } else if (e.target.name === "discountAmount" && formData.discountAmount === 0) {
      handleChange({
        target: {
          name: "discountAmount",
          value: "", // Clear the input field
        },
      });
    }
  };

  const handleDiscountTypeChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      target: {
        name,
        value,
      },
    });

    // Reset the discount values when switching types
    if (value === "percent") {
      handleChange({ target: { name: "discountAmount", value: 0 } });
    } else if (value === "flat") {
      handleChange({ target: { name: "discount", value: 0 } });
    }
  };

  const calculateShippingCost = (price) => {
    if (price <= 3000) return 0;
    if (price <= 5000) return 100;
    if (price <= 10000) return 200;
    if (price <= 30000) return 300;
    if (price > 30000) return Math.ceil(price * 0.01); // 1% of the price
    return 0;
  };

  useEffect(() => {
    if (formData.price) {
      const shippingCost = calculateShippingCost(formData.price);
      handleChange({
        target: {
          name: "shippingCost",
          value: shippingCost,
        },
      });
    }
  }, [formData.price, handleChange]);

  return (
    <FormSection title="Pricing & Others" icon={<IoMdPerson />}>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price */}
        <div className="flex flex-col">
          <label>Unit Price</label>
          <FormInput
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>
       
        {/* Shipping cost */}
        <div className="flex flex-col px-2">
          <label>Shipping TAX (Rs.)</label>
          <FormInput
            type="text"
            name="shippingCost"
            value={formData.shippingCost}
            onChange={handleChange}
            placeholder="Shipping Cost"
          />
        </div>

        {/* Weight */}
        <div className="flex flex-col">
          <label>Weight (In Kilograms)</label>
          <FormInput
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight (Kilograms)"
            required
          />
          {formData.weight && (
            <span className="text-gray-500 text-sm">
              {`Weight in Grams: ${(formData.weight * 1000).toFixed(2)} g`}
            </span>
          )}
        </div>

        {/* Minimum Order Quantity */}
        <div className="flex flex-col px-2">
          <label>Minimum Order Qty</label>
          <FormInput
            type="number"
            name="minimumOrderQty"
            value={formData.minimumOrderQty}
            onChange={handleChange}
            placeholder="Minimum Order Quantity"
            required
          />
        </div>

       
        {/* Discount Type */}
        <div className="flex flex-col px-2">
          <FormSelect
            label="Discount Type"
            name="discountType"
            value={formData.discountType}
            onChange={handleDiscountTypeChange}
            options={[
              { value: "percent", label: "Percentage" },
              { value: "flat", label: "Flat Amount" },
            ]}
          />
        </div>

        {/* Discount Fields */}
        {formData.discountType === "percent" ? (
          <div className="flex flex-col px-2">
            <label>Discount Amount ( % )</label>
            <FormInput
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              onFocus={handleDiscountFocus}
              placeholder="Discount Percentage"
              required
            />
          </div>
        ) : formData.discountType === "flat" ? (
          <div className="flex flex-col px-2">
            <label>Discount Amount ( Rs )</label>
            <FormInput
              type="number"
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
              onFocus={handleDiscountFocus}
              placeholder="Discount Amount (Rs)"
              required
            />
          </div>
        ) : (
          <div className="flex flex-col px-2">
            <label>Discount</label>
            <span className="text-gray-500">No Discount</span>
          </div>
        )}

        {/* Tax Amount */}
   <div className="flex flex-col px-2">
          <label>Tax Amount ( % )</label>
          <FormInput
            type="number"
            name="taxAmount"
            value={formData.taxAmount}
            onChange={handleChange}
            placeholder="Tax Amount"
          />
        </div>

        {/* Tax Included Checkbox */}
        <div className="flex flex-col px-2 mt-3">
          <label>Tax Included</label>
          <div className="flex gap-3 items-center">
            <input
              type="checkbox"
              name="taxIncluded"
              checked={formData.taxIncluded}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="font-medium">Include tax in price</span>
          </div>
        </div>

         {/* Stock */}
         <div className="flex flex-col px-2">
          <FormInput
            label="Current Stock Qty"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
   
      </div>
    </FormSection>
  );
};

export default ProductAdditional;
