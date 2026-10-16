import React from 'react';
import { Star, Quote, CheckCircle, MessageSquare } from 'lucide-react';
import { REVIEWS_DATA } from '../data/shows';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 relative bg-black/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Star className="w-4 h-4 fill-amber-400" /> Real Audience Social Proof
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What Fans Are Saying
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-lg font-bold text-white">5.0</span>
            <span className="text-zinc-400 text-sm">/ 5.0 (200+ Verified Audience Reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="tight-glass rounded-3xl p-6 relative flex flex-col justify-between hover:border-white/20 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-500">
                    {review.date}
                  </span>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    {review.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xs text-zinc-400">{review.role}</div>
                </div>
                <div className="text-zinc-600 group-hover:text-amber-400 transition-colors">
                  <Quote className="w-5 h-5 opacity-40" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra press highlight banner */}
        <div className="mt-8 tight-glass rounded-2xl p-6 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-2xl">📰</span>
          <div className="text-sm text-zinc-300">
            <strong className="text-white">“One of the standout underground comedy showcases in Manhattan.”</strong> — <em>Time Out New York</em>
          </div>
        </div>

      </div>
    </section>
  );
}
