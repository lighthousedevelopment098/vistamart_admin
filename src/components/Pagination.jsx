import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  paginate,
  pageRange = 5,
  prevLabel = <FaChevronLeft />,
  nextLabel = <FaChevronRight />,
}) => {
  // Calculate start and end pages
  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(pageRange / 2));

  // Ensure that we always display `pageRange` number of buttons if possible
  if (endPage - startPage < pageRange - 1) {
    if (startPage > 1) {
      startPage = Math.max(1, endPage - pageRange + 1);
    } else {
      endPage = Math.min(totalPages, startPage + pageRange - 1);
    }
  }

  
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      {/* Previous Button */}
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
          currentPage === 1
            ? "bg-black text-white cursor-not-allowed"
            : "bg-primary-500 hover:bg-primary-dark-500 text-white"
        }`}
        style={{ color: "white" }}
      >
        {prevLabel}
      </button>

      {/* Page Numbers */}
      {[...Array(endPage - startPage + 1)].map((_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`w-6 h-6 flex items-center justify-center rounded-full font-medium transition-all ${
              currentPage === page
                ? "bg-primary-500 text-white shadow-md"
                : "bg-primary-dark-500 hover:bg-primary-500 text-white"
            }`}
            style={{ color: "white" }}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-6 h-6 flex items-center justify-center rounded-full transition-all ${
          currentPage === totalPages
            ? "bg-black cursor-not-allowed"
            : "bg-primary-500 hover:bg-primary-dark-500 text-white"
        }`}
        style={{ color: "white" }}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default Pagination;
