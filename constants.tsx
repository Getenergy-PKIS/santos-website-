import React from 'react';
import { Division, Program, DonationTarget } from './types';

export const DIVISIONS: Division[] = [
  {
    id: 'socbd',
    slug: 'socbd',
    shortName: 'SOBCD',
    name: 'Strategic Operations & Business Compliance Division',
    mandate: 'Governance, compliance, policy enforcement, and institutional accountability.',
    icon: 'shield-check',
    color: 'bg-blue-600',
    responsibilities: [
      'Corporate governance and compliance systems',
      'Policies, SOPs, ethics, and risk management',
      'Audit coordination and reporting',
      'Data protection (GDPR / NDPR) alignment',
      'Board coordination, documentation, and institutional reporting'
    ],
    howItShowsUp: [
      'Transparency reports published quarterly on the portal',
      'Institutional KYC and compliance badges for chapters',
      'Automated policy acknowledgment for new members',
      'Real-time risk management dashboards for leadership'
    ],
    ctas: [
      { label: 'View Governance & Policies', path: '/resources/policies' },
      { label: 'Contact Governance Desk', path: '/support' }
    ]
  },
  {
    id: 'tdsd',
    slug: 'tdsd',
    shortName: 'TDSD',
    name: 'Technology & Digital Services Division',
    mandate: 'Designs, builds, secures, and maintains SCEF’s integrated digital ecosystem.',
    icon: 'cpu',
    color: 'bg-indigo-600',
    responsibilities: [
      'SCEF HQ website + all microsites + chapter microsites',
      'Central database (CENTRA) + Super Admin system',
      'User authentication + role-based dashboards',
      'API integrations, security, and system monitoring',
      'Wallet integration (GFA Wallet + AGC)',
      'Analytics dashboards and reporting infrastructure'
    ],
    howItShowsUp: [
      'Single-sign-on (SSO) across all SCEF digital platforms',
      'Live impact counters and real-time ledger visibility',
      'Support ticket system for technical assistance',
      'Automated deployment of chapter microsites'
    ],
    ctas: [
      { label: 'Dashboard Login', path: '/dashboard-login' },
      { label: 'Platform Docs', path: '/resources/toolkits' }
    ]
  },
  {
    id: 'ombdd',
    slug: 'ombdd',
    shortName: 'OMBDD',
    name: 'Online Media Business Development Division (OMBDD)',
    mandate: 'Drives online growth, digital engagement, marketing, fundraising support, and business development.',
    icon: 'trending-up',
    color: 'bg-emerald-600',
    responsibilities: [
      'Digital marketing, growth campaigns, and community engagement',
      'Partnership outreach support (CSR, sponsors, donors, affiliates)',
      'Fundraising communications and conversion tracking',
      'Volunteer marketing teams and online coordination',
      'Brand communications and media-business development coordination'
    ],
    howItShowsUp: [
      'Active social media advocacy and community growth campaigns',
      'Fundraising goals tracking on the main website',
      'Partnership portals for corporate CSR engagement',
      'Ambassador-led digital mobilization toolkits'
    ],
    ctas: [
      { label: 'Join as Ambassador', path: '/membership/ambassador/apply' },
      { label: 'Fundraising Portal', path: '/eduaid' }
    ]
  },
  {
    id: 'scef-media',
    slug: 'santos-media',
    shortName: 'Santos Media',
    name: 'Santos Media Division',
    mandate: 'Official media, broadcast, advocacy storytelling, and production arm of SCEF.',
    icon: 'clapperboard',
    color: 'bg-rose-600',
    responsibilities: [
      'Media production and distribution (video, audio, documentary, live)',
      'Advocacy storytelling and impact narratives',
      'Presenter and media volunteer training',
      'Broadcast operations and channel growth strategy',
      'Coverage of chapters, programs, events, and awards'
    ],
    howItShowsUp: [
      'Live broadcasts on NESA Africa TV and It’s In Me Radio',
      'Documentary impact stories featured on the Media Hub',
      'Virtual webinar series and educational content production',
      'Photo and video galleries from local chapter activities'
    ],
    platforms: [
      'NESA Africa TV',
      'It’s In Me Radio',
      'EduAid-Africa Webinar Series',
      'EduAid-Africa Education Tourism Show',
      'Media Gallery & Impact Stories'
    ],
    ctas: [
      { label: 'Watch NESA TV', path: '/media' },
      { label: 'Submit Media', path: '/media' }
    ]
  },
  {
    id: 'lcs',
    slug: 'lcs',
    shortName: 'LCS',
    name: 'Local Chapter Services Division',
    mandate: 'Coordinates, governs, and supports all SCEF Local Chapters (online, hybrid, physical).',
    icon: 'users',
    color: 'bg-amber-600',
    responsibilities: [
      'Chapter onboarding, approval, and activation',
      'Country → State → City directory structure',
      'Chapter reporting, compliance, and performance tracking',
      'Chapter fundraising and wallet oversight',
      'Ambassador and membership tracking at chapter level',
      'Chapter capacity building and governance alignment'
    ],
    howItShowsUp: [
      'Global directory of chapters with localized map view',
      'Chapter-specific dashboards for leaders and members',
      'Onboarding wizard for new chapter applications',
      'Community forums and localized resource hubs'
    ],
    ctas: [
      { label: 'Browse Chapters', path: '/local-chapters' },
      { label: 'Start a Chapter', path: '/local-chapters/start-online' }
    ]
  }
];

