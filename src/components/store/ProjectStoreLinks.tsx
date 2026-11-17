'use client';

import { iconForApp } from '@/data/appIcons';
import { StoreTextLink, storeLabelForHref } from './StoreTextLink';
import cardStyles from '../ProjectCard.module.css';
import styles from './StoreHoverCard.module.css';

type ProjectStoreLinksProps = {
  appName: string;
  playStore?: string;
  appStore?: string;
  icon?: string;
};

export function ProjectStoreLinks({
  appName,
  playStore,
  appStore,
  icon,
}: ProjectStoreLinksProps) {
  const resolvedIcon = icon ?? iconForApp(appName);

  if (!playStore && !appStore) return null;

  const textLink = (href: string) => (
    <StoreTextLink
      key={href}
      href={href}
      appName={appName}
      icon={resolvedIcon}
      className={cardStyles.storeTextLink}
    >
      {storeLabelForHref(href)}
    </StoreTextLink>
  );

  const links = [playStore, appStore].filter(Boolean) as string[];

  return (
    <div className={cardStyles.storeWrap} role="group" aria-label="App stores">
      <span className={styles.rowKey}>live on</span>
      {links.map(textLink)}
    </div>
  );
}