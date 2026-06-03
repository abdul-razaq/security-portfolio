'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getBlogPosts, type BlogPost } from '@/lib/api';
import { portableTextToPlainText } from '@/lib/portableText';

const categories = ['All', 'Case Study', 'Tool Development', 'Exploitation', 'API Security', 'Methodology', 'Enumeration', 'Reconnaissance & Intelligence Gathering'];

export function Blog() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
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
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
            marginBottom: "80px",
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
            APIs & Web Application{" "}
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
            Insights, techniques, and case studies on web application offensive
            security, penetration testing methodologies, and vulnerability
            analysis of web applications and APIs.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex gap-3 mb-16 overflow-x-auto pb-2 -mx-1 px-1 sm:flex-wrap sm:justify-center sm:overflow-visible"
          style={{
            transition: "all 1s ease 0.2s",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="shrink-0"
              style={{
                padding: "10px 24px",
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
                gap: 28px;
              }
              @media (min-width: 768px) {
                .blog-grid {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
              @media (min-width: 1024px) {
                .blog-grid {
                  grid-template-columns: repeat(3, 1fr);
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
                    padding: "36px",
                    borderRadius: "24px",
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.6s ease ${index * 50}ms`,
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
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "inset 0 1px 0 rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = post.featured
                      ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                      : "inset 0 1px 0 rgba(255,255,255,0.02)";
                  }}
                >
                  {/* Featured Badge */}
                  {post.featured && (
                    <div
                      style={{
                        position: "absolute",
                        top: "24px",
                        right: "24px",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        background: "#2563EB",
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
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
                      marginBottom: "18px",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ whiteSpace: "nowrap" }}>
                      {formatDate(post.publishedAt)}
                    </span>
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
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "14px",
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
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.85,
                      marginBottom: "28px",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-word",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.6)",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            maxWidth: "100%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

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
