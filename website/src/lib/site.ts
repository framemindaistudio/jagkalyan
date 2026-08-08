/**
 * Single source of truth for JagKalyan Holistic Mission.
 *
 * Everything — navigation, page headers, the Coming Soon stub generator, the
 * footer, the sitemap — reads from this file. When a module gets built for
 * real, flip its `status` from "soon" to "live" and add the route; nothing
 * else needs to change.
 *
 * Content transcribed from the client's own submitted material (the ecosystem
 * infographics, the site architecture tree, and the founder journey).
 */

export type ModuleStatus = "live" | "soon";

export interface NavChild {
  label: string;
  href: string;
  status: ModuleStatus;
  blurb?: string;
}

export interface NavSection {
  label: string;
  href: string;
  status: ModuleStatus;
  /** Shown in the primary navigation bar. */
  primary?: boolean;
  blurb?: string;
  children?: NavChild[];
}

export const SITE = {
  name: "JagKalyan Holistic Mission",
  shortName: "JagKalyan",
  domain: "jagkalyan.com",
  url: "https://jagkalyan.com",
  sanskrit: "॥ सर्वे भवन्तु सुखिनः ॥",
  sanskritMeaning: "May all beings be happy",
  tagline: "For Humanity · Nature · Universal Well-being",
  creed: "One Humanity · One Planet · Universal Well-being",
  closing: "Together We Serve · Together We Grow · Together We Transform",
  vision:
    "Integrating Spirituality, Consciousness, Science, Nature, Sustainability and Compassion to create a peaceful, prosperous and enlightened world.",
  founder: {
    name: "Dr. Jagdish Kalyandurgmath",
    title: "Founder · JagKalyan Holistic Coach",
    creed: "Positive Thoughts Create Positive Outcomes",
    mantra: "Remain Positive · Stay Grateful · Trust the Process",
  },
} as const;

/* ------------------------------------------------------------------
   The four pillars — the spine of the whole mission.
   These orbit the Earth on the homepage.
   ------------------------------------------------------------------ */

export interface Pillar {
  id: string;
  title: string;
  sub: string;
  body: string;
  /** Position on the orbit, in degrees, 0 = top. */
  angle: number;
  accent: "gold" | "verdant" | "azure" | "violet";
}

export const PILLARS: Pillar[] = [
  {
    id: "build-self",
    title: "Build Self",
    sub: "Physical · Mental · Emotional · Spiritual",
    body: "Self-awareness, discipline, character and continuous growth. Financial and inner well-being as one practice, not two.",
    angle: 180,
    accent: "gold",
  },
  {
    id: "build-society",
    title: "Build Society",
    sub: "Family · Community · Compassion",
    body: "Strong families, empowered communities and compassionate leadership. Happy, value-based homes as the unit of a healthy world.",
    angle: 90,
    accent: "verdant",
  },
  {
    id: "build-nation",
    title: "Build Nation",
    sub: "Education · Innovation · Ethical Leadership",
    body: "Ethical institutions, innovation and sustainable development. Opportunity for all, built on a foundation of integrity.",
    angle: 270,
    accent: "azure",
  },
  {
    id: "build-humanity",
    title: "Build Humanity",
    sub: "Peace · Sustainability · Shared Prosperity",
    body: "Global unity, peace, service and collective well-being. A compassionate world that holds every being and the planet itself.",
    angle: 0,
    accent: "violet",
  },
];

/* ------------------------------------------------------------------
   The Holistic Four and the Global Four.
   ------------------------------------------------------------------ */

export interface Dimension {
  title: string;
  body: string;
}

export const HOLISTIC: Dimension[] = [
  { title: "Holistic Education", body: "Value based, future ready." },
  { title: "Holistic Wellness", body: "Body, mind, emotions, spirit in balance." },
  { title: "Holistic Welfare", body: "Care, support and dignity for all." },
  { title: "Holistic Wealth", body: "Ethical, sustainable, shared prosperity." },
];

