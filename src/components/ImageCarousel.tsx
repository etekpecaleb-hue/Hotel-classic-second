import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  height?: string;
}

export default function ImageCarousel({
  slides,
  autoPlayInterval = 5000,
  height = 'h-[70vh] lg:h-[85vh]',
}: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAnimatingRef = useRef(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  const animateSlide = (index: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: 'power2.in',
    });

    tl.call(() => {
      setCurrentSlide(index);
      currentIndexRef.current = index;
    });

    tl.fromTo(
      slideRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
    );

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % slides.length;
      animateSlide(nextIndex);
    }, autoPlayInterval);
  };

  const goToSlide = (index: number) => {
    animateSlide(index);
    resetAutoPlay();
  };

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      slideRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' }
    );

    autoPlayRef.current = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % slides.length;
      animateSlide(nextIndex);
    }, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className={`relative ${height} overflow-hidden`}>
      {/* Slide Background */}
      <div ref={slideRef} className="absolute inset-0">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="max-w-4xl">
          <div className="elegant-divider mb-6">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916]/80">
              ★ ★ ★ ★ ★
            </span>
          </div>
          <h1
            ref={titleRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-4"
          >
            {slides[currentSlide].title}
          </h1>
          <p
            ref={subtitleRef}
            className="font-serif text-lg sm:text-xl md:text-2xl text-[#f5f0e8]/80 max-w-2xl mx-auto mb-8"
          >
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-white/20 hover:border-[#e8b916] text-white/60 hover:text-[#e8b916] transition-all duration-300 backdrop-blur-sm group"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-white/20 hover:border-[#e8b916] text-white/60 hover:text-[#e8b916] transition-all duration-300 backdrop-blur-sm group"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 font-sans text-xs tracking-wider text-white/40">
        <span className="text-[#e8b916] font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
