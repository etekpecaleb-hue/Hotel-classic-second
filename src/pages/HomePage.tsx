import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import RoomCard from '../components/RoomCard';
import SectionHeader from '../components/SectionHeader';
import ThreeHero from '../components/ThreeHero';
import FeatureHighlights from '../components/FeatureHighlights';
import ThreeScene from '../components/ThreeScene';
import { rooms, testimonials, amenitiesList } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    image: '/images/hero-lobby.jpg',
    title: 'Royal Doves',
    subtitle: 'Where timeless elegance meets extraordinary luxury. Experience the pinnacle of five-star hospitality in the heart of London.',
  },
  {
    image: '/images/room-royal.jpg',
    title: 'Royal Penthouse',
    subtitle: 'Ascend to unparalleled opulence. Our crown jewel accommodation redefines luxury with private terraces and personal butler service.',
  },
  {
    image: '/images/restaurant.jpg',
    title: 'Culinary Excellence',
    subtitle: 'Indulge in Michelin-starred cuisine crafted by world-renowned chefs. Every meal is a masterpiece at Royal Doves.',
  },
  {
    image: '/images/spa.jpg',
    title: 'Royal Spa',
    subtitle: 'Surrender to tranquility in our award-winning spa. Bespoke treatments and ancient rituals for complete rejuvenation.',
  },
];

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // About section animation
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current.querySelector('.about-image'),
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
          },
        }
      );
      gsap.fromTo(
        aboutRef.current.querySelector('.about-content'),
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
          },
        }
      );
    }

    // Amenities animation
    if (amenitiesRef.current) {
      gsap.fromTo(
        amenitiesRef.current.querySelectorAll('.amenity-card'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: amenitiesRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Testimonials animation
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current.querySelectorAll('.testimonial-card'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // CTA animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative">
        <ImageCarousel slides={heroSlides} />
        <ThreeHero />
      </section>

      {/* Stats Bar */}
      <section ref={statsRef} className="relative z-20 -mt-16 mx-4 lg:mx-12">
        <div className="max-w-[1400px] mx-auto glass-dark rounded-none">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#c9980a]/10">
            {[
              { number: '150+', label: 'Luxury Rooms' },
              { number: '25', label: 'Years of Excellence' },
              { number: '50K+', label: 'Happy Guests' },
              { number: '5★', label: 'World Rating' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item py-6 lg:py-8 px-4 text-center">
                <div className="font-display text-2xl lg:text-3xl font-bold text-gold-gradient mb-1">
                  {stat.number}
                </div>
                <div className="font-sans text-[10px] lg:text-xs tracking-[0.15em] uppercase text-[#f5f0e8]/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="about-image relative">
              <div className="relative">
                <img
                  src="/images/hero-lobby.jpg"
                  alt="Royal Doves Hotel Lobby"
                  className="w-full h-[400px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 border border-[#c9980a]/20 m-4 lg:m-6 pointer-events-none" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#111111] border border-[#c9980a]/20 p-6 lg:p-8 max-w-[250px]">
                <div className="font-display text-4xl font-bold text-gold-gradient mb-2">1999</div>
                <div className="font-serif text-sm text-[#f5f0e8]/60">
                  Year Established. A legacy of luxury spanning over two decades.
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="about-content lg:pl-8">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
                Our Legacy
              </p>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                A Palace of <br />
                <span className="text-gold-gradient">Unmatched Elegance</span>
              </h2>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#c9980a] to-transparent mb-6" />
              <p className="font-serif text-base lg:text-lg text-[#f5f0e8]/60 leading-relaxed mb-4">
                Nestled in the prestigious Mayfair district, Royal Doves Hotel stands as a testament 
                to timeless luxury and impeccable taste. Since 1999, we have welcomed discerning travelers, 
                royalty, and world leaders into our magnificent sanctuary.
              </p>
              <p className="font-serif text-base lg:text-lg text-[#f5f0e8]/60 leading-relaxed mb-8">
                Every corner of our hotel tells a story of artisanship — from the hand-painted 
                ceilings to the Italian marble floors, from the crystal chandeliers to the bespoke 
                furnishings curated from around the globe.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {['Michelin Star Dining', 'Award-Winning Spa', 'Personal Butler', 'Private Gardens'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#e8b916] rounded-full" />
                    <span className="font-sans text-sm text-[#f5f0e8]/70">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/rooms" className="btn-gold inline-block text-sm rounded-none">
                Discover Our Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Why Choose Us"
            title="The Royal Doves Difference"
            description="Discover what sets us apart from the world's finest hotels."
          />
          <FeatureHighlights />
        </div>
      </section>

      {/* Featured Rooms */}
      <section ref={roomsRef} className="section-padding bg-[#080808]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Accommodations"
            title="Exquisite Rooms & Suites"
            description="Each room is a masterpiece of design, offering unparalleled comfort and breathtaking views. Choose your perfect sanctuary."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/rooms" className="btn-outline-gold inline-block text-sm rounded-none">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section ref={amenitiesRef} className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Experiences"
            title="World-Class Amenities"
            description="Indulge in our curated collection of luxury amenities designed to elevate your stay beyond imagination."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenitiesList.map((amenity) => (
              <div
                key={amenity.name}
                className="amenity-card group bg-[#111111] border border-[#c9980a]/10 p-6 lg:p-8 text-center hover:border-[#c9980a]/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#e8b916] mb-2">
                  {amenity.name}
                </h3>
                <p className="font-serif text-sm text-[#f5f0e8]/50 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax CTA with 3D */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 parallax-hero"
          style={{ backgroundImage: 'url(/images/pool.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 z-[1]">
          <ThreeScene className="w-full h-full" />
        </div>
        <div ref={ctaRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
            Limited Time Offer
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Experience Royal Treatment
          </h2>
          <p className="font-serif text-lg text-[#f5f0e8]/70 max-w-xl mb-8">
            Book your royal escape today and enjoy 20% off on suite reservations. 
            Valid for stays of 3 nights or more.
          </p>
          <Link to="/booking" className="btn-gold text-sm rounded-none">
            Reserve Your Suite
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="section-padding bg-[#080808]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Guest Voices"
            title="What Our Guests Say"
            description="Hear from those who have experienced the Royal Doves difference firsthand."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card bg-[#111111] border border-[#c9980a]/10 p-8 lg:p-10 relative"
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-6 font-display text-6xl text-[#c9980a]/10 leading-none">
                  "
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-[#e8b916] text-sm">★</span>
                  ))}
                </div>
                <p className="font-serif text-base lg:text-lg text-[#f5f0e8]/70 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9980a] to-[#e8b916] flex items-center justify-center">
                    <span className="font-display text-sm font-bold text-[#0a0a0a]">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="font-sans text-xs text-[#f5f0e8]/40">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9980a] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9980a] rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <div className="elegant-divider mb-6">
            <span className="text-[#c9980a]">◆</span>
          </div>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
            Begin Your Royal Journey
          </h2>
          <p className="font-serif text-lg text-[#f5f0e8]/60 mb-8">
            Contact our concierge team for personalized assistance in planning your perfect stay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="btn-gold text-sm rounded-none">
              Book Your Stay
            </Link>
            <Link to="/contact" className="btn-outline-gold text-sm rounded-none">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
