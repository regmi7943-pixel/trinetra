"use client";
import Image from "next/image";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Calendar, User, ArrowRight, BookOpen, Mail } from "lucide-react";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "All", active: true },
  { name: "Eye Health", active: false },
  { name: "Treatments", active: false },
  { name: "Lifestyle", active: false },
  { name: "News", active: false },
];

const blogPosts = [
  {
    title: "Understanding Dry Eyes: Causes, Symptoms & Modern Treatments",
    excerpt:
      "Dry eye syndrome affects millions worldwide. Learn about the latest treatments and daily habits that can help restore your eye comfort and clarity.",
    image:
      "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&q=80",
    category: "Eye Health",
    author: "Bijay Regmi",
    date: "May 20, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "Choosing the Right Eyewear in 2026: What You Need to Know",
    excerpt:
      "Considering new glasses? Our comprehensive guide covers everything from face shapes and frame materials to the latest lens technology.",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80",
    category: "Treatments",
    author: "Optometry Team",
    date: "May 12, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    title: "Protecting Your Children's Eyes in the Digital Age",
    excerpt:
      "Screen time is at an all-time high. Discover evidence-based strategies to safeguard your children's developing vision in our tech-driven world.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
    category: "Lifestyle",
    author: "Bijay Regmi",
    date: "April 28, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    title: "The Complete Guide to Computer Vision Syndrome",
    excerpt:
      "What to expect with digital eye strain — from early symptoms to full prevention. Tips, the 20-20-20 rule, and answers to common patient questions.",
    image:
      "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?w=400&q=80",
    category: "Treatments",
    author: "Bijay Regmi",
    date: "April 15, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "Nutrition for Healthy Eyes: Foods That Boost Vision Naturally",
    excerpt:
      "Your diet plays a crucial role in eye health. Explore the top nutrients and foods that can help prevent age-related eye conditions and keep your vision sharp.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
    category: "Lifestyle",
    author: "Optometry Team",
    date: "March 30, 2026",
    readTime: "5 min read",
    featured: false,
  },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Eye Health": { bg: "rgba(255,5,95,0.08)", text: "#FF055F" },
  Treatments: { bg: "rgba(212,165,116,0.15)", text: "#B8834A" },
  Lifestyle: { bg: "rgba(1,204,204,0.1)", text: "#019E9E" },
  News: { bg: "rgba(76,175,80,0.1)", text: "#2E7D32" },
};

