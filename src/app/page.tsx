"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { ArrowRight, Phone, MapPin, Clock, Star, ShieldCheck, Microscope, HeartHandshake, Eye } from "lucide-react";
import { useLanguage } from "@/context/language-context";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero text reveal
    gsap.from(".hero-title span", {
      y: 80,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
    });
    gsap.from(".hero-sub", {
      y: 30,
      duration: 0.8,
      delay: 0.6,
      ease: "power2.out",
    });
    gsap.from(".hero-cta", {
      y: 20,
      duration: 0.6,
      delay: 0.9,
      ease: "power2.out",
      stagger: 0.15,
    });

    // Story section parallax
    gsap.from(".story-image", {
      scrollTrigger: {
        trigger: ".story-section",
        start: "top 80%",
        end: "bottom 40%",
        scrub: 1,
      },
      y: 60,
      scale: 1.08,
    });

    // Story text
    gsap.from(".story-text > *", {
      scrollTrigger: {
        trigger: ".story-section",
        start: "top 75%",
      },
      y: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Service stacked cards — peel-away scroll animation
    const stackedCards = gsap.utils.toArray(".stacked-service-card") as HTMLElement[];
    if (stackedCards.length) {
      const totalCards = stackedCards.length;

      // Set initial stacked positions (all visible, layered)
      stackedCards.forEach((card, i) => {
        // Card 0 should be visually on top (highest z-index) and at y=0
        const offset = i * 14;
        const scaleVal = 1 - i * 0.035;
        gsap.set(card, {
          y: offset,
          scale: scaleVal,
          zIndex: totalCards - i,
        });
      });

      // For each card except the last, animate it flying up and away
      stackedCards.forEach((card, i) => {
        if (i < totalCards - 1) {
          const segmentStart = i / totalCards;
          const segmentEnd = (i + 1) / totalCards;

          // Peel the top card away
          ScrollTrigger.create({
            trigger: ".services-scroll-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= segmentStart && progress <= segmentEnd) {
                const localProgress = (progress - segmentStart) / (segmentEnd - segmentStart);
                gsap.set(card, {
                  y: -localProgress * 600,
                  rotation: localProgress * -8,
                  opacity: 1 - localProgress,
                  scale: 1 - localProgress * 0.1,
                });
              } else if (progress < segmentStart) {
                // Reset card above
                const offset = i * 14;
                const scaleVal = 1 - i * 0.035;
                gsap.set(card, { y: offset, rotation: 0, opacity: 1, scale: scaleVal });
              } else {
                // Card already peeled
                gsap.set(card, { y: -600, rotation: -8, opacity: 0 });
              }
            }
          });

          // As each card peels, the card behind rises to the front
          const nextCard = stackedCards[i + 1];
          ScrollTrigger.create({
            trigger: ".services-scroll-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= segmentStart && progress <= segmentEnd) {
                const localProgress = (progress - segmentStart) / (segmentEnd - segmentStart);
                const currentOffset = (i + 1) * 14;
                gsap.set(nextCard, {
                  y: currentOffset * (1 - localProgress),
                  scale: 1 - (i + 1) * 0.035 * (1 - localProgress),
                });
              }
            }
          });
        }
      });
    }

    // Why choose staggered
    gsap.from(".why-card", {
      scrollTrigger: {
        trigger: ".why-section",
        start: "top 75%",
      },
      y: 40,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, { scope: heroRef });

  const services = [
    {
      title: "Eye Examination",
      desc: "Thorough vision testing and ocular health assessment using world-class diagnostic tools.",
      icon: <Eye size={28} />,
      slug: "eye-examination",
      gradient: "linear-gradient(135deg, #FF055F 0%, #D4A574 100%)",
    },
    {
      title: "Computerized Eye Power Check",
      desc: "Digital precision for your exact lens prescription with advanced auto-refraction technology.",
      icon: <Microscope size={28} />,
      slug: "computerized-eye-power-check-up",
      gradient: "linear-gradient(135deg, #2C6E63 0%, #5CBFB0 100%)",
    },
    {
      title: "Prescription Glasses",
      desc: "Curated frames and advanced lens technologies tailored to your lifestyle and vision needs.",
      icon: <Star size={28} />,
      slug: "prescription-glasses",
      gradient: "linear-gradient(135deg, #7B5EA7 0%, #A78BFA 100%)",
    },
    {
      title: "Eye Condition Consultation",
      desc: "Expert diagnostics and personalized treatment plans for every eye condition.",
      icon: <HeartHandshake size={28} />,
      slug: "eye-condition-consultation",
      gradient: "linear-gradient(135deg, #1E5B9B 0%, #5DA8DC 100%)",
    },
  ];

  return (
    <div ref={heroRef}>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen bg-[#FDF8F3] overflow-hidden">
        <div className="grid min-h-screen lg:grid-cols-[1fr_1.15fr]">
          {/* Text Content */}
          <div className="flex items-center px-6 md:px-12 lg:px-16 py-28 lg:py-24">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-8">
                <Star size={14} className="fill-current" />
                Rated 5.0 on Google • Pokhara&apos;s Trusted Eye Clinic
              </div>

              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--color-chocolate)] mb-8">
                <span className="inline-block">Precision</span>{" "}
                <span className="inline-block">vision,</span>
                <br />
                <span className="inline-block">modern</span>{" "}
                <span className="inline-block">care</span>
              </h1>

              <p className="hero-sub text-lg md:text-2xl text-[var(--color-chocolate-muted)] font-light mb-10 max-w-xl leading-relaxed">
                {t("hero.subtagline")} with 15+ years of international expertise by Dr. Bijay Regmi.
              </p>

              <div className="flex flex-row gap-4">
                <Link
                  href="/appointment"
                  className="hero-cta group inline-flex flex-1 min-w-0 items-center justify-center gap-2 px-6 py-4 rounded-full bg-[var(--color-primary)] text-white font-semibold text-base sm:text-lg transition-all hover:shadow-[0_8px_30px_rgba(255,5,95,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="sm:hidden">Appointment</span>
                  <span className="hidden sm:inline">{t("btn.book")}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="hero-cta inline-flex flex-1 min-w-0 items-center justify-center px-6 py-4 rounded-full border border-[var(--color-chocolate)]/25 text-[var(--color-chocolate)] font-semibold text-base sm:text-lg hover:bg-[var(--color-chocolate)]/5 transition-colors"
                >
                  <span className="sm:hidden">Services</span>
                  <span className="hidden sm:inline">Explore Services</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative min-h-[54vh] lg:min-h-screen"
          >
            <img
              src="/ChatGPT Image May 28, 2026, 03_37_57 PM.png"
              alt="Close-up of eye for vision care"
              className="absolute inset-0 h-full w-full object-cover object-top lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#FDF8F3]/30 lg:to-[#FDF8F3]/12" />
          </motion.div>
        </div>
      </section>

      {/* ─── Quick Info Bar ─── */}
      <section className="container mx-auto px-6 md:px-12 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(44,24,16,0.08)] flex flex-col md:flex-row justify-around items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--color-warm-border)]"
        >
          {[
            { icon: <Phone size={22} />, label: "Call Us", value: "+977 1234567890" },
            { icon: <Clock size={22} />, label: "Opening Hours", value: "Sun – Fri, 9AM – 6PM" },
            { icon: <MapPin size={22} />, label: "Location", value: "Nayabazar Road, Pokhara" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 w-full md:justify-center pt-4 md:pt-0">
              <div className="p-3 rounded-xl bg-[var(--color-warm-accent)]/15 text-[var(--color-warm-accent)]">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-[var(--color-chocolate-muted)] font-semibold uppercase tracking-wider">{item.label}</p>
                <p className="text-[var(--color-chocolate)] font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ─── Who We Are ─── */}
      <section className="story-section py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="story-text space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">About the Founder</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-chocolate)] leading-tight">
                World-Class Eye Care by{" "}
                <span className="text-[var(--color-warm-accent)]">Dr. Bijay Regmi</span>
              </h2>
              <p className="text-lg text-[var(--color-chocolate-muted)] leading-relaxed">
                After spending over 15 years in advanced clinical environments across Germany and the Middle East, Dr. Regmi returned to Pokhara with a mission: to bring internationally benchmarked optometric care to every patient in Nepal.
              </p>
              <p className="text-lg text-[var(--color-chocolate-muted)] leading-relaxed">
                Trinetra Eye Care Center combines state-of-the-art computerized diagnostics with a deeply personal, patient-first approach.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all">
                Read our full story <ArrowRight size={18} />
              </Link>
            </div>

            <div className="story-image relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                alt="Dr. Bijay Regmi"
                className="w-full h-[500px] object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--color-chocolate)]/60 to-transparent rounded-b-3xl">
                <p className="text-white font-semibold text-lg">Dr. Bijay Regmi</p>
                <p className="text-white/70 text-sm">Senior Optometrist &bull; 15+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Snapshot ─── */}
      <section className="services-scroll-section h-[300vh] bg-[var(--color-cream-dark)] relative">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="text-center mb-12 max-w-2xl mx-auto px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-chocolate)] mb-4">Our Services</h2>
            <p className="text-[var(--color-chocolate-muted)] text-lg">Comprehensive diagnostic and optical services tailored for your visual health.</p>
          </div>

          {/* Stacked Cards */}
          <div className="relative w-full max-w-xl mx-auto h-[360px] sm:h-[400px] px-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className="stacked-service-card absolute inset-x-6 top-0 w-[calc(100%-3rem)] h-[360px] sm:h-[400px] rounded-3xl p-8 sm:p-10 flex flex-col justify-end shadow-[0_20px_60px_rgba(0,0,0,0.15)] cursor-pointer group will-change-transform"
                style={{
                  background: service.gradient,
                  transformOrigin: "center top",
                }}
              >
                {/* Icon */}
                <div className="absolute top-6 left-8 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                  {service.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
                    {service.desc}
                  </p>
                </div>

                {/* Arrow indicator on hover */}
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="mt-12 opacity-50">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-chocolate-muted)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--color-chocolate-muted)]" />
              Scroll to explore
              <span className="w-8 h-px bg-[var(--color-chocolate-muted)]" />
            </span>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="why-section py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm-accent)] mb-3">The Trinetra Difference</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-chocolate)]">Why Choose Trinetra?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "15+ Years Experience",
                icon: <Star size={36} />,
                desc: "Extensive clinical training and practice across Germany, UAE, and Nepal's premier institutions.",
              },
              {
                title: "Modern Equipment",
                icon: <Microscope size={36} />,
                desc: "Computerized auto-refraction and digital diagnostics for pinpoint prescription accuracy.",
              },
              {
                title: "Patient-First Care",
                icon: <ShieldCheck size={36} />,
                desc: "A warm, compassionate approach that prioritizes your comfort and long-term visual health.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="why-card text-center">
                <div className="w-20 h-20 rounded-3xl bg-[var(--color-warm-accent)]/10 flex items-center justify-center text-[var(--color-warm-accent)] mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-chocolate)] mb-3">{feature.title}</h3>
                <p className="text-[var(--color-chocolate-muted)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Google Rating Showcase ─── */}
      <section className="py-20 bg-[var(--color-cream-dark)]">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">Social Proof</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-chocolate)] mb-4">Trusted by Our Patients</h2>
            <p className="text-[var(--color-chocolate-muted)] mb-6 text-lg">See why families across Pokhara rate us 5 stars for our clinical precision and compassionate care.</p>
            <Link href="/reviews" className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all">
              Read all reviews <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-1 bg-white rounded-3xl p-10 shadow-[0_4px_40px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border)] flex flex-col items-center text-center max-w-md w-full"
          >
            <div className="text-6xl font-extrabold text-[var(--color-chocolate)] mb-2">5.0</div>
            <div className="flex gap-1 text-[#FBBC04] mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={24} className="fill-current" />
              ))}
            </div>
            <p className="text-[var(--color-chocolate-light)] font-medium mb-4 text-lg italic">
              "Best eye care center in Pokhara. Highly professional, accurate, and genuinely caring."
            </p>
            <p className="text-sm text-[var(--color-chocolate-muted)]">— Based on Google Reviews</p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-chocolate)] mb-6">Ready for Clearer Vision?</h2>
          <p className="text-[var(--color-chocolate-muted)] text-lg mb-10 max-w-xl mx-auto">Book your comprehensive eye examination with Dr. Bijay Regmi today.</p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-[var(--color-primary)] text-white font-bold text-lg hover:shadow-[0_8px_30px_rgba(255,5,95,0.3)] transition-all hover:scale-[1.02]"
          >
            Book Appointment <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
