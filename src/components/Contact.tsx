import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>Have a project? Let&apos;s talk.</h2>
        <p className={styles.subtext}>
          I&apos;m available for freelance, remote, and full-time opportunities. 
          Feel free to reach out via any of the channels below.
        </p>
        
        <div className={styles.links}>
          <a href="mailto:priyanshuchavda999@gmail.com" className={styles.link}>
            <Mail size={24} />
            <span>Email Me</span>
          </a>
          <a href="https://www.linkedin.com/in/priyanshu-chavda" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <FaLinkedin size={24} />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/priyansuchavda" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <FaGithub size={24} />
            <span>GitHub</span>
          </a>
        </div>

        <div className={styles.cta}>
          <a href="mailto:priyanshuchavda999@gmail.com" className="btn btn-primary">Start a Conversation</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
