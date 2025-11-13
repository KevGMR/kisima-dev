import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import kisimLogo from "@/assets/kisima-logo.png";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "#",
    dropdown: [
      { name: "Buying & Shipping", href: "/buying-shipping" },
      { name: "Air Freight", href: "/air-freight" },
      { name: "Sea Freight", href: "/sea-freight" },
      { name: "Customs Clearance", href: "/customs-clearance" },
    ],
  },
  { name: "Track & Trace", href: "/tracking-shipment", external: true },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          isScrolled && "shadow-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={kisimLogo}
                  alt="Kisima Cargo Logo"
                  className={cn(
                    "transition-all duration-300",
                    isScrolled ? "h-8" : "h-10"
                  )}
                />
              </Link>
            </div>

            {/* CTA Button & Hamburger menu - Always visible */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <Button variant="quote" asChild>
                  <a
                    href="https://quote.kisimacargo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get a Quote
                  </a>
                </Button>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={handleMobileMenuToggle}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div className="block px-3 py-2 text-base font-medium text-foreground">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "block px-3 py-2 text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors",
                        location.pathname === item.href &&
                          "text-primary bg-muted"
                      )}
                      onClick={closeMobileMenu}
                    >
                      {item.name === "Track & Trace"
                        ? "Track Shipment"
                        : item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 pb-2 md:hidden">
                <Button variant="quote" className="w-full" asChild>
                  <a
                    href="https://quote.kisimacargo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Get a Quote
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
