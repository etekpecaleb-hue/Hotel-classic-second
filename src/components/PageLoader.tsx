import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.5,
    });
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
    >
      <div ref={logoRef} className="text-center">
        <div className="mb-4">
          <svg width="60" height="60" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <circle cx="22" cy="22" r="20" stroke="url(#loaderGold)" strokeWidth="1" fill="none" />
            <path d="M22 8C22 8 16 14 16 20C16 24 18 26 22 28C26 26 28 24 28 20C28 14 22 8 22 8Z" fill="url(#loaderGold)" opacity="0.8" />
            <circle cx="22" cy="22" r="2" fill="#0a0a0a" />
            <defs>
              <linearGradient id="loaderGold" x1="0" y1="0" x2="44" y2="44">
                <stop offset="0%" stopColor="#f0cd53" />
                <stop offset="50%" stopColor="#e8b916" />
                <stop offset="100%" stopColor="#c9980a" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-gold-gradient tracking-wider">
          Royal Doves
        </h2>
        <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#c9980a]/50 mt-1">
          Hotel & Resort
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#e8b916] to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
