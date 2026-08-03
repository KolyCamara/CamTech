import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { articles as fallbackArticles } from "../data/articles";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function Blog({ initialArticles }) {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState(
    initialArticles || fallbackArticles || fallbackArticles,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!initialArticles);

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
        setError(
          "Le chargement de l'API a échoué, affichage du contenu local.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "Tous" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <>
        <Head>
          <title>CamTech | Blog</title>
          <meta
            name="description"
            content="Nos derniers articles et conseils pour mieux comprendre le web."
          />
        </Head>
        <Header />
        <main className="container section">
          <h1>Chargement des articles...</h1>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>CamTech | Blog</title>
        <meta
          name="description"
          content="Nos derniers articles et conseils pour mieux comprendre le web."
        />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <div className="container page-intro">
            <p className="eyebrow">Blog</p>
            <h1 className="page-title">
              Des articles utiles pour mieux comprendre le web.
            </h1>
            <p className="page-subtitle">
              Découvrez nos conseils, tendances et bonnes pratiques pour réussir
              votre présence digitale.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="blog-toolbar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Rechercher un article"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              <div className="categories">
                {["Tous", "Design", "Marketing", "Technologie"].map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      className={`category-pill ${activeCategory === category ? "active" : ""}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="grid-3">
              {filteredArticles.map((article) => (
                <article className="card blog-card" key={article.slug}>
                  <div className="blog-card__top">
                    <span className="eyebrow">{article.category}</span>
                    <h3>{article.title}</h3>
                  </div>
                  <p className="meta">
                    Par {article.author} · {article.date}
                  </p>
                  <p>{article.summary}</p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="btn btn-primary"
                  >
                    Lire plus
                  </Link>
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

export async function getStaticProps() {
  return {
    props: {
      initialArticles: fallbackArticles,
    },
  };
}
