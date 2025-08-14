import React from "react";
import styles from "../../styles/clients/clientPagination.module.css";

const ProjectPagination = ({ pageable, onPageChange }) => {
  if (!pageable) return null;

  const { page_number, total_pages, has_previous, has_next } = pageable;
  const currentPageOneBased = page_number + 1;

  const handlePrevious = () => {
    if (has_previous) onPageChange(currentPageOneBased - 1);
  };

  const handleNext = () => {
    if (has_next) onPageChange(currentPageOneBased + 1);
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
            key={idx}
            className={`${styles.pageItem} ${
              currentPageOneBased === idx + 1 ? styles.active : ""
            }`}
          >
            <button
              className={styles.pageLink}
              onClick={() => onPageChange(idx + 1)}
              aria-current={currentPageOneBased === idx + 1 ? "page" : undefined}
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

export default ProjectPagination;
