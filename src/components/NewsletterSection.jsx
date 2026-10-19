import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setLoading(true);

    const payload = {
      email: cleanEmail,
      source: 'Website VIP Signup',
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    };

    // 1. Always backup locally to browser storage so no signups are ever lost
    try {
      const existing = JSON.parse(localStorage.getItem('tight_pants_web_subscribers') || '[]');
      if (!existing.some((item) => (typeof item === 'string' ? item : item.email) === cleanEmail)) {
        existing.push(payload);
        localStorage.setItem('tight_pants_web_subscribers', JSON.stringify(existing));
      }
    } catch (err) {
      console.warn('Local storage error:', err);
    }

    // 2. Dispatch to Google Apps Script webhook if configured
    if (SITE_CONFIG.googleSheetWebhookUrl) {
      try {
        await fetch(SITE_CONFIG.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script web apps
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Webhook dispatch error:', err);
      }
    }

    setLoading(false);
    setSubscribed(true);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tight-glass rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-white/10">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-3xl">👖⚡</span>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Never Miss A Show or Drop
            </h3>
            
            <p className="text-sm text-zinc-300 leading-relaxed">
              Get secret headliner drops, festival dates, and early bird discount codes delivered straight to your inbox. No spam, ever.
            </p>

            {subscribed ? (
              <div className="pt-4 flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-500/10 border border-emerald-500/20 py-3 px-6 rounded-xl animate-fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
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
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-zinc-500 transition-colors disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all text-sm shrink-0 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading ? 'Joining...' : 'Join List'}</span>
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
