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
  FileCheck,
  Clock,
  Shield,
  Calculator,
  CheckCircle,
  ArrowRight,
  FileText,
  Stamp,
  Phone,
} from "lucide-react";

const benefits = [
  {
    title: "Expert Documentation",
    description:
      "Professional handling of all customs forms, declarations, and required paperwork",
    icon: FileText,
  },
  {
    title: "Duty Calculation",
    description:
      "Accurate assessment and calculation of applicable duties and taxes",
    icon: Calculator,
  },
  {
    title: "Fast Clearance",
    description:
      "Expedited processing through our established relationships with customs officials",
    icon: Clock,
  },
  {
    title: "Compliance Assurance",
    description:
      "Full compliance with all customs regulations and international trade laws",
    icon: Stamp,
  },
];

const features = [
  "Complete customs documentation",
  "Duty and tax calculation",
  "Import permit assistance",
  "Compliance verification",
  "Fast track processing",
  "Direct communication with authorities",
  "Transparent fee structure",
  "Post-clearance support",
];

const faqItems = [
  {
    question: "What documents are needed for customs clearance?",
    answer:
      "Typically you'll need: commercial invoice, packing list, airway bill/bill of lading, import declaration form, and any relevant permits or certificates. We guide you through the exact requirements for your specific items.",
  },
  {
    question: "How long does customs clearance take?",
    answer:
      "Most shipments clear customs within 1-3 working days. Air freight typically clears faster than sea freight. Complex items or incomplete documentation may take longer.",
  },
  {
    question: "How are duties and taxes calculated?",
    answer:
      "Duties and taxes are calculated based on the item's value, classification under any customs tariff, and applicable tax rates. We provide transparent calculations and explanations.",
  },
  {
    question: "Can you handle clearance for restricted items?",
    answer:
      "Yes, we can assist with items requiring special permits or licenses, such as electronics, machinery, or medical equipment. We'll guide you through the specific requirements.",
  },
  {
    question: "What if my shipment is held by customs?",
    answer:
      "We proactively monitor all shipments and immediately address any customs holds. Our team works directly with authorities to resolve issues quickly and keep you informed throughout the process.",
  },
  {
    question: "Are your customs clearance fees included in shipping?",
    answer:
      "Basic customs clearance is included in our shipping rates. Additional fees may apply for complex documentation, special permits, or expedited processing.",
  },
];

export default function CustomsClearance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Professional Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Customs Clearance
                <span className="block text-accent">Made Simple</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Expert customs clearance services. We handle all documentation,
                duty calculations, and compliance requirements so your shipments
                clear quickly and smoothly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <a
                    href="https://wa.me/254795554137"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Clearance Quote
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
                    Customs Assistance
                  </a>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1-3</div>
                  <div className="text-sm text-white/80">Working Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">100%</div>
                  <div className="text-sm text-white/80">Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl"></div>
              <Card className="relative bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <FileCheck className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    Expert Customs Service
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Professional clearance with full compliance assurance
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
              Why Choose Our Customs Clearance Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional, compliant, and efficient customs processing for all
              your shipments
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

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Customs Clearance Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamlined process ensuring fast and compliant clearance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Document Review",
                description:
                  "We review all shipping documents and prepare customs declarations",
              },
              {
                step: "2",
                title: "Duty Assessment",
                description:
                  "Calculate applicable duties, taxes, and fees with full transparency",
              },
              {
                step: "3",
                title: "Submission",
                description: "Submit all documentation to customs authorities",
              },
              {
                step: "4",
                title: "Clearance & Release",
                description:
                  "Monitor clearance and arrange immediate release upon approval",
              },
            ].map((process, index) => (
              <Card key={index} className="text-center relative">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-accent-foreground font-bold text-lg">
                    {process.step}
                  </div>
                  <CardTitle className="text-lg">{process.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {process.description}
                  </CardDescription>
                </CardContent>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-16 -right-4 text-muted-foreground">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Complete Customs Services
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
                    Get Clearance Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Common Items & Duties */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Common Items & Duty Rates
              </h3>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Duty Rates</CardTitle>
                  <CardDescription>
                    Indicative rates - exact duties depend on specific items and
                    values
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Electronics</span>
                      <Badge variant="secondary">25-35% + VAT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Clothing & Textiles</span>
                      <Badge variant="secondary">25% + VAT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Books & Educational</span>
                      <Badge variant="secondary">0% + VAT</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Personal Effects</span>
                      <Badge variant="secondary">Varies</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                      * VAT is typically 16%. Rates subject to change by Revenue
                      Authorities.
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Compliance Guarantee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All our customs clearance services are handled by licensed
                    customs agents with years of experience. We guarantee full
                    compliance with customs regulations and provide complete
                    transparency in all processes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customs Clearance FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about customs clearance
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
            Need Expert Customs Clearance?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let our experienced team handle your customs clearance with full
            compliance and transparency.
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
                Get Clearance Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="tel:+442030898178">Call Customs Expert</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Licensed customs agents</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>100% compliance guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>1-3 days clearance</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
