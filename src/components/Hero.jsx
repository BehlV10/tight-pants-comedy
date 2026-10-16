import React from 'react';
import { Ticket, Star, Mic, Flame, ArrowRight, MapPin, Calendar } from 'lucide-react';

export default function Hero({ onScrollTo }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-zinc-300">
            <span className="text-amber-400">★</span> Featured in Time Out New York
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300">
            <Flame className="w-3.5 h-3.5 text-rose-400" /> NY Comedy Festival Record Holder
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 border border-amber-400/30 text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0 Star Rated Showcase
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            NYC’s Tightest <br />
            <span className="text-amber-400">
              Stand-Up Showcase
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Rapid-fire sets. Unannounced national headliners. Zero filler material. 
            Co-produced by comedians <span className="text-white font-semibold">Kyle Wayne</span> and <span className="text-white font-semibold">John Bennett</span> at the legendary <span className="text-amber-300 font-semibold">St. Marks Comedy Club</span>.
          </p>
        </div>

        {/* Quick CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onScrollTo('shows')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Ticket className="w-5 h-5 fill-black" />
            <span>Find Tickets & Upcoming Dates</span>
          </button>
          
          <button
            onClick={() => onScrollTo('booking')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all cursor-pointer"
          >
            <Mic className="w-5 h-5 text-purple-400" />
            <span>Comics: Submit Tape</span>
          </button>
        </div>

        {/* Live Next Show Spotlight Card (Real Tight Pants Data) */}
        <div className="max-w-2xl mx-auto tight-glass-glow rounded-3xl p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                Next Upcoming Showcase
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-3 py-1 rounded-full w-fit">
              <Flame className="w-3.5 h-3.5" /> 88% Sold Out • 8 Tickets Left
            </span>
          </div>

          <div className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Tight Pants Comedy Show
              </h3>
              <div className="space-y-1 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">Thursday, Oct 15, 2026 • 8:30 PM (Doors 8:00 PM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>St. Marks Comedy Club (12 St. Marks Place, NYC)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["Netflix", "Kill Tony", "Comedy Cellar", "Don't Tell"].map((credit) => (
                  <span key={credit} className="text-[11px] font-medium bg-white/5 text-zinc-300 px-2 py-0.5 rounded border border-white/5">
                    {credit}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-start md:items-end justify-center">
              <div className="text-2xl font-black text-white mb-1">
                $18 <span className="text-xs text-zinc-400 font-normal">($20 after fees)</span>
              </div>
              <a
                href="https://www.stmarkscomedy.com/shows/tight-pants-comedy-show-2026-10-15-2cad7303"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-black bg-amber-400 hover:bg-amber-300 transition-all text-sm"
              >
                Buy Tickets <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Social Proof Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">120+</div>
            <div className="text-xs text-zinc-400 font-medium">Shows Produced</div>
          </div>
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-0.5">5.0 ★</div>
            <div className="text-xs text-zinc-400 font-medium">Audience Rating</div>
          </div>
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">15,000+</div>
            <div className="text-xs text-zinc-400 font-medium">Laughs Delivered</div>
          </div>
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mb-0.5">#1</div>
            <div className="text-xs text-zinc-400 font-medium">Indie East Village Room</div>
          </div>
        </div>

      </div>
    </section>
  );
}
