"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ne";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "Our Story",
    "nav.services": "Vision Services",
    "nav.eyewear": "Eyewear",
    "nav.team": "Care Team",
    "nav.reviews": "Patient Stories",
    "nav.contact": "Connect",
    "btn.book": "Book",
    "hero.tagline": "Clear Vision, World-Class Care",
    "hero.subtagline": "Right Here in Pokhara",
  },
  ne: {
    "nav.home": "गृहपृष्ठ",
    "nav.about": "हाम्रो बारेमा",
    "nav.services": "सेवाहरू",
    "nav.eyewear": "चश्मा",
    "nav.team": "हाम्रो टोली",
    "nav.reviews": "समीक्षाहरू",
    "nav.contact": "सम्पर्क",
    "btn.book": "अपोइन्टमेन्ट बुक गर्नुहोस्",
    "hero.tagline": "स्पष्ट दृष्टि, विश्व-स्तरीय हेरचाह",
    "hero.subtagline": "पोखरामा नै",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ne" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
