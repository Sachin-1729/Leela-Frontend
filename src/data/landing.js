export const navLinks = [
  { label: 'Venues', href: '#venues' },
  { label: 'Passes', href: '#events' },
  { label: 'Community', href: '#communities' },
  { label: 'About', href: '#about' },
]

export const portals = [
  {
    num: '01',
    icon: '🏛️',
    title: 'Book a Venue',
    copy: 'Amphitheatres, black-box theatres, galleries and rooftop lawns — live availability, locked in minutes.',
    cta: 'Explore venues',
    glow: 'glow-marigold',
    page:"/venue"
  },
  {
    num: '02',
    icon: '🎟️',
    title: 'Buy a Pass',
    copy: 'Verified passes to concerts, plays, art fairs and festivals — straight from the people running them.',
    cta: "See what's on",
    href: '#events',
    glow: 'glow-rani',
  },
  {
    num: '03',
    icon: '✨',
    title: 'Join a Community',
    copy: 'Dance, music, art — find the circle that already gathers around what you love.',
    cta: 'Find your circle',
    href: '#communities',
    glow: 'glow-iris',
  },
]

export const featuredEvents = [
  {
    day: '16',
    month: 'Aug',
    title: 'Kolkata Indie Music Fest',
    meta: 'Rangmanch Amphitheatre · 6 PM',
    price: '₹899 onwards',
    dateClass: 'bg-rani/20 text-[#F5A9C8]',
  },
  {
    day: '23',
    month: 'Aug',
    title: 'Canvas & Chai: Live Art Market',
    meta: 'Studio Noor Gallery · 11 AM',
    price: '₹349 onwards',
    dateClass: 'bg-marigold/20 text-[#FBCA80]',
  },
  {
    day: '30',
    month: 'Aug',
    title: 'Odissi Under the Stars',
    meta: 'Rooftop Lawn, Ballygunge · 7 PM',
    price: '₹599 onwards',
    dateClass: 'bg-iris/25 text-[#C7BEF5]',
  },
]

export const tickerItems = [
  { label: 'NOW BOOKING', text: 'Rangmanch Open-Air Amphitheatre' },
  { label: 'PASSES LIVE', text: 'Kolkata Indie Music Fest, Aug 16' },
  { label: 'NEW CIRCLE', text: 'Odissi & Contemporary Dance Collective' },
  { label: 'NOW BOOKING', text: 'Studio Noor Black-Box Theatre' },
  { label: 'PASSES LIVE', text: 'Canvas & Chai: Live Art Market, Aug 23' },
]

export const venues = [
  {
    tag: 'Open-air · 800 cap.',
    title: 'Rangmanch Amphitheatre',
    copy: "Kolkata's largest open-air stage — full sound rig, tiered seating and backstage green rooms included.",
    curtain: 'bg-marigold',
  },
  {
    tag: 'Black-box · 120 cap.',
    title: 'Studio Noor Theatre',
    copy: 'An intimate, fully rigged black-box for theatre, screenings and small-format live sets.',
    curtain: 'bg-rani',
  },
  {
    tag: 'Rooftop · 200 cap.',
    title: 'Ballygunge Rooftop Lawn',
    copy: 'Skyline views for launches, art markets and evening sets — in-house catering partners available.',
    curtain: 'bg-iris',
  },
]

export const upcomingEvents = [
  {
    date: 'AUG 16',
    title: 'Kolkata Indie Music Fest',
    meta: 'Rangmanch Amphitheatre · 6 PM',
    price: '₹899',
    cta: 'Get pass',
    art: 'linear-gradient(135deg,#E0357B,#7B2E63)',
  },
  {
    date: 'AUG 23',
    title: 'Canvas & Chai: Live Art Market',
    meta: 'Studio Noor Gallery · 11 AM',
    price: '₹349',
    cta: 'Get pass',
    art: 'linear-gradient(135deg,#F5A623,#B9701A)',
  },
  {
    date: 'AUG 30',
    title: 'Odissi Under the Stars',
    meta: 'Rooftop Lawn, Ballygunge · 7 PM',
    price: '₹599',
    cta: 'Get pass',
    art: 'linear-gradient(135deg,#7C6CE0,#3A2E7A)',
  },
  {
    date: 'SEP 05',
    title: 'Open Mic: Verses & Vinyl',
    meta: 'The Attic Black-Box · 8 PM',
    price: 'Free',
    cta: 'Reserve',
    art: 'linear-gradient(135deg,#2FA88A,#155A48)',
  },
  {
    date: 'SEP 12',
    title: 'Durga Puja Curtain Raiser',
    meta: 'Rangmanch Amphitheatre · 5 PM',
    price: '₹1,199',
    cta: 'Get pass',
    art: 'linear-gradient(135deg,#E0357B,#F5A623)',
  },
]

export const communities = [
  { icon: '💃', name: 'Dance', members: '2,140 members · 14 groups', glow: 'glow-top-rani' },
  { icon: '🎵', name: 'Music', members: '3,860 members · 22 groups', glow: 'glow-top-marigold' },
  { icon: '🎨', name: 'Art', members: '1,570 members · 9 groups', glow: 'glow-top-iris' },
]

export const stats = [
  { value: '120+', label: 'Venues listed' },
  { value: '40K', label: 'Passes sold' },
  { value: '45', label: 'Active communities' },
  { value: '4.8★', label: 'Organiser rating' },
]

export const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Book a venue', href: '#venues' },
      { label: 'Buy passes', href: '#events' },
      { label: 'Communities', href: '#communities' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About LEELA', href: '#about' },
      { label: 'For organisers', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { label: 'hello@leela.events', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'WhatsApp', href: '#' },
    ],
  },
]
