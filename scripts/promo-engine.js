import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SHOWS_DATA } from '../src/data/shows.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
// DRY_RUN is TRUE by default - safe preview mode only.
// Set DRY_RUN=false in environment or when ready to send live.
const IS_DRY_RUN = process.env.DRY_RUN !== 'false';

// Target website URL
const WEBSITE_URL = 'https://behlv10.github.io/tight-pants-comedy/';

function getDaysUntil(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = isoDate.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function buildPromoPayloads(show) {
  const daysUntil = getDaysUntil(show.isoDate);
  const flierImg = show.flierUrl || 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/bdfb91bc-447c-4e41-b103-dce14743c069/Tight+Pants+NYCF+Poster.png';

  // 1. DoNYC Submission Package (Requires Image!)
  const donyc = {
    platform: 'DoNYC',
    portalUrl: 'https://donyc.com/events/new',
    imageRequirement: 'Yes - High resolution flier image required (1200x675 or portrait poster)',
    fields: {
      eventTitle: show.title,
      category: 'Comedy / Nightlife',
      venue: `${show.venue} (${show.address})`,
      date: show.date,
      time: show.time,
      price: `${show.price} GA`,
      ticketsUrl: WEBSITE_URL,
      imageUrl: flierImg,
      description: `${show.title} presented by Tight Pants Comedy at ${show.venue} in the East Village NYC.\n\n` +
        `Featuring top comedians seen on Netflix, HBO, Comedy Central, and the Comedy Cellar. Fast-paced, curated sets in an intimate speakeasy room.\n\n` +
        `Tickets & in-page checkout: ${WEBSITE_URL}`
    }
  };

  // 2. Press Pitch (The Skint & Nonsense NYC)
  const pressPitch = {
    recipients: ['tips@theskint.com', 'events@nonsensenyc.com'],
    subject: `EVENT SUBMISSION: ${show.title} @ ${show.venue} (${show.displayDate})`,
    attachedImageUrl: flierImg,
    bodyText: 
`Hi NYC Events Team,

Submitting an upcoming East Village comedy showcase for your weekly cheap/free events guide:

• Event: ${show.title}
• Date & Time: ${show.date} @ ${show.time}
• Venue: ${show.venue} (${show.address})
• Price: ${show.price} GA (under $25)
• Accolades: Time Out New York featured showcase, New York Comedy Festival official selection.
• About: Produced by Kyle Wayne & John Bennett. Curated, rapid-fire stand-up in an intimate subterranean showroom.
• Direct Tickets & Info: ${WEBSITE_URL}
• Official Flier Art: ${flierImg}

Thank you!`
  };

  // 3. Reddit r/nyc & r/EastVillage Megathread Comment
  const redditComment = 
`**👖 ${show.title} (${show.dayOfWeek}, ${show.displayDate} @ 8:30 PM)**

If you're looking for fun plans in the East Village, indie collective Tight Pants Comedy is back at **${show.venue}** (12 St. Marks Place) for a fast-paced stand-up showcase.

• **Lineup:** Stand-up comics featured on Netflix, Comedy Central, Hulu & Comedy Cellar  
• **Room:** Speakeasy-style ~60 seat subterranean room with cocktails  
• **Price:** ${show.price} GA  
• **Tickets & in-page checkout:** [tightpantscomedy.com](${WEBSITE_URL})`;

  // 4. Social & Comics Promo Kit
  const socialKit = {
    instagramCaption: 
`👖 ${show.title.toUpperCase()} 👖
${show.date} • ${show.time}
📍 ${show.venue} (${show.neighborhood})

Fast sets. Cellar & Netflix regulars. Zero filler.
Tickets are live at the link in our bio! Grab yours early before the room caps.

#TightPantsComedy #StMarksComedyClub #EastVillageNYC #NYComedy #NYCStandup`,
    comicDmText: 
`Hey! The flier and ticket link for ${show.date} @ St. Marks is live on the site: ${WEBSITE_URL} — drop it on your story when you get a chance!`,
    flyerDownload: flierImg
  };

  return {
    showTitle: show.title,
    date: show.date,
    isoDate: show.isoDate,
    daysUntil,
    flierImg,
    donyc,
    pressPitch,
    redditComment,
    socialKit
  };
}

export function runPromoEngine() {
  const today = new Date().toISOString().slice(0, 10);
  
  // Find upcoming flagship shows
  const upcoming = SHOWS_DATA
    .filter(s => s.isoDate >= today && s.category === 'nyc')
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  if (upcoming.length === 0) {
    console.log('No upcoming flagship shows found to promote.');
    return;
  }

  const targetShow = upcoming[0];
  const payload = buildPromoPayloads(targetShow);

  console.log(`\n======================================================`);
  console.log(`🚀 TIGHT PANTS PROMO AUTOMATION ENGINE (DRY RUN: ${IS_DRY_RUN})`);
  console.log(`======================================================`);
  console.log(`Target Show: ${payload.showTitle}`);
  console.log(`Date:        ${payload.date} (${payload.daysUntil} days away)`);
  console.log(`Flier Image: ${payload.flierImg}`);
  console.log(`Status:      ${IS_DRY_RUN ? 'SIMULATION ONLY (No live posts sent)' : 'LIVE ARMED'}\n`);

  // Generate markdown preview artifact
  const previewMarkdown = `# 👖 Tight Pants Comedy - Automated Promo Kit Preview

**Generated At:** ${new Date().toISOString()}  
**Mode:** \`${IS_DRY_RUN ? 'DRY_RUN (Simulation Only - Not Dispatched)' : 'LIVE'}\`  
**Target Show:** ${payload.showTitle} (${payload.date}) — **${payload.daysUntil} days away**  
**Official Flier:** [View Flier Image](${payload.flierImg})

---

## 1. DoNYC Event Submission Payload
* **Submission Portal:** [https://donyc.com/events/new](https://donyc.com/events/new)  
* **Image Required:** **YES** (Supplied below from Supabase flier asset)  
* **Flier Asset URL:** \`${payload.flierImg}\`  

\`\`\`json
${JSON.stringify(payload.donyc.fields, null, 2)}
\`\`\`

---

## 2. Press Pitch Emails (The Skint & Nonsense NYC)
* **To:** \`${payload.pressPitch.recipients.join(', ')}\`  
* **Subject:** \`${payload.pressPitch.subject}\`  
* **Flier Attachment:** \`${payload.pressPitch.attachedImageUrl}\`  

\`\`\`text
${payload.pressPitch.bodyText}
\`\`\`

---

## 3. Reddit Megathread Ready Post (r/nyc & r/EastVillage)
\`\`\`markdown
${payload.redditComment}
\`\`\`

---

## 4. Producer & Lineup Comic Kit (Instagram & SMS)
* **Instagram Caption:**
\`\`\`text
${payload.socialKit.instagramCaption}
\`\`\`

* **Pre-Written Comic Text / DM:**
> "${payload.socialKit.comicDmText}"

---
*Note: This file was automatically prepared by \`scripts/promo-engine.js\`. To activate live dispatch, set \`DRY_RUN=false\`.*
`;

  const outputPath = path.join(__dirname, '../promo-preview.md');
  fs.writeFileSync(outputPath, previewMarkdown);
  console.log(`✓ Wrote complete dry-run promotion kit to: ${outputPath}`);
  console.log(`✓ Includes DoNYC payload with required image, Skint pitch, Reddit post, and comic text.\n`);
}

// Run if called directly
runPromoEngine();
