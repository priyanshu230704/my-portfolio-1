'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { workExperiences, type WorkExperience } from '@/data/experience';
import { formatRangeShort } from '@/lib/experienceFormat';
import { ExperienceStoreLinks } from './store/ExperienceStoreLinks';
import { ReleaseHealthChart } from './ReleaseHealthChart';
import styles from './WorkExperience.module.css';

type WorkExperienceProps = {
  variant?: 'home' | 'full';
};

function padIndex(index: number) {
  return String(index + 1).padStart(2, '0');
}

function StatusBadge({ status }: { status?: WorkExperience['status'] }) {
  if (!status) return null;
  const label =
    status === 'working' ? 'Working' : status === 'client' ? 'Client' : 'Past';
  return <span className={styles.badge}>{label}</span>;
}

function RoleContent({
  exp,
  variant,
}: {
  exp: WorkExperience;
  variant: 'home-preview' | 'full';
}) {
  const isPreview = variant === 'home-preview';

  return (
    <div className={styles.panelInner}>
      {exp.tldr && (
        <div className={styles.tldrWrap}>
          <p className={styles.tldrLabel}>tl;dr</p>
          <p className={`${styles.tldr} ${styles.workProse}`}>{exp.tldr}</p>
        </div>
      )}

      {!exp.tldr && exp.narrative && (
        <p className={`${styles.narrative} ${styles.workProse}`}>{exp.narrative}</p>
      )}

      {exp.links && exp.links.length > 0 && (
        <ExperienceStoreLinks links={exp.links} />
      )}

      {exp.achievements.length > 0 && !isPreview && (
        <div className={styles.longSection}>
          {exp.tldr && <p className={styles.longLabel}>What I shipped</p>}
          <ul className={`${styles.list} ${styles.workProse}`}>
            {exp.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {variant === 'full' && exp.releaseHealth && (
        <ReleaseHealthChart health={exp.releaseHealth} />
      )}

      {exp.achievements.length > 0 && isPreview && (
        <ul className={`${styles.list} ${styles.workProse}`}>
          {exp.achievements.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {exp.narrative && exp.tldr && variant === 'full' && (
        <p className={`${styles.narrativeFooter} ${styles.workProse}`}>
          {exp.narrative}
        </p>
      )}

      {exp.narrative && !exp.tldr && variant === 'home-preview' && (
        <p className={`${styles.narrativeFooter} ${styles.workProse}`}>
          {exp.narrative}
        </p>
      )}
    </div>
  );
}

function HomeExperienceList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <div className={styles.homeHeader}>
        <h2 className={styles.sectionHeading}>Experience</h2>
        <p className={styles.intro}>
          Tap a role to expand. Full timeline on{' '}
          <Link href="/work" className={styles.inlineLink}>
            work
          </Link>
          .
        </p>
      </div>

      <ol className={styles.accList}>
        {workExperiences.map((exp, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={`${exp.company}-${exp.startDate}`} className={styles.accItem}>
              <button
                type="button"
                className={`${styles.accTrigger} ${isOpen ? styles.accTriggerOpen : ''}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className={styles.accNum}>{padIndex(index)}</span>
                <span className={styles.accTitleBlock}>
                  <span className={styles.accCompanyRow}>
                    <span className={styles.accCompany}>{exp.company}</span>
                    <StatusBadge status={exp.status} />
                  </span>
                  <span className={styles.accRole}>{exp.role}</span>
                </span>
                <span className={styles.accDates}>
                  {formatRangeShort(exp.startDate, exp.endDate)}
                </span>
                <ChevronDown
                  size={18}
                  className={`${styles.accChevron} ${isOpen ? styles.accChevronOpen : ''}`}
                />
              </button>
              <div
                className={`${styles.accPanel} ${isOpen ? styles.accPanelOpen : ''}`}
                aria-hidden={!isOpen}
              >
                <RoleContent
                  exp={exp}
                  variant={index === 0 ? 'home-preview' : 'home-preview'}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <p className={styles.allWork}>
        That&apos;s the work so far.{' '}
        <Link href="/work" className={styles.allWorkLink}>
          All my work →
        </Link>
      </p>
    </>
  );
}

function FullWorkPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>priyansu / work</p>
        <h1 className={styles.pageTitle}>work</h1>
        <p className={styles.lead}>
          Where I&apos;ve worked, what I built there, and what I picked up along the way.
        </p>
      </header>

      <ol className={styles.fullList}>
        {workExperiences.map((exp, index) => (
          <li key={`${exp.company}-${exp.startDate}`} className={styles.fullItem}>
            <div className={styles.fullHead}>
              <span className={styles.accNum}>{padIndex(index)}</span>
              <div className={styles.fullHeadText}>
                <div className={styles.companyRow}>
                  <h2 className={styles.company}>{exp.company}</h2>
                  <StatusBadge status={exp.status} />
                </div>
                <p className={styles.roleTitle}>{exp.role}</p>
                <p className={styles.metaInline}>
                  {exp.location && `${exp.location} · `}
                  {formatRangeShort(exp.startDate, exp.endDate)}
                </p>
              </div>
            </div>
            <RoleContent exp={exp} variant="full" />
          </li>
        ))}
      </ol>

      <p className={styles.allWork}>
        That&apos;s the work so far.{' '}
        <Link href="/projects" className={styles.allWorkLink}>
          See projects →
        </Link>
      </p>

      <p className={styles.outro}>
        Questions?{' '}
        <Link href="/#contact" className={styles.inlineLink}>
          Say hi
        </Link>
        .
      </p>
    </>
  );
}

const WorkExperience = ({ variant = 'full' }: WorkExperienceProps) => {
  return (
    <div className={styles.wrap}>
      {variant === 'home' ? <HomeExperienceList /> : <FullWorkPage />}
    </div>
  );
};

export default WorkExperience;