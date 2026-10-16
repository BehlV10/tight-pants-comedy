import React from 'react';
import { Ticket, Star, Mic, Flame, ArrowRight, MapPin, Calendar, Sparkles } from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';

export default function Hero({ onScrollTo }) {
  // Dynamically find the next upcoming future show
  const today = new Date().toISOString().slice(0, 10);
  const upcomingShows = SHOWS_DATA
    .filter((s) => s.isoDate >= today)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const nextShow = upcomingShows[0] || SHOWS_DATA.find((s) => s.isFeatured) || SHOWS_DATA[0];

  return (
    <section className="relative pt-10 pb-6 md:pt-14 md:pb-8 overflow-hidden">
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
            <MapPin className="w-3.5 h-3.5 text-amber-400" /> St. Marks Comedy Club Residency
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

        {/* Live Next Show Spotlight Card (Dynamically Next Upcoming Show) */}
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

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/15 border border-orange-500/30 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" /> {nextShow.statusBadge}
            </span>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {nextShow.flierUrl && (
              <div className="shrink-0 w-28 sm:w-36 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/60 group">
                <img 
                  src={nextShow.flierUrl} 
                  alt={nextShow.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="eager"
                />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between w-full space-y-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  {nextShow.title}
                </h3>
                <div className="space-y-1 text-sm text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-white">{nextShow.date} • {nextShow.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{nextShow.venue} ({nextShow.address.split(',')[0]}, NYC)</span>
                  </div>
                </div>

                {nextShow.roomCapacityNote && (
                  <div className="text-xs text-amber-300/90 mt-2 font-medium">
                    📍 {nextShow.roomCapacityNote} • Early arrival recommended
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {nextShow.credits.map((credit) => (
                    <span key={credit} className="text-[11px] font-medium bg-white/5 text-zinc-300 px-2 py-0.5 rounded border border-white/5">
                      {credit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-2xl font-black text-white">
                  {nextShow.price} <span className="text-xs text-zinc-400 font-normal">GA</span>
                </div>
                <a
                  href={nextShow.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all text-sm cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Ticket className="w-4 h-4 fill-black" />
                  <span>Buy Tickets {nextShow.ticketUrl.includes('eventbrite') ? '(via Eventbrite)' : '(via St. Marks)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Real Social Proof Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-center">
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">100+</div>
            <div className="text-xs text-zinc-400 font-medium">Shows Produced in NYC</div>
          </div>
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-0.5">NYCF</div>
            <div className="text-xs text-zinc-400 font-medium">Official Festival Selection</div>
          </div>
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">150+</div>
            <div className="text-xs text-zinc-400 font-medium">Tournament Comics Scouted</div>
          </div>
          <div className="tight-glass p-4 rounded-2xl">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mb-0.5">~60</div>
            <div className="text-xs text-zinc-400 font-medium">Intimate Showroom Seats</div>
          </div>
        </div>

      </div>
    </section>
  );
}
