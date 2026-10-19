import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Award, 
  Trophy, 
  Mic, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Mail, 
  Download, 
  Copy, 
  Check, 
  Play, 
  Users, 
  Sparkles,
  Share2,
  Newspaper,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
  Archive,
  Layers,
  FileText
} from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function PressKitPage({ onBackToHome }) {
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedFacts, setCopiedFacts] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const pressBoilerplate = `Kyle Wayne and John Bennett joined forces to establish Tight Pants Comedy, an independent comedy collective focused on bringing curated comedy shows featuring top national and underground talent to their favorite venues in NYC. Tight Pants produces a monthly showcase and monthly competition shows at St. Marks Comedy Club and The Comedy Shop, having produced over 100 shows across the city. Featured as an official selection in the 2024 New York Comedy Festival (where they set the St. Marks Comedy Club all-time attendance record) and creators of the "Tight Pants Tight Five" (New York's largest comedy tournament with 150+ comics), Tight Pants represents a vibrant, high-energy cross-section of the New York comedy scene.`;

  const quickFacts = [
    { label: 'Founded', value: '2022 • New York City, NY' },
    { label: 'Co-Founders & Producers', value: 'Kyle Wayne & John Bennett' },
    { label: 'Resident Showrooms', value: 'St. Marks Comedy Club (East Village) & The Comedy Shop (Greenwich Village)' },
    { label: 'Show Format', value: 'Curated 75–90 min showcase, tight 7-minute sets, zero dead time' },
    { label: 'Major Accolades', value: '2024 New York Comedy Festival Official Selection • Showroom Attendance Record' },
    { label: 'Signature Tournament', value: '"Tight Pants Tight Five" (NYC’s largest $5 contest, 150+ comics)' },
    { label: 'Showroom Capacity', value: 'Intimate subterranean speakeasy (~60 seats)' },
    { label: 'General Admission', value: '$20 GA (2-drink minimum required in showroom)' },
    { label: 'Media & Booking Contact', value: 'tightpantscomedy@gmail.com' }
  ];

  const quickFactsPlainText = `TIGHT PANTS COMEDY - PRESS QUICK FACTS
• Founded: 2022 • New York City, NY
• Co-Founders & Producers: Kyle Wayne & John Bennett
• Resident Showrooms: St. Marks Comedy Club (East Village) & The Comedy Shop (Greenwich Village)
• Show Format: Curated 75-90 min showcase, tight 7-minute sets, zero filler
• Major Accolades: 2024 New York Comedy Festival Official Selection • Showroom Attendance Record Holder
• Signature Tournament: "Tight Pants Tight Five" (NYC's largest $5 entry contest, 150+ comics)
• Showroom Capacity: Intimate speakeasy (~60 seats)
• Ticket Price: $20 GA (+ 2 drink min)
• Media & Booking Contact: tightpantscomedy@gmail.com
• Official Website: https://behlv10.github.io/tight-pants-comedy/`;

  const handleCopyBoilerplate = () => {
    navigator.clipboard.writeText(pressBoilerplate);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2500);
  };

  const handleCopyQuickFacts = () => {
    navigator.clipboard.writeText(quickFactsPlainText);
    setCopiedFacts(true);
    setTimeout(() => setCopiedFacts(false), 2500);
  };

  const videos = [
    {
      id: '4NtZTb-zBTY',
      title: 'Tight Pants Comedy Live at St. Marks',
      subtitle: 'Speakeasy Showroom Stand-Up'
    },
    {
      id: 'FLD3YAaLnyI',
      title: 'Kyle Wayne - Live Stand-Up Set',
      subtitle: 'Tight Pants Comedy Showcase'
    },
    {
      id: 'bIWkmO-VHdA',
      title: 'Tight Pants Comedy Highlights',
      subtitle: 'Live in the East Village NYC'
    }
  ];

  const galleryImages = [
    {
      url: 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/66632345-2280-4c03-b9af-4f3ae8c25216/IMG_0211.jpg',
      caption: 'Packed Showroom at St. Marks Comedy Club',
      tag: 'Live Atmosphere'
    },
    {
      url: 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/bdfb91bc-447c-4e41-b103-dce14743c069/Tight+Pants+NYCF+Poster.png',
      caption: '2024 New York Comedy Festival Official Selection Poster',
      tag: 'Festival Feature'
    },
    {
      url: 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/5362b319-d83e-4c68-8198-94174729c09b/Copy+of+Comedians+Poster+-+Tight+5-2.jpg',
      caption: 'Tight Pants Tight Five Tournament Poster (150+ Comics)',
      tag: 'Competition'
    },
    {
      url: 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/00286830-84f5-4a65-8efa-a982e385d5f2/Kyle+Gordon.jpg',
      caption: 'Guest Headliners & Musical Comedy at St. Marks',
      tag: 'Featured Talent'
    },
    {
      url: 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/8fbf21a6-771c-46c6-b3e3-bf349990c92b/tempImageXVzsTl.jpg',
      caption: 'High-Energy Subterranean Speakeasy Comedy',
      tag: 'The Room'
    },
    {
      url: 'https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/8eee3145-a5d0-415e-b72c-664383e1fe02/tempImageHrM57N.jpg',
      caption: 'Tight 7-Minute Sets, No Filler',
      tag: 'Live Showcase'
    }
  ];

  const pressQuotes = [
    {
      publication: 'Time Out New York',
      badge: 'Curated Guide Feature',
      quote: 'An indie comedy show fueled by millennial angst and skinny jeans... rapid-fire sets from a vibrant cross-section of New York City’s comedy scene.',
      note: 'Selected in Time Out New York’s recommended NYC comedy shows'
    },
    {
      publication: 'New York Comedy Festival',
      badge: 'Official Selection Showcase',
      quote: 'Tight Pants Comedy set attendance records at St. Marks Comedy Club, showcasing national headliners with credits spanning Netflix, HBO, Comedy Central, and Hulu.',
      note: '2024 Festival Official Selection & Attendance Record'
    },
    {
      publication: 'Tight Five Tournament',
      badge: 'NYC Stand-Up Competition',
      quote: 'NYC’s largest independent comedy tournament: over 150+ comics bringing their sharpest material to compete for the city’s crown with live judge feedback.',
      note: '12 shows across 3 Manhattan & Brooklyn venues'
    }
  ];

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Quick Facts', href: '#quick-facts' },
    { label: 'The Story', href: '#story' },
    { label: 'Producers', href: '#producers' },
    { label: 'Video Reels', href: '#videos' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Press Acclaim', href: '#press' },
    { label: 'Media Downloads', href: '#downloads' },
    { label: 'Contact', href: '#contact' }
  ];

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-[#07080f] text-zinc-100 pb-20">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-white/10 bg-[#0b0d18]/90 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Shows & Tickets</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 hidden sm:inline">
              Official Press Kit
            </span>
            <a
              href="mailto:tightpantscomedy@gmail.com?subject=Press%20Inquiry%20-%20Tight%20Pants%20Comedy"
              className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
            >
              Contact Press
            </a>
          </div>
        </div>

        {/* Quick Jump Sub-nav Bar */}
        <div className="border-t border-white/5 bg-[#090b14]/95 overflow-x-auto scrollbar-none">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mr-1 hidden md:inline">
              Jump To:
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section id="overview" className="relative pt-6 pb-9 md:pt-8 md:pb-12 overflow-hidden border-b border-white/10">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold tracking-wide uppercase">
              <span>👖</span> Official Press Kit
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
              Tight Pants <span className="text-amber-400">Comedy</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              New York City's premier independent stand-up comedy collective, monthly residency at St. Marks Comedy Club, and official selection of the New York Comedy Festival.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleCopyBoilerplate}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-all cursor-pointer shadow-lg shadow-amber-400/20"
              >
                {copiedBio ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBio ? 'Copied Press Bio!' : 'Copy 100-Word Press Bio'}</span>
              </button>

              <a
                href="#downloads"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              >
                <Download className="w-4 h-4 text-zinc-400" />
                <span>Download Photos & Logos</span>
              </a>

              <a
                href="mailto:tightpantscomedy@gmail.com?subject=Media%20Booking%20Inquiry%20-%20Tight%20Pants%20Comedy"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>tightpantscomedy@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="py-7 border-b border-white/10 bg-[#090b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="tight-glass p-5 rounded-2xl border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">100+</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Shows Produced</div>
              <div className="text-xs text-zinc-400">Across premier comedy clubs and venues in New York City.</div>
            </div>

            <div className="tight-glass p-5 rounded-2xl border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white">NYCF</div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Official Selection</div>
              <div className="text-xs text-zinc-400">Featured in the 2024 New York Comedy Festival with a sold-out showcase.</div>
            </div>

            <div className="tight-glass p-5 rounded-2xl border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">Record</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Attendance Mark</div>
              <div className="text-xs text-zinc-400">Set the all-time attendance record at St. Marks Comedy Club.</div>
            </div>

            <div className="tight-glass p-5 rounded-2xl border-white/10 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-purple-400">150+</div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Tournament Comics</div>
              <div className="text-xs text-zinc-400">Creators of the "Tight Five", NYC's largest stand-up contest ($5 entry).</div>
            </div>
          </div>
        </div>
      </section>

      {/* At A Glance / Quick Facts (Feature 2) */}
      <section id="quick-facts" className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" /> Media Fast Facts
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  At A Glance
                </h2>
                <p className="text-sm text-zinc-400">
                  Quick-reference guide and key details for calendar editors, reviewers, and festival coordinators.
                </p>
              </div>

              <button
                onClick={handleCopyQuickFacts}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors cursor-pointer"
              >
                {copiedFacts ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copiedFacts ? 'Copied Quick Facts!' : 'Copy Quick Facts'}</span>
              </button>
            </div>
          </div>

          <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickFacts.map((fact, idx) => (
                <div key={idx} className="space-y-1 pb-3 border-b border-white/5 md:border-b-0">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    {fact.label}
                  </div>
                  <div className="text-sm font-medium text-zinc-200 leading-snug">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Story & Brand Background */}
      <section id="story" className="py-10 md:py-14 border-b border-white/10 bg-[#090b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                  <span>📖</span> About The Brand
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  The Tight Pants Story
                </h2>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Comedians <strong className="text-white">Kyle Wayne</strong> and <strong className="text-white">John Bennett</strong> joined forces to establish Tight Pants Comedy, an independent comedy collective focused on bringing top-tier talent to their favorite intimate venues in New York City.
                </p>
                <p>
                  Tight Pants produces a monthly flagship showcase along with monthly competition shows at <strong className="text-amber-300">St. Marks Comedy Club</strong> and <strong className="text-amber-300">The Comedy Shop</strong>. With over 100 shows produced across the city, the collective has built a loyal following of comedy lovers seeking authentic, underground NYC stand-up without the inflated prices or tourist gimmicks of midtown clubs.
                </p>
                <p className="text-zinc-400 text-sm">
                  The name “Tight Pants” playfully reflects the fact that Kyle and John are millennials who stubbornly enjoy skinny jeans, despite Gen Z declaring them out of style. Though the co-founders are millennials, Tight Pants is a true cross-section of the New York comedy scene, regularly featuring performers and audience members of all ages, backgrounds, and styles.
                </p>
              </div>

              {/* Accolades highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>NY Comedy Festival</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Selected for the 2024 NYCF, packing St. Marks Comedy Club with an all-headliner lineup and breaking showroom attendance records.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>The "Tight Five"</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Frustrated by expensive festival entry fees, Kyle and John built NYC's biggest $5-entry tournament: 12 shows, 3 venues, live judge feedback, and custom gold pants.
                  </p>
                </div>
              </div>
            </div>

            {/* Poster / Stage Visual */}
            <div className="lg:col-span-5 space-y-4">
              <div className="tight-glass rounded-3xl p-4 border border-white/10 shadow-2xl overflow-hidden group">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 relative">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/bdfb91bc-447c-4e41-b103-dce14743c069/Tight+Pants+NYCF+Poster.png"
                    alt="Tight Pants Comedy New York Comedy Festival Official Poster"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-black mb-1">
                        OFFICIAL SELECTION
                      </span>
                      <h3 className="text-base font-bold text-white">2024 New York Comedy Festival</h3>
                      <p className="text-xs text-zinc-300">St. Marks Comedy Club • Record Attendance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Meet the Co-Producers */}
      <section id="producers" className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span>🎤</span> Leadership & Talent
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Meet the Producers
            </h2>
            <p className="text-sm text-zinc-400">
              The co-founders and comedic minds behind Tight Pants shows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Kyle Wayne */}
            <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-amber-400/30 flex-shrink-0 shadow-lg">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/abcc127a-b99f-4d86-8676-01090110642d/0Q5A0095+2.jpg"
                      alt="Kyle Wayne - Co-Founder of Tight Pants Comedy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">Kyle Wayne</h3>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-0.5">
                      Comedian • Producer • Co-Founder
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      Brooklyn, NY (Orig. Des Moines, IA)
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  Kyle is a Brooklyn-based comic originally from Iowa who moved to New York in 2016. He performs regularly at clubs around New York City and has also taken the stage in Los Angeles and his hometown of Des Moines. Kyle’s sets typically combine sharp crowd work and written material, drawing heavily from his background working in public health, modern dating history, family, and current events.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <a
                  href="https://www.instagram.com/lifestyleofkyle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-amber-400 transition-colors font-semibold"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>@lifestyleofkyle</span>
                </a>

                <a
                  href="https://www.kylewaynecomedy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>kylewaynecomedy.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* John Bennett */}
            <div className="tight-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-white/20 flex-shrink-0 shadow-lg">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/ed7bcfa0-ea1b-4eb1-9328-0a87f6b5e6ab/tempImageSg1Kyu.jpg"
                      alt="John Bennett - Co-Founder of Tight Pants Comedy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">John Bennett</h3>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mt-0.5">
                      Comedian • Producer • Co-Founder
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      Manhattan, NY (Orig. Connecticut)
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  John is an attorney-turned-comedian residing in Manhattan. Originally from Connecticut, John often makes himself the butt of his own jokes, playing up Connecticut stereotypes that may or may not be true. John’s high-energy stage presence, animated delivery, and extended story-style jokes have made him a crowd favorite across the tristate area and a regular at several New York City comedy clubs.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="text-zinc-400">
                  Co-Producer: Tight Pants Comedy Showcase
                </div>

                <span className="text-zinc-500 text-[11px] font-medium">NYC Stand-Up Regular</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Video Sets */}
      <section id="videos" className="py-10 md:py-14 border-b border-white/10 bg-[#090b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span>🎬</span> Video Reels
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Recent Live Sets from St. Marks
            </h2>
            <p className="text-sm text-zinc-400 sm:whitespace-nowrap">
              Watch live clips and showcases recorded directly in our subterranean speakeasy showroom on St. Marks Place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div key={vid.id} className="tight-glass rounded-2xl overflow-hidden border border-white/10 flex flex-col group">
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${vid.id}`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-zinc-400">{vid.subtitle}</p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>St. Marks Comedy Club</span>
                    <span>NYC Live</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery & Interactive Lightbox (Feature 4) */}
      <section id="gallery" className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span>📸</span> Media Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Showroom & Stage Photos
            </h2>
            <p className="text-sm text-zinc-400">
              Editorial photography from live showcases. Click any image to view in full resolution. Free to use with credit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setLightboxIndex(i)}
                className="tight-glass rounded-2xl overflow-hidden border border-white/10 group relative aspect-[4/3] bg-zinc-900 cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {img.tag}
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {img.caption}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-300 hover:text-white mt-2 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Click to expand image
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Quotes & Reviews Callouts (Feature 5) */}
      <section id="press" className="py-10 md:py-14 border-b border-white/10 bg-[#090b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Newspaper className="w-3.5 h-3.5" /> Press & Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Critical & Industry Acclaim
            </h2>
            <p className="text-sm text-zinc-400">
              What publications, comedy festivals, and reviewers have written about Tight Pants shows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressQuotes.map((quoteItem, idx) => (
              <div 
                key={idx}
                className="tight-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 border border-amber-400/30 text-amber-300 uppercase tracking-wider">
                      {quoteItem.badge}
                    </span>
                    <Quote className="w-5 h-5 text-zinc-600" />
                  </div>

                  <p className="text-sm text-zinc-200 italic leading-relaxed">
                    "{quoteItem.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="text-sm font-bold text-white">
                    {quoteItem.publication}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {quoteItem.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Downloads & Master Package (Feature 6) */}
      <section id="downloads" className="py-10 md:py-14 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tight-glass rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
            <div className="space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                  <span>📁</span> Media Kit Downloads
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Promotional Assets & Master Package
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                  High-resolution posters, producer headshots, and ready-to-paste boilerplate for event calendars and press coverage.
                </p>
              </div>

              {/* Master Press Package Banner (Feature 6) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-400/10 via-amber-300/5 to-purple-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Archive className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">Complete Media Kit Package</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-black">ZIP BUNDLE</span>
                  </div>
                  <p className="text-xs text-zinc-300 max-w-xl">
                    Need all assets at once for a festival listing or print program? Grab the complete bundle with high-res headshots, logo marks, and official show artwork.
                  </p>
                </div>

                <a
                  href="mailto:tightpantscomedy@gmail.com?subject=Press%20Kit%20Assets%20Bundle%20Request&body=Hi%20Kyle%20and%20John%2C%0A%0APlease%20send%20over%20the%20full-resolution%20Tight%20Pants%20Comedy%20press%20bundle%20(posters%2C%20headshots%2C%20and%20vector%20logos)%20for%20our%20upcoming%20feature%2Fevent.%0A%0AThanks!"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors whitespace-nowrap shadow-md shadow-amber-400/20"
                >
                  Request Master Asset ZIP
                </a>
              </div>

              {/* Individual Hi-Res Asset Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <a
                  href="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/bdfb91bc-447c-4e41-b103-dce14743c069/Tight+Pants+NYCF+Poster.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      NYCF Official Poster Art (Hi-Res)
                    </div>
                    <div className="text-xs text-zinc-400">PNG Format • 1080x1080</div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-amber-400" />
                </a>

                <a
                  href="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/abcc127a-b99f-4d86-8676-01090110642d/0Q5A0095+2.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      Kyle Wayne Headshot (Hi-Res)
                    </div>
                    <div className="text-xs text-zinc-400">Print Quality JPEG</div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-amber-400" />
                </a>

                <a
                  href="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/ed7bcfa0-ea1b-4eb1-9328-0a87f6b5e6ab/tempImageSg1Kyu.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      John Bennett Headshot (Hi-Res)
                    </div>
                    <div className="text-xs text-zinc-400">Print Quality JPEG</div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-amber-400" />
                </a>

                <a
                  href="https://images.squarespace-cdn.com/content/v1/62a74b930ed3aa6877a092a0/66632345-2280-4c03-b9af-4f3ae8c25216/IMG_0211.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                      St. Marks Showroom Stage Photo
                    </div>
                    <div className="text-xs text-zinc-400">Atmosphere Photography</div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-400 group-hover:text-amber-400" />
                </a>
              </div>

              {/* Copyable One-Sheet Text Box */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Official Press Boilerplate (Ready to Paste)
                  </span>
                  <button
                    onClick={handleCopyBoilerplate}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBio ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBio ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-zinc-300 font-mono leading-relaxed select-all">
                  {pressBoilerplate}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Booking & Media Contact Callout */}
      <section id="contact" className="pt-10 pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tight-glass rounded-3xl p-8 sm:p-10 border border-white/10 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center text-xl">
              📬
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Media Inquiries & Booking
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                For press coverage, festival bookings, or venue partnerships, reach out directly to the co-founders.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:tightpantscomedy@gmail.com?subject=Press%20Inquiry%20-%20Tight%20Pants%20Comedy"
                className="px-6 py-3 rounded-xl text-sm font-bold bg-amber-400 text-black hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                Email Producers (tightpantscomedy@gmail.com)
              </a>
              <button
                onClick={onBackToHome}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors cursor-pointer"
              >
                Back to Upcoming Shows
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal (Feature 4) */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {galleryImages[lightboxIndex].tag}
              </span>
              <span className="text-xs text-zinc-400">
                ({lightboxIndex + 1} of {galleryImages.length})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={galleryImages[lightboxIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open Hi-Res</span>
              </a>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image + Nav */}
          <div 
            className="relative flex-1 flex items-center justify-center py-4 my-auto select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={galleryImages[lightboxIndex].url}
              alt={galleryImages[lightboxIndex].caption}
              className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
              className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Caption */}
          <div className="text-center text-zinc-300 text-sm max-w-xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <p className="font-semibold text-white">{galleryImages[lightboxIndex].caption}</p>
            <p className="text-xs text-zinc-400 mt-1">Press Esc to exit • Use Left/Right keys to browse</p>
          </div>
        </div>
      )}

    </div>
  );
}
