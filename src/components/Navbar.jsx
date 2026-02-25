import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { t } from "../i18n/translations";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const tr = t[lang].nav;

  const navLinks = [
    { label: tr.inicio, href: "#inicio", type: "hash" },
    { label: tr.servicios, href: "#servicios", type: "hash" },
    { label: tr.portafolio, href: "#portafolio", type: "hash" },
    { label: tr.nosotros, href: "#nosotros", type: "hash" },
    { label: tr.productos, href: "/productos", type: "route" },
    { label: tr.contacto, href: "#contacto", type: "hash" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.type === "route") {
      navigate(link.href);
      window.scrollTo({ top: 0 });
      return;
    }
    // hash link
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isProductosActive = location.pathname === "/productos";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-18 py-3'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center'
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <img
              src='/logo-horizontal.png'
              alt='Contactos Gráficos'
              className='h-12 w-auto'
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <span
              className='hidden items-center gap-2 font-heading font-bold text-xl'
              style={{ color: "#1A3A8F" }}
            >
              <span
                className='w-1 h-8 rounded-full'
                style={{ backgroundColor: "#2ECC40" }}
              />
              Contactos Gráficos
            </span>
          </Link>

          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => {
              const isActive =
                link.type === "route" && location.pathname === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className='relative text-sm font-medium transition-colors duration-200 group bg-transparent border-0 cursor-pointer'
                  style={{ color: isActive ? "#2ECC40" : "#1A3A8F" }}
                >
                  {link.label}
                  <span
                    className='absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full'
                    style={{
                      backgroundColor: "#2ECC40",
                      width: isActive ? "100%" : "0",
                    }}
                  />
                </button>
              );
            })}
          </nav>

          {/* CTA + Lang + Hamburger */}
          <div className='flex items-center gap-3'>
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className='hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group'
              style={{
                borderColor: "#1A3A8F",
                color: "#1A3A8F",
                backgroundColor: "#f0f4ff",
              }}
              title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              {/* Globe icon */}
              <svg
                className='w-3.5 h-3.5 shrink-0'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253'
                />
              </svg>
              {/* Current flag */}
              <img
                src={
                  lang === "es"
                    ? "https://flagcdn.com/es.svg"
                    : "https://flagcdn.com/gb.svg"
                }
                alt={lang === "es" ? "Español" : "English"}
                className='w-5 h-3.5 rounded-sm object-cover shrink-0'
              />
              {/* Current lang code */}
              <span className='tracking-wide'>
                {lang === "es" ? "ES" : "EN"}
              </span>
              {/* Swap arrow */}
              <svg
                className='w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity'
                fill='none'
                stroke='currentColor'
                strokeWidth={2.5}
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                handleNavClick({
                  label: tr.contacto,
                  href: "#contacto",
                  type: "hash",
                });
              }}
              className='hidden md:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 cursor-pointer'
              style={{ backgroundColor: "#2ECC40" }}
            >
              {tr.cotizar}
            </button>

            {/* Hamburger */}
            <button
              className='md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={tr.abrirMenu}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className='block w-6 h-0.5 rounded'
                style={{ backgroundColor: "#1A3A8F" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className='block w-6 h-0.5 rounded'
                style={{ backgroundColor: "#1A3A8F" }}
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                className='block w-6 h-0.5 rounded'
                style={{ backgroundColor: "#1A3A8F" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-white border-t overflow-hidden'
            style={{ borderColor: "#F5F5F5" }}
          >
            <nav className='px-6 py-4 flex flex-col gap-4'>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className='w-full text-left text-base font-medium py-2 border-b transition-colors bg-transparent border-0 cursor-pointer'
                  style={{
                    color: "#1A3A8F",
                    borderBottomColor: "#F5F5F5",
                    borderBottomWidth: 1,
                    borderBottomStyle: "solid",
                  }}
                >
                  {link.label}
                </button>
              ))}
              {/* Mobile language toggle */}
              <button
                onClick={toggleLang}
                className='flex items-center gap-3 w-full py-2 text-sm font-semibold border-0 bg-transparent cursor-pointer'
                style={{ color: "#1A3A8F" }}
              >
                {/* Globe icon */}
                <span
                  className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
                  style={{ backgroundColor: "#f0f4ff" }}
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='#1A3A8F'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253'
                    />
                  </svg>
                </span>
                <span className='flex flex-col items-start'>
                  <span className='flex items-center gap-1.5'>
                    <img
                      src={
                        lang === "es"
                          ? "https://flagcdn.com/es.svg"
                          : "https://flagcdn.com/gb.svg"
                      }
                      alt={lang === "es" ? "Español" : "English"}
                      className='w-6 h-4 rounded-sm object-cover shrink-0'
                    />
                    <span>{lang === "es" ? "Español" : "English"}</span>
                  </span>
                  <span
                    className='text-xs font-normal'
                    style={{ color: "#2ECC40" }}
                  >
                    {lang === "es"
                      ? "Switch to English →"
                      : "Cambiar a Español →"}
                  </span>
                </span>
              </button>
              <button
                onClick={() =>
                  handleNavClick({
                    label: tr.contacto,
                    href: "#contacto",
                    type: "hash",
                  })
                }
                className='mt-2 text-center px-5 py-3 rounded-lg text-sm font-semibold text-white border-0 cursor-pointer w-full'
                style={{ backgroundColor: "#2ECC40" }}
              >
                {tr.cotizar}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
