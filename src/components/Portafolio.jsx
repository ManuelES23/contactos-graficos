import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n/translations";

// Category keys in Spanish for filtering (must match data)
const categoriasSP = [
  "Todos",
  "Diseño",
  "Impresión",
  "Adhesivos",
  "Señalética",
];

const proyectosBase = [
  { id: 1, categoriaIdx: 1, img: "https://picsum.photos/seed/cg1/600/400" },
  { id: 2, categoriaIdx: 2, img: "https://picsum.photos/seed/cg2/600/400" },
  { id: 3, categoriaIdx: 3, img: "https://picsum.photos/seed/cg3/600/400" },
  { id: 4, categoriaIdx: 1, img: "https://picsum.photos/seed/cg4/600/400" },
  { id: 5, categoriaIdx: 4, img: "https://picsum.photos/seed/cg5/600/400" },
  { id: 6, categoriaIdx: 2, img: "https://picsum.photos/seed/cg6/600/400" },
  { id: 7, categoriaIdx: 3, img: "https://picsum.photos/seed/cg7/600/400" },
  { id: 8, categoriaIdx: 4, img: "https://picsum.photos/seed/cg8/600/400" },
  { id: 9, categoriaIdx: 1, img: "https://picsum.photos/seed/cg9/600/400" },
];

export default function Portafolio() {
  const [activoIdx, setActivoIdx] = useState(0);
  const { lang } = useLang();
  const tr = t[lang].portafolio;

  const proyectos = proyectosBase.map((p, i) => ({
    ...p,
    titulo: tr.proyectos[i]?.titulo ?? "",
    descripcion: tr.proyectos[i]?.descripcion ?? "",
    categoria: categoriasSP[p.categoriaIdx],
    categoriaLabel: tr.categorias[p.categoriaIdx],
  }));

  const filtrados =
    activoIdx === 0
      ? proyectos
      : proyectos.filter((p) => p.categoriaIdx === activoIdx);

  return (
    <section
      id='portafolio'
      className='py-24'
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <div
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4'
            style={{ backgroundColor: "#e8eeff", color: "#1A3A8F" }}
          >
            <span
              className='w-1.5 h-1.5 rounded-full'
              style={{ backgroundColor: "#2ECC40" }}
            />
            {tr.badge}
          </div>
          <h2
            className='font-heading font-black text-4xl sm:text-5xl mb-4'
            style={{ color: "#1A3A8F" }}
          >
            {tr.title1}
            <br />
            <span style={{ color: "#2ECC40" }}>{tr.title2}</span>
          </h2>
          <p className='text-gray-500 text-lg max-w-xl mx-auto'>{tr.sub}</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-wrap justify-center gap-3 mb-10'
        >
          {tr.categorias.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActivoIdx(idx)}
              className='px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300'
              style={
                activoIdx === idx
                  ? { backgroundColor: "#1A3A8F", color: "#fff" }
                  : {
                      backgroundColor: "#fff",
                      color: "#1A3A8F",
                      border: "1px solid #e0e0e0",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Swiper para mobile, grid para desktop */}
        <div className='hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5'>
          <AnimatePresence mode='popLayout'>
            {filtrados.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className='group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-4/3 cursor-pointer'
              >
                <img
                  src={p.img}
                  alt={p.titulo}
                  loading='lazy'
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                {/* Overlay */}
                <div
                  className='absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,34,96,0.92) 0%, rgba(13,34,96,0.4) 60%, transparent 100%)",
                  }}
                >
                  <span
                    className='text-xs font-semibold px-2.5 py-1 rounded-full mb-2 self-start'
                    style={{ backgroundColor: "#2ECC40", color: "#fff" }}
                  >
                    {p.categoriaLabel}
                  </span>
                  <h3 className='font-heading font-bold text-white text-sm leading-tight'>
                    {p.titulo}
                  </h3>
                  <p className='text-white/70 text-xs mt-1'>{p.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile swiper */}
        <div className='md:hidden'>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className='pb-10'
          >
            {filtrados.map((p) => (
              <SwiperSlide key={p.id}>
                <div className='rounded-2xl overflow-hidden shadow-md aspect-4/3 relative'>
                  <img
                    src={p.img}
                    alt={p.titulo}
                    loading='lazy'
                    className='w-full h-full object-cover'
                  />
                  <div
                    className='absolute bottom-0 left-0 right-0 p-4'
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,34,96,0.85), transparent)",
                    }}
                  >
                    <span
                      className='text-xs font-semibold px-2 py-0.5 rounded-full mr-2'
                      style={{ backgroundColor: "#2ECC40", color: "#fff" }}
                    >
                      {p.categoriaLabel}
                    </span>
                    <span className='text-white text-sm font-bold'>
                      {p.titulo}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mt-12'
        >
          <a
            href='#contacto'
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contacto")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className='inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg'
            style={{ backgroundColor: "#1A3A8F" }}
          >
            Ver más trabajos
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
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
