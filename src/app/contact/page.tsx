"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    primary: "123 Vision Lane, Health District",
    secondary: "New Delhi, India — 110001",
    color: "#FF055F",
    bg: "rgba(255,5,95,0.08)",
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: "+91 98765 43210",
    secondary: "+91 11-2345 6789",
    color: "#4CAF50",
    bg: "rgba(76,175,80,0.08)",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: "care@trinetraeyecare.com",
    secondary: "appointments@trinetraeyecare.com",
    color: "#D4A574",
    bg: "rgba(212,165,116,0.12)",
  },
  {
    icon: Clock,
    title: "Working Hours",
    primary: "Mon – Sat: 9:00 AM – 7:00 PM",
    secondary: "Sunday: 10:00 AM – 2:00 PM",
    color: "#00E5E5",
    bg: "rgba(0,229,229,0.08)",
  },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-hero-text", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".contact-card", {
        y: 60,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".map-container", {
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".map-container",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".form-section", {
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const inputStyles: React.CSSProperties = {
    backgroundColor: "#FAF5EF",
    border: "1.5px solid var(--color-warm-border, #E8DDD1)",
    color: "var(--color-chocolate, #2C1810)",
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)" }}
    >
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto contact-hero-text">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "#FAF5EF",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <Phone
              size={16}
              style={{ color: "var(--color-primary, #FF055F)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            >
              Get in Touch
            </span>
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
            style={{ color: "var(--color-chocolate, #2C1810)" }}
          >
            Contact Us
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{
              color: "var(--color-chocolate, #2C1810)",
              opacity: 0.65,
            }}
          >
            We&apos;re here to help with any questions about our services, your
            appointment, or your eye health journey.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section ref={cardsRef} className="px-4 pb-16">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="contact-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <h3
                className="font-bold text-sm mb-2"
                style={{ color: "var(--color-chocolate, #2C1810)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-chocolate, #2C1810)" }}
              >
                {item.primary}
              </p>
              <p
                className="text-xs mt-1"
                style={{
                  color: "var(--color-chocolate, #2C1810)",
                  opacity: 0.5,
                }}
              >
                {item.secondary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Map & Form */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div>
            <div
              className="map-container rounded-3xl overflow-hidden h-80 lg:h-full min-h-[320px] flex items-center justify-center relative"
              style={{
                backgroundColor: "#F3E8DA",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
              }}
            >
              <div className="text-center p-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: "rgba(255,5,95,0.08)",
                  }}
                >
                  <MapPin
                    size={28}
                    style={{ color: "var(--color-primary, #FF055F)" }}
                  />
                </div>
                <h3
                  className="font-bold text-lg font-serif mb-2"
                  style={{ color: "var(--color-chocolate, #2C1810)" }}
                >
                  Find Us Here
                </h3>
                <p
                  className="text-sm mb-5 max-w-xs"
                  style={{
                    color: "var(--color-chocolate, #2C1810)",
                    opacity: 0.6,
                  }}
                >
                  123 Vision Lane, Health District, New Delhi
                </p>
              </div>

              {/* Decorative Grid */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-chocolate, #2C1810) 1px, transparent 1px), linear-gradient(90deg, var(--color-chocolate, #2C1810) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div ref={formRef} className="form-section">
            <div
              className="rounded-3xl p-8"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
              }}
            >
              <h2
                className="text-2xl font-bold font-serif mb-2"
                style={{ color: "var(--color-chocolate, #2C1810)" }}
              >
                Send a Message
              </h2>
              <p
                className="text-sm mb-7"
                style={{
                  color: "var(--color-chocolate, #2C1810)",
                  opacity: 0.55,
                }}
              >
                Have a question or concern? Fill out the form and we&apos;ll get
                back to you promptly.
              </p>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "var(--color-chocolate, #2C1810)" }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "var(--color-chocolate, #2C1810)" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "var(--color-chocolate, #2C1810)" }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "var(--color-chocolate, #2C1810)" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="What is this about?"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "var(--color-chocolate, #2C1810)" }}
                    >
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      style={inputStyles}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: "#00E5E5",
                      boxShadow: "0 4px 20px rgba(0,229,229,0.25)",
                    }}
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "#E8F5E8" }}
                  >
                    <CheckCircle2 size={32} color="#4CAF50" />
                  </motion.div>
                  <h3
                    className="font-bold text-xl font-serif mb-2"
                    style={{ color: "var(--color-chocolate, #2C1810)" }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--color-chocolate, #2C1810)",
                      opacity: 0.6,
                    }}
                  >
                    Thank you for reaching out. We&apos;ll respond within 24
                    hours.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
