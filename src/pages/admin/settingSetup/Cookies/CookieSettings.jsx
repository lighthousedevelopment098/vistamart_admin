import React, { useState } from "react";

const CookieSettings = () => {
  const [selectedTables, setSelectedTables] = useState([]);

  const tablesData = [
    {
      value: "add_fund_bonus_categories",
      label: "Add fund bonus categ...",
      count: 2,
    },
    {
      value: "admin_wallet_histories",
      label: "Admin wallet histori...",
      count: 0,
    },
    { value: "admin_wallets", label: "Admin wallets", count: 2 },
    { value: "attributes", label: "Attributes", count: 2 },
    { value: "carts", label: "Carts", count: 6 },
    { value: "categories", label: "Categories", count: 34 },
    {
      value: "category_shipping_costs",
      label: "Category shipping co...",
      count: 64,
    },
    { value: "chattings", label: "Chattings", count: 26 },
    { value: "contacts", label: "Contacts", count: 3 },
    { value: "coupons", label: "Coupons", count: 8 },
    {
      value: "customer_wallet_histories",
      label: "Customer wallet hist...",
      count: 0,
    },
    { value: "customer_wallets", label: "Customer wallets", count: 0 },
    { value: "deal_of_the_days", label: "Deal of the days", count: 1 },
    {
      value: "delivery_country_codes",
      label: "Delivery country cod...",
      count: 2,
    },
    {
      value: "order_expected_delivery_histories",
      label: "Order expected deliv...",
      count: 4,
    },
    {
      value: "order_status_histories",
      label: "Order status histori...",
      count: 71,
    },
  ];

  const handleCheckboxChange = (value) => {
    setSelectedTables((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Selected tables:", selectedTables);
  };

  return (
    <div className="row snipcss-8Hkff">
      <div className="col-12 mb-3">
        <div
          className="alert badge-soft-danger mb-0 mx-sm-2 text-left"
          role="alert"
        >
          This page contains sensitive information. Make sure before changing.
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form
              action=""
              method="post"
              className="form-submit"
              onSubmit={handleFormSubmit}
            >
              <input
                type="hidden"
                name="_token"
                value="SXCvNFDWFKXZV15a7JHIE5kfiR2iPzrxGf9Jdemb"
                autoComplete="off"
              />
              <div className="row">
                {tablesData.map((table, index) => (
                  <div key={index} className="col-sm-6 col-xl-3">
                    <div className="form-group form-check text-left">
                      <input
                        type="checkbox"
                        name="tables[]"
                        value={table.value}
                        className="form-check-input"
                        id={`business_section_${index}`}
                        checked={selectedTables.includes(table.value)}
                        onChange={() => handleCheckboxChange(table.value)}
                      />
                      <label
                        className="form-check-label text-dark cursor-pointer user-select-none"
                        htmlFor={`business_section_${index}`}
                      >
                        {table.label}
                      </label>
                      <span className="badge-pill badge-secondary mx-2">
                        {table.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-end gap-10 flex-wrap mt-3">
                <button
                  type="button"
                  className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark call-demo"
                  style={{ color: "white" }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
