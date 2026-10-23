/**
 * NYC Event Promotion & Distribution Hub
 * 
 * 1. Reddit Direct Standalone Boards (verified safe)
 * 2. Reddit Megathreads & Recommendation Search Threads (with direct search links)
 * 3. Top NYC Event Calendars & Newsletters (The Skint, DoNYC, Nonsense NYC, Patch, etc.)
 */

export function generateRedditCampaign(show, customTicketUrl) {
  const ticketLink = customTicketUrl || show.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
  const flierImg = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';
  const creditsStr = show.credits?.join(', ') || 'Netflix, Comedy Central, Comedy Cellar';

  // -------------------------------------------------------------------------
  // CATEGORY 1: DIRECT STANDALONE POSTS (100% Verified Safe)
  // -------------------------------------------------------------------------
  const directSubs = [
    {
      sub: 'r/nycevents',
      name: 'NYC Events (Official Event Board)',
      subUrl: 'https://www.reddit.com/r/nycevents',
      members: '82k members',
      flair: '🎭 Comedy',
      rules: 'Requires [Event] and [Comedy] in title, exact date, venue, and price.',
      strategy: 'Best posted 2–4 days before the show. Follow exact title format below.',
      title: `[Event] [Comedy] ${show.title} @ ${show.venue} (East Village) - ${show.dayOfWeek} ${show.displayDate}, ${show.time} (${show.price})`,
      body: `**${show.title}** is back at **${show.venue}** (${show.address}) in the East Village on **${show.date} @ ${show.time}** (Doors open 30m prior).

• **The Show:** Tight Pants Comedy's curated stand-up showcase. Fast-paced, 7-minute sets from top NYC club regulars featured on ${creditsStr}. Zero filler, surprise drop-ins.
• **The Room:** Intimate ~60 seat subterranean speakeasy room with craft cocktails.
• **Tickets:** ${show.price} GA
• **Eventbrite Checkout & RSVP:** [Eventbrite Link](${ticketLink})

Seating is assigned based on check-in time and this intimate room caps quickly, so grabbing tickets in advance is recommended!`
    },
    {
      sub: 'r/WhatsHappeningNYC',
      name: 'What’s Happening NYC',
      subUrl: 'https://www.reddit.com/r/WhatsHappeningNYC',
      members: '15k members',
      flair: '📅 Event',
      rules: 'Requires bracketed date tag and neighborhood context in title.',
      strategy: 'Great for weeknight and weekend plans discovery.',
      title: `[${show.displayDate}] ${show.title} @ St. Marks Comedy Club in East Village`,
      body: `If you're looking for date night or weeknight plans in lower Manhattan, **Tight Pants Comedy** is hosting **${show.title}** at St. Marks Comedy Club (${show.address}) on **${show.date} @ ${show.time}**.

• **Vibe:** Underground speakeasy club right in the heart of St. Marks Place.
• **Talent:** Lineup of NYC club headliners (${creditsStr}).
• **Tickets:** ${show.price} GA
• **Eventbrite Direct Tickets:** [Get Tickets Here](${ticketLink})`
    },
    {
      sub: 'r/GreenwichVillage',
      name: 'Greenwich Village',
      subUrl: 'https://www.reddit.com/r/GreenwichVillage',
      members: '9k members',
      flair: '🎭 Arts & Entertainment',
      rules: 'Arts and entertainment focus near Washington Square & Village venues.',
      strategy: 'Highlights downtown indie comedy culture away from midtown clubs.',
      title: `Downtown Indie Comedy Showcase: ${show.title} (${show.displayDate})`,
      body: `For anyone downtown who loves live stand-up comedy without the midtown tourist traps:

Tight Pants Comedy is putting on a curated showcase at **St. Marks Comedy Club** (12 St. Marks Place) this **${show.dayOfWeek}, ${show.displayDate} @ ${show.time}**.

Comics seen on ${creditsStr}. Intimate speakeasy setting with craft drinks.

Tickets (${show.price} GA): [Eventbrite Link](${ticketLink})`
    },
    {
      sub: 'r/Manhattan',
      name: 'Manhattan',
      subUrl: 'https://www.reddit.com/r/Manhattan',
      members: '28k members',
      flair: '🗽 Event',
      rules: 'Must be Manhattan-specific. Keep tone community-focused, no repetitive spam.',
      strategy: 'Great for highlighting an authentic East Village subterranean venue.',
      title: `East Village Stand-Up Comedy Showcase: ${show.title} (${show.displayDate} @ St. Marks)`,
      body: `Live stand-up in an authentic subterranean speakeasy showroom on St. Marks Place:

**Tight Pants Comedy** is at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} @ ${show.time}**.

• Fast-paced curated sets from top NYC club regulars (${creditsStr}).
• Intimate ~60 seat room with craft drinks.
• Tickets: ${show.price} GA on Eventbrite: [Eventbrite Link](${ticketLink})`
    }
  ];

  // -------------------------------------------------------------------------
  // CATEGORY 2: MEGATHREADS & RECOMMENDATION SEARCH THREADS (1-Click Links)
  // -------------------------------------------------------------------------
  const megathreadSubs = [
    {
      sub: 'r/nyc',
      name: 'NYC (Largest NYC Board)',
      members: '1.1M members',
      badge: '📌 Weekly Events Megathread',
      threadUrl: 'https://www.reddit.com/r/nyc/search/?q=%22Things+to+do%22+OR+%22Events%22&sort=new&restrict_sr=on',
      actionLabel: 'Open Weekly Events Megathread ↗',
      instruction: 'Click the link to open the latest pinned "Things To Do" thread on r/nyc. Drop the comment blurb below in the comments.',
      commentTitle: `Tight Pants Comedy @ St. Marks Comedy Club (${show.dayOfWeek} ${show.displayDate})`,
      commentBody: `**Tight Pants Comedy** showcase at **St. Marks Comedy Club** (12 St. Marks Place, East Village) on **${show.date} @ ${show.time}**.
Curated 75-minute underground stand-up with comics from ${creditsStr}. Intimate ~60 seat speakeasy room.
Tickets (${show.price} GA): ${ticketLink}`
    },
    {
      sub: 'r/newyorkcity',
      name: 'New York City (Local Culture)',
      members: '320k members',
      badge: '📌 Weekly Events Thread',
      threadUrl: 'https://www.reddit.com/r/newyorkcity/search/?q=%22Things+to+do%22+OR+%22Weekend%22&sort=new&restrict_sr=on',
      actionLabel: 'Open r/newyorkcity Events Feed ↗',
      instruction: 'Paste as a comment in the weekly pinned events thread to avoid Rule 7 spam auto-removal.',
      commentTitle: `Indie Stand-Up Showcase: ${show.title} (${show.displayDate})`,
      commentBody: `Hey everyone! Co-founders Kyle Wayne & John Bennett are hosting **${show.title}** at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} @ ${show.time}**.
Top comics seen on ${creditsStr}. Rapid-fire 7-minute sets, zero dead time.
Eventbrite: ${ticketLink}`
    },
    {
      sub: 'r/AskNYC',
      name: 'AskNYC (Recommendation Mining)',
      members: '540k members',
      badge: '💬 Search & Reply to Questions',
      threadUrl: 'https://www.reddit.com/r/AskNYC/search/?q=%22comedy+club%22+OR+%22stand+up+comedy%22+OR+%22date+night%22&sort=new&restrict_sr=on',
      actionLabel: 'Search Comedy Recommendation Threads ↗',
      instruction: 'Click the link to find users currently asking for comedy club recommendations or date night plans, and reply with this helpful suggestion.',
      commentTitle: 'Helpful Comedy Recommendation Comment',
      commentBody: `If you want an authentic indie comedy club vibe without the midtown tourist barkers, check out **Tight Pants Comedy** at **St. Marks Comedy Club** (12 St. Marks Place). 

They do an underground speakeasy showcase in an intimate ~60 seat room with comics seen on ${creditsStr}. Upcoming show is on ${show.date} @ ${show.time}: ${ticketLink}`
    },
    {
      sub: 'r/nyu',
      name: 'NYU (Student & Downtown Community)',
      members: '68k members',
      badge: '🎓 Off-Campus Events & Plans',
      threadUrl: 'https://www.reddit.com/r/nyu/search/?q=events+OR+weekend&sort=new&restrict_sr=on',
      actionLabel: 'Search NYU Weekend & Event Threads ↗',
      instruction: 'St. Marks Place is literally in NYU\'s backyard. Post in student weekend discussion threads or off-campus event roundups.',
      commentTitle: `Cheap Downtown Comedy: ${show.title} on St. Marks Place (${show.displayDate})`,
      commentBody: `Steps from campus (12 St. Marks Place): **Tight Pants Comedy** is having their next showcase on **${show.date} @ ${show.time}** at St. Marks Comedy Club.
Awesome intimate room with headliners from ${creditsStr}.
Tickets (${show.price} GA): ${ticketLink}`
    },
    {
      sub: 'r/Bushwick',
      name: 'Bushwick',
      members: '52k members',
      badge: '📌 Pinned Community Promo Thread',
      threadUrl: 'https://www.reddit.com/r/Bushwick/search/?q=%22promo%22+OR+%22events%22&sort=new&restrict_sr=on',
      actionLabel: 'Open Bushwick Promo Thread ↗',
      instruction: 'Rule 7 prohibits standalone commercial posts. Paste this inside the monthly stickied event/promo thread.',
      commentTitle: `East Village Stand-Up: ${show.title} @ St. Marks (${show.displayDate})`,
      commentBody: `Quick L-train hop across the river to 1st Ave: **Tight Pants Comedy** is back at **St. Marks Comedy Club** on **${show.date} @ ${show.time}**. Curated lineup of club regulars (${creditsStr}) in an underground speakeasy.
Tickets (${show.price} GA): ${ticketLink}`
    },
    {
      sub: 'r/astoria',
      name: 'Astoria',
      members: '75k members',
      badge: '📌 Weekend Discussion Thread',
      threadUrl: 'https://www.reddit.com/r/astoria/search/?q=%22Weekend%22+OR+%22Rumor+Mill%22&sort=new&restrict_sr=on',
      actionLabel: 'Open Astoria Weekend Thread ↗',
      instruction: 'Share inside the famous weekly Astoria "Rumor Mill / Weekend Plans" discussion thread.',
      commentTitle: `Direct N/W Ride: ${show.title} @ St. Marks Comedy Club (${show.displayDate})`,
      commentBody: `For anyone heading into Manhattan this ${show.dayOfWeek} (right off the 8th St-NYU N/W stop): **Tight Pants Comedy** showcase at **St. Marks Comedy Club** on **${show.date} @ ${show.time}**. Top comics from ${creditsStr}.
Tickets: ${ticketLink}`
    },
    {
      sub: 'r/williamsburg',
      name: 'Williamsburg',
      members: '38k members',
      badge: '📌 Weekly Neighborhood Thread',
      threadUrl: 'https://www.reddit.com/r/williamsburg/search/?q=events+OR+weekend&sort=new&restrict_sr=on',
      actionLabel: 'Open Williamsburg Event Thread ↗',
      instruction: 'Paste in weekly discussion threads. Highlight it is only one stop on the L train to Manhattan.',
      commentTitle: `Live Comedy in East Village: ${show.title} (${show.displayDate})`,
      commentBody: `One stop on the L train to Manhattan: **Tight Pants Comedy** at St. Marks Comedy Club (12 St. Marks Place) on **${show.date} @ ${show.time}**. Intimate subterranean showroom with craft drinks and comics from ${creditsStr}.
Tickets: ${ticketLink}`
    }
  ];

  // Enrich direct subs with prefilled submission URLs
  const enrichedDirectSubs = directSubs.map((item) => {
    const subClean = item.sub.replace('r/', '');
    const commentSnippet = `🎟️ ${show.title} @ ${show.venue} (${show.address})
📅 Date: ${show.date} @ ${show.time} (${show.price} GA)
⚡ Tickets & Lineup: ${ticketLink}`;

    return {
      ...item,
      flierImg,
      commentSnippet,
      prefilledTextPostUrl: `https://www.reddit.com/r/${subClean}/submit?title=${encodeURIComponent(item.title)}&text=${encodeURIComponent(item.body)}`,
      prefilledImagePostUrl: `https://www.reddit.com/r/${subClean}/submit?url=${encodeURIComponent(flierImg)}&title=${encodeURIComponent(item.title)}`
    };
  });

  return {
    directSubs: enrichedDirectSubs,
    megathreadSubs
  };
}