export const GLOBAL: Dimension[] = [
  { title: "Global Citizens", body: "Responsible, empathetic, engaged." },
  { title: "Global Unity", body: "Cooperation, respect, solidarity." },
  { title: "Global Sustainability", body: "Protect Earth, preserve the future." },
  { title: "Global Harmony", body: "Peace, love, coexistence." },
];

/* ------------------------------------------------------------------
   Founder journey — 1967 to 2026.
   Build Self → Build Family → Build Society → Build Organisations →
   Nation Building → Humanity Building.
   ------------------------------------------------------------------ */

export interface JourneyStop {
  years: string;
  name: string;
  note: string;
  chapter: "self" | "society" | "nation" | "humanity";
}

export const JOURNEY: JourneyStop[] = [
  { years: "1967–1974", name: "VVHSS", note: "Foundation · Building Self", chapter: "self" },
  { years: "1974–76", name: "GASCG", note: "Education, Values & Discipline", chapter: "self" },
  { years: "1975–81", name: "PDACE", note: "Engineering Knowledge Foundation", chapter: "self" },
  { years: "1982–84", name: "IIT Bombay", note: "Advanced Learning & Excellence", chapter: "self" },
  { years: "1984–97", name: "ISRO NNRMS", note: "Research, Innovation & Nation Service", chapter: "nation" },
  { years: "1997–2000", name: "ESRI India", note: "GIS Solutions & Technology Leadership", chapter: "nation" },
  { years: "2000–2010", name: "Reliance Group of Companies", note: "Corporate Growth & Excellence", chapter: "nation" },
  { years: "2003–", name: "JK Institute (JKITM)", note: "Education, Leadership & Mentoring", chapter: "society" },
  { years: "2008–", name: "JagKalyan Trust", note: "Social Service, Education & Empowerment", chapter: "society" },
  { years: "2008–", name: "Jankalyan Trust", note: "Community Development & Welfare", chapter: "society" },
  { years: "2008–", name: "Shree Nandi School", note: "Value Based Education for Children", chapter: "society" },
  { years: "2016–2019", name: "School of Built Environment", note: "Sustainability Research", chapter: "nation" },
  { years: "2020", name: "MobilePe Fintech", note: "Financial Inclusion Technology", chapter: "nation" },
  { years: "2020", name: "MobilePe E-commerce", note: "Digital Commerce Solutions", chapter: "nation" },
  { years: "2021", name: "Soul Temple", note: "Spiritual Wellness & Inner Growth", chapter: "humanity" },
  { years: "2022", name: "KC Space Academy", note: "Space & STEM Education Innovation", chapter: "humanity" },
  { years: "2026", name: "JagKalyan Tarak Gurukul", note: "Holistic University · Humanity Mission", chapter: "humanity" },
];

/* ------------------------------------------------------------------
   The ecosystem.
   ------------------------------------------------------------------ */

export interface Entity {
  name: string;
  year?: string;
  role: string;
}

export const ENTITIES: Entity[] = [
  { name: "JK Institute JKITM", year: "2003", role: "Education Excellence" },
  { name: "JagKalyan Trust", year: "2008", role: "Service & Empowerment · NGO with 12A / 80G" },
  { name: "Jankalyan Trust", year: "2008", role: "Community Development" },
  { name: "Shree Nandi School", year: "2008", role: "Value Based Education" },
  { name: "JagKalyan Holistic LLP", year: "2025", role: "Research, Wellness & Education Solutions" },
  { name: "JagKalyan Tarak Gurukul", year: "2026", role: "Holistic University · Humanity Mission" },
];

export const ASSOCIATES: Entity[] = [
  { name: "MobilePe Fintech", year: "2020", role: "Financial Inclusion & Digital Payments" },
  { name: "MobilePe E-commerce", year: "2020", role: "Digital Commerce Marketplace" },
  { name: "Soul Temple", year: "2021", role: "Spiritual Wellness & Inner Transformation" },
  { name: "KC Space Academy", year: "2022", role: "Space & STEM Education" },
  { name: "Saiccha Developers", role: "Sustainable Developments · Real Estate" },
];

/** The institutions of the mission — rendered as planets in the galaxy. */
export interface Institution {
  name: string;
  role: string;
  detail: string;
}

