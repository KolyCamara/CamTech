import Link from "next/link";
import { useSiteLanguage } from "../hooks/useSiteLanguage";

const content = {
  FR: {
    navigation: "Navigation",
    offers: "Offres",
    contact: "Contact",
    address: "Casablanca, Maroc",
    email: "contact@camtech.ma",
    phone: "+212 05 55 12 34 56",
    copyright: `© ${new Date().getFullYear()} CamTech. Tous droits reserves.`,
  },
  EN: {
    navigation: "Navigation",
    offers: "Offers",
    contact: "Contact",
    address: "Casablanca, Morocco",
    email: "contact@camtech.ma",
    phone: "+212 05 55 12 34 56",
    copyright: `© ${new Date().getFullYear()} CamTech. All rights reserved.`,
  },
};

export default function Footer() {
  const { language } = useSiteLanguage();
  const t = content[language];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-block footer-brand">
          <h3>CamTech</h3>
          <p>
            {language === "EN"
              ? "We build websites, applications and automations that make digital projects clearer, faster and more useful."
              : "Nous concevons des sites, applications et automatisations qui rendent les projets digitaux plus clairs, plus rapides et plus utiles."}
          </p>
        </div>

        <div className="footer-block">
          <h3>{t.navigation}</h3>
          <ul>
            <li>
              <Link href="/">{language === "EN" ? "Home" : "Accueil"}</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">
                {language === "EN" ? "About" : "A propos"}
              </Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-block">
          <h3>{t.offers}</h3>
          <ul>
            <li>
              <Link href="/services">
                {language === "EN" ? "Website" : "Site vitrine"}
              </Link>
            </li>
            <li>
              <Link href="/services">
                {language === "EN" ? "Web application" : "Application web"}
              </Link>
            </li>
            <li>
              <Link href="/services">SEO</Link>
            </li>
            <li>
              <Link href="/services">IA automation</Link>
            </li>
          </ul>
        </div>

        <div className="footer-block footer-contact">
          <h3>{t.contact}</h3>
          <ul>
            <li>{t.address}</li>
            <li>
              <a href={`mailto:${t.email}`}>{t.email}</a>
            </li>
            <li>
              <a href={`tel:${t.phone}`}>{t.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>{t.copyright}</p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
