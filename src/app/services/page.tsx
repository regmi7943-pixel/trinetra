"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eye, Microscope, Glasses, HeartHandshake, ArrowRight, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    slug: "eye-examination",
    icon: Eye,
    title: "Eye Examination",
    description:
      "Comprehensive eye health assessments using modern diagnostic techniques. Our thorough examinations detect early signs of eye conditions, ensuring your vision stays sharp and healthy.",
    image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&q=80",
    highlights: [
      "Visual acuity testing",
      "Retinal health screening",
      "Intraocular pressure check",
      "Color vision assessment",
    ],
  },
  {
    slug: "computerized-eye-checkup",
    icon: Microscope,
    title: "Computerized Eye Power Check-Up",
    description:
      "State-of-the-art computerized refraction technology for precise measurement of your eye power. Get accurate prescriptions with our advanced autorefraction equipment.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    highlights: [
      "Autorefraction testing",
      "Digital lens prescription",
      "Corneal topography",
      "Wavefront analysis",
    ],
  },
  {
    slug: "prescription-glasses",
    icon: Glasses,
    title: "Prescription Glasses",
    description:
      "A curated collection of designer frames paired with precision-crafted lenses. From everyday essentials to premium eyewear, find the perfect pair for your lifestyle.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
    highlights: [
      "Designer frame selection",
      "Progressive & bifocal lenses",
      "Blue light protection",
      "Anti-glare coatings",
    ],
  },
  {
    slug: "eye-condition-consultation",
    icon: HeartHandshake,
    title: "Eye Condition Consultation",
    description:
      "Expert consultation for a wide range of eye conditions. From dry eyes to more complex concerns, our experienced team provides personalized treatment plans and ongoing care.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    highlights: [
      "Dry eye management",
      "Allergic eye treatment",
      "Diabetic eye screening",
      "Personalized care plans",
    ],
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header text reveal
      gsap.from(headerRef.current?.querySelectorAll(".reveal-text") || [], {
        y: 60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Staggered card entrance
      const cards = cardsRef.current?.querySelectorAll(".service-card") || [];
      gsap.from(cards, {
        y: 80,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // CTA section parallax
      gsap.from(".cta-section", {
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%",
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
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div ref={headerRef} className="max-w-5xl mx-auto text-center">
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
            <Sparkles className="w-4 h-4" style={{ color: "var(--color-primary, #FF055F)" }} />
            <span className="text-sm font-medium tracking-wide uppercase" style={{ color: "var(--color-chocolate, #2C1810)" }}>
              Our Services
            </span>
          </motion.div>

          <h1 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Comprehensive{" "}
            <span style={{ color: "var(--color-primary, #FF055F)" }}>Eye Care</span>
            <br />
            Services
          </h1>

          <p
            className="reveal-text text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(44,24,16,0.7)" }}
          >
            From routine check-ups to specialized consultations, we provide a full spectrum of eye care
            services tailored to your unique needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 lg:px-8 pb-20">
        <div ref={cardsRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.slug}
                className="service-card group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-warm-border, #E8DDD1)",
                  boxShadow: "0 4px 30px rgba(44,24,16,0.08)",
                }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(44,24,16,0.5) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: "var(--color-primary, #FF055F)" }} />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-[15px] leading-relaxed mb-5" style={{ color: "rgba(44,24,16,0.7)" }}>
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm py-1.5"
                        style={{ color: "var(--color-chocolate, #2C1810)" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* View Details Link */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/link"
                    style={{ color: "var(--color-primary, #FF055F)" }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section px-6 lg:px-8 pb-24">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, var(--color-primary, #FF055F) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 relative z-10">
            Ready to Take Care of Your Eyes?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto relative z-10">
            Book an appointment with our experienced team and give your eyes the care they deserve.
          </p>

          <Link
            href="/appointment"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
          >
            Book Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
