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
import EmailStudio from './components/EmailStudio';
import UnsubscribePage from './components/UnsubscribePage';

export default function App() {
  const isUnsubscribeRoute = () => {
    const h = window.location.hash.toLowerCase().replace(/\/+$/, '');
    const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    return h.includes('unsubscribe') || p.endsWith('/unsubscribe');
  };

  const isPressRoute = () => {
    const h = window.location.hash.toLowerCase().replace(/\/+$/, '');
    const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    return h.includes('press') || p.endsWith('/press') || p.endsWith('/press-kit');
  };

  const isStudioRoute = () => {
    const h = window.location.hash.toLowerCase().replace(/\/+$/, '');
    const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    return h.includes('studio') || p.endsWith('/studio') || p.endsWith('/email-studio');
  };

  const getViewFromLocation = () => {
    if (isUnsubscribeRoute()) return 'unsubscribe';
    if (isStudioRoute()) return 'studio';
    if (isPressRoute()) return 'press';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getViewFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      if (isUnsubscribeRoute()) {
        setCurrentView('unsubscribe');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (isStudioRoute()) {
        setCurrentView('studio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (isPressRoute()) {
        setCurrentView('press');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '' || window.location.hash.startsWith('#shows') || window.location.hash.startsWith('#about') || window.location.hash.startsWith('#reviews') || window.location.hash.startsWith('#faq')) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigateTo = (view, targetId = null) => {
    setCurrentView(view);
    if (view === 'unsubscribe') {
      window.location.hash = '#/unsubscribe';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'press') {
      window.location.hash = '#/press';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'studio') {
      window.location.hash = '#/studio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash.startsWith('#/press') || window.location.hash.startsWith('#/studio') || window.location.hash.startsWith('#/unsubscribe')) {
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

  const isBackstage = currentView === 'studio' || currentView === 'unsubscribe';

  return (
    <div className="min-h-screen bg-[#0b0c13] text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {!isBackstage && (
        <Navbar 
          onScrollTo={scrollTo} 
          onNavigateToPress={() => navigateTo('press')}
          currentView={currentView}
        />
      )}
      
      <main className="flex-1">
        {currentView === 'unsubscribe' ? (
          <UnsubscribePage onBackToHome={() => navigateTo('home')} />
        ) : currentView === 'studio' ? (
          <EmailStudio onBackToHome={() => navigateTo('home', 'shows')} />
        ) : currentView === 'press' ? (
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

      {!isBackstage && (
        <Footer 
          onScrollTo={scrollTo} 
          onNavigateToPress={() => navigateTo('press')}
        />
      )}
    </div>
  );
}

