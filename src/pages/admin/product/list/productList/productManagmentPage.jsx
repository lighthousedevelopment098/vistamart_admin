import React, { useState, useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import FilterForm from "./FilterForm";
import {
  deleteProduct,
  fetchProducts,
  toggleFeatured,
  updateProductStatus,
} from "../../../../../redux/slices/admin/productSlice";
import {
  fetchBrands,
  fetchCategories,
} from "../../../../../redux/slices/admin/categorybrandSlice";
import LoadingSpinner from "../../../../../components/LoodingSpinner/LoadingSpinner";
import Pagination from "../../../../../components/Pagination";
import TableList from "./TableList";
import { Link } from "react-router-dom";
import apiConfig from "../../../../../config/apiConfig";
import Switcher from "../../../../../components/FormInput/Switcher";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import usePagination from "../../../../../hooks/usePagination";

const InHouseProductList = ({
  initialTitle = "Product List",
  initialFilters = {},
}) => {
  const dispatch = useDispatch();
  const { loading, error, products,totalDocs, results, currentPage, totalPages } = useSelector(
    (state) => state.product
  );
  const { categories, brands } = useSelector((state) => state.category);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const { pagination, setPage } = usePagination(); 

  const [filters, setFilters] = useState({
    brand: initialFilters.brand || "",
    category: initialFilters.category || "",
    searchValue: initialFilters.searchValue || "",
    userType: initialFilters.userType || "",
    userId: initialFilters.userId || "",
    status: initialFilters.status || "",
    vendorNew4Days: initialFilters.vendorNew4Days || false,
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
    page: pagination.page,
    limit: pagination.limit,
  });

  useEffect(() => {
    const cleanFilters = {
      ...filters,
      brand: filters.brand || undefined,
      category: filters.category || undefined,
      searchValue: filters.searchValue || undefined,
      userType: filters.userType || undefined,
      status: filters.status || undefined,
      userId: filters.userId || undefined,
      vendorNew4Days: filters.vendorNew4Days || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
    };

    dispatch(fetchProducts(cleanFilters));
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [filters, sortBy, sortOrder, dispatch]);

  const handleSort = (field) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(order);
  };

  const handleToggleFeatured = async (product) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        product.isFeatured ? "remove" : "add"
      } this product as featured?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      try {
        await dispatch(
          toggleFeatured({
            productId: product._id,
            isFeatured: !product.isFeatured,
          })
        ).unwrap();
        Swal.fire("Success", "Product status updated successfully!", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page })); // Update page number
  };
  return (
    <div className="content container-fluid">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex gap-2">
          <img src="/inhouse-product-list.png" alt="In House Product List" />
          {initialTitle}
          <span className="badge badge-soft-dark radius-50 fz-14 ml-1">
            {totalDocs}
          </span>
        </h2>
      </div>

      {categories.length > 0 && brands.length > 0 && (
        <FilterForm
          filters={filters}
          onInputChange={(e) => {
            const { name, value } = e.target;
            setFilters((prev) => ({ ...prev, [name]: value }));
          }}
          categories={categories}
          brands={brands}
        />
      )}

      <div className="product-table-container">
        {error ? (
          <div>
            {typeof error === "object" && error !== null
              ? JSON.stringify(error)
              : error}
          </div>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <TableList
              title="Product List"
              tableTitle="Products"
              listData={products}
              columns={[
                { key: "SL", label: "SL", render: (_, index) => index + 1 },
                {
                  key: "name",
                  label: "Product Name",
                  sortable: true,
                  onClick: () => handleSort("name"),
                  render: (product) => (
                    <Link to="#" className="media align-items-center gap-2">
                      <img
                        src={`${apiConfig.bucket}/${product?.thumbnail}`}
                        className="avatar border"
                        alt={product?.name}
                      />
                      <span className="hover-c1">{product?.name}</span>
                    </Link>
                  ),
                },
                {
                  key: "productType",
                  label: "Product Type",
                  textAlign: "center",
                },
                {
                  key: "price",
                  label: "Unit Price",
                  sortable: true,
                  onClick: () => handleSort("price"),
                  render: (product) => `PKR ${product?.price}`,
                },
                {
                  key: "brand",
                  label: "Brand",
                  sortable: true,
                  onClick: () => handleSort("brand"),
                  render: (product) => `${product?.brand?.name}`,
                },
                {
                  key: "isFeatured",
                  label: "Show as Featured",
                  textAlign: "center",
                  render: (product) => (
                    <Switcher
                      checked={product?.isFeatured}
                      onChange={() => handleToggleFeatured(product)}
                    />
                  ),
                },
                {
                  key: "actions",
                  label: "Actions",
                  textAlign: "center",
                  render: (product) => (
                    <div className="btn-group flex gap-3">
                      <Link
                        to={`/products/${product?._id}`}
                        className="btn border-primary-500 text-primary-500"
                        title="View"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/product/${product?._id}`}
                        className="btn border-primary-500 text-primary-500"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="btn  border-red-400 text-red-400 hover:bg-red-500 hover:text-white"
                        onClick={() => handleDeleteProduct(product?._id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ),
                },
              ]}
              itemsPerPage={filters.limit}
            />
          </Suspense>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={handlePageChange}
      />
    </div>
  );
};

export default InHouseProductList;
