import styles from './Experience.module.css';

type ExperienceItem = {
  role: string;
  company: string;
  startDate: string; // YYYY-MM
  endDate: string | null; // YYYY-MM or null for Present
  achievements: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "16Arena Labs",
    startDate: "2025-08",
    endDate: null,
    achievements: [
      "Developed 16Arena, a Flutter-based esports tournament platform featuring real-time chat, push notifications, and integrated team and organization workflows",
      "Built 16TMS, a tournament management system for organizing and managing esports tournaments across multiple games",
      "Developed 16Arena Shop, an inventory management and e-commerce system integrated with the Flutter application and web storefront using a third-party provider SDK",
      "Integrated Razorpay payment processing, implementing end-to-end cart, checkout, and invoice generation workflows",
      "Developed a React.js admin panel to manage platform operations and interconnected data across organizations, teams, and users",
      "Continued development of 16Score, an esports platform for live scores and match statistics, following its acquisition by 16Arena Labs"
    ]
  },
  {
    role: "Full Stack Developer",
    company: "DiscountBuddy (Client Project)",
    startDate: "2025-12",
    endDate: null,
    achievements: [
      "Developed Discount Buddy, a restaurant discovery and live deals platform featuring QR-based offer redemption, table reservations, and real-time deal updates.",
      "Built and integrated Flutter application features with Django REST APIs, implementing role-based authentication and restaurant management dashboards backed by PostgreSQL.",
      "Managed AWS production deployment and server maintenance, including application updates, service configuration, and production troubleshooting"
    ]
  },
  {
    role: "Full Stack Developer",
    company: "Bluexkye Softwares",
    startDate: "2025-02",
    endDate: "2025-08",
    achievements: [
      "Worked with React, Django, MySQL, and PostgreSQL to build web applications",
      "Developed frontend components, backend APIs, and database models",
      "Gained experience in REST API integration and full-stack development workflows",
      "Contributed to 16Score, an esports platform providing live scores and match statistics",
      "Developed end-to-end features for live score updates, match stats, and complex API integrations",
      "Improved UI responsiveness and backend application performance"
    ]
  }
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseYearMonth(value: string) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function formatMonthYear(value: string) {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

function formatDurationLength(startDate: string, endDate: string | null) {
  const start = parseYearMonth(startDate);
  const end = endDate
    ? parseYearMonth(endDate)
    : { year: new Date().getFullYear(), month: new Date().getMonth() + 1 };

  let totalMonths = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
  }
  if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  }
  return `${months} mo${months > 1 ? "s" : ""}`;
}

function formatDuration(startDate: string, endDate: string | null) {
  const startLabel = formatMonthYear(startDate);
  const endLabel = endDate ? formatMonthYear(endDate) : "Present";
  const length = formatDurationLength(startDate, endDate);
  return `${startLabel} – ${endLabel} · ${length}`;
}

const Experience = () => {
  return (
    <section id="experience" className={styles.experience}>
      <h2 className={styles.sectionTitle}>Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((exp, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.dot}></div>
            <div className={styles.content}>
              <div className={styles.header}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.duration}>
                  {formatDuration(exp.startDate, exp.endDate)}
                </span>
              </div>
              <h4 className={styles.company}>{exp.company}</h4>
              <ul className={styles.achievements}>
                {exp.achievements.map((item, iIndex) => (
                  <li key={iIndex}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