export const INSTITUTIONS: Institution[] = [
  {
    name: "JagKalyan Tarak Gurukul",
    role: "Develops Future-Ready Leaders",
    detail:
      "Holistic education, skills university, research & innovation, leadership development, AI/GIS and emerging tech, global collaboration.",
  },
  {
    name: "Shree Nandi Foundation",
    role: "Delivers Inclusive Social Impact",
    detail:
      "Value-based education, health & wellbeing, women empowerment, child & youth development, senior citizen care, community development.",
  },
  {
    name: "JagKalyan Seva Udyan",
    role: "Serves Vulnerable Communities with Dignity",
    detail:
      "Divyang support, eye care & health camps, orphan & child care, senior living, widow support, community kitchen, mental wellness.",
  },
  {
    name: "JagKalyan Udyog Udyan",
    role: "Drives Innovation, Entrepreneurship & Employment",
    detail:
      "Startup incubator, MSME & rural industries, skill development, agri-tech & food processing, AI/robotics/IoT, renewable energy & circular economy.",
  },
  {
    name: "JagKalyan Mandapam",
    role: "Centre for Culture, Knowledge Exchange & Global Collaboration",
    detail:
      "Conferences & summits, cultural festivals, spiritual discourses, research symposiums, investor & CSR forums, community events.",
  },
  {
    name: "JagKalyan Holistic LLP",
    role: "Translates Research into Practical, Scalable Solutions",
    detail:
      "R&D, technology innovation, ESG & sustainability solutions, AI/GIS & digital solutions, project implementation, global partnerships.",
  },
  {
    name: "JagKalyan Trust",
    role: "Provides Governance and Long-term Community Stewardship",
    detail:
      "Good governance, education & welfare, rural & community development, environmental stewardship, CSR implementation, volunteer network.",
  },
];

/* ------------------------------------------------------------------
   JagKalyan Academy verticals.
   ------------------------------------------------------------------ */

export const ACADEMY = [
  { name: "JK Coach", body: "Holistic coaching for individuals and leaders." },
  { name: "JK Swasthashala", body: "The school of health and vitality." },
  { name: "JK Swadharmashala", body: "The school of purpose — find your Swadharma." },
  { name: "JK Swadeshshala", body: "The school of nation and service." },
  { name: "JK Arogyashala", body: "The school of healing and integrative wellness." },
  { name: "JK GeoAI Academy", body: "Geospatial intelligence and Earth observation." },
  { name: "JK AI Academy", body: "AI for humanity, future skills, digital empowerment." },
  { name: "JK Automotion Academy", body: "Automation, robotics and industrial systems." },
  { name: "JK CXO Academy", body: "Executive leadership and conscious governance." },
];

/* ------------------------------------------------------------------
   Wisdom Park — 200 acres.
   ------------------------------------------------------------------ */

export const WISDOM_PARK = {
  total: 200,
  zones: [
    { name: "JagKalyan Skills University", acres: 40, note: "Education, research and future leaders" },
    { name: "JagKalyan Seva Udyan", acres: 30, note: "Service, care and community wellbeing" },
    { name: "JagKalyan Udyog Udyan", acres: 30, note: "Industry, innovation and enterprise" },
    { name: "JagKalyan Data Centres", acres: 25, note: "Digital infrastructure and sovereignty" },
    { name: "Bunglows", acres: 25, note: "Premium residential living" },
    { name: "Apartments", acres: 20, note: "Community residential living" },
    { name: "Amenities & Recreation Zone", acres: 20, note: "Sport, leisure and gathering" },
    { name: "Parking & Transport Hub", acres: 15, note: "Mobility and access" },
    { name: "JagKalyan Mandapam", acres: 10, note: "Culture, ceremony and global collaboration" },
    { name: "Serviced Apartments", acres: 10, note: "Hospitality and visiting fellows" },
  ],
};

/* ------------------------------------------------------------------
   Nature charter.
   ------------------------------------------------------------------ */

