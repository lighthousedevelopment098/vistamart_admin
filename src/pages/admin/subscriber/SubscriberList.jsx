import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaDownload, FaChevronDown, FaTrash } from "react-icons/fa";
import {
  fetchSubscribers,
  deleteSubscriber,
} from "../../../redux/slices/admin/subscriberSlice"; // Update path as needed
import ActionButton from "../../../components/ActionButton/Action";

const SubscriberList = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  // Fetch subscribers from Redux state
  const { subscribers, createAt, loading, error } = useSelector(
    (state) => state.subscriber
  );

  // Fetch subscribers when component mounts
  useEffect(() => {
    dispatch(fetchSubscribers());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchSubscribers({ search: searchValue }));
  };

  const handleDelete = (subscriberId) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      dispatch(deleteSubscriber(subscriberId));
    }
  };

  const handleExport = () => {
    // Implement export functionality if needed
    console.log("Export functionality here");
  };

  return (
    <div className="content container-fluid snipcss-bShdM">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/subscribers.png"
            width="20"
            alt=""
          />{" "}
          Subscriber list{" "}
          <span className="badge badge-soft-dark radius-50 fz-14 ml-1">
            {subscribers.length}
          </span>
        </h2>
      </div>
      <div className="row mt-20">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header flex gap-2 ">
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
                    className="form-control outline-none hover:border-primary-500"
                    placeholder="Search by email"
                    aria-label="Search orders"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className=" bg-primary-500 hover:bg-primary-dark-500 px-2 py-1 md:px-4 md:py-2"
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
              <button
                type="button"
                className="btn rounded text-white px-2 py-2 md:px-4 md:py-2 bg-primary-500 hover:bg-primary-dark-500 text-nowrap flex justify-center align-items-center gap-2"
                style={{ color: "white" }}
                onClick={handleExport}
              >
                <FaDownload /> Export <FaChevronDown />
              </button>
            </div>
            <div className="table-responsive">
              <table
                className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 style-CSLoI"
                id="style-CSLoI"
              >
                <thead className="thead-light thead-50 text-capitalize">
                  <tr>
                    <th>SL</th>
                    <th scope="col">Email</th>
                    {/* <th>Subscription date</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    subscribers.map((subscriber, index) => (
                      <tr key={subscriber._id}>
                        <td>{index + 1}</td>
                        <td>{subscriber.email}</td>
                        {console.log(" create date", createAt)}
                        {/* <td>{new Date(createAt).toLocaleString()}</td> */}
                        <td>
                          <ActionButton
                            onClick={() => handleDelete(subscriber._id)}
                            icon={FaTrash} // Pass dynamic icon
                            className="ml-4"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberList;
