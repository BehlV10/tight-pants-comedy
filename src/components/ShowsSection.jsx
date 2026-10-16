import React, { useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, ExternalLink, Flame } from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';

export default function ShowsSection() {
  const [filter, setFilter] = useState('all');

  const filteredShows = SHOWS_DATA.filter((show) => {
    if (filter === 'all') return true;
    return show.category === filter;
  });

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'orange':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'amber':
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <section id="shows" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Ticket className="w-4 h-4" /> Live Schedule & Tickets
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Upcoming Shows
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Shows consistently sell out. We recommend purchasing in advance via St. Marks Comedy Club or Eventbrite.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Shows' },
              { id: 'nyc', label: 'NYC (St. Marks)' },
              { id: 'tour', label: 'On Tour (Philly)' },
              { id: 'competition', label: 'Tournaments' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shows List */}
        <div className="space-y-4">
          {filteredShows.map((show) => (
            <div
              key={show.id}
              className={`tight-glass hover:border-white/20 transition-all rounded-3xl p-5 sm:p-6 relative group overflow-hidden ${
                show.isFeatured ? 'ring-1 ring-amber-400/30' : ''
              }`}
            >
              {show.isFeatured && (
                <div className="absolute top-0 right-8 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-b-md shadow-sm">
                  Featured Showcase
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Date Box + Title & Details */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1">
                  
                  {/* Date Badge */}
                  <div className="shrink-0 flex sm:flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl w-full sm:w-24 p-3 text-center">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mr-2 sm:mr-0">
                      {show.dayOfWeek}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {show.displayDate}
                    </span>
                  </div>

                  {/* Main Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {show.title}
                      </h3>
                      <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getBadgeStyle(show.badgeColor)}`}>
                        {show.statusBadge}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-zinc-300">
                      <span className="flex items-center gap-1.5 font-medium text-white">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {show.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <strong className="text-zinc-200">{show.venue}</strong> • {show.neighborhood}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 max-w-2xl">
                      {show.description}
                    </p>

                    {/* Credits pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {show.credits.map((credit) => (
                        <span
                          key={credit}
                          className="text-[11px] font-medium text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                        >
                          {credit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Capacity bar, price, and CTA */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10 lg:w-56">
                  
                  {/* Capacity progress */}
                  <div className="w-full text-right sm:text-left lg:text-right">
                    <div className="flex items-center justify-between lg:justify-end gap-2 text-[11px] font-medium mb-1">
                      <span className="text-zinc-400">Tickets:</span>
                      <span className="text-amber-400 font-semibold">{show.remainingTickets} left</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          show.capacityPercent > 80 ? 'bg-rose-500' : 'bg-amber-400'
                        }`}
                        style={{ width: `${show.capacityPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center lg:flex-col lg:items-end justify-between w-full gap-3">
                    <div className="text-xl sm:text-2xl font-black text-white">
                      {show.price}
                      <span className="text-xs text-zinc-400 font-normal ml-1">GA</span>
                    </div>

                    <a
                      href={show.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all text-sm cursor-pointer whitespace-nowrap"
                    >
                      <Ticket className="w-4 h-4 fill-black" />
                      <span>Buy Tickets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Eventbrite Organizer link banner */}
        <div className="mt-8 tight-glass rounded-2xl p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Follow Tight Pants on Eventbrite</h4>
            <p className="text-xs text-zinc-400">Get automatic alerts on your phone whenever new showcase dates drop.</p>
          </div>
          <a
            href="https://tightpantscomedy.eventbrite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>tightpantscomedy.eventbrite.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
