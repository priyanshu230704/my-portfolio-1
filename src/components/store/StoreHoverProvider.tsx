'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  getStoreKind,
  storeWhereLabel,
  type StoreKind,
} from '@/lib/storeUrls';
import styles from './StoreHoverCard.module.css';

export type StoreHoverTarget = {
  anchor: HTMLElement;
  href: string;
  appName: string;
  icon?: string;
  kind: StoreKind;
};

type Phase = 'hidden' | 'visible' | 'loading' | 'done';

type StoreHoverContextValue = {
  show: (target: StoreHoverTarget) => void;
  hide: (anchor: HTMLElement) => void;
  canHover: boolean;
};

const StoreHoverContext = createContext<StoreHoverContextValue | null>(null);

function initialBtnLabel(kind: StoreKind) {
  return kind === 'apple' ? 'GET' : 'Install';
}

function loadingBtnLabel(kind: StoreKind) {
  return kind === 'apple' ? '' : 'Installing';
}

function doneBtnLabel(kind: StoreKind) {
  return kind === 'apple' ? 'OPEN' : 'Open';
}

function positionCard(card: HTMLDivElement, anchor: HTMLElement) {
  const rect = anchor.getBoundingClientRect();
  const width = card.offsetWidth;
  const height = card.offsetHeight;
  const left = Math.max(
    12,
    Math.min(window.innerWidth - width - 12, rect.left + rect.width / 2 - width / 2),
  );
  const showAbove = rect.top - height - 10 > 64;
  const top = showAbove ? rect.top - height - 10 : rect.bottom + 10;
  card.style.left = `${left}px`;
  card.style.top = `${top}px`;
  card.style.transformOrigin = `${rect.left + rect.width / 2 - left}px ${
    showAbove ? '100%' : '0%'
  }`;
}

export function StoreHoverProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [target, setTarget] = useState<StoreHoverTarget | null>(null);
  const [phase, setPhase] = useState<Phase>('hidden');
  const [btnLabel, setBtnLabel] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const activeAnchorRef = useRef<HTMLElement | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const hide = useCallback(
    (anchor: HTMLElement) => {
      if (activeAnchorRef.current !== anchor) return;
      activeAnchorRef.current = null;
      clearTimers();
      setPhase('hidden');
      setTarget(null);
    },
    [clearTimers],
  );

  const show = useCallback(
    (next: StoreHoverTarget) => {
      clearTimers();
      activeAnchorRef.current = next.anchor;
      setTarget(next);
      setPhase('visible');
      setBtnLabel(initialBtnLabel(next.kind));

      timersRef.current.push(
        setTimeout(() => {
          if (activeAnchorRef.current !== next.anchor) return;
          setPhase('loading');
          setBtnLabel(loadingBtnLabel(next.kind));
        }, 600),
      );

      timersRef.current.push(
        setTimeout(() => {
          if (activeAnchorRef.current !== next.anchor) return;
          setPhase('done');
          setBtnLabel(doneBtnLabel(next.kind));
        }, 2050),
      );
    },
    [clearTimers],
  );

  useEffect(() => {
    setMounted(true);
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!target || !cardRef.current) return;
    const card = cardRef.current;
    const anchor = target.anchor;
    const frame = requestAnimationFrame(() => {
      positionCard(card, anchor);
    });
    return () => cancelAnimationFrame(frame);
  }, [target, phase]);

  useEffect(() => {
    const onScroll = () => {
      if (activeAnchorRef.current) hide(activeAnchorRef.current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hide]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const card =
    mounted && target ? (
      <div
        ref={cardRef}
        className={[
          styles.card,
          phase !== 'hidden' ? styles.cardVisible : '',
          target.kind === 'play' ? styles.cardPlay : styles.cardApple,
          phase === 'loading' ? styles.cardLoading : '',
          phase === 'done' ? styles.cardDone : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden
      >
        <span className={styles.icon}>
          {target.icon ? (
            <Image
              src={target.icon}
              alt=""
              width={44}
              height={44}
              unoptimized
            />
          ) : (
            <span className={styles.iconFallback}>
              {target.appName.charAt(0).toUpperCase()}
            </span>
          )}
        </span>
        <span className={styles.text}>
          <b className={styles.name}>{target.appName}</b>
          <span className={styles.where}>
            {storeWhereLabel(target.kind)}
          </span>
        </span>
        <span className={styles.btn}>
          {target.kind === 'play' && <i className={styles.track} aria-hidden />}
          {btnLabel ? (
            <span className={styles.btnLabel} key={btnLabel}>
              {btnLabel}
            </span>
          ) : null}
          {target.kind === 'apple' && (
            <svg className={styles.ring} viewBox="0 0 28 28" aria-hidden>
              <circle cx="14" cy="14" r="11.5" />
              <circle
                className={styles.ringFill}
                cx="14"
                cy="14"
                r="11.5"
              />
              <rect
                className={styles.ringSquare}
                x="10.5"
                y="10.5"
                width="7"
                height="7"
                rx="1.5"
              />
            </svg>
          )}
        </span>
      </div>
    ) : null;

  return (
    <StoreHoverContext.Provider value={{ show, hide, canHover }}>
      {children}
      {mounted ? createPortal(card, document.body) : null}
    </StoreHoverContext.Provider>
  );
}

export function useStoreHover() {
  const ctx = useContext(StoreHoverContext);
  if (!ctx) {
    throw new Error('useStoreHover must be used within StoreHoverProvider');
  }
  return ctx;
}

export function inferAppName(label: string): string {
  return label
    .replace(/\s+on\s+play\s+store/gi, '')
    .replace(/\s+on\s+app\s+store/gi, '')
    .replace(/live\s+on\s+/gi, '')
    .replace(/play\s+store/gi, '')
    .replace(/app\s+store/gi, '')
    .trim();
}