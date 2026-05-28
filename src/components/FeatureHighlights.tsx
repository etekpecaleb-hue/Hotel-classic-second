import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '👑',
    title: 'Royal Treatment',
    description: 'Every guest is treated like royalty with personalized butler service and bespoke experiences.',
    stat: '24/7',
    statLabel: 'Butler Service',
  },
  {
    icon: '🏆',
    title: 'Award Winning',
    description: 'Recipient of the World\'s Best Luxury Hotel award for three consecutive years.',
    stat: '15+',
    statLabel: 'Awards Won',
  },
  {
    icon: '🌟',
    title: 'Michelin Dining',
    description: 'Three Michelin-starred restaurants offering culinary journeys from around the world.',
    stat: '3',
    statLabel: 'Michelin Stars',
  },
  {
    icon: '💎',
    title: 'Exclusive Access',
    description: 'Private members\' club, rooftop terrace, and VIP events exclusively for our guests.',
    stat: '500+',
    statLabel: 'Exclusive Events',
  },
];

export default function FeatureHighlights() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current.querySelectorAll('.feature-item'),
      { opacity: 0, y: 60, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-item group relative bg-[#111111] border border-[#c9980a]/10 p-8 text-center overflow-hidden hover:border-[#c9980a]/30 transition-all duration-700"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#c9980a]/10 to-transparent rotate-45" />
          </div>

          <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-500">
            {feature.icon}
          </div>

          <h3 className="font-display text-xl font-bold text-[#e8b916] mb-3">
            {feature.title}
          </h3>

          <p className="font-serif text-sm text-[#f5f0e8]/50 leading-relaxed mb-6">
            {feature.description}
          </p>

          <div className="pt-4 border-t border-[#c9980a]/10">
            <div className="font-display text-3xl font-bold text-gold-gradient">
              {feature.stat}
            </div>
            <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#c9980a]/50 mt-1">
              {feature.statLabel}
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#c9980a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
