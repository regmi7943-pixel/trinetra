"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Star, MessageSquareQuote, ThumbsUp, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Anita Sharma",
    initial: "A",
    date: "March 15, 2026",
    rating: 5,
    text: "Absolutely wonderful experience at Trinetra Eye Care. Dr. Sharma was incredibly thorough and patient with all my questions. The staff made me feel comfortable from start to finish. Highly recommended!",
    color: "#D4A574",
  },
  {
    name: "Rajesh Patel",
    initial: "R",
    date: "February 28, 2026",
    rating: 5,
    text: "I had my LASIK surgery here and the results are phenomenal. The entire team was professional and caring. My vision is better than I ever imagined. Thank you, Trinetra!",
    color: "#E8B89D",
  },
  {
    name: "Priya Menon",
    initial: "P",
    date: "January 10, 2026",
    rating: 5,
    text: "The best eye care clinic I have ever visited. The modern equipment and the warm atmosphere made the entire process stress-free. Dr. Sharma explained everything clearly and thoroughly.",
    color: "#C4956A",
  },
  {
    name: "Vikram Singh",
    initial: "V",
    date: "December 5, 2025",
    rating: 5,
    text: "From the reception to the consultation room, everything is top-notch. I was nervous about my cataract surgery but the team put me completely at ease. Recovery was smooth and quick!",
    color: "#D4A574",
  },
  {
    name: "Meera Joshi",
    initial: "M",
    date: "November 18, 2025",
    rating: 5,
    text: "Took my 8-year-old daughter for an eye checkup and the pediatric care was exceptional. The staff was incredibly gentle and patient with her. We found the perfect pair of glasses too!",
    color: "#E8B89D",
  },
];

export default function ReviewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero text reveal
      gsap.from(".hero-rating", {
        y: 60,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-stars .star-icon", {
        scale: 0.3,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.7)",
        delay: 0.4,
      });

      gsap.from(".hero-subtitle", {
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.8,
      });

      // Staggered card entrance
      gsap.from(".review-card", {
        y: 80,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      // CTA section
      gsap.from(".cta-section", {
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
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
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)" }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 px-4 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{
              backgroundColor: "#FAF5EF",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <MessageSquareQuote
              size={16}
              style={{ color: "var(--color-primary, #FF055F)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            >
              Patient Testimonials
            </span>
          </motion.div>

          <div className="hero-rating">
            <h1
              className="text-7xl md:text-9xl font-bold font-serif mb-4"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            >
              5.0
            </h1>
          </div>

          <div className="hero-stars flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="star-icon"
                size={32}
                fill="#FBBC04"
                color="#FBBC04"
              />
            ))}
          </div>

          <p
            className="hero-subtitle text-lg md:text-xl max-w-xl mx-auto"
            style={{ color: "var(--color-chocolate, #2C1810)", opacity: 0.7 }}
          >
            Based on 200+ reviews from our wonderful patients who trust us with
            their vision care
          </p>

          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { label: "Happy Patients", value: "5,000+" },
              { label: "Google Rating", value: "5.0 ★" },
              { label: "Years of Trust", value: "15+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <p
                  className="text-2xl font-bold font-serif"
                  style={{ color: "var(--color-chocolate, #2C1810)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{
                    color: "var(--color-chocolate, #2C1810)",
                    opacity: 0.5,
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section ref={cardsRef} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div
                key={review.name}
                className={`review-card rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
                style={{
                  backgroundColor: "#FAF5EF",
                  boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
                  border: "1px solid var(--color-warm-border, #E8DDD1)",
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-lg"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initial}
                  </div>

                  <div className="flex-1">
                    {/* Name & Date */}
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className="font-semibold text-base"
                        style={{
                          color: "var(--color-chocolate, #2C1810)",
                        }}
                      >
                        {review.name}
                      </h3>
                      <span
                        className="text-xs"
                        style={{
                          color: "var(--color-chocolate, #2C1810)",
                          opacity: 0.45,
                        }}
                      >
                        {review.date}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#FBBC04"
                          color="#FBBC04"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                        opacity: 0.75,
                      }}
                    >
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Helpful Button */}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors duration-200 hover:bg-[#E8DDD1]/60"
                        style={{
                          color: "var(--color-chocolate, #2C1810)",
                          opacity: 0.5,
                          border:
                            "1px solid var(--color-warm-border, #E8DDD1)",
                        }}
                      >
                        <ThumbsUp size={12} />
                        Helpful
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center cta-section">
          <div
            className="rounded-3xl p-10 md:p-14"
            style={{
              background:
                "linear-gradient(135deg, #FAF5EF 0%, #F3E8DA 100%)",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
              boxShadow: "0 8px 40px rgba(44,24,16,0.08)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#FBBC04", opacity: 0.9 }}
            >
              <Star size={28} fill="white" color="white" />
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold font-serif mb-4"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            >
              Share Your Experience
            </h2>
            <p
              className="mb-8 max-w-md mx-auto"
              style={{
                color: "var(--color-chocolate, #2C1810)",
                opacity: 0.65,
              }}
            >
              Your feedback helps us improve and helps others find quality eye
              care. We&apos;d love to hear about your visit!
            </p>

            <a
              href="https://g.page/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-primary, #FF055F)",
                boxShadow: "0 4px 20px rgba(255,5,95,0.3)",
              }}
            >
              Leave a Google Review
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
