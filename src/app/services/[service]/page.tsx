"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, CheckCircle2, Clock, Users, Star, CalendarCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  title: string;
  subtitle: string;
  heroImage: string;
  content: string[];
  duration: string;
  who: string;
  benefits: string[];
}

const serviceData: Record<string, ServiceData> = {
  "eye-examination": {
    title: "Eye Examination",
    subtitle: "Thorough vision and eye health assessment by our expert optometrists",
    heroImage: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&q=80",
    content: [
      "Our comprehensive eye examination goes far beyond a simple vision test. Using advanced diagnostic equipment, our experienced optometrists conduct a thorough assessment of your complete eye health — from the front surface of the eye to the delicate retinal structures at the back.",
      "During the examination, we evaluate your visual acuity, check for refractive errors such as myopia, hyperopia, and astigmatism, and assess your eye coordination and focusing ability. We also perform critical health screenings including intraocular pressure measurement for glaucoma risk and detailed retinal examination.",
      "Early detection is key to preventing vision loss. Many serious eye conditions, including glaucoma and diabetic retinopathy, develop silently without noticeable symptoms. Regular comprehensive eye exams are your best defense against these sight-threatening conditions.",
    ],
    duration: "30–45 minutes",
    who: "Recommended for all ages, especially adults over 40 and anyone experiencing vision changes",
    benefits: [
      "Early detection of eye diseases",
      "Accurate vision prescription",
      "Comprehensive retinal health check",
      "Color vision & depth perception testing",
      "Personalized eye health advice",
      "Digital eye strain assessment",
    ],
  },
  "computerized-eye-checkup": {
    title: "Computerized Eye Power Check-Up",
    subtitle: "Precision digital refraction for accurate lens prescriptions",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    content: [
      "Our computerized eye power check-up utilizes state-of-the-art autorefraction technology to measure the refractive power of your eyes with exceptional accuracy. This advanced digital assessment provides the foundation for precise prescription glasses and contact lenses.",
      "The process is quick, comfortable, and non-invasive. Our autorefractor analyzes how light passes through your eye's optical system, measuring the exact degree of correction needed. This digital precision eliminates guesswork and provides reliable, repeatable results.",
      "Combined with subjective refraction performed by our skilled optometrists, this dual approach ensures your final prescription is both technically accurate and personally comfortable for your unique visual needs.",
    ],
    duration: "15–20 minutes",
    who: "Anyone needing an updated prescription or first-time glasses wearers",
    benefits: [
      "High-precision digital measurements",
      "Quick & comfortable procedure",
      "Accurate prescription results",
      "Advanced corneal mapping",
      "Suitable for all age groups",
      "Foundation for perfect lenses",
    ],
  },
  "prescription-glasses": {
    title: "Prescription Glasses",
    subtitle: "Designer frames and precision lenses tailored to your style and vision",
    heroImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
    content: [
      "Finding the perfect pair of glasses is about more than just clear vision — it's about expressing your personal style while enjoying optimal visual comfort. At Trinetra Eye Care, we offer a thoughtfully curated collection of frames from trusted brands, ensuring quality and style for every taste and budget.",
      "Our lens options are equally impressive. From single-vision and progressive lenses to specialized coatings like anti-glare, blue light filtering, and photochromic technology, we customize every pair to match your lifestyle. Whether you spend hours at a screen or enjoy outdoor activities, we have the right lens solution.",
      "Our expert team guides you through the selection process, helping you find frames that complement your face shape, fit comfortably, and meet your daily visual demands. Every pair is carefully crafted and fitted to ensure lasting comfort and crystal-clear vision.",
    ],
    duration: "Frame selection: 20–30 min | Lens crafting: 2–5 days",
    who: "Anyone with a corrective lens prescription seeking quality eyewear",
    benefits: [
      "Wide range of designer frames",
      "Premium lens materials",
      "Blue light protection options",
      "Anti-glare & scratch-resistant coatings",
      "Progressive & bifocal lenses",
      "Professional fitting & adjustments",
    ],
  },
  "eye-condition-consultation": {
    title: "Eye Condition Consultation",
    subtitle: "Expert evaluation and treatment plans for various eye conditions",
    heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    content: [
      "Our eye condition consultation service provides specialized evaluation and management for a wide range of ocular concerns. Whether you're dealing with persistent dry eyes, seasonal allergies affecting your eyes, or more complex conditions, our experienced team is here to help.",
      "During your consultation, we take a detailed history of your symptoms, perform targeted diagnostic tests, and develop a personalized treatment plan. We believe in educating our patients about their conditions, empowering you to make informed decisions about your eye health.",
      "For conditions requiring ongoing management, we provide structured follow-up care and monitoring. Our goal is not just to treat symptoms, but to address root causes and prevent recurrence, ensuring long-term eye health and comfort.",
    ],
    duration: "30–60 minutes (depending on complexity)",
    who: "Patients experiencing eye discomfort, vision changes, or diagnosed eye conditions",
    benefits: [
      "Expert condition diagnosis",
      "Personalized treatment plans",
      "Dry eye management protocols",
      "Allergy & inflammation treatment",
      "Diabetic eye health screening",
      "Ongoing follow-up care",
    ],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.service as string;
  const containerRef = useRef<HTMLDivElement>(null);

  const service = serviceData[slug];

  useGSAP(
    () => {
      if (!service) return;

      // Content paragraphs reveal
      gsap.from(".content-para", {
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".content-section",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Benefits list stagger
      gsap.from(".benefit-item", {
        x: -30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".benefits-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Sidebar entrance
      gsap.from(".sidebar-card", {
        x: 40,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });
    },
    { scope: containerRef, dependencies: [slug] }
  );

  if (!service) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: "var(--color-cream, #FDF8F3)", color: "var(--color-chocolate, #2C1810)" }}
      >
        <h1 className="text-3xl font-serif font-bold mb-4">Service Not Found</h1>
        <p className="mb-8" style={{ color: "rgba(44,24,16,0.6)" }}>
          The service you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)", color: "var(--color-chocolate, #2C1810)" }}
    >
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(44,24,16,0.75) 0%, rgba(44,24,16,0.2) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
              {service.title}
            </h1>
            <p className="text-white/75 text-lg max-w-2xl">{service.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 content-section">
            <div className="space-y-6">
              {service.content.map((para, idx) => (
                <p
                  key={idx}
                  className="content-para text-[16px] leading-[1.85] tracking-wide"
                  style={{ color: "rgba(44,24,16,0.75)" }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Benefits */}
            <div className="benefits-section mt-14">
              <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                <Star className="w-6 h-6" style={{ color: "var(--color-primary, #FF055F)" }} />
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="benefit-item flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.6)",
                      border: "1px solid var(--color-warm-border, #E8DDD1)",
                    }}
                  >
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: "var(--color-primary, #FF055F)" }}
                    />
                    <span className="text-[15px] font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="sidebar-card sticky top-28 rounded-3xl p-7 space-y-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.75)",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.08)",
              }}
            >
              <h3 className="text-lg font-serif font-bold">Service Details</h3>

              {/* Duration */}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(212,165,116,0.15)" }}
                >
                  <Clock className="w-5 h-5" style={{ color: "var(--color-warm-accent, #D4A574)" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(44,24,16,0.5)" }}>
                    Duration
                  </p>
                  <p className="text-sm font-medium">{service.duration}</p>
                </div>
              </div>

              {/* Who is it for */}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(212,165,116,0.15)" }}
                >
                  <Users className="w-5 h-5" style={{ color: "var(--color-warm-accent, #D4A574)" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgba(44,24,16,0.5)" }}>
                    Who It&apos;s For
                  </p>
                  <p className="text-sm font-medium leading-relaxed">{service.who}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full" style={{ backgroundColor: "var(--color-warm-border, #E8DDD1)" }} />

              {/* Book Now CTA */}
              <Link
                href="/appointment"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
              >
                <CalendarCheck className="w-5 h-5" />
                Book Now
              </Link>

              <p className="text-xs text-center" style={{ color: "rgba(44,24,16,0.45)" }}>
                Walk-ins welcome · No wait appointments
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
