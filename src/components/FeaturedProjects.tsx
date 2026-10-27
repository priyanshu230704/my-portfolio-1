"use client";

import { useCallback, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import styles from './FeaturedProjects.module.css';

export type Project = {
  title: string;
  description: string;
  tags: string[];
  features?: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  previewImages?: { title: string; src: string }[];
};

const featuredProjects: Project[] = [
  {
    title: "GitHub Organization & Activity Tracker",
    description: "Enterprise-grade full-stack analytics dashboard that tracks commits across all branches, pull request lifecycles, code reviews, diffs, and developer velocity in real time.",
    tags: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Octokit"],
    features: [
      "Built a real-time developer activity dashboard tracking commits (all branches), PR creation/merge events, and code reviews",
      "Implemented 1-click GitHub PAT authentication and Enterprise GitHub App webhook integration",
      "Designed a high-performance dark-theme UI with interactive multi-axis velocity timeline charts (Recharts)",
      "Architected dual storage engine (PostgreSQL + Prisma ORM) with local fallback and zero-downtime static demo mode (/static)",
      "Added advanced multi-filter system (date range, developer, repository, branch, activity type)"
    ],
    previewImages: [
      { title: "Overview", src: "/previews/overview-tab.png" },
      { title: "Employees", src: "/previews/employees-tab.png" },
      { title: "Repositories", src: "/previews/repositories-tab.png" },
      { title: "Activity Feed", src: "/previews/activity-tab.png" },
    ]
  },
  {
    title: "DiscountBuddy (Client Project)",
    description: "A smart deals and savings app that helps users discover the best discounts, coupons, and offers from multiple brands and stores in one place.",
    tags: ["Flutter", "Django rest framework", "PostgreSQL", "AWS", "REST APIs", "App Deployment"],
    features: [
      "Developed a cross-platform mobile application using Flutter with Django REST Framework backend",
      "Contributed to backend development in Django, including API integration and data management",
      "Designed a clean and user-friendly UI for a smooth browsing experience",
      "Implemented user authentication, push notifications, and performance optimizations",
      "Integrated Firebase for push notifications and analytics on both backend and app side",
      "Contributed to AWS deployment, server hosting, and production environment management"
    ],
    liveLink: "https://play.google.com/store/apps/details?id=com.discountbuddy.app"
  },
  {
    title: "ChitChat (Personal Project)",
    description: "A real-time chat application designed for seamless and secure communication with a clean, minimal user experience.",
    tags: ["Flutter", "Django", "Django Channels", "JWT Authentication", "WebSockets", "REST APIs"],
    features: [
      "Developed a cross-platform mobile chat application using Flutter with a Django backend",
      "Implemented real-time messaging using WebSocket connections (Django Channels)",
      "Built JWT-based authentication for secure user access and session handling",
      "Designed and managed socket connection lifecycle, including connection handling and message broadcasting",
      "Created a simple, intuitive, and responsive UI focused on casual conversations",
      "Developed REST APIs for user management and chat-related operations"
    ]
  },
  {
    title: "InvoiceGen (Real-World Problem Solution)",
    description: "A custom invoice generation system built to solve inefficiencies in manual invoice creation for small businesses.",
    tags: ["Flutter", "PDF Generation"],
    features: [
      "Identified a real-world problem where business owners repeatedly created invoices manually using tools like Canva, leading to time loss and inconsistency",
      "Designed a reusable invoice template system with pre-filled company details and dynamic input fields",
      "Enabled one-click PDF generation and instant sharing functionality for faster client communication",
      "Automated repetitive workflow, reducing invoice creation time from minutes to seconds",
      "Built a clean and user-friendly interface requiring minimal user input"
    ]
  },
  {
    title: "16Share – P2P Offline File Transfer App",
    description: "High-speed peer-to-peer file sharing application enabling direct device-to-device transfer over local WiFi without internet.",
    tags: ["Flutter", "Kotlin", "TCP/UDP Sockets", "Android SDK", "Platform Channels"],
    features: [
      "Built a cross-platform Flutter app with native Kotlin integration using Platform Channels for performance-critical operations",
      "Implemented local device discovery using UDP broadcast over LAN (zero manual setup)",
      "Developed a TCP-based file transfer engine handling large files in 64KB chunks for efficient streaming",
      "Integrated QR-based connection flow for instant peer pairing without manual IP entry",
      "Enabled sharing of installed Android apps by extracting APKs via PackageManager",
      "Built real-time transfer analytics (progress, speed) using native callbacks"
    ],
    githubLink: "https://github.com/priyansuchavda/16share"
  }
];

const companyProjects: Project[] = [
  {
    title: "16Score",
    description: "Esports Live Score & Statistics Platform. A real-time esports companion app that delivers live match updates, player statistics, and performance insights.",
    tags: [
      "Flutter",
      "Dart",
      "REST APIs",
      "Firebase",
      "Push Notifications",
      "Analytics",
      "App Deployment"
    ],
    features: [
      "Built a tournament management system with bracket rendering, points table calculations, and match scheduling.",
      "Implemented real-time live scores and match updates using WebSocket technology.",
      "Developed analytics dashboards with performance graphs and historical statistics for teams and players.",
      "Integrated a news section with RSS feed synchronization, deep-linking, and a smooth swipe-based user interface.",
      "Redesigned the application with a modern premium UI, custom animations, and improved typography.",
      "Optimized app performance and navigation using GetX state management with efficient local caching."
    ],
    liveLink: "https://play.google.com/store/apps/details?id=com.bluexkye.sixteenscore"
  },
  {
    title: "16Arena",
    description: "Tournament Management System. A complete tournament platform for managing matches, leaderboards, and player participation.",
    tags: [
      "Flutter",
      "Dart",
      "REST APIs",
      "Firebase",
      "Push Notifications",
      "Analytics",
      "App Deployment"
    ],
    features: [
      "Built a tournament management system with bracket generation, match scheduling, and leaderboard updates.",
      "Implemented real-time online status and chat synchronization using WebSocket technology.",
      "Integrated HTML5 games inside the app using WebView with session handling and score submission.",
      "Built an in-app shop experience with product catalog, cart, and Razorpay payment integration for gift cards and vouchers.",
      "Redesigned the app UI with a modern and responsive layout for better user experience.",
      "Improved app performance and navigation using GetX state management.",
      "Integrated monetization features such as offerwalls and wallet balance management."
    ],
    liveLink: "https://play.google.com/store/apps/details?id=com.sixteenarena.app"
  },
  {
    title: "16Arena Shop",
    description: "E-commerce platform for gift cards, vouchers, and product checkout within the 16Arena ecosystem.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Razorpay",
      "Zustand",
      "Tailwind CSS",
      "Playwright"
    ],
    features: [
      "Built a production e-commerce storefront with real-time product catalogs, category browsing, and live inventory updates.",
      "Implemented end-to-end checkout with Razorpay payments, quote preview, multi-item cart, and buy-now flows.",
      "Developed order, invoice, and transaction management with downloadable invoices and gift card redemption.",
      "Architected a feature-driven Next.js app with secure auth (OTP + session), CSRF protection, and HttpOnly token handling.",
      "Optimized performance with ISR caching, image optimization, and SEO improvements for high-traffic shop pages.",
      "Covered critical purchase flows with Vitest unit tests and 138 Playwright E2E tests for reliable releases."
    ],
    liveLink: "https://shop.16arena.com"
  }
];

