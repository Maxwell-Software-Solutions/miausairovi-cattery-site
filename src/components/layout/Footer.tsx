import { MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, CONTACT_INFO } from '@/config/constants';
import { FOOTER_LINKS } from '@/config/navigation';

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1ZEq7U4Fgj/',
    label: 'Visit our Facebook page',
    Icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/scottishfold_british_cats_uk/?igshid=MTJ1emp4bzZvbXdqQ==',
    label: 'Visit our Instagram page',
    Icon: Instagram,
  },
];

// Splits "Monday - Friday: 9am - 6pm" into a day and a time so the hours can line up in two columns.
const OFFICE_HOURS = [
  CONTACT_INFO.officeHours.weekday,
  CONTACT_INFO.officeHours.saturday,
  CONTACT_INFO.officeHours.sunday,
].map((entry) => {
  const [day, ...rest] = entry.split(': ');
  return { day, time: rest.join(': ') };
});

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground';
const linkClass = `-mx-1 block w-fit rounded-sm px-1 py-2 text-sm text-background/75 underline-offset-4 transition-colors hover:text-accent hover:underline md:py-1 ${focusRing}`;
const headingClass = 'mb-3 text-base font-semibold text-background';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto max-w-6xl px-6 pb-8 pt-12 sm:px-8 md:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-[auto_auto_auto] md:gap-y-10 md:justify-between lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:gap-x-14">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              to="/"
              className={`-mx-1 inline-block rounded-sm px-1 text-xl font-bold leading-6 text-accent transition-colors hover:text-background ${focusRing}`}
            >
              {APP_CONFIG.siteName}
            </Link>
            <p className="mt-3 max-w-sm text-pretty text-sm text-background/75">{APP_CONFIG.siteDescription}</p>
            <p className="mt-2 max-w-sm text-pretty text-sm text-background/75">
              GCCF & TICA registered breeder of British Shorthair, British Longhair, Scottish Fold and Scottish Straight
              cats.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5" aria-label="Social media">
              {SOCIAL_LINKS.map(({ name, href, label, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`-mx-1 flex items-center gap-2 rounded-sm px-1 py-2 text-sm text-background transition-colors hover:text-accent md:py-1.5 ${focusRing}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="flex flex-col gap-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Contact Info</h2>
            <address className="flex flex-col gap-2 text-sm not-italic text-background/75">
              <p className="flex items-start gap-2 text-background">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{CONTACT_INFO.location}</span>
              </p>
              {CONTACT_INFO.locationDetails && <p className="pl-6">{CONTACT_INFO.locationDetails}</p>}
              <p className="pl-6">Visitors welcome by appointment</p>
            </address>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h2 className={headingClass}>Office Hours</h2>
            <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
              {OFFICE_HOURS.map(({ day, time }) => (
                <div key={day} className="contents">
                  <dt className="text-background/75">{day}</dt>
                  <dd className="text-background">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 border-t border-background/15 pt-6 text-sm text-background/70 md:mt-12">
          <p>
            &copy; {new Date().getFullYear()} {APP_CONFIG.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
