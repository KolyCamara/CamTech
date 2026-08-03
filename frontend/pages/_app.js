import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/global.css";
import "../css/header.css";
import "../css/footer.css";
import "../css/responsive.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const canonicalPath = router.asPath.split("?")[0];
  const canonicalUrl = `https://camtech.ma${canonicalPath === "/" ? "/" : canonicalPath}`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="CamTech conçoit des sites web, applications et automatisations IA performants pour les entreprises ambitieuses."
        />
        <meta name="theme-color" content="#0f172a" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CamTech" />
        <meta property="og:title" content="CamTech | Agence web premium" />
        <meta
          property="og:description"
          content="CamTech conçoit des sites web, applications et automatisations IA performants pour les entreprises ambitieuses."
        />
        <meta property="og:image" content="https://camtech.ma/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CamTech | Agence web premium" />
        <meta
          name="twitter:description"
          content="CamTech conçoit des sites web, applications et automatisations IA performants pour les entreprises ambitieuses."
        />
        <meta name="twitter:image" content="https://camtech.ma/og-image.svg" />
        <link rel="canonical" href={canonicalUrl} />
        <title>CamTech | Agence web premium</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
