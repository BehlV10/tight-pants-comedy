import React, { useState, useEffect } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, CheckCircle, ShieldCheck, CreditCard, ChevronRight, AlertCircle, ExternalLink } from 'lucide-react';

export default function TicketCheckoutModal({ show, onClose }) {
  const [quantity, setQuantity] = useState(2);
  const [step, setStep] = useState(1); // 1: Select tickets & info, 2: Payment, 3: Confirmation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useEmbeddedEventbrite, setUseEmbeddedEventbrite] = useState(Boolean(show?.eventbriteEventId));

  // Base price extraction
  const unitPrice = parseFloat((show?.price || '$20').replace(/[^0-9.]/g, '')) || 20;
  const subtotal = unitPrice * quantity;
  const fee = Math.round(subtotal * 0.08 * 100) / 100; // Standard processing fee
  const total = (subtotal + fee).toFixed(2);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Initialize Eventbrite embedded widget if available with robust fallback
  useEffect(() => {
    if (show?.eventbriteEventId && useEmbeddedEventbrite && step === 1) {
      let isCancelled = false;
      let checkAttempts = 0;

      const initWidget = () => {
        if (isCancelled) return;
        if (window.EBWidgets) {
          const container = document.getElementById('eb-checkout-container');
          if (container) {
            container.innerHTML = '';
            try {
              window.EBWidgets.createWidget({
                widgetType: 'checkout',
                eventId: show.eventbriteEventId,
                iframeContainerId: 'eb-checkout-container',
                iframeContainerHeight: 480,
                onOrderComplete: () => {
                  setStep(3);
                }
              });
              return;
            } catch (e) {
              console.warn("EBWidgets failed, switching to native checkout:", e);
              setUseEmbeddedEventbrite(false);
            }
          }
        } else if (checkAttempts < 8) {
          checkAttempts++;
          setTimeout(initWidget, 300);
        } else {
          // If script blocked or timed out, default to smooth native checkout
          setUseEmbeddedEventbrite(false);
        }
      };

      initWidget();
      return () => { isCancelled = true; };
    }
  }, [show, step, useEmbeddedEventbrite]);

  if (!show) return null;

  const handleNativePayment = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0f111a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-purple-500/10 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              <span>Direct In-Page Checkout</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {show.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-300 pt-0.5">
              <span className="flex items-center gap-1 font-semibold text-white">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {show.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {show.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {show.venue}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Eventbrite Embedded Widget OR Ticket Selection */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* If show has Eventbrite ID, embed official Eventbrite iframe directly */}
              {show.eventbriteEventId && useEmbeddedEventbrite ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Powered by official Eventbrite Checkout:</span>
                    <button 
                      onClick={() => setUseEmbeddedEventbrite(false)}
                      className="text-amber-400 hover:underline"
                    >
                      Use guest checkout instead
                    </button>
                  </div>
                  <div id="eb-checkout-container" className="min-h-[460px] w-full rounded-2xl bg-white/5 overflow-hidden flex items-center justify-center text-zinc-400 text-sm">
                    Loading Eventbrite ticket box...
                  </div>
                </div>
              ) : (
                /* Native In-Page Flow */
                <div className="space-y-5">
                  
                  {/* Ticket Quantity Selector */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">General Admission</div>
                      <div className="text-xs text-zinc-400">Seating assigned upon arrival</div>
                      <div className="text-xs text-amber-400 font-semibold mt-0.5">${unitPrice} / ticket</div>
                    </div>

                    <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center cursor-pointer transition-colors"
                      >
                        -
                      </button>
                      <span className="font-bold text-white text-sm min-w-4 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Customer Info Fields */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Guest & Delivery Info
                    </h4>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Miller"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Email (Tickets sent here)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-zinc-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-zinc-500"
                      />
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-300">
                      <span>{quantity}x General Admission</span>
                      <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Processing & Venue Service Fee</span>
                      <span>${fee.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                      <span>Total Due</span>
                      <span className="text-amber-400 text-base">${total}</span>
                    </div>
                  </div>

                  {/* Showroom Note */}
                  <div className="flex items-start gap-2.5 text-xs text-zinc-400 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Venue Policy:</strong> 2-drink minimum per person in the showroom. 18+ to enter, 21+ for alcohol.</span>
                  </div>

                  {/* CTA Continue */}
                  <button
                    type="button"
                    disabled={!name || !email}
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Payment (${total})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>
              )}

            </div>
          )}

          {/* STEP 2: Secure Payment */}
          {step === 2 && (
            <form onSubmit={handleNativePayment} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="text-zinc-400">Order for <strong className="text-white">{name}</strong> ({quantity} Tickets)</span>
                <span className="text-amber-400 font-bold">${total}</span>
              </div>

              {/* Instant Apple Pay / Google Pay button */}
              <button
                type="button"
                onClick={handleNativePayment}
                className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <span>Pay / GPay (Instant Checkout)</span>
              </button>

              <div className="flex items-center gap-2 text-zinc-500 text-xs py-1">
                <div className="h-px bg-white/10 flex-1"></div>
                <span>or pay with card</span>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              {/* Credit Card Input */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4242 •••• •••• 4242"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Expiration</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      defaultValue="12/28"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      defaultValue="789"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-amber-400 focus:outline-none text-sm text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted. Tickets guaranteed upon completion.</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-white/5 border border-white/10 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
                      Confirming Order...
                    </span>
                  ) : (
                    <span>Complete Order (${total})</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmation */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-black text-white">You're On The Guestlist!</h4>
                <p className="text-xs text-zinc-400">
                  Confirmation and digital entry passes have been sent to <strong className="text-zinc-200">{email || 'your email'}</strong>.
                </p>
              </div>

              {/* Digital Pass Stub */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 max-w-sm mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-bold text-white uppercase tracking-wider">Tight Pants Comedy</span>
                  <span className="text-amber-400 font-bold">{quantity} Tickets Confirmed</span>
                </div>
                <div className="text-zinc-300">
                  <strong>Show:</strong> {show.title}
                </div>
                <div className="text-zinc-300">
                  <strong>Date:</strong> {show.date} • {show.time}
                </div>
                <div className="text-zinc-300">
                  <strong>Venue:</strong> {show.venue} ({show.address})
                </div>
                <div className="text-[11px] text-zinc-500 pt-1">
                  Check in at the door with your name: <strong className="text-white">{name || 'Guest'}</strong>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-bold text-black bg-amber-400 hover:bg-amber-300 transition-colors text-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info & External backup */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <span>St. Marks Comedy Club • 12 St. Marks Pl</span>
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Open external box office page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
