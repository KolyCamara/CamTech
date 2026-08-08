import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSiteLanguage } from "../hooks/useSiteLanguage";

const homeCopy = {
  FR: {
    title:
      "CamTech cree des experiences digitales qui inspirent confiance et generent des clients.",
    subtitle:
      "Nous accompagnons les entreprises dans le design, le developpement, le SEO, le cloud et l'automatisation IA avec une approche claire, mesurable et orientee conversion.",
    badge: "Studio digital pour entreprises ambitieuses",
    quote: "Demander un devis",
    services: "Voir les services",
    metrics: [
      "Expertises digitales",
      "Packs de lancement",
      "Villes ciblees SEO",
    ],
    projectPlan: "Plan projet",
    status: "En cours",
    expertiseEyebrow: "Expertises",
    expertiseTitle: "Une structure simple pour construire un projet solide.",
    expertiseText:
      "Chaque service repond a un besoin concret: attirer, convaincre, automatiser et grandir.",
    methodEyebrow: "Methode",
    methodTitle: "Un plan lisible du premier audit jusqu'au lancement.",
    methodText:
      "La structure du projet reste transparente: vous savez ce qui est en cours, ce qui arrive ensuite et comment chaque decision sert la croissance.",
    workEyebrow: "Realisations",
    workTitle: "Des livrables clairs, modernes et faciles a maintenir.",
    pricingEyebrow: "Tarifs",
    pricingTitle: "Des offres lisibles pour avancer sans confusion.",
    popular: "Populaire",
    faqTitle: "Questions frequentes",
    next: "Prochain pas",
    ctaTitle: "Parlons de votre projet CamTech.",
    ctaText:
      "Une idee, un site a refaire ou une application a lancer: nous pouvons clarifier le plan ensemble.",
    start: "Commencer maintenant",
  },
  EN: {
    title:
      "CamTech creates digital experiences that build trust and generate customers.",
    subtitle:
      "We support companies with design, development, SEO, cloud and AI automation through a clear, measurable and conversion-focused approach.",
    badge: "Digital studio for ambitious companies",
    quote: "Get a quote",
    services: "View services",
    metrics: ["Digital expertise", "Launch packs", "SEO target cities"],
    projectPlan: "Project plan",
    status: "In progress",
    expertiseEyebrow: "Expertise",
    expertiseTitle: "A simple structure for building a solid project.",
    expertiseText:
      "Each service answers a clear need: attract, convince, automate and grow.",
    methodEyebrow: "Method",
    methodTitle: "A readable plan from the first audit to launch.",
    methodText:
      "The project structure stays transparent: you know what is in progress, what comes next and how each decision supports growth.",
    workEyebrow: "Work",
    workTitle: "Clear, modern and maintainable deliverables.",
    pricingEyebrow: "Pricing",
    pricingTitle: "Readable offers to move forward without confusion.",
    popular: "Popular",
    faqTitle: "Frequently asked questions",
    next: "Next step",
    ctaTitle: "Let us talk about your CamTech project.",
    ctaText:
      "An idea, a redesign or an app to launch: we can clarify the plan together.",
    start: "Start now",
  },
};

const services = {
  FR: [
    {
      icon: "01",
      title: "Sites web",
      text: "Des sites vitrines rapides, clairs et optimises pour transformer les visiteurs en contacts.",
    },
    {
      icon: "02",
      title: "Applications",
      text: "Des plateformes web sur mesure pour organiser vos operations et mieux servir vos clients.",
    },
    {
      icon: "03",
      title: "SEO & contenu",
      text: "Une presence digitale construite pour etre visible, credible et mesurable.",
    },
    {
      icon: "04",
      title: "Automatisation IA",
      text: "Des outils intelligents pour reduire les taches repetitives et accelerer vos equipes.",
    },
  ],
  EN: [
    {
      icon: "01",
      title: "Websites",
      text: "Fast, clear and optimized sites designed to turn visitors into leads.",
    },
    {
      icon: "02",
      title: "Applications",
      text: "Custom web platforms to organize operations and better serve your clients.",
    },
    {
      icon: "03",
      title: "SEO & content",
      text: "A digital presence built to be visible, credible and measurable.",
    },
    {
      icon: "04",
      title: "AI automation",
      text: "Smart tools to reduce repetitive tasks and speed up your teams.",
    },
  ],
};

