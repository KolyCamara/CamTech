import { useEffect, useState } from "react";
import Link from "next/link";
import { useSiteLanguage } from "../hooks/useSiteLanguage";

const navItems = {
  FR: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Projets", href: "/#projets" },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "A propos", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  EN: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/#projets" },
    { label: "Pricing", href: "/#tarifs" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, isEnglish } = useSiteLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setLangMenuOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeMenus}>
          <span className="brand__logo">CT</span>
          <span className="brand__text">
            <span className="brand__name">CamTech</span>
            <span className="brand__tagline">
              {isEnglish ? "Premium web agency" : "Agence web premium"}
            </span>
          </span>
        </Link>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          type="button"
          aria-label={isEnglish ? "Open menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`site-nav ${menuOpen ? "open" : ""}`}
          aria-label="Navigation principale"
        >
          <div className="nav-links">
            {navItems[language].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <div className="lang-selector">
              <button
                type="button"
                className={`lang-button ${langMenuOpen ? "open" : ""}`}
                aria-expanded={langMenuOpen}
                onClick={() => setLangMenuOpen((current) => !current)}
              >
                {language}
              </button>
              <div
                className={`lang-menu ${langMenuOpen ? "open" : ""}`}
                role="menu"
              >
                {["FR", "EN"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`lang-option ${language === lang ? "active" : ""}`}
                    onClick={() => {
                      setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="btn btn-primary nav-cta"
              onClick={closeMenus}
            >
              {isEnglish ? "Get a quote" : "Demander un devis"}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
