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
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  ArrowRight,
  Search,
  CreditCard,
  Home as HomeIcon,
  Phone,
  Star,
} from "lucide-react";

const benefits = [
  {
    title: "Personal Shopping",
    description:
      "We shop for you from any International retailer, ensuring you get exactly what you want",
    icon: Search,
  },
  {
    title: "Secure Payment",
    description:
      "Safe and secure payment processing with fraud protection and buyer guarantees",
    icon: CreditCard,
  },
  {
    title: "Consolidation",
    description:
      "Combine multiple purchases into one shipment to save on shipping costs",
    icon: Package,
  },
  {
    title: "Door-to-Door",
    description:
      "Complete service from international stores directly to your doorstep in your country",
    icon: HomeIcon,
  },
];

const steps = [
  {
    title: "Browse & Select",
    description: "Find items on UK websites or send us your shopping list",
  },
  {
    title: "We Purchase",
    description:
      "Our team buys the items using our UK address and payment methods",
  },
  {
    title: "Consolidate",
    description:
      "Items are collected at our warehouse and consolidated for shipping",
  },
  {
    title: "Ship & Deliver",
    description:
      "Choose air or sea freight and receive items at your door in your country",
  },
];

const features = [
  "Personal shopping from any international retailer",
  "Access to international-only deals and sales",
  "Secure payment processing",
  "Item inspection and quality check",
  "Free storage for up to 60 days",
  "Consolidation to reduce shipping costs",
  "Insurance coverage included",
  "Real-time updates on your orders",
];

const popularStores = [
  "Amazon UK",
  "ASOS",
  "Next",
  "John Lewis",
  "M&S",
  "Argos",
  "Currys",
  "Very",
  "H&M",
  "Zara",
  "Boots",
  "Superdrug",
];

const faqItems = [
  {
    question: "How does the buying service work?",
    answer:
      "Simply send us the links to items you want to buy, or provide a detailed description. We'll purchase them using our International address and payment methods, then consolidate and ship them to you in your country of choice.",
  },
  {
    question: "What stores can you buy from?",
    answer:
      "We can purchase from virtually any international online retailer including Amazon UK, ASOS, Next, John Lewis, M&S, and thousands of others. If a store ships internationally, we can usually buy from them.",
  },
  {
    question: "How much does the buying service cost?",
    answer:
      "We charge a small service fee (typically 5-10% of item value) plus shipping costs. The exact fee depends on the complexity of the purchase and total order value.",
  },
  {
    question: "Can you help me find specific items?",
    answer:
      "Absolutely! Our team can help you research and find specific products, compare prices, and even wait for sales or special offers to get you the best deals.",
  },
  {
    question: "How long can you store my items?",
    answer:
      "We offer free storage for up to 60 days, allowing you to accumulate multiple purchases before shipping. This helps you save significantly on shipping costs through consolidation.",
  },
  {
    question: "What if an item is out of stock or unavailable?",
    answer:
      "If an item is unavailable, we'll contact you immediately with alternatives or refund options. We always keep you informed and never make substitutions without your approval.",
  },
];

export default function BuyingShipping() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Complete Service
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Buying & Shipping
                <span className="block text-accent">
                  From international stores to you
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Can't buy directly from international stores? We'll shop for
                you! Complete buying and shipping service from any international
                retailer to you
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" asChild>
                  <a
                    href="https://quote.kisimacargo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Shopping Service
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
                    Speak to Shopping Team
                  </a>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1000+</div>
                  <div className="text-sm text-white/80">UK Stores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">5-10%</div>
                  <div className="text-sm text-white/80">Service Fee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">60</div>
                  <div className="text-sm text-white/80">Days Free Storage</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl"></div>
              <Card className="relative bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    Personal Shopping Service
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    We buy and ship from any international store to your
                    doorstep
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
              Why Use Our Buying Service?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access to International-only deals, secure payments, and
              hassle-free delivery to your country
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

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Our Buying Service Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 4-step process to get any International product delivered
              to you
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              (ie. from UK retailers to Kenya)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-accent-foreground font-bold text-lg">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 text-muted-foreground">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Stores */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Popular UK Stores We Shop From
            </h2>
            <p className="text-xl text-muted-foreground">
              We can buy from virtually any international retailer that ships
              within their country
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {popularStores.map((store, index) => (
              <Card
                key={index}
                className="text-center p-4 hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-2">
                  <span className="text-sm font-medium text-foreground">
                    {store}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Don't see your favorite store? We can buy from almost any
              international retailer.
            </p>
            <Button variant="outline" asChild>
              <a href="/contact">Ask About Other Stores</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features & Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Complete Buying Service Features
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
                    href="https://quote.kisimacargo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Your Order
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Service Fees & Benefits
              </h3>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Service Fee Structure</CardTitle>
                  <CardDescription>
                    Transparent pricing for our buying service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Orders up to £100</span>
                      <Badge variant="secondary">10% service fee</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Orders £100 - £500</span>
                      <Badge variant="secondary">7% service fee</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Orders over £500</span>
                      <Badge variant="secondary">5% service fee</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                      * Plus item cost and shipping fees. No hidden charges.
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-accent" />
                    Included Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Item inspection and quality check</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Free storage for up to 60 days</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>Purchase insurance and protection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span>24/7 order tracking and updates</span>
                    </li>
                  </ul>
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
              Buying Service FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about our personal shopping service
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
            Ready to Start Shopping from internationally?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let us handle your international shopping while you relax.
            Professional service with complete transparency.
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
                Start Shopping Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="/contact">Get Shopping Advice</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>1000+ International stores available</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>60 days free storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Quality inspection included</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
