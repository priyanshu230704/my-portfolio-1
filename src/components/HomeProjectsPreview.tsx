"use client";

import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { homePreviewProjects } from './FeaturedProjects';
import styles from './HomeProjectsPreview.module.css';

const HomeProjectsPreview = () => {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Projects</h2>
        <Link href="/projects" className={styles.viewAll}>
          View all
        </Link>
      </div>
      <div className={styles.grid}>
        {homePreviewProjects.map((project) => (
          <ProjectCard key={project.title} {...project} compact />
        ))}
      </div>
    </section>
  );
};

export default HomeProjectsPreview;
