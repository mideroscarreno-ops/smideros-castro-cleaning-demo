export type RouteId =
  | 'home'
  | 'services'
  | 'industries'
  | 'approach'
  | 'areas'
  | 'faq'
  | 'walkthrough'
  | 'quote'
  | 'about'
  | 'contact';

export const BRAND_INFO = {
  name: 'Castro Cleaning',
  positioning: 'Professional Cleaning. Built Around Your Business.',
  email: 'info@CastroCleaningOK.com',
  phone: '(405) 254-6117',
  phoneHref: 'tel:+14052546117',
  region: 'Oklahoma City Metropolitan Area, Oklahoma',
  disclosure: 'Independent website redesign concept by S.Mideros Agency.',
  originalUrl: 'https://www.castrocleaningok.com/',
};

export const IMAGES = {
  heroLobby: '/images/hero-commercial-lobby.webp',
  officeBoardroom: '/images/service-office-boardroom.webp',
  floorCare: '/images/service-floor-care.webp',
  facilityReception: '/images/service-facility-reception.webp',
};

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  summary: string;
  scopePoints: string[];
  image: string;
  imageAlt: string;
}

export const COMMERCIAL_SERVICES: ServiceItem[] = [
  {
    id: 'recurring-commercial',
    index: '01',
    title: 'Recurring Commercial & Janitorial Cleaning',
    summary:
      'Scheduled daily, weekly, or multi-day janitorial upkeep built around your building hours, tenant occupancy, and daily operational rhythm.',
    scopePoints: [
      'Trash collection, liner replacement, and recycling coordination',
      'Lobby, entryway, and high-touch point surface maintenance',
      'Consistent checklists tailored to your facility layout',
    ],
    image: IMAGES.heroLobby,
    imageAlt: 'Bright contemporary commercial lobby atrium with maintained stone flooring',
  },
  {
    id: 'office-cleaning',
    index: '02',
    title: 'Corporate & Office Cleaning',
    summary:
      'Focused maintenance for executive suites, open workstations, glass-walled conference rooms, and employee breakrooms.',
    scopePoints: [
      'Workstation dusting, conference table care, and interior glass detailing',
      'Breakroom counters, sinks, and shared appliance exterior cleaning',
      'Discreet after-hours or daytime service coordination',
    ],
    image: IMAGES.officeBoardroom,
    imageAlt: 'Clean glass-walled corporate conference room with oak table and spotless carpet',
  },
  {
    id: 'floor-care',
    index: '03',
    title: 'Specialized Commercial Floor Care',
    summary:
      'Dedicated hard-surface and carpet maintenance programs designed to protect high-traffic corridors, lobbies, and commercial flooring investments.',
    scopePoints: [
      'Floor stripping, waxing, and high-speed buffing for hard surfaces',
      'Commercial carpet care and high-traffic lane maintenance',
      'Surface-specific care for tile, vinyl, stone, terrazzo, and concrete',
    ],
    image: IMAGES.floorCare,
    imageAlt: 'Polished commercial building hallway demonstrating consistent hard-surface floor care',
  },
  {
    id: 'restroom-common',
    index: '04',
    title: 'Restroom & Common-Area Sanitization',
    summary:
      'Thorough upkeep of shared restrooms, corridors, elevators, and reception lounges where employee and visitor impressions are formed.',
    scopePoints: [
      'Fixtures, partitions, mirrors, and high-contact hardware care',
      'Consumable restocking coordination based on your supply preferences',
      'Odor control and consistent floor sanitation in wet areas',
    ],
    image: IMAGES.facilityReception,
    imageAlt: 'Spotless modern commercial reception pavilion and common corridor',
  },
  {
    id: 'window-washing',
    index: '05',
    title: 'Window Washing & Glass Maintenance',
    summary:
      'Clear interior glass partitions, storefront glazing, and accessible commercial window care to keep daylight-filled spaces sharp.',
    scopePoints: [
      'Entry door glass, sidelights, and lobby partition detailing',
      'Interior conference room glass smudge and fingerprint removal',
      'Scheduled exterior ground-level glass upkeep where applicable',
    ],
    image: IMAGES.officeBoardroom,
    imageAlt: 'Floor-to-ceiling commercial office glazing with streak-free clarity',
  },
  {
    id: 'turnover-construction',
    index: '06',
    title: 'Post-Construction & Facility Turnover Cleanup',
    summary:
      'Detailed commercial cleanup following tenant build-outs, interior renovations, or space transitions before staff and clients move in.',
    scopePoints: [
      'Fine dust removal across ledges, fixtures, trim, and cabinetry',
      'Initial floor preparation, glass detailing, and debris clearing',
      'Pre-occupancy readiness walkthrough coordination',
    ],
    image: IMAGES.floorCare,
    imageAlt: 'Clean newly finished commercial interior corridor prepared for occupancy',
  },
];

