import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShowsSection from './components/ShowsSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ComicsSection from './components/ComicsSection';
import FaqSection from './components/FaqSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

export default function App() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c13] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <Navbar onScrollTo={scrollTo} />
      
      <main className="flex-1">
        <Hero onScrollTo={scrollTo} />
        <ShowsSection />
        <ReviewsSection />
        <AboutSection />
        <ComicsSection />
        <FaqSection />
        <NewsletterSection />
      </main>

      <Footer onScrollTo={scrollTo} />
    </div>
  );
}
