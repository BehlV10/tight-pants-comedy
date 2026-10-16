import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SHOWS_DATA } from '../src/data/shows.js';

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

  // 3. Tailored Reddit Drafts with Mandatory Flairs, Subreddit Guidelines & Image Body Text
  const redditDrafts = [
    {
      subreddit: 'r/nycevents',
      subUrl: 'https://www.reddit.com/r/nycevents',
      flair: '🎭 Comedy',
      guidelines: 'Requires [Event] and [Genre] tags in title, exact date/time/price, and Comedy flair.',
      title: `[Event] [Comedy] ${show.title} @ ${show.venue} (East Village) - ${show.dayOfWeek} ${show.displayDate}, 8:30 PM (${show.price})`,
      imageBodyText: 
`Comedians in Costumes: Halloween Comedy Show 🎃 is back at St. Marks Comedy Club (12 St. Marks Place) in the East Village on ${show.date} @ 8:30 PM (Doors 8:00 PM).

• The Show: Tight Pants Comedy's annual Halloween special. Lineup of NYC comedians featured on Netflix, Comedy Central, Hulu, and the Comedy Cellar performing in full costume, plus audience costume prizes!
• The Room: Intimate speakeasy-style ~60 seat subterranean room with craft cocktails and Filipino-inspired bites.
• Tickets: ${show.price} GA on Eventbrite: ${TICKET_URL}

Seating is limited in this showroom so grabbing tickets early is recommended!`,
      body: 
`![${show.title} Flyer](${flierImg})

**${show.title}** is back at **${show.venue}** (12 St. Marks Place) in the East Village on **${show.date} @ 8:30 PM** (Doors 8:00 PM).

• **The Show:** Tight Pants Comedy's curated stand-up showcase. Fast-paced sets from comedians featured on Netflix, Comedy Central, Hulu, and the Comedy Cellar. For the Halloween edition, comics are performing in full costume, with audience costume prizes!
• **The Room:** Intimate ~60 seat subterranean speakeasy room with craft cocktails and Filipino-inspired bites.
• **Tickets:** ${show.price} GA
• **Eventbrite Checkout & Info:** [Eventbrite Link](${TICKET_URL})

Grab tickets early as this showroom has limited seating!`,
      prefilledUrl: ''
    },
    {
      subreddit: 'r/WhatsHappeningNYC',
      subUrl: 'https://www.reddit.com/r/WhatsHappeningNYC',
      flair: '📅 Event',
      guidelines: 'Requires date tag in brackets and neighborhood context.',
      title: `[${show.displayDate}] ${show.title} @ St. Marks Comedy Club in East Village`,
      imageBodyText: 
`If you're looking for Halloween or date night plans in lower Manhattan, Tight Pants Comedy is producing their annual Halloween special at St. Marks Comedy Club (12 St. Marks Place) on ${show.date} @ 8:30 PM.

• Vibe: Basement speakeasy club right in the heart of St. Marks Place.
• Talent: Lineup of NYC club headliners from Netflix, Kill Tony, and Comedy Cellar performing in full costume + audience costume contest.
• Cost: ${show.price} GA
• Eventbrite Tickets & Schedule: ${TICKET_URL}`,
      body: 
`![${show.title} Flyer](${flierImg})

If you're looking for weekend or date night plans in lower Manhattan, **Tight Pants Comedy** is producing **${show.title}** at St. Marks Comedy Club (12 St. Marks Place) on **${show.date} @ 8:30 PM**.

• **Vibe:** Basement speakeasy club right in the heart of St. Marks Place.
• **Talent:** Lineup of NYC club headliners (Netflix, Kill Tony, Comedy Cellar regulars).
• **Cost:** ${show.price} GA
• **Eventbrite Tickets:** [Eventbrite Link](${TICKET_URL})`,
      prefilledUrl: ''
    },
    {
      subreddit: 'r/lowereastside',
      subUrl: 'https://www.reddit.com/r/lowereastside',
      flair: '📍 Event / Local',
      guidelines: 'Must be relevant to Lower East Side / St. Marks corridor. Mention exact address.',
      title: `Upcoming Comedy on St. Marks Place: ${show.title} (${show.dayOfWeek} ${show.displayDate})`,
      imageBodyText: 
`Hey neighbors! Wanted to share an upcoming local comedy show right by the LES / East Village border.

Tight Pants Comedy is hosting Comedians in Costumes: Halloween Comedy Show 🎃 at St. Marks Comedy Club (12 St. Marks Place) on ${show.date} at 8:30 PM.

• Format: Tight 7-minute sets from top club regulars (Netflix, HBO, Comedy Cellar).
• Halloween Theme: Comics will be performing in full costume, with prizes for the best audience costume.
• Tickets: ${show.price} GA on Eventbrite: ${TICKET_URL}

Great intimate speakeasy room for a local night out!`,
      body: 
`![${show.title} Flyer](${flierImg})

Hey neighbors! Wanted to share an upcoming local comedy show right by the LES / East Village border.

**Tight Pants Comedy** is hosting **${show.title}** at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} at 8:30 PM**.

• **Format:** Tight 7-minute sets from top club regulars (Netflix, HBO, Comedy Cellar).
• **Halloween Theme:** Comics will be performing in full costume, with prizes for the best audience costume.
• **Tickets:** ${show.price} GA on [Eventbrite](${TICKET_URL})

Great intimate room for a local night out!`,
      prefilledUrl: ''
    },
    {
      subreddit: 'r/eastvillage',
      subUrl: 'https://www.reddit.com/r/eastvillage',
      flair: '🎟️ Events',
      guidelines: 'Strictly local to East Village (12 St. Marks Place). Community-focused tone.',
      title: `East Village Event: ${show.title} @ St. Marks Comedy Club (${show.dayOfWeek} ${show.displayDate})`,
      imageBodyText: 
`For anyone looking for neighborhood events on St. Marks Place:

Tight Pants Comedy is running their annual Comedians in Costumes Halloween show at St. Marks Comedy Club (12 St. Marks Place) on ${show.date} @ 8:30 PM.

• Curated lineup of NYC comics from the Comedy Cellar and national specials.
• Audience costume contest + intimate speakeasy room.
• Tickets are ${show.price} GA on Eventbrite: ${TICKET_URL}

Hope to see some local neighborhood folks there!`,
      body: 
`![${show.title} Flyer](${flierImg})

For anyone looking for neighborhood events on St. Marks Place:

**Tight Pants Comedy** is running **${show.title}** at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} @ 8:30 PM**.

• Curated lineup of NYC comics from the Comedy Cellar and national specials.
• Audience costume contest + intimate speakeasy room.
• Tickets are ${show.price} GA: [Eventbrite Link](${TICKET_URL})

Hope to see some local neighborhood folks there!`,
      prefilledUrl: ''
    }
  ];

  // Generate 1-click prefilled Reddit submit links for both Image Post & Text Post
  redditDrafts.forEach((draft) => {
    const subClean = draft.subreddit.replace('r/', '');
    // 1-Click Link Post (Pre-loads the image directly into Reddit without manual upload!)
    draft.prefilledImagePostUrl = `https://www.reddit.com/r/${subClean}/submit?url=${encodeURIComponent(flierImg)}&title=${encodeURIComponent(draft.title)}`;
    // 1-Click Text Post (Markdown with details)
    draft.prefilledUrl = `https://www.reddit.com/r/${subClean}/submit?title=${encodeURIComponent(draft.title)}&text=${encodeURIComponent(draft.body)}`;
  });

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
