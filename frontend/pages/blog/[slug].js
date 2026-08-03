import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { articles as fallbackArticles } from "../../data/articles";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export default function ArticleDetail({ initialArticle }) {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(initialArticle);
  const [loading, setLoading] = useState(!initialArticle);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialArticle || !slug) {
      return;
    }

    const slugValue = Array.isArray(slug) ? slug[0] : slug;

    async function loadArticle() {
      try {
        const response = await fetch(`${API_BASE}/articles/${slugValue}`);
        if (!response.ok) {
          throw new Error("Article introuvable");
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
        const fallback = fallbackArticles.find(
          (item) => item.slug === slugValue,
        );
        if (fallback) {
          setArticle(fallback);
        } else {
          setError("Article introuvable");
        }
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [initialArticle, slug]);

  if (loading) {
    return (
      <>
        <Head>
          <title>CamTech | Chargement...</title>
        </Head>
        <Header />
        <main className="container section">
          <h1>Chargement de l'article...</h1>
        </main>
        <Footer />
      </>
    );
  }

  if (!article || error) {
    return (
      <>
        <Head>
          <title>CamTech | Article introuvable</title>
        </Head>
        <Header />
        <main className="container section">
          <h1>Article introuvable</h1>
          <p>Le contenu demandé n’existe pas ou a été déplacé.</p>
          <Link href="/blog" className="btn btn-primary">
            Retour au blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`CamTech | ${article.title}`}</title>
        <meta name="description" content={article.summary} />
      </Head>
      <Header />
      <main>
        <section className="page-header article-hero">
          <div className="container article-hero__content">
            <p className="eyebrow">{article.category}</p>
            <h1 className="page-title">{article.title}</h1>
            <p className="page-subtitle">{article.highlight}</p>
            <p className="article-meta">
              Par {article.author} · {article.date}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container article-layout">
            <article className="article-card">
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="article-points">
                <h3>À retenir</h3>
                <ul>
                  {article.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="article-sidebar">
              <div className="card premium-card">
                <h3>Besoin d’un projet digital premium ?</h3>
                <p>
                  CamTech conçoit des solutions modernes pour accélérer votre
                  croissance.
                </p>
                <Link href="/contact" className="btn btn-primary">
                  Demander un devis
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = fallbackArticles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const initialArticle = fallbackArticles.find(
    (article) => article.slug === params.slug,
  );

  return {
    props: {
      initialArticle: initialArticle || null,
    },
  };
}
