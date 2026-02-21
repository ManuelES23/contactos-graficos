import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const servicios = [
  {
    icon: (
      <svg
        className='w-7 h-7'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
        />
      </svg>
    ),
    titulo: "Diseño Gráfico",
    descripcion:
      "Creamos identidades visuales impactantes: logotipos, branding completo y material gráfico que comunica y convierte.",
    color: "#e8eeff",
  },
  {
    icon: (
      <svg
        className='w-7 h-7'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6'
        />
      </svg>
    ),
    titulo: "Publicidad Exterior",
    descripcion:
      "Vallas, rótulos y displays que hacen que tu marca destaque en cualquier espacio público. Máxima visibilidad.",
    color: "#e8f5e9",
  },
  {
    icon: (
      <svg
        className='w-7 h-7'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
        />
      </svg>
    ),
    titulo: "Adhesivos y Viniles",
    descripcion:
      "Stickers, vinilos de corte, laminados y adhesivos de alta calidad para cualquier superficie interior o exterior.",
    color: "#fff7e8",
  },
  {
    icon: (
      <svg
        className='w-7 h-7'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
        />
      </svg>
    ),
    titulo: "Señalética",
    descripcion:
      "Sistemas de señalización corporativa e institucional: señales de seguridad, directorio, orientación y más.",
    color: "#f5e8ff",
  },
  {
    icon: (
      <svg
        className='w-7 h-7'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z'
        />
      </svg>
    ),
    titulo: "Impresión Digital",
    descripcion:
      "Impresión de gran formato, catálogos, flyers, banners y toda clase de material impreso con calidad superior.",
    color: "#e8f5e9",
  },
  {
    icon: (
      <svg
        className='w-7 h-7'
        fill='none'
        stroke='currentColor'
        strokeWidth={1.8}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
        />
      </svg>
    ),
    titulo: "Branding Corporativo",
    descripcion:
      "Desarrollamos tu identidad corporativa completa: manual de marca, papelería, uniformes, packaging y mucho más.",
    color: "#e8eeff",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Servicios() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id='servicios' className='py-24 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4'
            style={{ backgroundColor: "#e8eeff", color: "#1A3A8F" }}
          >
            <span
              className='w-1.5 h-1.5 rounded-full'
              style={{ backgroundColor: "#2ECC40" }}
            />
            Nuestros Servicios
          </div>
          <h2
            className='font-heading font-black text-4xl sm:text-5xl mb-4'
            style={{ color: "#1A3A8F" }}
          >
            Todo lo que tu marca
            <br />
            <span style={{ color: "#2ECC40" }}>necesita para destacar</span>
          </h2>
          <p className='text-gray-500 text-lg max-w-xl mx-auto leading-relaxed'>
            Ofrecemos soluciones integrales de comunicación visual para empresas
            que quieren diferenciarse y crecer.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {servicios.map((s) => (
            <motion.div
              key={s.titulo}
              variants={cardVariants}
              className='group relative p-7 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default'
              style={{ "--hover-border": "#2ECC40" }}
            >
              {/* Top accent line */}
              <div
                className='absolute top-0 left-7 right-7 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                style={{ backgroundColor: "#2ECC40" }}
              />

              {/* Icon */}
              <div
                className='w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110'
                style={{ backgroundColor: s.color, color: "#1A3A8F" }}
              >
                {s.icon}
              </div>

              <h3
                className='font-heading font-bold text-lg mb-2'
                style={{ color: "#1A3A8F" }}
              >
                {s.titulo}
              </h3>
              <p className='text-gray-500 text-sm leading-relaxed'>
                {s.descripcion}
              </p>

              {/* Arrow indicator */}
              <div
                className='mt-4 flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1'
                style={{ color: "#2ECC40" }}
              >
                Conocer más
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
