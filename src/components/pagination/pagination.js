import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Pagination = ({ setCallback, pageRangeDisplayed, itemsPerPage, filteredData, location }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const paginationProps = {
      [location]: filteredData.slice(itemOffset, itemOffset + itemsPerPage),
      pageCount: Math.ceil(filteredData.length / itemsPerPage)
    };

    setCallback(paginationProps[location]);
    setPageCount(paginationProps.pageCount);
  }, [itemOffset, itemsPerPage, filteredData]);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
    />
  );
};

Pagination.propTypes = {
  pageRangeDisplayed: PropTypes.number.isRequired,
  setCallback: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  filteredData: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired
};

export default Pagination;
