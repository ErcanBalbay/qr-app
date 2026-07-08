"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { LANGUAGES, translations, type Language } from "./translations";

const STORAGE_KEY = "qr-app-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof translations)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("tr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const browserLang = navigator.language.slice(0, 2);
    const detected = isLanguage(stored) ? stored : isLanguage(browserLang) ? browserLang : null;
    // localStorage/navigator are unavailable during SSR, so the persisted/browser
    // language can only be read after mount — this one-time sync is expected here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (detected) setLanguageState(detected);
  }, []);

  function setLanguage(next: Language) {
    setLanguageState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
