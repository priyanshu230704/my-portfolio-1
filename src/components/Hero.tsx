"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, motion, useInView } from 'framer-motion';
import TechMarquee from './TechMarquee';
import styles from './Hero.module.css';

const stats = [
  { value: 2, suffix: '+', label: 'Years experience' },
  { value: 10, suffix: '+', label: 'Projects shipped' },
  { value: 5, suffix: '+', label: 'Mobile apps built' },
  { value: 138, suffix: '', label: 'E2E tests written' },
];

const CountUp = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const Hero = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.left}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.title}
          >
            Full Stack Developer building <span className={styles.accent}>scalable web & mobile applications</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.subtext}
          >
            I design and develop real-world products using Flutter, Django, and React — handling everything from backend APIs to responsive UI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.ctas}
          >
            <Link href="/projects" className="btn btn-primary">View Projects</Link>
            <Link href="/#contact" className="btn btn-outline">Contact Me</Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.right}
        >
          <div className={styles.visualContainer}>
            <div className={styles.codeEditor}>
              <div className={styles.editorHeader}>
                <div className={styles.dots}><span></span><span></span><span></span></div>
                <div className={styles.fileName}>developer.dart</div>
              </div>
              <div className={styles.codeContent}>
                <pre>
                  <code>
{`class Developer {
  final String name = 'Priyanshu';
  final List<String> skills = [
    'Flutter', 'React', 'Django'
  ];

  void buildProduct() {
    print('Creating something awesome...');
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
            <div className={styles.glow}></div>
          </div>
        </motion.div>
      </section>

      <div className={styles.statsWrap}>
        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statStripValue}>
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <span className={styles.statStripLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.stackSection}>
        <TechMarquee />
      </div>
    </>
  );
};

export default Hero;
