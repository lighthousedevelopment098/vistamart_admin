import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing icons
// import './ReviewTable.css'; // Import your custom styles

const VenderReview = () => {
  const [reviews, setReviews] = useState([
    // Add your review data here
    // {
    //   id: 1,
    //   product: 'Product A',
    //   review: 'Great product!',
    //   rating: 5
    // },
    // {
    //   id: 2,
    //   product: 'Product B',
    //   review: 'Not bad',
    //   rating: 3
    // },
    // Add more reviews as needed
  ]);
  const [searchValue, setSearchValue] = useState('');

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setReviews((prevReviews) =>
      prevReviews.filter((review) =>
        review.product.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2 snipcss-plv2s">
      <div className="card">
        <div className="px-3 py-4">
          <div className="row align-items-center">
            <div className="col-sm-4 col-md-6 col-lg-8 mb-3 mb-sm-0">
              <h5 className="mb-0 d-flex gap-1 align-items-center">
                Review table
                <span className="badge badge-soft-dark radius-50 fz-12">
                  {reviews.length}
                </span>
              </h5>
            </div>
            <div className="col-sm-8 col-md-6 col-lg-4">
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
                    placeholder="Search by product name"
                    aria-label="Search orders"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button type="submit" className="btn btn--primary bg-green-400">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="table-responsive datatable-custom">
          <table
            id="columnSearchDatatable"
            className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 style-lTIVq"
          >
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th>Product</th>
                <th>Review</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <tr key={review.id}>
                    <td>{index + 1}</td>
                    <td>{review.product}</td>
                    <td>{review.review}</td>
                    <td>{review.rating}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    <img
                      className="mb-3 w-160"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                      alt="Image Description"
                    />
                    <p className="mb-0">No review found</p>
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
    </div>
  );
};

export default VenderReview;
