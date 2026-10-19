import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Download, 
  Users, 
  Flame, 
  Clock, 
  Calendar, 
  MapPin, 
  ExternalLink,
  FileText,
  Send,
  Filter
} from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';

export default function EmailStudio({ onBackToHome }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcomingShows = useMemo(() => {
    return SHOWS_DATA.filter((s) => s.isoDate >= today).sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  }, [today]);

  const [selectedShowId, setSelectedShowId] = useState(upcomingShows[0]?.id || SHOWS_DATA[0]?.id);
  const selectedShow = SHOWS_DATA.find((s) => s.id === selectedShowId) || upcomingShows[0] || SHOWS_DATA[0];

  const [emailStyle, setEmailStyle] = useState('announcement'); // 'announcement' | 'urgency' | 'personal'
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Attendee Cleaner State
  const [rawEmails, setRawEmails] = useState('');
  const [copiedBatchIdx, setCopiedBatchIdx] = useState(null);

  // Email subject line variations
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
    } else {
      return [
        `Hey from Kyle & John (quick invite for ${show.displayDate}!)`,
        `We're back in the basement showroom this week 👖`,
        `Special invite from Tight Pants Comedy: ${show.displayDate}`
      ];
    }
  }, [selectedShow, emailStyle]);

  // Plain-text email templates in Kyle & John's signature voice
  const plainTextEmail = useMemo(() => {
    const show = selectedShow;
    const ticketLink = show.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
    const creditsStr = show.credits?.join(', ') || 'Netflix, Comedy Central, Comedy Cellar';

    if (emailStyle === 'announcement') {
      return `Hey everyone!

Kyle Wayne and John Bennett here from Tight Pants Comedy.

We're back with our next showcase at St. Marks Comedy Club, and we've put together another incredible lineup for you in the East Village:

📅 Date: ${show.date}
⏰ Time: ${show.time}
📍 Venue: ${show.venue} (${show.address})
🎟️ Tickets: ${show.price} GA (${show.roomCapacityNote || 'Intimate ~60 seat room'})
⚡ Direct Tickets & RSVP: ${ticketLink}

As always, we're bringing you a rapid-fire, curated lineup featuring comics you've seen on ${creditsStr}—with zero dead time and surprise headliner drop-ins.

Because this subterranean speakeasy room only holds around 60 seats, grabbing your tickets in advance on Eventbrite is strongly recommended before it fills up!

Grab your tickets here:
${ticketLink}

Can't wait to see you in the showroom!

Best,
Kyle & John
Tight Pants Comedy
@tightpantscomedy | tightpantscomedy.com`;
    } else if (emailStyle === 'urgency') {
      return `Hey everyone!

Quick heads up: our next showcase is coming up this ${show.dayOfWeek}, and tickets are moving fast.

${show.title}
📅 ${show.date} @ ${show.time}
📍 ${show.venue} (${show.address})
🎟️ Tickets (${show.price} GA): ${ticketLink}

The showroom only holds about 60 seats, so once they're gone, the door is closed. If you've been meaning to come out or bring a group for Thursday date night, grab your seats now on Eventbrite:

👉 ${ticketLink}

Lineup includes killers from ${creditsStr}. See you in the basement!

- Kyle & John
Tight Pants Comedy`;
    } else {
      return `Hey comedy lovers!

Just wanted to send a quick personal note to say thank you for coming out to our past shows. 

We're bringing Tight Pants back to our favorite East Village basement showroom at St. Marks Comedy Club on ${show.date} at ${show.time}. 

We've got an awesome group of comics performing this time around (${creditsStr}), great craft cocktails in the showroom, and that classic high-energy underground NYC comedy vibe.

Here's the direct ticket link:
${ticketLink}

Would love to see you there! Feel free to reply directly to this email or DM us on Instagram (@tightpantscomedy) if you have any questions or want to bring a larger crew.

Cheers,
Kyle Wayne & John Bennett
Tight Pants Comedy`;
    }
  }, [selectedShow, emailStyle]);

  // Clean HTML Email Template (for Brevo, Mailchimp, or HTML copy)
  const htmlEmail = useMemo(() => {
    const show = selectedShow;
    const ticketLink = show.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
    const flier = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';
    const creditsStr = show.credits?.join(' • ') || 'Netflix • Comedy Central • Comedy Cellar';

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
        <a href="${ticketLink}" target="_blank" style="display: block;">
          <img src="${flier}" alt="${show.title}" width="580" style="width: 100%; max-width: 580px; height: auto; display: block; border: 0;" />
        </a>
      </td>
    </tr>
    ` : ''}

    <!-- Show Details Card -->
    <tr>
      <td style="padding: 28px;">
        <span style="display: inline-block; padding: 4px 12px; border-radius: 999px; background-color: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); color: #fbbf24; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 12px;">
          Next Upcoming Showcase
        </span>

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
              <strong>🎟️ Price:</strong> ${show.price} GA (${show.roomCapacityNote || 'Intimate ~60 Seats'})
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
              <a href="${ticketLink}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #f59e0b, #fbbf24); color: #000000; font-size: 15px; font-weight: 800; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.35);">
                Get Tickets on Eventbrite (${show.price}) →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin: 0; font-size: 12px; color: #a1a1aa; text-align: center;">
          ⚡ Seating is assigned based on check-in arrival time. Early booking recommended!
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 28px; background-color: #090a10; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: #71717a;">
        <p style="margin: 0 0 6px 0; font-weight: 600; color: #a1a1aa;">
          Tight Pants Comedy • St. Marks Comedy Club, East Village, NYC
        </p>
        <p style="margin: 0 0 10px 0;">
          <a href="https://tightpantscomedy.com" style="color: #fbbf24; text-decoration: none;">tightpantscomedy.com</a> • 
          <a href="https://www.instagram.com/tightpantscomedy" style="color: #fbbf24; text-decoration: none;">@tightpantscomedy</a>
        </p>
        <p style="margin: 0; font-size: 11px; color: #52525b;">
          You received this email because you purchased tickets or attended a previous Tight Pants Comedy show.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;
  }, [selectedShow]);

  // Attendee Cleaner / De-duplicator Logic
  const cleanedAttendees = useMemo(() => {
    if (!rawEmails.trim()) return [];
    
    // Extract anything that matches email pattern
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const matches = rawEmails.match(emailRegex) || [];
    
    const uniqueMap = new Map();
    matches.forEach(e => {
      const normalized = e.trim().toLowerCase();
      if (!uniqueMap.has(normalized)) {
        uniqueMap.set(normalized, normalized);
      }
    });

    return Array.from(uniqueMap.values());
  }, [rawEmails]);

  // Split into batches of 90 (to safely stay well under Gmail's 100/500 BCC limit without getting flagged)
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

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/10 border border-amber-400/25 text-amber-300 uppercase tracking-wider">
              🔒 Internal Studio • Not Visible on Main Menu
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Intro Banner */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Producer Newsletter & Audience Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Automated Show Blast & Attendee Cleaner
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Pulls directly from your scraped shows. Generates high-converting announcement copy, formats HTML/plain text, and de-duplicates raw Eventbrite CSVs without touching Excel.
          </p>
        </div>

        {/* Section 1: Show Selector & Style Controls */}
        <div className="tight-glass rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Step 1: Choose Target Show
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

            {/* Email Tone Style */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Step 2: Choose Email Tone
              </span>
              <div className="flex rounded-xl bg-black/50 p-1 border border-white/10">
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
              </div>
            </div>
          </div>

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

        {/* Section 2: Email Draft Output (Plain Text + Visual Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Plain-Text Copy Box (For Gmail or manual pasting) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="tight-glass rounded-3xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Plain-Text Version (For Gmail)
                  </h3>
                  <p className="text-xs text-zinc-400">Ready to paste directly into Gmail or Apple Mail.</p>
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

          {/* Right Column: HTML Visual Preview (For Brevo, Mailchimp, or HTML template) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="tight-glass rounded-3xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    HTML Email Preview (For Brevo/Mailchimp)
                  </h3>
                  <p className="text-xs text-zinc-400">Includes flier art, buttons, and footer links.</p>
                </div>

                <button
                  onClick={handleCopyHtml}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedHtml ? 'Copied HTML!' : 'Copy HTML'}</span>
                </button>
              </div>

              {/* Live Rendered Iframe */}
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black max-h-[460px] overflow-y-auto">
                <iframe
                  title="HTML Email Preview"
                  srcDoc={htmlEmail}
                  className="w-full h-[460px] border-0"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Eventbrite Attendee De-Duplicator & Gmail Batch Splitter */}
        <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Excel Replacement Tool
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Eventbrite Attendee Cleaner & Gmail Batch Splitter
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Tired of Excel? Paste your raw Eventbrite export or messy email dump below. This tool strips duplicates, cleans the addresses, and splits them into safe batches of 90 (to prevent Gmail from blocking your account).
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              value={rawEmails}
              onChange={(e) => setRawEmails(e.target.value)}
              placeholder="Paste raw text, Eventbrite CSV export contents, or comma-separated emails here..."
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

                <button
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer w-fit"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Clean CSV</span>
                </button>
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

      </div>

    </div>
  );
}
