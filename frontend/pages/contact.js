import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSiteLanguage } from "../hooks/useSiteLanguage";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

const content = {
  FR: {
    title: "Parlons de votre prochain projet.",
    subtitle:
      "Expliquez votre besoin et nous vous repondrons avec une proposition claire.",
    meta: "Contactez CamTech pour concretiser votre projet digital.",
    info: "Informations",
    address: "Casablanca, Maroc",
    phone: "Telephone",
    response: "Reponse rapide",
    responseText: "Nous vous recontactons sous 24 heures.",
    advice: "Conseil personnalise",
    adviceText: "Une approche adaptee a votre objectif de croissance.",
    name: "Nom",
    namePlaceholder: "Votre nom",
    emailLabel: "Email",
    emailPlaceholder: "email@exemple.com",
    message: "Message",
    messagePlaceholder: "Decrivez votre projet",
    submit: "Envoyer",
    sending: "Envoi...",
    errorSend: "Impossible d'envoyer le message.",
    success: "Merci ! Votre demande a bien ete recue.",
  },
  EN: {
    title: "Let us talk about your next project.",
    subtitle: "Describe your needs and we will reply with a clear proposal.",
    meta: "Contact CamTech to bring your digital project to life.",
    info: "Information",
    address: "Casablanca, Morocco",
    phone: "Phone",
    response: "Quick reply",
    responseText: "We reply within 24 hours.",
    advice: "Personal guidance",
    adviceText: "An approach adapted to your growth goal.",
    name: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    message: "Message",
    messagePlaceholder: "Describe your project",
    submit: "Send",
    sending: "Sending...",
    errorSend: "Unable to send the message.",
    success: "Thank you! Your request has been received.",
  },
};

export default function Contact() {
  const { language } = useSiteLanguage();
  const t = content[language];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(t.errorSend);
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorSend);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <>
      <Head>
        <title>CamTech | Contact</title>
        <meta name="description" content={t.meta} />
      </Head>
      <Header />
      <main>
        <section className="page-header">
          <div className="container page-intro">
            <p className="eyebrow">Contact</p>
            <h1 className="page-title">{t.title}</h1>
            <p className="page-subtitle">{t.subtitle}</p>
          </div>
        </section>

        <section className="section contact-section">
          <div className="container grid-2 contact-grid">
            <aside className="contact-card">
              <h2>{t.info}</h2>
              <p>{t.address}</p>
              <p>{t.phone} : +212 05 55 12 34 56</p>
              <p>Email : contact@camtech.ma</p>
              <div className="contact-highlights">
                <div>
                  <h3>{t.response}</h3>
                  <p>{t.responseText}</p>
                </div>
                <div>
                  <h3>{t.advice}</h3>
                  <p>{t.adviceText}</p>
                </div>
              </div>
            </aside>

            <form className="contact-form form-card" onSubmit={handleSubmit}>
              <label>
                {t.name}{" "}
                <input
                  type="text"
                  name="name"
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                {t.emailLabel}{" "}
                <input
                  type="email"
                  name="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                {t.message}{" "}
                <textarea
                  name="message"
                  rows="6"
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? t.sending : t.submit}
              </button>
              {submitted && success && (
                <p className="form-success">{t.success}</p>
              )}
              {submitted && error && <p className="form-error">{error}</p>}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