export const NATURE_CHARTER = [
  { title: "Grow More Trees, Save Trees", element: "Plants" },
  { title: "Save Water, Conserve Water", element: "Water" },
  { title: "Save Soil, Save Earth", element: "Earth", note: "Soil formation has taken millions of years." },
  { title: "Avoid Air Pollution", element: "Air" },
  { title: "Avoid Space Pollution", element: "Space" },
  { title: "Save Environment", element: "All" },
];

/* ------------------------------------------------------------------
   GLOBAL IMPACT — the transformation arc.
   From the client's "From Insecurity-Driven Survival to Purpose-Led
   Prosperity" bridge diagram. The bridge itself is the mission; the
   pillars carry the crossing.
   ------------------------------------------------------------------ */

export const IMPACT_FROM = {
  title: "Insecurity-Driven Survival",
  symptoms: [
    "Fear, confusion, material stress",
    "Survival mode",
    "Disconnection",
  ],
};

export const IMPACT_TO = {
  title: "Purpose-Led Prosperity",
  outcomes: [
    "People do what they love, excel at it, and serve through it",
    "Prosperity created without greed",
    "Harmony with nature, society and inner calling",
  ],
};

/** The three pillars holding the bridge up, in crossing order. */
export const IMPACT_PILLARS = [
  {
    title: "Purpose-Centric & Holistic Education",
    body: "Learning that begins with who a person is meant to be, not only what they should know.",
  },
  {
    title: "Integrating Wisdom & Technology",
    body: "Ancient understanding and modern capability — AI, science and scripture in the same hand.",
  },
  {
    title: "Building Support Systems",
    body: "The structures that let a transformed life hold: wellness, discipline, simplicity, sustainability and service.",
  },
];

export const IMPACT_SUPPORTS = [
  "Wellness",
  "Discipline",
  "Simplicity",
  "Sustainability",
  "Service",
];

/** What alignment actually looks like in a life. */
export const SWADHARMA_EXPRESSIONS = [
  "Painting",
  "Gardening",
  "Teaching",
  "Creating",
];

export const LEGACY = {
  heading: "Legacy",
  quote:
    "We built systems that helped people live healthier, think holistically, act ethically, and use technology in service of society — so future generations could stand stronger, wiser, and more self-reliant.",
};

export const GLOBAL_IMPACT_STATEMENT =
  "JagKalyan Global Impact aims to create a civilization where Conscious Citizens live in Holistic Health, experience High Happiness, and build a Sustainable Zero-Carbon World — fulfilling the spirit of all SDGs.";

/* ------------------------------------------------------------------
   GLOBAL EXPANSION — the wellness network rollout.
   ------------------------------------------------------------------ */

export interface ExpansionNode {
  city: string;
  note?: string;
  hub?: boolean;
}

export interface ExpansionPhase {
  phase: string;
  label: string;
  blurb: string;
  nodes: ExpansionNode[];
}

export const EXPANSION: ExpansionPhase[] = [
  {
    phase: "Phase I",
    label: "Indian Pilot",
    blurb:
      "Mumbai–Navi Mumbai proves the model — the first JagKalyan Wellness Centre and the template every centre after it inherits.",
    nodes: [
      { city: "Mumbai–Navi Mumbai", note: "First JagKalyan Wellness Centre", hub: true },
    ],
  },
  {
    phase: "Phase II",
    label: "Indian Expansion",
    blurb:
      "The network extends across major Indian cities, each centre linked to the others as one connected system rather than a set of franchises.",
    nodes: [
      { city: "Delhi" },
      { city: "Pune" },
      { city: "Hyderabad" },
      { city: "Ahmedabad" },
      { city: "Jaipur" },
      { city: "Nagpur" },
      { city: "Kolkata" },
    ],
  },
  {
    phase: "Phase III",
    label: "Global Rollout",
    blurb:
      "A connected wellness network reaching the Middle East, Europe and South East Asia.",
    nodes: [
      { city: "Dubai", note: "Middle East" },
      { city: "Doha", note: "Middle East" },
      { city: "Oman", note: "Middle East" },
      { city: "Zurich", note: "Europe" },
      { city: "Bangkok", note: "South East Asia" },
    ],
  },
];

