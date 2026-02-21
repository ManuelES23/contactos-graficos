import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, MATERIALS, SIZES } from "../../data/products";
import useStore from "../../store/catalogStore";
import PriceRangeSlider from "./PriceRangeSlider";

function SectionTitle({ children }) {
  return (
    <h3
      className='font-heading font-bold text-sm uppercase tracking-widest mb-3'
      style={{ color: "#1A3A8F" }}
    >
      {children}
    </h3>
  );
}

function Divider() {
  return <div className='my-5 h-px' style={{ backgroundColor: "#f0f0f0" }} />;
}

function SidebarContent() {
  const {
    category,
    setCategory,
    selectedMaterials,
    toggleMaterial,
    selectedSizes,
    toggleSize,
    categoryCounts,
    clearFilters,
    simulateLoading,
  } = useStore();

  const handleCategory = (id) => {
    simulateLoading();
    setCategory(id);
  };

  const hasFilters =
    category !== "todos" ||
    selectedMaterials.length > 0 ||
    selectedSizes.length > 0;

  return (
    <div className='p-5'>
      {/* Header */}
      <div className='flex items-center justify-between mb-5'>
        <h2
          className='font-heading font-bold text-base'
          style={{ color: "#1A3A8F" }}
        >
          Filtros
        </h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className='text-xs font-medium transition-colors duration-200 flex items-center gap-1'
            style={{ color: "#2ECC40" }}
          >
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              stroke='currentColor'
              strokeWidth={2.5}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
              />
            </svg>
            Limpiar
          </button>
        )}
      </div>

      {/* Categorías */}
      <SectionTitle>Categorías</SectionTitle>
      <ul className='space-y-1'>
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <li key={cat.id}>
              <button
                onClick={() => handleCategory(cat.id)}
                className='w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200'
                style={
                  isActive
                    ? { backgroundColor: "#e8eeff", color: "#1A3A8F" }
                    : { color: "#4A4A4A" }
                }
              >
                <span className='flex items-center gap-2'>
                  {isActive && (
                    <span
                      className='w-1.5 h-1.5 rounded-full'
                      style={{ backgroundColor: "#2ECC40" }}
                    />
                  )}
                  {cat.label}
                </span>
                <span
                  className='text-xs px-1.5 py-0.5 rounded-full'
                  style={{ backgroundColor: "#f0f0f0", color: "#4A4A4A" }}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Divider />

      {/* Rango de precio */}
      <SectionTitle>Rango de Precio</SectionTitle>
      <PriceRangeSlider />

      <Divider />

      {/* Material */}
      <SectionTitle>Material</SectionTitle>
      <div className='flex flex-wrap gap-2'>
        {MATERIALS.map((mat) => {
          const isActive = selectedMaterials.includes(mat);
          return (
            <button
              key={mat}
              onClick={() => toggleMaterial(mat)}
              className='px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border'
              style={
                isActive
                  ? {
                      backgroundColor: "#1A3A8F",
                      color: "#fff",
                      borderColor: "#1A3A8F",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "#4A4A4A",
                      borderColor: "#e5e7eb",
                    }
              }
            >
              {mat}
            </button>
          );
        })}
      </div>

      <Divider />

      {/* Tamaño */}
      <SectionTitle>Tamaño</SectionTitle>
      <div className='space-y-2'>
        {SIZES.map((size) => {
          const isChecked = selectedSizes.includes(size);
          return (
            <label
              key={size}
              className='flex items-center gap-3 cursor-pointer group'
            >
              <span
                className='w-4 h-4 rounded flex items-center justify-center border-2 transition-all duration-150 shrink-0'
                style={
                  isChecked
                    ? { backgroundColor: "#1A3A8F", borderColor: "#1A3A8F" }
                    : { backgroundColor: "#fff", borderColor: "#d1d5db" }
                }
                onClick={() => toggleSize(size)}
              >
                {isChecked && (
                  <svg
                    className='w-2.5 h-2.5 text-white'
                    fill='currentColor'
                    viewBox='0 0 12 12'
                  >
                    <path d='M10 3L5 8.5 2 5.5l-1 1 4 4 6-7z' />
                  </svg>
                )}
              </span>
              <span
                className='text-sm transition-colors cursor-pointer'
                style={{ color: isChecked ? "#1A3A8F" : "#4A4A4A" }}
                onClick={() => toggleSize(size)}
              >
                {size}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterSidebar() {
  const { sidebarOpen, setSidebarOpen } = useStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className='hidden lg:block w-64 shrink-0'>
        <div className='sticky top-24 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden'>
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key='backdrop'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-40 bg-black/30 lg:hidden'
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key='drawer'
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className='fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl overflow-y-auto lg:hidden'
            >
              {/* Close button */}
              <div className='flex justify-end p-4 border-b border-gray-100'>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
                  aria-label='Cerrar filtros'
                >
                  <svg
                    className='w-5 h-5'
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
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
