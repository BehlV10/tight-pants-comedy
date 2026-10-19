import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SHOWS_DATA } from '../src/data/shows.js';
import { generateRedditCampaign } from '../src/utils/redditPromo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
// DRY_RUN is TRUE by default - safe draft/preview mode only.
// Set DRY_RUN=false in environment or when ready to send live.
const IS_DRY_RUN = process.env.DRY_RUN !== 'false';

// Target Eventbrite ticket URL (Direct link for all promo drafts)
const TICKET_URL = 'https://www.eventbrite.com/e/comedians-in-costumes-halloween-comedy-show-tickets-2001416968028?aff=ebdsoporgprofile';

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
  const flierImg = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';

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
      ticketsUrl: TICKET_URL,
      imageUrl: flierImg,
      description: `${show.title} presented by Tight Pants Comedy at ${show.venue} in the East Village NYC.\n\n` +
        `Featuring top comedians seen on Netflix, HBO, Comedy Central, and the Comedy Cellar. Fast-paced, curated sets in an intimate speakeasy room.\n\n` +
        `Tickets & Eventbrite checkout: ${TICKET_URL}`
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
• Direct Tickets & Info: ${TICKET_URL}
• Official Flier Art: ${flierImg}

Thank you!`
  };

  // 3. Tailored Reddit Drafts for 12 NYC Subreddits
  const targetTicketUrl = show.ticketUrl || TICKET_URL;
  const campaign = generateRedditCampaign(show, targetTicketUrl);
  const redditDrafts = campaign.map((item) => ({
    subreddit: item.sub,
    subUrl: item.subUrl,
    flair: item.flair,
    guidelines: item.rules,
    title: item.title,
    imageBodyText: item.body,
    body: item.body,
    prefilledUrl: item.prefilledTextPostUrl,
    prefilledImagePostUrl: item.prefilledImagePostUrl
  }));

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
`Hey! The flier and Eventbrite ticket link for ${show.date} @ St. Marks is live: ${TICKET_URL} — drop it on your story when you get a chance!`,
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
    redditDrafts,
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
  console.log(`Target Show:   ${payload.showTitle}`);
  console.log(`Date:          ${payload.date} (${payload.daysUntil} days away)`);
  console.log(`Flier Image:   ${payload.flierImg}`);
  console.log(`Status:        DRAFTS READY FOR REVIEW (Safe Mode: No live posts dispatched)\n`);

  // 1. Build dedicated Reddit Review Drafts document
  let redditDraftsDoc = `# 📝 Reddit Post Drafts for Review - ${payload.showTitle}

**Status:** \`DRAFT (Review Mode - Not Posted)\`  
**Target Show:** ${payload.showTitle} (${payload.date})  
**Ticket Link (Eventbrite):** ${TICKET_URL}  
**Flier Art:** [View Official Flier](${payload.flierImg})

You can review each post below. Each draft includes a **"1-Click Review & Submit"** link that will open Reddit with the Title and Body already pre-filled so you can review, edit, or post whenever you're ready.

---
`;

  payload.redditDrafts.forEach((draft, idx) => {
    redditDraftsDoc += `
## Draft ${idx + 1}: ${draft.subreddit}
* **Subreddit:** [${draft.subreddit}](${draft.subUrl})
* **Flair to Select:** \`${draft.flair}\`
* **Subreddit Guidelines:** *${draft.guidelines}*
* 🖼️ **1-Click Image Post Link (Pre-loads Flyer):** [**Open Image Post in ${draft.subreddit}**](${draft.prefilledImagePostUrl})
* 📝 **1-Click Text Post Link (Full Markdown):** [**Open Text Post in ${draft.subreddit}**](${draft.prefilledUrl})

### Proposed Title:
\`\`\`text
${draft.title}
\`\`\`

### 📌 Body Text (Optional) — Paste into the box under the uploaded flyer:
\`\`\`text
${draft.imageBodyText}
\`\`\`

<details>
<summary><b>View Alternative Markdown (For Text-only Posts)</b></summary>

\`\`\`markdown
${draft.body}
\`\`\`
</details>

---
`;
  });

  const redditDraftsPath = path.join(__dirname, '../reddit-drafts.md');
  fs.writeFileSync(redditDraftsPath, redditDraftsDoc);

  // 2. Build complete master promo preview
  const masterPreview = `# 👖 Tight Pants Comedy - Complete Promo Preview & Drafts

**Generated At:** ${new Date().toISOString()}  
**Mode:** \`${IS_DRY_RUN ? 'DRY_RUN (Simulation / Review Only)' : 'LIVE'}\`  
**Target Show:** ${payload.showTitle} (${payload.date}) — **${payload.daysUntil} days away**  
**Official Flier:** [View Flier Image](${payload.flierImg})

---

## 1. DoNYC Event Submission Payload (Includes Required Flier)
* **Submission Portal:** [https://donyc.com/events/new](https://donyc.com/events/new)  
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

## 3. Tailored Reddit Drafts for Review
*Detailed review copy available in [\`reddit-drafts.md\`](./reddit-drafts.md).*

${payload.redditDrafts.map(d => `* **${d.subreddit}:** [Open Pre-filled Draft](${d.prefilledUrl})`).join('\n')}

---

## 4. Producer & Lineup Comic Kit (Instagram & SMS)
* **Instagram Caption:**
\`\`\`text
${payload.socialKit.instagramCaption}
\`\`\`

* **Pre-Written Comic Text / DM:**
> "${payload.socialKit.comicDmText}"
`;

  const outputPath = path.join(__dirname, '../promo-preview.md');
  fs.writeFileSync(outputPath, masterPreview);

  console.log(`✓ Wrote Reddit review drafts to: ${redditDraftsPath}`);
  console.log(`✓ Wrote complete promo preview to: ${outputPath}`);
}

// Run if called directly
runPromoEngine();
