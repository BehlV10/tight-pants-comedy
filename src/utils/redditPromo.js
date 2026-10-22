/**
 * Reddit Promotion Drafter for targeted NYC subreddits.
 * Categorized by safety level based on verified moderator rules:
 * - Green: Standalone event post permitted & welcomed
 * - Yellow: Permitted ONLY in pinned weekly "Things To Do" / Events megathreads
 * - Red: Explicitly banned or high risk of immediate removal / account strike
 */

export function generateRedditCampaign(show, customTicketUrl) {
  const ticketLink = customTicketUrl || show.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
  const flierImg = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';
  const creditsStr = show.credits?.join(', ') || 'Netflix, Comedy Central, Comedy Cellar';

  const subreddits = [
    // -------------------------------------------------------------------------
    // TIER 1: GREEN (100% Permitted for Standalone Event Posts)
    // -------------------------------------------------------------------------
    {
      sub: 'r/nycevents',
      name: 'NYC Events (Official Event Board)',
      subUrl: 'https://www.reddit.com/r/nycevents',
      safety: 'green',
      safetyBadge: '✅ Safe for Standalone Post',
      flair: '🎭 Comedy',
      rules: 'Requires [Event] and [Comedy] in title, exact date, venue, and price.',
      strategy: 'Post 2–4 days before the show with the exact title format below.',
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
      safety: 'green',
      safetyBadge: '✅ Safe for Standalone Post',
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
      safety: 'green',
      safetyBadge: '✅ Safe for Standalone Post',
      flair: '🎭 Arts & Entertainment',
      rules: 'Arts and entertainment focus near Washington Square & Village venues.',
      strategy: 'Highlights downtown indie comedy culture away from midtown clubs.',
      title: `Downtown Indie Comedy Showcase: ${show.title} (${show.displayDate})`,
      body: `For anyone downtown who loves live stand-up comedy without the midtown tourist traps:

Tight Pants Comedy is putting on a curated showcase at **St. Marks Comedy Club** (12 St. Marks Place) this **${show.dayOfWeek}, ${show.displayDate} @ ${show.time}**.

Comics seen on ${creditsStr}. Intimate speakeasy setting with craft drinks.

Tickets (${show.price} GA): [Eventbrite Link](${ticketLink})`
    },

    // -------------------------------------------------------------------------
    // TIER 2: YELLOW (Permitted in Megathreads or Comment Recommendations)
    // -------------------------------------------------------------------------
    {
      sub: 'r/newyorkcity',
      name: 'New York City (General)',
      subUrl: 'https://www.reddit.com/r/newyorkcity',
      safety: 'yellow',
      safetyBadge: '⚠️ Pinned Megathread Only',
      flair: '🗽 Things To Do',
      rules: 'Rule 7 prohibits standalone ads. Paste into weekly pinned "Things To Do" thread.',
      strategy: 'Look for the weekly pinned stickied thread and paste as a comment.',
      title: `NYC Stand-Up Showcase: ${show.title} @ St. Marks Comedy Club (${show.displayDate})`,
      body: `Co-founders Kyle Wayne & John Bennett are producing **${show.title}** at St. Marks Comedy Club in the East Village on **${show.date} @ ${show.time}**.

Featured as an official selection in the New York Comedy Festival and creators of NYC's largest indie tournament. 75-minute rapid-fire sets, zero dead time, and killer drop-ins.

• Room: Intimate ~60 seat subterranean club (12 St. Marks Place)
• Tickets (${show.price} GA): [Eventbrite Checkout](${ticketLink})`
    },
    {
      sub: 'r/AskNYC',
      name: 'AskNYC (Recommendation Mining)',
      subUrl: 'https://www.reddit.com/r/AskNYC',
      safety: 'yellow',
      safetyBadge: '💬 Comment on Questions Only',
      flair: '💡 Recommendation',
      rules: 'DO NOT create a standalone post! Search "comedy recommendations" or "date night" and reply.',
      strategy: 'Search "comedy show" or "date night lower manhattan" and comment recommending St. Marks.',
      title: `Recommendation: Tight Pants Comedy @ St. Marks Comedy Club (${show.displayDate})`,
      body: `If you want an authentic indie comedy club vibe without the midtown tourist barkers, check out **Tight Pants Comedy** at **St. Marks Comedy Club** (12 St. Marks Place). 

They do an underground speakeasy showcase in an intimate ~60 seat room with comics from ${creditsStr}. Upcoming show is on ${show.date} @ ${show.time}: [Eventbrite](${ticketLink})`
    },
    {
      sub: 'r/Bushwick',
      name: 'Bushwick',
      subUrl: 'https://www.reddit.com/r/Bushwick',
      safety: 'yellow',
      safetyBadge: '⚠️ Pinned Promo Thread Only',
      flair: '🎪 Events',
      rules: 'Rule 7 restricts commercial events from the main feed; post in stickied promo thread.',
      strategy: 'Paste in Bushwick stickied promo thread. Highlight easy 1-stop L train ride to 1st Ave.',
      title: `East Village Stand-Up: ${show.title} @ St. Marks (${show.dayOfWeek} ${show.displayDate})`,
      body: `Just a quick L-train ride across the river to 1st Ave / 8th St:

Tight Pants Comedy is back at **St. Marks Comedy Club** on **${show.date} @ ${show.time}**. Curated lineup of NYC club regulars (${creditsStr}) in an authentic subterranean speakeasy.

No midtown tourist gimmicks. Intimate 60-seat room.

Tickets (${show.price} GA): [Eventbrite Link](${ticketLink})`
    },
    {
      sub: 'r/williamsburg',
      name: 'Williamsburg',
      subUrl: 'https://www.reddit.com/r/williamsburg',
      safety: 'yellow',
      safetyBadge: '⚠️ Weekly Thread Only',
      flair: '🍻 Nightlife / Events',
      rules: 'Standalone commercial link drops get removed as spam. Use community event threads.',
      strategy: 'Mention it is just one stop on the L train from Bedford Ave.',
      title: `Live Comedy in East Village: ${show.title} (${show.displayDate} @ St. Marks Comedy Club)`,
      body: `One stop on the L train to Manhattan:

Tight Pants Comedy is hosting **${show.title}** at St. Marks Comedy Club (12 St. Marks Place) on **${show.date} @ ${show.time}**.

Top comics from ${creditsStr}, intimate speakeasy room with craft cocktails.

Tickets are ${show.price} GA on Eventbrite: [Eventbrite Link](${ticketLink})`
    },
    {
      sub: 'r/astoria',
      name: 'Astoria',
      subUrl: 'https://www.reddit.com/r/astoria',
      safety: 'yellow',
      safetyBadge: '⚠️ Weekend Discussion Thread',
      flair: '🎟️ Event',
      rules: 'Strict against standalone promo links. Share inside the weekly "Weekend Plans" thread.',
      strategy: 'Highlight direct N/W train ride straight to 8th St-NYU station right on St. Marks Place.',
      title: `Direct N/W Ride: ${show.title} @ St. Marks Comedy Club (${show.dayOfWeek} ${show.displayDate})`,
      body: `For Queens folks heading downtown (steps from the 8th St-NYU N/R/W station):

Tight Pants Comedy is producing **${show.title}** at St. Marks Comedy Club (12 St. Marks Place) on **${show.date} @ ${show.time}**.

Curated 7-minute sets from top club regulars (${creditsStr}) in an authentic underground speakeasy.

Tickets are ${show.price} GA: [Eventbrite Tickets](${ticketLink})`
    },
    {
      sub: 'r/lowereastside',
      name: 'Lower East Side',
      subUrl: 'https://www.reddit.com/r/lowereastside',
      safety: 'yellow',
      safetyBadge: '⚠️ Local Megathread',
      flair: '📍 Event / Local',
      rules: 'Small subreddit; pure marketing links get flagged quickly. Keep tone conversational.',
      strategy: 'Engage with local neighbors about St. Marks comedy corridor.',
      title: `Upcoming Comedy on St. Marks: ${show.title} (${show.dayOfWeek} ${show.displayDate})`,
      body: `Hey neighbors! Sharing an upcoming local comedy showcase right at the LES / East Village border.

**Tight Pants Comedy** is at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} at ${show.time}**.

• Format: Rapid-fire 7-minute sets from top club regulars (${creditsStr}).
• Room: Intimate speakeasy subterranean room.
• Tickets: ${show.price} GA on [Eventbrite](${ticketLink})`
    },

    // -------------------------------------------------------------------------
    // TIER 3: RED (DO NOT POST STANDALONE - EXPLICITLY BANNED)
    // -------------------------------------------------------------------------
    {
      sub: 'r/eastvillage',
      name: 'East Village (STRICT BAN)',
      subUrl: 'https://www.reddit.com/r/eastvillage',
      safety: 'red',
      safetyBadge: '🚫 RULE 6 BANS COMEDY SHOWS',
      flair: 'DO NOT POST',
      rules: 'CRITICAL: Rule 6 explicitly bans comedy clubs & shows! Violations get account strikes.',
      strategy: 'DO NOT post standalone! You will be flagged and reported by mods.',
      title: `[DO NOT POST STANDALONE] Rule 6 Violation Risk`,
      body: `WARNING: The r/eastvillage community voted to officially ban comedy club and show advertisements under Rule 6. Do NOT submit a standalone link or text post here, as it carries a moderator strike penalty.`
    },
    {
      sub: 'r/nycmeetups',
      name: 'NYC Meetups (STRICT RESTRICTION)',
      subUrl: 'https://www.reddit.com/r/nycmeetups',
      safety: 'red',
      safetyBadge: '🚫 NO COMMERCIAL TICKETING',
      flair: 'DO NOT POST ADS',
      rules: 'Bans commercial promoters. Posters must be host-organizers for free social meetups.',
      strategy: 'Only allowed if Kyle or John literally hosts a free group drinks meetup in person.',
      title: `[DO NOT POST ADS] Commercial Ticketing Prohibited`,
      body: `WARNING: r/nycmeetups strictly forbids commercial event promotion or ticket sales links. External promoters are banned.`
    },
    {
      sub: 'r/Standup',
      name: 'Standup Comedy (GLOBAL FORUM)',
      subUrl: 'https://www.reddit.com/r/Standup',
      safety: 'red',
      safetyBadge: '🚫 BANS LOCAL SHOW FLYERS',
      flair: 'DO NOT POST FLYERS',
      rules: 'Global subreddit for craft discussion. Local show flyers & ticket links are banned as spam.',
      strategy: 'Only share funny original stand-up video clips of Kyle/John; do not post ticket links.',
      title: `[DO NOT POST FLYERS] Local Show Ads Banned`,
      body: `WARNING: r/Standup prohibits posting local show flyers or ticket promotions. They redirect all event posts to local city boards.`
    }
  ];

  // Enrich each subreddit draft with 1-click pre-filled links and image comment snippets
  return subreddits.map((item) => {
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
}
