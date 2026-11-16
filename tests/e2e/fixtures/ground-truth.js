/**
 * Ground Truth Fixtures for Laxmi Enterprises Modernization
 * Derived strictly from ORIGINAL_REQUEST.md, PROJECT.md, and spec_miner_e2e_3 fixtures.
 */

export const PROHIBITED_TERMS = [
  'kitchens',
  'bathrooms',
  'Looking for some answers',
  'Partner With Us on Your Next',
  "Let's engineer your next workspace",
  'light-pine',
  'hamptons',
  'dark-oak',
  'airy-apartment',
  'modern-kitchen'
];

export const PROHIBITED_PATTERNS = [
  { term: 'kitchens', pattern: /\bkitchens?\b/i },
  { term: 'bathrooms', pattern: /\bbathrooms?\b/i },
  { term: 'Looking for some answers', pattern: /Looking\s+for\s+some\s+answers/i },
  { term: 'Partner With Us on Your Next', pattern: /Partner\s+With\s+Us\s+on\s+Your\s+Next/i },
  { term: "Let's engineer your next workspace", pattern: /Let['’]s\s+engineer\s+your\s+next\s+workspace/i },
  { term: 'light-pine', pattern: /light-pine/i },
  { term: 'hamptons', pattern: /hamptons/i },
  { term: 'dark-oak', pattern: /dark-oak/i },
  { term: 'airy-apartment', pattern: /airy-apartment/i },
  { term: 'modern-kitchen', pattern: /modern-kitchen/i }
];

export const STANDARDIZED_FAQS = [
  {
    q: 'Which materials do you use?',
    a: 'We build to your BOQ. Typical materials: BWP/BWR plywood, HDHMR and fire-retardant boards from certified brands, finished in laminate, veneer or PU.'
  },
  {
    q: 'How quickly can you start, and how long do projects take?',
    a: 'Crews are on site within 48–72 hours of drawing sign-off and site clearance. Typical duration: 2–4 weeks for office clusters, 2–6 months for multi-floor fit-outs.'
  },
  {
    q: 'Do you offer labour-only contracts?',
    a: 'Yes. We offer labour-only (client-supplied material) or full turnkey/item-rate contracts covering procurement, fabrication and installation.'
  },
  {
    q: 'Is the work supervised on site?',
    a: 'Yes. Dedicated trade supervisors oversee site operations daily against shop drawings, quality checklists and safety standards. In critical conditions, our senior specialists are also directly involved through to joint snag handover.'
  }
];

export const FAQ_PAGE_PATHS = [
  '/services',
  '/services/turnkey-interiors',
  '/services/hospitality-healthcare',
  '/services/joinery-furnishings',
  '/services/acoustics-partitions',
  '/services/workstations-facilities',
  '/contact'
];

export const CLOSING_CTA_BANNER = {
  heading: 'Start Your Next Fit-Out',
  subline: 'Planning a commercial project? Share your drawings or BOQ.',
  buttonText: 'Get a Quote',
  buttonHref: '/contact'
};

export const PERMITTED_BUTTON_EXCEPTIONS = [
  'Return Home',
  'Learn More About Us',
  'Share BOQ for Estimation',
  'View All Services',
  'Contact Us'
];

export const MAIN_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' }
];

export const SERVICE_NAV_ITEMS = [
  { label: 'Turnkey Interiors & Fit-Outs', href: '/services/turnkey-interiors' },
  { label: 'Hospitality & Healthcare Fit-Outs', href: '/services/hospitality-healthcare' },
  { label: 'Architectural Joinery & Furnishings', href: '/services/joinery-furnishings' },
  { label: 'Acoustic Panelling & Partitions', href: '/services/acoustics-partitions' },
  { label: 'Workstations & Critical Facilities', href: '/services/workstations-facilities' }
];

export const GROUND_TRUTH_PAGES = {
  '/': {
    seoTitle: 'Turnkey Fit-Outs & Architectural Joinery | Laxmi Enterprises',
    h1: 'Turnkey Interior Fit-Outs & Architectural Joinery',
    heroText: '25+ years of site leadership delivering turnkey fit-outs, architectural joinery and modular workstations for EPC contractors, PMCs, corporates and developers.',
    tagline: 'Led on-site by our Founder & Principal Supervisor.',
    heroButtons: ['Get a Quote', 'Learn More About Us'],
    companyProfile: {
      h2: 'Company Profile',
      h3: '25+ Years of Site Leadership',
      textFragment: 'delivers turnkey interiors, modular workstations and bespoke millwork',
      trustLine: 'GST-registered · Mumbai-based · Pan-India deployment · 16–30 skilled workers on call, scalable · Delivered across data centres, corporate offices, hotels and institutional projects'
    },
    approach: {
      h2: 'Our Approach',
      h3: 'Precision, Speed, Compliance',
      pillars: ['Schedule Discipline', 'BOQ Compliance', 'Trade Supervision', 'Scalable Workforce']
    },
    portfolioSection: {
      h2: 'Portfolio',
      h3: 'Our Work',
      text: 'Acoustic panelling, modular workstations, bespoke cabinetry, boardroom suites and premium joinery.'
    }
  },
  '/about': {
    seoTitle: 'About Us | Laxmi Enterprises',
    h1: 'About Us',
    h2Overview: 'Company Overview',
    overviewIntro: 'With 25+ years of hands-on site leadership, Laxmi Enterprises delivers commercial fit-outs, bulk modular furniture installation and bespoke architectural joinery across Mumbai and pan-India.',
    whatWeDeliver: {
      h3: 'What We Deliver',
      textFragment: 'From high-density workstations and boardroom tables to residential wardrobes and acoustic panelling'
    },
    enterpriseBackground: {
      h2: 'Enterprise Background',
      h3: '25+ Years of Field Leadership',
      textFragment: 'Founded and led by a master supervisor with 20+ years of contracting experience'
    },
    process: {
      h2: 'Our Process',
      steps: [
        '1. Drawing & BOQ Study',
        '2. Site Survey & Verification',
        '3. Execution & Supervision',
        '4. Snag Audit & Handover'
      ]
    },
    ourWork: {
      h2: 'Our Work',
      buttons: ['View All Services', 'Contact Us']
    }
  },
  '/portfolio': {
    seoTitle: 'Portfolio | Laxmi Enterprises',
    h1: 'Portfolio',
    h2: 'Executed Fit-Out Projects',
    intro: 'Full-scope turnkey fit-outs, high-volume workstation deployments, acoustic panelling and executive millwork, delivered to tight milestones and tender specifications',
    subline: 'Our supervisors enforce tolerance checks, drawing compliance and site safety on every project.',
    closingLine: 'Share your drawings or BOQ for a quick estimate.',
    projectCards: [
      {
        title: '4Life Corporate Office & Healthcare Facility',
        description: 'Turnkey joinery, electrical, plumbing and wall reconfiguration.',
        url: '/projects/4life-andheri'
      },
      {
        title: 'Corporate Boardroom & Conference Suites',
        description: '20-seater suite with dual-screen video wall and acoustic timber panelling.',
        url: '/projects/boardroom-conference-suites'
      },
      {
        title: 'Acoustic Panelling & Demountable Partitions',
        description: 'Fabric panelling, bench plinths and flush acoustic vision doors.',
        url: '/projects/acoustic-panelling-partitions'
      },
      {
        title: 'Reception Lobby & Brand Displays',
        description: 'Custom reception counters, backlit signage and trophy showcases.',
        url: '/projects/reception-lobby-displays'
      },
      {
        title: 'Executive Director Cabins & Veneer Joinery',
        description: 'Director suites, veneer cladding and walnut credenzas.',
        url: '/projects/executive-director-cabins'
      },
      {
        title: 'Modular Workstation Deployment',
        description: 'Rapid assembly, raceway levelling and floor handover.',
        url: '/projects/modular-workstation-deployment'
      }
    ]
  },
  '/services': {
    seoTitle: 'Services | Laxmi Enterprises',
    h1: 'Commercial Fit-Outs & Specialist Joinery',
    h2: 'Services',
    serviceCards: [
      {
        title: 'Turnkey Interiors & Fit-Outs',
        description: 'End-to-end interior contracting (joinery, civil, electrical, plumbing and handover) for offices and commercial facilities.',
        url: '/services/turnkey-interiors'
      },
      {
        title: 'Hospitality & Healthcare Fit-Outs',
        description: 'Hotels, restaurants, retail, banks and institutions, coordinated with MEP and HVAC to meet launch dates.',
        url: '/services/hospitality-healthcare'
      },
      {
        title: 'Architectural Joinery & Furnishings',
        description: 'Reception desks, boardroom tables, timber panelling and specialty woodwork built to architect shop drawings.',
        url: '/services/joinery-furnishings'
      },
      {
        title: 'Acoustic Panelling & Partitions',
        description: 'Acoustic slat panelling, partition framing, ceilings and timber flooring.',
        url: '/services/acoustics-partitions'
      },
      {
        title: 'Workstations & Critical Facilities',
        description: 'Workstation clusters, meeting suites, cafeterias and multi-floor corporate deployments.',
        url: '/services/workstations-facilities'
      }
    ]
  },
  '/services/turnkey-interiors': {
    seoTitle: 'Turnkey Interiors & Fit-Outs | Laxmi Enterprises',
    h2: 'Turnkey Fit-Outs',
    subHeading: 'End-to-end interior execution, from drawings to handover',
    capabilities: [
      'Architectural Joinery',
      'Civil & Partitions',
      'Electrical & Lighting',
      'Plumbing & MEP Coordination',
      'Finishes & Hardware',
      'Laser-Level Precision'
    ]
  },
  '/services/hospitality-healthcare': {
    seoTitle: 'Hospitality & Healthcare Fit-Outs | Laxmi Enterprises',
    h2: 'Hospitality & Healthcare Fit-Outs',
    subHeading: 'Turnkey interiors for hospitality and retail',
    capabilities: [
      'Turnkey Commercial Interiors',
      'Retail Fixtures & Display Joinery',
      'Guest Room Millwork',
      'Moisture-Resistant Vanities',
      'Fire-Rated Doors & Frames',
      'Off-Peak & Night-Shift Deployment'
    ]
  },
  '/services/joinery-furnishings': {
    seoTitle: 'Architectural Joinery & Furnishings | Laxmi Enterprises',
    h2: 'Executive Millwork & Joinery',
    subHeading: 'Architectural millwork and bespoke timber fabrication',
    capabilities: [
      'Reception & Concierge Desks',
      'Boardroom & Meeting Tables',
      'Veneer & Fluted Woodwork',
      'Cable Trays & Power Raceways',
      'Metal, Glass & Acrylic Inlays',
      'Acoustic Booths & Pods'
    ]
  },
  '/services/acoustics-partitions': {
    seoTitle: 'Acoustic Panelling & Partitions | Laxmi Enterprises',
    h2: 'Acoustic Panelling & Partitions',
    subHeading: 'Acoustic panelling, partitions and flooring',
    capabilities: [
      'Acoustic Timber Slat Panelling',
      'Demountable Partitions',
      'Hardwood & Laminate Flooring',
      'Fluted & Louvered Walls',
      'Concealed Access Doors',
      'Sub-Base Moisture Verification'
    ]
  },
  '/services/workstations-facilities': {
    seoTitle: 'Workstations & Critical Facilities | Laxmi Enterprises',
    h2: 'Workstations & Facilities',
    subHeading: 'Scalable fit-outs for multi-floor offices',
    capabilities: [
      'Bulk Workstation Installation',
      'Executive Cabins & Boardrooms',
      'Cafeteria & Pantry Joinery',
      'Auditorium & Town Hall Panelling',
      'Phased Deployment for Live Offices',
      'EHS & PPE Compliance'
    ]
  },
  '/projects/4life-andheri': {
    seoTitle: '4Life Corporate Office & Healthcare Facility | Laxmi Enterprises',
    h1: '4Life Corporate Office & Healthcare Facility',
    summary: 'Full turnkey fit-out: architectural joinery, electrical, plumbing and wall reconfiguration',
    scopes: [
      'Plywood & Architectural Joinery',
      'Electrical, Lighting & Cabling',
      'Walls & Partitions',
      'Plumbing & Mechanical'
    ],
    ctaHeading: 'Planning a Fit-Out in Mumbai or Pan-India?',
    buttons: ['Get a Quote', 'Share BOQ for Estimation']
  },
  '/projects/boardroom-conference-suites': {
    seoTitle: 'Corporate Boardroom & Conference Suites | Laxmi Enterprises',
    h1: 'Corporate Boardroom & Conference Suites',
    summary: '20-seater suite with dual-screen video wall, acoustic timber panelling and integrated cabling',
    buttons: ['Get a Quote', 'Share BOQ for Estimation']
  },
  '/projects/acoustic-panelling-partitions': {
    seoTitle: 'Acoustic Panelling & Demountable Partitions | Laxmi Enterprises',
    h1: 'Acoustic Panelling & Demountable Partitions',
    summary: 'Fabric panelling, bench plinths and flush acoustic vision doors',
    buttons: ['Get a Quote', 'Share BOQ for Estimation']
  },
  '/projects/reception-lobby-displays': {
    seoTitle: 'Reception Lobby & Brand Displays | Laxmi Enterprises',
    h1: 'Reception Lobby & Brand Displays',
    summary: 'Custom reception counters, backlit signage and trophy showcases',
    buttons: ['Get a Quote', 'Share BOQ for Estimation']
  },
  '/projects/executive-director-cabins': {
    seoTitle: 'Executive Director Cabins & Veneer Joinery | Laxmi Enterprises',
    h1: 'Executive Director Cabins & Veneer Joinery',
    summary: 'Director suites, veneer cladding and walnut credenzas',
    buttons: ['Get a Quote', 'Share BOQ for Estimation']
  },
  '/projects/modular-workstation-deployment': {
    seoTitle: 'Modular Workstation Deployment | Laxmi Enterprises',
    h1: 'Modular Workstation Deployment & Floor Handover',
    summary: 'Rapid assembly, raceway levelling, acoustic privacy screens and floor handover',
    buttons: ['Get a Quote', 'Share BOQ for Estimation']
  },
  '/contact': {
    seoTitle: 'Contact | Laxmi Enterprises',
    h1: 'Contact Us',
    h2: 'Request a Proposal or Quote',
    h3: 'Tenders & BOQ Submissions',
    tenderTextFragment: 'We welcome tender invitations, BOQ packages, shop drawings and contractor partnerships.',
    h4: 'Connect With Us'
  },
  '/404.html': {
    h3: 'Error 404',
    h4: 'Page not found.',
    copy: "This page doesn't exist or has moved.",
    buttons: ['Return Home', 'Get a Quote']
  }
};
