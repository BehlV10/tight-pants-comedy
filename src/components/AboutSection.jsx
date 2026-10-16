import React from 'react';
import { Mic, Award, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: The Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span>👖</span> The Origin & Vibe
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Two Millennials Who Refuse To Give Up Skinny Jeans.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Gen Z declared skinny jeans dead. Comedians <strong className="text-white">Kyle Wayne</strong> and <strong className="text-white">John Bennett</strong> respectfully disagree. 
              Named playfully after their shared millennial wardrobe allegiance, <strong className="text-amber-300">Tight Pants Comedy</strong> was born out of a simple promise: <em className="text-white">cut the filler, keep the sets tight, and make every minute count.</em>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="tight-glass p-4 rounded-2xl border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>The "Tight Five" Philosophy</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Comics deliver only their sharpest, most polished material. Fast-paced, high energy, zero downtime.
                </p>
              </div>

              <div className="tight-glass p-4 rounded-2xl border-white/5 space-y-1">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Award className="w-4 h-4 text-rose-400" />
                  <span>Curated Lineups</span>
                </div>
                <p className="text-xs text-zinc-400">
                  A dynamic blend of national touring headliners, Comedy Cellar regulars, and underground NYC killers.
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed">
              With over 120+ packed shows under their belt, Tight Pants has become a staple of New York’s indie comedy underground. From breaking attendance records at St. Marks Comedy Club during the New York Comedy Festival to hitting the road for touring showcases at venues like Punch Line Philly, the energy is consistently electric.
            </p>

            {/* Producers mini bio */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/10">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Producers:</span>
              <a 
                href="https://www.instagram.com/lifestyleofkyle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-200 hover:text-amber-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" /> Kyle Wayne (@lifestyleofkyle)
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-200 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                John Bennett
              </span>
            </div>
          </div>

          {/* Right Column: Visual Card Highlight */}
          <div className="lg:col-span-5">
            <div className="tight-glass-glow rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                  The Tight Pants Experience
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Why Audiences Keep Coming Back
                </h3>
              </div>

              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Intimate East Village Vibe:</strong> Hosted in speakeasy-style subterranean rooms with great cocktail menus.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Secret Drop-Ins:</strong> You never know what Netflix or Comedy Central star might jump on the mic unannounced.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Snobbery:</strong> Accessible, punchy, unpretentious comedy with a crowd that's actually there to laugh.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Tight Five Competitions:</strong> Audience voting formats where comedians battle for real cash and bragging rights.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Featured in</div>
                  <div className="text-sm font-bold text-white">Time Out New York</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">Official Selection</div>
                  <div className="text-sm font-bold text-amber-300">NY Comedy Festival</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
