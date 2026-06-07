"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Glasses, Search, Shield, Sun, Filter, ArrowRight, Sparkles, Eye, X } from "lucide-react";
import Image from "next/image";
import { EditableText } from "@/components/EditableText";
import { EditableImage } from "@/components/EditableImage";

gsap.registerPlugin(ScrollTrigger);

type EyewearItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  gender: string;
  images: string[];
  description: string;
  inStock: boolean;
  featured: boolean;
  externalLink?: string;
};
const lensOptions = [
  {
    icon: Eye,
    title: "Progressive Lenses",
    description: "Seamless  from near to far vision without visible lines on the lens.",
  },
  {
    icon: Shield,
    title: "Blue Light Filter",
    description: "Protect your eyes from harmful blue light emitted by digital screens all day.",
  },
  {
    icon: Sun,
    title: "Anti-Glare Coating",
    description: "Reduce reflections and glare for clearer, more comfortable vision everywhere.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Frame",
    description: "Browse our curated collection and pick a frame that matches your style and personality.",
  },
  {
    number: "02",
    title: "Select Your Lenses",
    description: "Choose from single-vision, progressive, or specialty lenses with custom coatings.",
  },
  {
    number: "03",
    title: "We Craft & Deliver",
    description: "Our experts precisely craft your eyewear and deliver it ready for a perfect fit.",
  },
];

