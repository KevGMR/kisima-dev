import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const offices = [
  {
    country: "Kenya",
    label: "Head Office",
    address:
      "Warehouse No. 2, Shell Petrol Station, Lunga Lunga Road, Industrial Area, Nairobi",
    phone: "+254 795 554 137",
    phoneLink: "tel:+254795554137",
    email: "info@kisimacargo.com",
    mapLink:
      "https://maps.google.com/?q=Warehouse+No.+2+Shell+Petrol+Station+Lunga+Lunga+Road+Industrial+Area+Nairobi",
    hours: "Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 1:00 PM",
  },
  {
    country: "United Kingdom",
    address: "Unit 7 Adler Industrial Estate, Betam Road, Hayes",
    phone: "+44 20 3089 8178",
    phoneLink: "tel:+442030898178",
    email: "info@kisimacargo.com",
    mapLink:
      "https://maps.google.com/?q=Unit+7+Adler+Industrial+Estate+Betam+Road+Hayes",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
  },
  {
    country: "UAE",
    label: "Dubai",
    address: "Al Zaroni Building M:05, Near Gold Souk Gate 1, Al Ras, Deira",
    phone: "+971 54 421 8463",
    phoneLink: "tel:+971544218463",
    contact: "Yusuf",
    email: "info@kisimacargo.com",
    mapLink:
      "https://maps.google.com/?q=Al+Zaroni+Building+M05+Near+Gold+Souk+Gate+1+Al+Ras+Deira+Dubai",
    hours: "Sun-Thu: 9:00 AM - 6:00 PM",
  },
  {
    country: "South Africa",
    label: "Johannesburg",
    address: "Freight City, Unit 4, 597 Innes Road, Jet Park, Johannesburg",
    email: "info@kisimacargo.com",
    mapLink:
      "https://maps.google.com/?q=Freight+City+Unit+4+597+Innes+Road+Jet+Park+Johannesburg",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM",
  },
  {
    country: "China",
    label: "Guangdong",
    address:
      "Warehouse No. 07, Building C1, Dunhao Logistics Center, Dali Town, Nanhai District, Foshan City, Guangdong",
    phone: "+86 190 6540 0105",
    phoneLink: "tel:+8619065400105",
    email: "info@kisimacargo.com",
    mapLink:
      "https://maps.google.com/?q=Warehouse+No+07+Building+C1+Dunhao+Logistics+Center+Dali+Town+Nanhai+District+Foshan+City+Guangdong",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            We&apos;re here to help with your shipping needs. Reach out to any
            of our global offices.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 -mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+254 700 000 000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your shipping needs..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full btn-primary">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="space-y-6 margin-adder">
              <div
                className="bg-accent text-accent-foreground rounded-xl shadow-xl p-8"
                style={{ marginTop: "25px" }}
              >
                <h2 className="text-2xl font-bold mb-6">Quick Contact</h2>
                <div className="space-y-4">
                  <a
                    href="tel:+254795554137"
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                  >
                    <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Kenya (Head Office)</p>
                      <p className="text-accent-foreground/90">
                        +254 795 554 137
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+442030898178"
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                  >
                    <Phone className="h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">United Kingdom</p>
                      <p className="text-accent-foreground/90">
                        +44 20 3089 8178
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@kisimacargo.com"
                    className="flex items-start gap-4 hover:opacity-80 transition-opacity"
                  >
                    <Mail className="h-6 w-6 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-accent-foreground/90">
                        info@kisimacargo.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-8">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Kenya Office</p>
                      <p className="text-muted-foreground">
                        Mon-Fri: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-muted-foreground">
                        Sat: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Global Offices
            </h2>
            <p className="text-xl text-muted-foreground">
              Find the office nearest to you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.country}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">{office.country}</h3>
                    {office.label && (
                      <p className="text-sm text-accent font-semibold">
                        {office.label}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {office.address}
                  </p>

                  {office.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                      <a
                        href={office.phoneLink}
                        className="hover:text-accent transition-colors"
                      >
                        {office.phone}
                        {office.contact && ` (${office.contact})`}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                    <a
                      href={`mailto:${office.email}`}
                      className="hover:text-accent transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>

                  {office.hours && (
                    <div className="flex items-start gap-2 pt-2 border-t">
                      <Clock className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-xs">
                        {office.hours}
                      </p>
                    </div>
                  )}

                  <a
                    href={office.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:underline text-sm font-semibold mt-2"
                  >
                    View on Map →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get a competitive quote for your air or sea freight needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary text-lg px-8 py-6">
              <a
                href="https://quote.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Quote
              </a>
            </Button>
            <Button asChild variant="outline" className="text-lg px-8 py-6">
              <a
                href="https://app.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Track Shipment
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
