// ---------------------------------------------------------------------------
// Single source of truth for all site copy. Edit here to update the site.
// Items marked TO CONFIRM in the brief use safe placeholders (e.g. "#").
// ---------------------------------------------------------------------------

export const hero = {
  // Hero name, two lines (brief: SUHAIR / SAYED)
  nameLines: ["SUHAIR", "SAYED"],
  leftLabel: ["Content", "Strategist"],
  rightLabel: ["Based in", "Exeter, UK"],
};

export const rolePills = ["Content Strategist", "Brand Marketer", "Social Media"];

// Big statement (brief Part 2). Words flagged `bold` render bold; the reveal
// turns words from grey to cream one by one on scroll.
export const statement = {
  lines: [
    [
      { text: "3+", bold: true },
      { text: "years", bold: true },
      { text: "of" },
      { text: "shaping" },
      { text: "content" },
    ],
    [{ text: "that" }, { text: "helps" }, { text: "brands" }],
    [{ text: "connect" }, { text: "and" }, { text: "grow" }],
  ],
};

export const services = {
  intro: "Building brands people remember through",
  list: ["CONTENT STRATEGY", "BRAND MARKETING", "SOCIAL MEDIA"],
};

export type Project = {
  year: string;
  title: string;
  category: string;
  logo?: string; // public/ path
  preview?: string; // public/ path
  href?: string;
};

export const work = {
  heading: "SELECTED WORK",
  subtext:
    "A selection of work across content, branding and digital marketing, each one built with purpose.",
  projects: [
    {
      year: "2022 — 2025",
      title: "Calibr Studios, Mumbai — content for D2C brands",
      category: "CONTENT STRATEGY",
      logo: "/logos/ccc.png",
      preview: "/work/content-strategy/1.jpg",
      href: "#",
    },
    {
      year: "2026",
      title: "Teffie — marketing communications plan (MSc, University of Exeter)",
      category: "BRAND MARKETING",
      logo: "/logos/thf.png",
      preview: "/work/branding/1.jpg",
      href: "#",
    },
    {
      year: "2026",
      title: "Construction & real estate client website",
      category: "WEB DESIGN",
      logo: "/logos/scott.png",
      preview: "/work/performance-marketing/1.jpg",
      href: "#",
    },
    {
      year: "2025",
      title: "Amul brand audit — CBBE pyramid & brand personality",
      category: "BRAND STRATEGY",
      logo: "/logos/bodycafe.png",
      preview: "/work/branding/2.jpg",
      href: "#",
    },
    {
      year: "2024 — 2025",
      title: "Instagram content creation",
      category: "SOCIAL MEDIA",
      logo: "/logos/hilo.png",
      preview: "/work/social-media-marketing/1.jpg",
      href: "#",
    },
    {
      year: "2023 — 2025",
      title: "Drone & photography work (DJI Mini 2)",
      category: "VISUAL CONTENT",
      logo: "/logos/twb.png",
      preview: "/work/social-media-marketing/2.jpg",
      href: "#",
    },
  ] as Project[],
};

export const about = {
  intro: [
    "I'm a content strategist and digital marketer who turns brand ideas into",
    "content people actually remember — across strategy, social and story.",
  ],
  credentials: [
    "MSc Digital Marketing, University of Exeter (2025 — 2026)",
    "BBA, Traditional & Digital Marketing — First Class with Distinction (India)",
    "Google Analytics Certification (2026)",
    "Claude Academy — Claude 101, Claude Code 101, Claude Cowork, Human-Agent Teams",
    "Languages — English, Hindi, Marathi",
  ],
};

export const footer = {
  bigName: ["SUHAIR", "SAYED"],
  line1: "Let's create something",
  line2: ["MEANINGFUL", "AND MEMORABLE"],
  reachOut: "Reach out",
  credits: {
    left: "Designed by Suhair Sayed",
    right: "Created with Claude Code",
  },
};

export const contact = {
  email: "suhairsayed.ss@gmail.com",
  linkedin: "https://www.linkedin.com/in/suhairsayed/",
  instagram: "https://www.instagram.com/suhair.sayed/",
};

export const menuLinks = [
  { label: "HOME", target: "#home" },
  { label: "WORK", target: "#work" },
  { label: "ABOUT", target: "#about" },
  { label: "CONTACT", target: "#contact" },
];
