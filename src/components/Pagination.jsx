import React from "react";

const Pagination = ({ pageable, onPageChange }) => {
  if (!pageable) return null;

  const { page_number, total_pages, has_previous, has_next } = pageable;

  const handlePrevious = () => {
    if (has_previous) onPageChange(page_number - 1);
  };

  const handleNext = () => {
    if (has_next) onPageChange(page_number + 1);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center my-4">
        <li className={`page-item ${!has_previous ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrevious}>
            Anterior
          </button>
        </li>

        {Array.from({ length: total_pages }).map((_, idx) => (
          <li
            key={idx + 1}
            className={`page-item ${page_number === idx + 1 ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(idx + 1)}>
              {idx + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${!has_next ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleNext}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

