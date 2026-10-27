import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>&copy; {new Date().getFullYear()} Priyanshu Chavda. All rights reserved.</p>
        </div>
        <div className={styles.right}>
          <ul className={styles.links}>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/#skills">Skills</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/resume">Resume</a></li>
            <li><a href="/#faq">FAQ</a></li>
            <li><a href="/#contact">Hire Me</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
