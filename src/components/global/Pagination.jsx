/*import React from "react";

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

export default Pagination;*/


/*---------------------------------------------------- */


import React from "react";
import styles from "../../styles/generic/pagination.module.css";

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
    <nav aria-label="Page navigation" className={styles.nav}>
      <ul className={styles.pagination}>
        <li className={`${styles.pageItem} ${!has_previous ? styles.disabled : ""}`}>
          <button
            className={styles.pageLink}
            onClick={handlePrevious}
            disabled={!has_previous}
            aria-label="Página anterior"
          >
            Anterior
          </button>
        </li>

        {Array.from({ length: total_pages }).map((_, idx) => (
          <li
            key={idx + 1}
            className={`${styles.pageItem} ${page_number === idx + 1 ? styles.active : ""}`}
          >
            <button
              className={styles.pageLink}
              onClick={() => onPageChange(idx + 1)}
              aria-current={page_number === idx + 1 ? "page" : undefined}
            >
              {idx + 1}
            </button>
          </li>
        ))}

        <li className={`${styles.pageItem} ${!has_next ? styles.disabled : ""}`}>
          <button
            className={styles.pageLink}
            onClick={handleNext}
            disabled={!has_next}
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

