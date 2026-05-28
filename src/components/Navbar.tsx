import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/rooms', label: 'Rooms' },
  { path: '/booking', label: 'Book Now' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, x: '100%' },
          { opacity: 1, x: '0%', duration: 0.5, ease: 'power3.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          x: '100%',
          duration: 0.4,
          ease: 'power3.in',
        });
      }
    }
  }, [isMobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(201,152,10,0.1)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
                <path d="M22 8C22 8 16 14 16 20C16 24 18 26 22 28C26 26 28 24 28 20C28 14 22 8 22 8Z" fill="url(#goldGrad)" opacity="0.8" />
                <path d="M22 12L24 18H20L22 12Z" fill="#0a0a0a" />
                <circle cx="22" cy="22" r="2" fill="#0a0a0a" />
                <path d="M15 28C15 28 18 32 22 34C26 32 29 28 29 28" stroke="url(#goldGrad)" strokeWidth="1" fill="none" />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="44" y2="44">
                    <stop offset="0%" stopColor="#f0cd53" />
                    <stop offset="50%" stopColor="#e8b916" />
                    <stop offset="100%" stopColor="#c9980a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl lg:text-2xl font-bold tracking-wider text-gold-gradient leading-tight">
                Royal Doves
              </span>
              <span className="font-serif text-[10px] lg:text-xs tracking-[0.35em] uppercase text-[#c9980a]/70">
                Hotel & Resort
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 group ${
                  location.pathname === link.path
                    ? 'text-[#e8b916]'
                    : 'text-[#f5f0e8]/70 hover:text-[#e8b916]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-[#c9980a] to-[#f0cd53] transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
                {link.label === 'Book Now' && (
                  <span className="ml-2 px-2 py-0.5 text-[10px] bg-gradient-to-r from-[#c9980a] to-[#e8b916] text-[#0a0a0a] font-bold rounded-sm">
                    VIP
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#e8b916] transition-all duration-300 ${
                isMobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#e8b916] transition-all duration-300 ${
                isMobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#e8b916] transition-all duration-300 ${
                isMobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 w-[300px] bg-[#0a0a0a]/98 backdrop-blur-2xl z-50 lg:hidden flex flex-col pt-24 px-8 border-l border-[#c9980a]/20"
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-5 right-6 text-[#e8b916] text-2xl"
          aria-label="Close menu"
        >
          ✕
        </button>
        {navLinks.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsMobileOpen(false)}
            className={`py-4 font-serif text-lg tracking-wider border-b border-[#c9980a]/10 transition-all duration-300 ${
              location.pathname === link.path
                ? 'text-[#e8b916] pl-4 border-l-2 border-l-[#e8b916]'
                : 'text-[#f5f0e8]/70 hover:text-[#e8b916] hover:pl-4'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-8 pt-8 border-t border-[#c9980a]/20">
          <p className="font-serif text-sm text-[#c9980a]/60 tracking-wider">
            +44 (0) 20 7946 0958
          </p>
          <p className="font-serif text-sm text-[#c9980a]/60 tracking-wider mt-2">
            reservations@royaldoveshotel.com
          </p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
