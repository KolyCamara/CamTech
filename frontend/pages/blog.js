import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSiteLanguage } from "../hooks/useSiteLanguage";
import { articles as fallbackArticles } from "../data/articles";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

const copy = {
  FR: {
    eyebrow: "Blog",
    title: "Des articles utiles pour mieux comprendre le web.",
    subtitle:
      "Découvrez nos conseils, tendances et bonnes pratiques pour réussir votre présence digitale.",
    searchPlaceholder: "Rechercher un article",
    categoryAll: "Tous",
    categories: ["Tous", "Design", "Marketing", "Technologie"],
    categoryLabels: {
      design: "Design",
      marketing: "Marketing",
      technology: "Technologie",
    },
    loading: "Chargement des articles...",
    error: "Le chargement de l'API a échoué, affichage du contenu local.",
    readMore: "Lire plus",
    backToBlog: "Retour au blog",
    articleNotFoundTitle: "Article introuvable",
    articleNotFoundText: "Le contenu demandé n’existe pas ou a été déplacé.",
    by: "Par",
    related: "Besoin d’un projet digital premium ?",
    relatedButton: "Demander un devis",
  },
  EN: {
    eyebrow: "Blog",
    title: "Useful articles to better understand the web.",
    subtitle:
      "Discover our tips, trends and best practices to succeed in your digital presence.",
    searchPlaceholder: "Search articles",
    categoryAll: "All",
    categories: ["All", "Design", "Marketing", "Technology"],
    categoryLabels: {
      design: "Design",
      marketing: "Marketing",
      technology: "Technology",
    },
    loading: "Loading articles...",
    error: "API loading failed, displaying local content.",
    readMore: "Read more",
    backToBlog: "Back to blog",
    articleNotFoundTitle: "Article not found",
    articleNotFoundText:
      "The requested content does not exist or has been moved.",
    by: "By",
    related: "Need a premium digital project?",
    relatedButton: "Request a quote",
  },
};

export default function Blog({ initialArticles }) {
  const { language } = useSiteLanguage();
  const t = copy[language];
  const [activeCategory, setActiveCategory] = useState(t.categoryAll);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState(
    initialArticles || fallbackArticles || fallbackArticles,
  );
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(!initialArticles);

  useEffect(() => {
    setActiveCategory(t.categoryAll);
  }, [t.categoryAll]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const response = await fetch(`${API_BASE}/articles`);
        if (!response.ok) {
          throw new Error("Impossible de charger les articles.");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const articleCategory =
      t.categoryLabels?.[article.categoryKey] || article.category;
    const matchesCategory =
      activeCategory === t.categoryAll || articleCategory === activeCategory;
    const articleTitle =
      language === "EN" && article.titleEN ? article.titleEN : article.title;
    const articleSummary =
      language === "EN" && article.summaryEN
        ? article.summaryEN
        : article.summary;
    const matchesSearch =
      articleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      articleSummary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <>
        <Head>
          <title>CamTech | Blog</title>
          <meta name="description" content={t.subtitle} />
        </Head>
        <Header />
        <main className="container section">
          <h1>{t.loading}</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>CamTech | Blog</title>
        <meta name="description" content={t.subtitle} />
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
          <div className="container">
            <div className="blog-toolbar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="categories">
                {t.categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`category-pill ${activeCategory === category ? "active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {hasError && <p className="form-error">{t.error}</p>}

            <div className="grid-3">
              {filteredArticles.map((article) => {
                const articleCategory =
                  t.categoryLabels[article.categoryKey] || article.category;
                const articleTitle =
                  language === "EN" && article.titleEN
                    ? article.titleEN
                    : article.title;
                const articleSummary =
                  language === "EN" && article.summaryEN
                    ? article.summaryEN
                    : article.summary;
                return (
                  <article className="card blog-card" key={article.slug}>
                    <div className="blog-card__top">
                      <span className="eyebrow">{articleCategory}</span>
                      <h3>{articleTitle}</h3>
                    </div>
                    <p className="meta">
                      {t.by} {article.author} · {article.date}
                    </p>
                    <p>{articleSummary}</p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="btn btn-primary"
                    >
                      {t.readMore}
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      initialArticles: fallbackArticles,
    },
  };
}
