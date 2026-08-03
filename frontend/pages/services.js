import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSiteLanguage } from "../hooks/useSiteLanguage";

const content = {
  FR: {
    title: "Des services digitaux simples, utiles et bien organises.",
    subtitle:
      "CamTech vous accompagne de l'idee au lancement avec des solutions adaptees a votre budget, votre audience et vos objectifs.",
    meta: "Decouvrez les services web, SEO, cloud et IA de CamTech.",
    eyebrow: "Services",
    cta: "Demander un devis",
    services: [
      ["01", "Developpement web", "Sites vitrines, portails et plateformes rapides, responsive et faciles a maintenir."],
      ["02", "Applications web", "Outils metier, espaces clients et dashboards pour fluidifier vos operations."],
      ["03", "Design UI/UX", "Interfaces claires, modernes et pensees pour guider l'utilisateur sans friction."],
      ["04", "SEO local", "Structure, contenu et optimisation pour gagner en visibilite sur vos marches."],
      ["05", "Cloud", "Deploiement, configuration et suivi d'infrastructures fiables et evolutives."],
      ["06", "Automatisation IA", "Assistants, workflows et automatisations pour gagner du temps au quotidien."],
    ],
  },
  EN: {
    title: "Simple, useful and well organized digital services.",
    subtitle:
      "CamTech supports you from idea to launch with solutions adapted to your budget, audience and goals.",
    meta: "Explore CamTech web, SEO, cloud and AI services.",
    eyebrow: "Services",
    cta: "Get a quote",
    services: [
      ["01", "Web development", "Fast, responsive and maintainable websites, portals and platforms."],
      ["02", "Web applications", "Business tools, client portals and dashboards that simplify operations."],
      ["03", "UI/UX design", "Clean modern interfaces designed to guide users with less friction."],
      ["04", "Local SEO", "Structure, content and optimization to improve visibility in your markets."],
      ["05", "Cloud", "Deployment, configuration and monitoring for reliable scalable infrastructure."],
      ["06", "AI automation", "Assistants, workflows and automations that save time every day."],
    ],
  },
};

export default function Services() {
  const { language } = useSiteLanguage();
  const t = content[language];

  return (
    <>
      <Head>
        <title>CamTech | Services</title>
        <meta name="description" content={t.meta} />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <div className="container page-intro">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 className="page-title">{t.title}</h1>
            <p className="page-subtitle">{t.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container service-grid">
            {t.services.map(([icon, title, text]) => (
              <article className="card service-card" key={title}>
                <div className="card-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="/contact" className="btn btn-secondary card-action">
                  {t.cta}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
