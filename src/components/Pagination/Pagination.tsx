import { cls } from "@/utils/helpers";
import React, { memo } from "react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  className?: string;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  totalItems: number;
}

export const Pagination = memo(
  ({ className, setOffset, offset, totalItems }: PaginationProps) => {
    const handleNextPage = () => {
      setOffset((prev) => prev + 50);
    };

    const handlePrevPage = () => {
      setOffset((prev) => prev - 50);
    };

    return (
      <div className={cls([styles.Pagination, className])}>
        <button
          disabled={offset === 0}
          onClick={handlePrevPage}
          className={styles.buttonPrev}
        >
          Back
        </button>
        <button
          disabled={totalItems < 50}
          onClick={handleNextPage}
          className={styles.buttonPrev}
        >
          Next
        </button>
      </div>
    );
  },
);
