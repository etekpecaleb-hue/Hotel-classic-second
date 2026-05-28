import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactInfo } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current.querySelectorAll('.footer-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#060606] border-t border-[#c9980a]/15">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9980a]/50 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="footer-animate lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="20" stroke="#c9980a" strokeWidth="1" fill="none" />
                  <path d="M22 8C22 8 16 14 16 20C16 24 18 26 22 28C26 26 28 24 28 20C28 14 22 8 22 8Z" fill="#c9980a" opacity="0.8" />
                </svg>
                <div>
                  <span className="font-display text-xl font-bold text-gold-gradient block leading-tight">Royal Doves</span>
                  <span className="font-serif text-[9px] tracking-[0.35em] uppercase text-[#c9980a]/60">Hotel & Resort</span>
                </div>
              </div>
            </Link>
            <p className="font-serif text-sm text-[#f5f0e8]/50 leading-relaxed mb-6">
              Where luxury meets legacy. Experience the timeless elegance of Royal Doves Hotel, 
              a sanctuary of refined hospitality in the heart of London.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-[#c9980a]/20 rounded-full text-[#c9980a]/60 hover:text-[#e8b916] hover:border-[#e8b916]/50 hover:bg-[#c9980a]/10 transition-all duration-300 text-sm"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate">
            <h4 className="font-display text-lg font-semibold text-[#e8b916] mb-6 tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Rooms', path: '/rooms' },
                { label: 'Make a Reservation', path: '/booking' },
                { label: 'Photo Gallery', path: '/gallery' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'Privacy Policy', path: '/' },
                { label: 'Terms of Service', path: '/' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-[#f5f0e8]/50 hover:text-[#e8b916] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#c9980a]/30 rounded-full group-hover:bg-[#e8b916] transition-colors duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-animate">
            <h4 className="font-display text-lg font-semibold text-[#e8b916] mb-6 tracking-wider">
              Contact
            </h4>
            <div className="space-y-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#c9980a]/60 mb-1">Address</p>
                <p className="font-serif text-sm text-[#f5f0e8]/60 leading-relaxed">{contactInfo.address}</p>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#c9980a]/60 mb-1">Phone</p>
                <a href={`tel:${contactInfo.phone}`} className="font-serif text-sm text-[#f5f0e8]/60 hover:text-[#e8b916] transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-[#c9980a]/60 mb-1">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="font-serif text-sm text-[#f5f0e8]/60 hover:text-[#e8b916] transition-colors">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-animate">
            <h4 className="font-display text-lg font-semibold text-[#e8b916] mb-6 tracking-wider">
              Newsletter
            </h4>
            <p className="font-serif text-sm text-[#f5f0e8]/50 mb-4">
              Subscribe for exclusive offers, events, and Royal Doves experiences.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="input-luxury w-full text-sm rounded-none"
              />
              <button type="submit" className="btn-gold w-full text-sm py-3 rounded-none">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#c9980a]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs text-[#f5f0e8]/30 tracking-wider">
              © {new Date().getFullYear()} Royal Doves Hotel. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-sans text-xs text-[#f5f0e8]/30 tracking-wider">
                ★★★★★ Five-Star Luxury
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
