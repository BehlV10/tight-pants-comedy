import React from 'react';
import { Mic, Award, Trophy, Users, CheckCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function AboutSection({ onNavigateToPress }) {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: The Real Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span>👖</span> The Collective & Story
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              An Independent NYC Stand-Up Collective
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Comedians <strong className="text-white">Kyle Wayne</strong> and <strong className="text-white">John Bennett</strong> joined forces to establish <strong className="text-amber-300">Tight Pants Comedy</strong>, an independent collective bringing curated comedy shows to their favorite venues in New York City.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              The name playfully pokes fun at the fact that Kyle and John are both millennials who refuse to give up their skinny jeans, despite Gen Z declaring them uncool. While the co-founders are millennials, Tight Pants represents a true cross-section of the NYC comedy scene—welcoming comics and audiences of all backgrounds.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="tight-glass p-4 rounded-2xl border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>Monthly Showcases</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Curated lineups combining national touring headliners with NYC's sharpest underground club regulars.
                </p>
              </div>

              <div className="tight-glass p-4 rounded-2xl border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Trophy className="w-4 h-4 text-rose-400" />
                  <span>The $5 "Tight Five"</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Frustrated by festivals charging comics huge fees, Kyle & John launched an accessible $5 tournament with 150+ comics.
                </p>
              </div>
            </div>

            {/* Producers Bios */}
            <div className="pt-2 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                The Co-Producers
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Kyle Wayne</span>
                    <a
                      href="https://www.instagram.com/lifestyleofkyle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-amber-400 transition-colors"
                      aria-label="Kyle Wayne on Instagram"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Brooklyn-based comic originally from Iowa. Draws material from his background in public health, dating history, and crowd work.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">John Bennett</span>
                    <span className="text-[11px] text-zinc-500 font-medium">Co-Founder</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Attorney-turned-comedian residing in Manhattan. Known for high-energy stage presence and extended storytelling sets.
                  </p>
                </div>
              </div>

              {onNavigateToPress && (
                <div className="pt-1">
                  <button
                    onClick={onNavigateToPress}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>View full producer bios, festival history & media in our Press Kit</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Real Stage Photography */}
          <div className="lg:col-span-5 space-y-4">
            <div className="tight-glass rounded-3xl p-3 sm:p-4 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 relative">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/66632345-2280-4c03-b9af-4f3ae8c25216/IMG_0211.jpg"
                  alt="Tight Pants Comedy Live on Stage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-xs text-zinc-300">
                    <span className="font-bold text-white block text-sm">Live in New York City</span>
                    Kyle Wayne & John Bennett producing Tight Pants Comedy
                  </div>
                </div>
              </div>

              {/* Showroom Stats Banner */}
              <div className="pt-4 px-2 pb-2 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-lg font-black text-amber-400">100+</div>
                  <div className="text-[11px] text-zinc-400">NYC Shows Produced</div>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <div className="text-lg font-black text-white">St. Marks</div>
                  <div className="text-[11px] text-zinc-400">Monthly Residency</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
