import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Ship, 
  Clock, 
  Shield, 
  Package, 
  CheckCircle, 
  ArrowRight,
  DollarSign,
  Archive,
  Phone
} from "lucide-react";

const benefits = [
  {
    title: "Cost Effective",
    description: "Most economical shipping option for larger shipments and household goods",
    icon: DollarSign
  },
  {
    title: "Large Capacity", 
    description: "Ship large items, furniture, and bulk orders that won't fit in air freight",
    icon: Archive
  },
  {
    title: "Consolidation Service",
    description: "Combine multiple purchases into one shipment to save on shipping costs",
    icon: Package
  },
  {
    title: "Secure Transit",
    description: "Professional sea freight handling with full insurance coverage included",
    icon: Shield
  }
];

const features = [
  "Cost-effective shipping in ~6 weeks",
  "Large capacity for bulky items",
  "Consolidation service available",
  "Customs clearance included",
  "Door-to-door delivery service",
  "Insurance coverage up to £1,000",
  "Real-time tracking updates",
  "Professional cargo handling"
];

const faqItems = [
  {
    question: "How long does sea freight take from UK to Kenya?",
    answer: "Sea freight typically takes 4-6 weeks from our UK warehouse to delivery in Kenya, depending on vessel schedules, customs clearance, and final destination."
  },
  {
    question: "What can I ship via sea freight?",
    answer: "Sea freight is perfect for larger items like furniture, household goods, electronics, clothing in bulk, books, and any items where speed isn't critical. Some restrictions apply for hazardous materials."
  },
  {
    question: "How is sea freight pricing calculated?",
    answer: "Sea freight pricing is based on volume (cubic meters) or weight, whichever is higher, plus customs clearance fees and delivery charges. We offer transparent pricing with detailed breakdowns."
  },
  {
    question: "Can I consolidate multiple purchases?",
    answer: "Yes! Our consolidation service allows you to combine multiple purchases into one shipment, significantly reducing per-item shipping costs. We hold items for up to 60 days."
  },
  {
    question: "Is sea freight safe for valuable items?",
    answer: "Absolutely. All sea freight shipments include insurance up to £1,000, and we use professional packing methods. Additional insurance is available for high-value items."
  },
  {
    question: "Do you handle customs clearance for sea freight?",
    answer: "Yes, we handle all customs documentation and clearance procedures in Kenya. Our experienced team ensures smooth processing of your sea freight shipments."
  }
];

export default function SeaFreight() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Cost Effective
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Sea Freight Services
                <span className="block text-accent">UK to Kenya</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Cost-effective sea freight delivery in approximately 6 weeks. 
                Perfect for larger shipments, household goods, and when you want to maximize value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <a href="https://quote.kisimacargo.com" target="_blank" rel="noopener noreferrer">
                    Get Sea Freight Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
                  <a href="tel:+442030898178">
                    <Phone className="mr-2 h-4 w-4" />
                    Speak to Our Team
                  </a>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">~6</div>
                  <div className="text-sm text-white/80">Weeks Transit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">£45+</div>
                  <div className="text-sm text-white/80">Starting From</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">100kg+</div>
                  <div className="text-sm text-white/80">Large Capacity</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl"></div>
              <Card className="relative bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <Ship className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-white text-xl">Sea Freight Cargo</CardTitle>
                  <CardDescription className="text-white/80">
                    Professional ocean freight service with consolidation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-white/90">
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
              Why Choose Our Sea Freight Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Economical, reliable ocean freight transportation perfect for larger shipments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center group hover:shadow-lg transition-all duration-300">
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
                Complete Sea Freight Features
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
                  <a href="https://quote.kisimacargo.com" target="_blank" rel="noopener noreferrer">
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
                      <span>Collection & consolidation</span>
                      <Badge variant="secondary">1-3 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ocean transit to Mombasa</span>
                      <Badge variant="secondary">3-4 weeks</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Port clearance</span>
                      <Badge variant="secondary">3-5 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Local delivery</span>
                      <Badge variant="secondary">1-2 days</Badge>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center font-semibold">
                      <span>Total delivery time</span>
                      <Badge className="bg-accent text-accent-foreground">~6 weeks</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Sea Freight Rates</CardTitle>
                  <CardDescription>Indicative pricing - request quote for exact rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Up to 50kg</span>
                      <span className="font-semibold text-accent">From £45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Up to 100kg</span>
                      <span className="font-semibold text-accent">From £75</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Up to 200kg</span>
                      <span className="font-semibold text-accent">From £120</span>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                      * Rates include basic insurance. Consolidation service available.
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
              Sea Freight FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our sea freight services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
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
            Ship Cost-Effectively to Kenya
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get your personalized sea freight quote for the best value shipping.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" className="bg-accent hover:bg-accent-hover" asChild>
              <a href="https://quote.kisimacargo.com" target="_blank" rel="noopener noreferrer">
                Get Sea Freight Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            
            <Button variant="outline" size="xl" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://app.kisimacargo.com" target="_blank" rel="noopener noreferrer">
                Track Your Shipment
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Call: (+44) 20 3089 8178</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Fully insured shipments</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Best value shipping</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}