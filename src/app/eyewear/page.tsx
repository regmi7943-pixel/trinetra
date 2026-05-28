"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Glasses, Search, Shield, Sun, Filter, ArrowRight, Sparkles, Eye } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Category = "all" | "men" | "women" | "kids";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "men", label: "Men" },
  { key: "women", label: "Women" },
  { key: "kids", label: "Kids" },
];

const frames = [
  {
    id: 1,
    name: "Classic Aviator",
    category: "men" as Category,
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Retro Cat-Eye",
    category: "women" as Category,
    price: "₹2,899",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    tag: "New",
  },
  {
    id: 3,
    name: "Bold Wayfarers",
    category: "men" as Category,
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&q=80",
    tag: null,
  },
  {
    id: 4,
    name: "Round Vintage",
    category: "women" as Category,
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
    tag: "Trending",
  },
  {
    id: 5,
    name: "Sport Flex",
    category: "kids" as Category,
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&q=80",
    tag: null,
  },
  {
    id: 6,
    name: "Minimalist Wire",
    category: "women" as Category,
    price: "₹3,299",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&q=80",
    tag: "Premium",
  },
];

const lensOptions = [
  {
    icon: Eye,
    title: "Progressive Lenses",
    description: "Seamless transition from near to far vision without visible lines on the lens.",
  },
  {
    icon: Shield,
    title: "Blue Light Filter",
    description: "Protect your eyes from harmful blue light emitted by digital screens all day.",
  },
  {
    icon: Sun,
    title: "Anti-Glare Coating",
    description: "Reduce reflections and glare for clearer, more comfortable vision everywhere.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Frame",
    description: "Browse our curated collection and pick a frame that matches your style and personality.",
  },
  {
    number: "02",
    title: "Select Your Lenses",
    description: "Choose from single-vision, progressive, or specialty lenses with custom coatings.",
  },
  {
    number: "03",
    title: "We Craft & Deliver",
    description: "Our experts precisely craft your eyewear and deliver it ready for a perfect fit.",
  },
];

export default function EyewearPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredFrames =
    activeFilter === "all" ? frames : frames.filter((f) => f.category === activeFilter);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".eyewear-header", {
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Lens options stagger
      gsap.from(".lens-card", {
        y: 50,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".lens-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Steps stagger
      gsap.from(".step-item", {
        x: -40,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)", color: "var(--color-chocolate, #2C1810)" }}
    >
      {/* Hero Header */}
      <section className="pt-32 pb-12 px-6 lg:px-8">
        <div className="eyewear-header max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{
              backgroundColor: "rgba(212,165,116,0.15)",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <Glasses className="w-4 h-4" style={{ color: "var(--color-primary, #FF055F)" }} />
            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: "var(--color-chocolate, #2C1810)" }}>
              Eyewear Collection
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Find Your{" "}
            <span style={{ color: "var(--color-primary, #FF055F)" }}>Perfect</span>
            <br />
            Pair of Frames
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(44,24,16,0.7)" }}>
            Explore our handpicked selection of stylish, comfortable eyewear designed for every face and every lifestyle.
          </p>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            <Filter className="w-4 h-4 mr-1" style={{ color: "rgba(44,24,16,0.4)" }} />
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor:
                    activeFilter === cat.key
                      ? "var(--color-primary, #FF055F)"
                      : "rgba(255,255,255,0.7)",
                  color: activeFilter === cat.key ? "#fff" : "var(--color-chocolate, #2C1810)",
                  border:
                    activeFilter === cat.key
                      ? "1px solid var(--color-primary, #FF055F)"
                      : "1px solid var(--color-warm-border, #E8DDD1)",
                  boxShadow:
                    activeFilter === cat.key
                      ? "0 4px 15px rgba(255,5,95,0.25)"
                      : "0 2px 8px rgba(44,24,16,0.04)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredFrames.map((frame) => (
                <motion.div
                  key={frame.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group rounded-3xl overflow-hidden transition-shadow duration-500 hover:shadow-xl"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.75)",
                    border: "1px solid var(--color-warm-border, #E8DDD1)",
                    boxShadow: "0 4px 30px rgba(44,24,16,0.08)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={frame.image}
                      alt={frame.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {frame.tag && (
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
                      >
                        {frame.tag}
                      </div>
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(44,24,16,0.3)" }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                        style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                      >
                        <Search className="w-5 h-5" style={{ color: "var(--color-chocolate, #2C1810)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-serif font-bold mb-1">{frame.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold" style={{ color: "var(--color-primary, #FF055F)" }}>
                        {frame.price}
                      </span>
                      <span
                        className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(212,165,116,0.15)",
                          color: "var(--color-warm-accent, #D4A574)",
                        }}
                      >
                        {frame.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lens Options */}
      <section className="lens-section px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Premium{" "}
              <span style={{ color: "var(--color-primary, #FF055F)" }}>Lens</span> Options
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(44,24,16,0.65)" }}>
              Enhance your eyewear with our advanced lens technologies for maximum comfort and protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {lensOptions.map((lens, idx) => {
              const LensIcon = lens.icon;
              return (
                <div
                  key={idx}
                  className="lens-card p-8 rounded-3xl text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    border: "1px solid var(--color-warm-border, #E8DDD1)",
                    boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "rgba(212,165,116,0.15)" }}
                  >
                    <LensIcon className="w-7 h-7" style={{ color: "var(--color-primary, #FF055F)" }} />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{lens.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(44,24,16,0.65)" }}>
                    {lens.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(212,165,116,0.15)",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "var(--color-primary, #FF055F)" }} />
              <span className="text-sm font-medium tracking-wide uppercase">How It Works</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Three Simple{" "}
              <span style={{ color: "var(--color-primary, #FF055F)" }}>Steps</span>
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="step-item flex items-start gap-6 p-7 rounded-3xl transition-all duration-500 hover:shadow-md"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-warm-border, #E8DDD1)",
                  boxShadow: "0 2px 15px rgba(44,24,16,0.05)",
                }}
              >
                <div
                  className="text-3xl font-serif font-bold flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl"
                  style={{
                    color: "var(--color-primary, #FF055F)",
                    backgroundColor: "rgba(255,5,95,0.08)",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "rgba(44,24,16,0.65)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)",
          }}
        >
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, var(--color-secondary, #00E5E5) 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 relative z-10">
            Can&apos;t Decide? Visit Our Store
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto relative z-10">
            Try on frames in person and let our experts help you find the perfect pair for your face shape and style.
          </p>

          <Link
            href="/appointment"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
          >
            Visit Store
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
