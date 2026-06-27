"use client";

import { getBlogPost, type BlogPost } from "@/lib/api";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import { Lora } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const builder = createImageUrlBuilder({ projectId, dataset });
// urlFor: pass a Sanity image object (with .asset ref), returns an optimised URL
const urlFor = (source: any) => builder.image(source).auto("format").url();

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-reading",
  display: "swap",
});

// ─── Portable Text Components ───────────────────────────────────────────────

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const codeBlockStyle: React.CSSProperties = {
  margin: "1.5em 0",
  padding: "22px",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
  border: "1px solid rgba(37,99,235,0.25)",
  overflowX: "auto",
  whiteSpace: "pre",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: "0.9em",
  lineHeight: 1.6,
  color: "#ffffff",
  boxShadow:
    "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const makePortableTextComponents = (
  onLightbox: (src: string) => void,
): PortableTextComponents => ({
  // ── Block types ──────────────────────────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p
        style={{
          fontFamily: "var(--font-reading), Georgia, 'Times New Roman', serif",
          marginBottom: "1em",
          lineHeight: 1.65,
          letterSpacing: "0.01em",
          color: "rgba(255,255,255,0.92)",
          fontWeight: 400,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </p>
    ),
    h1: ({ children, value }) => (
      <h1
        id={slugify(value?.children?.[0]?.text ?? "")}
        style={{
          fontFamily:
            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
          fontSize: "clamp(36px, 4vw, 46px)",
          fontWeight: 700,
          color: "#ffffff",
          marginTop: "2em",
          marginBottom: "0.35em",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          position: "relative",
          paddingLeft: "20px",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "0.3em",
            width: "4px",
            height: "0.8em",
            background:
              "linear-gradient(180deg, #2563EB 0%, rgba(37,99,235,0.3) 100%)",
            borderRadius: "2px",
          }}
        />
        {children}
      </h1>
    ),
    h2: ({ children, value }) => (
      <h2
        id={slugify(value?.children?.[0]?.text ?? "")}
        style={{
          fontFamily:
            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
          fontSize: "clamp(28px, 3.5vw, 36px)",
          fontWeight: 700,
          color: "#ffffff",
          marginTop: "1.75em",
          marginBottom: "0.35em",
          lineHeight: 1.3,
          letterSpacing: "-0.015em",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(value?.children?.[0]?.text ?? "")}
        style={{
          fontFamily:
            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
          fontSize: "clamp(22px, 2.8vw, 26px)",
          fontWeight: 600,
          color: "#ffffff",
          marginTop: "1.25em",
          marginBottom: "0.35em",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontFamily:
            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
          fontSize: "clamp(18px, 2.2vw, 22px)",
          fontWeight: 600,
          color: "#ffffff",
          marginTop: "1em",
          marginBottom: "0.3em",
          lineHeight: 1.4,
        }}
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: "1.25em 0",
          padding: "0.75em 1.25em",
          borderLeft: "3px solid rgba(37,99,235,0.5)",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "0 12px 12px 0",
          color: "rgba(255,255,255,0.88)",
          fontStyle: "italic",
          lineHeight: 1.65,
        }}
      >
        {children}
      </blockquote>
    ),
  },

  // ── Inline marks ─────────────────────────────────────────────────────────
  marks: {
    strong: ({ children }) => (
      <strong style={{ color: "#ffffff", fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ color: "rgba(255,255,255,0.88)", fontStyle: "italic" }}>
        {children}
      </em>
    ),
    underline: ({ children }) => (
      <span style={{ textDecoration: "underline" }}>{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span style={{ textDecoration: "line-through", opacity: 0.7 }}>
        {children}
      </span>
    ),
    code: ({ children }) => (
      <code
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "6px",
          padding: "2px 6px",
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: "0.9em",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        style={{
          color: "#3B82F6",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
          textDecorationColor: "rgba(59,130,246,0.4)",
          transition: "color 0.2s ease, text-decoration-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#60A5FA";
          e.currentTarget.style.textDecorationColor = "rgba(96,165,250,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#3B82F6";
          e.currentTarget.style.textDecorationColor = "rgba(59,130,246,0.4)";
        }}
      >
        {children}
      </a>
    ),
  },

  // ── List types ────────────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          margin: "0.75em 0",
          paddingLeft: "0",
          listStyle: "none",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          margin: "0.75em 0",
          paddingLeft: "1.5em",
          color: "rgba(255,255,255,0.92)",
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        style={{
          fontFamily: "var(--font-reading), Georgia, 'Times New Roman', serif",
          marginBottom: "0.4em",
          paddingLeft: "24px",
          position: "relative",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.92)",
          fontWeight: 400,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "4px",
            top: "0.65em",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#2563EB",
            boxShadow: "0 0 8px rgba(37,99,235,0.5)",
          }}
        />
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        style={{
          fontFamily: "var(--font-reading), Georgia, 'Times New Roman', serif",
          marginBottom: "0.4em",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.92)",
          fontWeight: 400,
        }}
      >
        {children}
      </li>
    ),
  },

  // ── Custom block types (code blocks, images, etc.) ────────────────────────
  types: {
    // Sanity code block (requires @sanity/code-input or similar schema)
    code: ({ value }) => (
      <div style={{ position: "relative", margin: "1.5em 0" }}>
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(value?.code ?? "");
            const btn = e.currentTarget;
            const orig = btn.innerText;
            btn.innerText = "Copied!";
            setTimeout(() => (btn.innerText = orig), 1200);
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 600,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          Copy
        </button>
        {value?.language && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "4px 8px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#2563EB",
              background: "rgba(37,99,235,0.10)",
              border: "1px solid rgba(37,99,235,0.25)",
              zIndex: 1,
            }}
          >
            {value.language}
          </span>
        )}
        <pre
          style={{
            ...codeBlockStyle,
            paddingTop: value?.language ? "44px" : "22px",
          }}
        >
          <code>{value?.code}</code>
        </pre>
      </div>
    ),

    // Sanity image block
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value);
      const alt = value.alt ?? "";
      return (
        <figure style={{ margin: "2em 0", textAlign: "center" }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              cursor: "zoom-in",
            }}
            onClick={() => onLightbox(src)}
          />
          {alt && (
            <figcaption
              style={{
                marginTop: "10px",
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "-0.005em",
              }}
            >
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const MIN_UPDATE_DIFF_MS = 24 * 60 * 60 * 1000;

const hasBeenUpdated = (publishedAt?: string, updatedAt?: string) => {
  if (!publishedAt || !updatedAt) return false;
  const pub = new Date(publishedAt).getTime();
  const upd = new Date(updatedAt).getTime();
  if (Number.isNaN(pub) || Number.isNaN(upd)) return false;
  return upd - pub >= MIN_UPDATE_DIFF_MS;
};

// Extract h2/h3 headings from Portable Text for the TOC
const extractTocItems = (content: any[]) => {
  if (!Array.isArray(content)) return [];
  return content
    .filter(
      (block) => block._type === "block" && ["h2", "h3"].includes(block.style),
    )
    .map((block) => {
      const text = block.children?.map((c: any) => c.text).join("") ?? "";
      return { id: slugify(text), text, level: block.style === "h2" ? 2 : 3 };
    });
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.id as string;

  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState("");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Stable reference so PortableText components don't re-create on every render
  const ptComponents = makePortableTextComponents(setLightboxSrc);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const progress =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const fetched = await getBlogPost(slug);
        setPost(fetched);
      } catch (err) {
        console.error("Error loading blog post:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              b.target.getBoundingClientRect().top -
              a.target.getBoundingClientRect().top,
          );
        if (visible.length > 0 && visible[0].target.id) {
          setCurrentSection((prev) =>
            prev !== visible[0].target.id ? visible[0].target.id : prev,
          );
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 1] },
    );
    document
      .querySelectorAll("h2[id], h3[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post?.slug]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(100px, 12vw, 140px)",
          background: "#020617",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "3px solid rgba(37,99,235,0.3)",
            borderTopColor: "#2563EB",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  // ── 404 ───────────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <section
        style={{
          minHeight: "100vh",
          paddingTop: "clamp(100px, 12vw, 140px)",
          background: "#020617",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Post Not <span style={{ color: "#2563EB" }}>Found</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 500,
              textDecoration: "none",
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              color: "#ffffff",
            }}
          >
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const tocItems = extractTocItems(post.content);

  const siteBase =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "";
  const shareUrl = `${siteBase}/blog/${post.slug}`;
  const xText = `${post.title ?? ""}${post.excerpt ? ` – ${post.excerpt}` : ""}`;
  const shareToX = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(xText.length > 256 ? `${xText.slice(0, 253)}…` : xText)}`;
  const shareToLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <article
      className={lora.variable}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "clamp(100px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
        overflow: "visible",
      }}
    >
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "rgba(37,99,235,0.2)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
            transition: "width 0.1s ease",
            boxShadow: "0 0 10px rgba(37,99,235,0.5)",
          }}
        />
      </div>

      {/* Background Effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #2563EB 50%, transparent 100%)",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            filter: "blur(120px)",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.02,
            backgroundImage: `linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div
        className="blog-page-container"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Back Button */}
        <div
          className="blog-back-wrap"
          style={{
            marginBottom: "48px",
            transition: "all 1s ease",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-20px)",
          }}
        >
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "12px",
              fontFamily:
                "var(--font-satoshi), system-ui, -apple-system, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#2563EB";
              e.currentTarget.style.gap = "14px";
              e.currentTarget.style.background = "rgba(37,99,235,0.1)";
              e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.gap = "10px";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Layout */}
        <div className="article-layout">
          {/* Mobile TOC */}
          {tocItems.length > 0 && (
            <div className="toc-mobile">
              <div className="toc-mobile-inner">
                <div className="toc-mobile-label">
                  <span className="toc-label-accent" />
                  On this page
                </div>
                <nav
                  className="toc-mobile-links"
                  aria-label="Table of contents"
                >
                  {tocItems.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className={`toc-mobile-link ${t.level === 3 ? "toc-link--sub" : ""} ${currentSection === t.id ? "toc-link--active" : ""}`}
                    >
                      {t.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Desktop TOC */}
          {tocItems.length > 0 && (
            <aside className="toc">
              <div className="toc-inner">
                <div className="toc-label">
                  <span className="toc-label-accent" />
                  On this page
                </div>
                <nav className="toc-links" aria-label="Table of contents">
                  {tocItems.map((t) => (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className={`toc-link ${t.level === 3 ? "toc-link--sub" : ""} ${currentSection === t.id ? "toc-link--active" : ""}`}
                    >
                      {t.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <div className="article-content">
            {/* Article Header */}
            <header
              className="blog-article-header"
              style={{
                marginBottom: "64px",
                paddingBottom: "48px",
                borderBottom: "1px solid rgba(37,99,235,0.2)",
                transition: "all 1s ease 0.2s",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
              }}
            >
              {/* Category Badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "24px",
                }}
              >
                {(Array.isArray(post.category)
                  ? post.category
                  : post.category
                    ? [post.category]
                    : []
                )
                  .filter(Boolean)
                  .map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 18px",
                        borderRadius: "9999px",
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        background: "rgba(37,99,235,0.15)",
                        color: "#2563EB",
                        border: "1px solid rgba(37,99,235,0.25)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#2563EB",
                          boxShadow: "0 0 8px rgba(37,99,235,0.6)",
                        }}
                      />
                      {cat}
                    </div>
                  ))}
              </div>

              {/* Title */}
              <h1
                className="blog-post-title"
                style={{
                  fontFamily:
                    "var(--font-reading), Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(40px, 6vw, 64px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "32px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p
                  className="blog-post-excerpt"
                  style={{
                    fontFamily:
                      "var(--font-reading), Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(18px, 2.2vw, 20px)",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.88)",
                    marginBottom: "32px",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                  }}
                >
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  flexWrap: "wrap",
                  padding: "24px",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Author */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#ffffff",
                      boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
                    }}
                  >
                    AS
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "2px",
                      }}
                    >
                      Written by
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      {post.author || "AbdulRazaq Suleiman"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />

                {/* Published */}
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "2px",
                    }}
                  >
                    Published
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {formatDate(post.publishedAt)}
                  </div>
                </div>

                {hasBeenUpdated(post.publishedAt, post.updatedAt) && (
                  <>
                    <div
                      style={{
                        width: "1px",
                        height: "32px",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily:
                            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.4)",
                          marginBottom: "2px",
                        }}
                      >
                        Updated
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {formatDate(post.updatedAt!)}
                      </div>
                    </div>
                  </>
                )}

                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "rgba(255,255,255,0.1)",
                  }}
                />

                {/* Read time */}
                <div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "2px",
                    }}
                  >
                    Reading time
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {post.readTime || "5 min read"}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "32px",
                  }}
                >
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "10px",
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.7)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(37,99,235,0.15)";
                        e.currentTarget.style.borderColor =
                          "rgba(37,99,235,0.3)";
                        e.currentTarget.style.color = "#2563EB";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* ── Cover / Hero Image ── */}
            {post.mainImage && (
              <div
                style={{
                  marginBottom: "64px",
                  transition: "all 1s ease 0.3s",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                <figure style={{ margin: 0 }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(37,99,235,0.1)",
                      cursor: "zoom-in",
                    }}
                    onClick={() => setLightboxSrc(post.mainImage!)}
                  >
                    <img
                      src={post.mainImage}
                      alt={post.mainImageAlt ?? post.title ?? ""}
                      loading="eager"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "560px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "80px",
                        background:
                          "linear-gradient(to bottom, transparent, rgba(2,6,23,0.4))",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  {post.mainImageAlt && (
                    <figcaption
                      style={{
                        marginTop: "12px",
                        textAlign: "center",
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "-0.005em",
                        fontStyle: "italic",
                      }}
                    >
                      {post.mainImageAlt}
                    </figcaption>
                  )}
                </figure>
              </div>
            )}

            {/* ── Article Body — rendered via PortableText ── */}
            <div
              style={{
                transition: "all 1s ease 0.4s",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div
                className="blog-prose"
                style={{
                  fontFamily:
                    "var(--font-reading), Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(18px, 2vw, 20px)",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.92)",
                  letterSpacing: "0.01em",
                  fontWeight: 400,
                  maxWidth: "75ch",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {Array.isArray(post.content) && post.content.length > 0 ? (
                  <PortableText
                    value={post.content}
                    components={ptComponents}
                  />
                ) : (
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontStyle: "italic",
                    }}
                  >
                    No content available.
                  </p>
                )}
              </div>
            </div>

            {/* Article Footer */}
            <footer
              style={{
                marginTop: "80px",
                paddingTop: "48px",
                borderTop: "1px solid rgba(37,99,235,0.2)",
                transition: "all 1s ease 0.6s",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }}
              >
                {/* Share */}
                <div>
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "20px",
                    }}
                  >
                    Share this article
                  </h3>
                  <div
                    style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                  >
                    {[
                      {
                        name: "X",
                        icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                        href: shareToX,
                      },
                      {
                        name: "LinkedIn",
                        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                        href: shareToLinkedIn,
                      },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "44px",
                          height: "44px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(255,255,255,0.6)",
                          transition: "all 0.3s ease",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(37,99,235,0.15)";
                          e.currentTarget.style.borderColor =
                            "rgba(37,99,235,0.3)";
                          e.currentTarget.style.color = "#2563EB";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.08)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                        aria-label={`Share on ${social.name}`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Back to Blog CTA */}
                <div
                  style={{
                    padding: "32px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.02) 100%)",
                    border: "1px solid rgba(37,99,235,0.2)",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "16px",
                    }}
                  >
                    Enjoyed this article?
                  </h3>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: "24px",
                      lineHeight: 1.7,
                    }}
                  >
                    Explore more security articles and case studies.
                  </p>
                  <Link
                    href="/blog"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 28px",
                      borderRadius: "12px",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      background:
                        "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                      boxShadow:
                        "0 4px 24px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                      color: "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 30px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 24px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
                    }}
                  >
                    <span>View All Articles</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <img
            src={lightboxSrc}
            alt=""
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        .blog-page-container {
          padding: 0 clamp(14px, 4vw, 24px);
        }
        .article-layout {
          display: block;
        }

        .toc-label-accent {
          display: inline-block;
          width: 3px;
          height: 14px;
          border-radius: 2px;
          background: linear-gradient(
            180deg,
            #2563eb 0%,
            rgba(37, 99, 235, 0.5) 100%
          );
          margin-right: 10px;
          vertical-align: middle;
        }

        /* Mobile TOC */
        .toc-mobile {
          display: block;
          margin-bottom: 28px;
        }
        .toc-mobile-inner {
          padding: 20px 18px;
          border-radius: 16px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(255, 255, 255, 0.01) 50%,
            rgba(0, 0, 0, 0.02) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
          position: relative;
          overflow: hidden;
        }
        .toc-mobile-inner::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(37, 99, 235, 0.4) 50%,
            transparent 100%
          );
        }
        .toc-mobile-label {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }
        .toc-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toc-mobile-link {
          display: block;
          padding: 12px 14px 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          transition:
            color 0.25s,
            background 0.25s,
            border-color 0.25s;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          background: transparent;
          border-left: 3px solid transparent;
        }
        .toc-mobile-link:hover {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.04);
        }
        .toc-mobile-link.toc-link--active {
          color: #fff;
          background: linear-gradient(
            90deg,
            rgba(37, 99, 235, 0.15) 0%,
            rgba(37, 99, 235, 0.05) 100%
          );
          border-left-color: #2563eb;
        }
        .toc-mobile-link.toc-link--sub {
          padding-left: 28px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
        }
        .toc-mobile-link.toc-link--sub.toc-link--active {
          color: rgba(255, 255, 255, 0.95);
        }

        /* Desktop TOC */
        .toc {
          display: none;
        }
        .toc-inner {
          padding: 20px 16px;
          border-radius: 18px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(255, 255, 255, 0.01) 50%,
            rgba(0, 0, 0, 0.02) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
          position: relative;
          overflow: hidden;
        }
        .toc-inner::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(37, 99, 235, 0.4) 50%,
            transparent 100%
          );
        }
        .toc-label {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 14px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }
        .toc-links {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .toc-link {
          display: block;
          padding: 10px 12px 10px 14px;
          border-radius: 12px;
          text-decoration: none;
          transition:
            color 0.25s,
            background 0.25s,
            border-color 0.25s,
            padding-left 0.22s;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          background: transparent;
          border-left: 3px solid transparent;
        }
        .toc-link:hover {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.04);
          padding-left: 18px;
        }
        .toc-link.toc-link--active {
          color: #fff;
          background: linear-gradient(
            90deg,
            rgba(37, 99, 235, 0.15) 0%,
            rgba(37, 99, 235, 0.05) 100%
          );
          border-left-color: #2563eb;
        }
        .toc-link.toc-link--sub {
          padding-left: 24px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.65);
        }
        .toc-link.toc-link--sub:hover {
          padding-left: 28px;
        }
        .toc-link.toc-link--sub.toc-link--active {
          color: rgba(255, 255, 255, 0.95);
        }

        @media (min-width: 1024px) {
          .article-layout {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 40px;
          }
          .toc-mobile {
            display: none;
          }
          .toc {
            display: block;
            position: sticky;
            align-self: start;
            top: clamp(88px, 10vw, 120px);
            max-height: calc(100vh - 160px);
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Prose utilities */
        .blog-prose > *:first-child {
          margin-top: 0;
        }
        .blog-prose > *:last-child {
          margin-bottom: 0;
        }
        .blog-prose {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .blog-prose pre {
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .blog-prose img {
          max-width: 100%;
          height: auto;
        }

        /* Mobile overrides */
        @media (max-width: 767px) {
          .blog-back-wrap {
            margin-bottom: 32px !important;
          }
          .article-content {
            padding: 0 16px;
          }
          .blog-article-header {
            margin-bottom: 40px !important;
            padding-bottom: 32px !important;
          }
          .blog-post-title {
            font-size: clamp(26px, 7vw, 36px) !important;
            margin-bottom: 20px !important;
            word-wrap: break-word;
          }
          .blog-post-excerpt {
            font-size: 17px !important;
            margin-bottom: 24px !important;
            word-wrap: break-word;
          }
          .blog-prose {
            font-size: 17px;
          }
          .toc-mobile-link {
            min-height: 44px;
            display: flex;
            align-items: center;
            -webkit-tap-highlight-color: rgba(37, 99, 235, 0.15);
          }
        }
        @media (max-width: 480px) {
          .article-content {
            padding: 0 14px;
          }
          .toc-mobile-inner {
            padding: 16px 14px;
          }
          .blog-post-title {
            font-size: clamp(22px, 6vw, 28px) !important;
          }
          .blog-post-excerpt {
            font-size: 16px !important;
          }
        }
      `}</style>
    </article>
  );
}
