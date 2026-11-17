import type { ExperienceLink } from '@/data/experience';
import { iconForApp } from '@/data/appIcons';
import { getStoreKind, storeLinkText } from '@/lib/storeUrls';
import { StoreTextLink } from './StoreTextLink';
import styles from './StoreHoverCard.module.css';

type Props = {
  links: ExperienceLink[];
  webLinkClassName?: string;
};

function groupStoreLinks(links: ExperienceLink[]) {
  const storeLinks = links.filter((l) => getStoreKind(l.href));
  const groups = new Map<string, ExperienceLink[]>();

  for (const link of storeLinks) {
    const key = link.appName ?? link.href;
    const batch = groups.get(key) ?? [];
    batch.push(link);
    groups.set(key, batch);
  }

  return { storeGroups: [...groups.entries()], webLinks: links.filter((l) => !getStoreKind(l.href)) };
}

export function ExperienceStoreLinks({ links, webLinkClassName }: Props) {
  const { storeGroups, webLinks } = groupStoreLinks(links);
  const multiApp = storeGroups.length > 1;

  return (
    <>
      {storeGroups.map(([appName, group]) => (
        <p key={appName} className={styles.row}>
          {multiApp && appName && (
            <span className={styles.rowKey}>{appName}</span>
          )}
          <span className={styles.rowKey}>live on</span>
          {group.map((link) => {
            const kind = getStoreKind(link.href)!;
            return (
              <StoreTextLink
                key={link.href}
                href={link.href}
                appName={link.appName}
                icon={link.icon ?? iconForApp(link.appName ?? '')}
              >
                {storeLinkText(kind)}
              </StoreTextLink>
            );
          })}
        </p>
      ))}
      {webLinks.length > 0 && (
        <p className={styles.row}>
          {webLinks.map((link) => (
            <StoreTextLink
              key={link.href}
              href={link.href}
              className={webLinkClassName}
            >
              {link.label}
            </StoreTextLink>
          ))}
        </p>
      )}
    </>
  );
}