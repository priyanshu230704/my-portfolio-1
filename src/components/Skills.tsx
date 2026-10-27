import styles from './Skills.module.css';

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Bootstrap",
      "Responsive UI"
    ]
  },
  {
    title: "Mobile Development",
    skills: [
      "Flutter",
      "Dart",
      "Android",
      "iOS",
      "State Management (GetX / Provider)"
    ]
  },
  {
    title: "Backend Development",
    skills: [
      "Python",
      "Django",
      "Django REST Framework",
      "PHP",
      "Laravel",
      "REST APIs"
    ]
  },
  {
    title: "Databases",
    skills: [
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Firebase Firestore"
    ]
  },
  {
    title: "Cloud & Deployment",
    skills: [
      "AWS",
      "Firebase",
      "Play Store Deployment",
      "App Store Deployment",
      "Push Notifications"
    ]
  },
];

type SkillsProps = {
  /** Extra top spacing when this is the dedicated /skills route */
  page?: boolean;
};

const Skills = ({ page = false }: SkillsProps) => {
  return (
    <section id="skills" className={`${styles.skills} ${page ? styles.page : ''}`}>
      <div className={styles.header}>
        <p className={styles.subtitle}>Technologies I use to ship apps</p>
        <h2 className={styles.sectionTitle}>Skills</h2>
      </div>
      
      <div className={styles.skillsGrid}>
        {skillCategories.map((category, index) => (
          <div key={index} className={styles.skillColumn}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.skillList}>
              {category.skills.map((skill, sIndex) => (
                <li key={sIndex} className={styles.skillItem}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
