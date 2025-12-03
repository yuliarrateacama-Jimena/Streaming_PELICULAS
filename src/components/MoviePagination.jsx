import { Pagination } from 'react-bootstrap';

const MoviePagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination className="justify-content-center my-4">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      
      {currentPage > 2 && <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>}
      {currentPage > 3 && <Pagination.Ellipsis />}
      
      {currentPage > 1 && (
        <Pagination.Item onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </Pagination.Item>
      )}
      
      <Pagination.Item active>{currentPage}</Pagination.Item>
      
      {currentPage < totalPages && (
        <Pagination.Item onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </Pagination.Item>
      )}
      
      {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
      {currentPage < totalPages - 1 && (
        <Pagination.Item onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      )}
      
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default MoviePagination;