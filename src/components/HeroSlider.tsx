import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import slide1 from "@/assets/hero-import-export.jpg";
import slide2 from "@/assets/kisima_slider_2.jpeg";
import slide3 from "@/assets/kisima_slider_3.jpeg";

const slides = [
  {
    image: slide1,
    titleTop: "Ship from anywhere in the world —",
    titleAccent: "Fast, Transparent & Door-to-Door",
    description:
      "Consolidation, customs clearance and delivery — we make international shopping and shipping simple.",
  },
  {
    image: slide2,
    titleTop: "Global Containers, Local Delivery —",
    titleAccent: "Affordable Sea & Air Options",
    description:
      "Large shipments or small parcels — choose the service that fits your timeline and budget.",
  },
  {
    image: slide3,
    titleTop: "From Warehouse to Your Door —",
    titleAccent: "Reliable Tracking & Delivery",
    description:
      "Door-to-door delivery with real-time tracking and insured handling for peace of mind.",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index
                ? "opacity-100 z-0"
                : "opacity-0 pointer-events-none z-[-1]"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden={i !== index}
          />
        ))}
      </div>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent"></div>

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {slides[index].titleTop}
            <br />
            <span className="text-accent">{slides[index].titleAccent}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {slides[index].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="xl" asChild>
              <a
                href="https://quote.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-secondary"
              asChild
            >
              <a
                href="https://app.kisimacargo.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Track Shipment
              </a>
            </Button>
          </div>

          {/* trust indicators */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Insured shipments up to £1,000
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              24/7 support
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Transparent pricing
            </Badge>
          </div>
        </div>
      </div>

      {/* controls: dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-accent" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
