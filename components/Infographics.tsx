"use client";

import { getInfographics, type Infographic } from "@/lib/api";
import { useEffect, useMemo, useRef, useState } from "react";

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 6;

export function Infographics() {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchInfographics() {
      setLoading(true);
      try {
        const data = await getInfographics();
        if (mounted) {
          setInfographics(data);
        }
      } catch (error) {
        console.error("Error loading infographics:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchInfographics();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [query]);

  const filteredInfographics = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      return infographics;
    }

    return infographics.filter((item) => {
      const searchableText = [item.title, item.summary, item.tags?.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }, [infographics, query]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => prev + LOAD_STEP);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredInfographics.length]);

  const visibleInfographics = filteredInfographics.slice(0, visibleCount);

  return (
    <section
      className="page-section"
      style={{
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
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
            top: "12%",
            right: "12%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "8%",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
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
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
              Infographics
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "18px",
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: "#2563EB" }}>Application Security</span>{" "}
            Comics
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            A visual collection of security concepts, risk patterns, and
            practical engineering guidance.
          </p>
        </div>

        <div
          style={{
            marginBottom: "40px",
            maxWidth: "760px",
            marginInline: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "14px 18px",
            }}
          >
            <span style={{ color: "#94A3B8", fontSize: "18px" }}>🔎</span>
            <input
              type="search"
              placeholder="Search infographics by title, summary, or tags"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#F8FAFC",
                fontSize: "15px",
              }}
            />
          </div>
        </div>

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

        {!loading && (
          <>
            <style jsx>{`
              .infographic-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 28px;
              }
              @media (min-width: 768px) {
                .infographic-grid {
                  grid-template-columns: repeat(2, 1fr);
                }
              }
              @media (min-width: 1024px) {
                .infographic-grid {
                  grid-template-columns: repeat(3, 1fr);
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

            {filteredInfographics.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                No infographics match your search.
              </div>
            ) : (
              <div className="infographic-grid">
                {visibleInfographics.map((item) => (
                  <article
                    key={item._id}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "18px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ aspectRatio: "16 / 10", overflow: "hidden" }}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(15,23,42,0.95))",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ padding: "22px" }}>
                      <h3
                        style={{
                          color: "#ffffff",
                          fontSize: "22px",
                          marginBottom: "10px",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.72)",
                          fontSize: "15px",
                          lineHeight: 1.7,
                          marginBottom: "14px",
                        }}
                      >
                        {item.summary}
                      </p>
                      {item.tags?.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: "12px",
                                color: "#93C5FD",
                                background: "rgba(37,99,235,0.1)",
                                border: "1px solid rgba(37,99,235,0.18)",
                                borderRadius: "999px",
                                padding: "6px 10px",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div ref={sentinelRef} style={{ height: "1px" }} />
          </>
        )}
      </div>
    </section>
  );
}
