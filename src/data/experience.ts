export type ExperienceLink = {
  label: string;
  href: string;
  appName?: string;
  icon?: string;
};

export type ReleaseHealthPoint = {
  version: string;
  dateLabel: string;
  crashFreeUsers: number;
  crashFreeSessions: number;
};

export type ReleaseHealth = {
  eyebrow: string;
  summary: string;
  note: string;
  points: ReleaseHealthPoint[];
};

export type WorkExperience = {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  status?: "working" | "client" | "past";
  tldr?: string;
  /** Short story for internships / older roles */
  narrative?: string;
  achievements: string[];
  links?: ExperienceLink[];
  releaseHealth?: ReleaseHealth;
};

export const workExperiences: WorkExperience[] = [
  {
    role: "Full Stack Developer",
    company: "16Arena Labs",
    location: "Remote",
    startDate: "2025-08",
    endDate: null,
    status: "working",
    tldr:
      "Building esports products end to end — Flutter apps, tournament tooling, shop checkout, and a React admin panel — plus keeping 16Score running after the acquisition.",
    achievements: [
      "Shipped 16Arena, a Flutter tournament platform with real-time chat, push notifications, and org/team workflows.",
      "Built 16TMS for multi-game tournament operations and 16Arena Shop with inventory, cart, and Razorpay checkout.",
      "Developed a React admin panel for operations data across organizations, teams, and users.",
      "Continued 16Score (live scores and match stats) as part of the merged product line.",
    ],
    links: [
      {
        label: "play store",
        href: "https://play.google.com/store/apps/details?id=com.sixteenarena.app",
        appName: "16Arena",
        icon: "/store-icons/16arena.jpg",
      },
      {
        label: "app store",
        href: "https://apps.apple.com/in/app/16arena-games-esports-shop/id6759313578",
        appName: "16Arena",
        icon: "/store-icons/16arena.jpg",
      },
      {
        label: "play store",
        href: "https://play.google.com/store/apps/details?id=com.bluexkye.sixteenscore",
        appName: "16Score",
        icon: "/store-icons/16score.jpg",
      },
      {
        label: "app store",
        href: "https://apps.apple.com/in/app/16score-live-esports-scores/id6751777140",
        appName: "16Score",
        icon: "/store-icons/16score.jpg",
      },
      {
        label: "16Arena Shop",
        href: "https://shop.16arena.com",
      },
    ],
    releaseHealth: {
      eyebrow: "16arena ios · crash-free users, by release · aug to oct 2026",
      summary:
        "Usage jumped 8× in August and crash-free users fell to 91%. Three releases later it was back to 98%.",
      note: "Crash-free sessions stayed above 99.4% throughout · source: Sentry",
      points: [
        {
          version: "1.5.18",
          dateLabel: "aug 6",
          crashFreeUsers: 91.04,
          crashFreeSessions: 99.49,
        },
        {
          version: "1.5.19",
          dateLabel: "sep 15",
          crashFreeUsers: 95.13,
          crashFreeSessions: 99.57,
        },
        {
          version: "1.5.20",
          dateLabel: "sep 29",
          crashFreeUsers: 96.53,
          crashFreeSessions: 99.81,
        },
        {
          version: "1.5.21",
          dateLabel: "oct 23",
          crashFreeUsers: 97.93,
          crashFreeSessions: 99.78,
        },
      ],
    },
  },
  {
    role: "Full Stack Developer",
    company: "DiscountBuddy",
    location: "Client · Remote",
    startDate: "2025-12",
    endDate: null,
    status: "client",
    tldr:
      "Client project: Flutter app plus Django APIs, restaurant dashboards, and AWS production — deals, QR redemption, and live updates.",
    narrative:
      "DiscountBuddy is where I owned a full client stack — mobile, API, and deployment. A lot of the work was making restaurant-facing flows reliable before users hit edge cases in the wild.",
    achievements: [
      "Built restaurant discovery, live deals, QR redemption, and reservations with Django REST + PostgreSQL.",
      "Implemented role-based auth and management dashboards for restaurants.",
      "Handled AWS deployment, updates, and production troubleshooting.",
    ],
    links: [
      {
        label: "play store",
        href: "https://play.google.com/store/apps/details?id=com.discountbuddy.app",
        appName: "DiscountBuddy",
        icon: "/store-icons/discountbuddy.jpg",
      },
      {
        label: "app store",
        href: "https://apps.apple.com/in/app/discount-buddy-deals/id6760362068",
        appName: "DiscountBuddy",
        icon: "/store-icons/discountbuddy.jpg",
      },
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Bluexkye Softwares",
    location: "Ahmedabad-area · On-site",
    startDate: "2025-02",
    endDate: "2025-08",
    status: "past",
    narrative:
      "My first full-time team: React and Django in production, API integration, and a big share of 16Score feature work. That's where I went from tutorial apps to shipping on a schedule with other developers.",
    achievements: [
      "Delivered web features with React, Django, MySQL, and PostgreSQL.",
      "Shipped live score and stats flows for 16Score with complex API integrations.",
      "Improved UI responsiveness and backend performance on production traffic.",
    ],
  },
];