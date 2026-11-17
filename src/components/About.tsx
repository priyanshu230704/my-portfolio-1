import Image from 'next/image';
import styles from './About.module.css';

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies Worked With", value: "10+" },
  { label: "Mobile app development", value: "2.5+ Years" },
];

const rightNow = [
  {
    label: "Building",
    text: "Esports and commerce products at 16Arena Labs — Flutter apps, Django APIs, and the React admin panel.",
  },
  {
    label: "Client work",
    text: "DiscountBuddy — restaurant deals, QR flows, and AWS production for a live Play Store app.",
  },
  {
    label: "Open to",
    text: "Remote freelance contracts and full-time roles where I can own features end to end.",
  },
  {
    label: "Interested in",
    text: "Small teams shipping real products — mobile, APIs, payments, and whatever breaks that week.",
  },
];

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>about</p>
          <h2 className={styles.sectionTitle}>
            Engineer who cares about the product, not just the code.
          </h2>
          <div className={styles.overview}>
            <p className={styles.overviewText}>
              I&apos;m a full-stack developer with more than 2.5 years shipping mobile
              apps — plus Django backends and React UIs that stay usable after launch.
            </p>
          </div>
          <p className={styles.text}>
            I care more about whether we&apos;re solving the right problem than about
            which framework badge goes on the slide. I&apos;ll tell you early if a
            timeline is tight or a scope needs cutting — I&apos;d rather reset on day
            one than ship the wrong thing on time.
          </p>
          <p className={styles.text}>
            I&apos;ve taken products from rough prototypes to production: Play Store
            releases, payment flows, admin tools, and the boring work that keeps them
            running (deployments, auth, monitoring-minded fixes).
          </p>

          <div className={styles.rightNow}>
            <h3 className={styles.rightNowTitle}>Right now</h3>
            <div className={styles.rightNowGrid}>
              {rightNow.map((item) => (
                <div key={item.label} className={styles.rightNowItem}>
                  <span className={styles.rightNowLabel}>{item.label}</span>
                  <p className={styles.rightNowText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <span className={styles.statNumber}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.profileWrapper}>
            <Image
              src="/me.png"
              alt="Priyanshu Chavda"
              width={400}
              height={400}
              className={styles.profileImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;