// src/design-system/molecules/Pagination/Pagination.jsx
export default function Pagination({ page, totalPages, onPageChange }) {
//   if (totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between mt-4 text-sm">
      <span>
        Halaman {page} dari {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
          className={`px-3 py-1 rounded border ${
            canPrev
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Sebelumnya
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
          className={`px-3 py-1 rounded border ${
            canNext
              ? "bg-white hover:bg-gray-100"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
