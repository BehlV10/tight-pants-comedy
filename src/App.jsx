import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShowsSection from './components/ShowsSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ComicsSection from './components/ComicsSection';
import FaqSection from './components/FaqSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import TicketCheckoutModal from './components/TicketCheckoutModal';

export default function App() {
  const [selectedShowForCheckout, setSelectedShowForCheckout] = useState(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c13] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <Navbar onScrollTo={scrollTo} onOpenCheckout={(show) => setSelectedShowForCheckout(show)} />
      
      <main className="flex-1">
        <Hero 
          onScrollTo={scrollTo} 
          onBuyTickets={(show) => setSelectedShowForCheckout(show)} 
        />
        <ShowsSection 
          onBuyTickets={(show) => setSelectedShowForCheckout(show)} 
        />
        <ReviewsSection />
        <AboutSection />
        <ComicsSection />
        <FaqSection />
        <NewsletterSection />
      </main>

      <Footer onScrollTo={scrollTo} />

      {/* Direct In-Page Ticket Checkout Modal */}
      {selectedShowForCheckout && (
        <TicketCheckoutModal
          show={selectedShowForCheckout}
          onClose={() => setSelectedShowForCheckout(null)}
        />
      )}
    </div>
  );
}
