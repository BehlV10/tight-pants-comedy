/**
 * Reddit Promotion Drafter for 12 targeted NYC subreddits.
 * Generates tailored copy, mandatory flairs, compliance rules,
 * and 1-click prefilled Reddit submit links.
 */

export function generateRedditCampaign(show, customTicketUrl) {
  const ticketLink = customTicketUrl || show.ticketUrl || 'https://tightpantscomedy.eventbrite.com';
  const flierImg = show.flierUrl || 'https://tightpantscomedy.com/images/nycf-poster.png';
  const creditsStr = show.credits?.join(', ') || 'Netflix, Comedy Central, Comedy Cellar';

  const subreddits = [
    {
      sub: 'r/nycevents',
      name: 'NYC Events (Flagship)',
      subUrl: 'https://www.reddit.com/r/nycevents',
      flair: '🎭 Comedy',
      rules: 'Requires [Event] and [Genre] in title, exact date/time/price, and Comedy flair.',
      angle: 'Event Listing',
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
      flair: '📅 Event',
      rules: 'Requires bracketed date tag and neighborhood context in title.',
      angle: 'Weekend / Weeknight Guide',
      title: `[${show.displayDate}] ${show.title} @ St. Marks Comedy Club in East Village`,
      body: `If you're looking for date night or weeknight plans in lower Manhattan, **Tight Pants Comedy** is hosting **${show.title}** at St. Marks Comedy Club (${show.address}) on **${show.date} @ ${show.time}**.

• **Vibe:** Underground speakeasy club right in the heart of St. Marks Place.
• **Talent:** Lineup of NYC club headliners (${creditsStr}).
• **Tickets:** ${show.price} GA
• **Eventbrite Direct Tickets:** [Get Tickets Here](${ticketLink})`
    },
    {
      sub: 'r/eastvillage',
      name: 'East Village (Hyperlocal)',
      subUrl: 'https://www.reddit.com/r/eastvillage',
      flair: '🎟️ Events',
      rules: 'Strictly local to East Village (12 St. Marks Place). Community-focused neighborhood tone.',
      angle: 'Neighborhood Event',
      title: `East Village Event: ${show.title} @ St. Marks Comedy Club (${show.dayOfWeek} ${show.displayDate})`,
      body: `For anyone looking for neighborhood events right on St. Marks Place:

Tight Pants Comedy is back at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} @ ${show.time}**.

• Curated 75-minute showcase of NYC comics (${creditsStr}).
• Intimate ~60 seat speakeasy showroom with speakeasy cocktails.
• Tickets are ${show.price} GA on Eventbrite: [Eventbrite Tickets](${ticketLink})

Hope to see some local neighborhood folks in the showroom!`
    },
    {
      sub: 'r/lowereastside',
      name: 'Lower East Side',
      subUrl: 'https://www.reddit.com/r/lowereastside',
      flair: '📍 Event / Local',
      rules: 'Must be relevant to Lower East Side / St. Marks corridor. Mention exact venue.',
      angle: 'Local Nightlife',
      title: `Upcoming Comedy on St. Marks: ${show.title} (${show.dayOfWeek} ${show.displayDate})`,
      body: `Hey neighbors! Sharing an upcoming local comedy showcase right at the LES / East Village border.

**Tight Pants Comedy** is at **St. Marks Comedy Club** (12 St. Marks Place) on **${show.date} at ${show.time}**.

• Format: Rapid-fire 7-minute sets from top club regulars (${creditsStr}).
• Room: Intimate speakeasy subterranean room.
• Tickets: ${show.price} GA on [Eventbrite](${ticketLink})`
    },
    {
      sub: 'r/GreenwichVillage',
      name: 'Greenwich Village',
      subUrl: 'https://www.reddit.com/r/GreenwichVillage',
      flair: '🎭 Arts & Entertainment',
      rules: 'Arts and entertainment focus near Washington Square & Village venues.',
      angle: 'Village Comedy Tradition',
      title: `Downtown Indie Comedy Showcase: ${show.title} (${show.displayDate})`,
      body: `For anyone downtown who loves live stand-up comedy without the midtown tourist traps:

Tight Pants Comedy is putting on a curated showcase at **St. Marks Comedy Club** (12 St. Marks Place) this **${show.dayOfWeek}, ${show.displayDate} @ ${show.time}**.

Comics seen on ${creditsStr}. Intimate speakeasy setting with craft drinks.

Tickets (${show.price} GA): [Eventbrite Link](${ticketLink})`
    },
    {
      sub: 'r/newyorkcity',
      name: 'New York City (General)',
      subUrl: 'https://www.reddit.com/r/newyorkcity',
      flair: '🗽 Things To Do',
      rules: 'Post in Things To Do / Events threads. Focus on authentic indie NYC culture.',
      angle: 'Independent NYC Comedy',
      title: `NYC Stand-Up Showcase: ${show.title} @ St. Marks Comedy Club (${show.displayDate})`,
      body: `Co-founders Kyle Wayne & John Bennett are producing **${show.title}** at St. Marks Comedy Club in the East Village on **${show.date} @ ${show.time}**.

Featured as an official selection in the New York Comedy Festival and creators of NYC's largest indie tournament. 75-minute rapid-fire sets, zero dead time, and killer drop-ins.

• Room: Intimate ~60 seat subterranean club
• Tickets (${show.price} GA): [Eventbrite Checkout](${ticketLink})`
    },
    {
      sub: 'r/NYCDateIdeas',
      name: 'NYC Date Ideas',
      subUrl: 'https://www.reddit.com/r/NYCDateIdeas',
      flair: '💡 Date Night Idea',
      rules: 'Focus on atmosphere, intimacy, drinks, and date night experience.',
      angle: 'Speakeasy Date Night',
      title: `East Village Date Idea: Speakeasy Comedy Club on St. Marks Place (${show.displayDate})`,
      body: `Great date night spot for anyone looking for something fun, intimate, and casual in the East Village:

**Tight Pants Comedy** at St. Marks Comedy Club (12 St. Marks Place).

• **The Vibe:** Underground basement speakeasy behind a hidden door with ~60 intimate seats and great craft cocktails.
• **The Show:** 75-minute curated stand-up showcase with comics from ${creditsStr}.
• **When:** ${show.dayOfWeek}, ${show.displayDate} @ ${show.time}
• **Cost:** ${show.price} GA (2-item showroom minimum)
• **Tickets:** [Eventbrite Reservation](${ticketLink})`
    },
    {
      sub: 'r/Bushwick',
      name: 'Bushwick',
      subUrl: 'https://www.reddit.com/r/Bushwick',
      flair: '🎪 Events',
      rules: 'Focus on easy L-train hop straight to 1st Ave.',
      angle: 'L-Train Hop to Manhattan',
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
      flair: '🍻 Nightlife / Events',
      rules: 'Highlight proximity across the river and authentic speakeasy vibe.',
      angle: 'Quick Hop Nightlife',
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
      flair: '🎟️ Event',
      rules: 'Direct N/W train access to 8th St-NYU station right on St. Marks Place.',
      angle: 'Direct Train Access',
      title: `Direct N/W Ride: ${show.title} @ St. Marks Comedy Club (${show.dayOfWeek} ${show.displayDate})`,
      body: `For Queens folks heading downtown (steps from the 8th St-NYU N/R/W station):

Tight Pants Comedy is producing **${show.title}** at St. Marks Comedy Club (12 St. Marks Place) on **${show.date} @ ${show.time}**.

Curated 7-minute sets from top club regulars (${creditsStr}) in an authentic underground speakeasy.

Tickets are ${show.price} GA: [Eventbrite Tickets](${ticketLink})`
    },
    {
      sub: 'r/Standup',
      name: 'Standup Comedy',
      subUrl: 'https://www.reddit.com/r/Standup',
      flair: '🎤 Live Shows',
      rules: 'Highlight comic craftsmanship, tight showcase format, and NYCF credentials.',
      angle: 'Pure Comedy Craft',
      title: `NYC Indie Showcase: ${show.title} @ St. Marks Comedy Club (${show.displayDate})`,
      body: `For anyone in NYC who loves live, curated stand-up without dead time or barker shows:

Tight Pants Comedy produces a monthly curated showcase at **St. Marks Comedy Club** in the East Village. Next show is **${show.date} @ ${show.time}**.

• Format: Tight 7-minute sets, zero dead time, surprise national headliners.
• Accolades: Official selection in the 2024 New York Comedy Festival (set the venue's all-time showroom attendance record).
• Lineup includes comics seen on ${creditsStr}.

Eventbrite tickets: [Eventbrite Link](${ticketLink})`
    },
    {
      sub: 'r/nycmeetups',
      name: 'NYC Meetups',
      subUrl: 'https://www.reddit.com/r/nycmeetups',
      flair: '👋 Social / Outing',
      rules: 'Focus on social meetup and meeting other comedy fans for drinks.',
      angle: 'Social Group Outing',
      title: `[${show.displayDate}] Comedy Night & Drinks @ St. Marks Comedy Club (${show.time})`,
      body: `Hey everyone! Putting together a group outing for stand-up comedy and speakeasy drinks in the East Village:

**When:** ${show.dayOfWeek}, ${show.displayDate} @ ${show.time} (Doors open 30 min prior)  
**Where:** St. Marks Comedy Club (12 St. Marks Place, East Village)  
**The Show:** Tight Pants Comedy (${show.price} GA) — curated underground showcase featuring comics from ${creditsStr}.

Great way to grab drinks and laugh with other comedy lovers. Feel free to comment or DM if you want to join our table!

Tickets on Eventbrite: [Eventbrite Link](${ticketLink})`
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
