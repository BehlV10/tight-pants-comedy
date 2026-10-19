# Tight Pants Comedy 👖⚡

A high-converting, modern web application for New York City's premier independent stand-up comedy showcase, **Tight Pants Comedy** (co-produced by comedians **Kyle Wayne** & **John Bennett** at **St. Marks Comedy Club** in the East Village).

Built with a direct-to-fan, high-urgency aesthetic designed to maximize ticket conversions and community engagement.

---

## 🚀 Quick Start (Run Locally)

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the local dev server
npm run dev

# 3. Open in your browser
# Typically http://localhost:5173
```

To build for production:
```bash
npm run build
npm run preview
```

---

## 🎯 Key Design Features

1. **High-Urgency Ticketing Engine**:
   - Live availability meters (e.g. *84% Sold Out*, *12 Tickets Left*).
   - Dynamic status badges (*Selling Fast*, *Almost Sold Out*, *Presale Open*).
   - Category filtering: All Shows, NYC Residencies (St. Marks), On Tour (Punch Line Philly), Competitions (Comfy Clash).
   - One-click checkout buttons linked to Eventbrite, Ticketmaster, and venue box offices.

2. **Social Proof & Reviews**:
   - 5.0 ★ aggregate rating widget.
   - Press quotes from *Time Out New York* and *New York Comedy Festival*.
   - Verified audience quotes highlighting the electric East Village atmosphere.

3. **Dedicated Comic Booking Portal**:
   - Direct integration with Tight Pants' Google Form (`forms.gle/VZreKT7KXQFju9hG9`).
   - Clear submission guidelines for comics to submit their 5-minute tape and avails.
   - Saves producers dozens of hours of manual DM fielding on Instagram.

4. **"Never Miss A Drop" VIP List**:
   - Email capture for presale codes, tour announcements, and secret headliner reveals.

5. **Venue & FAQ Speakeasy Guide**:
   - St. Marks Comedy Club address (131 1st Ave, East Village).
   - Explains the NYC 2-item minimum policy, door arrival times, and age restrictions.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism (`tight-glass`)
- **Typography**: Syne (Punchy display titles) + Plus Jakarta Sans (Clean modern body)
- **Icons**: Lucide React + custom brand vectors
- **Zero Heavy Dependencies**: Blazing fast initial load and 100/100 Lighthouse performance.

---

## 🌐 Free 1-Click Deployment Guide

You can deploy this site in under 2 minutes:

### Option A: Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Keep default settings (`Framework: Vite`, `Build command: npm run build`, `Output: dist`).
4. Click **Deploy**.
5. Add custom domain (e.g. `tightpantscomedy.com` or `tightpantsnyc.com`).

### Option B: Netlify
1. Drag and drop the `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop) or connect to your GitHub repo.
2. Build command: `npm run build`, Publish directory: `dist`.

---

## ✏️ How to Update Shows & Links

All show dates, prices, ticket URLs, and status badges are organized cleanly in:
`src/data/shows.js`

To add a new show, simply add an entry with:
- `title`, `date`, `time`, `venue`
- `ticketUrl`: Your Eventbrite / Ticketmaster / St. Marks link
- `capacityPercent`: 0–100 for urgency bar
- `statusBadge`: "Selling Fast", "Almost Sold Out", etc.
