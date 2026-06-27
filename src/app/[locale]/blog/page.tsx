import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localeHrefLang, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getPosts, type BlogPost } from "@/content/blog";
import Icon from "@/components/Icon";
import FinalCta from "@/components/FinalCta";
import { breadcrumbList, jsonLdDoc, SITE_URL } from "@/lib/jsonld";

const COPY: Record<Locale, {
  home: string; blog: string; kicker: string; title: string; dek: string;
  featured: string; latest: string; readMore: string; minRead: string;
  metaTitle: string; metaDesc: string;
}> = {
  en: {
    home: "Home", blog: "Blog", kicker: "Ideas & guides",
    title: "Plain-English ideas to get found, get booked, and win back your week.",
    dek: "Practical guides on AI, getting found locally, and the automations that quietly grow a small business — no jargon, no hype.",
    featured: "Start here", latest: "Latest articles", readMore: "Read article", minRead: "min read",
    metaTitle: "Blog — AI, local SEO & automation for small businesses",
    metaDesc: "Plain-English guides on AI agents, local SEO, website speed and automation for small local businesses. Practical, no jargon, no hype.",
  },
  es: {
    home: "Inicio", blog: "Blog", kicker: "Ideas y guías",
    title: "Ideas claras para que te encuentren, te reserven y recuperes tu semana.",
    dek: "Guías prácticas sobre IA, aparecer en tu zona y las automatizaciones que hacen crecer un pequeño negocio. Sin jerga, sin humo.",
    featured: "Empieza aquí", latest: "Últimos artículos", readMore: "Leer artículo", minRead: "min de lectura",
    metaTitle: "Blog — IA, SEO local y automatización para pequeños negocios",
    metaDesc: "Guías claras sobre agentes de IA, SEO local, velocidad web y automatización para pequeños negocios locales. Prácticas, sin jerga.",
  },
  fr: {
    home: "Accueil", blog: "Blog", kicker: "Idées et guides",
    title: "Des idées claires pour être trouvé, être réservé et récupérer votre semaine.",
    dek: "Des guides concrets sur l'IA, la visibilité locale et les automatisations qui font grandir un petit commerce. Sans jargon, sans esbroufe.",
    featured: "Commencez ici", latest: "Derniers articles", readMore: "Lire l'article", minRead: "min de lecture",
    metaTitle: "Blog — IA, SEO local et automatisation pour petits commerces",
    metaDesc: "Des guides clairs sur les agents IA, le SEO local, la vitesse des sites et l'automatisation pour les petits commerces. Concrets, sans jargon.",
  },
  de: {
    home: "Start", blog: "Blog", kicker: "Ideen & Leitfäden",
    title: "Klare Ideen, um gefunden und gebucht zu werden und deine Woche zurückzugewinnen.",
    dek: "Praktische Leitfäden zu KI, lokaler Sichtbarkeit und den Automatisierungen, die ein kleines Geschäft wachsen lassen. Kein Fachjargon, kein Hype.",
    featured: "Fang hier an", latest: "Neueste Artikel", readMore: "Artikel lesen", minRead: "Min. Lesezeit",
    metaTitle: "Blog — KI, lokales SEO & Automatisierung für kleine Unternehmen",
    metaDesc: "Klare Leitfäden zu KI-Agenten, lokalem SEO, Website-Tempo und Automatisierung für kleine lokale Unternehmen. Praktisch, kein Fachjargon.",
  },
  it: {
    home: "Home", blog: "Blog", kicker: "Idee e guide",
    title: "Idee chiare per farti trovare, riempire l'agenda e riprenderti la settimana.",
    dek: "Guide pratiche su IA, farsi trovare in zona e le automazioni che fanno crescere una piccola attività. Niente gergo, niente fumo.",
    featured: "Inizia da qui", latest: "Ultimi articoli", readMore: "Leggi l'articolo", minRead: "min di lettura",
    metaTitle: "Blog — IA, SEO locale e automazione per piccole attività",
    metaDesc: "Guide chiare su agenti IA, SEO locale, velocità dei siti e automazione per le piccole attività locali. Pratiche, senza gergo.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = COPY[locale];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: `/${locale}/blog` },
  };
}

function fmtDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeHrefLang[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

function Meta({ post, locale, c }: { post: BlogPost; locale: Locale; c: (typeof COPY)[Locale] }) {
  return (
    <div className="post-meta">
      <span className="post-ava" aria-hidden="true">K</span>
      <span className="pm-author">{post.author}</span>
      <span className="sep" aria-hidden="true">·</span>
      <time dateTime={post.datePublished}>{fmtDate(post.datePublished, locale)}</time>
      <span className="sep" aria-hidden="true">·</span>
      <span>{post.readMinutes} {c.minRead}</span>
    </div>
  );
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = COPY[locale];
  const site = getSite(locale);

  const all = getPosts();
  // Lead with the cornerstone guide if it exists, else the newest post.
  const featured =
    all.find((p) => p.slug === "ai-for-small-business-2026-guide") ?? all[0];
  const rest = featured ? all.filter((p) => p.slug !== featured.slug) : [];

  const jsonLd = jsonLdDoc(
    {
      "@type": "Blog",
      "@id": `${SITE_URL}/${locale}/blog#blog`,
      name: c.metaTitle,
      description: c.metaDesc,
      url: `${SITE_URL}/${locale}/blog`,
      inLanguage: locale,
      publisher: { "@id": `${SITE_URL}/#organization` },
      blogPost: all.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/${locale}/blog/${p.slug}`,
        datePublished: p.datePublished,
      })),
    },
    breadcrumbList([
      { name: c.home, path: `/${locale}` },
      { name: c.blog },
    ]),
  );

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{c.home}</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span>{c.blog}</span>
          </nav>
          <span className="sec-kicker">
            <Icon name="spark" />
            {c.kicker}
          </span>
          <h1 className="page-h">{c.title}</h1>
          <p className="page-sub">{c.dek}</p>
        </div>
      </section>

      {featured ? (
        <section className="sec" style={{ paddingTop: "clamp(28px, 3vw, 44px)" }}>
          <div className="wrap">
            <article className="blog-feature reveal">
              <div className="bf-body">
                <span className="blog-cat">
                  <Icon name={featured.categoryIcon} />
                  {featured.category}
                </span>
                <span className="blog-cat" style={{ background: "transparent", color: "var(--ink-mute)", paddingLeft: 0 }}>
                  {c.featured}
                </span>
                <h2>
                  <Link href={`/${locale}/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="bf-dek">{featured.dek}</p>
                <Meta post={featured} locale={locale} c={c} />
                <Link href={`/${locale}/blog/${featured.slug}`} className="btn btn-primary">
                  {c.readMore}
                  <Icon name="arrow" />
                </Link>
              </div>
              <div className="bf-visual" aria-hidden="true">
                <div className="bubble them b1">¿Estáis abiertos el domingo? 🙏</div>
                <div className="bubble you b2">Sí — domingos de 9:00 a 14:00. ¿Te reservo mesa?</div>
                <div className="bubble them b3">Para 4, a la 1 👌</div>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {rest.length ? (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head">
              <span className="sec-kicker">
                <Icon name="list" />
                {c.latest}
              </span>
              <h2 className="sec-title">{c.latest}</h2>
            </div>
            <div className="blog-grid">
              {rest.map((p) => (
                <article key={p.slug} className="post-card reveal">
                  <span className="blog-cat">
                    <Icon name={p.categoryIcon} />
                    {p.category}
                  </span>
                  <h3>
                    <Link href={`/${locale}/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="pc-dek">{p.dek}</p>
                  <div className="pc-foot">
                    <div className="post-meta">
                      <time dateTime={p.datePublished}>{fmtDate(p.datePublished, locale)}</time>
                      <span className="sep" aria-hidden="true">·</span>
                      <span>{p.readMinutes} {c.minRead}</span>
                    </div>
                    <Link href={`/${locale}/blog/${p.slug}`} className="pc-more">
                      {c.readMore}
                      <Icon name="arrow" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta finalCta={site.finalCta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
