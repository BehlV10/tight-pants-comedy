import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Users, 
  FileText, 
  Tag, 
  Gift, 
  ExternalLink,
  MessageSquare,
  Globe,
  Share2,
  AlertCircle,
  Loader2,
  Lock,
  Key,
  ShieldCheck,
  Image as ImageIcon
} from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';
import { generateRedditCampaign } from '../utils/redditPromo';
import { SITE_CONFIG } from '../data/config';

export default function EmailStudio({ onBackToHome }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcomingShows = useMemo(() => {
    return SHOWS_DATA.filter((s) => s.isoDate >= today).sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  }, [today]);

  // Main active tab in studio: 'blast' | 'attendees' | 'reddit'
  const [activeTab, setActiveTab] = useState('blast');

  const [selectedShowId, setSelectedShowId] = useState(upcomingShows[0]?.id || SHOWS_DATA[0]?.id);
  const selectedShow = SHOWS_DATA.find((s) => s.id === selectedShowId) || upcomingShows[0] || SHOWS_DATA[0];

  // 4 Email Tones: announcement | urgency | personal | vip_comp
  const [emailStyle, setEmailStyle] = useState('announcement');
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // VIP Promo Code Settings (for Returning Member Free Tickets)
  const [promoCode, setPromoCode] = useState('RETURNINGVIP');
  const [compLimit, setCompLimit] = useState('2 free tickets on us');

  // Attendee Cleaner State
  const [rawEmails, setRawEmails] = useState('');
  const [copiedBatchIdx, setCopiedBatchIdx] = useState(null);

  // Web Subscribers from localStorage
  const [webSubscribers, setWebSubscribers] = useState([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('tight_pants_web_subscribers') || '[]');
      setWebSubscribers(stored);
    } catch {
      setWebSubscribers([]);
    }
  }, []);

  // Enforce noindex robots meta tag dynamically for privacy
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    const previous = meta.content;
    meta.content = 'noindex, nofollow, noarchive, nosnippet';
    return () => {
      meta.content = previous || 'index, follow';
    };
  }, []);

  // Producer Passcode Gate (stops crawlers, scrapers & unauthorized visitors)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('tp_studio_auth') === 'true' || localStorage.getItem('tp_studio_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [passcodeError, setPasscodeError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    const validCodes = ['tightpants', '12stmarks', 'kylejohn'];
    if (validCodes.includes(clean)) {
      setIsAuthenticated(true);
      setPasscodeError(false);
      if (rememberMe) {
        localStorage.setItem('tp_studio_auth', 'true');
      } else {
        sessionStorage.setItem('tp_studio_auth', 'true');
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tp_studio_auth');
    localStorage.removeItem('tp_studio_auth');
  };

  // Compute ticket link with optional auto-discount
  const baseTicketLink = selectedShow.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
  const effectiveTicketLink = useMemo(() => {
    if (emailStyle === 'vip_comp' && promoCode.trim()) {
      const cleanCode = encodeURIComponent(promoCode.trim().toUpperCase());
      return baseTicketLink.includes('?') 
        ? `${baseTicketLink}&discount=${cleanCode}` 
        : `${baseTicketLink}?discount=${cleanCode}`;
    }
    return baseTicketLink;
  }, [baseTicketLink, emailStyle, promoCode]);

  // Subject line variations
  const subjectLines = useMemo(() => {
    const show = selectedShow;
    if (emailStyle === 'announcement') {
      return [
        `👖 New Lineup: Tight Pants Comedy at St. Marks (${show.displayDate})`,
        `No midtown tourist traps. Live underground stand-up this ${show.dayOfWeek}!`,
        `Tight Pants is back in the East Village speakeasy (${show.displayDate})`,
        `Surprise guest drop-ins + ${show.price} GA: Tight Pants Comedy`
      ];
    } else if (emailStyle === 'urgency') {
      return [
        `⏳ Only ~15 seats left for ${show.displayDate} @ St. Marks Comedy Club!`,
        `Tomorrow night: Tight Pants Comedy (Intimate 60-seat showroom)`,
        `Final tickets: ${show.title} this ${show.dayOfWeek}`
      ];
    } else if (emailStyle === 'vip_comp') {
      return [
        `🎁 We held 2 free tickets for you: Tight Pants Comedy (${show.displayDate})`,
        `VIP Guest Pass: Tight Pants Comedy at St. Marks (${show.displayDate})`,
        `A quick thank you from Kyle & John (Free tickets inside!)`,
        `Secret VIP link: Comps for ${show.dayOfWeek} night at St. Marks`
      ];
    } else {
      return [
        `Hey from Kyle & John (quick invite for ${show.displayDate}!)`,
        `We're back in the basement showroom this week 👖`,
        `Special invite from Tight Pants Comedy: ${show.displayDate}`
      ];
    }
  }, [selectedShow, emailStyle]);

  // Plain-text email template with CAN-SPAM compliant unsubscribe footer
  const plainTextEmail = useMemo(() => {
    const show = selectedShow;
    const creditsStr = show.credits?.join(', ') || 'Netflix, Comedy Central, Comedy Cellar';

    const unsubscribeFooter = `
--------------------------------------------------
Tight Pants Comedy • St. Marks Comedy Club • 12 St. Marks Place, New York, NY 10003
You are receiving this because you attended a past Tight Pants show or joined our VIP guest list.
To unsubscribe or manage email preferences, reply "unsubscribe" or visit: https://tightpantscomedy.com/#/unsubscribe`;

    if (emailStyle === 'vip_comp') {
      return `Hey there!

Kyle Wayne and John Bennett here from Tight Pants Comedy.

First off—huge thank you for packing the room with us at past shows. Because you’ve supported our independent showcase in the past, we wanted to hook you up with something special.

We're back at our favorite East Village basement speakeasy at St. Marks Comedy Club on ${show.date} at ${show.time}. We’ve put together another killer lineup (${creditsStr}) and reserved a limited batch of complimentary VIP tickets for returning fans (${compLimit}).

🎟️ Direct VIP Link (Auto-Applies Free Ticket):
${effectiveTicketLink}

(Clicking the link above will automatically apply promo code "${promoCode.trim().toUpperCase()}" at Eventbrite checkout so your tickets are 100% free!)

Because this intimate subterranean showroom only holds around 60 seats, the comp list is strictly first-come, first-served. Once they're claimed, that's it!

Grab your free VIP seats here:
👉 ${effectiveTicketLink}

Can't wait to see you back in the showroom!

Best,
Kyle & John
Tight Pants Comedy
@tightpantscomedy | tightpantscomedy.com
${unsubscribeFooter}`;
    }

    if (emailStyle === 'announcement') {
      return `Hey everyone!

Kyle Wayne and John Bennett here from Tight Pants Comedy.

We're back with our next showcase at St. Marks Comedy Club, and we've put together another incredible lineup for you in the East Village:

📅 Date: ${show.date}
⏰ Time: ${show.time}
📍 Venue: ${show.venue} (${show.address})
🎟️ Tickets: ${show.price} GA (${show.roomCapacityNote || 'Intimate ~60 seat room'})
⚡ Direct Tickets & RSVP: ${effectiveTicketLink}

As always, we're bringing you a rapid-fire, curated lineup featuring comics you've seen on ${creditsStr}—with zero dead time and surprise headliner drop-ins.

Because this subterranean speakeasy room only holds around 60 seats, grabbing your tickets in advance on Eventbrite is strongly recommended before it fills up!

Grab your tickets here:
${effectiveTicketLink}

Can't wait to see you in the showroom!

Best,
Kyle & John
Tight Pants Comedy
@tightpantscomedy | tightpantscomedy.com
${unsubscribeFooter}`;
    }

    if (emailStyle === 'urgency') {
      return `Hey everyone!

Quick heads up: our next showcase is coming up this ${show.dayOfWeek}, and tickets are moving fast.

${show.title}
📅 ${show.date} @ ${show.time}
📍 ${show.venue} (${show.address})
🎟️ Tickets (${show.price} GA): ${effectiveTicketLink}

The showroom only holds about 60 seats, so once they're gone, the door is closed. If you've been meaning to come out or bring a group for Thursday date night, grab your seats now on Eventbrite:

👉 ${effectiveTicketLink}

Lineup includes killers from ${creditsStr}. See you in the basement!

- Kyle & John
Tight Pants Comedy
${unsubscribeFooter}`;
    }

    return `Hey comedy lovers!

Just wanted to send a quick personal note to say thank you for coming out to our past shows. 

We're bringing Tight Pants back to our favorite East Village basement showroom at St. Marks Comedy Club on ${show.date} at ${show.time}. 

We've got an awesome group of comics performing this time around (${creditsStr}), great craft cocktails in the showroom, and that classic high-energy underground NYC comedy vibe.

Here's the direct ticket link:
${effectiveTicketLink}

Would love to see you there! Feel free to reply directly to this email or DM us on Instagram (@tightpantscomedy) if you have any questions or want to bring a larger crew.

Cheers,
Kyle Wayne & John Bennett
Tight Pants Comedy
${unsubscribeFooter}`;
  }, [selectedShow, emailStyle, effectiveTicketLink, promoCode, compLimit]);

  // Clean HTML Email Template (for Brevo, Mailchimp, or HTML copy) with Unsubscribe Footer
  const htmlEmail = useMemo(() => {
    const show = selectedShow;
    const flier = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';
    const creditsStr = show.credits?.join(' • ') || 'Netflix • Comedy Central • Comedy Cellar';

    const isVip = emailStyle === 'vip_comp';
    const buttonLabel = isVip 
      ? `Claim Your Free VIP Tickets (${promoCode.trim().toUpperCase()}) →` 
      : `Get Tickets on Eventbrite (${show.price}) →`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${show.title}</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #0d0e15; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #121420; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; margin: 0 auto;">
    
    <!-- Header Banner -->
    <tr>
      <td style="padding: 24px 28px; background: linear-gradient(135deg, #1c1f30 0%, #0d0e15 100%); border-bottom: 1px solid rgba(255,255,255,0.08); text-align: center;">
        <span style="font-size: 28px;">👖⚡</span>
        <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
          TIGHT PANTS <span style="color: #fbbf24;">COMEDY</span>
        </h1>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">
          NYC Independent Stand-Up Collective
        </p>
      </td>
    </tr>

    <!-- Show Flier -->
    ${flier ? `
    <tr>
      <td style="padding: 0; background-color: #000000; text-align: center;">
        <a href="${effectiveTicketLink}" target="_blank" style="display: block;">
          <img src="${flier}" alt="${show.title}" width="580" style="width: 100%; max-width: 580px; height: auto; display: block; border: 0;" />
        </a>
      </td>
    </tr>
    ` : ''}

    <!-- Show Details Card -->
    <tr>
      <td style="padding: 28px;">
        
        ${isVip ? `
        <!-- VIP Comp Badge Box -->
        <div style="background: rgba(251, 191, 36, 0.12); border: 1px dashed #fbbf24; border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: center;">
          <span style="display: inline-block; font-size: 11px; text-transform: uppercase; font-weight: 800; color: #fbbf24; letter-spacing: 1.5px;">
            🎁 EXCLUSIVE RETURNING MEMBER PASS
          </span>
          <h3 style="margin: 6px 0 2px 0; font-size: 18px; color: #ffffff; font-weight: 800;">
            Code: <span style="color: #fbbf24; font-family: monospace; letter-spacing: 1px;">${promoCode.trim().toUpperCase()}</span>
          </h3>
          <p style="margin: 0; font-size: 12px; color: #d4d4d8;">
            (${compLimit} • Code automatically applied at link below)
          </p>
        </div>
        ` : `
        <span style="display: inline-block; padding: 4px 12px; border-radius: 999px; background-color: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); color: #fbbf24; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px;">
          Next Upcoming Showcase
        </span>
        `}

        <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 800; color: #ffffff; line-height: 1.25;">
          ${show.title}
        </h2>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.06);">
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
              <strong>📅 Date:</strong> ${show.date}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
              <strong>⏰ Time:</strong> ${show.time}
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #e4e4e7;">
              <strong>📍 Venue:</strong> ${show.venue} (${show.address})
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 14px; color: #fbbf24; font-weight: 700;">
              <strong>🎟️ Admission:</strong> ${isVip ? 'Free with VIP Comp Code' : `${show.price} GA`} (${show.roomCapacityNote || 'Intimate ~60 Seats'})
            </td>
          </tr>
        </table>

        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #d4d4d8;">
          Join co-founders Kyle Wayne & John Bennett for a curated stand-up comedy showcase featuring comics seen on <strong>${creditsStr}</strong>. Fast-paced, 7-minute sets with zero filler in an authentic East Village subterranean showroom.
        </p>

        <!-- CTA Button -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0;">
          <tr>
            <td align="center">
              <a href="${effectiveTicketLink}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #f59e0b, #fbbf24); color: #000000; font-size: 15px; font-weight: 800; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);">
                ${buttonLabel}
              </a>
            </td>
          </tr>
        </table>

        <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">
          ⚡ Seating is assigned based on check-in arrival time. Early booking strongly recommended!
        </p>
      </td>
    </tr>

    <!-- Footer with CAN-SPAM Unsubscribe Link -->
    <tr>
      <td style="padding: 24px 28px; background-color: #090a10; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: #71717a;">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #a1a1aa;">
          Tight Pants Comedy • St. Marks Comedy Club • 12 St. Marks Place, New York, NY 10003
        </p>
        <p style="margin: 0 0 12px 0;">
          <a href="https://tightpantscomedy.com" style="color: #fbbf24; text-decoration: none;">tightpantscomedy.com</a> • 
          <a href="https://www.instagram.com/tightpantscomedy" style="color: #fbbf24; text-decoration: none;">@tightpantscomedy</a>
        </p>
        <p style="margin: 0; font-size: 11px; color: #52525b; line-height: 1.5;">
          You received this email because you attended a past Tight Pants Comedy show or joined our VIP guest list.
          <br>
          <a href="https://tightpantscomedy.com/#/unsubscribe" style="color: #a1a1aa; text-decoration: underline;">Unsubscribe or Manage Email Preferences</a>
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;
  }, [selectedShow, emailStyle, effectiveTicketLink, promoCode, compLimit]);

  // Reddit Campaign Data for 12 Subreddits
  const redditCampaign = useMemo(() => {
    return generateRedditCampaign(selectedShow, effectiveTicketLink);
  }, [selectedShow, effectiveTicketLink]);

  // Attendee Cleaner / De-duplicator Logic
  const cleanedAttendees = useMemo(() => {
    if (!rawEmails.trim()) return [];
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const matches = rawEmails.match(emailRegex) || [];
    
    const uniqueMap = new Map();
    matches.forEach((e) => {
      const normalized = e.trim().toLowerCase();
      if (!uniqueMap.has(normalized)) {
        uniqueMap.set(normalized, normalized);
      }
    });

    return Array.from(uniqueMap.values());
  }, [rawEmails]);

  // Split into batches of 90 for Gmail
  const batches = useMemo(() => {
    const list = cleanedAttendees;
    const size = 90;
    const result = [];
    for (let i = 0; i < list.length; i += size) {
      result.push(list.slice(i, i + size));
    }
    return result;
  }, [cleanedAttendees]);

  const handleCopySubject = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(plainTextEmail);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  const [copiedRichHtml, setCopiedRichHtml] = useState(false);

  const handleCopyRichHtml = async () => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([htmlEmail], { type: 'text/html' });
        const blobText = new Blob([plainTextEmail], { type: 'text/plain' });
        const item = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText
        });
        await navigator.clipboard.write([item]);
        setCopiedRichHtml(true);
        setTimeout(() => setCopiedRichHtml(false), 2500);
        return;
      }
    } catch (err) {
      console.warn('Rich text clipboard copy failed:', err);
    }
    navigator.clipboard.writeText(htmlEmail);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlEmail);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopyBatch = (batch, idx) => {
    navigator.clipboard.writeText(batch.join(', '));
    setCopiedBatchIdx(idx);
    setTimeout(() => setCopiedBatchIdx(null), 2000);
  };

  const handleDownloadCsv = () => {
    if (!cleanedAttendees.length) return;
    const csvContent = 'Email\n' + cleanedAttendees.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tight-pants-clean-attendees-${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [syncingToSheet, setSyncingToSheet] = useState(false);
  const [syncedCount, setSyncedCount] = useState(null);
  const [syncError, setSyncError] = useState(null);
  const [copiedSheetTsv, setCopiedSheetTsv] = useState(false);

  const handleSyncToSheet = async () => {
    if (!cleanedAttendees.length || !SITE_CONFIG.googleSheetWebhookUrl) return;
    setSyncingToSheet(true);
    setSyncedCount(null);
    setSyncError(null);
    try {
      await fetch(SITE_CONFIG.googleSheetWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_eventbrite',
          eventName: selectedShow.title,
          attendees: cleanedAttendees,
          timestamp: new Date().toLocaleString()
        })
      });
      setSyncedCount(cleanedAttendees.length);
      setTimeout(() => setSyncedCount(null), 5000);
    } catch (err) {
      console.error('Error syncing to sheet:', err);
      setSyncError('Sync request could not reach Google Apps Script. Check deployment permissions or use "Copy Rows for Sheet" below.');
    } finally {
      setSyncingToSheet(false);
    }
  };

  const handleCopyForSheets = () => {
    if (!cleanedAttendees.length) return;
    const now = new Date().toLocaleString();
    const rows = cleanedAttendees.map(email => `${now}\t${email}\t${selectedShow.title}\tEventbrite Import\tActive`);
    const tsvData = rows.join('\n');
    navigator.clipboard.writeText(tsvData);
    setCopiedSheetTsv(true);
    setTimeout(() => setCopiedSheetTsv(false), 3000);
  };

  const handleDownloadWebCsv = () => {
    if (!webSubscribers.length) return;
    const rows = ['Email,Date,Source'];
    webSubscribers.forEach((item) => {
      if (typeof item === 'string') {
        rows.push(`${item},,Website VIP Signup`);
      } else {
        rows.push(`${item.email},${item.date || ''},${item.source || 'Website VIP Signup'}`);
      }
    });
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tight-pants-website-subscribers-${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // State for copying Reddit drafts
  const [copiedRedditIdx, setCopiedRedditIdx] = useState(null);
  const handleCopyRedditText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedRedditIdx(idx);
    setTimeout(() => setCopiedRedditIdx(null), 2000);
  };

  // If not unlocked, render secure Passcode Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080f] text-zinc-100 flex flex-col justify-between p-4 sm:p-8">
        <div className="max-w-md w-full mx-auto my-auto py-12 space-y-6">
          <div className="tight-glass rounded-3xl p-8 border border-white/10 space-y-6 shadow-2xl">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 mx-auto flex items-center justify-center text-2xl">
                🔒
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Producer Portal
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Private workspace for Kyle Wayne & John Bennett. Please enter your producer passcode to access backstage tools.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Producer Passcode
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    required
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (passcodeError) setPasscodeError(false);
                    }}
                    placeholder="Enter passcode..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white font-mono placeholder-zinc-600 transition-colors"
                  />
                </div>
                {passcodeError && (
                  <p className="text-[11px] text-rose-400 font-semibold pt-1">
                    Incorrect passcode. Please try again.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-black/60 border-white/20 text-amber-400 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] text-black transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Backstage Studio</span>
              </button>
            </form>

            <div className="pt-2 text-center border-t border-white/5">
              <button
                onClick={onBackToHome}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                ← Return to Tight Pants Comedy Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080f] text-zinc-100 pb-20">
      
      {/* Top Header */}
      <div className="border-b border-white/10 bg-[#0b0d18]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Tight Pants Comedy</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/10 border border-amber-400/25 text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Producer Access</span>
            </span>

            <button
              onClick={handleLock}
              title="Lock Studio"
              className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-zinc-200 uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Intro Banner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Producer Marketing & Audience Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Tight Pants Automation Hub
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Generate email blasts with auto-discount comp links, split Eventbrite attendee CSVs for Gmail BCC, and draft promotional posts across 12 NYC subreddits with 1 click.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 gap-2">
          <button
            onClick={() => setActiveTab('blast')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'blast'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Blast Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('attendees')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'attendees'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Attendee Cleaner & Lists</span>
          </button>

          <button
            onClick={() => setActiveTab('reddit')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-b-2 ${
              activeTab === 'reddit'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reddit Campaign (12 Subs)</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: EMAIL BLAST STUDIO */}
        {/* ========================================================= */}
        {activeTab === 'blast' && (
          <div className="space-y-8">
            
            {/* Show Selector & Style Controls */}
            <div className="tight-glass rounded-3xl p-6 sm:p-7 border border-white/10 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Step 1: Target Showcase
                  </span>
                  <select
                    value={selectedShowId}
                    onChange={(e) => setSelectedShowId(e.target.value)}
                    className="bg-black/60 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {upcomingShows.map((s) => (
                      <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                        {s.displayDate} - {s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email Tone Style (4 options) */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Step 2: Choose Email Tone
                  </span>
                  <div className="flex flex-wrap rounded-xl bg-black/50 p-1 border border-white/10 gap-1">
                    <button
                      onClick={() => setEmailStyle('announcement')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        emailStyle === 'announcement' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      🎉 Announcement
                    </button>
                    <button
                      onClick={() => setEmailStyle('urgency')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        emailStyle === 'urgency' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      ⏳ 48h Urgency
                    </button>
                    <button
                      onClick={() => setEmailStyle('personal')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        emailStyle === 'personal' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      💬 Personal Note
                    </button>
                    <button
                      onClick={() => setEmailStyle('vip_comp')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        emailStyle === 'vip_comp' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow font-extrabold' : 'text-amber-400 hover:text-amber-300'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>🎁 Returning VIP Comp</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* VIP Promo Code Settings Box (Visible only when 'vip_comp' is selected) */}
              {emailStyle === 'vip_comp' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-400/10 via-yellow-400/5 to-transparent border border-amber-400/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <span>Auto-Applying Eventbrite Promo Code Settings</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                        Promo Code on Eventbrite
                      </label>
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="RETURNINGVIP"
                        className="w-full bg-black/60 border border-amber-400/40 rounded-xl px-3 py-2 text-sm font-mono font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                        Comp Limit Note
                      </label>
                      <input
                        type="text"
                        value={compLimit}
                        onChange={(e) => setCompLimit(e.target.value)}
                        placeholder="2 free tickets on us"
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>
                      Direct auto-discount URL: <code className="text-amber-300 font-mono text-[10px] break-all">{effectiveTicketLink}</code>
                    </span>
                  </div>
                </div>
              )}

              {/* Subject Line Picker */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  High-Open Rate Subject Lines (Click to Copy):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {subjectLines.map((subj, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedSubjectIdx(idx);
                        handleCopySubject(subj);
                      }}
                      className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                        selectedSubjectIdx === idx 
                          ? 'bg-amber-400/10 border-amber-400/40 text-amber-200' 
                          : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{subj}</span>
                      <div className="shrink-0 ml-2">
                        {copiedSubject && selectedSubjectIdx === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Email Draft Output: Plain Text + HTML Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Plain-Text Box (For Gmail/Apple Mail) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="tight-glass rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        Plain-Text Version (For Gmail)
                      </h3>
                      <p className="text-xs text-zinc-400">Includes CAN-SPAM compliant unsubscribe footer.</p>
                    </div>

                    <button
                      onClick={handleCopyBody}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
                    >
                      {copiedBody ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBody ? 'Copied Body!' : 'Copy Text'}</span>
                    </button>
                  </div>

                  <textarea
                    readOnly
                    value={plainTextEmail}
                    rows={18}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-mono text-zinc-200 leading-relaxed focus:outline-none select-all resize-none"
                  />
                </div>
              </div>

              {/* HTML Visual Preview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="tight-glass rounded-3xl p-6 border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-amber-400" />
                        Formatted Email Card
                      </h3>
                      <p className="text-xs text-zinc-400">Ready to paste directly into Gmail or newsletter tools.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleCopyRichHtml}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
                        title="Copy formatted layout to paste directly into Gmail compose"
                      >
                        {copiedRichHtml ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRichHtml ? 'Ready to Paste in Gmail!' : 'Copy for Gmail (Rich)'}</span>
                      </button>

                      <button
                        onClick={handleCopyHtml}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Copy raw HTML source code"
                      >
                        {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5 text-zinc-400" />}
                        <span>{copiedHtml ? 'Copied Code!' : 'Raw HTML'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black max-h-[440px] overflow-y-auto">
                    <iframe
                      title="HTML Email Preview"
                      srcDoc={htmlEmail}
                      className="w-full h-[440px] border-0"
                    />
                  </div>

                  {/* Gmail 1-Click Paste Tip */}
                  <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-start gap-2.5 text-xs text-zinc-300">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">How to paste directly into Gmail:</strong> Click <span className="text-amber-300 font-bold">"Copy for Gmail (Rich)"</span> above, open your Gmail compose window, and press <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-white font-mono text-[10px]">Cmd + V</kbd>. The poster image, golden ticket button, and styled layout will appear right inside Gmail!
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ATTENDEE CLEANER & SEGMENTED LISTS */}
        {/* ========================================================= */}
        {activeTab === 'attendees' && (
          <div className="space-y-8">
            
            {/* Eventbrite CSV Cleaner */}
            <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
                  <Users className="w-3.5 h-3.5" /> Audience 1: Past Eventbrite Attendees
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Eventbrite Attendee Cleaner & Gmail Batch Splitter
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  Paste your raw Eventbrite export or email column. Strips duplicates, validates syntax, and chunks into safe batches of 90 (to prevent Gmail from blocking your account).
                </p>
              </div>

              <div className="space-y-3">
                <textarea
                  value={rawEmails}
                  onChange={(e) => setRawEmails(e.target.value)}
                  placeholder="Paste raw Eventbrite CSV export text, email column, or comma-separated addresses here..."
                  rows={5}
                  className="w-full bg-black/60 border border-white/15 rounded-2xl p-4 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-400"
                />

                {cleanedAttendees.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-xs text-zinc-300">
                        <strong className="text-white font-bold">{cleanedAttendees.length} Unique Emails</strong> found • Split into <strong className="text-amber-400">{batches.length} safe batches</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleCopyForSheets}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 transition-all cursor-pointer shadow-sm"
                        title="Copy tab-delimited rows to paste directly into Google Sheets (Cmd+V)"
                      >
                        {copiedSheetTsv ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Rows for Sheet!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Rows for Sheet</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleSyncToSheet}
                        disabled={syncingToSheet}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black transition-all cursor-pointer shadow-md shadow-amber-400/20 disabled:opacity-50"
                      >
                        {syncingToSheet ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Syncing to Sheet...</span>
                          </>
                        ) : syncedCount ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-black" />
                            <span>Synced {syncedCount} to Sheet!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5 text-black" />
                            <span>Sync to Google Sheet</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleDownloadCsv}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer w-fit"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Clean CSV</span>
                      </button>
                    </div>
                  </div>
                )}

                {syncError && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{syncError}</p>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        Tip: You can click <strong className="text-amber-300">"Copy Rows for Sheet"</strong> above, then open your Google Sheet and press <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-white font-mono text-[10px]">Cmd + V</kbd> to paste all columns and rows instantly!
                      </p>
                    </div>
                  </div>
                )}

                {/* Batch Cards for Gmail BCC */}
                {batches.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Gmail BCC Batches (Safe under 100 limit):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {batches.map((batch, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-white">Batch {idx + 1}</div>
                            <div className="text-[11px] text-zinc-500">{batch.length} recipients</div>
                          </div>

                          <button
                            onClick={() => handleCopyBatch(batch, idx)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            {copiedBatchIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedBatchIdx === idx ? 'Copied' : 'Copy BCC'}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Audience 2: Website VIP Subscribers & Google Sheet Sync */}
            <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                  <Globe className="w-3.5 h-3.5" /> Audience 2: Website VIP Signups
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Website VIP Newsletter Registrations
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  People who subscribed through the form on <code className="text-amber-300">tightpantscomedy.com</code>. Kept isolated from past ticket buyers.
                </p>
              </div>

              {/* Google Sheet Sync Card */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Target Google Spreadsheet Connected</span>
                  </div>
                  <div className="text-[11px] text-zinc-300">
                    Target Sheet: <a href={SITE_CONFIG.googleSheetUrl} target="_blank" rel="noopener noreferrer" className="underline text-emerald-400 hover:text-emerald-300">Open Google Sheet in Drive ↗</a>
                  </div>
                </div>

                {webSubscribers.length > 0 && (
                  <button
                    onClick={handleDownloadWebCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-400 text-black hover:bg-emerald-300 transition-colors cursor-pointer w-fit"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Web Signups ({webSubscribers.length})</span>
                  </button>
                )}
              </div>

              {/* Local Web Signups Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Recent Signups Captured Directly on Website ({webSubscribers.length}):
                </span>

                {webSubscribers.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-center text-xs text-zinc-500">
                    No website signups recorded in this browser yet. As visitors enter their email on the homepage, they will populate here and sync to your Google Sheet.
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/40 max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 text-zinc-400 font-semibold border-b border-white/10">
                        <tr>
                          <th className="py-2.5 px-4">Email</th>
                          <th className="py-2.5 px-4">Date Added</th>
                          <th className="py-2.5 px-4">Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {webSubscribers.map((item, idx) => {
                          const emailStr = typeof item === 'string' ? item : item.email;
                          const dateStr = typeof item === 'object' && item.date ? item.date.slice(0, 10) : 'Recent';
                          return (
                            <tr key={idx} className="hover:bg-white/5">
                              <td className="py-2.5 px-4 font-mono text-zinc-200">{emailStr}</td>
                              <td className="py-2.5 px-4 text-zinc-400">{dateStr}</td>
                              <td className="py-2.5 px-4 text-amber-400 font-medium">Website VIP Form</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: REDDIT CAMPAIGN DRAFTER (12 NYC SUBREDDITS) */}
        {/* ========================================================= */}
        {activeTab === 'reddit' && (
          <div className="space-y-6">
            
            <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest">
                    <MessageSquare className="w-3.5 h-3.5" /> Organic Reddit Marketing
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    Reddit Campaign Drafter: 12 NYC Subreddits
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                    Custom titles, compliance tags, and body copy formatted specifically for each subreddit's auto-moderator rules. Click <strong>"1-Click Pre-fill in Reddit"</strong> to launch Reddit with title and text ready to submit!
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Show:
                  </span>
                  <select
                    value={selectedShowId}
                    onChange={(e) => setSelectedShowId(e.target.value)}
                    className="bg-black/60 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {upcomingShows.map((s) => (
                      <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                        {s.displayDate} - {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 12 Subreddit Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {redditCampaign.map((draft, idx) => {
                const isRed = draft.safety === 'red';
                const isYellow = draft.safety === 'yellow';
                const isGreen = draft.safety === 'green';

                return (
                  <div
                    key={idx}
                    className={`tight-glass rounded-3xl p-5 border space-y-4 flex flex-col justify-between transition-all ${
                      isRed 
                        ? 'border-rose-500/40 bg-rose-950/10' 
                        : isYellow 
                        ? 'border-amber-500/30 bg-amber-950/5' 
                        : 'border-emerald-500/30 hover:border-emerald-400/50'
                    }`}
                  >
                    <div className="space-y-3">
                      
                      {/* Header with Subreddit & Safety Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-extrabold text-white">{draft.sub}</span>
                          <span className="text-[11px] text-zinc-400">({draft.name})</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                          isRed
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : isYellow
                            ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {draft.safetyBadge}
                        </span>
                      </div>

                      {/* Rule / Guideline */}
                      <div className={`text-[11px] p-2.5 rounded-xl border flex items-start gap-2 ${
                        isRed 
                          ? 'bg-rose-900/20 border-rose-500/30 text-rose-200' 
                          : isYellow 
                          ? 'bg-amber-900/10 border-amber-500/20 text-amber-200' 
                          : 'bg-black/40 border-white/5 text-zinc-300'
                      }`}>
                        <AlertCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isRed ? 'text-rose-400' : isYellow ? 'text-amber-400' : 'text-emerald-400'
                        }`} />
                        <div>
                          <strong>Moderation Note:</strong> {draft.rules}
                          {draft.strategy && (
                            <div className="text-[10px] text-zinc-400 pt-0.5">
                              💡 <strong>Strategy:</strong> {draft.strategy}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content block: only if not strictly banned */}
                      {!isRed ? (
                        <>
                          {/* Proposed Title */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                Proposed Title (Formatted for Flair: {draft.flair}):
                              </span>
                              <button
                                onClick={() => handleCopyRedditText(draft.title, `title-${idx}`)}
                                className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-semibold"
                              >
                                {copiedRedditIdx === `title-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedRedditIdx === `title-${idx}` ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                            <div className="text-xs font-semibold text-zinc-200 bg-black/60 p-2.5 rounded-xl border border-white/10 select-all">
                              {draft.title}
                            </div>
                          </div>

                          {/* Flier Image & Caption Snippet (For Image Posts) */}
                          <div className="p-3 rounded-2xl bg-amber-400/5 border border-amber-400/20 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                                <span>Image Caption & Ticket Comment (Copy & Paste):</span>
                              </div>
                              <button
                                onClick={() => handleCopyRedditText(draft.commentSnippet, `snippet-${idx}`)}
                                className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-bold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30"
                              >
                                {copiedRedditIdx === `snippet-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedRedditIdx === `snippet-${idx}` ? 'Copied Link!' : 'Copy Caption & Link'}</span>
                              </button>
                            </div>

                            <div className="text-[11px] text-zinc-300 font-mono bg-black/60 p-2.5 rounded-xl border border-white/10 select-all whitespace-pre-wrap">
                              {draft.commentSnippet}
                            </div>

                            {draft.flierImg && (
                              <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                                <span className="truncate max-w-[200px]">Flier: {draft.flierImg.split('?')[0].slice(-24)}</span>
                                <button
                                  onClick={() => handleCopyRedditText(draft.flierImg, `img-${idx}`)}
                                  className="underline text-amber-400 hover:text-amber-300 cursor-pointer"
                                >
                                  {copiedRedditIdx === `img-${idx}` ? 'Copied Image URL!' : 'Copy Direct Image URL'}
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Collapsible Alternative: Text Post Markdown */}
                          <details className="text-xs group">
                            <summary className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 cursor-pointer hover:text-zinc-200 list-none flex items-center justify-between py-1">
                              <span>📝 Alternative: View Full Text Post Markdown</span>
                              <span className="text-amber-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="space-y-1.5 pt-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-zinc-500">Full Text Body:</span>
                                <button
                                  onClick={() => handleCopyRedditText(draft.body, `body-${idx}`)}
                                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-semibold"
                                >
                                  {copiedRedditIdx === `body-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  <span>{copiedRedditIdx === `body-${idx}` ? 'Copied' : 'Copy'}</span>
                                </button>
                              </div>
                              <div className="text-[11px] text-zinc-400 font-mono bg-black/60 p-2.5 rounded-xl border border-white/10 max-h-28 overflow-y-auto whitespace-pre-wrap select-all">
                                {draft.body}
                              </div>
                            </div>
                          </details>
                        </>
                      ) : (
                        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200 space-y-2">
                          <p className="font-bold">⚠️ Post Blocked by Community Rules</p>
                          <p className="text-[11px] text-zinc-300 leading-relaxed">
                            {draft.body}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* 1-Click Launch Buttons: only available if not strictly banned */}
                    {!isRed ? (
                      <div className="pt-2 flex flex-col sm:flex-row gap-2">
                        <a
                          href={draft.prefilledImagePostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20"
                          title="Opens Reddit with flier pre-loaded as an Image Post"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>1-Click Image Post</span>
                        </a>

                        <a
                          href={draft.prefilledTextPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                          title="Opens Reddit with full text markdown"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Text Post</span>
                        </a>
                      </div>
                    ) : (
                      <div className="pt-2 text-center text-[11px] text-rose-400 font-semibold border-t border-rose-500/20 py-1">
                        Do not submit direct links to this subreddit.
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
