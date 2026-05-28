"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Award, GraduationCap, MapPin, Quote, Stethoscope } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
  "MBBS — Tribhuvan University, Nepal",
  "MD (Ophthalmology) — Institute of Medicine, Kathmandu",
  "Fellowship in Cornea & Refractive Surgery — Germany",
  "Advanced Training in Cataract & Glaucoma — Middle East",
  "Member, Nepal Ophthalmic Society",
  "Member, Asia-Pacific Academy of Ophthalmology",
];

const expertiseAreas = [
  "Cataract Surgery",
  "LASIK & Refractive Surgery",
  "Corneal Transplantation",
  "Glaucoma Management",
  "Diabetic Retinopathy",
  "Pediatric Ophthalmology",
  "Oculoplastics",
  "Comprehensive Eye Exams",
  "Contact Lens Fitting",
  "Low Vision Rehabilitation",
];

const milestones = [
  { label: "Years of Experience", value: "15+", icon: Award },
  { label: "Countries Trained In", value: "5+", icon: MapPin },
  { label: "Surgeries Performed", value: "10,000+", icon: Stethoscope },
  { label: "Specializations", value: "6+", icon: GraduationCap },
];

export default function DoctorPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Doctor photo reveal — scale + fade
      if (photoRef.current) {
        gsap.from(photoRef.current, {
          scale: 0.85,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // Bio text lines stagger
      const bioLines = gsap.utils.toArray(".bio-line");
      bioLines.forEach((line, i) => {
        gsap.from(line as Element, {
          scrollTrigger: {
            trigger: line as Element,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 25,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power2.out",
        });
      });

      // Qualifications list stagger
      const qualItems = gsap.utils.toArray(".qual-item");
      gsap.from(qualItems as Element[], {
        scrollTrigger: {
          trigger: ".qual-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Philosophy quote
      const quoteEl = document.querySelector(".philosophy-quote");
      if (quoteEl) {
        gsap.from(quoteEl, {
          scrollTrigger: {
            trigger: quoteEl,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 40,
          duration: 1,
          ease: "power2.out",
        });
      }

      // Expertise pills stagger
      const pills = gsap.utils.toArray(".expertise-pill");
      gsap.from(pills as Element[], {
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 20,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.07,
        ease: "back.out(1.7)",
      });

      // Milestone counters
      const milestoneCards = gsap.utils.toArray(".milestone-card");
      gsap.from(milestoneCards as Element[], {
        scrollTrigger: {
          trigger: ".milestones-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-cream,#FDF8F3)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F3] via-[#F5EDE4] to-[#EDE0D4]" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#D4A574]/10 blur-3xl" />
        <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-[#FF055F]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
            {/* Photo Column */}
            <div className="md:col-span-2 flex justify-center">
              <div ref={photoRef} className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-3xl border-2 border-[#D4A574]/30 rotate-2" />
                <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(44,24,16,0.15)]">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                    alt="Dr. Bijay Regmi - Senior Ophthalmologist"
                    className="w-full max-w-sm object-cover aspect-[3/4]"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2C1810]/60 to-transparent p-6">
                    <p className="text-white font-serif text-xl font-bold">
                      Dr. Bijay Regmi
                    </p>
                    <p className="text-white/80 text-sm">
                      Senior Ophthalmologist & Founder
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-[2px] bg-[#D4A574]" />
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]">
                    Our Doctor
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-3 leading-tight">
                  Dr. Bijay Regmi
                </h1>
                <p className="text-xl text-[#D4A574] font-medium mb-6">
                  MBBS, MD (Ophthalmology) — Senior Ophthalmologist & Founder
                </p>
                <p className="text-lg text-[#5C4033] leading-relaxed mb-6">
                  With over 15 years of international experience across Germany and
                  the Middle East, Dr. Regmi brings world-class ophthalmic
                  expertise to Nepal. His vision is simple: every person deserves
                  access to the highest quality eye care, delivered with genuine
                  compassion.
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-[#5C4033]">
                    <MapPin className="w-4 h-4 text-[#FF055F]" />
                    <span>Trained in Germany & Middle East</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5C4033]">
                    <Award className="w-4 h-4 text-[#FF055F]" />
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="milestones-section py-16 bg-gradient-to-r from-[#F5EDE4]/60 via-[#FDF8F3] to-[#F5EDE4]/60">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="milestone-card text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-[0_4px_20px_rgba(44,24,16,0.06)] border border-[var(--color-warm-border,#E8DDD1)]"
                >
                  <Icon className="w-6 h-6 text-[#D4A574] mx-auto mb-3" />
                  <p className="text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-1">
                    {item.value}
                  </p>
                  <p className="text-xs text-[#5C4033] uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Bio Section */}
      <section ref={bioRef} className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-12 h-[2px] bg-[#D4A574]" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574]">
              Biography
            </span>
          </motion.div>

          <div className="space-y-5">
            <p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              Dr. Bijay Regmi&rsquo;s journey in ophthalmology is one of relentless
              pursuit of excellence and deep commitment to serving others. After
              completing his MBBS and MD in Ophthalmology from some of Nepal&rsquo;s
              most prestigious medical institutions, he embarked on a career that
              would take him across continents.
            </p>
            <p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              In Germany, Dr. Regmi completed his fellowship in Cornea and
              Refractive Surgery, working alongside leading European
              ophthalmologists and gaining hands-on experience with the most
              advanced surgical technologies available. This rigorous training
              sharpened his technical precision and instilled in him a commitment
              to evidence-based medicine.
            </p>
            <p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              His subsequent years in the Middle East further broadened his
              expertise, exposing him to a diverse patient population and a wide
              spectrum of ophthalmic conditions. During this time, he performed
              thousands of successful surgeries, from complex cataract procedures
              to delicate corneal transplantations, building a reputation for
              clinical excellence and compassionate care.
            </p>
            <p className="bio-line text-lg text-[#5C4033] leading-relaxed">
              Returning to Nepal, Dr. Regmi founded Trinetra Eye Care Center with
              a singular mission: to ensure that every Nepali has access to the
              same quality of eye care available anywhere in the world. Under his
              leadership, the center has grown into a trusted institution,
              combining cutting-edge technology with the kind of personal attention
              that makes patients feel truly cared for.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="py-16 bg-gradient-to-b from-[#F5EDE4]/50 to-[#FDF8F3]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="philosophy-quote relative bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-14 shadow-[0_4px_30px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border,#E8DDD1)]">
            {/* Accent border on left */}
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#FF055F] via-[#D4A574] to-[#FF055F] rounded-full" />

            <Quote className="w-10 h-10 text-[#D4A574]/40 mb-6" />

            <blockquote className="text-xl md:text-2xl font-serif text-[var(--color-chocolate,#2C1810)] leading-relaxed mb-6 italic">
              &ldquo;The eyes are not just organs — they are windows to the soul and
              gateways to the world. Every patient who entrusts me with their
              vision entrusts me with their life&rsquo;s most precious gift. I carry
              that responsibility with humility and unwavering dedication.&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A574]/20 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-chocolate,#2C1810)]">
                  Dr. Bijay Regmi
                </p>
                <p className="text-sm text-[#5C4033]">
                  Founder, Trinetra Eye Care Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="qual-section py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Qualifications Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-[#D4A574]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)]">
                  Qualifications & Training
                </h2>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-[0_4px_30px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border,#E8DDD1)]">
                <ul className="space-y-4">
                  {qualifications.map((qual, index) => (
                    <li
                      key={index}
                      className="qual-item flex items-start gap-3"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-[#D4A574] shrink-0" />
                      <span className="text-[#5C4033] leading-relaxed">
                        {qual}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Professional Memberships & Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-[#D4A574]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-chocolate,#2C1810)]">
                  Clinical Approach
                </h2>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-[0_4px_30px_rgba(44,24,16,0.08)] border border-[var(--color-warm-border,#E8DDD1)]">
                <p className="text-[#5C4033] leading-relaxed mb-4">
                  Dr. Regmi&rsquo;s clinical philosophy centers on three pillars:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-lg bg-[#FF055F]/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#FF055F]">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1">
                        Patient-Centered Care
                      </p>
                      <p className="text-sm text-[#5C4033]">
                        Every treatment plan is tailored to the individual, taking
                        into account their lifestyle, needs, and concerns.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-lg bg-[#FF055F]/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#FF055F]">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1">
                        Evidence-Based Medicine
                      </p>
                      <p className="text-sm text-[#5C4033]">
                        All decisions are grounded in the latest research and
                        proven clinical methodologies from around the world.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-lg bg-[#FF055F]/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#FF055F]">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-chocolate,#2C1810)] mb-1">
                        Continuous Innovation
                      </p>
                      <p className="text-sm text-[#5C4033]">
                        Staying at the forefront of ophthalmic advances through
                        ongoing training, conferences, and research participation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section
        ref={expertiseRef}
        className="py-20 md:py-28 bg-gradient-to-b from-[#F5EDE4]/40 to-[#FDF8F3]"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A574] mb-3 block">
              Specializations
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-4">
              Areas of Expertise
            </h2>
            <div className="w-16 h-[2px] bg-[#D4A574] mx-auto" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {expertiseAreas.map((area) => (
              <span
                key={area}
                className="expertise-pill inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-warm-border,#E8DDD1)] text-sm font-medium text-[var(--color-chocolate,#2C1810)] shadow-[0_2px_10px_rgba(44,24,16,0.05)] hover:border-[#D4A574]/60 hover:shadow-[0_4px_20px_rgba(44,24,16,0.1)] hover:bg-white transition-all duration-300 cursor-default"
              >
                <Stethoscope className="w-3.5 h-3.5 text-[#D4A574]" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-chocolate,#2C1810)] mb-6">
              Consult with Dr. Regmi
            </h2>
            <p className="text-lg text-[#5C4033] mb-8 leading-relaxed">
              Take the first step towards clearer vision. Book a personal
              consultation with Dr. Bijay Regmi and experience the care of a
              world-class ophthalmologist.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#FF055F] text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-[0_4px_20px_rgba(255,5,95,0.3)] hover:shadow-[0_8px_30px_rgba(255,5,95,0.4)] transition-shadow duration-300"
            >
              Book a Consultation
              <Stethoscope className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
