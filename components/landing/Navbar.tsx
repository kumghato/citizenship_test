import Link from 'next/link';
import { NAV_LINKS } from './navbarData';
import { NavbarCountryDropdown } from './NavbarCountryDropdown';
import { NavbarMobileToggle } from './NavbarMobileToggle';

export { COUNTRIES } from './navbarData';
export type { CountryOption } from './navbarData';

export function Navbar() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="CivicPass home">
          {/* Eager + high priority: this is the first image in the document and
              a likely LCP candidate on small screens. Plain <img> is intentional —
              the Next image optimiser is not available on this Worker. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon1-34.png"
            srcSet="/icon1-34.png 1x, /icon1-68.png 2x"
            alt="CivicPass logo"
            width={34}
            height={34}
            className="brand__logo"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <span className="brand__wordmark">
            Civic<em>Pass</em>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {NAV_LINKS.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <NavbarCountryDropdown />
          <NavbarMobileToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
