import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa"; // Importing icons

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    // Add your transaction data here
    // {
    //   id: 1,
    //   vendorName: 'Vendor A',
    //   customerName: 'Customer A',
    //   orderId: '12345',
    //   transactionId: '54321',
    //   orderAmount: '100.00',
    //   vendorAmount: '80.00',
    //   adminCommission: '20.00',
    //   receivedBy: 'John Doe',
    //   deliveredBy: 'Jane Doe',
    //   deliveryCharge: '5.00',
    //   paymentMethod: 'Credit Card',
    //   tax: '10.00',
    //   status: 'Delivered',
    // },
    // {
    //   id: 1,
    //   vendorName: 'Vendor A',
    //   customerName: 'Customer A',
    //   orderId: '12345',
    //   transactionId: '54321',
    //   orderAmount: '100.00',
    //   vendorAmount: '80.00',
    //   adminCommission: '20.00',
    //   receivedBy: 'John Doe',
    //   deliveredBy: 'Jane Doe',
    //   deliveryCharge: '5.00',
    //   paymentMethod: 'Credit Card',
    //   tax: '10.00',
    //   status: 'Hold',
    // },
    // Add more transactions as needed
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (transaction) =>
          transaction.orderId.includes(searchValue) ||
          transaction.transactionId.includes(searchValue)
      )
    );
  };

  // Function to handle filter
  const handleFilter = (e) => {
    e.preventDefault();
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) =>
        filterStatus === "all" ? true : transaction.status === filterStatus
      )
    );
  };

  return (
    <div className="col-md-12 snipcss-aKe3A">
      <div className="card">
        <div className="px-3 py-4">
          <div className="row align-items-center">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <h5 className="mb-0 text-capitalize d-flex gap-1 align-items-center">
                Transaction table
                {/* <span className="badge badge-soft-dark fz-12">
                   {transactions.length} 
                </span>  */}
              </h5>
            </div>
            <div className="col-md-6 col-lg-4 mb-3 mb-md-3">
              <form onSubmit={handleSearch}>
                <div className="input-group input-group-merge input-group-custom">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <FaSearch />
                    </div>
                  </div>
                  <input
                    id="datatableSearch_"
                    type="search"
                    name="searchValue"
                    className="form-control"
                    placeholder="Search by orders id or transaction id"
                    aria-label="Search orders"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary-500 bg-primary-500 hover:bg-primary-dark-500 text-white"
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6 col-lg-4">
              <form onSubmit={handleFilter}>
                <div className="d-flex justify-content-end align-items-center gap-10">
                  <select
                    className="form-control"
                    name="status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      ---Select status---
                    </option>
                    <option className="text-capitalize" value="all">
                      All
                    </option>
                    <option className="text-capitalize" value="Disburse">
                      Disburse
                    </option>
                    <option className="text-capitalize" value="Hold">
                      Hold
                    </option>
                    <option className="text-capitalize" value="Delivered">
                      Delivered
                    </option>
                  </select>
                  <button
                    type="submit"
                    className="btn flex justify-center align-items-center gap-2 btn-success bg-primary-500 hover:bg-primary-dark-500"
                  >
                    <FaFilter /> Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table
          id="datatable"
          className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 style-p3X7a"
        >
          <thead className="thead-light thead-50 text-capitalize">
            <tr>
              <th>SL</th>
              <th>Vendor name</th>
              <th>Customer name</th>
              <th>Order id</th>
              <th>Transaction id</th>
              <th>Order amount</th>
              <th>Vendor amount</th>
              <th>Admin commission</th>
              <th>Received by</th>
              <th>Delivered by</th>
              <th>Delivery charge</th>
              <th>Payment method</th>
              <th>Tax</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.vendorName}</td>
                  <td>{transaction.customerName}</td>
                  <td>{transaction.orderId}</td>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.orderAmount}</td>
                  <td>{transaction.vendorAmount}</td>
                  <td>{transaction.adminCommission}</td>
                  <td>{transaction.receivedBy}</td>
                  <td>{transaction.deliveredBy}</td>
                  <td>{transaction.deliveryCharge}</td>
                  <td>{transaction.paymentMethod}</td>
                  <td>{transaction.tax}</td>
                  <td className="text-center">{transaction.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center">
                  <img
                    className="mb-3 w-160"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                    alt="Image Description"
                  />
                  <p className="mb-0">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-responsive mt-4">
        <div className="px-4 d-flex justify-content-lg-end">
          {/* You can add pagination or additional controls here */}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
