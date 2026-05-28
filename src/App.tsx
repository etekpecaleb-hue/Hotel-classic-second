import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import FloatingActions from './components/FloatingActions';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
        <PageLoader />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#f5f0e8',
              border: '1px solid rgba(201, 152, 10, 0.3)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px',
            },
            success: {
              iconTheme: {
                primary: '#e8b916',
                secondary: '#0a0a0a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4444',
                secondary: '#0a0a0a',
              },
            },
          }}
        />
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </Router>
  );
}

export default App;
