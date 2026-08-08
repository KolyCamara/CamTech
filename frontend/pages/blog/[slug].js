import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSiteLanguage } from "../../hooks/useSiteLanguage";
import { articles as fallbackArticles } from "../../data/articles";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

const content = {
  FR: {
    loading: "Chargement de l'article...",
    notFoundTitle: "Article introuvable",
    notFoundText: "Le contenu demandé n’existe pas ou a été déplacé.",
    backToBlog: "Retour au blog",
    categoryLabels: {
      design: "Design",
      marketing: "Marketing",
      technology: "Technologie",
    },
    premiumTitle: "Besoin d’un projet digital premium ?",
    premiumText:
      "CamTech conçoit des solutions modernes pour accélérer votre croissance.",
    premiumButton: "Demander un devis",
    attentionHeading: "À retenir",
    by: "Par",
  },
  EN: {
    loading: "Loading article...",
    notFoundTitle: "Article not found",
    notFoundText: "The requested content does not exist or has been moved.",
    backToBlog: "Back to blog",
    categoryLabels: {
      design: "Design",
      marketing: "Marketing",
      technology: "Technology",
    },
    premiumTitle: "Need a premium digital project?",
    premiumText: "CamTech designs modern solutions to accelerate your growth.",
    premiumButton: "Request a quote",
    attentionHeading: "Key takeaways",
    by: "By",
  },
};

export default function ArticleDetail({ initialArticle }) {
  const { language } = useSiteLanguage();
  const t = content[language];
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
          throw new Error(t.notFoundText);
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
          setError(t.notFoundText);
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
          <title>CamTech | {t.loading}</title>
        </Head>
        <Header />
        <main className="container section">
          <h1>{t.loading}</h1>
        </main>
        <Footer />
      </>
    );
  }

  if (!article || error) {
    return (
      <>
        <Head>
          <title>CamTech | {t.notFoundTitle}</title>
        </Head>
        <Header />
        <main className="container section">
          <h1>{t.notFoundTitle}</h1>
          <p>{t.notFoundText}</p>
          <Link href="/blog" className="btn btn-primary">
            {t.backToBlog || "Back to blog"}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const articleTitle =
    language === "EN" && article.titleEN ? article.titleEN : article.title;
  const articleSummary =
    language === "EN" && article.summaryEN
      ? article.summaryEN
      : article.summary;
  const articleHighlight =
    language === "EN" && article.highlightEN
      ? article.highlightEN
      : article.highlight;
  const articleContent =
    language === "EN" && article.contentEN
      ? article.contentEN
      : article.content;
  const articleBullets =
    language === "EN" && article.bulletsEN
      ? article.bulletsEN
      : article.bullets;

  const articleCategory =
    t.categoryLabels?.[article.categoryKey] || article.category;

  return (
    <>
      <Head>
        <title>{`CamTech | ${articleTitle}`}</title>
        <meta name="description" content={articleSummary} />
      </Head>
      <Header />
      <main>
        <section className="page-header article-hero">
          <div className="container article-hero__content">
            <p className="eyebrow">{articleCategory}</p>
            <h1 className="page-title">{articleTitle}</h1>
            <p className="page-subtitle">{articleHighlight}</p>
            <p className="article-meta">
              {t.by} {article.author} · {article.date}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container article-layout">
            <article className="article-card">
              <img
                src={article.image}
                alt={articleTitle}
                className="article-image"
              />
              {articleContent.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="article-points">
                <h3>{t.attentionHeading}</h3>
                <ul>
                  {articleBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>

            <aside className="article-sidebar">
              <div className="card premium-card">
                <h3>{t.premiumTitle}</h3>
                <p>{t.premiumText}</p>
                <Link href="/contact" className="btn btn-primary">
                  {t.premiumButton}
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
