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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Plane,
  Clock,
  Shield,
  Package,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Phone,
} from "lucide-react";

const benefits = [
  {
    title: "Express Speed",
    description:
      "Fastest delivery option with shipments reaching anywhere in approximately 3 working days",
    icon: Zap,
  },
  {
    title: "Real-time Tracking",
    description:
      "Track your shipment every step of the way with detailed status updates",
    icon: Globe,
  },
  {
    title: "Secure Handling",
    description:
      "Professional handling of high-value and fragile items with full insurance coverage",
    icon: Shield,
  },
  {
    title: "Priority Service",
    description:
      "Premium service with dedicated customer support and priority processing",
    icon: Package,
  },
];

const features = [
  "Express delivery in ~3 working days",
  "Real-time tracking included",
  "Secure handling of fragile items",
  "Customs clearance assistance",
  "Door-to-door delivery service",
  "Insurance coverage up to £1,000",
  "24/7 customer support",
  "Competitive air freight rates",
];

const faqItems = [
  {
    question: "How long does air freight take from UK to Kenya?",
    answer:
      "Air freight typically takes 3-5 working days from our UK warehouse to delivery in Kenya, depending on customs clearance and final destination.",
  },
  {
    question: "What can I ship via air freight?",
    answer:
      "You can ship most items including electronics, clothing, documents, small household items, and personal effects. Prohibited items include hazardous materials, liquids over 100ml, and restricted goods.",
  },
  {
    question: "How is air freight pricing calculated?",
    answer:
      "Air freight pricing is based on either actual weight or volumetric weight (whichever is higher), plus customs clearance fees and delivery charges. We provide transparent pricing with no hidden fees.",
  },
  {
    question: "Is insurance included with air freight?",
    answer:
      "Basic insurance up to £1,000 is included. Additional insurance coverage can be purchased for high-value items at competitive rates.",
  },
  {
    question: "Can you handle customs clearance?",
    answer:
      "Yes, we handle all customs documentation and clearance procedures in your country. Our experienced team ensures smooth and fast customs processing.",
  },
  {
    question: "Do you provide door-to-door delivery?",
    answer:
      "Yes, we offer complete door-to-door delivery service anywhere in your country. Track your shipment from our International warehouse to your doorstep.",
  },
];

export default function AirFreight() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Express Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Air Freight Services
                <span className="block text-accent">
                  International to your doorstep
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Fast, reliable air freight delivery in approximately 3 working
                days. Perfect for urgent shipments and high-value items with
                full tracking and insurance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <a
                    href="https://wa.me/254795554137"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Air Freight Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                  asChild
                >
                  <a href="tel:+442030898178">
                    <Phone className="mr-2 h-4 w-4" />
                    Call for Urgent Shipping
                  </a>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">~3</div>
                  <div className="text-sm text-white/80">Working Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">£25+</div>
                  <div className="text-sm text-white/80">Starting From</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">£1K</div>
                  <div className="text-sm text-white/80">
                    Insurance Included
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl"></div>
              <Card className="relative bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <Plane className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    Express Air Freight
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Professional air cargo service with full tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.slice(0, 4).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-white/90"
                      >
                        <CheckCircle className="h-4 w-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Air Freight Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fast, secure, and reliable air cargo transportation with
              professional handling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="text-center group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Lead Times */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Complete Air Freight Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button variant="cta" asChild>
                  <a
                    href="https://wa.me/254795554137"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Detailed Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Lead Times & Pricing */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Timeline & Sample Rates
              </h3>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    Delivery Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Collection from international stores</span>
                      <Badge variant="secondary">Same day</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Flight to your country</span>
                      <Badge variant="secondary">1-2 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customs clearance</span>
                      <Badge variant="secondary">1 day</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Local delivery</span>
                      <Badge variant="secondary">1 day</Badge>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center font-semibold">
                      <span>Total delivery time</span>
                      <Badge className="bg-accent text-accent-foreground">
                        ~3 working days
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Air Freight Rates</CardTitle>
                  <CardDescription>
                    Indicative pricing - request quote for exact rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Up to 5kg</span>
                      <span className="font-semibold text-accent">
                        From £25
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Up to 10kg</span>
                      <span className="font-semibold text-accent">
                        From £45
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Up to 20kg</span>
                      <span className="font-semibold text-accent">
                        From £85
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                      * Rates include basic insurance. Additional services may
                      apply.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Air Freight FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our air freight services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Fast Air Freight to your country?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get your personalized air freight quote and ship with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="xl"
              className="bg-accent hover:bg-accent-hover"
              asChild
            >
              <a
                href="https://wa.me/254795554137"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Air Freight Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a
                href="https://app.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Track Your Shipment
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Call:(+254) 795 554 137</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Fully insured shipments</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>~3 working days delivery</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
