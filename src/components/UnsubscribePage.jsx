import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, ArrowLeft, Loader2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export default function UnsubscribePage({ onBackToHome }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [unsubscribed, setUnsubscribed] = useState(false);

  // Check URL query parameters for pre-filled email (e.g. ?email=user@example.com)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search || window.location.hash.split('?')[1]);
      const emailParam = params.get('email');
      if (emailParam) {
        setEmail(emailParam.trim());
      }
    } catch {
      // Ignore URL parsing error
    }
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setLoading(true);

    const payload = {
      action: 'unsubscribe',
      email: cleanEmail,
      timestamp: new Date().toLocaleString(),
      source: 'Website Unsubscribe Page'
    };

    // 1. Record in browser localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tight_pants_unsubscribes') || '[]');
      if (!existing.includes(cleanEmail)) {
        existing.push(cleanEmail);
        localStorage.setItem('tight_pants_unsubscribes', JSON.stringify(existing));
      }
    } catch (err) {
      console.warn('Local storage error:', err);
    }

    // 2. Dispatch to Google Sheets Webhook if configured
    if (SITE_CONFIG.googleSheetWebhookUrl) {
      try {
        await fetch(SITE_CONFIG.googleSheetWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Webhook dispatch error:', err);
      }
    }

    setLoading(false);
    setUnsubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#07080f] text-zinc-100 flex flex-col justify-between p-4 sm:p-8">
      
      {/* Top Bar */}
      <div className="max-w-xl w-full mx-auto pt-4 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Tight Pants Comedy</span>
        </button>

        <span className="text-xl">👖</span>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-12 space-y-6">
        <div className="tight-glass rounded-3xl p-8 border border-white/10 space-y-6 shadow-2xl">
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-2xl">
              💌
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Manage Preferences
            </h1>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We’re sorry to see you go! Enter your email below to unsubscribe from Tight Pants Comedy showcase announcements and VIP drops.
            </p>
          </div>

          {unsubscribed ? (
            <div className="space-y-5 text-center">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-white">You’re Unsubscribed</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-emerald-300 font-mono">{email}</strong> has been removed from our active email list. You will not receive any further announcements.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onBackToHome}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors cursor-pointer"
                >
                  Return to Tight Pants Comedy Homepage
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUnsubscribe} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-xs bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 hover:border-rose-500/50 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{loading ? 'Processing...' : 'Unsubscribe from All Emails'}</span>
              </button>

              <div className="text-[11px] text-zinc-500 text-center pt-2">
                Questions? You can also email us directly at{' '}
                <a href="mailto:tightpantscomedy@gmail.com?subject=Unsubscribe%20Request" className="underline text-zinc-400 hover:text-white">
                  tightpantscomedy@gmail.com
                </a>.
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Footer */}
      <div className="max-w-xl w-full mx-auto text-center text-[11px] text-zinc-600 pb-2">
        Tight Pants Comedy • St. Marks Comedy Club • 12 St. Marks Place, New York, NY 10003
      </div>

    </div>
  );
}
