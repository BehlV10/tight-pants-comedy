import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MapPin, Wine, Clock, Users } from 'lucide-react';
import { FAQS } from '../data/shows';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-4 h-4" /> Need to Know
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Venue & FAQ
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Everything you need to know before joining us for a night of laughs.
          </p>
        </div>

        {/* Quick Venue Overview Card */}
        <div className="tight-glass rounded-2xl p-6 mb-8 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-semibold uppercase">Home Residency</div>
              <div className="text-sm font-bold text-white">St. Marks Comedy Club</div>
              <div className="text-xs text-zinc-400">12 St. Marks Place, NYC</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <Wine className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-semibold uppercase">Showroom Policy</div>
              <div className="text-sm font-bold text-white">2-Item Minimum</div>
              <div className="text-xs text-zinc-400">Drinks, beers, or snacks</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-semibold uppercase">Door Times</div>
              <div className="text-sm font-bold text-white">Doors 30m Prior</div>
              <div className="text-xs text-zinc-400">Arrive early for best seating</div>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="tight-glass rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-300 transition-colors cursor-pointer text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform shrink-0 ${
                      isOpen ? 'transform rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
