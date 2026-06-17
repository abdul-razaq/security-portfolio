"use client";

import { getInfographics, type Infographic } from "@/lib/api";
import { portableTextToPlainText } from "@/lib/portableText";
import { useEffect, useMemo, useRef, useState } from "react";

const comicFont =
  "'Trebuchet MS', 'Segoe UI', 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif";

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 6;
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

export function Infographics() {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const renderInlineText = (children: any[], markDefs: any[] = []) => {
    const defs = new Map((markDefs || []).map((def) => [def._key, def]));

    return children.map((child, index) => {
      const text = child.text || "";
      if (!text) return null;

      let content = <>{text}</>;

      if (child.marks?.includes("strong")) {
        content = <strong>{content}</strong>;
      }

      if (child.marks?.includes("em")) {
        content = <em>{content}</em>;
      }

      for (const mark of child.marks || []) {
        if (mark === "strong" || mark === "em") continue;
        const def = defs.get(mark);
        if (def?.href) {
          content = (
            <a
              href={def.href}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#93C5FD" }}
            >
              {content}
            </a>
          );
        }
      }

      return <span key={`${child.text || "text"}-${index}`}>{content}</span>;
    });
  };

  const renderSummary = (summary: any) => {
    if (typeof summary === "string") {
      return (
        <p
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
            lineHeight: 1.8,
            margin: "0 0 10px",
            whiteSpace: "pre-wrap",
            fontFamily: comicFont,
          }}
        >
          {summary}
        </p>
      );
    }

    if (!Array.isArray(summary) || summary.length === 0) {
      return null;
    }

    return summary.map((block, index) => {
      if (block._type !== "block" || !Array.isArray(block.children)) {
        return null;
      }

      const content = renderInlineText(block.children, block.markDefs);

      if (
        block.listItem === "bullet" ||
        block.listItem === "number" ||
        block.listItem === "ordered"
      ) {
        const ListTag = block.listItem === "bullet" ? "ul" : "ol";

        return (
          <ListTag
            key={`summary-list-${index}`}
            style={{
              margin: "0 0 12px 1.2rem",
              padding: 0,
              color: "rgba(255,255,255,0.94)",
              fontFamily: comicFont,
              lineHeight: 1.8,
            }}
          >
            <li
              style={{
                lineHeight: 1.8,
                fontSize: "clamp(0.98rem, 1.7vw, 1.08rem)",
                overflowWrap: "anywhere",
              }}
            >
              {content}
            </li>
          </ListTag>
        );
      }

      switch (block.style) {
        case "h1":
          return (
            <h1
              key={`summary-heading-${index}`}
              style={{
                color: "rgba(255,255,255,0.98)",
                fontSize: "clamp(1.7rem, 2.8vw, 2.2rem)",
                margin: "0 0 12px",
                fontFamily: comicFont,
                lineHeight: 1.2,
              }}
            >
              {content}
            </h1>
          );
        case "h2":
          return (
            <h2
              key={`summary-heading-${index}`}
              style={{
                color: "rgba(255,255,255,0.98)",
                fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                margin: "0 0 10px",
                fontFamily: comicFont,
                lineHeight: 1.3,
              }}
            >
              {content}
            </h2>
          );
        case "h3":
          return (
            <h3
              key={`summary-heading-${index}`}
              style={{
                color: "rgba(255,255,255,0.98)",
                fontSize: "1.05rem",
                margin: "0 0 8px",
                fontFamily: comicFont,
                lineHeight: 1.4,
              }}
            >
              {content}
            </h3>
          );
        case "blockquote":
          return (
            <blockquote
              key={`summary-blockquote-${index}`}
              style={{
                margin: "0 0 12px",
                padding: "10px 14px",
                borderLeft: "4px solid #60A5FA",
                borderRadius: "8px",
                background: "rgba(37,99,235,0.08)",
                color: "rgba(255,255,255,0.95)",
                fontFamily: comicFont,
                lineHeight: 1.7,
                fontSize: "clamp(0.98rem, 1.7vw, 1.08rem)",
              }}
            >
              {content}
            </blockquote>
          );
        default:
          return (
            <p
              key={`summary-paragraph-${index}`}
              style={{
                color: "rgba(255,255,255,0.96)",
                fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
                lineHeight: 1.8,
                margin: "0 0 12px",
                fontFamily: comicFont,
                textAlign: "left",
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {content}
            </p>
          );
      }
    });
  };

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
      const summaryText =
        typeof item.summary === "string"
          ? item.summary
          : portableTextToPlainText(item.summary);

      const searchableText = [item.title, summaryText, item.tags?.join(" ")]
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
        overflowX: "hidden",
        overflowY: "visible",
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
            width: "min(420px, 56vw)",
            height: "min(420px, 56vw)",
            maxWidth: "100%",
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
            width: "min(520px, 72vw)",
            height: "min(520px, 72vw)",
            maxWidth: "100%",
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
          width: "100%",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 clamp(16px, 3.5vw, 32px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 18px",
              borderRadius: "9999px",
              marginBottom: "24px",
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              maxWidth: "100%",
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
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "18px",
              lineHeight: 1.1,
              wordBreak: "break-word",
            }}
          >
            <span style={{ color: "#2563EB" }}>Application Security</span>{" "}
            Comics
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 20px)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "720px",
              margin: "0 auto",
              padding: "0 8px",
              lineHeight: 1.6,
            }}
          >
            A visual collection of security concepts, risk patterns, and
            practical secure design and engineering guidance.
          </p>
        </div>

        <div
          style={{
            marginBottom: "40px",
            maxWidth: "760px",
            marginInline: "auto",
            padding: "0 4px",
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
              padding: "14px 16px",
              width: "100%",
              boxSizing: "border-box",
              minWidth: 0,
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
                minWidth: 0,
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
              .infographic-stack {
                display: flex;
                flex-direction: column;
                gap: 56px;
              }
              @media (max-width: 768px) {
                .infographic-stack {
                  gap: 40px;
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
              <div className="infographic-stack">
                {visibleInfographics.map((item) => (
                  <article
                    key={item._id}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                      alignItems: "stretch",
                      overflow: "visible",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "920px",
                        margin: "0 auto",
                        padding: "0 clamp(12px, 3vw, 24px)",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          gap: "8px 12px",
                          flexWrap: "wrap",
                          marginBottom: "18px",
                        }}
                      >
                        <h3
                          style={{
                            color: "#ffffff",
                            fontSize: "clamp(22px, 3vw, 36px)",
                            margin: 0,
                            lineHeight: 1.2,
                            fontFamily: comicFont,
                            textAlign: "left",
                            width: "100%",
                          }}
                        >
                          {item.title}
                        </h3>
                        {item.publishedAt && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              flexWrap: "wrap",
                              alignSelf: "flex-start",
                            }}
                          >
                            <time
                              style={{
                                color: "rgba(255,255,255,0.55)",
                                fontSize: "13px",
                                fontFamily: comicFont,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {new Date(item.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </time>
                            {hasBeenUpdated(
                              item.publishedAt,
                              item.updatedAt,
                            ) && (
                              <>
                                <span
                                  style={{
                                    color: "rgba(255,255,255,0.32)",
                                    fontSize: "12px",
                                  }}
                                >
                                  •
                                </span>
                                <time
                                  style={{
                                    color: "rgba(96, 165, 250, 0.9)",
                                    fontSize: "12px",
                                    fontFamily: comicFont,
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Updated{" "}
                                  {new Date(item.updatedAt!).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </time>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        maxWidth: "1120px",
                        margin: "0 auto",
                        padding: "0 clamp(8px, 2vw, 18px)",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        onMouseEnter={() => setActiveImageId(item._id)}
                        onMouseLeave={() => setActiveImageId(null)}
                        onFocus={() => setActiveImageId(item._id)}
                        onBlur={() => setActiveImageId(null)}
                        onTouchStart={() => setActiveImageId(item._id)}
                        onTouchEnd={() => setActiveImageId(null)}
                        style={{
                          aspectRatio: "16 / 10",
                          overflow: "visible",
                          borderRadius: "18px",
                          background:
                            "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(15,23,42,0.95))",
                          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          minWidth: 0,
                          cursor: "zoom-in",
                          transition:
                            "transform 220ms ease, box-shadow 220ms ease",
                          transform:
                            activeImageId === item._id
                              ? "scale(1.03)"
                              : "scale(1)",
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              objectPosition: "center center",
                              display: "block",
                              background: "#0B1120",
                              maxWidth: "100%",
                              maxHeight: "100%",
                              transition: "transform 240ms ease",
                              transform:
                                activeImageId === item._id
                                  ? "scale(1.04)"
                                  : "scale(1)",
                              transformOrigin: "center center",
                            }}
                          />
                        ) : null}
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        maxWidth: "920px",
                        margin: "0 auto",
                        padding: "0 clamp(16px, 3vw, 24px) 36px",
                        overflow: "visible",
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ marginBottom: "14px", width: "100%" }}>
                        {renderSummary(item.summary)}
                      </div>

                      {item.tags?.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            alignItems: "center",
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
                                fontFamily: comicFont,
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
