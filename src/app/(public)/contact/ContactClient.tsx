"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";

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



export default function ContactClient({ content }: { content: Record<string, string> }) {
  const contactInfo = [
    {
      icon: MapPin,
      title: content.contact_t1 || "Our Clinic",
      primary: content.contact_p1 || "Prithivichowk-8",
      secondary: content.contact_s1 || "Pokhara 33700, Kaski",
      color: "#FF055F",
      bg: "rgba(255,5,95,0.08)",
    },
    {
      icon: Phone,
      title: content.contact_t2 || "Speak With Us",
      primary: content.contact_p2 || content.settings_phone_call || "+977 9856064940",
      secondary: content.contact_s2 || "Opposite Nepal Bank",
      color: "#4CAF50",
      bg: "rgba(76,175,80,0.08)",
    },
    {
      icon: Mail,
      title: content.contact_t3 || "Write to Us",
      primary: content.contact_p3 || content.settings_email || "care@trinetraeyecare.com",
      secondary: content.contact_s3 || "appointments@trinetraeyecare.com",
      color: "#D4A574",
      bg: "rgba(212,165,116,0.12)",
    },
    {
      icon: Clock,
      title: content.contact_t4 || "When We're Open",
      primary: content.contact_p4 || content.settings_hours_week || "Mon – Fri: 9:00 AM – 6:00 PM",
      secondary: content.contact_s4 || content.settings_hours_weekend || "Saturday: 9:00 AM – 1:00 PM",
      color: "#00E5E5",
      bg: "rgba(0,229,229,0.08)",
    },
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)" }}
    >
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto contact-hero-text">
          <div
            
            
            
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "#FAF5EF",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <Phone
              size={16}
              className="text-[var(--color-primary,#FF055F)]"
            />
            <span
              className="text-sm font-medium text-[var(--color-chocolate,#2C1810)]"
            >
              We&apos;re Here for You
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[var(--color-chocolate,#2C1810)]"
          >
            Let&apos;s schedule your visit.
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{
              color: "var(--color-chocolate, #2C1810)",
              opacity: 0.65,
            }}
          >
            Take charge of your eye health. We listen first, then we act. We&apos;re here to help with any questions about our services, your appointment, or your vision journey.
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
                className="font-bold text-sm mb-2 text-[var(--color-chocolate,#2C1810)]"
              >
                {item.title}
              </h3>
              <p
                className="text-sm font-medium text-[var(--color-chocolate,#2C1810)]"
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
                    className="text-[var(--color-primary,#FF055F)]"
                  />
                </div>
                <h3
                  className="font-bold text-lg font-serif mb-2 text-[var(--color-chocolate,#2C1810)]"
                >
                  Where to Find Us
                </h3>
                <p
                  className="text-sm mb-5 max-w-xs"
                  style={{
                    color: "var(--color-chocolate, #2C1810)",
                    opacity: 0.6,
                  }}
                >
                  Prithivichowk-8, Pokhara 33700<br />Opposite Nepal Bank
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
                className="text-2xl font-bold font-serif mb-2 text-[var(--color-chocolate,#2C1810)]"
              >
                Reach Out to Our Care Team
              </h2>
              <p
                className="text-sm mb-7"
                style={{
                  color: "var(--color-chocolate, #2C1810)",
                  opacity: 0.55,
                }}
              >
                Whenever you&apos;re ready, leave us a note. We&apos;ll get back to you with the answers you need.
              </p>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block text-[var(--color-chocolate,#2C1810)]"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block text-[var(--color-chocolate,#2C1810)]"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block text-[var(--color-chocolate,#2C1810)]"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+977 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block text-[var(--color-chocolate,#2C1810)]"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="What is this about?"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      
                    />
                  </div>

                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block text-[var(--color-chocolate,#2C1810)]"
                    >
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us more..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                      
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
                    {isSubmitting ? "Sending..." : <EditableText as="span" page="contact" contentKey="form_btn" defaultText={content.form_btn || "Send a Message"} />}
                  </button>
                </form>
              ) : (
                <div
                  
                  
                  
                  className="text-center py-12"
                >
                  <div
                    
                    
                    
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "#E8F5E8" }}
                  >
                    <CheckCircle2 size={32} color="#4CAF50" />
                  </div>
                  <h3
                    className="font-bold text-xl font-serif mb-2 text-[var(--color-chocolate,#2C1810)]"
                  >
                    Message Received
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--color-chocolate, #2C1810)",
                      opacity: 0.6,
                    }}
                  >
                    Thank you for reaching out to us. One of our care team members will respond to you soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
