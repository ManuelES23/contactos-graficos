import { motion } from "framer-motion";

export default function CTAFinal() {
  return (
    <section
      id='contacto'
      className='relative py-28 overflow-hidden'
      style={{
        background: "linear-gradient(135deg, #1A3A8F 0%, #0D2260 100%)",
      }}
    >
      {/* Decorative dots */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Decorative circles */}
      <div
        className='absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10'
        style={{ background: "radial-gradient(circle, #2ECC40, transparent)" }}
      />
      <div
        className='absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10'
        style={{ background: "radial-gradient(circle, #ffffff, transparent)" }}
      />

      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Green top line decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className='mx-auto mb-8 h-1 w-20 rounded-full'
          style={{ backgroundColor: "#2ECC40", transformOrigin: "center" }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight'
        >
          ¿Listo para hacer
          <br />
          <span style={{ color: "#2ECC40" }}>destacar tu marca?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className='text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed'
        >
          Contáctanos hoy y obtén una cotización gratuita. Nuestro equipo está
          listo para transformar tu visión en realidad.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex flex-col sm:flex-row gap-4 justify-center'
        >
          <a
            href='mailto:info@contactosgraficos.com'
            className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl'
            style={{ backgroundColor: "#2ECC40" }}
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
                d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
              />
            </svg>
            Contáctanos hoy
          </a>
          <a
            href='https://wa.me/50212345678'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300 hover:scale-105 border-2'
            style={{ borderColor: "rgba(255,255,255,0.3)" }}
          >
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
            </svg>
            WhatsApp
          </a>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-12 flex flex-wrap justify-center gap-8 text-white/50 text-sm'
        >
          <span className='flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
              />
            </svg>
            +502 1234-5678
          </span>
          <span className='flex items-center gap-2'>
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
              />
            </svg>
            info@contactosgraficos.com
          </span>
          <span className='flex items-center gap-2'>
            <svg
              className='w-4 h-4'
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
            Lun–Vie 8:00–18:00
          </span>
        </motion.div>
      </div>
    </section>
  );
}
