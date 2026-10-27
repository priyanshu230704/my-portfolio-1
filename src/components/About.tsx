import Image from 'next/image';
import styles from './About.module.css';

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Technologies Worked With", value: "10+" },
  { label: "Mobile app development", value: "2.5+ Years" }
];

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.sectionTitle}>Engineer who cares about the product, not just the code.</h2>
          <div className={styles.overview}>
            <p className={styles.overviewText}>
              I’m a Full Stack Developer with more than 2.5 years of hands-on experience building mobile applications, along with web backends and UIs using Flutter, Django, and React.
            </p>
          </div>
          <p className={styles.text}>
            I focus on solving practical problems — from streamlining business workflows to building real-time data-driven applications. For example, I built a custom invoice system that eliminated repetitive manual design work, reducing invoice generation time from minutes to seconds.
          </p>
          <p className={styles.text}>
            I’ve developed and deployed multiple production-ready applications, handling everything from UI development to backend APIs, database design, and cloud deployment.
          </p>
          <p className={styles.text}>
            My strength lies in building fast, reliable, and maintainable systems with clean architecture and a strong focus on user experience — not just writing code, but delivering usable products.
          </p>
          <p className={styles.text}>
            Currently, I’m looking for freelance or full-time opportunities where I can work on challenging problems, ship real products, and continue improving as an engineer.
          </p>
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
