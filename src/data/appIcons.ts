/** Local app icons for store hover cards (sourced from App Store artwork). */
export const APP_ICONS: Record<string, string> = {
  '16Score': '/store-icons/16score.jpg',
  '16Arena': '/store-icons/16arena.jpg',
  DiscountBuddy: '/store-icons/discountbuddy.jpg',
  'DiscountBuddy (Client Project)': '/store-icons/discountbuddy.jpg',
};

export function iconForApp(appName: string): string | undefined {
  return APP_ICONS[appName];
}