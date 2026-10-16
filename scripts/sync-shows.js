import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ST_MARKS_API = 'https://qfrmgyichufynswkwaxp.supabase.co/rest/v1/shows';
const ST_MARKS_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmcm1neWljaHVmeW5zd2t3YXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTE1MTgsImV4cCI6MjA3OTIyNzUxOH0.mdxf9-ONnUGrmLnTr4nGA546WKoDFCe2fT8PgBa7k5Q';

function formatShowDate(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-');
  const dateObj = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12, 0, 0));
  
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const monthIdx = Number(month) - 1;
  const dayNum = Number(day);
  const dayOfWeek = dayNames[dateObj.getUTCDay()];
  const fullDayOfWeek = fullDays[dateObj.getUTCDay()];

  let formattedTime = "8:30 PM";
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const h = Number(hours);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    formattedTime = `${hour12}:${minutes} ${suffix}`;
  }

  return {
    displayDate: `${monthNames[monthIdx]} ${dayNum < 10 ? '0' + dayNum : dayNum}`,
    dayOfWeek,
    fullDateString: `${fullDayOfWeek}, ${monthNames[monthIdx]} ${dayNum}, ${year}`,
    timeFormatted: `${formattedTime} (Doors 8:00 PM)`
  };
}

async function fetchStMarksShows() {
  console.log('Fetching live shows from St. Marks Comedy Club database...');
  
  const queries = [
    'show_name=ilike.*tight*&order=show_date.desc',
    'show_name=ilike.*costume*&order=show_date.desc',
    'show_name=ilike.*comfy clash*&order=show_date.desc'
  ];

  const fetchedShows = [];
  const seenIds = new Set();

  for (const q of queries) {
    const url = `${ST_MARKS_API}?select=*&${q}`;
    try {
      const res = await fetch(url, {
        headers: {
          'apikey': ST_MARKS_ANON_KEY,
          'Authorization': `Bearer ${ST_MARKS_ANON_KEY}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        for (const show of data) {
          if (!seenIds.has(show.id)) {
            seenIds.add(show.id);
            fetchedShows.push(show);
          }
        }
      }
    } catch (e) {
      console.error(`Failed to fetch query ${q}:`, e.message);
    }
  }

  return fetchedShows;
}

async function sync() {
  const stMarksShows = await fetchStMarksShows();
  console.log(`Found ${stMarksShows.length} matching shows from St. Marks.`);

  const today = new Date().toISOString().slice(0, 10);

  const formattedShows = stMarksShows.map((s) => {
    const { displayDate, dayOfWeek, fullDateString, timeFormatted } = formatShowDate(s.show_date, s.show_time);
    const isPast = s.show_date < today;

    const isHalloween = s.show_name.toLowerCase().includes('costume');
    const isComfyClash = s.show_name.toLowerCase().includes('comfy');

    let badge = 'Resident Showcase';
    let color = 'amber';

    if (isPast) {
      badge = 'Concluded • Full House';
      color = 'zinc';
    } else if (isHalloween) {
      badge = 'Halloween Special 🎃';
      color = 'orange';
    } else if (isComfyClash) {
      badge = 'Tournament Registration';
      color = 'purple';
    } else {
      badge = 'Tickets On Sale';
      color = 'emerald';
    }

    // Exact direct purchase URLs
    const slugName = s.show_name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const directStMarksUrl = `https://www.stmarkscomedy.com/shows/${slugName}-${s.show_date}-${s.id.slice(0, 8)}`;
    
    // Exact direct Eventbrite URL for Halloween Show
    const exactPurchaseUrl = isHalloween
      ? "https://www.eventbrite.com/e/comedians-in-costumes-halloween-comedy-show-tickets-2001416968028"
      : directStMarksUrl;

    // Price: St. Marks Comedy Club box office adds a flat $2.00 venue service fee per ticket at checkout.
    // Dynamically calculate total ticket price from the database base price + $2 fee:
    const ST_MARKS_BOX_OFFICE_FEE = 2;
    const basePrice = Math.round(Number(s.price) || 18);
    const finalPrice = isHalloween
      ? 20 // Eventbrite listing price
      : (isComfyClash ? basePrice : basePrice + ST_MARKS_BOX_OFFICE_FEE);

    return {
      id: `stmarks-${s.id}`,
      title: isHalloween ? "Comedians in Costumes: Halloween Comedy Show 🎃" : s.show_name,
      venue: "St. Marks Comedy Club",
      neighborhood: "East Village, NYC",
      address: "12 St. Marks Place, New York, NY 10003",
      date: fullDateString,
      isoDate: s.show_date,
      displayDate,
      dayOfWeek,
      time: timeFormatted,
      price: `$${finalPrice}`,
      priceAfterFees: `$${finalPrice}.00 GA`,
      category: isComfyClash ? 'competition' : 'nyc',
      statusBadge: badge,
      badgeColor: color,
      flierUrl: s.flier_url || null,
      roomCapacityNote: "Intimate ~60 Seat Showroom",
      ticketUrl: exactPurchaseUrl,
      eventbriteEventId: isHalloween ? "2001416968028" : null,
      secondaryUrl: "https://tightpantscomedy.eventbrite.com",
      credits: isHalloween 
        ? ["Live In-Character Sets", "Audience Costume Contest", "Spooky Drink Specials", "Guest Judges"]
        : ["Netflix", "Kill Tony", "Comedy Cellar", "Don't Tell Comedy"],
      description: s.description || "The perfect Thursday date night with the Tight Pants crew right in the heart of the East Village! Rapid-fire sets and surprise guest drop-ins.",
      isFeatured: isHalloween || (!isPast && s.show_date === '2026-11-19')
    };
  });

  // Touring & historical milestone shows across 2024, 2025, and 2026
  const milestoneArchiveShows = [
    {
      id: "punchline-philly-oct01",
      title: "Tight Pants Comedy: Live at Punch Line",
      venue: "Punch Line Philly",
      neighborhood: "Fishtown, Philadelphia",
      address: "33 E Laurel St, Philadelphia, PA 19123",
      date: "Thursday, Oct 1, 2026",
      isoDate: "2026-10-01",
      displayDate: "OCT 01",
      dayOfWeek: "THU",
      time: "8:00 PM (Doors 7:00 PM)",
      price: "$20",
      priceAfterFees: "$25 at door",
      category: "tour",
      statusBadge: "Concluded • Sold Out",
      badgeColor: "zinc",
      ticketUrl: "https://www.ticketmaster.com/tight-pants-comedy-philadelphia-pennsylvania-10-01-2026/event/020064C6F69CA49E",
      secondaryUrl: "https://tightpantscomedy.eventbrite.com",
      credits: ["Live Nation", "Punch Line Headliners", "Touring Killers"],
      description: "Tight Pants took Philly! Bringing high-octane East Village energy to the historic Punch Line Philly stage.",
      isFeatured: false
    },
    {
      id: "comfy-clash-hv",
      title: "2026 Comfy Clash Hudson Valley",
      venue: "Hudson Valley Comedy Lounge",
      neighborhood: "Hudson Valley, NY",
      address: "Beacon & Kingston, NY",
      date: "Friday, Nov 20, 2026",
      isoDate: "2026-11-20",
      displayDate: "NOV 20",
      dayOfWeek: "FRI",
      time: "7:30 PM",
      price: "$18",
      priceAfterFees: "$18 GA",
      category: "competition",
      statusBadge: "Tournament Registration",
      badgeColor: "purple",
      roomCapacityNote: "Limited Capacity",
      ticketUrl: "https://www.sendyouravails.com/c/comfy-comedy/ClashHV",
      secondaryUrl: "https://forms.gle/VZreKT7KXQFju9hG9",
      credits: ["Comfy Comedy", "Send Your Avails", "Audience Vote"],
      description: "Multi-round stand-up comedy clash where top comedians battle for the tightest set. Audience votes decide who takes the crown.",
      isFeatured: false
    },
    {
      id: "nycf-2025-record",
      title: "Tight Pants Comedy: NY Comedy Festival Showcase",
      venue: "St. Marks Comedy Club",
      neighborhood: "East Village, NYC",
      address: "12 St. Marks Place, New York, NY 10003",
      date: "Friday, Nov 14, 2025",
      isoDate: "2025-11-14",
      displayDate: "NOV 14",
      dayOfWeek: "FRI",
      time: "8:00 PM & 10:00 PM",
      price: "$25",
      priceAfterFees: "$25.00 GA",
      category: "nyc",
      statusBadge: "Festival Record • Sold Out",
      badgeColor: "zinc",
      ticketUrl: "https://tightpantscomedy.eventbrite.com",
      secondaryUrl: "https://www.stmarkscomedy.com",
      credits: ["Official NY Comedy Fest Selection", "Attendance Record", "Special Guests"],
      description: "Historic double-header showcase that set the all-time attendance record at St. Marks Comedy Club during the New York Comedy Festival.",
      isFeatured: false
    },
    {
      id: "comedy-shop-residency-2025",
      title: "Tight Pants Comedy: Greenwich Village Special",
      venue: "The Comedy Shop",
      neighborhood: "Greenwich Village, NYC",
      address: "167 Bleecker St, New York, NY 10012",
      date: "Saturday, Sep 20, 2025",
      isoDate: "2025-09-20",
      displayDate: "SEP 20",
      dayOfWeek: "SAT",
      time: "9:00 PM",
      price: "$20",
      priceAfterFees: "$20.00 GA",
      category: "nyc",
      statusBadge: "Concluded • Full House",
      badgeColor: "zinc",
      ticketUrl: "https://tightpantscomedy.eventbrite.com",
      secondaryUrl: "https://tightpantscomedy.eventbrite.com",
      credits: ["Bleecker Street Showcase", "Cellar Regulars", "Kyle & John"],
      description: "Special pop-up showcase at the historic Comedy Shop on Bleecker Street featuring Greenwich Village killers.",
      isFeatured: false
    },
    {
      id: "nycf-2024-debut",
      title: "Tight Pants Comedy: NY Comedy Festival Debut",
      venue: "St. Marks Comedy Club",
      neighborhood: "East Village, NYC",
      address: "12 St. Marks Place, New York, NY 10003",
      date: "Thursday, Nov 07, 2024",
      isoDate: "2024-11-07",
      displayDate: "NOV 07",
      dayOfWeek: "THU",
      time: "8:30 PM",
      price: "$20",
      priceAfterFees: "$20.00 GA",
      category: "nyc",
      statusBadge: "Festival Debut • Sold Out",
      badgeColor: "zinc",
      ticketUrl: "https://tightpantscomedy.eventbrite.com",
      secondaryUrl: "https://www.stmarkscomedy.com",
      credits: ["Official Selection", "NYC Standouts", "Touring Headliners"],
      description: "Tight Pants Comedy's first official selection showcase at the New York Comedy Festival, cementing their East Village residency.",
      isFeatured: false
    }
  ];

  const allShows = [...formattedShows, ...milestoneArchiveShows];

  const outputCode = `// Auto-generated by scripts/sync-shows.js from St. Marks Comedy Club & Eventbrite
// Last synced: ${new Date().toISOString()}

export const SHOWS_DATA = ${JSON.stringify(allShows, null, 2)};

export const PRESS_DATA = [
  {
    id: 1,
    publication: "Time Out New York",
    badge: "Official Press Feature",
    quote: "An indie comedy show fueled by millennial angst and skinny jeans... rapid-fire sets from a cross-section of New York City's comedy scene.",
    context: "Featured in Time Out NYC's curated comedy recommendations",
    year: "NYC Guide Feature"
  },
  {
    id: 2,
    publication: "New York Comedy Festival",
    badge: "Official Festival Selection",
    quote: "Tight Pants Comedy set attendance records at St. Marks Comedy Club, showcasing national headliners with credits spanning Netflix, HBO, Comedy Central, and Hulu.",
    context: "Official Selection Showcase & Showroom Record Holder",
    year: "NYCF Official Selection"
  },
  {
    id: 3,
    publication: "Tight Five Comedy Tournament",
    badge: "NYC Stand-Up Competition",
    quote: "One of New York City's largest independent comedy tournaments, with over 150+ comedians bringing their sharpest material to compete for the city's best tight five.",
    context: "Over 150+ comedians scouted and booked across NYC",
    year: "Annual Showcase Tournament"
  }
];

export const REVIEWS_DATA = PRESS_DATA;

export const FAQS = [
  {
    q: "Where is St. Marks Comedy Club located?",
    a: "St. Marks Comedy Club is located in the heart of NYC's East Village at 12 St. Marks Place, New York, NY 10003 (between 2nd and 3rd Avenues). Accessible via the 6, N, R, W, and L subway lines."
  },
  {
    q: "Is there a drink minimum?",
    a: "Yes, like most NYC comedy showrooms, there is a two-drink minimum per person required in the showroom. Alcoholic drinks, mocktails, and non-alcoholic options all count."
  },
  {
    q: "What time should we arrive?",
    a: "Doors open 30 minutes prior to showtime (8:00 PM for the 8:30 PM show). Seating is assigned based on on-time check-in by groups as purchased, so we recommend arriving 20-30 minutes early."
  },
  {
    q: "What are the age restrictions?",
    a: "Shows at St. Marks Comedy Club are 18 and up only. Valid government-issued photo ID is required for entry and to purchase alcoholic beverages."
  },
  {
    q: "How can comedians submit for booking?",
    a: "We love scouting new talent with tight material! Comics can submit their video link, avails, and credits directly through our booking submission form (forms.gle/VZreKT7KXQFju9hG9) or register avails via sendyouravails.com."
  }
];
`;

  const outputPath = path.resolve(__dirname, '../src/data/shows.js');
  fs.writeFileSync(outputPath, outputCode, 'utf-8');
  console.log(`Successfully synced ${allShows.length} shows to ${outputPath}!`);
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});
