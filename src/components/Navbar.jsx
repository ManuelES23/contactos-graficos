import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          <a
            href='#inicio'
            className='flex items-center'
            onClick={() => handleNavClick("#inicio")}
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
          </a>

          {/* Desktop Nav */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className='relative text-sm font-medium transition-colors duration-200 group'
                style={{ color: "#1A3A8F" }}
              >
                {link.label}
                <span
                  className='absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full'
                  style={{ backgroundColor: "#2ECC40" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className='flex items-center gap-4'>
            <a
              href='#contacto'
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contacto");
              }}
              className='hidden md:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg'
              style={{ backgroundColor: "#2ECC40" }}
            >
              Cotizar ahora
            </a>

            {/* Hamburger */}
            <button
              className='md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none'
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label='Abrir menú'
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className='text-base font-medium py-2 border-b transition-colors'
                  style={{ color: "#1A3A8F", borderColor: "#F5F5F5" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href='#contacto'
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contacto");
                }}
                className='mt-2 text-center px-5 py-3 rounded-lg text-sm font-semibold text-white'
                style={{ backgroundColor: "#2ECC40" }}
              >
                Cotizar ahora
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
