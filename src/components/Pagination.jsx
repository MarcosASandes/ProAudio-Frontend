/*import React, { useState } from "react";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import "../styles/products.css";

const Pagination = () => {
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        <ChevronsLeft size={16} />
      </button>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => goToPage(num)}
          className={num === currentPage ? "active" : ""}
        >
          {num}
        </button>
      ))}

      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        <ChevronRight size={16} />
      </button>
      <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;*/


/*--------------------------------------- */

// components/Pagination.jsx



/*import React from "react";

const Pagination = () => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center my-4">
        <li className="page-item disabled">
          <button className="page-link">Anterior</button>
        </li>
        <li className="page-item active">
          <button className="page-link">1</button>
        </li>
        <li className="page-item">
          <button className="page-link">2</button>
        </li>
        <li className="page-item">
          <button className="page-link">3</button>
        </li>
        <li className="page-item">
          <button className="page-link">Siguiente</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;*/


/*----------------------- */

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

