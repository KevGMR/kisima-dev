import React, { useEffect, useState } from "react";

import img1 from "@/assets/hero-import-export.jpg";
import img2 from "@/assets/hero-import-export-2.jpg";

export default function HeroSlider() {
    const slides = [img1, img2];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden">
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent transition-opacity" />
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${slides[index]})` }}
                aria-hidden
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
                {/* slot — keep existing hero content visually identical */}
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Ship from UK retailers and international sellers to your Kenyan doorstep —<br />
                        <span className="text-accent">Fast, Transparent & Door-to-Door</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                        From consolidating purchases at our UK warehouse and managing customs clearance to arranging secure door‑to‑door delivery across Kenya, we handle the entire journey for you. Transparent pricing, insured handling and real‑time tracking give you peace of mind every step of the way.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <a className="" href="https://quote.kisimacargo.com" target="_blank" rel="noreferrer">
                            <button className="btn-hero px-6 py-3 rounded-md bg-accent text-accent-foreground">Get a Quote</button>
                        </a>
                        <a href="https://app.kisimacargo.com" target="_blank" rel="noreferrer">
                            <button className="px-6 py-3 rounded-md border border-white text-white bg-white/10 hover:bg-white hover:text-secondary">Track Shipment</button>
                        </a>
                    </div>
                </div>
            </div>

            {/* controls */}
            <div className="absolute right-6 bottom-6 z-20 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`w-3 h-3 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
                    />
                ))}
            </div>
        </section>
    );
}