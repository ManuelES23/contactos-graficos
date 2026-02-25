import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n/translations";

export default function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;
  const words = tr.words;

  const wordRef = useRef(null);
  const heroRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Animated cycling words
    let index = 0;
    const el = wordRef.current;
    if (!el) return;
    el.textContent = words[0];

    const cycleWords = () => {
      gsap.to(el, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          index = (index + 1) % words.length;
          el.textContent = words[index];
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4 },
          );
        },
      });
    };

    const interval = setInterval(cycleWords, 2200);
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.8 },
    );

    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    // Floating dots parallax on mouse move
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height } = hero.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      gsap.to(".hero-parallax", {
        x,
        y,
        duration: 1.2,
        ease: "power1.out",
      });
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id='inicio'
      ref={heroRef}
      className='relative min-h-screen flex items-center overflow-hidden pt-20'
    >
      {/* Background gradient */}
      <div
        className='absolute inset-0'
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #f0f4ff 40%, #e8eeff 100%)",
        }}
      />

      {/* Decorative circles – parallax */}
      <div
        className='hero-parallax absolute top-20 right-10 w-80 h-80 rounded-full opacity-10'
        style={{ background: "radial-gradient(circle, #1A3A8F, transparent)" }}
      />
      <div
        className='hero-parallax absolute bottom-20 right-1/4 w-56 h-56 rounded-full opacity-8'
        style={{ background: "radial-gradient(circle, #2ECC40, transparent)" }}
      />
      <div
        className='hero-parallax absolute top-1/2 right-[5%] w-40 h-40 rounded-full opacity-10'
        style={{ background: "radial-gradient(circle, #1A3A8F, transparent)" }}
      />

      {/* Floating dots grid */}
      <div
        className='hero-parallax absolute inset-0 opacity-20'
        style={{
          backgroundImage: "radial-gradient(#1A3A8F 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative green lines */}
      <div
        className='absolute left-0 top-1/3 w-1 h-32 rounded-full opacity-60'
        style={{ backgroundColor: "#2ECC40" }}
      />
      <div
        className='absolute left-3 top-1/3 w-1 h-20 rounded-full opacity-40'
        style={{ backgroundColor: "#2ECC40" }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6'
              style={{ backgroundColor: "#e8f5e9", color: "#2ECC40" }}
            >
              <span
                className='w-2 h-2 rounded-full animate-pulse'
                style={{ backgroundColor: "#2ECC40" }}
              />
              {tr.badge}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className='font-heading font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4'
              style={{ color: "#1A3A8F" }}
            >
              {tr.headline1}
              <br />
              {tr.headline2}{" "}
              <span
                ref={wordRef}
                className='inline-block'
                style={{ color: "#2ECC40" }}
              >
                visible
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className='text-lg text-gray-600 mb-8 max-w-lg leading-relaxed'
            >
              {tr.sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className='flex flex-wrap gap-4'
            >
              <a
                href='#contacto'
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contacto")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className='inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-xl'
                style={{ backgroundColor: "#1A3A8F" }}
              >
                {tr.cta1}
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
              <a
                href='#portafolio'
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#portafolio")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className='inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 border-2'
                style={{ borderColor: "#2ECC40", color: "#1A3A8F" }}
              >
                {tr.cta2}
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className='mt-12 flex flex-wrap gap-8'
            >
              {[tr.stat1, tr.stat2, tr.stat3].map((s) => (
                <div key={s.label} className='flex flex-col'>
                  <span
                    className='font-heading font-black text-3xl'
                    style={{ color: "#1A3A8F" }}
                  >
                    {s.value}
                  </span>
                  <span className='text-sm text-gray-500 mt-0.5'>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className='hidden lg:block relative'
          >
            <div className='relative w-full aspect-square max-w-lg mx-auto'>
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className='absolute inset-4 rounded-[2.5rem]'
                style={{
                  background:
                    "conic-gradient(from 0deg, #1A3A8F, #2ECC40, #1A3A8F, #2ECC40, #1A3A8F)",
                  padding: "3px",
                }}
              >
                <div
                  className='w-full h-full rounded-[2.4rem]'
                  style={{
                    background:
                      "linear-gradient(135deg, #f0f4ff 0%, #ffffff 40%, #e8eeff 100%)",
                  }}
                />
              </motion.div>

              {/* Glowing halo */}
              <div
                className='absolute inset-10 rounded-3xl blur-2xl opacity-30'
                style={{
                  background:
                    "radial-gradient(ellipse at center, #2ECC40 0%, #1A3A8F 60%, transparent 100%)",
                }}
              />

              {/* Main card – Logo */}
              <div
                className='absolute inset-8 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center'
                style={{
                  background:
                    "linear-gradient(145deg, #f0f4ff 0%, #ffffff 45%, #e8fff0 100%)",
                }}
              >
                {/* Subtle dot pattern */}
                <div
                  className='absolute inset-0 opacity-10'
                  style={{
                    backgroundImage:
                      "radial-gradient(#1A3A8F 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Corner accents */}
                <div
                  className='absolute top-0 left-0 w-16 h-16 rounded-br-3xl opacity-20'
                  style={{ backgroundColor: "#1A3A8F" }}
                />
                <div
                  className='absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl opacity-20'
                  style={{ backgroundColor: "#2ECC40" }}
                />

                {/* Logo */}
                <img
                  src='/logo-normal .png'
                  alt='Contactos Gráficos'
                  className='relative z-10 w-4/5 h-4/5 object-contain drop-shadow-lg'
                />
              </div>

              {/* Floating badge 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className='absolute top-4 right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3'
              >
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center'
                  style={{ backgroundColor: "#e8f5e9" }}
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
                      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                    />
                  </svg>
                </div>
                <div>
                  <div
                    className='font-semibold text-sm'
                    style={{ color: "#1A3A8F" }}
                  >
                    {tr.badge1Title}
                  </div>
                  <div className='text-xs text-gray-400'>{tr.badge1Sub}</div>
                </div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className='absolute bottom-4 left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3'
              >
                <div
                  className='w-10 h-10 rounded-xl flex items-center justify-center'
                  style={{ backgroundColor: "#e8eeff" }}
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='#1A3A8F'
                    strokeWidth={2.5}
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                </div>
                <div>
                  <div
                    className='font-semibold text-sm'
                    style={{ color: "#1A3A8F" }}
                  >
                    {tr.badge2Title}
                  </div>
                  <div className='text-xs text-gray-400'>{tr.badge2Sub}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'
      >
        <span className='text-xs text-gray-400 font-medium tracking-widest uppercase'>
          {tr.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className='w-6 h-9 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5'
        >
          <div className='w-1 h-2 rounded-full bg-gray-400' />
        </motion.div>
      </motion.div>
    </section>
  );
}
