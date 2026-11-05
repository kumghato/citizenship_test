import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          {/* Col 1: Brand & Mission */}
          <div className="site-footer__brand-col">
            <Link href="/" className="brand" title="CivicPass Home">
              <span className="brand__mark">CP</span>
              <span className="brand__wordmark">
                Civic<em>Pass</em>
              </span>
            </Link>
            <p>
              Independent educational platform helping future citizens pass their naturalization exams with verified statutory explanations, authentic mock tests, and oral interview practice.
            </p>
            <div className="site-footer__badges">
              <span className="footer-tag">Official Standards</span>
              <span className="footer-tag">Privacy-First</span>
              <span className="footer-tag">100% Free Core Prep</span>
            </div>
          </div>

          {/* Col 2: Exam Tracks */}
          <div>
            <h3>Exam Tracks</h3>
            <ul>
              <li>
                <Link href="/test/us" title="USCIS Civics Test Practice">
                  🇺🇸 USCIS Civics (USA)
                </Link>
              </li>
              <li>
                <Link href="/test/uk" title="Life in the UK Test Practice">
                  🇬🇧 Life in the UK (UK)
                </Link>
              </li>
              <li>
                <Link href="/test/ca" title="Discover Canada Test Practice">
                  🇨🇦 Discover Canada (Canada)
                </Link>
              </li>
              <li>
                <Link href="/test/au" title="Our Common Bond Test Practice">
                  🇦🇺 Our Common Bond (Australia)
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
                <Link href="/#exam-guides">Study Guides Hub</Link>
              </li>
              <li>
                <Link href="/#practice">Mock Test Simulator</Link>
              </li>
              <li>
                <Link href="/#how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/#faq">Citizenship FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Support */}
          <div>
            <h3>About & Support</h3>
            <ul>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/about-us#methodology">Editorial Methodology</Link>
              </li>
              <li>
                <Link href="/contact-us#feedback">Submit Corrections</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Policies */}
          <div>
            <h3>Legal & Policies</h3>
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
            <span className="site-footer__disclaimer">
              Independent educational preparation platform. Not affiliated with USCIS, UK Home Office, IRCC Canada, or Australian DHA.
            </span>
          </div>

          <div className="site-footer__bottom-links" aria-label="Legal quick links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
            <span aria-hidden="true">·</span>
            <Link href="/about-us">About Us</Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact-us">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