const processSteps = {
  FR: [
    {
      title: "Audit & strategie",
      text: "Nous clarifions vos objectifs, vos clients et les priorites qui creent vraiment de la valeur.",
    },
    {
      title: "Design & contenu",
      text: "Nous structurons une experience simple a comprendre, rassurante et adaptee a votre marque.",
    },
    {
      title: "Developpement",
      text: "Nous construisons une base propre, responsive et facile a faire evoluer.",
    },
    {
      title: "Lancement",
      text: "Nous mettons en ligne, mesurons les premiers resultats et optimisons les points bloquants.",
    },
  ],
  EN: [
    {
      title: "Audit & strategy",
      text: "We clarify your goals, customers and priorities that truly create value.",
    },
    {
      title: "Design & content",
      text: "We structure an experience that is easy to understand, reassuring and adapted to your brand.",
    },
    {
      title: "Development",
      text: "We build a clean, responsive foundation that is easy to scale.",
    },
    {
      title: "Launch",
      text: "We publish, measure early results and optimize the main friction points.",
    },
  ],
};

const projects = {
  FR: [
    {
      title: "Digital Launch",
      description:
        "Site de lancement avec parcours de conversion et tableau de suivi.",
      tags: ["React", "Landing", "SEO"],
    },
    {
      title: "Portail client",
      description:
        "Espace prive pour centraliser les demandes, documents et notifications.",
      tags: ["Dashboard", "UX", "Automatisation"],
    },
    {
      title: "Boutique locale",
      description:
        "Catalogue responsive avec pages produits, tunnel de demande et analytics.",
      tags: ["E-commerce", "Performance", "Mobile"],
    },
  ],
  EN: [
    {
      title: "Digital Launch",
      description: "Launch site with conversion flow and tracking dashboard.",
      tags: ["React", "Landing", "SEO"],
    },
    {
      title: "Client portal",
      description:
        "Private space for centralizing requests, documents and notifications.",
      tags: ["Dashboard", "UX", "Automation"],
    },
    {
      title: "Local shop",
      description:
        "Responsive catalogue with product pages, inquiry funnel and analytics.",
      tags: ["E-commerce", "Performance", "Mobile"],
    },
  ],
};

const pricing = {
  FR: [
    {
      plan: "Starter",
      price: "1 999 MAD",
      description: "Pour lancer une presence digitale professionnelle.",
      features: [
        "Site vitrine",
        "5 pages",
        "Responsive",
        "Formulaire de contact",
      ],
    },
    {
      plan: "Business",
      price: "4 999 MAD",
      description: "Pour vendre, convaincre et suivre les performances.",
      features: [
        "Design sur mesure",
        "SEO de base",
        "Analytics",
        "Support prioritaire",
      ],
      highlight: true,
    },
    {
      plan: "Sur mesure",
      price: "Sur devis",
      description:
        "Pour les plateformes, integrations et automatisations avancees.",
      features: [
        "Application web",
        "Connecteurs",
        "Automatisation IA",
        "Maintenance",
      ],
    },
  ],
  EN: [
    {
      plan: "Starter",
      price: "1 999 MAD",
      description: "To launch a professional digital presence.",
      features: ["Showcase site", "5 pages", "Responsive", "Contact form"],
    },
    {
      plan: "Business",
      price: "4 999 MAD",
      description: "To sell, convince and monitor performance.",
      features: ["Custom design", "Basic SEO", "Analytics", "Priority support"],
      highlight: true,
    },
    {
      plan: "Custom",
      price: "On request",
      description: "For platforms, integrations and advanced automations.",
      features: [
        "Web application",
        "Connectors",
        "AI automation",
        "Maintenance",
      ],
    },
  ],
};

