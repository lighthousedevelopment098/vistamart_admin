import React, { useState } from "react";
import { FaFilter, FaDownload, FaChevronDown } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { IoMdWallet } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import ExportButton from "../../../components/ActionButton/Export";
// import { MdDateRange } from 'react-icons/md';

const CustomerLoyaltyReport = () => {
  // State for transactions
  const [transactions, setTransactions] = useState([
    // {
    //   id: "bfcc9291-6276-4a3f-b287-b484f67d48f5",
    //   customer: "Devid Jack",
    //   credit: 237,
    //   debit: 0,
    //   balance: 989,
    //   type: "Order place",
    //   reference: 100187,
    //   date: "2024/01/10",
    // },
    // {
    //   id: "bfcc9291-6276-4a3f-b287-b484f67d48f5",
    //   customer: "Devid Jack",
    //   credit: 237,
    //   debit: 0,
    //   balance: 989,
    //   type: "Order place",
    //   reference: 100187,
    //   date: "2024/01/10",
    // },
    // {
    //   id: "bfcc9291-6276-4a3f-b287-b484f67d48f5",
    //   customer: "Devid Jack",
    //   credit: 237,
    //   debit: 0,
    //   balance: 989,
    //   type: "Order place",
    //   reference: 100187,
    //   date: "2024/01/10",
    // },
    // {
    //   id: "bfcc9291-6276-4a3f-b287-b484f67d48f5",
    //   customer: "Devid Jack",
    //   credit: 237,
    //   debit: 0,
    //   balance: 989,
    //   type: "Order place",
    //   reference: 100187,
    //   date: "2024/01/10",
    // },
    // Add more transactions here as needed
  ]);

  return (
    <div className="content container-fluid snipcss-kmMNn">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/loyalty_point.png"
            alt="Customer Loyalty"
          />
          Customer loyalty point report
        </h2>
      </div>

      <div className="card">
        <div className="card-header text-capitalize">
          <h4 className="mb-0">Filter options</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 pt-3">
              <form method="get">
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <input
                        type="date"
                        name="from"
                        id="start-date-time"
                        value=""
                        className="form-control outline-none hover:border-primary-500"
                        title="From date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <input
                        type="date"
                        name="to"
                        id="end-date-time"
                        value=""
                        className="form-control outline-none hover:border-primary-500"
                        title="To date"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <select
                        name="transaction_type"
                        id=""
                        className="form-control outline-none hover:border-primary-500"
                        title="Select transaction type"
                      >
                        <option value="">All</option>
                        <option value="point_to_wallet">Point to wallet</option>
                        <option value="order_place">Order place</option>
                        <option value="refund_order">Refund order</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="mb-3">
                      <input
                        type="hidden"
                        id="customer-id"
                        name="customer_id"
                        value="all"
                      />
                      <select
                        className="form-control form-ellipsis select2-hidden-accessible"
                        data-select2-id="1"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <option value="all" data-select2-id="3">
                          All customer
                        </option>
                        <option value="" disabled data-select2-id="4">
                          Select your option
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn flex gap items-center px-4 py-2 bg-primary-500 text-white hover:bg-primary-dark-500"
                    style={{ color: "white" }}
                  >
                    <FaFilter className="mr-1" /> Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header text-capitalize">
          <h4 className="mb-0">Summary</h4>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3">
            <div className="order-stats flex-grow-1">
              <div className="order-stats__content">
                <AiFillBank />
                <h6 className="order-stats__subtitle">Debit</h6>
              </div>
              <span className="order-stats__title fz-14 text-primary-500"></span>
            </div>
            <div className="order-stats flex-grow-1">
              <div className="order-stats__content">
                <GiReceiveMoney />
                <h6 className="order-stats__subtitle">Credit</h6>
              </div>
              <span className="order-stats__title fz-14 text-warning"> </span>
            </div>
            <div className="order-stats flex-grow-1">
              <div className="order-stats__content">
                <IoMdWallet />
                <h6 className="order-stats__subtitle">Balance</h6>
              </div>
              <span className="order-stats__title fz-14 text-success"> </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header text-capitalize gap-2">
          <h4 className="mb-0 text-[1rem] font-semibold text-nowrap">
            Transactions{" "}
            <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
              {transactions.length}
            </span>
          </h4>
          <div className="d-flex justify-content-end">
            <div className="dropdown text-nowrap">
              <ExportButton
                data={transactions} // Pass the data to export
                filename="CustomerLoyaltyReport" // Optional filename for the exported file
                icon={FaDownload} // Icon for the button
                label="Export " // Button label
                className="bg--500 text-white hover:bg-primary-dark-500" // Tailwind classes for styling
                style={{ color: "white" }} // Optional inline styles
              />
              <ul className="dropdown-menu dropdown-menu-right">
                <li>
                  <a
                    type="submit"
                    className="dropdown-item d-flex align-items-center gap-2"
                    href="https://6valley.6amtech.com/admin/customer/loyalty/export"
                  >
                    <img
                      width="14"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/excel.png"
                      alt="Excel"
                    />{" "}
                    Excel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            id="datatable"
            className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-left"
          >
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Balance</th>
                <th>Transaction type</th>
                <th>Reference</th>
                <th className="text-center">Created at</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} scope="row">
                  <td>{index + 1}</td>
                  <td>{transaction.id}</td>
                  <td>
                    <a
                      href={`/${transaction.id}`}
                      className="title-color hover-c1"
                    >
                      {transaction.customer}
                    </a>
                  </td>
                  <td>{transaction.credit}</td>
                  <td>{transaction.debit}</td>
                  <td>{transaction.balance}</td>
                  <td>
                    <span className="badge badge-soft-info">
                      {transaction.type}
                    </span>
                  </td>
                  <td>{transaction.reference}</td>
                  <td className="text-center">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoyaltyReport;
