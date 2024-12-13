import React from "react";
import "./TopCard.css";
const TopCustomerCard = ({ avatarSrc, name, orders }) => (
  <div
    className="cursor-pointer"
    // onClick={() =>
    //   (window.location.href = `/view/${name}`)
    // }
  >
    <div className="grid-card basic-box-shadow">
      <div className="text-center">
        <img
          className="avatar rounded-circle avatar-lg"
          src={avatarSrc}
          alt={name}
        />
      </div>
      <h5 className="mb-0">{name}</h5>
      <div className="orders-count d-flex gap-1">
        <div>Orders: </div>
        <div>{orders}</div>
      </div>
    </div>
  </div>
);

const TopCustomers = () => (
  <div className=" snipcss-9DnGF">
    <div className="card h-100 remove-card-shadow">
      <div className="card-header">
        <h4 className="d-flex align-items-center text-capitalize gap-4 font-semibold mb-0">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/top-customers.png"
            alt="Top customers"
          />{" "}
          Top customer
        </h4>
      </div>
      <div className="card-body">
        <div className="grid-card-wrap">
          <TopCustomerCard
            avatarSrc="https://6valley.6amtech.com/storage/app/public/profile/2022-04-20-625fa7d513aa5.png"
            name="fatema"
            orders={137}
          />
          <TopCustomerCard
            avatarSrc="https://6valley.6amtech.com/storage/app/public/profile/2022-10-12-63464cd299fc3.png"
            name="Devid"
            orders={17}
          />
          <TopCustomerCard
            avatarSrc="https://6valley.6amtech.com/storage/app/public/profile/2023-01-10-63bd46476b52a.png"
            name="Md.Safayet"
            orders={5}
          />
        </div>
      </div>
    </div>
  </div>
);

export default TopCustomers;
