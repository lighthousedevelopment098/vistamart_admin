import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Sample data
const initialCurrencies = [
 
  // Add more currencies as needed
];

const CurrencyForm = ({ onAddCurrency }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [code, setCode] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCurrency = {
      id: Date.now(),
      name,
      symbol,
      code,
      exchangeRate: parseFloat(exchangeRate),
      status: "Active",
    };
    onAddCurrency(newCurrency);
    setName("");
    setSymbol("");
    setCode("");
    setExchangeRate("");
  };

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <img
            width="18"
            src="https://6valley.6amtech.com/public/assets/back-end/img/currency-1.png"
            alt="Add currency"
          />{" "}
          Add currency
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="form-group">
                <label htmlFor="name" className="title-color mb-0">
                  Currency name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control outline-none hover:border-primary"
                  id="name"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="form-group">
                <label htmlFor="symbol" className="title-color mb-0">
                  Currency symbol
                </label>
                <input
                  type="text"
                  name="symbol"
                  className="form-control outline-none hover:border-primary"
                  id="symbol"
                  placeholder=""
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="form-group">
                <label htmlFor="code" className="title-color mb-0">
                  Currency code
                </label>
                <input
                  type="text"
                  name="code"
                  className="form-control outline-none hover:border-primary"
                  id="code"
                  placeholder=""
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="form-group">
                <label htmlFor="exchangeRate" className="title-color mb-0">
                  Exchange rate
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  name="exchangeRate"
                  step="0.00000001"
                  className="form-control outline-none hover:border-primary"
                  id="exchangeRate"
                  placeholder="Ex: 120"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex justify-content-end gap-3">
                <button type="reset" className="btn btn-secondary px-5">
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark"
                  style={{ color: "white" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const CurrencyList = ({ currencies }) => {
  return (
    <div className="mt-4">
      <div className="table-responsive">
        <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table text-start">
          <thead className="thead-light thead-50 text-capitalize">
            <tr>
              <th>SL</th>
              <th>Currency name</th>
              <th>Currency symbol</th>
              <th>Currency code</th>
              <th>Exchange rate</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => (
              <tr key={currency.id}>
                <td>{index + 1}</td>
                <td>{currency.name}</td>
                <td>{currency.symbol}</td>
                <td>{currency.code}</td>
                <td>{currency.exchangeRate}</td>
                <td>
                  <label
                    className={`badge ${
                      currency.status === "Default"
                        ? "badge-primary-light"
                        : "badge-secondary-light"
                    }`}
                  >
                    {currency.status}
                  </label>
                </td>
                <td>
                  <div className="d-flex gap-10 justify-content-center">
                    <button
                      title="Edit"
                      className="btn btn-outline--primary btn-sm btn-xs edit"
                      disabled={currency.status === "Default"}
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      className="btn btn-outline-danger btn-sm btn-xs delete-data-without-form"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CurrencyCard = () => {
  const [currencies, setCurrencies] = useState(initialCurrencies);

  const handleAddCurrency = (newCurrency) => {
    setCurrencies([...currencies, newCurrency]);
  };

  return (
    <div className="content container-fluid snipcss-ZrNgG">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <img
              width="20"
              src="https://6valley.6amtech.com/public/assets/back-end/img/currency-1.png"
              alt="Default-currency setup"
            />{" "}
            Default-currency setup
          </h5>
        </div>
        <div className="card-body">
          <form className="form-inline_ text-start" action="#" method="post">
            <div className="form-group">
              <label htmlFor="currency_id" className="title-color">
                Currency
              </label>
              <select
                className="form-control js-select2-custom select2-hidden-accessible"
                name="currency_id"
              >
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-end flex-wrap mt-3">
              <button
                type="submit"
                className="btn px-4 py-2 bg-primary text-white hover:bg-primary-dark "
                style={{ color: "white" }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <CurrencyForm onAddCurrency={handleAddCurrency} />
      <CurrencyList currencies={currencies} />
    </div>
  );
};

export default CurrencyCard;
