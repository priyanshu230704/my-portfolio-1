import WorkExperience from '@/components/WorkExperience';
import styles from './work.module.css';

export const metadata = {
  title: 'Work | Priyanshu Chavda',
  description:
    'Where I have worked, what I built, and what I learned — full stack with Flutter, Django, and React.',
};

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <WorkExperience variant="full" />
    </div>
  );
}