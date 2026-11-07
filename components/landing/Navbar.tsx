import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from './navbarData';
import { NavbarCountryDropdown } from './NavbarCountryDropdown';
import { NavbarMobileToggle } from './NavbarMobileToggle';

export { COUNTRIES } from './navbarData';
export type { CountryOption } from './navbarData';

interface NavbarProps {
  selectedCountry?: string;
  onCountrySelect?: (id: string) => void;
}

export function Navbar({ selectedCountry = 'us', onCountrySelect }: NavbarProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="CivicPass home">
          <Image
            src="/icon1.svg"
            alt="CivicPass logo"
            width={34}
            height={34}
            className="brand__logo"
            priority
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
          <NavbarCountryDropdown
            initialCountry={selectedCountry}
            onCountrySelect={onCountrySelect}
          />
          <NavbarMobileToggle initialCountry={selectedCountry} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
