import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader';
import { galleryImages } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Rooms', 'Interior', 'Dining', 'Wellness', 'Amenities', 'Events', 'Exterior'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredImages =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-anim'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item');
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return;
    const currentIndex = selectedImage;
    if (direction === 'next') {
      setSelectedImage((currentIndex + 1) % filteredImages.length);
    } else {
      setSelectedImage((currentIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img
          src="/images/garden.jpg"
          alt="Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div ref={heroRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="hero-anim font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
            ★ ★ ★ ★ ★ Visual Journey
          </p>
          <h1 className="hero-anim font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
            Photo <span className="text-gold-gradient">Gallery</span>
          </h1>
          <p className="hero-anim font-serif text-lg text-[#f5f0e8]/70 max-w-xl">
            Explore the beauty and elegance of Royal Doves through our curated photo collection
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[60px] z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#c9980a]/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-center gap-3 lg:gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-[#0a0a0a] bg-gradient-to-r from-[#c9980a] to-[#e8b916] font-bold'
                    : 'text-[#f5f0e8]/40 hover:text-[#e8b916] border border-transparent hover:border-[#c9980a]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            subtitle="Visual Experience"
            title="A Glimpse of Royal Doves"
            description="Every image captures the essence of luxury that awaits you."
          />

          {/* Masonry-style Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item group relative overflow-hidden cursor-pointer ${
                  index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      index % 5 === 0 ? 'h-[300px] sm:h-[500px]' : 'h-[250px]'
                    }`}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white mb-1">
                        {image.title}
                      </h3>
                      <p className="font-sans text-xs tracking-wider uppercase text-[#e8b916]">
                        {image.category}
                      </p>
                    </div>
                  </div>
                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#c9980a]/30 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/60 hover:text-[#e8b916] transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            <div className="text-center mt-4">
              <h3 className="font-display text-xl text-white">
                {filteredImages[selectedImage].title}
              </h3>
              <p className="font-sans text-xs tracking-wider uppercase text-[#e8b916] mt-1">
                {filteredImages[selectedImage].category}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 hover:border-[#e8b916] text-white/60 hover:text-[#e8b916] transition-all"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 hover:border-[#e8b916] text-white/60 hover:text-[#e8b916] transition-all"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-sm text-white/40">
            <span className="text-[#e8b916]">{selectedImage + 1}</span>
            <span className="mx-2">/</span>
            <span>{filteredImages.length}</span>
          </div>
        </div>
      )}

      {/* Virtual Tour CTA */}
      <section className="section-padding bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="elegant-divider mb-6">
            <span className="text-[#c9980a]">◆</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Want to See More?
          </h2>
          <p className="font-serif text-lg text-[#f5f0e8]/60 mb-8">
            Schedule a virtual tour or visit us in person to experience the full grandeur of Royal Doves Hotel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-gold text-sm">
              Schedule a Visit
            </a>
            <a href="/booking" className="btn-outline-gold text-sm">
              Book Your Stay
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
