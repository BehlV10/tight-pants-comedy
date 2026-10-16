import React from 'react';
import { Mic, Send, ExternalLink, Sparkles, CheckCircle2, Video, Trophy } from 'lucide-react';

export default function ComicsSection() {
  return (
    <section id="booking" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="tight-glass-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-500/15 via-rose-500/10 to-amber-500/15 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300">
                <Mic className="w-3.5 h-3.5" /> For Stand-Up Comedians
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-display">
                Got a Killer Tight Five? <br />
                <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                  Submit For Booking.
                </span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Kyle and John are constantly scouting fresh, sharp material for upcoming monthly residencies at St. Marks Comedy Club, tournament competitions, and touring showcases.
              </p>

              <div className="space-y-3 pt-2 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tape Criteria:</strong> 5–7 minute uninterrupted live set tape with good audio.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Avails:</strong> Include your NYC availability and any upcoming dates or touring conflicts.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Weekly Review:</strong> Submissions are reviewed by the producers weekly for showcase spots.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="https://forms.gle/VZreKT7KXQFju9hG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Open Booking Submission Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.sendyouravails.com/c/comfy-comedy/ClashHV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Comfy Clash Registration</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Card / Submission Info */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Submission Guidelines</h4>
                  <p className="text-xs text-zinc-400">Read before submitting your tape</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-400 border-t border-white/10 pt-4">
                <p>• YouTube, Vimeo, or Google Drive unlisted links preferred.</p>
                <p>• Make sure audio is clearly audible over the room laughter.</p>
                <p>• We book both established club regulars and standout newer comics who bring serious heat.</p>
                <p>• Please do not DM personal sets on Instagram — the Google Form is our single booking pipeline.</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://forms.gle/VZreKT7KXQFju9hG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  forms.gle/VZreKT7KXQFju9hG9 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
