"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Phone, MapPin, Clock, Star, ShieldCheck, Microscope, HeartHandshake, Eye } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

gsap.registerPlugin(ScrollTrigger);

const MobileCarousel = ({ services }: { services: any[] }) => {
  return (
    <div className="w-full flex justify-center pb-8 mt-6 overflow-visible">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="w-[280px] h-[380px]"
      >
        {services.map((service) => (
          <SwiperSlide
            key={service.slug}
            className="rounded-3xl p-8 flex flex-col justify-end shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative overflow-hidden"
            style={{
              background: service.gradient,
            }}
          >
            <div className="absolute top-6 left-8 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
              {service.icon}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
                {service.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function HomeClient({ content }: { content: Record<string, string> }) {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero text reveal
    gsap.from(".hero-title", {
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

    // Service stacked cards — peel-away scroll animation (Desktop only)
    const stackedCards = gsap.utils.toArray(".stacked-service-card") as HTMLElement[];
    if (stackedCards.length) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const totalCards = stackedCards.length;

        // Set  stacked positions (all visible, layered)
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

        // For each card except the last,  it flying up and away
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

    // Other animations
    gsap.fromTo(".info-bar", { opacity: 0, y: 30 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".info-bar",
        start: "top 90%"
      }
    });

    gsap.fromTo(".hero-image", { opacity: 0, scale: 1.04 }, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      delay: 0.15
    });
  }, { scope: heroRef });

  const services = [
    {
      title: content.srv_t1 || "Optometry & Eye Exams",
      desc: content.srv_d1 || "Thorough, gentle vision testing and ocular health assessments designed to protect your sight.",
      icon: <Eye size={28} />,
      slug: "eye-examination",
      gradient: "linear-gradient(135deg, #FF055F 0%, #D4A574 100%)",
    },
    {
      title: content.srv_t2 || "Computerized Power Check",
      desc: content.srv_d2 || "Digital precision providing an objective baseline so you get exactly the prescription you need.",
      icon: <Microscope size={28} />,
      slug: "computerized-eye-power-check-up",
      gradient: "linear-gradient(135deg, #2C6E63 0%, #5CBFB0 100%)",
    },
    {
      title: content.srv_t3 || "Optical Sales & Eyewear",
      desc: content.srv_d3 || "Beautifully curated frames and advanced prescription lenses tailored perfectly to your daily life.",
      icon: <Star size={28} />,
      slug: "optical-sales",
      gradient: "linear-gradient(135deg, #7B5EA7 0%, #A78BFA 100%)",
    },
  ];

  return (
    <div ref={heroRef}>

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[100dvh] bg-[#FDF8F3] overflow-hidden">
        <div className="grid min-h-[100dvh] lg:grid-cols-[1fr_1.15fr]">
          
          {/* Text Content */}
          <div className="relative z-10 flex flex-col justify-end lg:justify-center px-6 md:px-12 lg:px-16 pb-32 pt-32 lg:py-24 h-full">
            <div className="max-w-[560px]">
              
              {/* Rated Badge (Desktop Only) */}
              <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-8">
                <Star size={14} className="fill-current" />
                <EditableText page="home" contentKey="hero_badge" defaultText={content.hero_badge || "Rated 5.0 on Google • Pokhara's Trusted Eye Care Center"} />
              </div>

              {/* Mobile Welcome Text */}
              <p className="lg:hidden hero-sub text-white/80 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] mb-2">
                <EditableText page="home" contentKey="hero_welcome" defaultText={content.hero_welcome || "Welcome To"} />
              </p>

              <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-white lg:text-[var(--color-chocolate)] mb-3 lg:mb-8">
                <EditableText as="span" page="home" contentKey="hero_title" defaultText={content.hero_title || "See the life you love, beautifully. Modern eye care designed entirely around you."} />
              </h1>

              <p className="hero-sub text-base sm:text-lg md:text-2xl text-white/90 lg:text-[var(--color-chocolate-muted)] font-light mb-8 max-w-xl leading-relaxed">
                <EditableText as="span" page="home" contentKey="hero_sub" defaultText={content.hero_sub || "Experience a gentler, more thoughtful approach to your eye health with 15+ years of international expertise by Bijay Regmi."} />
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Link
                  href="/appointment"
                  className="hero-cta group w-full lg:w-auto inline-flex flex-1 min-w-0 items-center justify-center gap-2 px-6 py-4 rounded-xl lg:rounded-full bg-white lg:bg-[var(--color-primary)] text-[var(--color-chocolate)] lg:text-white font-bold text-base sm:text-lg transition-all hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] lg:hover:shadow-[0_8px_30px_rgba(255,5,95,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="lg:hidden uppercase tracking-widest text-sm"><EditableText as="span" page="home" contentKey="btn_book" defaultText={content.btn_book || "Book"} /></span>
                  <span className="hidden lg:inline">{t("btn.book")}</span>
                  <ArrowRight size={18} className="lg:hidden" />
                  <ArrowRight size={20} className="hidden lg:block group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="hero-cta hidden lg:inline-flex w-full sm:w-auto flex-1 min-w-0 items-center justify-center px-6 py-4 rounded-full border border-[var(--color-chocolate)]/25 text-[var(--color-chocolate)] font-semibold text-base sm:text-lg hover:bg-[var(--color-chocolate)]/5 transition-colors"
                >
                  <span className="sm:hidden"><EditableText as="span" page="home" contentKey="btn_services1" defaultText={content.btn_services1 || "Services"} /></span>
                  <span className="hidden sm:inline"><EditableText as="span" page="home" contentKey="btn_services2" defaultText={content.btn_services2 || "Explore Services"} /></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="hero-image absolute inset-0 lg:relative lg:min-h-screen z-0 opacity-0">
            <EditableImage page="home" contentKey="hero_image" defaultSrc={content.hero_image || "/ChatGPT Image May 28, 2026, 03_37_57 PM.png"} alt="Close-up of eye for vision care" className="absolute inset-0 h-full w-full object-cover object-[center_top] lg:object-center" fill />
            {/* Mobile Gradient (Bottom Up) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-chocolate)] via-[var(--color-chocolate)]/70 to-transparent lg:hidden" />
            
            {/* Desktop Gradient (Left to Right) */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#FDF8F3]/30 lg:to-[#FDF8F3]/12" />
          </div>
        </div>
      </section>

      {/* ─── Quick Info Bar ─── */}
      <section className="container mx-auto px-6 md:px-12 -mt-16 relative z-20">
        <div className="info-bar opacity-0 bg-white rounded-2xl p-8 shadow-[0_4px_40px_rgba(44,24,16,0.08)] flex flex-col md:flex-row justify-around items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--color-warm-border)]">
          {[
            { icon: <Phone size={22} />, label: content.info_l1 || "Call Us", value: content.info_v1 || "+977 9856064940" },
            { icon: <Clock size={22} />, label: content.info_l2 || "Opening Hours", value: content.info_v2 || "Mon–Fri 9-6, Sat 9-1" },
            { icon: <MapPin size={22} />, label: content.info_l3 || "Location", value: content.info_v3 || "Prithivichowk-8, Pokhara" },
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
        </div>
      </section>

      {/* ─── Who We Are ─── */}
      <section className="story-section py-16 md:py-28">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Image & Stats Content (Order 1 on mobile, 2 on desktop) */}
            <div className="story-image w-full relative flex flex-col items-center lg:items-end order-1 lg:order-2">
              
              {/* Circular Background & Image */}
              <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-square flex justify-center items-end pt-10 mx-auto">
                {/* Subtle Background Circle */}
                <div className="absolute bottom-0 w-[90%] aspect-square bg-[#F5EFE6] rounded-full -z-10" />
                
                <EditableImage page="home" contentKey="about_image" defaultSrc={content.about_image || "/ChatGPT Image May 28, 2026, 04_46_34 PM.png"} alt="Bijay Regmi" className="w-full h-full object-cover rounded-[3rem] rounded-tl-full rounded-tr-full shadow-[0_30px_60px_rgba(44,24,16,0.15)] relative z-10 scale-[1.01]" fill />
              </div>

              {/* Stats Card */}
              <div className="w-[95%] sm:w-[90%] md:w-auto md:min-w-[420px] bg-white border border-[#E8DDD1] rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(44,24,16,0.06)] mt-[-30px] relative z-10 flex items-center justify-between gap-4 mx-auto lg:mx-0">
                {/* Left side */}
                <div className="flex-1">
                  <div className="flex gap-1 text-[#FBBC04] mb-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="font-bold text-[var(--color-chocolate)] text-sm sm:text-base leading-tight"><EditableText as="span" page="home" contentKey="stats_t1" defaultText={content.stats_t1 || "Trusted By Patients"} /></p>
                  <p className="text-xs text-[var(--color-chocolate-muted)] mt-1"><EditableText as="span" page="home" contentKey="stats_s1" defaultText={content.stats_s1 || "2,000+ happy clients"} /></p>
                </div>
                
                {/* Divider */}
                <div className="w-px h-12 bg-[#E8DDD1] shrink-0" />
                
                {/* Right side */}
                <div className="flex-1 flex items-center gap-3">
                  <div className="bg-[#F0E6FA] text-[#8B5CF6] w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shrink-0">
                    15
                  </div>
                  <div>
                    <p className="font-bold text-[var(--color-chocolate)] text-sm sm:text-base leading-tight"><EditableText as="span" page="home" contentKey="stats_t2" defaultText={content.stats_t2 || "Years of"} /></p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-[var(--color-chocolate-muted)] opacity-70 tracking-[0.1em] uppercase mt-1"><EditableText as="span" page="home" contentKey="stats_s2" defaultText={content.stats_s2 || "Experience"} /></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content (Order 2 on mobile, 1 on desktop) */}
            <div className="story-text space-y-5 md:space-y-6 text-center lg:text-left order-2 lg:order-1 mt-6 lg:mt-0">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <h3 className="text-3xl md:text-5xl font-extrabold text-[var(--color-chocolate)] tracking-tight">
                  Bijay Regmi
                </h3>
                <div className="hidden md:flex h-8 w-px bg-[var(--color-warm-border)] mx-2"></div>
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-medium bg-[var(--color-primary)]/10 px-4 py-2 rounded-full w-fit">
                  <HeartHandshake size={18} />
                  <span>Founder & Optometrist</span>
                </div>
              </div>

              <p className="text-[var(--color-chocolate-muted)] text-base md:text-lg leading-relaxed mb-8">
                <EditableText as="span" page="home" contentKey="about_desc" defaultText={content.about_desc || "Bijay Regmi is a dedicated Optometrist specializing in advanced clinical diagnostics, computer vision syndrome, refractive errors, and comprehensive ocular health. Combining global training with a compassionate approach, he ensures every patient receives the precise care required for optimal vision and eye health."} />
              </p>

              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all">
                  Read full profile <ArrowRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Services Snapshot ─── */}
      <section className="services-scroll-section py-16 md:py-0 md:h-[300vh] bg-[var(--color-cream-dark)] relative overflow-hidden md:overflow-visible">
        <div className="md:sticky md:top-0 md:h-screen flex flex-col items-center justify-center md:overflow-hidden w-full">
          <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"><EditableText as="span" page="home" contentKey="services_sub" defaultText={content.services_sub || "What We Offer"} /></p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-chocolate)] mb-4"><EditableText as="span" page="home" contentKey="services_title" defaultText={content.services_title || "Our Services"} /></h2>
            <p className="text-[var(--color-chocolate-muted)] text-lg"><EditableText as="span" page="home" contentKey="services_desc" defaultText={content.services_desc || "Comprehensive diagnostic and optical services tailored for your visual health."} /></p>
          </div>

          {/* Mobile Carousel */}
          <div className="block md:hidden w-full mt-4">
            <MobileCarousel services={services} />
          </div>

          {/* Stacked Cards for Desktop */}
          <div className="hidden md:block relative w-full max-w-xl mx-auto h-[400px] overflow-visible pb-0">
            {services.map((service, index) => (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className="stacked-service-card absolute w-full inset-x-0 top-0 h-[400px] rounded-3xl p-8 flex flex-col justify-end shadow-[0_20px_60px_rgba(0,0,0,0.15)] cursor-pointer group will-change-transform"
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
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed max-w-sm">
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

          {/* Scroll hint - Desktop only */}
          <div className="hidden md:flex mt-12 opacity-50 items-center justify-center w-full">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-chocolate-muted)] flex items-center gap-2">
              <span className="w-8 h-px bg-[var(--color-chocolate-muted)]" />
              Scroll to explore
              <span className="w-8 h-px bg-[var(--color-chocolate-muted)]" />
            </span>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="why-section py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-warm-accent)] mb-3"><EditableText as="span" page="home" contentKey="why_sub" defaultText={content.why_sub || "The Trinetra Difference"} /></p>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-chocolate)]"><EditableText as="span" page="home" contentKey="why_title" defaultText={content.why_title || "Why Choose Trinetra?"} /></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                title: content.feat_t1 || "Evidence-based care",
                icon: <Star size={36} />,
                desc: content.feat_d1 || "We combine 15+ years of global clinical expertise with genuine compassion, bringing world-class practices to your neighborhood.",
              },
              {
                title: content.feat_t2 || "Future-ready vision technology",
                icon: <Microscope size={36} />,
                desc: content.feat_d2 || "Experience precise, objective assessments with our advanced digital diagnostics, ensuring your eyes receive the highest standard of modern care.",
              },
              {
                title: content.feat_t3 || "Comfort-focused",
                icon: <ShieldCheck size={36} />,
                desc: content.feat_d3 || "Every step of your visit is designed to feel welcoming, gentle, and centered entirely around your peace of mind.",
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
      <section className="py-12 md:py-20 bg-[var(--color-cream-dark)]">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"><EditableText as="span" page="home" contentKey="social_sub" defaultText={content.social_sub || "Social Proof"} /></p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-chocolate)] mb-4"><EditableText as="span" page="home" contentKey="social_title" defaultText={content.social_title || "Trusted by Our Patients"} /></h2>
            <p className="text-[var(--color-chocolate-muted)] mb-6 text-lg"><EditableText as="span" page="home" contentKey="social_desc" defaultText={content.social_desc || "See why families across Pokhara rate us 5 stars for our clinical precision and compassionate care."} /></p>
            <Link href="/reviews" className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all">
              Read all reviews <ArrowRight size={18} />
            </Link>
          </div>

          <div
            className="flex-1 bg-white rounded-3xl p-10 shadow-[0_4px_40px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border)] flex flex-col items-center text-center max-w-md w-full transition-transform duration-300 hover:scale-105"
          >
            <div className="text-6xl font-extrabold text-[var(--color-chocolate)] mb-2">5.0</div>
            <div className="flex gap-1 text-[#FBBC04] mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={24} className="fill-current" />
              ))}
            </div>
            <p className="text-[var(--color-chocolate-light)] font-medium mb-4 text-lg italic">
              <EditableText as="span" page="home" contentKey="testimonial_text" defaultText={content.testimonial_text || "\"Best eye care center in Pokhara. Highly professional, accurate, and genuinely caring.\""} />
            </p>
            <p className="text-sm text-[var(--color-chocolate-muted)]"><EditableText as="span" page="home" contentKey="testimonial_author" defaultText={content.testimonial_author || "— Based on Google Reviews"} /></p>
          </div>
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-chocolate)] mb-6"><EditableText as="span" page="home" contentKey="cta_title" defaultText={content.cta_title || "Ready for Clearer Vision?"} /></h2>
          <p className="text-[var(--color-chocolate-muted)] text-lg mb-8 md:mb-10 max-w-xl mx-auto"><EditableText as="span" page="home" contentKey="cta_desc" defaultText={content.cta_desc || "Take the first step toward better sight and peace of mind with our expert optometrist today."} /></p>
          <Link
            href="/appointment"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-5 rounded-full bg-[var(--color-primary)] text-white font-bold text-lg hover:shadow-[0_8px_30px_rgba(255,5,95,0.3)] transition-all hover:scale-[1.02]"
          >
            Book <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
