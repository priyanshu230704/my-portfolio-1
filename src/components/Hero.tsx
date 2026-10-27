"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, motion, useInView } from 'framer-motion';
import TechMarquee from './TechMarquee';
import styles from './Hero.module.css';

const stats = [
  { value: 2.5, suffix: '+', label: 'Years building mobile apps' },
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
        const display = to % 1 !== 0 ? v.toFixed(1) : String(Math.round(v));
        node.textContent = `${display}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  const initial = to % 1 !== 0 ? `0.0${suffix}` : `0${suffix}`;
  return <span ref={ref}>{initial}</span>;
};

const Hero = () => {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.left}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.availability}
          >
            <span className={styles.availabilityDot} aria-hidden />
            Open to freelance, remote &amp; full-time roles
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.title}
          >
            Building products that
            <br />
            <span className={styles.accent}>stay reliable at scale.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.subtext}
          >
            I help startups and product teams ship full-stack features faster — Flutter apps, Django APIs, and React interfaces — built to keep working as usage grows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.ctas}
          >
            <Link href="/projects" className="btn btn-primary">View Projects</Link>
            <Link href="/resume" className="btn btn-outline">Resume</Link>
            <Link href="/#contact" className="btn btn-outline">Hire Me</Link>
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
                <div className={styles.dots} aria-hidden>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.fileName}>product_stack.dart</span>
                <span className={styles.headerSpacer} aria-hidden />
              </div>
              <div className={styles.codeContent}>
                <pre className={styles.codePre}>
{`class ProductStack {
  final String owner = 'Priyanshu';
  final stacks = [
    'Flutter', 'Django', 'React',
  ];

  Future<void> ship() async {
    await deploy(scalable: true);
  }
}`}
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
