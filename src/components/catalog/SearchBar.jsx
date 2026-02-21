import useStore from "../../store/catalogStore";

export default function SearchBar() {
  const { search, setSearch } = useStore();

  return (
    <div className='relative w-full'>
      <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
        <svg
          className='w-4 h-4 transition-colors duration-200'
          style={{ color: search ? "#1A3A8F" : "#9ca3af" }}
          fill='none'
          stroke='currentColor'
          strokeWidth={2.5}
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z'
          />
        </svg>
      </div>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Buscar productos, materiales...'
        className='w-full pl-11 pr-10 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 bg-white'
        style={{
          borderColor: search ? "#1A3A8F" : "#e5e7eb",
          boxShadow: search ? "0 0 0 3px rgba(26,58,143,0.1)" : "none",
          color: "#1A3A8F",
        }}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className='absolute inset-y-0 right-3 flex items-center'
          aria-label='Limpiar búsqueda'
        >
          <svg
            className='w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors'
            fill='none'
            stroke='currentColor'
            strokeWidth={2.5}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
    </div>
  );
}
