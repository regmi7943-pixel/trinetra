"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  User,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  MessageCircle,
  Clock,
  Eye,
  Shield,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Comprehensive Eye Exam",
  "LASIK Consultation",
  "Cataract Evaluation",
  "Glaucoma Screening",
  "Pediatric Eye Care",
  "Contact Lens Fitting",
  "Retina Checkup",
  "Other",
];

const expectations = [
  {
    icon: Clock,
    title: "Quick Check-in",
    desc: "Arrive 10 minutes early with your ID and insurance",
  },
  {
    icon: Eye,
    title: "Thorough Examination",
    desc: "Comprehensive testing using state-of-the-art equipment",
  },
  {
    icon: MessageSquare,
    title: "Expert Consultation",
    desc: "Personalized discussion of your results and options",
  },
  {
    icon: Shield,
    title: "Follow-up Care",
    desc: "Clear next steps and ongoing support for your vision",
  },
];

export default function AppointmentPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  useGSAP(
    () => {
      gsap.from(".form-heading", {
        y: 50,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".form-container", {
        y: 60,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".sidebar-card", {
        x: 60,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".expect-item", {
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".expect-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles: React.CSSProperties = {
    backgroundColor: "#FAF5EF",
    border: "1.5px solid var(--color-warm-border, #E8DDD1)",
    color: "var(--color-chocolate, #2C1810)",
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-cream, #FDF8F3)" }}
    >
      {/* Hero */}
      <section className="pt-32 pb-10 px-4 text-center">
        <div className="max-w-3xl mx-auto form-heading">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              backgroundColor: "#FAF5EF",
              border: "1px solid var(--color-warm-border, #E8DDD1)",
            }}
          >
            <Calendar
              size={16}
              style={{ color: "var(--color-primary, #FF055F)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-chocolate, #2C1810)" }}
            >
              Schedule a Visit
            </span>
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-bold font-serif mb-4"
            style={{ color: "var(--color-chocolate, #2C1810)" }}
          >
            Book Your Appointment
          </h1>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{
              color: "var(--color-chocolate, #2C1810)",
              opacity: 0.65,
            }}
          >
            Take the first step toward better vision. We&apos;ll confirm your
            appointment within 2 hours.
          </p>

          {/* Walk-ins Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
            style={{
              backgroundColor: "#E8F5E8",
              border: "1px solid #C8E6C9",
            }}
          >
            <CheckCircle2 size={14} color="#4CAF50" />
            <span className="text-sm font-medium" style={{ color: "#2E7D32" }}>
              Walk-ins are always welcome!
            </span>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Form Side */}
          <div ref={formRef} className="lg:col-span-3 form-container">
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
              }}
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
                        alt="Eye examination"
                        className="w-full h-44 object-cover rounded-2xl mb-4"
                      />
                    </div>

                    {/* Name */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-medium mb-2"
                        style={{ color: "var(--color-chocolate, #2C1810)" }}
                      >
                        <User size={14} style={{ opacity: 0.5 }} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                        style={inputStyles}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-medium mb-2"
                        style={{ color: "var(--color-chocolate, #2C1810)" }}
                      >
                        <Phone size={14} style={{ opacity: 0.5 }} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                        style={inputStyles}
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-medium mb-2"
                        style={{ color: "var(--color-chocolate, #2C1810)" }}
                      >
                        <Calendar size={14} style={{ opacity: 0.5 }} />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                        style={inputStyles}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-medium mb-2"
                        style={{ color: "var(--color-chocolate, #2C1810)" }}
                      >
                        <Mail size={14} style={{ opacity: 0.5 }} />
                        Service Required
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                        style={inputStyles}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="flex items-center gap-2 text-sm font-medium mb-2"
                        style={{ color: "var(--color-chocolate, #2C1810)" }}
                      >
                        <MessageSquare size={14} style={{ opacity: 0.5 }} />
                        Additional Message (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your concern or any special requirements..."
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-[#FF055F]/20 focus:border-[#FF055F]"
                        style={inputStyles}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        backgroundColor: "var(--color-primary, #FF055F)",
                        boxShadow: "0 4px 20px rgba(255,5,95,0.25)",
                      }}
                    >
                      <Send size={18} />
                      Book Appointment
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: "#E8F5E8" }}
                    >
                      <CheckCircle2 size={40} color="#4CAF50" />
                    </motion.div>

                    <h3
                      className="text-2xl font-bold font-serif mb-3"
                      style={{ color: "var(--color-chocolate, #2C1810)" }}
                    >
                      Appointment Requested!
                    </h3>
                    <p
                      className="max-w-sm mx-auto mb-8"
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                        opacity: 0.6,
                      }}
                    >
                      We&apos;ve received your request. Our team will confirm
                      your appointment via phone within 2 hours.
                    </p>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          phone: "",
                          date: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="px-6 py-3 rounded-xl font-medium transition-colors duration-200"
                      style={{
                        color: "var(--color-primary, #FF055F)",
                        border: "1.5px solid var(--color-primary, #FF055F)",
                      }}
                    >
                      Book Another Appointment
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={sidebarRef} className="lg:col-span-2 space-y-6">
            {/* WhatsApp Quick Book */}
            <div
              className="sidebar-card rounded-3xl p-7"
              style={{
                background: "linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)",
                border: "1px solid #A5D6A7",
                boxShadow: "0 4px 30px rgba(76,175,80,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#4CAF50" }}
                >
                  <MessageCircle size={22} color="white" />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#1B5E20" }}
                  >
                    WhatsApp Quick Book
                  </h3>
                  <p className="text-xs" style={{ color: "#2E7D32" }}>
                    Get instant confirmation
                  </p>
                </div>
              </div>
              <p
                className="text-sm mb-5 leading-relaxed"
                style={{ color: "#2E7D32", opacity: 0.85 }}
              >
                Prefer messaging? Book your appointment instantly via WhatsApp
                and get real-time confirmation.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: "#4CAF50",
                  boxShadow: "0 4px 15px rgba(76,175,80,0.3)",
                }}
              >
                <MessageCircle size={16} />
                Book via WhatsApp
                <ArrowRight size={14} />
              </a>
            </div>

            {/* What to Expect */}
            <div
              className="sidebar-card expect-section rounded-3xl p-7"
              style={{
                backgroundColor: "#FAF5EF",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
              }}
            >
              <h3
                className="font-bold text-lg font-serif mb-5"
                style={{ color: "var(--color-chocolate, #2C1810)" }}
              >
                What to Expect
              </h3>
              <div className="space-y-5">
                {expectations.map((item, i) => (
                  <div key={item.title} className="expect-item flex gap-3.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: "#FDF8F3",
                        border:
                          "1px solid var(--color-warm-border, #E8DDD1)",
                      }}
                    >
                      <item.icon
                        size={16}
                        style={{ color: "#D4A574" }}
                      />
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-sm"
                        style={{
                          color: "var(--color-chocolate, #2C1810)",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: "var(--color-chocolate, #2C1810)",
                          opacity: 0.55,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Hours */}
            <div
              className="sidebar-card rounded-3xl p-7"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-warm-border, #E8DDD1)",
                boxShadow: "0 4px 30px rgba(44,24,16,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock
                  size={16}
                  style={{ color: "var(--color-primary, #FF055F)" }}
                />
                <h3
                  className="font-bold text-sm"
                  style={{ color: "var(--color-chocolate, #2C1810)" }}
                >
                  Clinic Hours
                </h3>
              </div>
              <div className="space-y-2.5 text-sm">
                {[
                  { day: "Mon – Fri", time: "9:00 AM – 7:00 PM" },
                  { day: "Saturday", time: "9:00 AM – 5:00 PM" },
                  { day: "Sunday", time: "10:00 AM – 2:00 PM" },
                ].map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between"
                  >
                    <span
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                        opacity: 0.6,
                      }}
                    >
                      {h.day}
                    </span>
                    <span
                      className="font-medium"
                      style={{
                        color: "var(--color-chocolate, #2C1810)",
                      }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