export interface IndustryItem {
  id: string;
  name: string;
  shortLabel: string;
  headline: string;
  description: string;
  considerations: string[];
  image: string;
  imageAlt: string;
}

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: 'corporate-offices',
    name: 'Corporate Offices',
    shortLabel: 'Corporate Offices',
    headline: 'Consistent presentation across workspaces, lobbies, and boardrooms.',
    description:
      'Multi-tenant buildings, regional headquarters, and professional service offices require dependable routines that respect confidential workspaces and keep shared spaces client-ready.',
    considerations: [
      'Reception areas, conference suites, and interior glass partitions',
      'Breakrooms, kitchens, and shared collaboration zones',
      'After-hours scheduling aligned with building security access',
    ],
    image: IMAGES.officeBoardroom,
    imageAlt: 'Clean modern corporate boardroom and executive workspace',
  },
  {
    id: 'medical-healthcare',
    name: 'Medical & Healthcare',
    shortLabel: 'Medical & Healthcare',
    headline: 'Attentive commercial care for clinics, dental offices, and outpatient spaces.',
    description:
      'Patient-facing waiting rooms, administrative desks, and shared restrooms demand careful surface attention, clear scope definition, and reliable execution aligned with facility instructions.',
    considerations: [
      'Waiting rooms, reception counters, and patient restroom upkeep',
      'Detailed high-touch surface routines per facility guidelines',
      'Coordinated schedules around clinic hours and staff workflows',
    ],
    image: IMAGES.facilityReception,
    imageAlt: 'Spotless outpatient medical and healthcare facility reception area',
  },
  {
    id: 'education-schools',
    name: 'Education & Schools',
    shortLabel: 'Education & Schools',
    headline: 'Structured maintenance built for high daily foot traffic.',
    description:
      'Classrooms, hallways, administrative offices, and gymnasium or auditorium common areas experience heavy daily wear that calls for disciplined floor care and recurring cleaning.',
    considerations: [
      'High-traffic corridors, lockers, and multi-stall restrooms',
      'Desk surfaces, cafeterias, and shared faculty lounges',
      'Seasonal deep floor care and summer or break-period refreshes',
    ],
    image: IMAGES.floorCare,
    imageAlt: 'Clean modern educational or institutional building corridor',
  },
  {
    id: 'banks-financial',
    name: 'Banks & Financial Institutions',
    shortLabel: 'Banks & Financial',
    headline: 'Discreet, detail-oriented care for branch lobbies and advisory suites.',
    description:
      'Financial institutions rely on immaculate first impressions, clean teller lines, smudge-free glass, and trustworthy coordination around restricted zones.',
    considerations: [
      'Client lobbies, consultation rooms, and teller counter glass',
      'Carpeted executive areas and hard-surface vestibule entries',
      'Scheduled evening routines aligned with branch closing procedures',
    ],
    image: IMAGES.heroLobby,
    imageAlt: 'Architectural bank or corporate lobby with clean stone flooring',
  },
  {
    id: 'industrial-manufacturing',
    name: 'Industrial & Manufacturing',
    shortLabel: 'Industrial & Mfg.',
    headline: 'Practical cleaning support for front offices, break areas, and plant corridors.',
    description:
      'Manufacturing facilities, distribution hubs, and warehouses balance rugged operational floors with administrative offices, locker rooms, and employee break spaces.',
    considerations: [
      'Administrative offices, dispatch desks, and conference rooms',
      'Employee locker rooms, restrooms, and high-use breakrooms',
      'Entryways bridging production floors and office corridors',
    ],
    image: IMAGES.floorCare,
    imageAlt: 'Clean commercial corridor connecting operational and office suites',
  },
  {
    id: 'retail',
    name: 'Retail',
    shortLabel: 'Retail',
    headline: 'Floor brilliance and storefront clarity before doors open.',
    description:
      'Showrooms, commercial retail centers, and customer-facing storefronts depend on spotless entrance glass, clean fitting or display zones, and well-maintained floors.',
    considerations: [
      'Storefront glass, entry mats, and point-of-sale counters',
      'Polished concrete, tile, or luxury vinyl floor maintenance',
      'Early-morning or post-closing schedules ahead of customer hours',
    ],
    image: IMAGES.heroLobby,
    imageAlt: 'Bright glass-fronted commercial entrance and polished flooring',
  },
  {
    id: 'hospitality-hotels',
    name: 'Hospitality & Hotels',
    shortLabel: 'Hospitality & Hotels',
    headline: 'Elevated public-area standards for guest lobbies and event spaces.',
    description:
      'Hospitality properties require crisp presentation across check-in lobbies, corridors, meeting rooms, fitness areas, and public restrooms.',
    considerations: [
      'Lobby hard floors, glass entry doors, and public restrooms',
      'Meeting rooms, business centers, and pre-function corridors',
      'Consistent schedule coordination during peak occupancy periods',
    ],
    image: IMAGES.facilityReception,
    imageAlt: 'Refined hospitality reception lounge with natural stone surfaces',
  },
  {
    id: 'religious-facilities',
    name: 'Religious Facilities',
    shortLabel: 'Religious Facilities',
    headline: 'Respectful care for sanctuaries, fellowship halls, and classrooms.',
    description:
      'Places of worship host weekly gatherings, youth classrooms, administrative offices, and community events—requiring flexible cleaning built around varied calendars.',
    considerations: [
      'Sanctuary seating areas, foyers, and multi-purpose halls',
      'Nursery, classroom, and restroom preparation before services',
      'Adaptable frequency for mid-week and weekend programming',
    ],
    image: IMAGES.facilityReception,
    imageAlt: 'Serene sunlit institutional foyer and common gathering hall',
  },
  {
    id: 'government-facilities',
    name: 'Government Facilities',
    shortLabel: 'Government Facilities',
    headline: 'Dependable, structured upkeep for municipal and civic properties.',
    description:
      'Public-facing administrative buildings, civic offices, and community centers benefit from clear scope documentation and reliable daily or weekly routines.',
    considerations: [
      'Public service counters, lobbies, and shared corridors',
      'High-capacity public restrooms and staff workspaces',
      'Clear communication and facility-specific schedule adherence',
    ],
    image: IMAGES.officeBoardroom,
    imageAlt: 'Structured civic or institutional conference room interior',
  },
  {
    id: 'other-commercial',
    name: 'Other Commercial Properties',
    shortLabel: 'Other Properties',
    headline: 'Custom scopes for mixed-use buildings, studios, and specialty venues.',
    description:
      'Every commercial property operates differently. Whether you manage a multi-tenant building, showroom, or specialty workspace, plans are scoped directly around your space.',
    considerations: [
      'Custom walk-through assessment of floor plans and surfaces',
      'Flexible frequency from once-weekly to multi-day coverage',
      'Direct coordination on supplies, keys, and priority zones',
    ],
    image: IMAGES.heroLobby,
    imageAlt: 'Contemporary multi-tenant commercial building atrium',
  },
];

