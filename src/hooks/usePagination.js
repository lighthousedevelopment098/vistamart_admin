import { useState } from "react";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../config/paginationConfig";

const usePagination = (initialPage = DEFAULT_PAGE, initialLimit = DEFAULT_LIMIT) => {
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
  });

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit) => {
    setPagination((prev) => ({ ...prev, limit }));
  };

  return {
    pagination,
    setPage,
    setLimit,
  };
};

export default usePagination;
