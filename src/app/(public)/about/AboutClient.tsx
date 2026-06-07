"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";

import { Target, Eye, Heart, Award, CheckCircle2, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every diagnosis is guided by the latest technology and a meticulous, personal attention to your unique needs.",
    gradient: "linear-gradient(180deg, #FBE6A2 0%, #E3CC87 100%)",
  },
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We treat every patient like family, ensuring your visit feels perfectly human, comforting, and deeply caring.",
    gradient: "linear-gradient(180deg, #93A9AF 0%, #5C6E75 100%)",
  },
  {
    icon: Eye,
    title: "Accessibility",
    description:
      "World-class, heartfelt eye care made warmly available to everyone in our community, regardless of background.",
    gradient: "linear-gradient(180deg, #E6DCF0 0%, #7586A4 100%)",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards, driven by a steadfast dedication to your vision and overall well-being.",
    gradient: "linear-gradient(180deg, #A4CEB5 0%, #6FA084 100%)",
  },
];

const facilityImages = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
    alt: "Modern clinic interior with warm lighting",
    label: "Modern Consultation Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    alt: "Advanced medical equipment for eye diagnostics",
    label: "Advanced Diagnostic Equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80",
    alt: "Premium eyewear display collection",
    label: "Premium Eyewear Collection",
  },
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    alt: "Comfortable patient waiting area",
    label: "Comfortable Waiting Area",
  },
  {
    src: "https://images.unsplash.com/photo-1551076805-e1869043e560?w=600&q=80",
    alt: "State of the art diagnostic optometry lab",
    label: "Diagnostic Optometry Lab",
  },
];

interface AboutClientProps {
  content: Record<string, string>;
}

