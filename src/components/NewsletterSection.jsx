import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tight-glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-white/10">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-3xl">👖⚡</span>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-display">
              Never Miss A Show or Drop
            </h3>
            
            <p className="text-sm text-zinc-300 leading-relaxed">
              Get secret headliner drops, festival dates, and early bird discount codes delivered straight to your inbox. No spam, ever.
            </p>

            {subscribed ? (
              <div className="pt-4 flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-500/10 border border-emerald-500/20 py-3 px-6 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
                <span>You’re on the VIP list! Keep an eye on your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all text-sm shrink-0 cursor-pointer"
                >
                  Join List
                </button>
              </form>
            )}

            <div className="text-[11px] text-zinc-500 pt-1">
              By subscribing, you agree to receive show announcements. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
