export type StoreKind = 'play' | 'apple';

export function isPlayStoreUrl(href: string): boolean {
  try {
    return new URL(href).hostname === 'play.google.com';
  } catch {
    return href.includes('play.google.com');
  }
}

export function isAppStoreUrl(href: string): boolean {
  try {
    const host = new URL(href).hostname;
    return host === 'apps.apple.com' || host === 'itunes.apple.com';
  } catch {
    return /apps\.apple\.com|itunes\.apple\.com/.test(href);
  }
}

export function getStoreKind(href: string): StoreKind | null {
  if (isPlayStoreUrl(href)) return 'play';
  if (isAppStoreUrl(href)) return 'apple';
  return null;
}

export function storeLinkText(kind: StoreKind): string {
  return kind === 'play' ? 'play store' : 'app store';
}

export function storeWhereLabel(kind: StoreKind): string {
  return kind === 'play' ? 'Google Play' : 'App Store';
}