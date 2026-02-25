import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n/translations";

const testimonios = [
  {
    nombre: "Carlos Méndez",
    empresa: "Distribuidora Méndez & Hijos",
    comentario:
      "Trabajar con Contactos Gráficos transformó la imagen de nuestra empresa. El diseño del branding corporativo superó todas nuestras expectativas. Profesionales de primer nivel.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=11",
  },
  {
    nombre: "Laura Vásquez",
    empresa: "Boutique La Elegance",
    comentario:
      "Los adhesivos y viniles para nuestra tienda quedaron espectaculares. Llegaron en el tiempo prometido y la calidad del material es excelente. ¡100% recomendados!",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    nombre: "Roberto Paredes",
    empresa: "Constructora Alfa",
    comentario:
      "Contratamos el servicio de señalética para toda nuestra planta y el resultado fue impresionante. Proceso muy ordenado, precios justos y excelente atención al cliente.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=3",
  },
  {
    nombre: "María Jiménez",
    empresa: "Café Aroma Fresco",
    comentario:
      "El catálogo impreso para nuestra nueva temporada quedó hermoso. Colores vivos, papel de calidad y terminados perfectos. Ya lo hemos imprimido tres veces con ellos.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=9",
  },
  {
    nombre: "Andrés Torres",
    empresa: "Tech Startups SAS",
    comentario:
      "Desde el primer contacto hasta la entrega, una experiencia de 10/10. Nos ayudaron a darle vida visual a nuestra startup. El manual de marca es impecable.",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=7",
  },
];

function Stars({ count }) {
  return (
    <div className='flex gap-1 mb-4'>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className='w-4 h-4'
          fill={i < count ? "#2ECC40" : "#e0e0e0"}
          viewBox='0 0 20 20'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonios() {
  const { lang } = useLang();
  const tr = t[lang].testimonios;
  return (
    <section className='py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'
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

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className='pb-12'
        >
          {testimonios.map((t) => (
            <SwiperSlide key={t.nombre}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='bg-white rounded-2xl p-7 shadow-sm border border-gray-100 h-full flex flex-col'
              >
                {/* Quote icon */}
                <div className='mb-4'>
                  <svg
                    className='w-8 h-8 opacity-20'
                    fill='#1A3A8F'
                    viewBox='0 0 24 24'
                  >
                    <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                  </svg>
                </div>

                <Stars count={t.rating} />

                <p className='text-gray-600 text-sm leading-relaxed flex-1 mb-6'>
                  "{t.comentario}"
                </p>

                <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
                  <img
                    src={t.avatar}
                    alt={t.nombre}
                    className='w-11 h-11 rounded-full object-cover'
                    loading='lazy'
                  />
                  <div>
                    <div
                      className='font-semibold text-sm'
                      style={{ color: "#1A3A8F" }}
                    >
                      {t.nombre}
                    </div>
                    <div className='text-gray-400 text-xs'>{t.empresa}</div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