export default function AboutClient({ content }: AboutClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero title split text reveal
      const heroTitle = document.querySelector(".about-hero-title");
      if (heroTitle) {
        gsap.from(heroTitle, {
          y: 60,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      const heroSubtitle = document.querySelector(".about-hero-subtitle");
      if (heroSubtitle) {
        gsap.from(heroSubtitle, {
          y: 40,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        });
      }

      // Our Story text reveal
      const storyLines = gsap.utils.toArray(".story-line");
      storyLines.forEach((line, i) => {
        gsap.from(line as Element, {
          scrollTrigger: {
            trigger: line as Element,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
          y: 30,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power2.out",
        });
      });

      // Core Values Mobile entrance
      const mobileValueCards = gsap.utils.toArray(".mobile-value-card");
      if (mobileValueCards.length) {
        gsap.from(mobileValueCards as Element[], {
          scrollTrigger: {
            trigger: ".mobile-values-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        });
      }

      // Desktop Arc Scroll Animation
      const arcCards = gsap.utils.toArray(".desktop-arc-card");
      if (arcCards.length) {
        const radius = 1100;
        const stepAngle = 14; 
        const centerIndex = (arcCards.length - 1) / 2;

        arcCards.forEach((card, i) => {
          const angleDeg = (i - centerIndex) * stepAngle;
          const angleRad = angleDeg * (Math.PI / 180);
          const x = radius * Math.sin(angleRad);
          const y = radius - radius * Math.cos(angleRad);
          const rotation = angleDeg;
          const scale = 1 - Math.abs(i - centerIndex) * 0.05;

          gsap.fromTo(card as Element,
            {
              x: 0,
              y: 200,
              rotation: 0,
              scale: 0.6,
              opacity: 0,
            },
            {
              x: x,
              y: y,
              rotation: rotation,
              scale: scale,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".arc-container",
                start: "top 80%",
                end: "top 30%",
                scrub: 1, // Smooth scrubbing
              }
            }
          );
        });
      }

      // Facility Coverflow Animation
      const coverflowCards = gsap.utils.toArray(".coverflow-card");
      if (coverflowCards.length) {
        const updateCoverflow = (progress: number) => {
          const maxIndex = facilityImages.length - 1;
          const currentIndex = progress * maxIndex;

          coverflowCards.forEach((card: any, i) => {
            const distance = i - currentIndex;
            const absDistance = Math.abs(distance);
            
            let translateX = 0;
            if (absDistance < 1) {
               translateX = distance * 180;
            } else {
               translateX = Math.sign(distance) * (180 + (absDistance - 1) * 90);
            }
            
            let rotateY = 0;
            if (absDistance < 1) {
               rotateY = distance * -55; 
            } else {
               rotateY = Math.sign(distance) * -55;
            }

            const scale = 1 - Math.min(absDistance, 3) * 0.15;
            const zIndex = 100 - Math.round(absDistance * 10);
            const opacity = 1 - Math.max(0, absDistance - 1.5) * 0.5;

            gsap.set(card, {
              x: translateX,
              scale: scale,
              rotationY: rotateY,
              zIndex: zIndex,
              opacity: opacity,
            });
          });
        };

        updateCoverflow(0); // Initial set

        ScrollTrigger.create({
          trigger: facilityRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
          onUpdate: (self) => {
            updateCoverflow(self.progress);
          }
        });
      }

      // Mission & Vision cards
      const missionCards = gsap.utils.toArray(".mission-card");
      gsap.from(missionCards as Element[], {
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: (i: number) => (i === 0 ? -50 : 50),
        duration: 0.9,
        stagger: 0.2,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-cream,#FDF8F3)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE4] to-[#EDE0D4]" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4A574]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#FF055F]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div
            
            
            
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF055F]/10 mb-8"
          >
            <Eye className="w-8 h-8 text-[#FF055F]" />
          </div>

          <EditableText page="about" contentKey="hero_title" defaultText={content["hero_title"] || "Partners in Your Eye Health"} as="h1" className="about-hero-title text-4xl md:text-6xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6 leading-tight" />
          <EditableText page="about" contentKey="hero_subtitle" defaultText={content["hero_subtitle"] || "We are dedicated to your vision, offering world-class expertise with heartfelt, personal care right here in Nepal."} as="p" className="about-hero-subtitle text-lg md:text-xl text-[#5C4033] max-w-2xl mx-auto leading-relaxed" />
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div
            
            
            
            
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-12 h-[2px] bg-[#D4A574]" />
            <EditableText page="about" contentKey="story_badge" defaultText={content["story_badge"] || "Our Story"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]" />
          </div>

          <div className="space-y-6">
            <EditableText page="about" contentKey="story_title" defaultText={content["story_title"] || "We believe a visit to the eye doctor shouldn't feel cold and clinical. It should feel perfectly human."} as="h2" className="story-line text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] leading-snug" />
            <div className="story-line">
              <div className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-bold text-[var(--color-chocolate)] mb-4">
                <EditableText page="about" contentKey="story_doctor_name" defaultText={content["story_doctor_name"] || "Bijay Regmi"} as="span" />
                <div className="hidden sm:flex h-6 w-px bg-[var(--color-warm-border)] mx-1"></div>
                <div className="flex items-center gap-2 text-[var(--color-primary)] text-sm font-medium bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-full w-fit">
                  <HeartHandshake size={14} />
                  <EditableText page="about" contentKey="story_doctor_role" defaultText={content["story_doctor_role"] || "Lead Optometrist"} as="span" />
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-[var(--color-chocolate-muted)] leading-relaxed">
                <EditableText page="about" contentKey="story_p1" defaultText={content["story_p1"] || "Trinetra Eye Care Center was founded by Bijay Regmi, an optometrist who wanted to create a space where patients feel truly cared for, rather than just treated."} />
              </p>
            </div>
            
            <p className="text-[var(--color-chocolate-muted)] text-base sm:text-lg leading-relaxed mb-6">
              <EditableText page="about" contentKey="story_p2" defaultText={content["story_p2"] || "After over 15 years refining his skills in Germany and the Middle East, Bijay saw the need for a practice that goes beyond transactional clinical services. He envisioned a clinic where advanced diagnostics go hand-in-hand with deep empathy and human connection."} />
            </p>
            <p className="story-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="about" contentKey="story_p3" defaultText={content["story_p3"] || "Returning to Nepal, he established Trinetra to be exactly that — a place where we serve as true partners in your eye health, combining international standards with the warmth of a close-knit community practice."} />
            </p>
            <p className="story-line text-lg text-[#5C4033] leading-relaxed">
              <EditableText page="about" contentKey="story_p4" defaultText={content["story_p4"] || "The name “Trinetra” — meaning “three eyes” — symbolizes our commitment to seeing you as a whole person. We are entirely dedicated to your vision, taking the time to understand your unique needs and ensuring your comfort at every step."} />
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section overflow-x-hidden py-20 md:py-28 bg-gradient-to-b from-[#F5EDE4]/50 to-[#FDF8F3]">
        <div className="max-w-5xl mx-auto px-6">
          <div
            
            
            
            
            className="text-center mb-14"
          >
            <EditableText page="about" contentKey="mission_vision_title" defaultText={content["mission_vision_title"] || "Mission & Vision"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />
            <div className="w-16 h-[2px] bg-[#D4A574] mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="mission-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border,#E8DDD1)]">
              <div className="w-12 h-12 rounded-2xl bg-[#FF055F]/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#FF055F]" />
              </div>
              <EditableText page="about" contentKey="mission_title" defaultText={content["mission_title"] || "Our Mission"} as="h3" className="text-2xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />
              <EditableText page="about" contentKey="mission_desc" defaultText={content["mission_desc"] || "To be more than just a clinic — to be your lifelong partners in eye health. We provide accessible, compassionate care, ensuring that every person who walks through our doors feels heard, understood, and perfectly cared for."} as="p" className="text-[#5C4033] leading-relaxed" />
            </div>

            {/* Vision Card */}
            <div className="mission-card bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border,#E8DDD1)]">
              <div className="w-12 h-12 rounded-2xl bg-[#00E5E5]/15 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-[#0EA5A5]" />
              </div>
              <EditableText page="about" contentKey="vision_title" defaultText={content["vision_title"] || "Our Vision"} as="h3" className="text-2xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />
              <EditableText page="about" contentKey="vision_desc" defaultText={content["vision_desc"] || "To be a sanctuary of healing and the most trusted name in eye care across Nepal. By remaining deeply dedicated to your vision, we envision a community where everyone has access to the gift of clear, healthy vision through personalized, human-centered care."} as="p" className="text-[#5C4033] leading-relaxed" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-20 md:py-32 overflow-visible lg:overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div
            
            
            
            
            className="text-center mb-16"
          >
            <EditableText page="about" contentKey="values_badge" defaultText={content["values_badge"] || "What We Stand For"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block" />
            <EditableText page="about" contentKey="values_title" defaultText={content["values_title"] || "Our Core Values"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />
            <div className="w-16 h-[2px] bg-[#D4A574] mx-auto" />
          </div>

          {/* Desktop Arc Layout */}
          <div className="arc-container hidden lg:block relative h-[500px] w-full pt-12 pb-24">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="desktop-arc-card absolute top-20 left-1/2 -ml-[120px] origin-[50%_400px]"
                >
                  <div
                    className="value-card group relative w-[240px] h-[340px] rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300"
                    style={{
                      background: value.gradient,
                    }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-[#1A1A1A]" strokeWidth={1.5} />
                    </div>
                    <EditableText page="about" contentKey={`value_title_${i}`} defaultText={content[`value_title_${i}`] || value.title} as="h3" className="text-xl font-bold text-[#1A1A1A] mb-3" />
                    <EditableText page="about" contentKey={`value_desc_${i}`} defaultText={content[`value_desc_${i}`] || value.description} as="p" className="text-sm text-[#1A1A1A]/80 leading-relaxed flex-1" />
                    <button className="w-full bg-white text-[#1A1A1A] font-bold text-[11px] tracking-widest py-3 rounded-xl mt-4 hover:bg-gray-50 transition-colors shadow-sm">
                      READ MORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile / Tablet Layout - vertical scroll cards */}
          <div
            className="mobile-values-container flex flex-col lg:hidden gap-6 pb-2"
          >
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              const tilt = index % 2 === 0 ? -5 : 5;
              return (
                <div
                  key={value.title}
                  className="mobile-value-card relative w-full sm:max-w-[420px] sm:mx-auto min-h-[340px] rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
                  style={{
                    background: value.gradient,
                    transform: `rotate(${tilt}deg)`,
                  }}
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-4 opacity-80">
                    <Icon className="w-8 h-8 text-[#1A1A1A]" strokeWidth={1.5} />
                  </div>
                  <EditableText page="about" contentKey={`value_title_${index}`} defaultText={content[`value_title_${index}`] || value.title} as="h3" className="text-xl font-bold text-[#1A1A1A] mb-3" />
                  <EditableText page="about" contentKey={`value_desc_${index}`} defaultText={content[`value_desc_${index}`] || value.description} as="p" className="text-sm text-[#1A1A1A]/80 leading-relaxed flex-1" />
                  <button className="w-full bg-white text-[#1A1A1A] font-bold text-[11px] tracking-widest py-3 rounded-xl mt-4 hover:bg-gray-50 transition-colors shadow-sm">
                    READ MORE
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section
        ref={facilityRef}
        className="facility-section-wrapper h-[300vh] bg-gradient-to-b from-[#F5EDE4]/40 to-[#FDF8F3] relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="max-w-6xl mx-auto px-6 w-full mb-8 sm:mb-12">
            <div
              
              
              
              
              className="text-center"
            >
              <EditableText page="about" contentKey="facility_badge" defaultText={content["facility_badge"] || "Our Facility"} as="span" className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block" />
              <EditableText page="about" contentKey="facility_title" defaultText={content["facility_title"] || "State-of-the-Art Care Environment"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4" />
            </div>
          </div>

          {/* Coverflow Container */}
          <div 
            className="relative w-full h-[350px] sm:h-[450px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {facilityImages.map((image, index) => (
              <div
                key={image.label}
                className="coverflow-card absolute top-0 w-[260px] sm:w-[320px] h-full rounded-3xl overflow-hidden bg-white shadow-[0_15px_40px_rgba(44,24,16,0.2)] border border-[#E8DDD1]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full">
                  <EditableImage page="about" contentKey={`facility_image_${index}`} defaultSrc={content[`facility_image_${index}`] || image.src} alt={image.alt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#D4A574]/20 flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 className="w-5 h-5 text-[#D4A574]" />
                      </div>
                      <EditableText page="about" contentKey={`facility_label_${index}`} defaultText={content[`facility_label_${index}`] || image.label} as="span" className="text-lg font-bold text-white tracking-wide" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 opacity-60">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#5C4033] flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#5C4033]" />
              Scroll to explore
              <span className="w-8 h-px bg-[#5C4033]" />
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div
            
            
            
            
          >
            <EditableText page="about" contentKey="cta_title" defaultText={content["cta_title"] || "Let's Care for Your Vision Together"} as="h2" className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6" />
            <EditableText page="about" contentKey="cta_desc" defaultText={content["cta_desc"] || "Join thousands of patients who trust us as their partners in eye health. Schedule your visit today and experience care that feels perfectly human."} as="p" className="text-lg text-[#5C4033] mb-8 leading-relaxed" />
            <a
              href="/contact"
              
              
              className="inline-flex items-center gap-2 bg-[#FF055F] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-[0_4px_20px_rgba(255,5,95,0.3)] hover:shadow-[0_8px_30px_rgba(255,5,95,0.4)] transition-shadow duration-300"
            >
              <EditableText page="about" contentKey="cta_btn" defaultText={content["cta_btn"] || "Book an Appointment"} as="span" />
              <CheckCircle2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
