import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import { rooms } from '../utils/data';
import type { Room } from '../utils/data';

interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

const initialForm: BookingForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  roomId: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  specialRequests: '',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
};

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingForm>({
    ...initialForm,
    roomId: searchParams.get('room') || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const selectedRoom = rooms.find((r) => r.id === form.roomId);

  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;
    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const updateForm = (field: keyof BookingForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        if (!form.roomId) {
          toast.error('Please select a room');
          return false;
        }
        if (!form.checkIn || !form.checkOut) {
          toast.error('Please select check-in and check-out dates');
          return false;
        }
        if (calculateNights() <= 0) {
          toast.error('Check-out must be after check-in');
          return false;
        }
        return true;
      case 2:
        if (!form.firstName || !form.lastName || !form.email || !form.phone) {
          toast.error('Please fill in all required fields');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          toast.error('Please enter a valid email address');
          return false;
        }
        return true;
      case 3:
        if (!form.cardNumber || !form.cardName || !form.cardExpiry || !form.cardCvv) {
          toast.error('Please fill in all payment details');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
        );
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsSubmitting(false);
    setBookingComplete(true);
    setStep(4);
    toast.success('Booking confirmed! Check your email for details.');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-anim'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, []);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img
          src="/images/room-suite.jpg"
          alt="Booking"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div ref={heroRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="hero-anim font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
            ★ ★ ★ ★ ★ Reservation
          </p>
          <h1 className="hero-anim font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
            Book Your <span className="text-gold-gradient">Royal Stay</span>
          </h1>
          <p className="hero-anim font-serif text-lg text-[#f5f0e8]/70 max-w-xl">
            Complete your reservation in a few simple steps
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-[#080808] border-b border-[#c9980a]/10">
        <div className="max-w-[1000px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Select Room' },
              { num: 2, label: 'Guest Details' },
              { num: 3, label: 'Payment' },
              { num: 4, label: 'Confirmation' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-all duration-500 ${
                      step >= s.num
                        ? 'bg-gradient-to-br from-[#c9980a] to-[#e8b916] text-[#0a0a0a]'
                        : 'border border-[#c9980a]/20 text-[#c9980a]/40'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span
                    className={`mt-2 font-sans text-[10px] tracking-wider uppercase hidden sm:block ${
                      step >= s.num ? 'text-[#e8b916]' : 'text-[#f5f0e8]/30'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={`h-[1px] flex-1 mx-2 transition-all duration-500 ${
                      step > s.num ? 'bg-[#e8b916]' : 'bg-[#c9980a]/15'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-2">
              {/* Step 1: Room Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-white mb-6">
                    Select Your Room & Dates
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        value={form.checkIn}
                        onChange={(e) => updateForm('checkIn', e.target.value)}
                        min={today}
                        className="input-luxury w-full"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        value={form.checkOut}
                        onChange={(e) => updateForm('checkOut', e.target.value)}
                        min={form.checkIn || today}
                        className="input-luxury w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Number of Guests
                    </label>
                    <select
                      value={form.guests}
                      onChange={(e) => updateForm('guests', parseInt(e.target.value))}
                      className="input-luxury w-full"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n} className="bg-[#111111]">
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-4">
                      Choose Your Room *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {rooms.map((room) => (
                        <RoomOption
                          key={room.id}
                          room={room}
                          selected={form.roomId === room.id}
                          onSelect={() => updateForm('roomId', room.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={form.specialRequests}
                      onChange={(e) => updateForm('specialRequests', e.target.value)}
                      rows={3}
                      placeholder="Any special requirements or preferences..."
                      className="input-luxury w-full resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Guest Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-white mb-6">
                    Guest Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => updateForm('firstName', e.target.value)}
                        placeholder="John"
                        className="input-luxury w-full"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => updateForm('lastName', e.target.value)}
                        placeholder="Doe"
                        className="input-luxury w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="john.doe@email.com"
                      className="input-luxury w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="+44 7700 900000"
                      className="input-luxury w-full"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-white mb-6">
                    Payment Details
                  </h2>

                  {/* Payment Method Tabs */}
                  <div className="flex gap-4 mb-6">
                    {['Credit Card', 'PayPal', 'Bank Transfer'].map((method, i) => (
                      <button
                        key={method}
                        className={`flex-1 py-3 px-4 font-sans text-xs tracking-wider uppercase text-center transition-all duration-300 ${
                          i === 0
                            ? 'bg-gradient-to-r from-[#c9980a] to-[#e8b916] text-[#0a0a0a] font-bold'
                            : 'border border-[#c9980a]/20 text-[#c9980a]/50 hover:border-[#e8b916]/50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {/* Security badge */}
                  <div className="flex items-center gap-3 p-4 bg-[#111111] border border-[#c9980a]/10 mb-6">
                    <svg className="w-6 h-6 text-[#e8b916]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="font-sans text-xs font-semibold text-white">Secure Payment</p>
                      <p className="font-sans text-[10px] text-[#f5f0e8]/40">Your payment information is encrypted and secure</p>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={(e) => updateForm('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className="input-luxury w-full font-mono tracking-wider"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={form.cardName}
                      onChange={(e) => updateForm('cardName', e.target.value)}
                      placeholder="JOHN DOE"
                      className="input-luxury w-full uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={form.cardExpiry}
                        onChange={(e) => updateForm('cardExpiry', formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="input-luxury w-full font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                        CVV *
                      </label>
                      <input
                        type="password"
                        value={form.cardCvv}
                        onChange={(e) => updateForm('cardCvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        maxLength={4}
                        className="input-luxury w-full font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && bookingComplete && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#c9980a] to-[#e8b916] flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl font-bold text-white mb-4">
                    Booking Confirmed!
                  </h2>
                  <p className="font-serif text-lg text-[#f5f0e8]/60 mb-2">
                    Thank you for choosing Royal Doves Hotel
                  </p>
                  <p className="font-sans text-sm text-[#c9980a]/60 mb-8">
                    Confirmation #RD-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </p>

                  <div className="bg-[#111111] border border-[#c9980a]/15 p-6 text-left max-w-md mx-auto mb-8">
                    <h3 className="font-display text-lg font-semibold text-[#e8b916] mb-4">
                      Reservation Summary
                    </h3>
                    <div className="space-y-3 font-sans text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#f5f0e8]/50">Guest</span>
                        <span className="text-white">{form.firstName} {form.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#f5f0e8]/50">Room</span>
                        <span className="text-white">{selectedRoom?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#f5f0e8]/50">Check-in</span>
                        <span className="text-white">{form.checkIn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#f5f0e8]/50">Check-out</span>
                        <span className="text-white">{form.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#f5f0e8]/50">Nights</span>
                        <span className="text-white">{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-[#c9980a]/10">
                        <span className="text-[#e8b916] font-semibold">Total Paid</span>
                        <span className="text-[#e8b916] font-bold text-lg">${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-serif text-sm text-[#f5f0e8]/40">
                    A confirmation email has been sent to {form.email}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-[#c9980a]/10">
                  {step > 1 ? (
                    <button onClick={prevStep} className="btn-outline-gold text-sm">
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}
                  {step < 3 ? (
                    <button onClick={nextStep} className="btn-gold text-sm">
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-gold text-sm min-w-[200px] flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Confirm & Pay'
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-[#111111] border border-[#c9980a]/15 p-6">
                <h3 className="font-display text-xl font-semibold text-[#e8b916] mb-6">
                  Booking Summary
                </h3>

                {selectedRoom && (
                  <div className="mb-6">
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      className="w-full h-40 object-cover mb-4"
                    />
                    <h4 className="font-display text-lg font-semibold text-white">
                      {selectedRoom.name}
                    </h4>
                    <p className="font-sans text-xs text-[#c9980a]/60 mt-1">
                      {selectedRoom.type} • {selectedRoom.size}
                    </p>
                  </div>
                )}

                <div className="space-y-3 py-4 border-t border-[#c9980a]/10">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-[#f5f0e8]/50">Check-in</span>
                    <span className="text-white">{form.checkIn || '—'}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-[#f5f0e8]/50">Check-out</span>
                    <span className="text-white">{form.checkOut || '—'}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-[#f5f0e8]/50">Nights</span>
                    <span className="text-white">{calculateNights()}</span>
                  </div>
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-[#f5f0e8]/50">Guests</span>
                    <span className="text-white">{form.guests}</span>
                  </div>
                </div>

                {selectedRoom && calculateNights() > 0 && (
                  <div className="py-4 border-t border-[#c9980a]/10">
                    <div className="flex justify-between font-sans text-sm mb-2">
                      <span className="text-[#f5f0e8]/50">
                        ${selectedRoom.price} × {calculateNights()} nights
                      </span>
                      <span className="text-white">${calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm mb-2">
                      <span className="text-[#f5f0e8]/50">Taxes & fees</span>
                      <span className="text-white">Included</span>
                    </div>
                    <div className="flex justify-between font-display text-lg font-bold pt-3 border-t border-[#c9980a]/10">
                      <span className="text-[#e8b916]">Total</span>
                      <span className="text-[#e8b916]">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-[#c9980a]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#e8b916] text-xs">✓</span>
                    <span className="font-sans text-[11px] text-[#f5f0e8]/40">Free cancellation up to 48h before</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#e8b916] text-xs">✓</span>
                    <span className="font-sans text-[11px] text-[#f5f0e8]/40">Best price guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#e8b916] text-xs">✓</span>
                    <span className="font-sans text-[11px] text-[#f5f0e8]/40">No hidden fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function RoomOption({
  room,
  selected,
  onSelect,
}: {
  room: Room;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 border transition-all duration-300 ${
        selected
          ? 'border-[#e8b916] bg-[#e8b916]/5 shadow-[0_0_20px_rgba(201,152,10,0.1)]'
          : 'border-[#c9980a]/15 hover:border-[#c9980a]/30 bg-[#111111]'
      }`}
    >
      <div className="flex items-start gap-4">
        <img
          src={room.image}
          alt={room.name}
          className="w-20 h-20 object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-display text-sm font-semibold text-white truncate">
              {room.name}
            </h4>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                selected ? 'border-[#e8b916] bg-[#e8b916]' : 'border-[#c9980a]/30'
              }`}
            >
              {selected && (
                <svg className="w-3 h-3 text-[#0a0a0a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <p className="font-sans text-xs text-[#f5f0e8]/40 mt-1">
            {room.type} • {room.size} • {room.guests} guests
          </p>
          <p className="font-display text-lg font-bold text-[#e8b916] mt-2">
            ${room.price}
            <span className="font-sans text-xs text-[#c9980a]/50 font-normal">/night</span>
          </p>
        </div>
      </div>
    </button>
  );
}
