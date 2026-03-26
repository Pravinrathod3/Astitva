import { APP_CONFIG } from "@/config/app.config";

// ============================================================
// SINGLE SOURCE OF TRUTH FOR ALL EVENT DATA
// ============================================================
// Update events HERE. Both the schedule page and events section
// on the homepage will automatically stay in sync.
// ============================================================

/**
 * Master event definition containing all fields needed by
 * both the schedule page and the events listing section.
 */
export type MasterEvent = {
  id: number;
  title: string;
  /** Override title for events section (if different from schedule title) */
  eventTitle?: string;
  category: string;
  /** Department badge on schedule (defaults to category if not set) */
  department?: string;
  /** Short description for events card */
  description: string;
  /** Longer description for schedule page (falls back to description) */
  scheduleDescription?: string;
  date: string;
  image: string;
  /** Separate image for the schedule page (falls back to image) */
  scheduleImage?: string;
  prizePool: string;
  // --- Schedule-specific fields (omit to exclude from schedule) ---
  day?: 1 | 2;
  time?: string;
  venue?: string;
  coordinators?: string;
  facultyCoordinators?: string;
  lottie?: string;
  color?: string;
  teamMember?: string;
  /** URL to the rule book PDF */
  ruleBookUrl?: string;
  /** If true, this event will be excluded from the public events listing (but can still appear on the schedule) */
  excludeFromListing?: boolean;
  /** Point number for the schedule (e.g. 1, 2, 3...) */
  pointNo?: number;
};

// ============================================================
// MASTER EVENT LIST
// ============================================================
// Events with a `day` field appear in the schedule page.
// ALL events appear in the events listing section.
// ============================================================

export const ALL_EVENTS: MasterEvent[] = [
  // ─── DAY 1 EVENTS (MARCH 27TH) ──────────────────────────
  {
    id: 0,
    title: "Inauguration",
    category: "OFFICIAL",
    department: "Official",
    description: "Official inauguration ceremony for Astitva 2026.",
    scheduleDescription: "Inauguration ceremony and reporting of participants near Main Gate Parking Area, Ground Floor",
    date: "March 27th",
    image: "/grand.avif",
    prizePool: "—",
    day: 1,
    time: "9:30 AM - 10:00 AM",
    venue: "Main Gate Parking Area, Ground Floor",
    lottie: "",
    excludeFromListing: true,
    color: "bg-yellow-50",
    pointNo: 1,
  },
  {
    id: 1,
    title: "Drone Arena",
    category: "TECHNICAL",
    department: "ENTC",
    teamMember: "Custom-built drone",
    description: "Navigate a custom-built drone through a dynamic obstacle course while carrying payloads.",
    scheduleDescription: "Drone Competition, near Main Gate Parking, Ground Floor",
    date: "March 27th",
    image: "/drone.avif",
    prizePool: "Part of ₹75,000",
    day: 1,
    time: "10:00 AM onwards",
    venue: "Main Gate Parking, Ground Floor",
    coordinators: "Anand katral",
    ruleBookUrl: "/Drone.pdf",
    lottie: "https://lottie.host/8fe04dad-d3fa-4254-93b7-304f52d3c857/yxrz9HKunG.lottie",
    color: "bg-blue-50",
    pointNo: 2,
  },
  {
    id: 4,
    title: "Robo Race",
    category: "TECHNICAL",
    department: "ENTC",
    teamMember: "Wired or Wireless",
    description: "Speed and precision-based robotic racing where teams navigate a challenging track in the shortest time.",
    scheduleDescription: "Robo Race Competition, Ground Floor",
    date: "March 27th",
    image: "/robotics1.jpg",
    prizePool: "Part of ₹75,000",
    day: 1,
    time: "10:00 AM onwards",
    venue: "Ground Floor",
    coordinators: "Utkarsh Singh",
    ruleBookUrl: "/Robo-Race.pdf",
    lottie: "https://lottie.host/84997780-9072-40eb-bf3c-b02910fa01ef/C7GW3im1LR.lottie",
    color: "bg-indigo-50",
    pointNo: 3,
  },
  {
    id: 3,
    title: "Robo Soccer",
    category: "TECHNICAL",
    department: "ENTC",
    teamMember: "Max weight: 5kg",
    description: "Robots compete in a structured soccer match emphasizing coordination, control, and strategic execution.",
    scheduleDescription: "Robo Soccer Competition, Ground Floor",
    date: "March 27th",
    image: "/robo_scoccer.jpg",
    prizePool: "Part of ₹75,000",
    day: 1,
    time: "10:00 AM onwards",
    venue: "Ground Floor",
    coordinators: "Atharv Kurade",
    ruleBookUrl: "/Robo-Soccer.pdf",
    lottie: "https://lottie.host/8fe04dad-d3fa-4254-93b7-304f52d3c857/yxrz9HKunG.lottie",
    color: "bg-green-50",
    pointNo: 4,
  },

  // ─── DAY 2 EVENTS (MARCH 28TH) ──────────────────────────
  {
    id: 5,
    title: "Debug Hackathon",
    category: "TECHNICAL",
    department: "ENTC",
    teamMember: "2–4 members",
    description: "A 7-hour competitive innovation event focused on debugging, logical optimization, and real-world problem-solving.",
    scheduleDescription: "Location B602",
    date: "March 28th",
    image: "/hackathon.avif",
    prizePool: "Part of ₹75,000",
    day: 2,
    time: "9:00 AM onwards",
    venue: "Location B602",
    coordinators: "Sumeet Yadav ",
    facultyCoordinators: "Armaan Shaikh",
    ruleBookUrl: "/Debug Hackathon Rules and regulations.pdf",
    lottie: "https://lottie.host/5d55c618-6fa5-489d-82bf-a9e561c64414/w57drvo4fH.lottie",
    color: "bg-purple-50",
    pointNo: 7,
  },
  {
    id: 2,
    title: "Line Follower",
    category: "TECHNICAL",
    department: "ENTC",
    teamMember: "Max 5 members",
    description: "Autonomous bots must accurately detect and follow a predefined track using intelligent path-following algorithms.",
    scheduleDescription: "Location B609, B611",
    date: "March 28th",
    image: "/robotics2.jpg",
    prizePool: "Part of ₹75,000",
    day: 2,
    time: "9:00 AM onwards",
    venue: "Location B609, B611",
    coordinators: "Arvind Rao",
    ruleBookUrl: "/Trace the Track.pdf",
    lottie: "https://lottie.host/927b9dd7-f2e5-471e-b14e-6d7402af9a9e/wzqLaYST4c.lottie",
    color: "bg-red-50",
    pointNo: 8,
  },
  {
    id: 6,
    title: "Valedictory & Prize Distribution",
    category: "OFFICIAL",
    department: "Official",
    description: "Prize distribution and closing remarks for Astitva 2026.",
    scheduleDescription: "Location B602",
    date: "March 28th",
    image: "/prize.avif",
    prizePool: "—",
    day: 2,
    time: "4:00 PM onwards",
    venue: "Location B602",
    coordinators: "",
    facultyCoordinators: "",
    lottie: "",
    color: "bg-yellow-50",
    excludeFromListing: true,
    pointNo: 9,
  },
];

