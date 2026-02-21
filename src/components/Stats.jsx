import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const stats = [
  { value: 10, suffix: "+", label: "Años de experiencia", icon: "🏆" },
  { value: 500, suffix: "+", label: "Clientes satisfechos", icon: "🤝" },
  { value: 2000, suffix: "+", label: "Proyectos completados", icon: "✅" },
  { value: 98, suffix: "%", label: "Clientes que regresan", icon: "⭐" },
];

const features = [
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z'
        />
      </svg>
    ),
    titulo: "Materiales de Primera",
    descripcion:
      "Trabajamos únicamente con insumos certificados y proveedores internacionales para garantizar la durabilidad de cada producto.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
    titulo: "Entregas Puntuales",
    descripcion:
      "Respetamos cada plazo acordado. Tu tiempo es valioso y lo sabemos: procesos ágiles sin sacrificar calidad.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
        />
      </svg>
    ),
    titulo: "Equipo Especializado",
    descripcion:
      "Diseñadores, impresores y asesores comerciales con amplia experiencia en el sector de la comunicación visual.",
  },
  {
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
        />
      </svg>
    ),
    titulo: "Precios Competitivos",
    descripcion:
      "Soluciones de calidad premium accesibles. Cotizaciones transparentes sin costos ocultos ni sorpresas al final.",
  },
];

function CounterItem({ value, suffix, label }) {
  const countRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView && countRef.current) {
      gsap.fromTo(
        countRef.current,
        { textContent: 0 },
        {
          textContent: value,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            countRef.current.textContent = Math.round(
              this.targets()[0].textContent,
            );
          },
        },
      );
    }
  }, [inView, value]);

  return (
    <div ref={ref} className='text-center'>
      <div className='font-heading font-black text-5xl text-white mb-1'>
        <span ref={countRef}>0</span>
        <span style={{ color: "#2ECC40" }}>{suffix}</span>
      </div>
      <div className='text-white/60 text-sm font-medium'>{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section
      id='nosotros'
      className='py-24'
      style={{ backgroundColor: "#0D2260" }}
    >
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
            style={{
              backgroundColor: "rgba(46,204,64,0.15)",
              color: "#2ECC40",
            }}
          >
            <span
              className='w-1.5 h-1.5 rounded-full'
              style={{ backgroundColor: "#2ECC40" }}
            />
            ¿Por qué elegirnos?
          </div>
          <h2 className='font-heading font-black text-4xl sm:text-5xl text-white mb-4'>
            Más de una década
            <br />
            <span style={{ color: "#2ECC40" }}>haciendo marcas poderosas</span>
          </h2>
          <p className='text-white/50 text-lg max-w-xl mx-auto leading-relaxed'>
            Nuestros números hablan por sí solos. Confianza, calidad y
            resultados son la base de todo lo que hacemos.
          </p>
        </motion.div>

        {/* Stats counter */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 pb-20 border-b border-white/10'>
          {stats.map((s) => (
            <CounterItem
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>

        {/* Features */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((f, i) => (
            <motion.div
              key={f.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='flex flex-col items-start'
            >
              <div
                className='w-12 h-12 rounded-xl flex items-center justify-center mb-4'
                style={{
                  backgroundColor: "rgba(46,204,64,0.15)",
                  color: "#2ECC40",
                }}
              >
                {f.icon}
              </div>
              <h3 className='font-heading font-bold text-white text-base mb-2'>
                {f.titulo}
              </h3>
              <p className='text-white/50 text-sm leading-relaxed'>
                {f.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
