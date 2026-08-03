import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSiteLanguage } from "../hooks/useSiteLanguage";

const content = {
  FR: {
    title: "Une equipe concentree sur des projets digitaux clairs et durables.",
    subtitle:
      "CamTech aide les entreprises a transformer une idee en produit web fiable, lisible et oriente resultats.",
    meta: "Decouvrez CamTech, son equipe, sa mission et ses valeurs.",
    eyebrow: "A propos",
    missionTitle: "Notre mission",
    mission:
      "Construire des experiences digitales qui inspirent confiance, facilitent le travail et creent une croissance mesurable.",
    valuesTitle: "Nos valeurs",
    values: ["Clarte dans la communication", "Respect des delais", "Design centre utilisateur", "Accompagnement apres livraison"],
    teamTitle: "Une equipe compacte et efficace",
    teamSubtitle: "Strategie, design, developpement et suivi projet travaillent ensemble des le depart.",
    roles: [
      ["Direction projet", "Cadrage, planning et coordination."],
      ["Design UI/UX", "Parcours, interfaces et contenu."],
      ["Developpement", "Frontend, backend et integrations."],
    ],
  },
  EN: {
    title: "A team focused on clear and durable digital projects.",
    subtitle:
      "CamTech helps companies turn an idea into a reliable, readable and result-driven web product.",
    meta: "Discover CamTech, its team, mission and values.",
    eyebrow: "About",
    missionTitle: "Our mission",
    mission:
      "Build digital experiences that create trust, make work easier and support measurable growth.",
    valuesTitle: "Our values",
    values: ["Clear communication", "Reliable delivery", "User-centered design", "Support after launch"],
    teamTitle: "A compact and efficient team",
    teamSubtitle: "Strategy, design, development and project follow-up work together from day one.",
    roles: [
      ["Project direction", "Scoping, planning and coordination."],
      ["UI/UX design", "Journeys, interfaces and content."],
      ["Development", "Frontend, backend and integrations."],
    ],
  },
};

export default function About() {
  const { language } = useSiteLanguage();
  const t = content[language];

  return (
    <>
      <Head>
        <title>CamTech | {t.eyebrow}</title>
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
          <div className="container grid-2 about-grid">
            <article className="card feature-card">
              <h2>{t.missionTitle}</h2>
              <p>{t.mission}</p>
            </article>
            <article className="card feature-card">
              <h2>{t.valuesTitle}</h2>
              <ul className="list-reset">
                {t.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <div className="section-title">
              <h2>{t.teamTitle}</h2>
              <p>{t.teamSubtitle}</p>
            </div>
            <div className="grid-3">
              {t.roles.map(([role, description]) => (
                <article className="card" key={role}>
                  <h3>{role}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
