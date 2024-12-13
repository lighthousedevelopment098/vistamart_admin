import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { toast } from "react-toastify";
import FormSelect from "../../../../components/FormInput/FormSelect";
import FormInput from "../../../../components/FormInput/FormInput";
import {
  createCoupon,
  fetchCoupons,
} from "../../../../redux/slices/admin/couponSlice";
import { fetchVendors } from "../../../../redux/slices/seller/vendorSlice";
import { fetchCustomers } from "../../../../redux/slices/user/customerSlice";
import { getAuthData } from "../../../../utils/authHelper";

const CouponForm = ({ onCouponAdded }) => {
  const dispatch = useDispatch();
  const vendors = useSelector((state) => state.vendor?.vendors || []);
  const customers = useSelector((state) => state.customers?.customers || []);
  const { user } = getAuthData();
  const userRoleName = user?.role?.name || "unknown";

  const [form, setForm] = useState({
    title: "",
    code: "",
    type: "others",
    userLimit: { limit: "", used: 0 },
    couponBearer: "vendor",
    discountType: "percentage",
    discountAmount: "",
    minPurchase: "",
    maxDiscount: "",
    startDate: "",
    expiredDate: "",
    status: "active",
    vendors: [],
    customers: [],
    createdBy: userRoleName, // Ensure createdBy is set
  });

  useEffect(() => {
    dispatch(fetchVendors());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      if (name === "userLimit") {
        return {
          ...prevForm,
          userLimit: { ...prevForm.userLimit, limit: value },
        };
      }
      return { ...prevForm, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form data before dispatch:", form);
      const response = await dispatch(createCoupon(form)).unwrap();
      console.log("Response after submission:", response);

      Swal.fire("Success", "Coupon Created Successfully", "success");
      dispatch(fetchCoupons());

      setForm({
        title: "",
        code: "",
        type: "",
        userLimit: { limit: "", used: 0 },
        couponBearer: "vendor",
        discountType: "percentage",
        discountAmount: "",
        minPurchase: "",
        maxDiscount: "",
        startDate: "",
        expiredDate: "",
        status: "active",
        vendors: [],
        customers: [],
        createdBy: userRoleName, // Re-initialize createdBy to prevent loss on reset
      });
      onCouponAdded();
    } catch (error) {
      console.error(
        "Error creating coupon:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to create coupon. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-4">
      <div className="row ">
        <div className="col-md-4">
          <FormSelect
            label="Coupon Type"
            name="type"
            value={form.type}
            onChange={handleInputChange}
            options={[
              { value: "discount-on-purchase", label: "Discount on Purchase" },
              { value: "free-delivery", label: "Free Delivery" },
              { value: "buy-one-get-one", label: "Buy One Get One" },
              { value: "others", label: "Others" },
            ]}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Coupon Title"
            name="title"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Coupon Code"
            name="code"
            type="text"
            placeholder="Coupon Code"
            value={form.code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="User Limit"
            name="userLimit"
            type="number"
            placeholder="Limit"
            value={form.userLimit.limit}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormSelect
            label="Discount Bearer"
            name="couponBearer"
            value={form.couponBearer}
            onChange={handleInputChange}
            options={[
              { value: "vendor", label: "Vendor" },
              { value: "admin", label: "Admin" },
            ]}
            required
          />
        </div>

        <div className="col-md-4">
          <FormSelect
            label="Discount Type"
            name="discountType"
            value={form.discountType}
            onChange={handleInputChange}
            options={[
              { value: "percentage", label: "Percentage" },
              { value: "amount", label: "Amount" },
            ]}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Discount Amount"
            name="discountAmount"
            type="number"
            placeholder={
              form.discountType === "percentage"
                ? "Enter discount percentage"
                : "Enter discount amount"
            }
            value={form.discountAmount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Minimum Purchase"
            name="minPurchase"
            type="number"
            placeholder="Min Purchase"
            value={form.minPurchase}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Maximum Discount"
            name="maxDiscount"
            type="number"
            placeholder="Max Discount"
            value={form.maxDiscount}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormInput
            label="Expiration Date"
            name="expiredDate"
            type="date"
            value={form.expiredDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-md-4">
          <FormSelect
            label="Select Vendors"
            name="vendors"
            value={form.vendors}
            onChange={(e) =>
              setForm({
                ...form,
                vendors: [...e.target.selectedOptions].map(
                  (option) => option.value
                ),
              })
            }
            options={vendors.map((vendor) => ({
              value: vendor._id,
              label: vendor.shopName,
            }))}
            isMulti
          />
        </div>

        <div className="col-md-4">
          <FormSelect
            label="Select Customers"
            name="customers"
            value={form.customers}
            onChange={(e) =>
              setForm({
                ...form,
                customers: [...e.target.selectedOptions].map(
                  (option) => option.value
                ),
              })
            }
            options={customers.map((customer) => ({
              value: customer._id,
              label: `${customer.firstName} ${customer.lastName}`,
            }))}
            isMulti
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="btn bg-primary-500 hover:bg-primary-dark-500 text-white"
          style={{ color: "white" }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CouponForm;
