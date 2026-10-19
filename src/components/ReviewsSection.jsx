import React from 'react';
import { Quote, Award, Sparkles, Newspaper, Flame, Trophy } from 'lucide-react';
import { PRESS_DATA } from '../data/shows';

export default function ReviewsSection({ onNavigateToPress }) {
  return (
    <section id="reviews" className="py-16 md:py-24 relative bg-black/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Newspaper className="w-4 h-4" /> Press & Festival Acclaim
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Recognized by NYC’s Comedy Scene
          </h2>

          <p className="mt-3 text-zinc-400 text-sm sm:text-base">
            From official features in <span className="text-white font-semibold">Time Out New York</span> to setting showroom attendance records at the <span className="text-amber-400 font-semibold">New York Comedy Festival</span>.
          </p>
        </div>

        {/* Press & Accolades Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESS_DATA.map((item) => (
            <div
              key={item.id}
              className="tight-glass rounded-3xl p-6 relative flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" /> {item.badge}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500">
                    {item.year}
                  </span>
                </div>

                {item.id === 2 && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-white/10 max-h-36 bg-black/60 shadow-lg">
                    <img
                      src="/images/nycf-poster.png"
                      alt="Tight Pants New York Comedy Festival Official Poster"
                      className="w-full h-36 object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                )}

                <p className="text-zinc-200 text-sm leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-base">
                    {item.publication}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">{item.context}</div>
                </div>
                <div className="text-amber-400/30 group-hover:text-amber-400 transition-colors">
                  <Quote className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comic Network Credits Strip */}
        <div className="mt-10 tight-glass rounded-2xl p-6 text-center max-w-4xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
            Guest Comedians & Drop-Ins on Tight Pants Lineups Have Appeared On
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-zinc-300">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white">Netflix</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white">HBO / Max</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white">Comedy Central</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white">Hulu</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white">The Comedy Cellar</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white">Don't Tell Comedy</span>
          </div>

          {/* Direct Press Kit Link */}
          {onNavigateToPress && (
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center">
              <button
                onClick={onNavigateToPress}
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer px-3.5 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20"
              >
                <span>📁 Looking for high-res assets & full festival history?</span>
                <span className="underline">Open Official Press Kit &rarr;</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