const faqs = {
  FR: [
    {
      question: "Combien de temps faut-il pour lancer un projet ?",
      answer:
        "Un site vitrine peut etre livre en quelques semaines. Une application suit un planning defini apres l'audit.",
    },
    {
      question: "CamTech accompagne-t-il apres la livraison ?",
      answer:
        "Oui. Nous pouvons assurer maintenance, suivi SEO, ameliorations produit et support technique.",
    },
    {
      question: "Travaillez-vous avec les petites entreprises ?",
      answer:
        "Oui. Les offres sont pensees pour rester claires, progressives et adaptees a chaque budget.",
    },
  ],
  EN: [
    {
      question: "How long does it take to launch a project?",
      answer:
        "A showcase site can be delivered in a few weeks. An app follows a defined plan after the audit.",
    },
    {
      question: "Does CamTech support after delivery?",
      answer:
        "Yes. We can provide maintenance, SEO follow-up, product improvements and technical support.",
    },
    {
      question: "Do you work with small businesses?",
      answer:
        "Yes. The offers are designed to stay clear, progressive and suited to every budget.",
    },
  ],
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useSiteLanguage();
  const t = homeCopy[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const pageDescription =
    language === "EN"
      ? "CamTech builds websites, applications, SEO strategies and AI automations for ambitious companies."
      : "CamTech cree des sites web, applications, strategies SEO et automatisations IA pour les entreprises.";

  const currentServices = services[language];
  const currentProcessSteps = processSteps[language];
  const currentProjects = projects[language];
  const currentPricing = pricing[language];
  const currentFaqs = faqs[language];

  return (
    <>
      <Head>
        <title>CamTech | Solutions digitales</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-badge">{t.badge}</p>
              <h1>{t.title}</h1>
              <p>{t.subtitle}</p>
              <div className="hero-actions">
                <a href="/contact" className="btn btn-primary">
                  {t.quote}
                </a>
                <a href="/services" className="btn btn-secondary">
                  {t.services}
                </a>
              </div>
              <div className="hero-metrics" aria-label="Indicateurs CamTech">
                <div>
                  <strong>9+</strong>
                  <span>{t.metrics[0]}</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>{t.metrics[1]}</span>
                </div>
                <div>
                  <strong>9</strong>
                  <span>{t.metrics[2]}</span>
                </div>
              </div>
            </div>

            <aside className="project-panel" aria-label="Plan projet CamTech">
              <div className="project-panel__header">
                <div>
                  <span>{t.projectPlan}</span>
                  <h2>Digital Launch</h2>
                </div>
                <strong>{t.status}</strong>
              </div>
              <div className="project-panel__steps">
                {currentProcessSteps.map((step, index) => (
                  <div className="project-step" key={step.title}>
                    <span>{index + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <div className="progress-track">
                        <span style={{ width: `${92 - index * 13}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-title">
              <p className="eyebrow">{t.expertiseEyebrow}</p>
              <h2>{t.expertiseTitle}</h2>
              <p>{t.expertiseText}</p>
            </div>
            <div className="service-grid">
              {currentServices.map((service) => (
                <article
                  className="card service-card animate-on-scroll"
                  key={service.title}
                >
                  <div className="card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="expertise" className="section section-soft">
          <div className="container split-section">
            <div>
              <p className="eyebrow">{t.methodEyebrow}</p>
              <h2>{t.methodTitle}</h2>
              <p>{t.methodText}</p>
            </div>
            <div className="timeline">
              {currentProcessSteps.map((step, index) => (
                <article
                  className="timeline-item animate-on-scroll"
                  key={step.title}
                >
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projets" className="section">
          <div className="container">
            <div className="section-title">
              <p className="eyebrow">{t.workEyebrow}</p>
              <h2>{t.workTitle}</h2>
            </div>
            <div className="grid-3">
              {currentProjects.map((project) => (
                <article
                  className="card project-card animate-on-scroll"
                  key={project.title}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tarifs" className="section section-soft">
          <div className="container">
            <div className="section-title">
              <p className="eyebrow">{t.pricingEyebrow}</p>
              <h2>{t.pricingTitle}</h2>
            </div>
            <div className="pricing-grid">
              {currentPricing.map((tier) => (
                <article
                  className={`card pricing-card ${tier.highlight ? "featured" : ""}`}
                  key={tier.plan}
                >
                  {tier.highlight && (
                    <span className="pricing-badge">{t.popular}</span>
                  )}
                  <h3>{tier.plan}</h3>
                  <strong>{tier.price}</strong>
                  <p>{tier.description}</p>
                  <ul>
                    {tier.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={`btn ${tier.highlight ? "btn-primary" : "btn-secondary"}`}
                  >
                    {t.quote}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container faq-wrap">
            <div className="section-title">
              <p className="eyebrow">FAQ</p>
              <h2>{t.faqTitle}</h2>
            </div>
            <div className="faq-list">
              {currentFaqs.map((faq, index) => (
                <article className="faq-item" key={faq.question}>
                  <button
                    type="button"
                    className={`faq-question ${openFaq === index ? "active" : ""}`}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <span>{openFaq === index ? "-" : "+"}</span>
                  </button>
                  {openFaq === index && (
                    <p className="faq-answer">{faq.answer}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta">
          <div className="container">
            <p className="eyebrow">{t.next}</p>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
            <a href="/contact" className="btn btn-primary">
              {t.start}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