/* ------------------------------------------------------------------
   FOUNDERS — drawn from the CVs supplied by the client.
   ------------------------------------------------------------------ */

export interface Founder {
  name: string;
  role: string;
  summary: string;
  highlights: string[];
  education: string;
  linkedin?: string;
  photo?: string;
}

export const FOUNDERS: Founder[] = [
  {
    name: "Prof. Jagadish Kalyandurgmath",
    role: "Founder · Geomatics Scientist · Social Entrepreneur",
    summary:
      "Forty years across space research, enterprise technology and social entrepreneurship — building the systems a nation runs on, then the institutions that outlast them.",
    highlights: [
      "Geomatics Scientist, ISRO NNRMS — established remote sensing centres across India for forestry, agriculture, water, urban planning and minerals",
      "Business Head, ESRI India — built a global GIS consulting practice across eGovernance, utilities, agriculture and telecom",
      "Chief Architect, Head of GIS, Director & Mentor, Reliance Group — enterprise GIS decision systems across telecom, power, fintech, logistics, health and infrastructure; a team of 2,000 and a $40M budget",
      "Professor of Practice, Dean and Guide at IITs, IIMs, NITs, Defence, IARI and NEERI",
      "Founder Trustee, JagKalyan Trust; co-founder and mentor to JKITM, MobilePe, Kalpana Chawla Space Academy and Soul Temple",
    ],
    education:
      "B.E. Karnatak University · M.Tech Remote Sensing, IIT Bombay · Computer OD and DBMS, IISc · PhD (Expert GIS) · PhD (Decision Support Systems) · PhD (Holistic Education) · Diploma in Yoga · ICF Coach",
    linkedin: "https://www.linkedin.com/in/jagadeeshkm/",
    photo: "/founder-jagdish.webp",
  },
  {
    name: "Prof. Kavita Kalyandurgmath",
    role: "Co-Founder · Professor & Head, Research & Business Analytics",
    summary:
      "Three decades of academic excellence in research, analytics and education management — and the supervisor behind a generation of researchers.",
    highlights: [
      "Faculty for over 32 years across MBA, MMS, PGDM, MMM, MHRD and MFM programmes",
      "Research supervisor to 16 PhD scholars — 13 completed, 3 ongoing",
      "Patent published: developing a skill matrix for organisations using machine learning",
      "25+ Management Development Programmes for JP Morgan, Accenture, Tata Group, Asian Paints, L&T, Indian Oil and the Indian Army",
      "Faculty Development Programmes including one for ICAI attended by 3,000+ chartered accountants",
      "50+ collaborative research papers across retail, healthcare, hospitality and social media",
    ],
    education:
      "AICTE Approved Faculty · Research supervisor across Pacific, Mewar, IIC University of Technology, Living Stone and Golden State universities",
    linkedin:
      "https://www.linkedin.com/in/prof-kavita-kalyandurgmath-92750410",
  },
];

/* ------------------------------------------------------------------
   NAVIGATION + ROUTE REGISTRY
   `status: "soon"` renders a Coming Soon page from the shared template.
   ------------------------------------------------------------------ */

