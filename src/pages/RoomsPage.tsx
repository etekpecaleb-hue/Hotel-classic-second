import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoomCard from '../components/RoomCard';
import SectionHeader from '../components/SectionHeader';
import { rooms } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  '/images/room-royal.jpg',
  '/images/room-suite.jpg',
  '/images/hero-lobby.jpg',
];

export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentHero, setCurrentHero] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = ['All', 'Classic', 'Deluxe', 'Suite', 'Royal'];

  const filteredRooms =
    activeFilter === 'All'
      ? rooms
      : rooms.filter((room) => room.type === activeFilter);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-text'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.room-grid-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [activeFilter]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentHero ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
        <div ref={heroRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="hero-text font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
            ★ ★ ★ ★ ★ Accommodations
          </p>
          <h1 className="hero-text font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
            Our <span className="text-gold-gradient">Rooms & Suites</span>
          </h1>
          <p className="hero-text font-serif text-lg text-[#f5f0e8]/70 max-w-2xl">
            Discover our collection of meticulously designed rooms and suites, each offering 
            a unique blend of classic elegance and modern luxury.
          </p>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-8 h-[2px] transition-all duration-300 ${
                index === currentHero ? 'bg-[#e8b916] w-12' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[60px] z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#c9980a]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-center gap-4 lg:gap-6 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300 ${
                  activeFilter === filter
                    ? 'text-[#0a0a0a] bg-gradient-to-r from-[#c9980a] to-[#e8b916]'
                    : 'text-[#f5f0e8]/50 hover:text-[#e8b916] border border-transparent hover:border-[#c9980a]/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Select Your Sanctuary"
            title="Luxury Redefined"
            description="Every room at Royal Doves is a testament to exquisite craftsmanship and attention to detail."
          />
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {filteredRooms.map((room, index) => (
              <div key={room.id} className="room-grid-card">
                <RoomCard room={room} index={index} />
              </div>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-lg text-[#f5f0e8]/50">
                No rooms found for this category. Please try another filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Room Features Comparison */}
      <section className="section-padding bg-[#080808]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Comparison"
            title="Room Features"
            description="Compare the features and amenities across our room categories to find your perfect match."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#c9980a]/20">
                  <th className="py-4 px-6 text-left font-sans text-xs tracking-[0.15em] uppercase text-[#e8b916]">Feature</th>
                  {rooms.map((room) => (
                    <th key={room.id} className="py-4 px-6 text-center font-sans text-xs tracking-[0.15em] uppercase text-[#e8b916]">
                      {room.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Size', values: rooms.map((r) => r.size) },
                  { label: 'Max Guests', values: rooms.map((r) => `${r.guests}`) },
                  { label: 'Bed Type', values: rooms.map((r) => r.beds) },
                  { label: 'Price/Night', values: rooms.map((r) => `$${r.price}`) },
                  { label: 'Wi-Fi', values: ['✓', '✓', '✓', '✓'] },
                  { label: 'Mini Bar', values: ['✓', '✓', '✓', '✓'] },
                  { label: 'Butler Service', values: ['—', '—', '✓', '✓'] },
                  { label: 'Private Terrace', values: ['—', '—', '—', '✓'] },
                  { label: 'Jacuzzi', values: ['—', '—', '—', '✓'] },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-[#c9980a]/5 hover:bg-[#c9980a]/5 transition-colors">
                    <td className="py-4 px-6 font-serif text-sm text-[#f5f0e8]/60">{row.label}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-4 px-6 text-center font-sans text-sm text-[#f5f0e8]/70">
                        {value === '✓' ? (
                          <span className="text-[#e8b916]">✓</span>
                        ) : value === '—' ? (
                          <span className="text-[#f5f0e8]/20">—</span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/room-royal.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Can't Decide?
          </h2>
          <p className="font-serif text-lg text-[#f5f0e8]/60 mb-8">
            Our concierge team is available 24/7 to help you select the perfect room 
            for your stay. Let us craft your ideal experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+442079460958" className="btn-gold text-sm rounded-none">
              Call Concierge
            </a>
            <a href="mailto:reservations@royaldoveshotel.com" className="btn-outline-gold text-sm rounded-none">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
