"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "nav.home", path: "/" },
    { name: "nav.about", path: "/about" },
    { name: "nav.services", path: "/services" },
    { name: "nav.eyewear", path: "/eyewear" },
    { name: "nav.doctor", path: "/doctor" },
    { name: "nav.reviews", path: "/reviews" },
    { name: "nav.contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FDF8F3] py-3 shadow-[0_4px_30px_rgba(44,24,16,0.08)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            src="/ChatGPT Image May 28, 2026, 03_49_06 PM.png"
            alt="Trinetra logo"
            className="h-11 w-11 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[var(--color-chocolate)] leading-none">
              Trinetra
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-warm-accent)] font-semibold leading-tight mt-0.5">
              Eye Care Center
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-chocolate-muted)] hover:text-[var(--color-chocolate)]"
                }`}
              >
                {t(link.name)}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[var(--color-primary)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/appointment">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[#e0044f] transition-all duration-300 shadow-[0_4px_20px_rgba(255,5,95,0.25)] hover:shadow-[0_6px_30px_rgba(255,5,95,0.35)]"
            >
              {t("btn.book")}
            </motion.span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-2 rounded-lg text-[var(--color-chocolate)] hover:bg-[var(--color-cream-dark)] transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="bg-[var(--color-cream)] border-t border-[var(--color-warm-border)] mx-4 mt-3 rounded-2xl shadow-[0_8px_40px_rgba(44,24,16,0.08)]">
              <div className="flex flex-col p-5 gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-base font-medium px-4 py-3 rounded-xl transition-all duration-300 ${
                        pathname === link.path
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                          : "text-[var(--color-chocolate-muted)] hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-chocolate)]"
                      }`}
                    >
                      {t(link.name)}
                    </Link>
                  </motion.div>
                ))}

                <div className="h-px w-full bg-[var(--color-warm-border)] my-3" />

                <div className="px-4">
                  <Link
                    href="/appointment"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(255,5,95,0.2)]"
                  >
                    {t("btn.book")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
