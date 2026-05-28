import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  light?: boolean;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('.header-animate');
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 lg:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <p className="header-animate font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
        {subtitle}
      </p>
      <h2
        className={`header-animate font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
          light ? 'text-white' : 'text-gold-gradient'
        }`}
      >
        {title}
      </h2>
      {align === 'center' && (
        <div className="header-animate elegant-divider max-w-[200px] mx-auto mb-6">
          <span className="text-[#c9980a]">◆</span>
        </div>
      )}
      {description && (
        <p className="header-animate font-serif text-base lg:text-lg text-[#f5f0e8]/60 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
