'use client';
import { useEffect, useState } from 'react';

function getDisplayedPages(
  currentPage: number,
  totalPages: number,
  showAll: boolean
): (number | string)[] {
  const maxVisible = 3;
  if (showAll) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, currentPage + 1);

  if (currentPage === 1) {
    end = Math.min(totalPages, start + (maxVisible - 1));
  } else if (currentPage === totalPages) {
    start = Math.max(1, end - (maxVisible - 1));
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) pages.push('...');

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const pages = getDisplayedPages(currentPage, totalPages, showAll);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 items-center hover:brightness-105">
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="px-3 py-1 border rounded cursor-pointer"
          style={{
            backgroundColor: '#97ce4c',
          }}
        >
          ← Volver a vista reducida
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        ← Prev
      </button>

      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded cursor-pointer`}
            style={{
              backgroundColor:
                page === currentPage ? '#97ce4c' : undefined,
            }}
          >
            {page}
          </button>
        ) : (
          <button
            key={`ellipsis-${idx}`}
            onClick={() => setShowAll(true)}
            className="px-3 py-1 border rounded cursor-pointer"
          >
            ...
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
}
