import Link from 'next/link';
import { ShareButtons } from './ShareButtons';
import {
  CONTACT_EMAIL,
  POSTAL_ADDRESS,
  SITE_NAME,
  SOCIAL_PROFILES,
} from '@/lib/siteConfig';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {/* Col 1: Brand & Mission */}
          <div className="site-footer__brand-col">
            <Link href="/" className="brand" title={`${SITE_NAME} home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon1-34.png"
                srcSet="/icon1-34.png 1x, /icon1-68.png 2x"
                alt="CivicPass logo"
                width={34}
                height={34}
                className="brand__logo"
                loading="eager"
                decoding="async"
              />
              <span className="brand__wordmark">
                Civic<em>Pass</em>
              </span>
            </Link>
            <p>
              Independent educational platform helping future citizens pass their
              naturalization exams with verified handbook explanations, authentic mock
              exams, and oral interview practice.
            </p>
            <div className="site-footer__badges">
              <span className="footer-tag">Official Standards</span>
              <span className="footer-tag">Privacy-First</span>
              <span className="footer-tag">100% Free Core Prep</span>
            </div>

            {SOCIAL_PROFILES.length > 0 && (
              <ul className="site-footer__social" aria-label="CivicPass profiles">
                {SOCIAL_PROFILES.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`${SITE_NAME} on ${profile.label}`}
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Col 2: Exam Tracks */}
          <div>
            <h3>Exam Tracks</h3>
            <ul>
              <li>
                <Link href="/test/us" title="US civics interview practice">
                  🇺🇸 US civics interview
                </Link>
              </li>
              <li>
                <Link href="/test/uk" title="Life in the UK test practice">
                  🇬🇧 Life in the UK test
                </Link>
              </li>
              <li>
                <Link href="/test/ca" title="Discover Canada practice test">
                  🇨🇦 Discover Canada
                </Link>
              </li>
              <li>
                <Link href="/test/au" title="Our Common Bond practice test">
                  🇦🇺 Our Common Bond
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Study Resources */}
          <div>
            <h3>Study Resources</h3>
            <ul>
              <li>
                <Link href="/#tracks">Exam Tracks</Link>
              </li>
              <li>
                <Link href="/#exam-guides">Track Breakdown</Link>
              </li>
              <li>
                <Link href="/#practice">Mock Exam Simulator</Link>
              </li>
              <li>
                <Link href="/#study-guide">Free Study Guide</Link>
              </li>
              <li>
                <Link href="/#sources">Official Sources</Link>
              </li>
              <li>
                <Link href="/#faq">Exam FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Support */}
          <div>
            <h3>About &amp; Support</h3>
            <ul>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/editorial-policy">Editorial Policy</Link>
              </li>
              <li>
                <Link href="/about-us#methodology">Review Methodology</Link>
              </li>
              <li>
                <Link href="/contact-us#feedback">Submit Corrections</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Policies */}
          <div>
            <h3>Legal &amp; Policies</h3>
            <ul>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy#gdpr">GDPR &amp; CCPA Rights</Link>
              </li>
              <li>
                <Link href="/terms-conditions#disclaimer">Statutory Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="site-footer__bottom">
          <div className="site-footer__bottom-left">
            <span>© 2026 CivicPass. Built for future citizens.</span>
            {POSTAL_ADDRESS ? (
              <address className="site-footer__address">
                {[
                  POSTAL_ADDRESS.streetAddress,
                  POSTAL_ADDRESS.addressLocality,
                  POSTAL_ADDRESS.addressRegion,
                  POSTAL_ADDRESS.postalCode,
                  POSTAL_ADDRESS.addressCountry,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </address>
            ) : (
              <span className="site-footer__disclaimer">
                Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
            )}
            <span className="site-footer__disclaimer">
              Independent educational preparation platform. Not affiliated with USCIS, UK
              Home Office, IRCC Canada, or Australian DHA.
            </span>
          </div>

          <div className="site-footer__bottom-right">
            <div className="site-footer__bottom-links" aria-label="Legal quick links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/terms-conditions">Terms &amp; Conditions</Link>
              <span aria-hidden="true">·</span>
              <Link href="/editorial-policy">Editorial Policy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/about-us">About Us</Link>
              <span aria-hidden="true">·</span>
              <Link href="/contact-us">Contact Us</Link>
            </div>
            <ShareButtons heading="Share" label="Share CivicPass with a friend" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
