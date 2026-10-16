import React, { useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, ExternalLink, Flame, CheckCircle, Sparkles, History } from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';

export default function ShowsSection() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [filterCategory, setFilterCategory] = useState('all');

  // Dynamic date evaluation
  const today = new Date().toISOString().slice(0, 10);
  
  const upcomingShows = SHOWS_DATA
    .filter((show) => show.isoDate >= today)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  const pastShows = SHOWS_DATA
    .filter((show) => show.isoDate < today)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  // Filter within active tab
  const displayedShows = (activeTab === 'upcoming' ? upcomingShows : pastShows).filter((show) => {
    if (filterCategory === 'all') return true;
    return show.category === filterCategory;
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
      case 'zinc':
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      case 'amber':
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <section id="shows" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Ticket className="w-4 h-4" /> Live Schedule & Tickets
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {activeTab === 'upcoming' ? 'Upcoming Shows' : 'Past Shows Archive'}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              {activeTab === 'upcoming'
                ? "Browse upcoming dates at St. Marks Comedy Club and touring showcases. We recommend reserving early."
                : "A look back at our recent packed houses in NYC, Philadelphia, and beyond."}
            </p>
          </div>

          {/* Upcoming vs Past Toggle */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => { setActiveTab('upcoming'); setFilterCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Upcoming ({upcomingShows.length})
            </button>
            <button
              onClick={() => { setActiveTab('past'); setFilterCategory('all'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'past'
                  ? 'bg-zinc-800 text-white border border-white/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Past Archive ({pastShows.length})
            </button>
          </div>
        </div>

        {/* Category Filters for Upcoming */}
        {activeTab === 'upcoming' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'all', label: 'All Upcoming' },
              { id: 'nyc', label: 'St. Marks Residency' },
              { id: 'competition', label: 'Tournaments' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-white/20 text-white font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Shows List */}
        <div className="space-y-4">
          {displayedShows.map((show) => {
            const isPastShow = activeTab === 'past';

            return (
              <div
                key={show.id}
                className={`tight-glass hover:border-white/20 transition-all rounded-3xl p-5 sm:p-6 relative group overflow-hidden ${
                  show.isFeatured && !isPastShow ? 'ring-1 ring-amber-400/30' : ''
                } ${isPastShow ? 'opacity-85 bg-black/40' : ''}`}
              >
                {show.isFeatured && !isPastShow && (
                  <div className="absolute top-0 right-8 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-b-md shadow-sm">
                    Featured Event
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Date Box + Title & Details */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1">
                    
                    {/* Date Badge */}
                    <div className={`shrink-0 flex sm:flex-col items-center justify-center border rounded-2xl w-full sm:w-24 p-3 text-center ${
                      isPastShow ? 'bg-zinc-900 border-white/5' : 'bg-white/5 border-white/10'
                    }`}>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mr-2 sm:mr-0">
                        {show.dayOfWeek}
                      </span>
                      <span className={`text-2xl sm:text-3xl font-extrabold ${isPastShow ? 'text-zinc-400' : 'text-white'}`}>
                        {show.displayDate}
                      </span>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${
                          isPastShow ? 'text-zinc-300' : 'text-white group-hover:text-amber-300'
                        }`}>
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

                      {/* Room capacity / authenticty note */}
                      {show.roomCapacityNote && !isPastShow && (
                        <div className="text-xs text-amber-400/90 font-medium pt-0.5">
                          📍 {show.roomCapacityNote}
                        </div>
                      )}

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

                  {/* Right side: Price, and CTA */}
                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10 lg:w-52">
                    
                    <div className="text-xl sm:text-2xl font-black text-white">
                      {show.price}
                      <span className="text-xs text-zinc-400 font-normal ml-1">
                        {isPastShow ? '' : 'GA'}
                      </span>
                    </div>

                    {isPastShow ? (
                      <div className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 bg-white/5 border border-white/5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Show Concluded</span>
                      </div>
                    ) : (
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
                    )}

                  </div>

                </div>
              </div>
            );
          })}
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
