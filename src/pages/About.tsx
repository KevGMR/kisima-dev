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
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Globe,
  Heart,
  Target,
  Eye,
} from "lucide-react";

const stats = [
  {
    number: "5+",
    label: "Years in Business",
    description: "Serving UK-Kenya shipping",
  },
  {
    number: "1000+",
    label: "Happy Customers",
    description: "Satisfied clients across Kenya",
  },
  {
    number: "10,000+",
    label: "Shipments Delivered",
    description: "Safe and secure deliveries",
  },
  {
    number: "99%",
    label: "Customer Satisfaction",
    description: "Proven track record",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "Clear pricing, honest timelines, and open communication at every step of your shipping journey.",
    icon: Eye,
  },
  {
    title: "Reliability",
    description:
      "Dependable service you can trust with your valuable items and important shipments.",
    icon: Award,
  },
  {
    title: "Customer Focus",
    description:
      "Your needs come first. We're committed to providing exceptional service and support.",
    icon: Heart,
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest standards in everything we do, from handling to delivery.",
    icon: Target,
  },
];

const services = [
  {
    title: "Air Freight",
    description: "Fast delivery in ~3 working days for urgent shipments",
    icon: Plane,
  },
  {
    title: "Sea Freight",
    description: "Cost-effective shipping in ~6 weeks for larger items",
    icon: Ship,
  },
  {
    title: "Customs Clearance",
    description: "Expert handling of all documentation and procedures",
    icon: FileCheck,
  },
];

const milestones = [
  {
    year: "2019",
    title: "Company Founded",
    description: "Started with a vision to simplify UK-Kenya shipping",
  },
  {
    year: "2020",
    title: "1000th Shipment",
    description: "Reached our first major milestone in customer service",
  },
  {
    year: "2022",
    title: "Expanded Services",
    description: "Added comprehensive customs clearance and consolidation",
  },
  {
    year: "2024",
    title: "Digital Innovation",
    description: "Launched online tracking and quote system",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">
              About Kisima Cargo
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Trusted Partner for
              <span className="block text-accent">UK to Kenya Shipping</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              For over 5 years, we've been making international shipping simple,
              transparent, and reliable. From small packages to large shipments,
              we handle everything with care and professionalism.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Kisima Cargo was founded with a simple mission: to make
                  shipping from the UK to Kenya as simple and transparent as
                  possible. We saw how complicated and expensive international
                  shipping could be, and we knew there had to be a better way.
                </p>
                <p>
                  Starting from our warehouse in Hayes, we began by helping
                  Kenyan diaspora in the UK send items home to their families.
                  Word spread quickly about our reliable service, competitive
                  pricing, and genuine care for each shipment.
                </p>
                <p>
                  Today, we're proud to serve over 1,000 customers and have
                  delivered more than 10,000 shipments safely across Kenya. Our
                  team has grown, but our commitment to personal service and
                  transparency remains unchanged.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="cta" asChild>
                  <a
                    href="https://wa.me/254795554137"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ship With Us Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact">Contact Our Team</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Connecting Communities
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We understand the importance of staying connected with home.
                    Every package we handle represents someone's thoughtfulness,
                    whether it's a gift for family, essential items, or business
                    goods. That's why we treat every shipment with the care it
                    deserves.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card
                key={value.title}
                className="text-center group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive shipping solutions from UK to Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our growth and development
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">
                  {milestone.year}
                </div>
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ship With Kisima Cargo?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of satisfied customers who trust us with their UK to
            Kenya shipments.
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
                Get Your Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>1000+ happy customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>5+ years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>99% customer satisfaction</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