export const NAV: NavSection[] = [
  {
    label: "The Mission",
    href: "/mission",
    status: "live",
    primary: true,
    blurb: "Build Self, Society, Nation and Humanity.",
    children: [
      { label: "Build Self", href: "/mission#build-self", status: "live" },
      { label: "Build Society", href: "/mission#build-society", status: "live" },
      { label: "Build Nation", href: "/mission#build-nation", status: "live" },
      { label: "Build Humanity", href: "/mission#build-humanity", status: "live" },
      { label: "Holistic Framework", href: "/mission#holistic", status: "live" },
      { label: "Global Movement", href: "/mission#global", status: "live" },
      { label: "Nature Charter", href: "/mission#nature", status: "live" },
      { label: "Global Impact & Legacy", href: "/global-impact", status: "live" },
      { label: "Founders", href: "/about", status: "live" },
    ],
  },
  {
    label: "The Journey",
    href: "/journey",
    status: "live",
    primary: true,
    blurb: "Dr. Jagdish Kalyandurgmath — 1967 to 2026.",
  },
  {
    label: "Ecosystem",
    href: "/ecosystem",
    status: "live",
    primary: true,
    blurb: "Entities, associates and institutions.",
    children: [
      { label: "JagKalyan Entities", href: "/ecosystem#entities", status: "live" },
      { label: "JagKalyan Associates", href: "/ecosystem#associates", status: "live" },
      { label: "The Institutions", href: "/ecosystem#institutions", status: "live" },
      { label: "JagKalyan Wisdom Park", href: "/wisdom-park", status: "live" },
    ],
  },
  {
    label: "Academy",
    href: "/academy",
    status: "live",
    primary: true,
    blurb: "Nine schools of holistic learning.",
  },
  {
    label: "Wisdom Park",
    href: "/wisdom-park",
    status: "live",
    primary: true,
    blurb: "200 acres of innovation, learning, service and sustainable living.",
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    status: "live",
    primary: true,
    blurb: "Register, volunteer, donate, partner.",
    children: [
      { label: "Register", href: "/get-involved/register", status: "soon", blurb: "Every member receives a JagKalyan Unique ID." },
      { label: "Volunteer", href: "/get-involved/volunteer", status: "soon" },
      { label: "Membership", href: "/get-involved/membership", status: "soon" },
      { label: "Donate", href: "/donate", status: "soon" },
      { label: "Corporate CSR", href: "/donate/csr", status: "soon" },
      { label: "Grants & Endowment", href: "/donate/grants", status: "soon" },
    ],
  },
];

/**
 * Routes that exist as Coming Soon stubs. Each becomes a real page at
 * /<href> using the shared template. Keeping them as real routes (rather
 * than dead links) means the client can share any URL from day one and
 * the sitemap is complete for search engines.
 */
export interface StubRoute {
  href: string;
  title: string;
  parent: string;
  blurb: string;
  bullets?: string[];
}

