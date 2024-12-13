import React from "react";

const MostCustomers = () => {
  return (
    <div className=" snipcss-9DnGF card h-100 remove-card-shadow  snipcss-7PigA bg-white mb-3 border-r-2">
      <div className="card-header ">
        <h4 className="d-flex align-items-center text-capitalize gap-4 font-semibold mb-0">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/top-customers.png"
            alt="Top customers"
          />{" "}
          Most customer
        </h4>
      </div>
      <div className="p-4 space-y-2">
        <a
          // href="https://6valley.6amtech.com/admin/vendors/view/1"
          className=" basic-box-shadow  flex justify-between items-center p-2 rounded-md"
        >
          <div className="d-flex align-items-center gap-10">
            <img
              src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f790349f7.png"
              className="avatar rounded-circle avatar-sm"
              alt=""
            />
            <h5 className="shop-name">Deluxe Online</h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h5 className="shop-sell c2">67</h5>
            <img
              src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
              alt=""
            />
          </div>
        </a>
        <a
          // href="https://6valley.6amtech.com/admin/vendors/view/2"
          className="grid-item basic-box-shadow flex justify-between p-2 rounded-md align-items-center"
        >
          <div className="d-flex align-items-center gap-10">
            <img
              src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f6e190f4c.png"
              className="avatar rounded-circle avatar-sm"
              alt=""
            />
            <h5 className="shop-name">Mart Morning</h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h5 className="shop-sell c2">24</h5>
            <img
              src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
              alt=""
            />
          </div>
        </a>
        <a
          // href="https://6valley.6amtech.com/admin/vendors/view/3"
          className="grid-item basic-box-shadow p-2 rounded-md flex justify-between align-items-center"
        >
          <div className="d-flex align-items-center gap-10">
            <img
              src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f38e9ce54.png"
              className="avatar rounded-circle avatar-sm"
              alt=""
            />
            <h5 className="shop-name">Wellness Fair</h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h5 className="shop-sell c2">14</h5>
            <img
              src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
              alt=""
            />
          </div>
        </a>
        <a
          // href="https://6valley.6amtech.com/admin/vendors/view/10"
          className="grid-item basic-box-shadow p-2 rounded-md flex justify-between align-items-center"
        >
          <div className="d-flex align-items-center gap-10">
            <img
              src="https://6valley.6amtech.com/storage/app/public/shop/2023-06-13-64883892c6c11.png"
              className="avatar rounded-circle avatar-sm"
              alt=""
            />
            <h5 className="shop-name">Digital House</h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h5 className="shop-sell c2">6</h5>
            <img
              src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
              alt=""
            />
          </div>
        </a>
        <a
          // href="https://6valley.6amtech.com/admin/vendors/view/6"
          className="grid-item basic-box-shadow p-2 rounded-md flex justify-between align-items-center"
        >
          <div className="d-flex align-items-center gap-10">
            <img
              src="https://6valley.6amtech.com/storage/app/public/shop/2022-04-21-6260f23c79774.png"
              className="avatar rounded-circle avatar-sm"
              alt=""
            />
            <h5 className="shop-name">Country Fair</h5>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h5 className="shop-sell c2">1</h5>
            <img
              src="https://6valley.6amtech.com/public/assets/back-end/img/love.png"
              alt=""
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default MostCustomers;