/** Flagship work shown on the home page (client, personal, company). */
export const homePreviewProjects: Project[] = [
  featuredProjects[1],
  featuredProjects[0],
  companyProjects[0],
];

const AUTO_SCROLL_MS = 5000;
const CAROUSEL_GAP = 24;

const ChevronIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    className={styles.scrollIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {direction === 'left' ? (
      <path d="M15 18l-6-6 6-6" />
    ) : (
      <path d="M9 18l6-6-6-6" />
    )}
  </svg>
);

function getCardsPerView(width: number) {
  if (width <= 768) return 1;
  if (width <= 1200) return 2;
  return 3;
}

const ProjectsSection = ({ title, subtitle, projects }: { title: string; subtitle: string; projects: Project[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = Math.max(0, projects.length - cardsPerView);
  const canScroll = maxIndex > 0;

  useEffect(() => {
    const updateCardsPerView = () => setCardsPerView(getCardsPerView(window.innerWidth));
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!canScroll || isPaused || cardsPerView === 1) return;

    const interval = setInterval(goNext, AUTO_SCROLL_MS);
    return () => clearInterval(interval);
  }, [canScroll, isPaused, cardsPerView, goNext]);

  const visibleCount = Math.min(cardsPerView, projects.length);
  const cardBasis = `calc((100% - ${(visibleCount - 1) * CAROUSEL_GAP}px) / ${visibleCount})`;
  const slideStep = `calc((100% - ${(cardsPerView - 1) * CAROUSEL_GAP}px) / ${cardsPerView} + ${CAROUSEL_GAP}px)`;
  const slideOffset = `calc(${currentIndex} * ${slideStep})`;

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
      </div>

      <div
        className={styles.carousel}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {canScroll && cardsPerView > 1 && (
          <button
            type="button"
            className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
            onClick={goPrev}
            aria-label="Previous projects"
          >
            <ChevronIcon direction="left" />
          </button>
        )}

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{
              transform: cardsPerView === 1 ? 'none' : `translateX(calc(-1 * ${slideOffset}))`,
              ['--cards-per-view' as string]: String(cardsPerView),
            }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={styles.cardSlide}
                style={{ flexBasis: cardBasis }}
              >
                <ProjectCard {...project} compact={cardsPerView > 1} />
              </div>
            ))}
          </div>
        </div>

        {canScroll && cardsPerView > 1 && (
          <button
            type="button"
            className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
            onClick={goNext}
            aria-label="Next projects"
          >
            <ChevronIcon direction="right" />
          </button>
        )}
      </div>

      {canScroll && cardsPerView > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FeaturedProjects = () => {
  return (
    <section id="projects" className={styles.projects}>
      <ProjectsSection
        title="Featured Projects"
        subtitle="Personal projects and experiments"
        projects={featuredProjects}
      />

      <ProjectsSection
        title="Company Projects"
        subtitle="Projects where I contributed as part of a team"
        projects={companyProjects}
      />
    </section>
  );
};

export default FeaturedProjects;