export const FACILITY_VARIATION_FACTORS = [
  {
    title: 'Foot Traffic',
    detail: 'High-volume lobbies and public corridors require different cadence than private executive suites.',
  },
  {
    title: 'Operating Schedules',
    detail: 'Daytime, evening, or weekend windows planned around tenant and staff occupancy.',
  },
  {
    title: 'Flooring Surfaces',
    detail: 'Carpet, VCT, terrazzo, sealed concrete, tile, and wood each require proper care methods.',
  },
  {
    title: 'Cleaning Frequency',
    detail: 'Daily, multiple times weekly, weekly, or periodic specialty service.',
  },
  {
    title: 'Supplies Coordination',
    detail: 'Options to work with client-supplied consumables or coordinate cleaning supplies.',
  },
  {
    title: 'Facility Size & Layout',
    detail: 'Scoping based on square footage, restroom count, breakrooms, and glass partitions.',
  },
  {
    title: 'Specialized Requirements',
    detail: 'Access instructions, priority zones, and building-specific preferences.',
  },
];

export const APPROACH_STAGES = [
  {
    step: '01',
    title: 'Understand Your Facility',
    description:
      'We start by learning about your property type, industry context, approximate square footage, flooring mix, and priority spaces across your building.',
    points: [
      'Review property layout and primary traffic zones',
      'Identify surface types and any special access notes',
      'Coordinate an optional on-site walkthrough when helpful',
    ],
  },
  {
    step: '02',
    title: 'Define Your Cleaning Requirements',
    description:
      'Together we align on cleaning frequency, preferred operating hours, restroom and common-area focus, and how supplies and consumables should be handled.',
    points: [
      'Establish preferred cleaning days and timing windows',
      'Clarify recurring tasks versus periodic floor or glass care',
      'Document expectations clearly for consistent execution',
    ],
  },
  {
    step: '03',
    title: 'Coordinate a Cleaning Plan',
    description:
      'Castro Cleaning prepares a tailored commercial proposal and confirms scheduling, start logistics, and ongoing communication channels directly with your team.',
    points: [
      'Review a clear scope tailored to your facility demands',
      'Confirm service availability for your OKC metro location',
      'Establish direct point-of-contact communication moving forward',
    ],
  },
];

