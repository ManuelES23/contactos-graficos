import { motion } from "framer-motion";
import useStore from "../../store/catalogStore";

export default function Pagination() {
  const { currentPage, setCurrentPage, totalPages, simulateLoading } =
    useStore();

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    simulateLoading();
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const pages = buildPageList(currentPage, totalPages);

  return (
    <div className='flex items-center justify-center gap-1.5 mt-10'>
      {/* Prev */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-300'
        style={{ borderColor: "#e5e7eb" }}
        aria-label='Página anterior'
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.5}
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 19l-7-7 7-7'
          />
        </svg>
      </button>

      {pages.map((page, i) =>
        page === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className='w-9 h-9 flex items-center justify-center text-sm text-gray-400'
          >
            …
          </span>
        ) : (
          <motion.button
            key={page}
            onClick={() => handlePageChange(page)}
            whileTap={{ scale: 0.9 }}
            className='w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200'
            style={
              page === currentPage
                ? { backgroundColor: "#1A3A8F", color: "#fff" }
                : { backgroundColor: "#F5F5F5", color: "#4A4A4A" }
            }
          >
            {page}
          </motion.button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-300'
        style={{ borderColor: "#e5e7eb" }}
        aria-label='Página siguiente'
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.5}
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </button>
    </div>
  );
}

function buildPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3)
    return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}
