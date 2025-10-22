import { MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, CONTACT_INFO } from '@/config/constants';
import { FOOTER_LINKS } from '@/config/navigation';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">{APP_CONFIG.siteName}</h3>
            <p className="text-sm text-muted-foreground">{APP_CONFIG.siteDescription}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_INFO.location}</span>
              </div>
              {CONTACT_INFO.locationDetails && (
                <div className="text-xs">
                  <span>{CONTACT_INFO.locationDetails}</span>
                </div>
              )}
              <div className="pt-4">
                <h5 className="font-semibold text-foreground mb-2">Follow Us</h5>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/share/1ZEq7U4Fgi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/scottishfold_british_cats_uk/?igshid=MTJ1emp4bzZvbXdqQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {APP_CONFIG.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
