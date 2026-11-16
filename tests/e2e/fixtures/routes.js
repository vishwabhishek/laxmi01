/**
 * Route Fixtures for Laxmi Enterprises Modernization
 * Contains canonical routes (16), legacy redirect pairs (10), deleted routes (4), and utilities (2).
 */

export const CANONICAL_ROUTES = [
  {
    id: 'home',
    path: '/',
    filePath: 'index.html',
    canonicalUrl: 'https://laxmienterprises.in/',
    category: 'core',
    seoTitle: 'Turnkey Fit-Outs & Architectural Joinery | Laxmi Enterprises',
    primaryHeading: 'Turnkey Interior Fit-Outs & Architectural Joinery'
  },
  {
    id: 'about',
    path: '/about',
    filePath: 'about/index.html',
    canonicalUrl: 'https://laxmienterprises.in/about',
    category: 'core',
    seoTitle: 'About Us | Laxmi Enterprises',
    primaryHeading: 'About Us'
  },
  {
    id: 'portfolio',
    path: '/portfolio',
    filePath: 'portfolio/index.html',
    canonicalUrl: 'https://laxmienterprises.in/portfolio',
    category: 'core',
    seoTitle: 'Portfolio | Laxmi Enterprises',
    primaryHeading: 'Portfolio'
  },
  {
    id: 'services',
    path: '/services',
    filePath: 'services/index.html',
    canonicalUrl: 'https://laxmienterprises.in/services',
    category: 'core',
    seoTitle: 'Services | Laxmi Enterprises',
    primaryHeading: 'Commercial Fit-Outs & Specialist Joinery'
  },
  {
    id: 'service-turnkey-interiors',
    path: '/services/turnkey-interiors',
    filePath: 'services/turnkey-interiors/index.html',
    canonicalUrl: 'https://laxmienterprises.in/services/turnkey-interiors',
    category: 'service',
    seoTitle: 'Turnkey Interiors & Fit-Outs | Laxmi Enterprises',
    primaryHeading: 'Turnkey Fit-Outs'
  },
  {
    id: 'service-hospitality-healthcare',
    path: '/services/hospitality-healthcare',
    filePath: 'services/hospitality-healthcare/index.html',
    canonicalUrl: 'https://laxmienterprises.in/services/hospitality-healthcare',
    category: 'service',
    seoTitle: 'Hospitality & Healthcare Fit-Outs | Laxmi Enterprises',
    primaryHeading: 'Hospitality & Healthcare Fit-Outs'
  },
  {
    id: 'service-joinery-furnishings',
    path: '/services/joinery-furnishings',
    filePath: 'services/joinery-furnishings/index.html',
    canonicalUrl: 'https://laxmienterprises.in/services/joinery-furnishings',
    category: 'service',
    seoTitle: 'Architectural Joinery & Furnishings | Laxmi Enterprises',
    primaryHeading: 'Executive Millwork & Joinery'
  },
  {
    id: 'service-acoustics-partitions',
    path: '/services/acoustics-partitions',
    filePath: 'services/acoustics-partitions/index.html',
    canonicalUrl: 'https://laxmienterprises.in/services/acoustics-partitions',
    category: 'service',
    seoTitle: 'Acoustic Panelling & Partitions | Laxmi Enterprises',
    primaryHeading: 'Acoustic Panelling & Partitions'
  },
  {
    id: 'service-workstations-facilities',
    path: '/services/workstations-facilities',
    filePath: 'services/workstations-facilities/index.html',
    canonicalUrl: 'https://laxmienterprises.in/services/workstations-facilities',
    category: 'service',
    seoTitle: 'Workstations & Critical Facilities | Laxmi Enterprises',
    primaryHeading: 'Workstations & Facilities'
  },
  {
    id: 'project-4life-andheri',
    path: '/projects/4life-andheri',
    filePath: 'projects/4life-andheri/index.html',
    canonicalUrl: 'https://laxmienterprises.in/projects/4life-andheri',
    category: 'project',
    seoTitle: '4Life Corporate Office & Healthcare Facility | Laxmi Enterprises',
    primaryHeading: '4Life Corporate Office & Healthcare Facility'
  },
  {
    id: 'project-boardroom-conference-suites',
    path: '/projects/boardroom-conference-suites',
    filePath: 'projects/boardroom-conference-suites/index.html',
    canonicalUrl: 'https://laxmienterprises.in/projects/boardroom-conference-suites',
    category: 'project',
    seoTitle: 'Corporate Boardroom & Conference Suites | Laxmi Enterprises',
    primaryHeading: 'Corporate Boardroom & Conference Suites'
  },
  {
    id: 'project-acoustic-panelling-partitions',
    path: '/projects/acoustic-panelling-partitions',
    filePath: 'projects/acoustic-panelling-partitions/index.html',
    canonicalUrl: 'https://laxmienterprises.in/projects/acoustic-panelling-partitions',
    category: 'project',
    seoTitle: 'Acoustic Panelling & Demountable Partitions | Laxmi Enterprises',
    primaryHeading: 'Acoustic Panelling & Demountable Partitions'
  },
  {
    id: 'project-reception-lobby-displays',
    path: '/projects/reception-lobby-displays',
    filePath: 'projects/reception-lobby-displays/index.html',
    canonicalUrl: 'https://laxmienterprises.in/projects/reception-lobby-displays',
    category: 'project',
    seoTitle: 'Reception Lobby & Brand Displays | Laxmi Enterprises',
    primaryHeading: 'Reception Lobby & Brand Displays'
  },
  {
    id: 'project-executive-director-cabins',
    path: '/projects/executive-director-cabins',
    filePath: 'projects/executive-director-cabins/index.html',
    canonicalUrl: 'https://laxmienterprises.in/projects/executive-director-cabins',
    category: 'project',
    seoTitle: 'Executive Director Cabins & Veneer Joinery | Laxmi Enterprises',
    primaryHeading: 'Executive Director Cabins & Veneer Joinery'
  },
  {
    id: 'project-modular-workstation-deployment',
    path: '/projects/modular-workstation-deployment',
    filePath: 'projects/modular-workstation-deployment/index.html',
    canonicalUrl: 'https://laxmienterprises.in/projects/modular-workstation-deployment',
    category: 'project',
    seoTitle: 'Modular Workstation Deployment | Laxmi Enterprises',
    primaryHeading: 'Modular Workstation Deployment & Floor Handover'
  },
  {
    id: 'contact',
    path: '/contact',
    filePath: 'contact/index.html',
    canonicalUrl: 'https://laxmienterprises.in/contact',
    category: 'core',
    seoTitle: 'Contact | Laxmi Enterprises',
    primaryHeading: 'Contact Us'
  }
];

