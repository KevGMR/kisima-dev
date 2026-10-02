import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import kisimLogo from "@/assets/kisima-logo.png";

const footerLinks = {
  services: [
    { name: "Air Freight", href: "/air-freight" },
    { name: "Sea Freight", href: "/sea-freight" },
    { name: "Customs Clearance", href: "/customs-clearance" },
    { name: "Buying & Shipping", href: "/buying-shipping" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    {
      name: "Track Shipment",
      href: "https://app.kisimacargo.com",
      external: true,
    },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Sitemap", href: "/sitemap" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={kisimLogo} alt="Kisima Cargo" className="h-8" />
            </div>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              Fast, transparent, door-to-door shipping from anywhere in the
              world. Consolidation, customs clearance and delivery made simple.
            </p>

            {/* Contact Info - Head Office */}
            <div className="space-y-3">
              <h4 className="font-semibold text-accent text-xs uppercase tracking-wide">
                Kenya (Head Office)
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <a
                    href="tel:+254795554137"
                    className="hover:text-accent transition-colors"
                  >
                    +254 795 554 137
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <a
                    href="https://maps.google.com/?q=Warehouse+No.+2+Shell+Petrol+Station+Lunga+Lunga+Road+Industrial+Area+Nairobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors leading-relaxed"
                  >
                    Warehouse No. 2, Shell Petrol Station,
                    <br />
                    Lunga Lunga Road, Industrial Area,
                    <br />
                    Nairobi, Kenya
                  </a>
                </div>
              </div>
            </div>

            {/* UK Office */}
            <div className="space-y-2">
              <h4 className="font-semibold text-accent text-xs uppercase tracking-wide">
                United Kingdom
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <a
                    href="tel:+442030898178"
                    className="hover:text-accent transition-colors"
                  >
                    +44 20 3089 8178
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed text-secondary-foreground/70">
                    Unit 7 Adler Industrial Estate,
                    <br />
                    Betam Road, Hayes
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-sm pt-2">
              <Mail className="h-4 w-4 text-accent" />
              <a
                href="mailto:info@kisimacargo.com"
                className="hover:text-accent transition-colors"
              >
                info@kisimacargo.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/share/1PDyn69iXs/?mibextid=wwXIfr"
                className="text-secondary-foreground/60 hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a href="#" className="text-secondary-foreground/60 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a> */}
              <a
                href="https://www.tiktok.com/@kisimacargoltdmain?_r=1&_t=ZM-91MbutcE1qC"
                className="text-secondary-foreground/60 hover:text-accent transition-colors"
                aria-label="Company"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/kisimacargoltd?igsh=MXV4ZjhwdmF0djd6cA=="
                className="text-secondary-foreground/60 hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-accent">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-accent">
              Global Offices
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-secondary-foreground mb-1">
                  UAE (Dubai)
                </h4>
                <p className="text-secondary-foreground/70 text-xs leading-relaxed">
                  Al Zaroni Building M:05,
                  <br />
                  Near Gold Souk Gate 1, Al Ras, Deira
                </p>
                <a
                  href="tel:+971544218463"
                  className="text-accent hover:underline text-xs"
                >
                  +971 54 421 8463
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-secondary-foreground mb-1">
                  South Africa
                </h4>
                <p className="text-secondary-foreground/70 text-xs leading-relaxed">
                  Freight City, Unit 4,
                  <br />
                  597 Innes Road, Jet Park, Johannesburg
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-secondary-foreground mb-1">
                  China (Guangdong)
                </h4>
                <p className="text-secondary-foreground/70 text-xs leading-relaxed">
                  Warehouse No. 07, Building C1,
                  <br />
                  Dunhao Logistics Center, Foshan City
                </p>
                <a
                  href="tel:+8619065400105"
                  className="text-accent hover:underline text-xs"
                >
                  +86 190 6540 0105
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & CTA */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-accent">
              Get Started
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-secondary-foreground/80">
                Ready to ship internationally? Get a personalized quote today.
              </p>
              <div className="space-y-2">
                <a
                  href="https://quote.kisimacargo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-accent text-accent-foreground hover:bg-accent-hover px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get a Quote
                </a>
                <a
                  href="https://app.kisimacargo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Track Shipment
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} Kisima Cargo Ltd. All rights
              reserved.
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/60 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-secondary-foreground/40">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
