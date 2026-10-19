import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShowsSection from './components/ShowsSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ComicsSection from './components/ComicsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import PressKitPage from './components/PressKitPage';

export default function App() {
  const isPressHash = () => {
    const h = window.location.hash.toLowerCase();
    return h === '#/press' || h === '#press' || h === '#/press-kit' || h === '#press-kit';
  };

  const [currentView, setCurrentView] = useState(() => isPressHash() ? 'press' : 'home');

  useEffect(() => {
    const handleHashChange = () => {
      if (isPressHash()) {
        setCurrentView('press');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '' || window.location.hash.startsWith('#shows') || window.location.hash.startsWith('#about') || window.location.hash.startsWith('#reviews') || window.location.hash.startsWith('#faq')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, targetId = null) => {
    setCurrentView(view);
    if (view === 'press') {
      window.location.hash = '#/press';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash.startsWith('#/press')) {
        window.location.hash = targetId ? `#${targetId}` : '';
      }
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollTo = (id) => {
    if (currentView !== 'home') {
      navigateTo('home', id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c13] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <Navbar 
        onScrollTo={scrollTo} 
        onNavigateToPress={() => navigateTo('press')}
        currentView={currentView}
      />
      
      <main className="flex-1">
        {currentView === 'press' ? (
          <PressKitPage onBackToHome={() => navigateTo('home', 'shows')} />
        ) : (
          <>
            <Hero onScrollTo={scrollTo} />
            <ShowsSection />
            <ReviewsSection onNavigateToPress={() => navigateTo('press')} />
            <AboutSection onNavigateToPress={() => navigateTo('press')} />
            <ComicsSection />
            <FaqSection />
          </>
        )}
      </main>

      <Footer 
        onScrollTo={scrollTo} 
        onNavigateToPress={() => navigateTo('press')}
      />
    </div>
  );
}

