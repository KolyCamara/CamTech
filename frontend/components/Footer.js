import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-block footer-brand">
          <h3>CamTech</h3>
          <p>
            Nous concevons des sites, applications et automatisations qui
            rendent les projets digitaux plus clairs, plus rapides et plus
            utiles.
          </p>
        </div>

        <div className="footer-block">
          <h3>Navigation</h3>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">A propos</Link>
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
          <h3>Offres</h3>
          <ul>
            <li>
              <Link href="/services">Site vitrine</Link>
            </li>
            <li>
              <Link href="/services">Application web</Link>
            </li>
            <li>
              <Link href="/services">SEO local</Link>
            </li>
            <li>
              <Link href="/services">Automatisation IA</Link>
            </li>
          </ul>
        </div>

        <div className="footer-block footer-contact">
          <h3>Contact</h3>
          <ul>
            <li>Casablanca, Maroc</li>
            <li>
              <a href="mailto:contact@camtech.ma">contact@camtech.ma</a>
            </li>
            <li>
              <a href="tel:+2120555123456">+212 05 55 12 34 56</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} CamTech. Tous droits reserves.</p>
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
