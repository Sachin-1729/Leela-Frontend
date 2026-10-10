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
    title: 'BOOK THE ARENA',
    copy: 'Make your occasion truly yours. Book your space and bring your vision to life with the freedom to host, create, and celebrate your way. Birthdays • Weddings • Anniversaries • Celebrations • Conferences • Gatherings • Or anything worth creating memories.',
    cta: 'Explore Leela',
    glow: 'glow-marigold',
    page:"/venue"
  },
  {
    num: '02',
    icon: '🎟️',
    title: 'GET THE PASS',
    copy: 'Discover something new, exciting and worth being part of. Get your pass to curated events, activities and experiences at Leela, and come enjoy moments designed to be shared. Explore • Experience • Connect • Enjoy',
    cta: "See what's on",
    href: '#events',
    glow: 'glow-rani',
    page:"/pass"
  },
  {
    num: '03',
    icon: '✨',
    title: 'BUILD YOUR COMMUNITY',
    copy: 'Bring your interests to life by finding people who share your passions. At Leela, join or create communities around art, drama, dance, music, yoga, gaming, hobbies, and more. Meet like-minded people, exchange ideas, discover new interests, and create meaningful connections through shared experiences.',
    cta: 'Find your circle',
    href: '#communities',
    glow: 'glow',
    page:'/community'
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

// Occasions shown in the "Book the Arena" slider.
// `icon` is a placeholder emoji — set `image` to a file in /public (e.g. '/occasions/wedding.png') to use an icon instead.
export const occasions = [
  {
    title: 'Wedding',
    icon: '💍',
    image: null,
    copy: 'Celebrate your big day with a venue dressed for vows, rituals and the reception that follows.',
    curtain: 'bg-marigold',
  },
  {
    title: 'Birthday',
    icon: '🎂',
    image: null,
    copy: 'From first birthdays to milestone parties — a space to gather everyone you love.',
    curtain: 'bg-rani',
  },
  {
    title: 'Conference',
    icon: '🎤',
    image: null,
    copy: 'Host talks, launches and corporate meets with room for your audience and your agenda.',
    curtain: 'bg-iris',
  },
  {
    title: 'Celebration',
    icon: '🎉',
    image: null,
    copy: 'Anniversaries, festivals and every reason in between — make the moment yours.',
    curtain: 'bg-marigold',
  },
  {
    title: 'Gathering',
    icon: '🤝',
    image: null,
    copy: 'Family get-togethers, community meets and reunions worth creating memories at.',
    curtain: 'bg-rani',
  },
]

// Public events with passes on sale. Leave empty to show "No upcoming public events".
// Shape: { date: 'AUG 16', title, meta, price, cta, art } — art is a CSS background.
export const upcomingEvents = []

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
