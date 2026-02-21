import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useStore from "../store/catalogStore";
import FilterSidebar from "../components/catalog/FilterSidebar";
import FilterChips from "../components/catalog/FilterChips";
import SearchBar from "../components/catalog/SearchBar";
import ProductGrid from "../components/catalog/ProductGrid";
import ProductModal from "../components/catalog/ProductModal";
import Pagination from "../components/catalog/Pagination";

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "nuevo", label: "Más reciente" },
];

export default function Catalogo() {
  const {
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    setSidebarOpen,
    filteredProducts,
    currentPage,
    itemsPerPage,
    clearFilters,
  } = useStore();

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, filteredProducts.length);
  const total = filteredProducts.length;

  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <ProductModal />

      <div className='min-h-screen' style={{ backgroundColor: "#F5F5F5" }}>
        {/* ── BANNER HEADER ─────────────────────────────────────────── */}
        <section
          className='relative pt-28 pb-14 overflow-hidden'
          style={{
            background: "linear-gradient(135deg, #1A3A8F 0%, #0D2260 100%)",
          }}
        >
          {/* Dots pattern */}
          <div
            className='absolute inset-0 opacity-10'
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Decorative circle */}
          <div
            className='absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10'
            style={{
              background: "radial-gradient(circle, #2ECC40, transparent)",
            }}
          />

          <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='flex items-center gap-2 text-sm text-white/50 mb-5'
              aria-label='Breadcrumb'
            >
              <Link to='/' className='hover:text-white transition-colors'>
                Inicio
              </Link>
              <span>/</span>
              <span className='text-white font-medium'>Productos</span>
            </motion.nav>

            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Green decorative line */}
                <div
                  className='w-12 h-1 rounded-full mb-4'
                  style={{ backgroundColor: "#2ECC40" }}
                />
                <h1 className='font-heading font-black text-4xl sm:text-5xl text-white mb-3'>
                  Nuestros Productos
                </h1>
                <p className='text-white/60 text-base max-w-lg leading-relaxed'>
                  Explora nuestro catálogo completo de soluciones gráficas,
                  adhesivos, señalética e impresión de alta calidad para tu
                  empresa.
                </p>
              </motion.div>

              {/* Stats pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className='shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3'
              >
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center'
                  style={{ backgroundColor: "rgba(46,204,64,0.2)" }}
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='#2ECC40'
                    strokeWidth={2.5}
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                    />
                  </svg>
                </div>
                <div>
                  <p className='font-heading font-black text-2xl text-white leading-none'>
                    {total}
                  </p>
                  <p className='text-white/50 text-xs'>Productos disponibles</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ──────────────────────────────────────────── */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <div className='flex gap-7'>
            {/* Sidebar */}
            <FilterSidebar />

            {/* Right Column */}
            <div className='flex-1 min-w-0'>
              {/* Top toolbar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6'
              >
                {/* Search + Sort + View toggle */}
                <div className='flex flex-wrap items-center gap-3 mb-4'>
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className='lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors shrink-0'
                    style={{ borderColor: "#e5e7eb", color: "#1A3A8F" }}
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
                        d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
                      />
                    </svg>
                    Filtros
                  </button>

                  {/* Search */}
                  <div className='flex-1 min-w-48'>
                    <SearchBar />
                  </div>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='px-3 py-2.5 rounded-xl border text-sm outline-none cursor-pointer bg-white transition-all duration-200 shrink-0'
                    style={{ borderColor: "#e5e7eb", color: "#1A3A8F" }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  {/* View toggle */}
                  <div
                    className='flex rounded-xl border overflow-hidden shrink-0'
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    <button
                      onClick={() => setViewMode("grid")}
                      className='px-3 py-2.5 transition-colors duration-200'
                      style={
                        viewMode === "grid"
                          ? { backgroundColor: "#1A3A8F", color: "#fff" }
                          : { color: "#4A4A4A" }
                      }
                      aria-label='Vista cuadrícula'
                    >
                      <svg
                        className='w-4 h-4'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z' />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className='px-3 py-2.5 transition-colors duration-200'
                      style={
                        viewMode === "list"
                          ? { backgroundColor: "#1A3A8F", color: "#fff" }
                          : { color: "#4A4A4A" }
                      }
                      aria-label='Vista lista'
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
                          d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Filter chips */}
                <FilterChips />
              </motion.div>

              {/* Results counter */}
              <div className='flex items-center justify-between mb-5 px-1'>
                <p className='text-sm text-gray-500'>
                  {total > 0
                    ? `Mostrando ${start}–${end} de ${total} producto${total !== 1 ? "s" : ""}`
                    : "Sin resultados"}
                </p>
                {total !== 24 && (
                  <button
                    onClick={clearFilters}
                    className='text-xs font-medium flex items-center gap-1 transition-colors'
                    style={{ color: "#2ECC40" }}
                  >
                    <svg
                      className='w-3 h-3'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth={3}
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                    Limpiar filtros
                  </button>
                )}
              </div>

              {/* Product grid */}
              <ProductGrid />

              {/* Pagination */}
              <Pagination />
            </div>
          </div>

          {/* ── CUSTOM CTA BANNER ─────────────────────────────────── */}
          <motion.div
            ref={bannerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={bannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className='mt-16 rounded-3xl overflow-hidden relative'
            style={{
              background: "linear-gradient(135deg, #0D2260 0%, #1A3A8F 100%)",
            }}
          >
            {/* Dots */}
            <div
              className='absolute inset-0 opacity-10'
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className='relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-10 sm:px-12'>
              <div>
                {/* Green line */}
                <div
                  className='w-10 h-1 rounded-full mb-4'
                  style={{ backgroundColor: "#2ECC40" }}
                />
                <h2 className='font-heading font-black text-2xl sm:text-3xl text-white mb-2'>
                  ¿No encuentras lo que buscas?
                </h2>
                <p className='text-white/60 text-sm leading-relaxed max-w-md'>
                  Trabajamos diseños completamente personalizados para tu
                  negocio. Cuéntanos tu idea y la hacemos realidad.
                </p>
              </div>
              <a
                href='https://wa.me/50212345678?text=Hola, quiero solicitar un diseño personalizado'
                target='_blank'
                rel='noopener noreferrer'
                className='shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl'
                style={{ backgroundColor: "#2ECC40" }}
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                </svg>
                Solicitar diseño personalizado
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
