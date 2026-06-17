"use client";

import { getBlogPosts, type BlogPost } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const categories = [
  "All",
  "AppSec Projects",
  "Case Study",
  "Methodology",
  "Threat Modeling",
  "Product Security",
  "API Security",
  "Secure SDLC",
  "DevSecOps",
  "Secure Code Review",
  "Tool Development",
  "Vulnerability Research",
  "Exploitation",
];

const formatKeywords = (text: string) => {
  const keywords = [
    {
      pattern:
        /(web application|API|penetration testing|vulnerability analysis|exploitation|reconnaissance|threat modeling|secure sdlc|devsecops|product security|offensive security|API security)/gi,
      style: { color: "#2563EB", fontWeight: 600 },
    },
    {
      pattern: /(critical|high|medium|low)/gi,
      style: { color: "#DC2626", fontWeight: 600 },
    },
  ];

  let parts: Array<
    string | { text: string; style: React.CSSProperties; key: number }
  > = [text];
  let keyCounter = 0;

  keywords.forEach(({ pattern, style }) => {
    const newParts: typeof parts = [];
    parts.forEach((part) => {
      if (typeof part === "string") {
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        const regex = new RegExp(pattern.source, pattern.flags);
        while ((match = regex.exec(part)) !== null) {
          if (match.index > lastIndex) {
            newParts.push(part.slice(lastIndex, match.index));
          }
          newParts.push({ text: match[0], style, key: keyCounter++ });
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < part.length) {
          newParts.push(part.slice(lastIndex));
        }
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return parts.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <span key={part.key} style={part.style}>
        {part.text}
      </span>
    ),
  );
};

export function Blog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const fetchedPosts = await getBlogPosts(selectedCategory);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const MIN_UPDATE_DIFFERENCE_MS = 24 * 60 * 60 * 1000;

  const hasBeenUpdated = (publishedAt?: string, updatedAt?: string) => {
    if (!publishedAt || !updatedAt) return false;

    const published = new Date(publishedAt).getTime();
    const updated = new Date(updatedAt).getTime();

    if (Number.isNaN(published) || Number.isNaN(updated)) {
      return false;
    }

    return updated - published >= MIN_UPDATE_DIFFERENCE_MS;
  };

  return (
    <section
      ref={sectionRef}
      className="page-section"
      style={{
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
      {/* Premium Background Effects */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Top border glow */}
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

        {/* Floating orbs */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "15%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />

        {/* Grid pattern */}
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
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--container-x)",
        }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
            transition: "all 1s ease",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 20px",
              borderRadius: "9999px",
              marginBottom: "24px",
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#2563EB",
              }}
            />
            <span
              style={{
                color: "#2563EB",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Blog & Insights
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "24px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontFamily:
                "var(--font-satoshi), system-ui, -apple-system, sans-serif",
              textRendering: "optimizeLegibility",
            }}
          >
            Application & API{" "}
            <span style={{ color: "#2563EB" }}>Security Insights</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 2.2vw, 22px)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: 1.75,
              letterSpacing: "-0.012em",
              fontFamily:
                "var(--font-satoshi), system-ui, -apple-system, sans-serif",
              fontWeight: 400,
              textRendering: "optimizeLegibility",
              fontFeatureSettings: "'kern' 1, 'liga' 1",
            }}
          >
            Insights, techniques, and case studies on{" "}
            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
              application security
            </span>
            ,{" "}
            <span style={{ color: "#2563EB", fontWeight: 600 }}>
              threat modeling
            </span>
            ,{" "}
            <span style={{ color: "#2563EB", fontWeight: 600 }}>
              secure SDLC
            </span>
            ,{" "}
            <span style={{ color: "#2563EB", fontWeight: 600 }}>
              penetration testing
            </span>
            , and{" "}
            <span style={{ color: "#2563EB", fontWeight: 600 }}>
              API security
            </span>
            .
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
          style={{
            marginBottom: "80px",
            transition: "all 1s ease 0.2s",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="shrink-0"
              style={{
                padding: "10px 20px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                background:
                  selectedCategory === category
                    ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
                    : "rgba(255,255,255,0.03)",
                border:
                  selectedCategory === category
                    ? "1px solid rgba(37,99,235,0.4)"
                    : "1px solid rgba(255,255,255,0.05)",
                color:
                  selectedCategory === category
                    ? "#ffffff"
                    : "rgba(255,255,255,0.6)",
                boxShadow:
                  selectedCategory === category
                    ? "0 4px 16px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
                  e.currentTarget.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div
              style={{
                display: "inline-block",
                width: "48px",
                height: "48px",
                border: "3px solid rgba(37,99,235,0.3)",
                borderTopColor: "#2563EB",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
          <>
            <style jsx>{`
              .blog-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 24px;
              }
              @media (min-width: 640px) {
                .blog-grid {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
              @media (min-width: 1024px) {
                .blog-grid {
                  grid-template-columns: repeat(3, 1fr);
                  gap: 28px;
                }
              }
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
            <div className="blog-grid">
              {posts.length === 0 && !loading && (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "80px 0",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <p style={{ fontSize: "18px", marginBottom: "16px" }}>
                    No blog posts found.
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}
                  >
                    Check back later for new articles.
                  </p>
                </div>
              )}
              {posts.map((post, index) => (
                <article
                  key={post._id}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  style={{
                    position: "relative",
                    padding: "32px",
                    borderRadius: "24px",
                    opacity: isVisible ? 1 : 0,
                    transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms`,
                    background: post.featured
                      ? "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.02) 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: post.featured
                      ? "1px solid rgba(37,99,235,0.25)"
                      : "1px solid rgba(255,255,255,0.05)",
                    boxShadow: post.featured
                      ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                      : "inset 0 1px 0 rgba(255,255,255,0.02)",
                    cursor: "pointer",
                    overflow: "hidden",
                    wordWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = post.featured
                      ? "0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
                      : "0 20px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = post.featured
                      ? "rgba(37,99,235,0.4)"
                      : "rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = post.featured
                      ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                      : "inset 0 1px 0 rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = post.featured
                      ? "1px solid rgba(37,99,235,0.25)"
                      : "1px solid rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Featured Badge */}
                  {post.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: "#2563EB",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        zIndex: 10,
                      }}
                    >
                      Featured
                    </div>
                  )}

                  {/* Category Badges */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "20px",
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
                            display: "inline-block",
                            padding: "6px 14px",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: 500,
                            background: "rgba(37,99,235,0.15)",
                            color: "#2563EB",
                            border: "1px solid rgba(37,99,235,0.2)",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={cat}
                        >
                          {cat}
                        </div>
                      ))}
                  </div>

                  {/* Date & Read Time */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ whiteSpace: "nowrap" }}>
                      {formatDate(post.publishedAt)}
                    </span>
                    {hasBeenUpdated(post.publishedAt, post.updatedAt) && (
                      <>
                        <span
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.2)",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ whiteSpace: "nowrap" }}>
                          Updated {formatDate(post.updatedAt!)}
                        </span>
                      </>
                    )}
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ whiteSpace: "nowrap" }}>
                      {post.readTime || "5 min read"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "12px",
                      lineHeight: 1.35,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.8,
                      marginBottom: "24px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {formatKeywords(post.excerpt)}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the article's onClick
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#2563EB",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      position: "relative",
                      zIndex: 10,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.gap = "14px";
                      e.currentTarget.style.color = "#3B82F6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.gap = "10px";
                      e.currentTarget.style.color = "#2563EB";
                    }}
                  >
                    <span>Read Article</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
