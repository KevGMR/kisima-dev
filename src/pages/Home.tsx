import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Ship,
  FileCheck,
  ShoppingCart,
  Package,
  Truck,
  Home as HomeIcon,
  Clock,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const services = [
  {
    title: "Air Freight",
    description:
      "Fast delivery in ~3 working days. Perfect for urgent shipments and high-value items.",
    icon: Plane,
    href: "/air-freight",
    features: ["Express delivery", "Tracking included", "Secure handling"],
  },
  {
    title: "Sea Freight",
    description:
      "Cost-effective shipping in ~6 weeks. Ideal for larger shipments and household goods.",
    icon: Ship,
    href: "/sea-freight",
    features: ["Competitive rates", "Large capacity", "Consolidation service"],
  },
  {
    title: "Customs Clearance",
    description:
      "Expert handling of all customs documentation and procedures anywhere in the world.",
    icon: FileCheck,
    href: "/customs-clearance",
    features: ["Documentation", "Duty calculation", "Fast clearance"],
  },
];

const steps = [
  {
    title: "Shop in UK",
    description:
      "Purchase items from any UK retailer or use our buying service",
    icon: ShoppingCart,
  },
  {
    title: "Consolidate",
    description: "We collect and consolidate your packages at our UK warehouse",
    icon: Package,
  },
  {
    title: "Ship",
    description: "Choose air or sea freight based on your budget and timeline",
    icon: Plane,
  },
  {
    title: "Deliver",
    description:
      "Door-to-door delivery anywhere in listed countries with tracking",
    icon: HomeIcon,
  },
];

const sampleRates = [
  {
    service: "Air Freight",
    weight: "Up to 5kg",
    price: "From £25",
    time: "~3 working days",
    popular: false,
  },
  {
    service: "Air Freight",
    weight: "Up to 20kg",
    price: "From £85",
    time: "~3 working days",
    popular: true,
  },
  {
    service: "Sea Freight",
    weight: "Up to 50kg",
    price: "From £45",
    time: "~6 weeks",
    popular: false,
  },
  {
    service: "Sea Freight",
    weight: "Up to 100kg",
    price: "From £75",
    time: "~6 weeks",
    popular: false,
  },
];

const trustFeatures = [
  "Insured shipments up to £1,000",
  "24/7 customer support",
  "Transparent pricing",
  "5+ years experience",
  "1000+ satisfied customers",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Shipping Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect shipping solution for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="card-hover group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    asChild
                  >
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your items to your doorstep
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              (ie. UK to Kenya)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center group">
                <div className="relative mb-6">
                  <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <step.icon className="h-10 w-10 text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border transform -translate-y-1/2 z-0">
                      <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Rates Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sample Shipping Rates
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Transparent pricing for your planning
            </p>
            <Badge variant="secondary" className="text-sm">
              Sample rates — for guidance only
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleRates.map((rate, index) => (
              <Card
                key={index}
                className={`relative ${
                  rate.popular ? "ring-2 ring-accent shadow-lg" : ""
                }`}
              >
                {rate.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                    Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg">{rate.service}</CardTitle>
                  <div className="text-3xl font-bold text-accent">
                    {rate.price}
                  </div>
                  <CardDescription>{rate.weight}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    {rate.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Need a personalized quote? Get exact pricing for your specific
              shipment.
            </p>
            <Button variant="cta" size="lg" asChild>
              <a
                href="https://quote.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Kisima Cargo?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're committed to providing reliable, transparent, and
                professional shipping services that you can trust with your
                valuable items.
              </p>

              <div className="space-y-4">
                {trustFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="text-foreground font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="cta" asChild>
                  <Link to="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Secure & Insured</h3>
                <p className="text-sm text-muted-foreground">
                  All shipments are fully insured and handled with care
                </p>
              </Card>

              <Card className="text-center p-6">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  5+ Years Experience
                </h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by over 1000 customers across the world
                </p>
              </Card>

              <Card className="text-center p-6">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Door-to-Door</h3>
                <p className="text-sm text-muted-foreground">
                  Complete delivery service to your doorstep
                </p>
              </Card>

              <Card className="text-center p-6">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer assistance
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ship from anywhere in the world to your doorstep?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get a personalized quote today and experience our professional
            shipping service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="xl"
              className="bg-accent hover:bg-accent-hover"
              asChild
            >
              <a
                href="https://quote.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Your Quote Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="tel:+254795554137">Call Us: (+254) 795 554 137</a>
            </Button>{" "}
          </div>
        </div>
      </section>
    </div>
  );
}
