import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../../data/products";
import useStore from "../../store/catalogStore";

export default function ProductCard({ product, index = 0 }) {
  const { openModal, toggleWishlist, wishlist } = useStore();
  const [imgLoaded, setImgLoaded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const catInfo =
    CATEGORIES.find((c) => c.id === product.category) || CATEGORIES[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className='group relative flex flex-col rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
    >
      {/* Image */}
      <div className='relative overflow-hidden aspect-4/3 bg-gray-100'>
        {!imgLoaded && (
          <div className='absolute inset-0 bg-gray-200 animate-pulse' />
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          loading='lazy'
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Hover overlay */}
        <div
          className='absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          style={{
            background:
              "linear-gradient(to top, rgba(13,34,96,0.75) 0%, rgba(26,58,143,0.3) 100%)",
          }}
        >
          <button
            onClick={() => openModal(product)}
            className='px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 translate-y-3 group-hover:translate-y-0'
            style={{ backgroundColor: "#2ECC40" }}
          >
            Cotizar ahora
          </button>
          <button
            onClick={() => openModal(product)}
            className='px-5 py-2 rounded-xl font-medium text-sm text-white border border-white/40 transition-all duration-200 hover:border-white translate-y-3 group-hover:translate-y-0 delay-75'
          >
            Ver detalles
          </button>
        </div>

        {/* Wishlist btn */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className='absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200 opacity-0 group-hover:opacity-100'
          aria-label='Agregar a favoritos'
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

        {/* Badges */}
        <div className='absolute top-3 left-3 flex flex-col gap-1.5'>
          {product.isNew && (
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                delay: index * 0.05 + 0.2,
              }}
              className='text-xs font-bold px-2 py-0.5 rounded-full text-white'
              style={{ backgroundColor: "#2ECC40" }}
            >
              Nuevo
            </motion.span>
          )}
          {product.isPopular && !product.isNew && (
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                delay: index * 0.05 + 0.2,
              }}
              className='text-xs font-bold px-2 py-0.5 rounded-full text-white'
              style={{ backgroundColor: "#1A3A8F" }}
            >
              Popular
            </motion.span>
          )}
        </div>

        {/* Bottom green line */}
        <div
          className='absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-out'
          style={{ backgroundColor: "#2ECC40" }}
        />
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-4'>
        {/* Category badge */}
        <span
          className='self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3'
          style={{ backgroundColor: catInfo.bg, color: catInfo.color }}
        >
          {catInfo.label}
        </span>

        <h3
          className='font-heading font-bold text-base leading-snug mb-1.5 line-clamp-2'
          style={{ color: "#1A3A8F" }}
        >
          {product.name}
        </h3>
        <p className='text-sm text-gray-500 line-clamp-1 mb-4 flex-1'>
          {product.shortDesc}
        </p>

        <div className='flex items-center justify-between gap-2 mt-auto'>
          <div>
            <span className='text-xs text-gray-400'>Desde</span>
            <p
              className='font-heading font-black text-lg leading-none'
              style={{ color: "#1A3A8F" }}
            >
              ${product.price.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => openModal(product)}
            className='shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95'
            style={{ backgroundColor: "#1A3A8F" }}
          >
            Cotizar
          </button>
        </div>
      </div>
    </motion.article>
  );
}
