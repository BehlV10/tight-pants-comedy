import React from 'react';
import { Ticket, Send, MapPin, Heart } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Footer({ onScrollTo }) {
  return (
    <footer className="border-t border-white/10 bg-[#07080e] pt-14 pb-12 text-zinc-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👖</span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Tight Pants <span className="text-amber-400">Comedy</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              New York City's premier independent stand-up comedy showcase. Produced with pride by Kyle Wayne & John Bennett.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.instagram.com/tightpantscomedy/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tightpantscomedy.eventbrite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-amber-400 transition-colors"
                aria-label="Eventbrite"
              >
                <Ticket className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onScrollTo('shows')} className="hover:text-amber-400 transition-colors">
                  Upcoming Shows & Tickets
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('about')} className="hover:text-amber-400 transition-colors">
                  About Tight Pants
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('reviews')} className="hover:text-amber-400 transition-colors">
                  Audience Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('faq')} className="hover:text-amber-400 transition-colors">
                  Venue & Policies
                </button>
              </li>
            </ul>
          </div>

          {/* For Comics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Performers</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://forms.gle/VZreKT7KXQFju9hG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3 text-purple-400" />
                  Booking Submission Form
                </a>
              </li>
              <li>
                <a
                  href="https://www.sendyouravails.com/c/comfy-comedy/ClashHV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  Comfy Clash Registration
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lifestyleofkyle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-200 transition-colors"
                >
                  Kyle Wayne (@lifestyleofkyle)
                </a>
              </li>
            </ul>
          </div>

          {/* Venues */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Venues & Partners</h4>
            <p className="text-xs text-zinc-400">
              <strong className="text-zinc-200">St. Marks Comedy Club</strong><br />
              12 St. Marks Place, East Village, New York, NY 10003
            </p>
            <p className="text-xs text-zinc-400">
              <strong className="text-zinc-200">Punch Line Philly</strong><br />
              33 E Laurel St, Philadelphia, PA
            </p>
            <div className="text-[11px] text-zinc-500 pt-1">
              Official Selection: New York Comedy Festival
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Tight Pants Comedy. All rights reserved. Made for comedy lovers.
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            Proudly keeping skinny jeans alive in NYC
          </div>
        </div>

      </div>
    </footer>
  );
}
