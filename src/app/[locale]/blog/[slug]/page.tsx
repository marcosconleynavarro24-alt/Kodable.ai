import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, localeHrefLang, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getPost, getRelated, blogSlugs, type BlogPost, type BlogBlock } from "@/content/blog";
import Icon from "@/components/Icon";
import FinalCta from "@/components/FinalCta";
import { breadcrumbList, jsonLdDoc, SITE_URL } from "@/lib/jsonld";

const COPY: Record<Locale, {
  home: string; blog: string; allArticles: string; takeaways: string;
  related: string; minRead: string; source: string; bylineBio: string;
}> = {
  en: {
    home: "Home", blog: "Blog", allArticles: "All articles", takeaways: "Key takeaways",
    related: "Keep reading", minRead: "min read", source: "Source:",
    bylineBio: "A small studio using AI to help local businesses get found, get booked, and win back their week.",
  },
  es: {
    home: "Inicio", blog: "Blog", allArticles: "Todos los artículos", takeaways: "Puntos clave",
    related: "Sigue leyendo", minRead: "min de lectura", source: "Fuente:",
    bylineBio: "Un pequeño estudio que usa IA para ayudar a negocios locales a que les encuentren, les reserven y recuperen su semana.",
  },
  fr: {
    home: "Accueil", blog: "Blog", allArticles: "Tous les articles", takeaways: "À retenir",
    related: "À lire ensuite", minRead: "min de lecture", source: "Source :",
    bylineBio: "Un petit studio qui utilise l'IA pour aider les commerces de proximité à être trouvés, réservés, et à récupérer leur semaine.",
  },
  de: {
    home: "Start", blog: "Blog", allArticles: "Alle Artikel", takeaways: "Das Wichtigste",
    related: "Weiterlesen", minRead: "Min. Lesezeit", source: "Quelle:",
    bylineBio: "Ein kleines Studio, das mit KI lokalen Unternehmen hilft, gefunden und gebucht zu werden und ihre Woche zurückzugewinnen.",
  },
  it: {
    home: "Home", blog: "Blog", allArticles: "Tutti gli articoli", takeaways: "In sintesi",
    related: "Continua a leggere", minRead: "min di lettura", source: "Fonte:",
    bylineBio: "Un piccolo studio che usa l'IA per aiutare le attività locali a farsi trovare, riempire l'agenda e riprendersi la settimana.",
  },
};

