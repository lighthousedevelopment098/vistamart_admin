import React, { useMemo } from "react";
import { FaEdit, FaEye, FaPen, FaTrash } from "react-icons/fa";
import TableList from "../../../../../components/FormInput/TableList";
import ActionButton from "../../../../../components/ActionButton/Action";

const SubSubCategoryList = React.memo(
  ({ subCategories, handleDelete, handleEdit }) => {
    // Added handleEdit as a prop

    const columns = useMemo(
      () => [
        {
          key: "_id",
          label: "ID",
          render: (item) => `SS${item._id.substring(0, 6)}`,
        },
        { key: "name", label: "Sub Category Name" },
        {
          key: "mainCategory",
          label: "Main Category",
          render: (item) => item?.mainCategory?.name || "No Main Category", // Add null checks
        },
        {
          key: "priority",
          label: "Priority",
          render: (item) => item.priority || "0",
        },
        {
          key: "actions",
          label: "Actions",
          render: (item) => (
            <div className="d-flex gap-2 justify-content-center">
              {/* <ActionButton
            
                onClick={() => handleEdit(item)}
                icon={FaEdit} // Edit icon
                className="ml-4 border-primary-500 text-primary-500 bg-white hover:text-primary-500"
              /> */}
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className={`btn border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white `}
                >
                  <FaEdit />
                </button>
              </div>
              <ActionButton
                onClick={() => handleDelete(item._id)}
                icon={FaTrash} // Delete icon
                className="ml-4"
              />
            </div>
          ),
        },
      ],
      [handleDelete, handleEdit]
    ); // Include handleEdit in dependencies

    return (
      <TableList
        title="Sub Categories"
        imageSrc="/top-selling-product-icon.png"
        tableTitle="Sub  Categories List"
        listData={subCategories}
        columns={columns}
        fetchListData={() => {}} // Provide your fetch function if needed
        searchPlaceholder="Search sub sub categories..."
        itemKey="_id"
        itemsPerPage={10}
      />
    );
  }
);

export default SubSubCategoryList;
