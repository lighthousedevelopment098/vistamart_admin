import React, { useMemo } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import TableList from "../../../../../../components/FormInput/TableList";
import ActionButton from "../../../../../../components/ActionButton/Action";
import apiConfig from "../../../../../../config/apiConfig";


const CategoryList = React.memo(
  ({ categories, handleDelete, handleSearch, searchQuery }) => {
    // Define the columns for the table
    const columns = useMemo(
      () => [
        {
          key: "_id",
          label: "ID",
          render: (item) => `C${item?._id.substring(0, 6)}`,
        },
        {
          key: "logo",
          label: "Logo",
          render: (item) => (
            <img
            // src={`${IMAGE_BASE_URL}/${item?.logo}`}
            src={`${apiConfig.bucket}/${item?.logo}`} // Use the bucket URL

              className="avatar"
              alt={item?.name}
              aria-label="Category Logo"
            />
          ),
        },
        { key: "name", label: "Category Name" },
        {
          key: "priority",
          label: "Priority",
          render: (item) => item?.priority || "0",
        },
        {
          key: "product",
          label: "Products",
          render: (item) => item?.totalProducts || "0",
        },
        {
          key: "actions",
          label: "Actions",
          render: (item) => (
            <div className="d-flex gap-2 justify-content-center">
              <ActionButton
                to={`/categoryedit/${item?._id}`}
                icon={FaEdit} // View icon
                className="ml-4"
                // label="View"
              />
              <ActionButton
                onClick={() => handleDelete(item?._id)}
                icon={FaTrash} // Delete icon
                className="ml-4"
                // label="Delete"
              />
            </div>
          ),
        },
      ],
      [handleDelete]
    );

    return (
      <TableList
        title="Categories"
        imageSrc="/top-selling-product-icon.png"
        tableTitle="Categories List"
        listData={categories}
        columns={columns}
        searchPlaceholder="Search categories..."
       
      />
    );
  }
);

export default CategoryList;
