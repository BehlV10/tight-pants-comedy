import React, { useState } from 'react';
import { Ticket, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { SHOWS_DATA } from '../data/shows';

export default function Navbar({ onScrollTo, onNavigateToPress, currentView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamically calculate the next upcoming flagship Tight Pants show
  const today = new Date().toISOString().slice(0, 10);
  const upcomingMainShows = SHOWS_DATA
    .filter((s) => s.isoDate >= today && s.category === 'nyc')
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const nextShow = upcomingMainShows[0] || SHOWS_DATA.find((s) => s.isFeatured) || SHOWS_DATA[0];

  return (
    <>
      {/* Top Dynamic Urgency / Info Bar */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-black animate-ping"></span>
        <span className="truncate max-w-[280px] sm:max-w-none">
          {currentView === 'press' 
            ? 'OFFICIAL PRESS KIT • NY COMEDY FESTIVAL SELECTION • RECORD SHOWROOM ATTENDANCE'
            : `NEXT SHOW: ${nextShow.dayOfWeek}, ${nextShow.displayDate} @ ${nextShow.venue.toUpperCase()} • ${nextShow.title.toUpperCase()}`
          }
        </span>
        <button 
          onClick={() => onScrollTo('shows')}
          className="underline hover:text-zinc-800 transition-colors ml-1 hidden sm:inline cursor-pointer font-bold whitespace-nowrap"
        >
          {currentView === 'press' ? 'SEE UPCOMING SHOWS →' : 'GET TICKETS →'}
        </button>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 tight-glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => onScrollTo('shows')} 
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <span className="text-2xl transition-transform group-hover:scale-110">👖</span>
            <div className="leading-tight">
              <span className="text-lg font-black tracking-tight text-white">
                Tight Pants <span className="text-amber-400">Comedy</span>
              </span>
              <span className="block text-[10px] font-semibold text-zinc-400 tracking-wider uppercase">
                St. Marks Comedy Club • NYC
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-300">
            <button 
              onClick={() => onScrollTo('shows')}
              className={`transition-colors flex items-center gap-1.5 cursor-pointer ${currentView === 'home' ? 'hover:text-amber-400' : 'text-zinc-300 hover:text-amber-400'}`}
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              Shows & Tickets
            </button>
            <button 
              onClick={() => onScrollTo('about')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={onNavigateToPress}
              className={`transition-colors cursor-pointer ${currentView === 'press' ? 'text-amber-400 font-bold' : 'hover:text-amber-400 text-zinc-300'}`}
            >
              Press Kit
            </button>
            <button 
              onClick={() => onScrollTo('reviews')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Acclaim
            </button>
            <button 
              onClick={() => onScrollTo('booking')}
              className="hover:text-amber-400 transition-colors text-purple-300 hover:text-purple-200 cursor-pointer"
            >
              For Comics
            </button>
            <button 
              onClick={() => onScrollTo('faq')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Venue & FAQ
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://www.instagram.com/tightpantscomedy/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <button
              onClick={() => onScrollTo('shows')}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Ticket className="w-4 h-4 fill-black" />
              <span>Get Tickets</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onScrollTo('shows')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-amber-400 cursor-pointer"
            >
              Tickets
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0e101a] px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => { onScrollTo('shows'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400 cursor-pointer"
            >
              🎟️ Shows & Tickets
            </button>
            <button
              onClick={() => { onScrollTo('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400 cursor-pointer"
            >
              📖 About the Show
            </button>
            <button
              onClick={() => { onNavigateToPress(); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              📁 Press Kit & Media Assets
            </button>
            <button
              onClick={() => { onScrollTo('reviews'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400 cursor-pointer"
            >
              📰 Press & Acclaim
            </button>
            <button
              onClick={() => { onScrollTo('booking'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-purple-300 hover:text-purple-200 cursor-pointer"
            >
              🎤 Comic Booking Form
            </button>
            <button
              onClick={() => { onScrollTo('faq'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400 cursor-pointer"
            >
              📍 Venue & FAQ
            </button>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/tightpantscomedy/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm text-zinc-400 hover:text-white"
              >
                <InstagramIcon className="w-4 h-4" /> Follow @tightpantscomedy
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
