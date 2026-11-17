import WorkExperience from './WorkExperience';
import styles from './Experience.module.css';

const Experience = () => {
  return (
    <section id="experience" className={styles.experience}>
      <WorkExperience variant="home" />
    </section>
  );
};

export default Experience;