export default function BlogClient({ content }: { content: Record<string, string> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".blog-hero", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".category-chip", {
        y: 20,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.4,
      });

      gsap.from(".featured-card", {
        y: 70,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".blog-card", {
        y: 60,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  const featuredPost = blogPosts.find((p) => p.featured)!;
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)" }}
    >
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 text-center">
        <div className="max-w-3xl mx-auto blog-hero">
          <div
            
            
            
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "#FAF5EF",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <BookOpen
              size={16}
              style={{ color: "var(--color-primary, #FF055F)" }}
            />
            <EditableText
              page="blog"
              contentKey="hero_badge"
              defaultText={content?.hero_badge || "Our Blog"}
              as="span"
              className="text-sm font-medium"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            />
          </div>

          <EditableText
            page="blog"
            contentKey="hero_title"
            defaultText={content?.hero_title || "Insights for Better Vision"}
            as="h1"
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
            style={{ color: "var(--color-chocolate, #2C1810)" }}
          />
          <EditableText
            page="blog"
            contentKey="hero_description"
            defaultText={content?.hero_description || "Expert articles on eye health, treatments, and lifestyle tips to help you take the best care of your eyes."}
            as="p"
            className="text-lg max-w-xl mx-auto"
            style={{
              color: "var(--color-chocolate, #2C1810)",
              opacity: 0.65,
            }}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="category-chip px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: cat.active
                  ? "var(--color-primary, #FF055F)"
                  : "white",
                color: cat.active
                  ? "white"
                  : "var(--color-chocolate, #2C1810)",
                border: cat.active
                  ? "1px solid transparent"
                  : "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: cat.active
                  ? "0 4px 15px rgba(255,5,95,0.25)"
                  : "0 2px 8px rgba(44,24,16,0.04)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <div
            className="featured-card rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
              boxShadow: "0 4px 30px rgba(44,24,16,0.08)",
            }}
          >
            <div className="relative overflow-hidden w-full h-64 md:h-full">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor:
                    categoryColors[featuredPost.category]?.bg || "#FAF5EF",
                  color:
                    categoryColors[featuredPost.category]?.text || "#2C1810",
                }}
              >
                {featuredPost.category}
              </div>
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{
                  backgroundColor: "var(--color-primary, #FF055F)",
                }}
              >
                Featured
              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{
                    color: "var(--color-chocolate, #2C1810)",
                    opacity: 0.5,
                  }}
                >
                  <Calendar size={12} />
                  {featuredPost.date}
                </div>
                <div
                  className="flex items-center gap-1.5 text-xs"
                  style={{
                    color: "var(--color-chocolate, #2C1810)",
                    opacity: 0.5,
                  }}
                >
                  <User size={12} />
                  {featuredPost.author}
                </div>
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold font-serif mb-4 leading-tight"
                style={{ color: "var(--color-chocolate, #2C1810)" }}
              >
                {featuredPost.title}
              </h2>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  color: "var(--color-chocolate, #2C1810)",
                  opacity: 0.65,
                }}
              >
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{
                    color: "var(--color-chocolate, #2C1810)",
                    opacity: 0.4,
                  }}
                >
                  {featuredPost.readTime}
                </span>
                <button
                  className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                  style={{
                    color: "var(--color-primary, #FF055F)",
                  }}
                >
                  Read Article
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={gridRef} className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <article
                key={post.title}
                className="blog-card rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-warm-border, #E8DDD1)",
                  boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
                }}
              >
                <div className="relative overflow-hidden w-full h-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor:
                        categoryColors[post.category]?.bg || "#FAF5EF",
                      color:
                        categoryColors[post.category]?.text || "#2C1810",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                        opacity: 0.5,
                      }}
                    >
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs"
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                        opacity: 0.5,
                      }}
                    >
                      <User size={11} />
                      {post.author}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold font-serif mb-2 leading-snug"
                    style={{ color: "var(--color-chocolate, #2C1810)" }}
                  >
                    {post.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-5 line-clamp-2"
                    style={{
                      color: "var(--color-chocolate, #2C1810)",
                      opacity: 0.6,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                        opacity: 0.4,
                      }}
                    >
                      {post.readTime}
                    </span>
                    <button
                      className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                      style={{
                        color: "var(--color-primary, #FF055F)",
                      }}
                    >
                      Read More
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                color: "var(--color-chocolate, #2C1810)",
                border: "1.5px solid var(--color-warm-border, #E8DDD1)",
                backgroundColor: "white",
                boxShadow: "0 2px 15px rgba(44,24,16,0.06)",
              }}
            >
              <BookOpen size={16} style={{ opacity: 0.5 }} />
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div
            
            
            
            
            className="rounded-3xl p-10 md:p-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, #FAF5EF 0%, #F3E8DA 100%)",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
              boxShadow: "0 8px 40px rgba(44,24,16,0.08)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                backgroundColor: "rgba(255,5,95,0.08)",
              }}
            >
              <Mail
                size={24}
                style={{ color: "var(--color-primary, #FF055F)" }}
              />
            </div>
            <EditableText
              page="blog"
              contentKey="newsletter_title"
              defaultText={content?.newsletter_title || "Stay Updated"}
              as="h2"
              className="text-2xl md:text-3xl font-bold font-serif mb-3"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            />
            <EditableText
              page="blog"
              contentKey="newsletter_description"
              defaultText={content?.newsletter_description || "Subscribe to our newsletter for the latest eye health tips, clinic news, and exclusive offers."}
              as="p"
              className="text-sm max-w-md mx-auto mb-7"
              style={{
                color: "var(--color-chocolate, #2C1810)",
                opacity: 0.6,
              }}
            />

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                style={{
                  backgroundColor: "white",
                  border: "1.5px solid var(--color-warm-border, #E8DDD1)",
                  color: "var(--color-chocolate, #2C1810)",
                }}
              />
              <button
                className="px-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 shrink-0"
                style={{
                  backgroundColor: "var(--color-primary, #FF055F)",
                  boxShadow: "0 4px 15px rgba(255,5,95,0.25)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