export const STANDARD_OF_CARE_PILLARS = [
  {
    index: '01',
    title: 'Dependable Processes',
    body: 'Structured facility checklists and predictable routines ensure high-priority areas receive consistent attention every visit.',
  },
  {
    index: '02',
    title: 'Skilled Cleaning Professionals',
    body: 'Trained commercial cleaning teams equipped for offices, common areas, restrooms, and commercial floor surfaces.',
  },
  {
    index: '03',
    title: 'Service Consistency',
    body: 'Attention to detail that extends beyond the first week—maintaining lobbies, glass, and floors week after week.',
  },
  {
    index: '04',
    title: 'Customized Cleaning Needs',
    body: 'Every scope reflects your building’s actual traffic, schedule, and surface requirements rather than a rigid template.',
  },
  {
    index: '05',
    title: 'Clear Communication',
    body: 'Direct local responsiveness from inquiry through ongoing service coordination, including customer portal support.',
  },
];

export interface ServiceAreaCity {
  city: string;
  zips: string[];
  note: string;
}

export const CONFIRMED_SERVICE_AREAS: ServiceAreaCity[] = [
  {
    city: 'Oklahoma City',
    zips: ['73101', '73102', '73103', '73104', '73105', '73106', '73107', '73108', '73109', '73110', '73111', '73112', '73114', '73116', '73118', '73120', '73127', '73132', '73134', '73139', '73142', '73159', '73162', '73170'],
    note: 'Downtown, Midtown, Bricktown, Northwest & South OKC business corridors',
  },
  {
    city: 'Edmond',
    zips: ['73003', '73012', '73013', '73025', '73034'],
    note: 'North metro corporate offices, medical clinics, and retail centers',
  },
  {
    city: 'Yukon',
    zips: ['73085', '73099'],
    note: 'West metro commercial properties, offices, and community facilities',
  },
  {
    city: 'Mustang',
    zips: ['73064'],
    note: 'Southwest metro businesses, retail suites, and educational spaces',
  },
  {
    city: 'Moore',
    zips: ['73160', '73165', '73170'],
    note: 'I-35 corridor commercial buildings, offices, and clinics',
  },
  {
    city: 'Norman',
    zips: ['73019', '73026', '73069', '73071', '73072'],
    note: 'South metro corporate offices, educational venues, and retail spaces',
  },
  {
    city: 'Midwest City',
    zips: ['73110', '73130', '73141'],
    note: 'East metro commercial, industrial, and office properties',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'business-types',
    question: 'What types of businesses can inquire?',
    answer:
      'Castro Cleaning serves commercial properties across the Oklahoma City metro, including corporate offices, medical and healthcare facilities, schools and educational institutions, banks and financial offices, industrial and manufacturing sites, retail locations, hospitality properties, religious facilities, government buildings, and other commercial spaces.',
  },
  {
    id: 'customized-plans',
    question: 'How are cleaning plans customized?',
    answer:
      'Each plan is tailored to your building’s layout, industry requirements, flooring types, operating schedule, supply preferences, and priority areas. Rather than applying a one-size-fits-all checklist, scope details are aligned with how your facility actually operates.',
  },
  {
    id: 'frequency-factors',
    question: 'What affects cleaning frequency?',
    answer:
      'Recommended frequency depends on daily foot traffic, headcount or visitor volume, number of restrooms and breakrooms, flooring materials, and operational hours. Facilities may coordinate daily service, multiple visits per week, weekly upkeep, or periodic specialized floor care.',
  },
  {
    id: 'walkthrough',
    question: 'Can a facility request a walkthrough?',
    answer:
      'Yes. You can request an on-site walkthrough to review your property layout, flooring, access requirements, and specific cleaning goals directly with Castro Cleaning. Walkthrough dates and times are coordinated directly with the company rather than automatically booked.',
  },
  {
    id: 'quote-preparation',
    question: 'How are quotes prepared?',
    answer:
      'Quotes are prepared based on the facility details you share—such as industry, approximate square footage, cleaning frequency, preferred hours, flooring types, and requested services—along with walkthrough findings when applicable. Pricing is confirmed directly with Castro Cleaning rather than generated via a generic formula.',
  },
  {
    id: 'supplies',
    question: 'Are cleaning supplies included?',
    answer:
      'Cleaning supplies and consumable restocking preferences can be discussed during your quote or walkthrough. You can note whether you prefer the team to provide supplies, coordinate restocking, or work with client-provided products.',
  },
  {
    id: 'insurance',
    question: 'How is insurance information confirmed?',
    answer:
      'Specific insurance coverage documentation and policy details are not published online and can be requested and confirmed directly with Castro Cleaning by contacting info@CastroCleaningOK.com or calling (405) 254-6117 during your consultation.',
  },
  {
    id: 'service-areas',
    question: 'Which areas are served?',
    answer:
      'Castro Cleaning serves commercial facilities across the Oklahoma City metropolitan area, including Oklahoma City, Edmond, Yukon, Mustang, Moore, Norman, Midwest City, and surrounding metro communities. Exact service availability is confirmed for each individual facility.',
  },
];
