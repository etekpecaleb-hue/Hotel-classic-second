import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (isVisible) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
      } else {
        gsap.to(ref.current, {
          opacity: 0,
          y: 20,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 opacity-0" style={{ pointerEvents: isVisible ? 'auto' : 'none' }}>
      {/* Book Now Button */}
      <Link
        to="/booking"
        className="group flex items-center gap-2 bg-gradient-to-r from-[#c9980a] to-[#e8b916] text-[#0a0a0a] px-4 py-3 font-sans text-xs tracking-wider uppercase font-bold shadow-[0_4px_20px_rgba(201,152,10,0.3)] hover:shadow-[0_4px_30px_rgba(201,152,10,0.5)] transition-all duration-300 hover:-translate-y-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="hidden group-hover:inline">Book Now</span>
      </Link>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 flex items-center justify-center border border-[#c9980a]/30 bg-[#0a0a0a]/90 backdrop-blur-sm text-[#e8b916] hover:bg-[#c9980a]/10 hover:border-[#e8b916] transition-all duration-300 hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
