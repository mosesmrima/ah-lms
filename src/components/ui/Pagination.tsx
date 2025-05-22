import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow && totalPages >= maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className={`flex items-center justify-center space-x-1 sm:space-x-2 text-sm text-neutral-400 !border-b-0 ${className}`} style={{ borderBottom: 'none !important' }}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-1 sm:p-2 rounded-md hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors duration-200"
        aria-label="First page"
      >
        <ChevronDoubleLeftIcon className="h-5 w-5" />
        <span className="ml-1 hidden sm:inline">First</span>
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-1 sm:p-2 rounded-md hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {startPage > 1 && (
        <span className="px-3 py-2">...</span>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md min-w-[32px] sm:min-w-[40px] text-sm sm:text-base ${
            currentPage === number 
              ? 'bg-[#E7343A] text-white' 
              : 'hover:bg-neutral-700/50 transition-colors duration-200'
          }`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <span className="px-3 py-2">...</span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 rounded-md hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Next page"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-1 sm:p-2 rounded-md hover:bg-neutral-700/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors duration-200"
        aria-label="Last page"
      >
        <span className="mr-1 hidden sm:inline">Last</span>
        <ChevronDoubleRightIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Pagination;
