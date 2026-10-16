import React, { useState } from 'react';
import { Ticket, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Navbar({ onScrollTo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Urgency / Info Bar (Goofs Style) */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-black animate-ping"></span>
        <span>NEXT SHOW: THURSDAY @ ST. MARKS COMEDY CLUB (8:30 PM)</span>
        <a 
          href="#shows" 
          onClick={(e) => { e.preventDefault(); onScrollTo('shows'); }}
          className="underline hover:text-zinc-800 transition-colors ml-1 hidden sm:inline"
        >
          GET TICKETS &rarr;
        </a>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 tight-glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="text-2xl transition-transform group-hover:scale-110">👖</span>
            <div className="leading-tight">
              <span className="text-lg font-black tracking-tight text-white">
                Tight Pants <span className="text-amber-400">Comedy</span>
              </span>
              <span className="block text-[10px] font-semibold text-zinc-400 tracking-wider uppercase">
                St. Marks Comedy Club • NYC
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300">
            <button 
              onClick={() => onScrollTo('shows')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              Shows & Tickets
            </button>
            <button 
              onClick={() => onScrollTo('about')}
              className="hover:text-amber-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => onScrollTo('reviews')}
              className="hover:text-amber-400 transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => onScrollTo('booking')}
              className="hover:text-amber-400 transition-colors text-purple-300 hover:text-purple-200"
            >
              For Comics
            </button>
            <button 
              onClick={() => onScrollTo('faq')}
              className="hover:text-amber-400 transition-colors"
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
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-amber-400"
            >
              Tickets
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white"
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
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400"
            >
              🎟️ Shows & Tickets
            </button>
            <button
              onClick={() => { onScrollTo('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400"
            >
              📖 About the Show
            </button>
            <button
              onClick={() => { onScrollTo('reviews'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400"
            >
              ⭐ Audience Reviews
            </button>
            <button
              onClick={() => { onScrollTo('booking'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-purple-300 hover:text-purple-200"
            >
              🎤 Comic Booking Form
            </button>
            <button
              onClick={() => { onScrollTo('faq'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-base font-semibold text-zinc-200 hover:text-amber-400"
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
