import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/siteConfig';

const shareUrl = encodeURIComponent(SITE_URL);
const shareText = encodeURIComponent(`${SITE_TAGLINE} — ${SITE_NAME}`);

const SHARE_TARGETS = [
  {
    label: 'X',
    href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
  },
  {
    label: 'Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
  },
];

export function ShareButtons({
  heading = 'Share',
  label = `Share ${SITE_NAME}`,
}: {
  heading?: string;
  label?: string;
}) {
  return (
    <nav className="share-buttons" aria-label={label}>
      <span className="share-buttons__label">{heading}</span>
      <ul>
        {SHARE_TARGETS.map((target) => (
          <li key={target.label}>
            <a
              href={target.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share this page on ${target.label}`}
            >
              {target.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ShareButtons;
