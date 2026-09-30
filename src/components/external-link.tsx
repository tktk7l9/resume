import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /**
   * Localized "(opens in a new tab)". Spoken after the link text, or folded
   * into aria-label for icon-only links, so leaving the page is never a
   * surprise (SHIG 4, 7, 94).
   */
  newTabHint?: string;
}

export function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
  newTabHint,
}: ExternalLinkProps) {
  const label =
    ariaLabel && newTabHint ? `${ariaLabel}${newTabHint}` : ariaLabel;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {children}
      {newTabHint && !ariaLabel && (
        <span className="sr-only">{newTabHint}</span>
      )}
    </a>
  );
}
