'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ReleaseHealth } from '@/data/experience';
import styles from './ReleaseHealthChart.module.css';

const Y_TICKS = [90, 95, 100] as const;
const Y_MIN = 88;
const Y_MAX = 100;
const PAD_LEFT = 30;
const PAD_RIGHT = 14;
const PAD_TOP = 18;
const PAD_BOTTOM = 30;

type ReleaseHealthChartProps = {
  health: ReleaseHealth;
};

export function ReleaseHealthChart({ health }: ReleaseHealthChartProps) {
  const { points } = health;
  const plotRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 400, h: 150 });
  const [active, setActive] = useState<number | null>(null);
  const tableId = useId();

  useEffect(() => {
    const el = plotRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const xAt = useCallback(
    (i: number) => {
      const span = size.w - PAD_LEFT - PAD_RIGHT;
      return PAD_LEFT + span * (i / Math.max(1, points.length - 1));
    },
    [size.w, points.length],
  );

  const yAt = useCallback(
    (value: number) => {
      const span = size.h - PAD_TOP - PAD_BOTTOM;
      return PAD_TOP + span * (1 - (value - Y_MIN) / (Y_MAX - Y_MIN));
    },
    [size.h],
  );

  const polyline = points.map((p, i) => `${xAt(i)},${yAt(p.crashFreeUsers)}`).join(' ');
  const last = points.length - 1;
  const hitW = (size.w - PAD_LEFT - PAD_RIGHT) / Math.max(1, points.length);

  return (
    <figure className={styles.health} aria-labelledby={`${tableId}-caption`}>
      <figcaption id={`${tableId}-caption`} className={styles.caption}>
        <span className={styles.eyebrow}>{health.eyebrow}</span>
        <p className={styles.summary}>{health.summary}</p>
      </figcaption>

      <div className={styles.plot} ref={plotRef}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${size.w} ${size.h}`}
          role="img"
          aria-label="Crash-free users by app release"
        >
          {Y_TICKS.map((tick) => (
            <g key={tick}>
              <line
                className={styles.grid}
                x1={PAD_LEFT}
                x2={size.w - PAD_RIGHT}
                y1={yAt(tick)}
                y2={yAt(tick)}
              />
              <text
                className={styles.yTick}
                x={PAD_LEFT - 6}
                y={yAt(tick) + 3}
                textAnchor="end"
              >
                {tick}%
              </text>
            </g>
          ))}

          <polyline className={styles.line} points={polyline} />

          {points.map((p, i) => (
            <g key={p.version}>
              <text
                className={styles.xTick}
                x={xAt(i)}
                y={size.h - 8}
                textAnchor="middle"
              >
                {p.version}
              </text>
              <circle
                className={`${styles.dot} ${active === i ? styles.dotOn : ''}`}
                cx={xAt(i)}
                cy={yAt(p.crashFreeUsers)}
                r={active === i ? 6 : 4.5}
              />
              {(i === 0 || i === last) && (
                <text
                  className={styles.val}
                  x={xAt(i)}
                  y={yAt(p.crashFreeUsers) - 11}
                  textAnchor={i === 0 ? 'start' : 'middle'}
                >
                  {Math.round(p.crashFreeUsers)}%
                </text>
              )}
              <rect
                className={styles.hit}
                x={xAt(i) - hitW / 2}
                y={0}
                width={hitW}
                height={size.h}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={`${p.version}, ${p.dateLabel}, ${p.crashFreeUsers}% crash-free users`}
              />
            </g>
          ))}
        </svg>

        {active !== null && points[active] && (
          <div
            className={`${styles.tip} ${styles.tipOn}`}
            style={{
              left: Math.min(
                Math.max(xAt(active), 90),
                size.w - 90,
              ),
              top: yAt(points[active].crashFreeUsers),
            }}
          >
            <b>{points[active].version}</b> · {points[active].dateLabel}
            <br />
            {points[active].crashFreeUsers}% crash-free users
            <br />
            {points[active].crashFreeSessions}% crash-free sessions
          </div>
        )}
      </div>

      <p className={styles.note}>{health.note}</p>

      <table className={styles.srOnly}>
        <caption>{health.eyebrow}</caption>
        <thead>
          <tr>
            <th scope="col">Release</th>
            <th scope="col">Date</th>
            <th scope="col">Crash-free users</th>
            <th scope="col">Crash-free sessions</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.version}>
              <td>{p.version}</td>
              <td>{p.dateLabel}</td>
              <td>{p.crashFreeUsers}%</td>
              <td>{p.crashFreeSessions}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}