// ---------------------------------------------------------------------------
// CATEGORY 3: TOP NYC EVENT DIRECTORIES & FREE NEWSLETTERS
// ---------------------------------------------------------------------------
export function generateNycDirectories(show, customTicketUrl) {
  const ticketLink = customTicketUrl || show.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
  const flierImg = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';
  const creditsStr = show.credits?.join(', ') || 'Netflix, Comedy Central, Comedy Cellar';

  return [
    {
      id: 'the-skint',
      name: 'The Skint',
      tagline: 'NYC’s #1 Daily Newsletter for Free & Cheap Events',
      audience: '100,000+ daily email subscribers',
      cost: '100% Free Submission',
      deadline: 'Submit 3–5 days in advance',
      submitUrl: 'https://theskint.com/submit/',
      actionType: 'form',
      actionLabel: 'Open The Skint Submission Form ↗',
      tips: 'They focus exclusively on free or cheap events under $25. Emphasize the speakeasy vibe and low ticket price.',
      title: `${show.title} @ St. Marks Comedy Club (${show.price})`,
      blurb: `Tight Pants Comedy returns to St. Marks Comedy Club (12 St. Marks Place in the East Village) on ${show.date} at ${show.time}. Fast-paced, 7-minute sets with zero dead time featuring club regulars seen on ${creditsStr}. Intimate ~60 seat subterranean showroom with craft cocktails. Tickets are ${show.price} GA on Eventbrite (${ticketLink}).`
    },
    {
      id: 'donyc',
      name: 'DoNYC',
      tagline: 'The Largest Independent NYC Events & Nightlife Guide',
      audience: '250,000+ monthly active visitors',
      cost: '100% Free User Event Listing',
      deadline: 'Submit anytime (lives immediately)',
      submitUrl: 'https://donyc.com/events/new',
      actionType: 'form',
      actionLabel: 'Add Event on DoNYC ↗',
      tips: 'Anyone with a free DoNYC account can list an event. Once listed, users can click "Win Free Tickets" or "Add to My Calendar" which boosts you on their homepage.',
      title: `${show.title} - Curated Stand-Up Comedy`,
      blurb: `Tight Pants Comedy is an independent NYC stand-up collective founded by Kyle Wayne and John Bennett. Official selection in the New York Comedy Festival and creators of NYC's largest indie tournament. Featuring comics seen on ${creditsStr}.\n\nVenue: St. Marks Comedy Club (12 St. Marks Place, New York, NY 10003)\nDate: ${show.date} @ ${show.time}\nTickets: ${ticketLink}`
    },
    {
      id: 'nonsense-nyc',
      name: 'Nonsense NYC',
      tagline: 'Legendary Weekly Underground Arts & Culture Email (Since 2000)',
      audience: '60,000+ culture seekers (Jeff Stark)',
      cost: '100% Free Curated Editorial',
      deadline: 'Submit by Wednesday 3:00 PM for Friday blast',
      submitUrl: `mailto:jstark@nonsensenyc.com?subject=${encodeURIComponent(`Event Submission: ${show.title} at St. Marks Comedy Club (${show.displayDate})`)}&body=${encodeURIComponent(`Hi Jeff,\n\nSubmitting an upcoming East Village stand-up comedy showcase for consideration in Nonsense NYC:\n\n${show.title}\nDate: ${show.date} @ ${show.time}\nVenue: St. Marks Comedy Club (12 St. Marks Place, New York, NY 10003)\nAdmission: ${show.price} GA\nTicket Link: ${ticketLink}\n\nDescription:\nTight Pants Comedy brings a curated, high-energy 75-minute stand-up showcase to the intimate 60-seat subterranean speakeasy at St. Marks Comedy Club. Rapid-fire 7-minute sets with zero filler from comics seen on ${creditsStr}.\n\nThank you for keeping the list alive!\nKyle & John\nTight Pants Comedy`)}`,
      actionType: 'email',
      actionLabel: '1-Click Email to Jeff Stark (Nonsense NYC) ↗',
      tips: 'Jeff Stark manually curates Nonsense NYC and hates press releases. Keep it plain text, under $35, and authentic.',
      title: `${show.title} @ St. Marks Comedy Club`,
      blurb: `Text-only format ready to send. Click the button above to launch your email client pre-filled!`
    },
    {
      id: 'east-village-patch',
      name: 'East Village Patch Calendar',
      tagline: 'Hyperlocal Community Calendar for East Village Neighbors',
      audience: 'Thousands of East Village residents & families',
      cost: '100% Free Community Calendar Post',
      deadline: 'Instant publishing upon submission',
      submitUrl: 'https://patch.com/new-york/east-village/calendar/new',
      actionType: 'form',
      actionLabel: 'Post to East Village Patch ↗',
      tips: 'Patch events appear in daily email roundups to East Village locals. Upload your flier image (1200x900) for high visibility.',
      title: `Live Stand-Up Comedy: ${show.title} @ St. Marks Comedy Club`,
      blurb: `Join co-founders Kyle Wayne & John Bennett for a curated stand-up comedy showcase featuring comics seen on ${creditsStr}. Fast-paced, 7-minute sets in an intimate East Village subterranean speakeasy showroom.\n\nDate: ${show.date}\nTime: ${show.time} (Doors open 30 min prior)\nLocation: St. Marks Comedy Club, 12 St. Marks Place, NY 10003\nTickets: ${show.price} GA on Eventbrite (${ticketLink})`
    },
    {
      id: 'club-free-time',
      name: 'Club Free Time (Comp Ticket Dropper)',
      tagline: 'The Secret Weapon to Pack Out Empty Seats in 2 Hours',
      audience: '20,000+ NYC theater & culture patrons',
      cost: 'Free to list (Provide 6–10 comp tickets)',
      deadline: 'Submit 24–48 hours before showtime',
      submitUrl: 'https://www.clubfreetime.com/contact-us',
      actionType: 'form',
      actionLabel: 'Submit Comps to Club Free Time ↗',
      tips: 'If you have 10 seats left on Thursday afternoon, give them to Club Free Time members. They pay a membership fee to attend cultural events, guarantee attendance, and buy showroom drinks!',
      title: `${show.title} (Exclusive Member Passes)`,
      blurb: `Offering limited complimentary member passes to Tight Pants Comedy's upcoming showcase at St. Marks Comedy Club on ${show.date} at ${show.time}. Intimate speakeasy showroom with craft cocktails. Featuring comics from ${creditsStr}. RSVP link: ${ticketLink}`
    },
    {
      id: 'secret-nyc',
      name: 'Secret NYC',
      tagline: 'NYC Food, Drink & Hidden Nightlife Discovery Guide',
      audience: '1.5M+ social & web readers',
      cost: 'Free Editorial Pitch',
      deadline: 'Submit 1–2 weeks before show',
      submitUrl: 'https://secretnyc.co/submit-event/',
      actionType: 'form',
      actionLabel: 'Submit Event to Secret NYC ↗',
      tips: 'Pitch the "speakeasy subterranean comedy room hidden on historic St. Marks Place" angle. Secret NYC loves hidden NYC gems.',
      title: `Subterranean Speakeasy Comedy Club: ${show.title}`,
      blurb: `Tight Pants Comedy takes over the underground basement showroom at St. Marks Comedy Club (12 St. Marks Place) for an intimate night of craft cocktails and stand-up comedy featuring talent from ${creditsStr}. Date: ${show.date} @ ${show.time}. Tickets: ${ticketLink}`
    },
    {
      id: 'gothamist-tips',
      name: 'Gothamist Weekend Tips',
      tagline: 'WNYC’s Flagship NYC Culture & News Hub',
      audience: 'Over 2 Million NYC readers',
      cost: 'Free Editorial Tip',
      deadline: 'Submit by Tuesday for weekend culture roundups',
      submitUrl: `mailto:tips@gothamist.com?subject=${encodeURIComponent(`Event Tip: ${show.title} at St. Marks Comedy Club (${show.displayDate})`)}&body=${encodeURIComponent(`Hi Gothamist Arts & Culture Team,\n\nSharing an upcoming indie stand-up showcase in the East Village:\n\nTight Pants Comedy: ${show.title}\nDate: ${show.date} @ ${show.time}\nLocation: St. Marks Comedy Club (12 St. Marks Place, NY 10003)\nLineup credits: ${creditsStr}\nTickets: ${ticketLink}\n\nProduced by independent showrunners Kyle Wayne & John Bennett in an authentic 60-seat basement speakeasy on historic St. Marks Place.\n\nCheers,\nTight Pants Comedy`)}`,
      actionType: 'email',
      actionLabel: '1-Click Email Tip to Gothamist ↗',
      tips: 'Gothamist editors write "Things to do this weekend in NYC". Pitch the local indie angle.',
      title: `Gothamist Arts & Culture Tip`,
      blurb: `1-click email tip pre-formatted for Gothamist editors.`
    }
  ];
}
