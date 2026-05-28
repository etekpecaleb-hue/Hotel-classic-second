import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import { contactInfo } from '../utils/data';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success('Message sent successfully! We will respond within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.content-anim'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
        <img
          src="/images/hall.jpg"
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div ref={heroRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="hero-anim font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
            ★ ★ ★ ★ ★ Get in Touch
          </p>
          <h1 className="hero-anim font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
            Contact <span className="text-gold-gradient">Us</span>
          </h1>
          <p className="hero-anim font-serif text-lg text-[#f5f0e8]/70 max-w-xl">
            Our dedicated team is here to assist you with any inquiries
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-20 -mt-12 mx-4 lg:mx-12 mb-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: 'Address',
              content: contactInfo.address,
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
              title: 'Phone',
              content: contactInfo.phone,
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: 'Email',
              content: contactInfo.email,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#111111] border border-[#c9980a]/15 p-6 lg:p-8 text-center group hover:border-[#c9980a]/30 transition-all duration-500"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border border-[#c9980a]/20 rounded-full text-[#e8b916] group-hover:bg-[#c9980a]/10 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-[#e8b916] mb-2">
                {item.title}
              </h3>
              <p className="font-serif text-sm text-[#f5f0e8]/60 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section ref={contentRef} className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="content-anim">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
                Send a Message
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
                We'd Love to Hear
                <br />
                <span className="text-gold-gradient">From You</span>
              </h2>
              <div className="w-20 h-[1px] bg-gradient-to-r from-[#c9980a] to-transparent mb-8" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Your full name"
                      className="input-luxury w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="your@email.com"
                      className="input-luxury w-full"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="+44 7700 900000"
                      className="input-luxury w-full"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => updateForm('subject', e.target.value)}
                      className="input-luxury w-full"
                    >
                      <option value="" className="bg-[#111111]">Select a subject</option>
                      <option value="reservation" className="bg-[#111111]">Reservation Inquiry</option>
                      <option value="event" className="bg-[#111111]">Event Planning</option>
                      <option value="spa" className="bg-[#111111]">Spa & Wellness</option>
                      <option value="dining" className="bg-[#111111]">Restaurant & Bar</option>
                      <option value="feedback" className="bg-[#111111]">Feedback</option>
                      <option value="other" className="bg-[#111111]">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-wider uppercase text-[#c9980a]/70 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateForm('message', e.target.value)}
                    rows={5}
                    placeholder="How can we assist you?"
                    className="input-luxury w-full resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full sm:w-auto text-sm min-w-[200px] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="content-anim">
              {/* Embedded Map */}
              <div className="relative h-[300px] lg:h-[400px] mb-8 overflow-hidden border border-[#c9980a]/15">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.227264198!2d-0.1512!3d51.5099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605282e2a6b1d%3A0x3b68e7cb2b3a3b0!2sMayfair%2C%20London!5e0!3m2!1sen!2suk!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.1) brightness(0.6) sepia(0.3)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Royal Doves Hotel Location"
                />
                <div className="absolute inset-0 border border-[#c9980a]/15 pointer-events-none" />
              </div>

              {/* Operating Hours */}
              <div className="bg-[#111111] border border-[#c9980a]/15 p-6 lg:p-8 mb-6">
                <h3 className="font-display text-xl font-semibold text-[#e8b916] mb-4">
                  Operating Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Front Desk', hours: '24/7' },
                    { label: 'Restaurant', hours: '6:30 AM - 11:00 PM' },
                    { label: 'The Crown Bar', hours: '4:00 PM - 1:00 AM' },
                    { label: 'Royal Spa', hours: '8:00 AM - 10:00 PM' },
                    { label: 'Fitness Center', hours: '5:00 AM - 11:00 PM' },
                    { label: 'Concierge', hours: '24/7' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-[#c9980a]/5 last:border-0">
                      <span className="font-sans text-sm text-[#f5f0e8]/60">{item.label}</span>
                      <span className="font-sans text-sm text-[#e8b916] font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-[#111111] border border-[#c9980a]/15 p-6 lg:p-8">
                <h3 className="font-display text-xl font-semibold text-[#e8b916] mb-4">
                  Quick Contact
                </h3>
                <p className="font-serif text-sm text-[#f5f0e8]/60 mb-4">
                  For immediate assistance, reach out through any of these channels:
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-3 text-[#f5f0e8]/70 hover:text-[#e8b916] transition-colors"
                  >
                    <span className="w-8 h-8 flex items-center justify-center border border-[#c9980a]/20 rounded-full text-xs">📞</span>
                    <span className="font-sans text-sm">{contactInfo.phone}</span>
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 text-[#f5f0e8]/70 hover:text-[#e8b916] transition-colors"
                  >
                    <span className="w-8 h-8 flex items-center justify-center border border-[#c9980a]/20 rounded-full text-xs">✉️</span>
                    <span className="font-sans text-sm">{contactInfo.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[#080808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#e8b916] mb-4">
              FAQ
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="elegant-divider max-w-[200px] mx-auto">
              <span className="text-[#c9980a]">◆</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is your cancellation policy?',
                a: 'We offer free cancellation up to 48 hours before your scheduled check-in. Cancellations within 48 hours may incur a charge equivalent to one night\'s stay.',
              },
              {
                q: 'Do you offer airport transfers?',
                a: 'Yes, we provide luxury airport transfers for all guests. Please arrange with our concierge at least 24 hours in advance. Complimentary transfers are available for Royal Penthouse guests.',
              },
              {
                q: 'Is breakfast included in the room rate?',
                a: 'Full English and continental breakfast is included for Deluxe rooms and above. Classic Room guests can add breakfast for a supplementary charge.',
              },
              {
                q: 'Can I request early check-in or late check-out?',
                a: 'Subject to availability, early check-in from 12:00 PM and late check-out until 2:00 PM can be arranged. Suite guests enjoy guaranteed early check-in and late check-out.',
              },
              {
                q: 'Do you accommodate special dietary requirements?',
                a: 'Absolutely. Our culinary team is experienced in preparing meals for all dietary needs including vegetarian, vegan, gluten-free, halal, and kosher options. Please inform us in advance.',
              },
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-[#c9980a]/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left group hover:bg-[#c9980a]/5 transition-colors"
      >
        <span className="font-display text-base font-medium text-white group-hover:text-[#e8b916] transition-colors pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#e8b916] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: isOpen ? '200px' : '0' }}
      >
        <p className="px-5 pb-5 font-serif text-sm text-[#f5f0e8]/60 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
