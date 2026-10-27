"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

const faqItems = [
  {
    question: 'How much experience do you have?',
    answer:
      'I have more than 2.5 years of hands-on experience building mobile applications with Flutter (Android & iOS), plus full-stack work with Django and React for APIs, admin panels, and production deployments.',
  },
  {
    question: 'What kind of work do you take on?',
    answer:
      'Full-stack product development: Flutter mobile apps, Django REST APIs, React web apps and admin panels, integrations (payments, auth, push), and AWS deployment. I work on greenfield builds and improving existing codebases.',
  },
  {
    question: 'Are you open to freelance, remote, and full-time roles?',
    answer:
      'Yes. I take on freelance and contract work remotely, and I am open to full-time remote roles where I can own features end to end.',
  },
  {
    question: 'Do you work remotely?',
    answer:
      'Yes. I work remotely with teams worldwide and am comfortable with async communication, standups, and shared tools (Git, Jira, Slack, etc.).',
  },
  {
    question: 'How do projects usually run?',
    answer:
      'We align on goals and scope, break work into milestones, and ship in iterations with regular check-ins. You get working software early, with room to adjust based on feedback.',
  },
  {
    question: 'How quickly do you reply?',
    answer:
      'I typically respond within 24 hours on weekdays. For active engagements we can agree on a communication cadence that fits your team.',
  },
  {
    question: 'How do we get started?',
    answer:
      'Reach out via email, LinkedIn, or WhatsApp with a short brief (problem, timeline, budget if you have one). We can schedule a call to see if it is a good fit.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.header}>
        <h2 className={styles.title}>FAQ</h2>
        <p className={styles.subtitle}>Common questions from clients and hiring teams.</p>
      </div>

      <ul className={styles.list}>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={item.question} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
              <button
                type="button"
                className={styles.question}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{item.question}</span>
                <ChevronDown className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} size={20} />
              </button>
              <div
                className={`${styles.answerPanel} ${isOpen ? styles.answerPanelOpen : ''}`}
                aria-hidden={!isOpen}
              >
                <div className={styles.answerInner}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FAQ;
