"use client";

import { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    subtitle: "More than just reading letters on a wall. A gentle, comprehensive deep-dive into your long-term eye health.",
    heroImage: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&q=80",
    content: [
      "We believe your vision deserves more than a hurried check. Our comprehensive eye examination goes far beyond a simple vision test. It’s a gentle, detailed exploration of your overall eye health—designed to give you complete peace of mind.",
      "Using advanced, comfortable diagnostic technology, our experienced optometrist thoroughly assesses everything from your visual acuity to the delicate retinal structures at the back of your eye. We check for refractive errors, evaluate your eye coordination, and perform critical health screenings with the utmost care.",
      "Because many eye conditions develop silently without obvious symptoms, proactive care is your best defense. We take the time to explain every step and finding, ensuring you understand your eye health and feel confident in our personalized guidance.",
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
    subtitle: "Precision digital technology for accurate, comfortable lens prescriptions.",
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    content: [
      "Step into the future of vision care. Our computerized eye power check-up utilizes state-of-the-art autorefraction technology to provide an exact, digital map of your eye's unique refractive needs.",
      "The process is remarkably quick, entirely comfortable, and completely non-invasive. Our digital system analyzes how light passes through your eye, instantly giving us a reliable baseline for your perfect prescription.",
      "Combined with the careful, human touch of our skilled optometrist, this modern approach ensures your final prescription isn't just technically flawless—it's perfectly tailored for your absolute everyday comfort.",
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
    subtitle: "Frames that don't just fit your face, but fit your personality. Discover eyewear you’ll actually love living in.",
    heroImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
    content: [
      "Finding the perfect pair of glasses shouldn't be a chore—it should be a joy. At Trinetra Eye Care, we thoughtfully curate our collection to help you discover frames that don't just fit your face perfectly, but beautifully express your unique personality.",
      "Your lifestyle dictates your lens needs, and we listen closely. Whether you're seeking relief from digital screens with advanced blue light filtering, or need seamless progressive lenses for all-day comfort, we tailor every detail so you can see the world clearly.",
      "Our friendly team is here to guide you, offering honest advice and expert fittings. We carefully craft each pair to ensure they feel like a natural extension of yourself, delivering lasting comfort and crystal-clear vision every single day.",
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
    subtitle: "Tired of the end-of-day ache? Stop surviving screen time and start seeing comfortably again.",
    heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    content: [
      "You don't have to live with tired, gritty, or uncomfortable eyes. Whether you're battling persistent dry eye, digital screen strain, or seasonal allergies, our compassionate team is dedicated to finding the real root of your discomfort.",
      "During your consultation, we take the time to truly listen to your experience. We perform gentle, targeted diagnostics to understand exactly what your eyes need, then collaborate with you to create a personalized, easily manageable treatment plan.",
      "We aren't just here to offer a quick fix. We provide ongoing support, clear education, and structured follow-up care to ensure you stop merely surviving your day and get back to seeing, working, and living comfortably.",
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

export default function ServiceDetailClient() {
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
          <div>
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
          </div>
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
