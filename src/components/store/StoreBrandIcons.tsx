type IconProps = {
  size?: number;
  className?: string;
};

/** Official-style multicolor Google Play mark */
export function GooglePlayIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path
        fill="#00C1FF"
        d="M3.6 1.8c-.3.2-.6.6-.6 1.1v17.9c0 .5.3.9.6 1.1l.1.1 9.5-9.5V11L3.7 1.7l-.1.1z"
      />
      <path
        fill="#FFE000"
        d="M16.8 13.2 6.5 23.5l.2.2c.5.4 1.2.5 1.9.1l11.1-6.4-2.9-4.2z"
      />
      <path
        fill="#FF3A44"
        d="M19.4 10.8 16.8 13.2l2.6 2.5 3.4-2c.7-.4 1.1-1 1.1-1.7s-.4-1.4-1.1-1.8l-3.4-1.4z"
      />
      <path
        fill="#32A071"
        d="M6.5.5 16.8 10.8l2.6-1.5c.8-.5 1.3-1.2 1.3-2s-.5-1.5-1.3-2L8.4.2C7.7-.2 7-.1 6.5.3l-.2.2z"
      />
    </svg>
  );
}

/** App Store mark (Apple silhouette) — theme neutral, not tinted blue */
export function AppStoreIcon({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M17.05 12.53c-.02-2.17 1.77-3.21 1.85-3.27-1.01-1.47-2.58-1.67-3.14-1.7-1.34-.14-2.62.79-3.3.79-.69 0-1.76-.77-2.89-.75-1.49.02-2.87.87-3.64 2.21-1.55 2.7-.4 6.69 1.11 8.88.74 1.07 1.62 2.27 2.78 2.23 1.12-.05 1.54-.72 2.89-.72 1.35 0 1.73.72 2.92.7 1.21-.02 1.98-1.08 2.71-2.16 1.08-1.57 1.52-3.09 1.55-3.16-.04-.02-2.98-1.14-3.01-4.52.02-1.14.89-2.12 1.87-2.65-.81-1.15-2.06-1.28-2.52-1.3zm-2.85-6.2c.62-.75 1.04-1.8.92-2.84-.89.04-1.97.59-2.61 1.34-.57.66-1.07 1.73-.94 2.75 1 .08 2.01-.51 2.63-1.25z"
      />
    </svg>
  );
}