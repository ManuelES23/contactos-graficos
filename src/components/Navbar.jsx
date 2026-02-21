import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Inicio", href: "#inicio", type: "hash" },
  { label: "Servicios", href: "#servicios", type: "hash" },
  { label: "Portafolio", href: "#portafolio", type: "hash" },
  { label: "Nosotros", href: "#nosotros", type: "hash" },
  { label: "Productos", href: "/productos", type: "route" },
  { label: "Contacto", href: "#contacto", type: "hash" },
];

export default function Navbar() {
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

          {/* CTA + Hamburger */}
          <div className='flex items-center gap-4'>
            <button
              onClick={(e) => {
                handleNavClick({
                  label: "Contacto",
                  href: "#contacto",
                  type: "hash",
                });
              }}
              className='hidden md:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg border-0 cursor-pointer'
              style={{ backgroundColor: "#2ECC40" }}
            >
              Cotizar ahora
            </button>

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
              <button
                onClick={() =>
                  handleNavClick({
                    label: "Contacto",
                    href: "#contacto",
                    type: "hash",
                  })
                }
                className='mt-2 text-center px-5 py-3 rounded-lg text-sm font-semibold text-white border-0 cursor-pointer w-full'
                style={{ backgroundColor: "#2ECC40" }}
              >
                Cotizar ahora
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
