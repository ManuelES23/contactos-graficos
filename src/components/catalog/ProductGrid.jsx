import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES } from "../../data/products";
import useStore from "../../store/catalogStore";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

export default function ProductGrid() {
  const { isLoading, viewMode } = useStore();

  const filteredProducts = useStore((s) => s.filteredProducts);
  const currentPage = useStore((s) => s.currentPage);
  const itemsPerPage = useStore((s) => s.itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filteredProducts.slice(start, start + itemsPerPage);

  const skeletonCount = itemsPerPage;

  if (isLoading) {
    return (
      <div className={gridClass(viewMode)}>
        {[...Array(skeletonCount)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (paginated.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col items-center justify-center py-24 text-center'
      >
        <div
          className='w-20 h-20 rounded-full flex items-center justify-center mb-5'
          style={{ backgroundColor: "#e8eeff" }}
        >
          <svg
            className='w-10 h-10'
            fill='none'
            stroke='#1A3A8F'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>
        <h3
          className='font-heading font-bold text-xl mb-2'
          style={{ color: "#1A3A8F" }}
        >
          No encontramos productos
        </h3>
        <p className='text-gray-500 text-sm max-w-xs'>
          Prueba con otros términos de búsqueda o ajusta los filtros aplicados.
        </p>
      </motion.div>
    );
  }

  if (viewMode === "list") {
    return (
      <motion.div layout className='flex flex-col gap-4'>
        <AnimatePresence mode='popLayout'>
          {paginated.map((product, i) => (
            <ListCard key={product.id} product={product} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div layout className={gridClass(viewMode)}>
      <AnimatePresence mode='popLayout'>
        {paginated.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function gridClass(viewMode) {
  if (viewMode === "list") return "flex flex-col gap-4";
  return "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5";
}

function ListCard({ product, index }) {
  const { openModal, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className='group flex gap-4 rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4'
    >
      <div className='w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100'>
        <img
          src={product.images[0]}
          alt={product.name}
          loading='lazy'
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
      </div>
      <div className='flex flex-1 flex-col gap-1 min-w-0'>
        <h3
          className='font-heading font-bold text-sm leading-tight line-clamp-1'
          style={{ color: "#1A3A8F" }}
        >
          {product.name}
        </h3>
        <p className='text-xs text-gray-500 line-clamp-1'>
          {product.shortDesc}
        </p>
        <p
          className='font-heading font-black text-base mt-auto'
          style={{ color: "#1A3A8F" }}
        >
          Desde ${product.price.toLocaleString()}
        </p>
      </div>
      <div className='flex items-center gap-2 shrink-0'>
        <button
          onClick={() => toggleWishlist(product.id)}
          className='w-8 h-8 rounded-lg border flex items-center justify-center hover:border-blue-300 transition-colors'
          style={{ borderColor: isWishlisted ? "#1A3A8F" : "#e5e7eb" }}
        >
          <svg
            className='w-4 h-4'
            fill={isWishlisted ? "#1A3A8F" : "none"}
            stroke={isWishlisted ? "#1A3A8F" : "#4A4A4A"}
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>
        </button>
        <button
          onClick={() => openModal(product)}
          className='px-4 py-2 rounded-xl text-xs font-semibold text-white hover:scale-105 transition-transform'
          style={{ backgroundColor: "#1A3A8F" }}
        >
          Cotizar
        </button>
      </div>
    </motion.article>
  );
}
