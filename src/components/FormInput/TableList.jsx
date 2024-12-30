import React, { useEffect, useState, lazy, memo } from "react";
import { FiSearch } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import TableHeader from "./TableHeader";
import Pagination from "../Pagination";

const ExportButton = lazy(() => import("../ActionButton/Export"));

const TableList = memo(
  ({
    title,
    tableTitle,
    listData = [],
    columns = [],
    exportFileName = "listData",
    searchPlaceholder = "Search...",
    itemKey = "_id",
    itemsPerPage = 7,
    imageSrc = "",
    headerActions,
  }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({
      key: "",
      direction: "descending",
    });

    // Calculate total pages based on filtered data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

   
    // Filter and sort data based on `searchQuery`, `columns`, and `sortConfig`
    useEffect(() => {
      const filtered = searchQuery
        ? listData.filter((item) =>
            columns.some((col) => {
              if (col.key && item[col.key]) {
                return String(item[col.key])
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              }
              return false;
            })
          )
        : listData;

      let sortedData = [...filtered];
      if (sortConfig.key) {
        sortedData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }

      setFilteredData(sortedData);
      setCurrentPage(1); // Reset to the first page whenever the data changes
    }, [listData, searchQuery, sortConfig, columns]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleSort = (key) => {
      let direction = "descending";
      if (sortConfig.key === key && sortConfig.direction === "descending") {
        direction = "ascending";
      }
      setSortConfig({ key, direction });
    };

    // Calculate items to display for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div className="mt-3 mb-2 pr-2 pl-2 md:p-2 md:pl-4 w-full">
        <ToastContainer />
        <TableHeader imageSrc={imageSrc} title={title} />
        <div className="card bg-white shadow-sm">
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 px-3 py-4">
            <div className="flex gap-3 justify-center items-center">
              <h4 className="font-semibold text-lg">{tableTitle}</h4>
              <span className="badge badge-soft-dark ml-2">
                {filteredData.length}
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-end gap-4">
              <form onSubmit={(e) => e.preventDefault()} className="flex-grow">
                <div className="flex border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-center px-3">
                    <FiSearch />
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control border-none outline-none px-4 py-2 w-full md:w-48"
                    placeholder={searchPlaceholder}
                  />
                </div>
              </form>
              {headerActions}
              <ExportButton
                data={filteredData}
                filename={exportFileName}
                title="Export"
                className="bg-primary-500 text-white hover:bg-primary-dark-500 px-4 py-2 rounded-md"
                label="Export"
                style={{ color: "white" }}
              />
            </div>
          </div>
          <div className="overflow-x-auto text-nowrap">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-secondary-500 text-white">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-4 py-3 text-center text-[#57596C] cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        <span>{col.label}</span>
                        <span className="ml-2">
                          {sortConfig.key === col.key ? (
                            sortConfig.direction === "ascending" ? (
                              <AiOutlineArrowUp
                                className="text-gray-400"
                                size={16}
                              />
                            ) : (
                              <AiOutlineArrowDown
                                className="text-gray-400"
                                size={16}
                              />
                            )
                          ) : (
                            <AiOutlineArrowDown
                              className="text-gray-400"
                              size={16}
                            />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item[itemKey] || index} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-center text-[#57596C]"
                      >
                        {col.render ? col.render(item, index) : item[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={handlePageChange}
            pageRange={5}
          />
        </div>
      </div>
    );
  }
);

export default TableList;
