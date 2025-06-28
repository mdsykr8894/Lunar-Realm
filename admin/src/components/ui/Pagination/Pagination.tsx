import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

const PaginationButton: React.FC<{
  disabled?: boolean;
  onClick?: () => void;
  active?: boolean;
  children: React.ReactNode;
}> = ({ disabled, onClick, active, children }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    aria-current={active ? "page" : undefined}
    className={`text-sm px-3 py-1 rounded-md mx-1
      bg-transparent text-gray-300
      ${
        active
          ? "font-semibold text-white border border-white hover:bg-white/10"
          : "hover:text-white"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}
  >
    {children}
  </button>
);

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPageButtons = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    const showEllipsis = totalPages > maxPageButtons + 2;
    const sideButtons = Math.floor(maxPageButtons / 2);

    const start = Math.max(2, currentPage - sideButtons);
    const end = Math.min(totalPages - 1, currentPage + sideButtons);

    pages.push(1); // Always show first page

    if (showEllipsis && start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showEllipsis && end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex justify-end items-center gap-2
        bg-[#1b1b1f]
        border-t-2 border-[#161618]
        rounded-t-none rounded-b-xl
        px-6 py-4 text-gray-300 text-sm
        -mt-[1px]"
    >
      <span className="text-gray-300/50 mr-2">
        {currentPage} of {totalPages}
      </span>

      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className={`p-1 rounded-md text-gray-300 transition-colors ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-white cursor-pointer"
        }`}
        style={{ lineHeight: 0 }}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="mx-1 text-gray-500">
            ...
          </span>
        ) : (
          <PaginationButton
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
          >
            {page}
          </PaginationButton>
        )
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className={`p-1 rounded-md text-gray-300 transition-colors ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-white cursor-pointer"
        }`}
        style={{ lineHeight: 0 }}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
