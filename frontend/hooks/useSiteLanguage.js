import { useEffect, useState } from "react";

const STORAGE_KEY = "camtechLanguage";
const EVENT_NAME = "camtech-language-change";

export function useSiteLanguage() {
  const [language, setLanguageState] = useState("FR");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "EN" || savedLanguage === "FR") {
      setLanguageState(savedLanguage);
    }

    const handleLanguageChange = (event) => {
      if (event.detail === "EN" || event.detail === "FR") {
        setLanguageState(event.detail);
      }
    };

    window.addEventListener(EVENT_NAME, handleLanguageChange);
    return () => window.removeEventListener(EVENT_NAME, handleLanguageChange);
  }, []);

  const setLanguage = (nextLanguage) => {
    if (nextLanguage !== "EN" && nextLanguage !== "FR") {
      return;
    }

    localStorage.setItem(STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextLanguage }));
  };

  return { language, setLanguage, isEnglish: language === "EN" };
}
