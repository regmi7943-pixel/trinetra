"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Calendar, User, Phone, Mail, MessageSquare, Send } from "lucide-react";

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

const STORAGE_KEY = "trinetra_appointment_popup_seen_v1";

export function AppointmentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (pathname === "/appointment") return;

    const alreadySeen = localStorage.getItem(STORAGE_KEY) === "1";
    if (alreadySeen) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      localStorage.setItem(STORAGE_KEY, "1");
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const close = () => setOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyles: React.CSSProperties = {
    backgroundColor: "#FAF5EF",
    border: "1.5px solid var(--color-warm-border, #E8DDD1)",
    color: "var(--color-chocolate, #2C1810)",
  };

  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[2px]"
            onClick={close}
          />
          <div
            className="scrollbar-popup fixed inset-x-4 top-1/2 z-[100] max-h-[88vh] -translate-y-1/2 overflow-y-auto rounded-3xl border border-[var(--color-warm-border,#E8DDD1)] bg-white p-6 shadow-[0_20px_60px_rgba(44,24,16,0.2)] md:inset-x-0 md:left-1/2 md:w-[min(92vw,640px)] md:-translate-x-1/2 md:p-8"
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 rounded-lg p-2 text-[var(--color-chocolate,#2C1810)]/70 hover:bg-[#F7EFE6]"
              aria-label="Close appointment popup"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6">
                  <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-primary)]">
                    <Phone size={14} />
                    Book in seconds
                  </p>
                  <h3 className="text-2xl font-bold font-serif text-[var(--color-chocolate,#2C1810)]">
                    Book Appointment
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-chocolate,#2C1810)]/65">
                    Phone: +91 98765 43210
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--color-chocolate,#2C1810)]">
                      <User size={14} style={{ opacity: 0.55 }} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#FF055F] focus:ring-2 focus:ring-[#FF055F]/20"
                      style={inputStyles}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--color-chocolate,#2C1810)]">
                      <Phone size={14} style={{ opacity: 0.55 }} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#FF055F] focus:ring-2 focus:ring-[#FF055F]/20"
                      style={inputStyles}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--color-chocolate,#2C1810)]">
                        <Calendar size={14} style={{ opacity: 0.55 }} />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#FF055F] focus:ring-2 focus:ring-[#FF055F]/20"
                        style={inputStyles}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--color-chocolate,#2C1810)]">
                        <Mail size={14} style={{ opacity: 0.55 }} />
                        Service
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#FF055F] focus:ring-2 focus:ring-[#FF055F]/20"
                        style={inputStyles}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--color-chocolate,#2C1810)]">
                      <MessageSquare size={14} style={{ opacity: 0.55 }} />
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your concern..."
                      className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#FF055F] focus:ring-2 focus:ring-[#FF055F]/20"
                      style={inputStyles}
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                    style={{
                      backgroundColor: "var(--color-primary, #FF055F)",
                      boxShadow: "0 4px 20px rgba(255,5,95,0.25)",
                    }}
                  >
                    <Send size={16} />
                    Submit Appointment Request
                  </button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <h3 className="text-2xl font-bold font-serif text-[var(--color-chocolate,#2C1810)]">
                  Request Received
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--color-chocolate,#2C1810)]/65">
                  Thanks! We&apos;ll contact you shortly to confirm your appointment.
                </p>
                <button
                  onClick={close}
                  className="mt-6 rounded-xl border border-[var(--color-primary,#FF055F)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary,#FF055F)]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

