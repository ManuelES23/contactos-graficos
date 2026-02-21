import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "../../data/products";
import useStore from "../../store/catalogStore";

export default function ProductModal() {
  const {
    modalOpen,
    selectedProduct: p,
    closeModal,
    toggleWishlist,
    wishlist,
  } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  const isWishlisted = p ? wishlist.includes(p.id) : false;
  const catInfo = p
    ? CATEGORIES.find((c) => c.id === p.category) || CATEGORIES[0]
    : null;

  // Reset state when product changes
  useEffect(() => {
    if (p) {
      setActiveImg(0);
      setQty(1);
    }
  }, [p]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <AnimatePresence>
      {modalOpen && p && (
        <>
          {/* Backdrop */}
          <motion.div
            key='modal-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
            onClick={closeModal}
          />

          {/* Panel */}
          <motion.div
            key='modal-panel'
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'
          >
            <div
              className='relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className='absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors'
                aria-label='Cerrar'
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              <div className='grid md:grid-cols-2 gap-0'>
                {/* LEFT: Image gallery */}
                <div className='p-6 md:p-7'>
                  {/* Main image */}
                  <div className='rounded-2xl overflow-hidden aspect-4/3 bg-gray-100 mb-3'>
                    <motion.img
                      key={activeImg}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      src={p.images[activeImg]}
                      alt={p.name}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Thumbnails */}
                  {p.images.length > 1 && (
                    <div className='flex gap-2'>
                      {p.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className='rounded-xl overflow-hidden border-2 transition-all duration-200 w-16 h-12'
                          style={{
                            borderColor:
                              activeImg === i ? "#1A3A8F" : "transparent",
                          }}
                        >
                          <img
                            src={img}
                            alt={`Vista ${i + 1}`}
                            className='w-full h-full object-cover'
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT: Info */}
                <div className='p-6 md:p-7 md:pl-0 flex flex-col'>
                  {/* Badges */}
                  <div className='flex gap-2 mb-3'>
                    <span
                      className='text-xs font-semibold px-2.5 py-1 rounded-full'
                      style={{
                        backgroundColor: catInfo.bg,
                        color: catInfo.color,
                      }}
                    >
                      {catInfo.label}
                    </span>
                    {p.isNew && (
                      <span
                        className='text-xs font-bold px-2.5 py-1 rounded-full text-white'
                        style={{ backgroundColor: "#2ECC40" }}
                      >
                        Nuevo
                      </span>
                    )}
                    {p.isPopular && (
                      <span
                        className='text-xs font-bold px-2.5 py-1 rounded-full text-white'
                        style={{ backgroundColor: "#1A3A8F" }}
                      >
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2
                    className='font-heading font-black text-2xl leading-tight mb-2'
                    style={{ color: "#1A3A8F" }}
                  >
                    {p.name}
                  </h2>

                  {/* Description */}
                  <p className='text-sm text-gray-600 leading-relaxed mb-5'>
                    {p.description}
                  </p>

                  {/* Specs table */}
                  <div className='rounded-xl overflow-hidden border border-gray-100 mb-5'>
                    <table className='w-full text-sm'>
                      <tbody>
                        {Object.entries(p.specs).map(([key, val], i) => (
                          <tr
                            key={key}
                            style={{
                              backgroundColor:
                                i % 2 === 0 ? "#F5F5F5" : "#ffffff",
                            }}
                          >
                            <td
                              className='px-4 py-2.5 font-semibold w-2/5 text-xs uppercase tracking-wide'
                              style={{ color: "#1A3A8F" }}
                            >
                              {key}
                            </td>
                            <td className='px-4 py-2.5 text-gray-600'>{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Price + qty */}
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <span className='text-xs text-gray-400'>
                        Precio desde
                      </span>
                      <p
                        className='font-heading font-black text-3xl'
                        style={{ color: "#1A3A8F" }}
                      >
                        ${p.price.toLocaleString()}
                      </p>
                    </div>
                    {/* Quantity */}
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-blue-300 transition-colors'
                      >
                        <svg
                          className='w-3.5 h-3.5'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={3}
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M20 12H4'
                          />
                        </svg>
                      </button>
                      <span
                        className='w-8 text-center font-semibold text-sm'
                        style={{ color: "#1A3A8F" }}
                      >
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className='w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-blue-300 transition-colors'
                      >
                        <svg
                          className='w-3.5 h-3.5'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={3}
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M12 4v16m8-8H4'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className='flex flex-col gap-3 mt-auto'>
                    <a
                      href={`https://wa.me/50212345678?text=Hola, quiero cotizar: ${encodeURIComponent(p.name)} x${qty}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
                      style={{ backgroundColor: "#2ECC40" }}
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
                      </svg>
                      Solicitar cotización vía WhatsApp
                    </a>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className='flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:scale-[1.01]'
                      style={
                        isWishlisted
                          ? {
                              borderColor: "#1A3A8F",
                              color: "#1A3A8F",
                              backgroundColor: "#e8eeff",
                            }
                          : { borderColor: "#e5e7eb", color: "#4A4A4A" }
                      }
                    >
                      <svg
                        className='w-4 h-4'
                        fill={isWishlisted ? "#1A3A8F" : "none"}
                        stroke={isWishlisted ? "#1A3A8F" : "currentColor"}
                        strokeWidth={2}
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                        />
                      </svg>
                      {isWishlisted
                        ? "En tu lista de interés"
                        : "Agregar a lista de interés"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