export async function generateStaticParams() {
  return locales.flatMap((l) => blogSlugs.map((slug) => ({ locale: l, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/${locale}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      publishedTime: post.datePublished,
      authors: [post.author],
    },
  };
}

function fmtDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeHrefLang[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Expand inline **bold** and [anchor](~/path) markup into React nodes. The ~/
// prefix becomes /<locale>/ so internal links stay on-locale.
function renderInline(text: string, locale: Locale): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      let href = m[2];
      href = href.startsWith("~/") ? `/${locale}/${href.slice(2)}` : href;
      const external = /^https?:\/\//.test(href);
      out.push(
        external ? (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">{m[1]}</a>
        ) : (
          <Link key={key++} href={href}>{m[1]}</Link>
        ),
      );
    } else {
      out.push(<strong key={key++}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({
  block,
  locale,
  isLead,
  ctaHref,
  ctaLabel,
  sourceLabel,
}: {
  block: BlogBlock;
  locale: Locale;
  isLead: boolean;
  ctaHref: string;
  ctaLabel: string;
  sourceLabel: string;
}) {
  switch (block.type) {
    case "p":
      return <p className={isLead ? "lead" : undefined}>{renderInline(block.text, locale)}</p>;
    case "h2":
      return <h2 id={slugifyHeading(block.text)}>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "list":
      return (
        <ul className="blog-list">
          {block.items.map((li, i) => (
            <li key={i}>
              <Icon name="check" />
              <span>{renderInline(li, locale)}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div className="blog-steps">
          {block.steps.map((s, i) => (
            <div className="step" key={i}>
              <span className="step-n">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{renderInline(s.body, locale)}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "callout":
      return (
        <div className="blog-callout">
          <span className="bc-ava" aria-hidden="true">
            <Icon name="spark" />
          </span>
          <div className="bc-bubble">
            <strong>{block.title}</strong>
            <p>{renderInline(block.body, locale)}</p>
          </div>
        </div>
      );
    case "stat":
      return (
        <div className="blog-stat">
          <div className="bs-value">{block.value}</div>
          <div className="bs-label">{renderInline(block.label, locale)}</div>
          {block.source ? <div className="bs-source">{sourceLabel} {block.source}</div> : null}
        </div>
      );
    case "quote":
      return (
        <blockquote className="blog-quote">
          <p>{renderInline(block.text, locale)}</p>
          {block.cite ? <cite>{block.cite}</cite> : null}
        </blockquote>
      );
    case "cta":
      return (
        <div className="post-cta">
          <h3>{block.title}</h3>
          <p>{renderInline(block.body, locale)}</p>
          <Link href={ctaHref} className="btn">
            {block.button || ctaLabel}
            <Icon name="arrow" />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const post = getPost(slug);
  if (!post) notFound();

  const c = COPY[locale];
  const site = getSite(locale);
  const related = getRelated(slug);
  const ctaHref = post.cta.service
    ? `/${locale}/services/${post.cta.service}`
    : `/${locale}/contact`;

  const firstParaIndex = post.body.findIndex((b) => b.type === "p");

  const jsonLd = jsonLdDoc(
    {
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/${locale}/blog/${post.slug}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.datePublished,
      inLanguage: locale,
      articleSection: post.category,
      keywords: post.keyword,
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post.slug}`,
      image: [`${SITE_URL}/opengraph-image`],
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    breadcrumbList([
      { name: c.home, path: `/${locale}` },
      { name: c.blog, path: `/${locale}/blog` },
      { name: post.title },
    ]),
  );

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{c.home}</Link>
            <span className="sep" aria-hidden="true">/</span>
            <Link href={`/${locale}/blog`}>{c.blog}</Link>
            <span className="sep" aria-hidden="true">/</span>
            <span>{post.title}</span>
          </nav>

          <span className="blog-cat">
            <Icon name={post.categoryIcon} />
            {post.category}
          </span>

          <h1 className="page-h" style={{ marginTop: "16px" }}>{post.title}</h1>
          <p className="page-sub">{post.dek}</p>

          <div className="post-meta" style={{ marginTop: "20px" }}>
            <span className="post-ava" aria-hidden="true">K</span>
            <span className="pm-author">{post.author}</span>
            <span className="sep" aria-hidden="true">·</span>
            <time dateTime={post.datePublished}>{fmtDate(post.datePublished, locale)}</time>
            <span className="sep" aria-hidden="true">·</span>
            <span>{post.readMinutes} {c.minRead}</span>
          </div>

          <div className="hero-cta">
            <Link href={ctaHref} className="btn btn-primary">
              {post.cta.label}
              <Icon name="arrow" />
            </Link>
            <Link href={`/${locale}/blog`} className="btn btn-ghost">{c.allArticles}</Link>
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "clamp(30px, 4vw, 48px)" }}>
        <div className="wrap-narrow">
          <div className="blog-body">
            {post.takeaways?.length ? (
              <div className="takeaways reveal">
                <h2>{c.takeaways}</h2>
                <ul>
                  {post.takeaways.map((t, i) => (
                    <li key={i}>
                      <Icon name="check" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {post.body.map((block, i) => (
              <Block
                key={i}
                block={block}
                locale={locale}
                isLead={i === firstParaIndex}
                ctaHref={ctaHref}
                ctaLabel={post.cta.label}
                sourceLabel={c.source}
              />
            ))}

            <div className="post-byline" style={{ marginTop: "44px" }}>
              <span className="post-ava" aria-hidden="true">K</span>
              <div>
                <div className="pb-name">{post.author}</div>
                <div className="pb-bio">{c.bylineBio}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="sec sec-warm">
          <div className="wrap">
            <div className="blog-related">
              <div className="sec-head">
                <span className="sec-kicker">
                  <Icon name="chat" />
                  {c.related}
                </span>
                <h2 className="sec-title">{c.related}</h2>
              </div>
              <div className="blog-grid">
                {related.map((p: BlogPost) => (
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
                        <span>{p.readMinutes} {c.minRead}</span>
                      </div>
                      <Link href={`/${locale}/blog/${p.slug}`} className="pc-more">
                        {c.related}
                        <Icon name="arrow" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
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
