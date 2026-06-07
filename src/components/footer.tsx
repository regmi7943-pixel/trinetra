"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, MapPin, Phone, Mail, Clock, Link2, Globe } from "lucide-react";

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Eyewear Collection", path: "/eyewear" },
  { name: "Patient Reviews", path: "/reviews" },
  { name: "Contact Us", path: "/contact" },
];

const services = [
  "Eye Examination",
  "Computerized Eye Power Check-Up",
  "Prescription Glasses",
  "Eye Condition Consultation",
];

const socialLinks = [
  { icon: Globe, label: "Website", href: "#", hoverColor: "hover:text-[var(--color-primary)]" },
  { icon: Link2, label: "Social Link", href: "#", hoverColor: "hover:text-[var(--color-warm-accent)]" },
  { icon: Globe, label: "More", href: "#", hoverColor: "hover:text-[var(--color-primary)]" },
];

export const Footer = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isEdit = new URLSearchParams(window.location.search).get("editMode") === "true";
      setIsEditMode(isEdit);
    }
  }, []);

  if (isEditMode) return null;

  return (
    <footer className="bg-[var(--color-cream-dark)] border-t border-[var(--color-warm-border)] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="p-2 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                <Eye size={24} strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[var(--color-chocolate)] leading-none">
                  Trinetra
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-warm-accent)] font-semibold leading-tight mt-0.5">
                  Eye Care Center
                </span>
              </div>
            </Link>
            <p className="text-[var(--color-chocolate-muted)] text-sm leading-relaxed">
              Bringing world-class, international standard eye care right here
              to Pokhara. Precision, compassion, and innovation in every
              check-up.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2.5 rounded-xl bg-[var(--color-cream)] border border-[var(--color-warm-border)] text-[var(--color-chocolate-muted)] ${social.hoverColor} hover:border-[var(--color-warm-accent)] transition-all duration-300`}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--color-chocolate)] font-semibold text-base mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-[var(--color-chocolate-muted)] text-sm hover:text-[var(--color-primary)] transition-colors duration-300 flex items-center gap-2.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warm-border)] group-hover:bg-[var(--color-primary)] transition-colors duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[var(--color-chocolate)] font-semibold text-base mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href={`/services`}
                    className="text-[var(--color-chocolate-muted)] text-sm hover:text-[var(--color-primary)] transition-colors duration-300 flex items-center gap-2.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warm-border)] group-hover:bg-[var(--color-primary)] transition-colors duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[var(--color-chocolate)] font-semibold text-base mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-[var(--color-primary)]/10 mt-0.5 shrink-0">
                  <MapPin size={16} className="text-[var(--color-primary)]" />
                </div>
                <p className="text-[var(--color-chocolate-muted)] text-sm leading-relaxed group-hover:text-[var(--color-chocolate)] transition-colors">
                  Prithivichowk-8, Pokhara 33700<br />(opposite Nepal Bank)
                </p>
              </li>

              <li className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-[var(--color-warm-accent)]/10 shrink-0">
                  <Phone size={16} className="text-[var(--color-warm-accent)]" />
                </div>
                <a
                  href="tel:+9779856064940"
                  className="text-[var(--color-chocolate-muted)] text-sm font-medium hover:text-[var(--color-chocolate)] transition-colors"
                >
                  +977 9856064940
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-[var(--color-chocolate-muted)]/10 shrink-0">
                  <Mail size={16} className="text-[var(--color-chocolate-muted)]" />
                </div>
                <a
                  href="mailto:info@trinetraeyecare.com.np"
                  className="text-[var(--color-chocolate-muted)] text-sm hover:text-[var(--color-chocolate)] transition-colors duration-300"
                >
                  info@trinetraeyecare.com.np
                </a>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <div className="p-1.5 rounded-lg bg-[var(--color-cream-deeper)]/80 mt-0.5 shrink-0">
                  <Clock size={16} className="text-[var(--color-chocolate-muted)]" />
                </div>
                <div className="text-[var(--color-chocolate-muted)] text-sm">
                  <p>Sun – Fri: 9:00 AM – 6:00 PM</p>
                  <p className="text-[var(--color-chocolate-muted)]/60">Saturday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-warm-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-chocolate-muted)] text-xs">
            © {new Date().getFullYear()} Trinetra Eye Care Center. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-chocolate-muted)]">
            <Link
              href="/privacy"
              className="hover:text-[var(--color-chocolate)] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--color-chocolate)] transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