export default function EyewearClient({ content, initialEyewearList }: { content: Record<string, string>; initialEyewearList?: string }) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [items, setItems] = useState<EyewearItem[]>(() => {
    try {
      return JSON.parse(initialEyewearList || "[]") || [];
    } catch {
      return [];
    }
  });

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const filteredFrames =
    activeFilter === "All" ? items : items.filter((f) => f.category === activeFilter);

  const [selectedItem, setSelectedItem] = useState<EyewearItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".eyewear-header", {
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Lens options stagger
      gsap.from(".lens-card", {
        y: 50,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".lens-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Steps stagger
      gsap.from(".step-item", {
        x: -40,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 80%",
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
      <section className="pt-32 pb-12 px-6 lg:px-8">
        <div className="eyewear-header max-w-5xl mx-auto text-center">
          <div
            
            
            
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{
              backgroundColor: "rgba(212,165,116,0.15)",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <Glasses className="w-4 h-4" style={{ color: "var(--color-primary, #FF055F)" }} />
            <EditableText
              page="eyewear"
              contentKey="hero_badge"
              defaultText={content?.hero_badge || "Eyewear Collection"}
              as="span"
              className="text-sm font-medium tracking-wide uppercase"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            />
          </div>

          <EditableText
            page="eyewear"
            contentKey="hero_title"
            defaultText={content?.hero_title || "Find Your Perfect Pair of Frames"}
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
          />

          <EditableText
            page="eyewear"
            contentKey="hero_description"
            defaultText={content?.hero_description || "Explore our handpicked selection of stylish, comfortable eyewear designed for every face and every lifestyle."}
            as="p"
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(44,24,16,0.7)" }}
          />
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            <Filter className="w-4 h-4 mr-1" style={{ color: "rgba(44,24,16,0.4)" }} />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor:
                    activeFilter === cat
                      ? "var(--color-primary, #FF055F)"
                      : "rgba(255,255,255,0.7)",
                  color: activeFilter === cat ? "#fff" : "var(--color-chocolate, #2C1810)",
                  border:
                    activeFilter === cat
                      ? "1px solid var(--color-primary, #FF055F)"
                      : "1px solid var(--color-warm-border, #E8DDD1)",
                  boxShadow:
                    activeFilter === cat
                      ? "0 4px 15px rgba(255,5,95,0.25)"
                      : "0 2px 8px rgba(44,24,16,0.04)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            
              {filteredFrames.map((frame) => (
                <div
                  key={frame.id}
                  
                  
                  
                  
                  
                  onClick={() => { setSelectedItem(frame); setCurrentImageIndex(0); }}
                  className="group rounded-3xl overflow-hidden transition-shadow duration-500 hover:shadow-xl cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.75)",
                    border: "1px solid var(--color-warm-border, #E8DDD1)",
                    boxShadow: "0 4px 30px rgba(44,24,16,0.08)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden bg-white/20">
                    {frame.images && frame.images.length > 0 ? (
                      <Image
                        src={frame.images[0]}
                        alt={frame.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Glasses className="w-12 h-12 text-black/10" />
                      </div>
                    )}
                    {frame.featured && (
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
                      >
                        Featured
                      </div>
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(44,24,16,0.3)" }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                        style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                      >
                        <Search className="w-5 h-5" style={{ color: "var(--color-chocolate, #2C1810)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-serif font-bold mb-1">{frame.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold" style={{ color: "var(--color-primary, #FF055F)" }}>
                        Rs. {frame.price}
                      </span>
                      <span
                        className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(212,165,116,0.15)",
                          color: "var(--color-warm-accent, #D4A574)",
                        }}
                      >
                        {frame.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            
          </div>
        </div>
      </section>

      {/* Lens Options */}
      <section className="lens-section px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <EditableText
              page="eyewear"
              contentKey="lens_title"
              defaultText={content?.lens_title || "Premium Lens Options"}
              as="h2"
              className="text-3xl md:text-4xl font-serif font-bold mb-4"
            />
            <EditableText
              page="eyewear"
              contentKey="lens_description"
              defaultText={content?.lens_description || "Enhance your eyewear with our advanced lens technologies for maximum comfort and protection."}
              as="p"
              className="text-lg max-w-xl mx-auto"
              style={{ color: "rgba(44,24,16,0.65)" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {lensOptions.map((lens, idx) => {
              const LensIcon = lens.icon;
              return (
                <div
                  key={idx}
                  className="lens-card p-8 rounded-3xl text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    border: "1px solid var(--color-warm-border, #E8DDD1)",
                    boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "rgba(212,165,116,0.15)" }}
                  >
                    <LensIcon className="w-7 h-7" style={{ color: "var(--color-primary, #FF055F)" }} />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{lens.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(44,24,16,0.65)" }}>
                    {lens.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
              style={{
                backgroundColor: "rgba(212,165,116,0.15)",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "var(--color-primary, #FF055F)" }} />
              <EditableText
                page="eyewear"
                contentKey="steps_badge"
                defaultText={content?.steps_badge || "How It Works"}
                as="span"
                className="text-sm font-medium tracking-wide uppercase"
              />
            </div>
            <EditableText
              page="eyewear"
              contentKey="steps_title"
              defaultText={content?.steps_title || "Three Simple Steps"}
              as="h2"
              className="text-3xl md:text-4xl font-serif font-bold"
            />
          </div>

          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="step-item flex items-start gap-6 p-7 rounded-3xl transition-all duration-500 hover:shadow-md"
                style={{
                  backgroundColor: "rgba(255,255,255,0.7)",
                  border: "1px solid var(--color-warm-border, #E8DDD1)",
                  boxShadow: "0 2px 15px rgba(44,24,16,0.05)",
                }}
              >
                <div
                  className="text-3xl font-serif font-bold flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl"
                  style={{
                    color: "var(--color-primary, #FF055F)",
                    backgroundColor: "rgba(255,5,95,0.08)",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "rgba(44,24,16,0.65)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-8 pb-24">
        <div
          
          
          
          
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)",
          }}
        >
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, var(--color-secondary, #00E5E5) 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <EditableText
            page="eyewear"
            contentKey="cta_title"
            defaultText={content?.cta_title || "Can't Decide? Visit Our Store"}
            as="h2"
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 relative z-10"
          />
          <EditableText
            page="eyewear"
            contentKey="cta_description"
            defaultText={content?.cta_description || "Try on frames in person and let our experts help you find the perfect pair for your face shape and style."}
            as="p"
            className="text-lg text-white/70 mb-8 max-w-xl mx-auto relative z-10"
          />

          <Link
            href="/appointment"
            className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
          >
            Visit Store
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Item Modal */}
      
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div 
              
              
              
              
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-4 right-4 z-10 p-2 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-black" />
              </button>
              
              {/* Images section */}
              <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col gap-4">
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                  {selectedItem.images && selectedItem.images.length > 0 ? (
                    <Image 
                      src={selectedItem.images[currentImageIndex]} 
                      alt={selectedItem.name} 
                      fill 
                      className="object-contain p-4" 
                    />
                  ) : (
                    <Glasses className="w-24 h-24 text-gray-200" />
                  )}
                </div>
                {selectedItem.images && selectedItem.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {selectedItem.images.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentImageIndex(idx)} 
                        className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${currentImageIndex === idx ? "border-[#FF055F]" : "border-transparent"}`}
                      >
                        <Image src={img} alt={`${selectedItem.name} view ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Info section */}
              <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="text-sm font-bold tracking-wider uppercase mb-2" style={{ color: "var(--color-primary, #FF055F)" }}>
                  {selectedItem.brand}
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#2C1810] mb-2">{selectedItem.name}</h2>
                <div className="text-2xl font-semibold mb-6">Rs. {selectedItem.price}</div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{selectedItem.category}</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">{selectedItem.gender}</span>
                  {selectedItem.inStock ? (
                     <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> In Stock
                     </span>
                  ) : (
                     <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Out of Stock
                     </span>
                  )}
                </div>
                
                <div className="prose prose-sm text-gray-600 mb-8 flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
                  <p className="leading-relaxed whitespace-pre-wrap">{selectedItem.description || "No detailed description available for this product."}</p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-100">
                  {selectedItem.externalLink ? (
                    <a 
                      href={selectedItem.externalLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:-translate-y-1 hover:shadow-lg" 
                      style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
                    >
                      Buy Now <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link 
                      href="/appointment" 
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-bold transition-all hover:opacity-90 hover:-translate-y-1 hover:shadow-lg" 
                      style={{ backgroundColor: "var(--color-primary, #FF055F)" }}
                    >
                      Book Appointment to Try <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      
    </div>
  );
}