export const STUBS: StubRoute[] = [
  // Holistic Framework verticals
  { href: "/framework", title: "Holistic Framework", parent: "The Mission", blurb: "The twelve dimensions through which the mission works.", bullets: ["Education", "Wellness", "Welfare", "Wealth", "Spirituality", "Leadership", "Entrepreneurship", "Innovation", "Sustainability", "Technology", "Governance", "Service"] },

  // Projects
  { href: "/projects", title: "Projects", parent: "Ecosystem", blurb: "The initiatives building the mission on the ground.", bullets: ["JagKalyan Tarak Gurukul", "Seva Udyan", "Gramodyog Park", "Eco Living", "Startup Incubator", "Holistic Academy", "Research Centre", "Plantation Mission", "Goshala Research", "Smart Village"] },

  // Verticals
  { href: "/education", title: "Education", parent: "Academy", blurb: "Courses, certifications and online learning.", bullets: ["Courses", "Certifications", "Online Learning", "Faculty", "Students", "Library", "Research Publications"] },
  { href: "/wellness", title: "Wellness", parent: "Academy", blurb: "Body, mind, emotion and spirit in balance.", bullets: ["Yoga", "Meditation", "Naturopathy", "Nutrition", "Lifestyle Medicine", "Ayurveda", "Health Assessment"] },
  { href: "/innovation", title: "Innovation", parent: "Ecosystem", blurb: "Technology in the service of humanity.", bullets: ["AI", "GIS", "Robotics", "IoT", "Renewable Energy", "Circular Economy", "Digital Transformation"] },
  { href: "/startup-hub", title: "Startup Hub", parent: "Ecosystem", blurb: "Incubation, acceleration and enterprise.", bullets: ["Incubator", "Accelerator", "Mentors", "Investors", "Grants", "CSR", "Innovation Challenges"] },
  { href: "/sustainability", title: "Sustainability", parent: "The Mission", blurb: "Protect Earth, preserve the future.", bullets: ["Climate Action", "Water", "Agriculture", "Biodiversity", "Waste Management", "Carbon Neutrality", "SDGs"] },
  { href: "/community", title: "Community", parent: "Get Involved", blurb: "The people who carry the mission forward.", bullets: ["Volunteer", "Membership", "Chapters", "Youth", "Women", "Senior Citizens", "Divyang Support"] },

  // Get involved children
  { href: "/get-involved/register", title: "Register", parent: "Get Involved", blurb: "Join the mission. Every registered member, student, volunteer, mentor, faculty, researcher, donor, investor and partner receives a JagKalyan Unique ID.", bullets: ["Visitor", "Student", "Member", "Volunteer", "Mentor", "Faculty", "Researcher", "Donor", "Investor", "CSR Partner"] },
  { href: "/get-involved/volunteer", title: "Volunteer", parent: "Get Involved", blurb: "Give your time and skill to the mission." },
  { href: "/get-involved/membership", title: "Membership", parent: "Get Involved", blurb: "Become a lifelong member of the JagKalyan family." },

  // Donate
  { href: "/donate", title: "Donate", parent: "Get Involved", blurb: "Support the mission. Contributions to JagKalyan Trust — a registered NGO with 12A and 80G — Shree Nandi Foundation and JagKalyan Seva Udyan.", bullets: ["Individual Giving", "Corporate CSR", "Sponsorship", "Endowment", "Crowdfunding"] },
  { href: "/donate/csr", title: "Corporate CSR", parent: "Get Involved", blurb: "Partner with us on CSR-funded programmes." },
  { href: "/donate/grants", title: "Grants & Endowment", parent: "Get Involved", blurb: "Institutional grants and long-term endowment giving." },

  // Knowledge / media / events
  { href: "/knowledge", title: "Knowledge Centre", parent: "The Mission", blurb: "Articles, research and recorded wisdom.", bullets: ["Articles", "Blogs", "Videos", "Podcasts", "Case Studies", "Downloads", "Research Papers"] },
  { href: "/events", title: "Events", parent: "The Mission", blurb: "Gatherings, workshops and summits.", bullets: ["Calendar", "Workshops", "Conferences", "Webinars", "Registrations"] },
  { href: "/media", title: "Media", parent: "The Mission", blurb: "News, press and stories from the field.", bullets: ["News", "Press Releases", "Gallery", "Testimonials", "Success Stories"] },
  { href: "/partners", title: "Partners", parent: "Ecosystem", blurb: "Government, academic, industry and international alliances.", bullets: ["Government", "Universities", "NGOs", "Industry", "International", "Strategic Alliances"] },

  // Contact + portal
  { href: "/contact", title: "Contact", parent: "Get Involved", blurb: "Reach the mission.", bullets: ["Contact Form", "Offices", "Careers", "FAQs", "Support"] },
  { href: "/portal", title: "Member Portal", parent: "Get Involved", blurb: "Your dashboard, courses, certificates, donations and community.", bullets: ["Login", "Dashboard", "Courses", "Certificates", "Donations", "Events", "Community", "Profile"] },
];

export const FOOTER_GROUPS = [
  {
    title: "Mission",
    links: [
      { label: "The Mission", href: "/mission" },
      { label: "The Journey", href: "/journey" },
      { label: "Global Impact & Legacy", href: "/global-impact" },
      { label: "Founders", href: "/about" },
      { label: "Holistic Framework", href: "/framework" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Ecosystem", href: "/ecosystem" },
      { label: "Wisdom Park", href: "/wisdom-park" },
      { label: "Projects", href: "/projects" },
      { label: "Innovation", href: "/innovation" },
      { label: "Startup Hub", href: "/startup-hub" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Academy", href: "/academy" },
      { label: "Education", href: "/education" },
      { label: "Wellness", href: "/wellness" },
      { label: "Knowledge Centre", href: "/knowledge" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Participate",
    links: [
      { label: "Get Involved", href: "/get-involved" },
      { label: "Register", href: "/get-involved/register" },
      { label: "Donate", href: "/donate" },
      { label: "Community", href: "/community" },
      { label: "Member Portal", href: "/portal" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
