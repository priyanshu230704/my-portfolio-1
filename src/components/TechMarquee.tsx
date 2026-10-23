import {
  SiAndroid,
  SiDart,
  SiDjango,
  SiFirebase,
  SiFlutter,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import styles from './TechMarquee.module.css';

const tech = [
  { name: 'Flutter', Icon: SiFlutter },
  { name: 'Dart', Icon: SiDart },
  { name: 'Django', Icon: SiDjango },
  { name: 'Python', Icon: SiPython },
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Prisma', Icon: SiPrisma },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'AWS', Icon: FaAws },
  { name: 'Kotlin', Icon: SiKotlin },
  { name: 'Android', Icon: SiAndroid },
  { name: 'Tailwind', Icon: SiTailwindcss },
];

const TechMarquee = () => (
  <div className={styles.marquee} aria-label="Technologies I work with">
    <div className={styles.track}>
      {[0, 1].map((copy) => (
        <ul key={copy} className={styles.group} aria-hidden={copy === 1}>
          {tech.map(({ name, Icon }) => (
            <li key={name} className={styles.item}>
              <Icon size={20} />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default TechMarquee;
