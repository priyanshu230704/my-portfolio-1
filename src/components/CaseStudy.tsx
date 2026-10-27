import Image from 'next/image';
import Link from 'next/link';
import styles from './CaseStudy.module.css';

const highlights = [
  {
    label: 'Problem',
    text: 'Owners recreated invoices in Canva or Word every time — slow, inconsistent branding, and calculation mistakes.',
  },
  {
    label: 'Solution',
    text: 'InvoiceGen with reusable templates, saved business details, and one-tap PDF export built in Flutter.',
  },
  {
    label: 'Outcome',
    text: 'Invoice creation dropped from minutes to seconds with consistent, client-ready documents.',
  },
];

const metrics = [
  { value: 'Minutes → sec', label: 'Creation time' },
  { value: '100%', label: 'Branding consistency' },
  { value: 'Flutter', label: 'Cross-platform' },
];

const CaseStudy = () => {
  return (
    <section className={styles.section} aria-labelledby="case-study-title">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Case study</p>
            <h2 id="case-study-title" className={styles.title}>InvoiceGen</h2>
            <p className={styles.summary}>
              Automating invoice creation for small businesses that were stuck in manual design workflows.
            </p>
          </div>
          <Link href="/projects" className={styles.link}>
            All projects →
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <div className={styles.cards}>
              {highlights.map((item) => (
                <article key={item.label} className={styles.card}>
                  <h3 className={styles.cardLabel}>{item.label}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </article>
              ))}
            </div>

            <div className={styles.metrics}>
              {metrics.map((m) => (
                <div key={m.label} className={styles.metric}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.stack}>
              <span className={styles.stackLabel}>Stack</span>
              Flutter · PDF generation · Custom UI
            </p>
          </div>

          <div className={styles.visual}>
            <div className={styles.frame}>
              <Image
                src="/invoice-gen-case-study.png"
                alt="InvoiceGen app screens"
                width={600}
                height={600}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
