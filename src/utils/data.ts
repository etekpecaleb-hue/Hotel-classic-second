export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  size: string;
  guests: number;
  beds: string;
  description: string;
  amenities: string[];
  rating: number;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

export const rooms: Room[] = [
  {
    id: 'classic-101',
    name: 'Classic Room',
    type: 'Classic',
    price: 350,
    image: 'https://images.pexels.com/photos/6466478/pexels-photo-6466478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    size: '45 m²',
    guests: 2,
    beds: 'Queen Bed',
    description: 'A timeless retreat featuring elegant period furnishings, rich fabrics, and classic architectural details. Perfect for discerning travelers seeking refined comfort.',
    amenities: ['Wi-Fi', 'Mini Bar', 'Room Service', 'Smart TV', 'Safe', 'Air Conditioning'],
    rating: 4.8,
  },
  {
    id: 'deluxe-201',
    name: 'Deluxe Room',
    type: 'Deluxe',
    price: 550,
    image: '/images/room-deluxe.jpg',
    size: '65 m²',
    guests: 2,
    beds: 'King Bed',
    description: 'Spacious luxury with floor-to-ceiling windows, premium furnishings, and a marble bathroom. Wake up to breathtaking views in supreme comfort.',
    amenities: ['Wi-Fi', 'Mini Bar', 'Room Service', 'Smart TV', 'Safe', 'Air Conditioning', 'Bathtub', 'Lounge Area'],
    rating: 4.9,
  },
  {
    id: 'suite-301',
    name: 'Grand Suite',
    type: 'Suite',
    price: 950,
    image: '/images/room-suite.jpg',
    size: '95 m²',
    guests: 3,
    beds: 'King Bed + Sofa Bed',
    description: 'An expansive sanctuary with separate living area, dining space, and panoramic views. Experience the pinnacle of five-star accommodation.',
    amenities: ['Wi-Fi', 'Mini Bar', 'Room Service', 'Smart TV', 'Safe', 'Air Conditioning', 'Bathtub', 'Lounge Area', 'Butler Service', 'Walk-in Closet'],
    rating: 4.95,
  },
  {
    id: 'royal-401',
    name: 'Royal Penthouse',
    type: 'Royal',
    price: 2500,
    image: '/images/room-royal.jpg',
    size: '180 m²',
    guests: 4,
    beds: 'Master King + Second Bedroom',
    description: 'The crown jewel of Royal Doves. A palatial penthouse with private terrace, personal butler, and unmatched opulence fit for royalty.',
    amenities: ['Wi-Fi', 'Mini Bar', 'Room Service', 'Smart TV', 'Safe', 'Air Conditioning', 'Jacuzzi', 'Private Terrace', 'Butler Service', 'Walk-in Closet', 'Private Chef', 'Helipad Access'],
    rating: 5.0,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Victoria Ashworth',
    location: 'London, United Kingdom',
    text: 'An absolutely transcendent experience. From the moment we arrived, every detail was curated to perfection. The Royal Penthouse exceeded all expectations — it was like living in a palace.',
    rating: 5,
    avatar: 'VA',
  },
  {
    id: 2,
    name: 'James Chen',
    location: 'Singapore',
    text: 'The Grand Suite was magnificent. The attention to detail, the quality of service, and the culinary experience at the restaurant were truly world-class. We will certainly return.',
    rating: 5,
    avatar: 'JC',
  },
  {
    id: 3,
    name: 'Isabella Romano',
    location: 'Milan, Italy',
    text: 'Having stayed at the finest hotels across Europe, I can confidently say Royal Doves stands among the very best. The spa, the dining, the rooms — everything is exceptional.',
    rating: 5,
    avatar: 'IR',
  },
  {
    id: 4,
    name: 'Alexander Petrov',
    location: 'Moscow, Russia',
    text: 'Pure luxury. The Royal Penthouse with its private terrace and personal butler service made our anniversary celebration truly unforgettable. A masterpiece of hospitality.',
    rating: 5,
    avatar: 'AP',
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/hero-lobby.jpg', title: 'Grand Lobby', category: 'Interior' },
  { id: 2, src: '/images/room-deluxe.jpg', title: 'Deluxe Room', category: 'Rooms' },
  { id: 3, src: '/images/room-suite.jpg', title: 'Grand Suite', category: 'Rooms' },
  { id: 4, src: '/images/room-royal.jpg', title: 'Royal Penthouse', category: 'Rooms' },
  { id: 5, src: '/images/restaurant.jpg', title: 'Fine Dining', category: 'Dining' },
  { id: 6, src: '/images/spa.jpg', title: 'Royal Spa', category: 'Wellness' },
  { id: 7, src: '/images/pool.jpg', title: 'Infinity Pool', category: 'Amenities' },
  { id: 8, src: '/images/hall.jpg', title: 'Grand Ballroom', category: 'Events' },
  { id: 9, src: '/images/garden.jpg', title: 'Palace Gardens', category: 'Exterior' },
  { id: 10, src: '/images/bar.jpg', title: 'The Crown Bar', category: 'Dining' },
  { id: 11, src: 'https://images.pexels.com/photos/6466478/pexels-photo-6466478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', title: 'Classic Room', category: 'Rooms' },
];

export const amenitiesList = [
  { icon: '🏊', name: 'Infinity Pool', description: 'Heated rooftop pool with panoramic city views' },
  { icon: '🧖', name: 'Royal Spa', description: 'Award-winning wellness center with bespoke treatments' },
  { icon: '🍽️', name: 'Fine Dining', description: 'Michelin-starred cuisine by world-renowned chefs' },
  { icon: '🍸', name: 'Crown Bar', description: 'Craft cocktails in an intimate, luxurious setting' },
  { icon: '💪', name: 'Fitness Center', description: 'State-of-the-art equipment with personal trainers' },
  { icon: '🎪', name: 'Grand Ballroom', description: 'Elegant venue for weddings, galas, and celebrations' },
  { icon: '🚗', name: 'Valet Parking', description: 'Complimentary luxury vehicle valet service' },
  { icon: '👔', name: 'Concierge', description: '24/7 dedicated concierge for personalized experiences' },
];

export const contactInfo = {
  address: '1 Royal Dove Avenue, Mayfair, London, W1K 2QP, United Kingdom',
  phone: '+44 (0) 20 7946 0958',
  email: 'reservations@royaldoveshotel.com',
  hours: 'Front Desk: 24/7 | Restaurant: 6:30 AM - 11:00 PM | Spa: 8:00 AM - 10:00 PM',
};