export const LEGACY_REDIRECTS = [
  {
    from: '/services/kitchens',
    to: '/services/turnkey-interiors',
    status: 301,
    category: 'service'
  },
  {
    from: '/services/bathrooms',
    to: '/services/hospitality-healthcare',
    status: 301,
    category: 'service'
  },
  {
    from: '/services/furniture',
    to: '/services/joinery-furnishings',
    status: 301,
    category: 'service'
  },
  {
    from: '/services/flooring',
    to: '/services/acoustics-partitions',
    status: 301,
    category: 'service'
  },
  {
    from: '/services/buildings',
    to: '/services/workstations-facilities',
    status: 301,
    category: 'service'
  },
  {
    from: '/projects/light-pine-kitchen',
    to: '/projects/boardroom-conference-suites',
    status: 301,
    category: 'project'
  },
  {
    from: '/projects/airy-apartment',
    to: '/projects/acoustic-panelling-partitions',
    status: 301,
    category: 'project'
  },
  {
    from: '/projects/modern-kitchen',
    to: '/projects/reception-lobby-displays',
    status: 301,
    category: 'project'
  },
  {
    from: '/projects/hamptons-manor-house',
    to: '/projects/executive-director-cabins',
    status: 301,
    category: 'project'
  },
  {
    from: '/projects/dark-oak-kitchen',
    to: '/projects/modular-workstation-deployment',
    status: 301,
    category: 'project'
  }
];

export const DELETED_ROUTES = [
  { path: '/template-help/licences', expectedStatus: 404 },
  { path: '/template-help/changelog', expectedStatus: 404 },
  { path: '/icons-showcase.html', expectedStatus: 404 },
  { path: '/public/icons-showcase.html', expectedStatus: 404 }
];

export const UTILITY_ROUTES = [
  { path: '/401.html', filePath: '401.html', expectedStatus: 200 },
  { path: '/404.html', filePath: '404.html', expectedStatus: 200 }
];

export const CANONICAL_PATHS = CANONICAL_ROUTES.map(r => r.path);
export const LEGACY_PATHS = LEGACY_REDIRECTS.map(r => r.from);
export const REDIRECT_MAP = new Map(LEGACY_REDIRECTS.map(r => [r.from, r.to]));
