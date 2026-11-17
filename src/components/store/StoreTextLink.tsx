'use client';

import { useRef, type FocusEvent, type PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { iconForApp } from '@/data/appIcons';
import { getStoreKind, storeLinkText, type StoreKind } from '@/lib/storeUrls';
import { AppStoreIcon, GooglePlayIcon } from './StoreBrandIcons';
import { inferAppName, useStoreHover } from './StoreHoverProvider';
import styles from './StoreHoverCard.module.css';

type StoreTextLinkProps = {
  href: string;
  children: string;
  appName?: string;
  icon?: string;
  className?: string;
  variant?: 'text' | 'icon';
};

export function StoreTextLink({
  href,
  children,
  appName,
  icon,
  className,
  variant = 'text',
}: StoreTextLinkProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const { show, hide, canHover } = useStoreHover();
  const kind = getStoreKind(href);
  const resolvedAppName = appName ?? inferAppName(children);
  const resolvedIcon = icon ?? iconForApp(resolvedAppName);

  const openPreview = (el: HTMLAnchorElement) => {
    if (!canHover || !kind) return;
    show({
      anchor: el,
      href,
      appName: resolvedAppName,
      icon: resolvedIcon,
      kind,
    });
  };

  const onEnter = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    openPreview(e.currentTarget);
  };

  const onLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (anchorRef.current) hide(anchorRef.current);
  };

  const onFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.matches(':focus-visible')) openPreview(e.currentTarget);
  };

  const onBlur = () => {
    if (anchorRef.current) hide(anchorRef.current);
  };

  const storeAria = (k: StoreKind) =>
    k === 'play' ? 'Get it on Google Play' : 'Download on the App Store';

  const linkClasses = [
    variant === 'icon' ? styles.storeIconBtn : styles.ext,
    variant === 'icon' && kind === 'apple' ? styles.appleIconTone : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content =
    variant === 'icon' && kind ? (
      kind === 'play' ? (
        <GooglePlayIcon size={22} />
      ) : (
        <AppStoreIcon size={22} />
      )
    ) : (
      <>
        {children}
        <ArrowUpRight className={styles.extIcon} aria-hidden />
      </>
    );

  if (!kind) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <a
      ref={anchorRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
      aria-label={
        variant === 'icon' ? `${storeAria(kind)} — ${resolvedAppName}` : undefined
      }
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {content}
    </a>
  );
}

export function storeLabelForHref(href: string): string {
  const kind = getStoreKind(href);
  return kind ? storeLinkText(kind) : '';
}