// ============================================================
// DERIVED DATA HELPERS
// ============================================================

/** Schedule event item type (used by schedule page) */
export type ScheduleEventItem = {
  id: number;
  title: string;
  department: string;
  description: string;
  time: string;
  venue: string;
  coordinators: string;
  facultyCoordinators: string;
  image1: string;
  lottie: string;
  color: string;
  teamMember: string;
  ruleBookUrl?: string;
  excludeFromListing?: boolean;
  pointNo?: number;
};

/** Day data for schedule page */
export type DayData = {
  day: string;
  date: string;
  items: ScheduleEventItem[];
};

/** Derive schedule data (Day 1 & Day 2) from master events */
export function getScheduleData(): DayData[] {
  const toScheduleItem = (e: MasterEvent): ScheduleEventItem => ({
    id: e.id,
    title: e.title,
    department: e.department || e.category,
    description: e.scheduleDescription || e.description,
    time: e.time || "",
    venue: e.venue || "",
    coordinators: e.coordinators || "",
    facultyCoordinators: e.facultyCoordinators || "",
    image1: e.scheduleImage || e.image,
    lottie: e.lottie || "",
    color: e.color || "bg-white",
    teamMember: e.teamMember || "",
    ruleBookUrl: e.ruleBookUrl,
    excludeFromListing: e.excludeFromListing || false,
    pointNo: e.pointNo,
  });

  const day1 = ALL_EVENTS.filter((e) => e.day === 1).map(toScheduleItem);
  const day2 = ALL_EVENTS.filter((e) => e.day === 2).map(toScheduleItem);

  return [
    { day: "Day 1", date: APP_CONFIG.event.dates.day1, items: day1 },
    { day: "Day 2", date: APP_CONFIG.event.dates.day2, items: day2 },
  ];
}

/** Events listing item type (used by events section on homepage) */
export type EventListingItem = {
  id: number;
  category: string;
  title: string;
  date: string;
  description: string;
  image: string;
  prizePool: string;
  price?: number;
  ruleBookUrl?: string;
};

/** Derive events listing data from master events */
export function getEventsListingData(): EventListingItem[] {
  // Prices for events by exact title (fallback to 0 if missing)
  const PRICE_BY_TITLE: Record<string, number> = {
    "Drone Arena": 1000,
    "Line Follower": 350,
    "Robo Race": 350,
    "Robo Soccer": 350,
    "Debug Hackathon": 300,
  };
  return ALL_EVENTS.filter((e) => !e.excludeFromListing).map((e) => ({
    id: e.id,
    category: e.category,
    title: (e.eventTitle || e.title).toUpperCase(),
    date: e.date,
    description: e.description,
    image: e.image,
    prizePool: e.prizePool,
    price: PRICE_BY_TITLE[e.title] ?? 0,
    ruleBookUrl: e.ruleBookUrl,
  }));
}

/**
 * Mapping from events listing title to schedule event ID.
 * Used for "View Details" links that navigate to the schedule page.
 */
export function getEventTitleToScheduleId(): Record<string, number> {
  return Object.fromEntries(
    ALL_EVENTS.filter((e) => e.day != null).map((e) => [
      (e.eventTitle || e.title).toUpperCase(),
      e.id,
    ]),
  );
}
