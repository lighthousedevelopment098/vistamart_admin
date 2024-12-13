import React from "react";
import { Link } from "react-router-dom";
import {
  RiSearchLine,
  RiBarcodeLine,
  RiEditLine,
  RiDeleteBinLine,
} from "react-icons/ri"; // Assuming you have imported React Icons

const LimitedStockProductsList = () => {
  return (
    <div className="content container-fluid snipcss-L3CM8">
      <div className="mb-3 d-flex flex-column gap-1">
        <h2 className="h1 text-capitalize d-flex gap-2 align-items-center">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/inhouse-product-list.png"
            className="mb-1 mr-1"
            alt=""
          />{" "}
          Limited Stocked Products List{" "}
          <span className="badge badge-soft-dark radius-50 fz-14 ml-1">
            {" "}
            4{" "}
          </span>
        </h2>
        <p className="d-flex">
          {" "}
          The products are shown in this list which quantity is below 10{" "}
        </p>
      </div>
      <div className="row mt-30">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <div className="row justify-content-between align-items-center gy-2">
                <div className="col-auto">
                  <form
                    action="https://6valley.6amtech.com/admin/products/stock-limit-list/in_house"
                    method="GET"
                  >
                    <div className="input-group input-group-custom input-group-merge">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <RiSearchLine />
                        </div>
                      </div>
                      <input
                        id="datatableSearch_"
                        type="search"
                        name="searchValue"
                        className="form-control"
                        placeholder="Search by Product Name"
                        aria-label="Search orders"
                        value=""
                        required
                      />
                      <input type="hidden" value="" name="status" />
                      <button
                        type="submit"
                        className="btn bg-green-600 text-white"
                      >
                        {" "}
                        Search{" "}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 mt-1 col-md-6 col-lg-3">
                  <select
                    name="qty_order_sort"
                    className="form-control action-select-onchange-get-view"
                    data-url-prefix="https://6valley.6amtech.com/admin/products/stock-limit-list/in_house/?sortOrderQty="
                  >
                    <option value="default"> Default </option>
                    <option value="quantity_asc">
                      {" "}
                      Inventory quantity(low to high){" "}
                    </option>
                    <option value="quantity_desc">
                      {" "}
                      Inventory quantity(high to low){" "}
                    </option>
                    <option value="order_asc">
                      {" "}
                      Order volume(low to high){" "}
                    </option>
                    <option value="order_desc">
                      {" "}
                      Order volume(high to low){" "}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table
                id="datatable"
                className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 text-start"
              >
                <thead className="thead-light thead-50 text-capitalize">
                  <tr>
                    <th>SL</th>
                    <th>Product Name</th>
                    <th className="text-center">Unit price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Orders</th>
                    <th className="text-center">Active status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <Link
                        to="https://6valley.6amtech.com/admin/products/view/in-house/1"
                        className="media align-items-center gap-2"
                      >
                        <img
                          src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe69f72cce.png"
                          className="avatar border"
                          alt=""
                        />
                        <span className="media-body title-color hover-c1">
                          {" "}
                          Women's long-sleeve...{" "}
                        </span>
                      </Link>
                    </td>
                    <td className="text-center"> $500.00 </td>
                    <td>
                      <div className="d-flex align-items-center product-quantity justify-content-center">
                        {" "}
                        4{" "}
                        <button
                          className="btn py-0 px-2 fz-18 action-update-product-quantity"
                          id="1"
                          data-url="https://6valley.6amtech.com/admin/products/get-variations?id=1"
                          type="button"
                          data-toggle="modal"
                          data-target="#update-quantity"
                          title="Update quantity"
                        >
                          <i className="tio-add-circle c1"></i>
                        </button>
                      </div>
                    </td>
                    <td className="text-center">27</td>
                    <td className="text-center">
                      <form
                        action="https://6valley.6amtech.com/admin/products/status-update"
                        method="post"
                        id="product-status1-form"
                        className="admin-product-status-form"
                      >
                        <input
                          type="hidden"
                          name="_token"
                          value="TUklnbbAElLTM1jngpkiLNvSXF1NzXeMgvvCAT5G"
                          autoComplete="off"
                        />{" "}
                        <input type="hidden" name="id" value="1" />
                        <label className="switcher mx-auto">
                          <input
                            type="checkbox"
                            className="switcher_input toggle-switch-message"
                            name="status"
                            id="product-status1"
                            value="1"
                            checked=""
                            data-modal-id="toggle-status-modal"
                            data-toggle-id="product-status1"
                            data-on-image="product-status-on.png"
                            data-off-image="product-status-off.png"
                            data-on-title="Want to Turn ON Women's long-sleeve lightweight french terry fleece quarter-zip top Status"
                            data-off-title="Want to Turn OFF Women's long-sleeve lightweight french terry fleece quarter-zip top Status"
                            data-on-message="<p>If enabled this product will be available on the website and customer app</p>"
                            data-off-message="<p>If disabled this product will be hidden from the website and customer app</p>"
                          />
                          <span className="switcher_control"></span>
                        </label>
                      </form>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          to="/inhouseproductlistcode"
                          className="btn btn-outline-info btn-sm square-btn"
                          title="Barcode"
                        >
                          <RiBarcodeLine />
                        </Link>
                        <a
                          className="btn btn-outline--primary-500 btn-sm square-btn"
                          title="Edit"
                          href="hupdate/1"
                        >
                          <RiEditLine />
                        </a>
                        <span
                          className="btn btn-outline-danger btn-sm square-btn delete-data"
                          title="Delete"
                          data-id="product-1"
                        >
                          <RiDeleteBinLine />
                        </span>
                      </div>
                      <form
                        action="https://6valley.6amtech.com/admin/products/delete/1"
                        method="post"
                        id="product-1"
                      >
                        <input
                          type="hidden"
                          name="_token"
                          value="TUklnbbAElLTM1jngpkiLNvSXF1NzXeMgvvCAT5G"
                          autoComplete="off"
                        />{" "}
                        <input type="hidden" name="_method" value="delete" />
                      </form>
                    </td>
                  </tr>
                  {/* Repeat similar structure for other rows */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedStockProductsList;
