import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Room } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

interface RoomCardProps {
  room: Room;
  index: number;
}

export default function RoomCard({ room, index }: RoomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="card-luxury group bg-[#111111] rounded-none overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-[280px] lg:h-[320px] overflow-hidden img-zoom">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#c9980a]/30 px-4 py-2">
            <span className="font-sans text-xs text-[#c9980a]/70 block">From</span>
            <span className="font-display text-2xl font-bold text-[#e8b916]">
              ${room.price}
            </span>
            <span className="font-sans text-xs text-[#c9980a]/70">/night</span>
          </div>
        </div>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1">
          <span className="star-rating text-sm">★</span>
          <span className="font-sans text-sm text-[#e8b916] font-semibold">
            {room.rating}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a] bg-gradient-to-r from-[#c9980a] to-[#f0cd53] px-3 py-1.5 font-bold">
            {room.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-gold-gradient transition-all duration-300">
          {room.name}
        </h3>

        <p className="font-serif text-sm text-[#f5f0e8]/50 leading-relaxed mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Room Details */}
        <div className="flex items-center gap-4 mb-4 text-[#f5f0e8]/40">
          <span className="font-sans text-xs flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {room.size}
          </span>
          <span className="font-sans text-xs flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {room.guests} Guests
          </span>
          <span className="font-sans text-xs flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {room.beds}
          </span>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="font-sans text-[10px] tracking-wider uppercase text-[#c9980a]/60 border border-[#c9980a]/15 px-2.5 py-1"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="font-sans text-[10px] tracking-wider text-[#c9980a]/40 px-2.5 py-1">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to={`/booking?room=${room.id}`}
            className="btn-gold flex-1 text-center text-xs py-3"
          >
            Book Now
          </Link>
          <Link
            to={`/rooms`}
            className="btn-outline-gold flex-1 text-center text-xs py-3"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