export const PROGRAMS: Program[] = [
  { id: 'p1', slug: 'nesa', name: 'NESA-Africa', description: 'National Education Support Awards Africa.', impactGoal: 'Recognizing excellence in education.', status: 'active', externalUrl: 'https://nesa.africa' },
  { id: 'p2', slug: 'eduaid', name: 'EduAid-Africa', description: 'Educational aid and relief for underprivileged regions.', impactGoal: 'Direct resource provision.', status: 'active', externalUrl: 'https://eduaid.africa' },
  { id: 'p3', slug: 'rmsa', name: 'Rebuild My School Africa', description: 'Infrastructural support for schools in need.', impactGoal: 'Renovating 500 schools by 2030.', status: 'active', externalUrl: 'https://rmsa.africa' },
  { id: 'p4', slug: 'eoa', name: 'Education Online Africa', description: 'Digital learning platforms and internet access.', impactGoal: 'Bridging the digital divide.', status: 'active', externalUrl: 'https://eoa.africa' },
  { id: 'p5', slug: 'elibrary', name: 'eLibrary Nigeria', description: 'Centralized digital library for Nigerian students.', impactGoal: 'Access to 1M+ titles.', status: 'active', externalUrl: 'https://elibrarynigeria.ng' },
  { id: 'p6', slug: 'women-girls', name: 'Women & Girls Education', description: 'Focused support for female educational attainment.', impactGoal: 'Empowering 100k girls.', status: 'active' },
  { id: 'p7', slug: 'special-needs', name: 'Special Needs Education Support', description: 'Support for inclusive education.', impactGoal: 'Inclusive classrooms for all.', status: 'active' },
  { id: 'p8', slug: 'census', name: 'Census Advocacy', description: 'Education data collection and policy advocacy.', impactGoal: 'Accurate data for funding.', status: 'active' },
  { id: 'p9', slug: 'education-tourism', name: 'Education Tourism', description: 'Educational travel and cultural exchange.', impactGoal: 'Broadening student horizons.', status: 'active' },
  { id: 'p10', slug: 'my-career-my-life', name: 'My Career My Life', description: 'Vocational training and career guidance.', impactGoal: 'Bridging study and work.', status: 'active' }
];

export const GOVERNANCE_STATEMENT = "SCEF operates through five core divisions—SOBCD, TDSD, OMBDD, Santos Media, and Local Chapter Services—uniting governance, technology, online growth, media advocacy, and chapter coordination into one membership-run education impact ecosystem.";

export const EXCHANGE_RATES = {
  AGC_TO_USD: 1.0,
  USD_TO_NGN: 1500.0,
};

export const DONATION_TARGETS: DonationTarget[] = [
  { id: 'hq', name: 'SCEF Headquarters', type: 'HQ' },
  { id: 'prog-nesa', name: 'NESA-Africa Program', type: 'PROGRAM' },
  { id: 'prog-eduaid', name: 'EduAid-Africa Program', type: 'PROGRAM' },
  { id: 'ch-accra', name: 'Accra Chapter', type: 'CHAPTER', location: 'Ghana' },
  { id: 'ch-lagos', name: 'Lagos Chapter', type: 'CHAPTER', location: 'Nigeria' },
  { id: 'ch-london', name: 'London Chapter', type: 'CHAPTER', location: 'United Kingdom' },
];