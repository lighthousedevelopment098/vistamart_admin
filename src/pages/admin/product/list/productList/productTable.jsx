
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash, FiEye, FiPlus } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import ExportButton from "../../../../../components/ActionButton/Export";
import apiConfig from "../../../../../config/apiConfig";

const ProductTable = React.memo(
  ({
    products,
    onToggleFeatured,
    onUpdateStatus,
    onDeleteProduct,
    totalDocs,
    limit,
    totalPages,
    currentPage,
    hasPrevPage,
    hasNextPage,
    onPageChange,
  }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name"); // Default sort by product name
    const [sortOrder, setSortOrder] = useState("asc"); // Default order is ascending

    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting function
    const handleSort = (column) => {
      const order = sortBy === column && sortOrder === "asc" ? "desc" : "asc"; // Toggle order
      setSortBy(column);
      setSortOrder(order);
    };

    // Sort the filtered products based on the selected column and order
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0; // Default no sort for other columns
    });

    const handlePrevPage = () => {
      if (hasPrevPage) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (hasNextPage) {
        onPageChange(currentPage + 1);
      }
    };

    return (
      <>
        <div className="px-3 py-4">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="d-flex align-items-center"
              >
                <div className="input-group input-group-custom input-group-merge border-green-400">
                  <input
                    id="datatableSearch_"
                    type="search"
                    name="searchValue"
                    className="form-control outline-none hover:border-primary"
                    placeholder="Search by Product Name"
                    aria-label="Search orders"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="button"
                    className="btn bg-primary text-white hover:bg-primary-dark"
                    onClick={() =>
                      console.log(
                        "Search functionality can be implemented here"
                      )
                    }
                    style={{ color: "white" }}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-8 mt-3 mt-lg-0 d-flex flex-wrap gap-3 justify-content-lg-end">
              <Link
                to="/inhouseaddproduct"
                className="btn flex justify-center items-center gap-3 bg-primary text-white hover:bg-primary-dark hover:text-white"
              >
                <FiPlus />
                <span className="text hover:text-white">Add new product</span>
              </Link>
              <ExportButton
                data={sortedProducts} // Pass the sorted data to export
                filename="ProductList" // Optional filename for the exported file
                icon={FaDownload} // Icon for the button
                label="Export " // Button label
                className="bg-primary text-white hover:bg-primary-dark" // Tailwind classes for styling
                style={{ color: "white" }} // Optional inline styles
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100 text-start">
            <thead className="thead-light thead-50 text-capitalize">
              <tr>
                <th>SL</th>
                <th
                  className="sortable"
                  onClick={() => handleSort("name")}
                >
                  Product Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-center">Product Type</th>
                <th
                  className="text-center sortable"
                  onClick={() => handleSort("price")}
                >
                  Unit price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-center">Show as featured</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product, index) => (
                  <tr key={product?._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link to="#" className="media align-items-center gap-2">
                        <img
                          src={`${apiConfig.bucket}/${product?.thumbnail}`} // Use the bucket URL
                          className="avatar border"
                          alt={product.name}
                        />
                        <span className="hover-c1">{product.name}</span>
                      </Link>
                    </td>
                    <td className="text-center">{product.productType}</td>
                    <td className="text-center">PKR {product.price}</td>
                    <td className="text-center">
                      <label className="switcher mx-auto">
                        <input
                          type="checkbox"
                          className="switcher_input"
                          checked={product.isFeatured}
                          onChange={() => onToggleFeatured(product)}
                        />
                        <span className="switcher_control" />
                      </label>
                    </td>
                    <td className="text-center">
                      <div className="btn-group flex gap-3">
                        <Link
                          to={`/products/${product._id}`}
                          className="btn border-primary text-primary"
                          title="View"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          to={`/product/${product._id}`}
                          className="btn border-primary text-primary"
                          title="Edit"
                        >
                          <FiEdit />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm border-red-400 text-red-400 hover:bg-red-500 hover:text-white"
                          onClick={() => onDeleteProduct(product._id)}
                          title="Delete"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
);

export default ProductTable;
