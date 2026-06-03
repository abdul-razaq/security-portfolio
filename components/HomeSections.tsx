"use client";

import {
  getEducation,
  getExperiences,
  getHomePageContent,
  type Certification,
  type Education,
  type Experience,
  type HomePageContent,
} from "@/lib/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ============================================
// ABOUT SECTION - Premium Redesign
// ============================================
const formatDescriptionKeywords = (text: string) => {
  const keywords = [
    {
      pattern: /(Application Security Engineer|defensive engineering)/gi,
      style: { color: "rgba(255,255,255,0.9)", fontWeight: 600 },
    },
    {
      pattern:
        /(Secure SDLC|Threat Modeling|Product Security|penetration testing|vulnerability research|security architecture)/gi,
      style: { color: "#2563EB", fontWeight: 600 },
    },
    {
      pattern: /(DevSecOps)/gi,
      style: { color: "#06B6D4", fontWeight: 600 },
    },
    {
      pattern: /(Offensive Security|attack simulation)/gi,
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

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getHomePageContent();
        setHomeContent(content);
      } catch (error) {
        console.error("Error loading home content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const aboutData = homeContent?.about;
  const defaultFeatures = [
    {
      icon: "🔒",
      title: "Secure SDLC",
      description:
        "Security embedded across design, build, and release with threat modeling early in the process",
    },
    {
      icon: "🎯",
      title: "Threat Modeling",
      description:
        "Systematic risk identification using STRIDE, DREAD, and LINDDUN for privacy-focused threat analysis",
    },
    {
      icon: "🛡️",
      title: "Product Security",
      description:
        "Protecting applications, APIs, and user data at scale with secure architecture",
    },
    {
      icon: "🔑",
      title: "API Security",
      description:
        "Securing APIs from design to production deployment with OAuth2, JWT, and OWASP API Top 10",
    },
    {
      icon: "⚙️",
      title: "DevSecOps",
      description:
        "Automated security gates in CI/CD pipelines with SAST, SCA, and DAST",
    },
    {
      icon: "🔴",
      title: "Offensive Security",
      description:
        "Penetration testing and attack simulation for web applications and APIs",
    },
    {
      icon: "📊",
      title: "SAST/SCA/DAST",
      description:
        "Static, Software Composition Analysis, and Dynamic Application Security Testing",
    },
    {
      icon: "🔍",
      title: "Secure Code Review",
      description:
        "Manual and automated code audits for vulnerabilities in web applications and APIs",
    },
    {
      icon: "🔬",
      title: "Vulnerability Research",
      description:
        "Deep diving to discover and exploit complex security flaws before adversaries",
    },
  ];
  // Always use complete defaultFeatures for full AppSec coverage
  const features = defaultFeatures;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "var(--section-y) 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
      <div style={{ position: "relative" }}>
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
              top: "80px",
              left: "40px",
              width: "288px",
              height: "288px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              right: "40px",
              width: "384px",
              height: "384px",
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
          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--section-header-gap)",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
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
                Application Security Engineer
              </span>
            </div>
            <h2
              style={{
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "24px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Application Security <br />
              <span style={{ position: "relative", display: "inline-block" }}>
                <span style={{ color: "#2563EB" }}>Engineer</span>
                <svg
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    width: "100%",
                    height: "8px",
                  }}
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M0 4C50 4 50 7 100 7C150 7 150 1 200 1"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div
            style={{
              maxWidth: "100%",
              margin: "0 auto",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.1s",
            }}
          >
            {/* Description */}
            <div style={{ marginBottom: "48px" }}>
              {aboutData?.description ? (
                <>
                  {aboutData.description
                    .split("\n")
                    .filter((p) => p.trim())
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        style={{
                          fontFamily:
                            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                          fontSize:
                            index === 0
                              ? "clamp(17px, 2.2vw, 22px)"
                              : "clamp(17px, 2.2vw, 22px)",
                          color:
                            index === 0
                              ? "rgba(255,255,255,0.65)"
                              : "rgba(255,255,255,0.6)",
                          lineHeight: 1.75,
                          textAlign: "center",
                          marginBottom: index === 0 ? "24px" : "0",
                          letterSpacing: "-0.012em",
                          fontWeight: 400,
                          textRendering: "optimizeLegibility",
                          fontFeatureSettings: "'kern' 1, 'liga' 1",
                        }}
                      >
                        {formatDescriptionKeywords(paragraph)}
                      </p>
                    ))}
                </>
              ) : (
                <>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "clamp(17px, 2.2vw, 22px)",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.75,
                      textAlign: "center",
                      marginBottom: "24px",
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                      textRendering: "optimizeLegibility",
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                    }}
                  >
                    {formatDescriptionKeywords(
                      "As an Application Security Engineer, I embed security across the full software lifecycle, from Secure SDLC and Threat Modeling to Product Security, DevSecOps, and hands-on Offensive Security.",
                    )}
                  </p>

                  <p
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "clamp(17px, 2.2vw, 22px)",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.75,
                      textAlign: "center",
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                      textRendering: "optimizeLegibility",
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                    }}
                  >
                    {formatDescriptionKeywords(
                      "I bridge defensive engineering with rigorous attack simulation, including penetration testing, vulnerability research, and security architecture, to validate controls, accelerate secure delivery, and find what automated tools miss before adversaries do.",
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Feature Cards */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              style={{ marginBottom: "48px" }}
            >
              {features.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "32px 24px",
                    borderRadius: "20px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.04) 100%)";
                    e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Icon Container */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      background:
                        "linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.06) 100%)",
                      border: "1px solid rgba(37,99,235,0.2)",
                    }}
                  >
                    <span style={{ fontSize: "28px", display: "block" }}>
                      {item.icon || "💼"}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      color: "#ffffff",
                      fontWeight: 600,
                      marginBottom: "8px",
                      fontSize: "17px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "14px",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.6,
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {item.description || ""}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <Link
                href="/about"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 44px",
                  borderRadius: "14px",
                  fontFamily:
                    "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  boxShadow:
                    "0 4px 24px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 30px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXPERIENCE TIMELINE - Premium Redesign
// ============================================

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const data = await getExperiences();
        console.log("Fetched experiences:", data);
        setExperiences(data || []);
      } catch (error) {
        console.error("Error loading experiences:", error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "var(--section-y) 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Premium Background */}
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
              top: "25%",
              right: 0,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 60%)",
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "25%",
              left: 0,
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 60%)",
              opacity: 0.6,
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
          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--section-header-gap)",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
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
                Professional Track Record
              </span>
            </div>
            <h2
              style={{
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textRendering: "optimizeLegibility",
              }}
            >
              Professional <span style={{ color: "#2563EB" }}>Experience</span>
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Center line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "1px",
                transform: "translateX(-50%)",
                display: "none",
                background:
                  "linear-gradient(to bottom, transparent, #2563EB 10%, #2563EB 90%, transparent)",
              }}
              className="hidden lg:block"
            />

            {/* Mobile line */}
            <div
              style={{
                position: "absolute",
                left: "32px",
                top: 0,
                bottom: 0,
                width: "1px",
                background:
                  "linear-gradient(to bottom, transparent, #2563EB 10%, #2563EB 90%, transparent)",
              }}
              className="lg:hidden"
            />

            <div
              style={{ display: "flex", flexDirection: "column", gap: "48px" }}
            >
              {loading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 0",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <p style={{ fontSize: "18px" }}>Loading experiences...</p>
                </div>
              )}
              {!loading && experiences.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 0",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <p style={{ fontSize: "18px", marginBottom: "16px" }}>
                    No experience entries found.
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}
                  >
                    <Link
                      href="/admin"
                      style={{ color: "#2563EB", textDecoration: "underline" }}
                    >
                      Add experience
                    </Link>{" "}
                    in the admin panel.
                  </p>
                </div>
              )}
              {!loading &&
                experiences.map((exp, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 0.6s ease ${index * 100}ms`,
                    }}
                  >
                    {/* Timeline node */}
                    <div
                      style={{
                        position: "absolute",
                        left: "32px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        background: exp.highlight ? "#2563EB" : "#0F172A",
                        border: "3px solid #2563EB",
                      }}
                      className="lg:left-1/2"
                    >
                      {exp.highlight && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            background: "#2563EB",
                            opacity: 0.3,
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        marginLeft: "64px",
                        width: "calc(100% - 64px)",
                      }}
                      className={`lg:ml-0 lg:w-[calc(50%-40px)] ${index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}
                    >
                      <div
                        style={{
                          padding: "32px",
                          borderRadius: "24px",
                          transition: "all 0.3s ease",
                          background: exp.highlight
                            ? "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.05) 100%)"
                            : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                          border: exp.highlight
                            ? "1px solid rgba(37,99,235,0.3)"
                            : "1px solid rgba(255,255,255,0.05)",
                          boxShadow: exp.highlight
                            ? "inset 0 1px 0 rgba(255,255,255,0.03)"
                            : "inset 0 1px 0 rgba(255,255,255,0.02)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        {/* Period badge */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "16px",
                          }}
                        >
                          <span
                            style={{
                              padding: "6px 16px",
                              borderRadius: "9999px",
                              fontSize: "14px",
                              fontWeight: 600,
                              background: "rgba(37,99,235,0.15)",
                              color: "#2563EB",
                            }}
                          >
                            {exp.period}
                          </span>
                          {exp.highlight && (
                            <span
                              style={{
                                padding: "4px 12px",
                                borderRadius: "9999px",
                                fontSize: "12px",
                                fontWeight: 500,
                                background: "#2563EB",
                                color: "#ffffff",
                              }}
                            >
                              Current
                            </span>
                          )}
                        </div>

                        <h3
                          style={{
                            fontFamily:
                              "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                            fontSize: "24px",
                            fontWeight: 700,
                            color: "#ffffff",
                            marginBottom: "8px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exp.title}
                        </h3>
                        <p
                          style={{
                            fontFamily:
                              "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                            color: "#2563EB",
                            fontWeight: 500,
                            marginBottom: "16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "16px",
                            letterSpacing: "0.01em",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {exp.company}
                        </p>
                        <p
                          style={{
                            fontFamily:
                              "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                            color: "rgba(255,255,255,0.7)",
                            lineHeight: 1.8,
                            marginBottom: "24px",
                            fontSize: "16px",
                            letterSpacing: "-0.01em",
                            fontWeight: 400,
                            textRendering: "optimizeLegibility",
                            fontFeatureSettings: "'kern' 1, 'liga' 1",
                          }}
                        >
                          {exp.description}
                        </p>

                        {/* Skills */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "8px",
                            }}
                          >
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  color: "rgba(255,255,255,0.7)",
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// EDUCATION & CERTIFICATIONS - Premium Redesign
// ============================================
const education = [
  {
    degree: "Master of Science in Cybersecurity",
    institution: "University of Technology",
    period: "2017 - 2019",
    description:
      "Specialized in offensive security and malware analysis. Graduated with distinction.",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    period: "2013 - 2017",
    description:
      "Focused on software engineering and network security fundamentals.",
    icon: "📚",
  },
];

const certifications = [
  {
    name: "OSCP",
    fullName: "Offensive Security Certified Professional",
    year: "2024",
    color: "#DC2626",
  },
];

export function EducationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchEducation() {
      try {
        const data = await getEducation();
        setEducation(data.education);
        setCertifications(data.certifications);
      } catch (error) {
        console.error("Error loading education:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEducation();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "var(--section-y) 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Premium Background */}
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
              inset: 0,
              opacity: 0.015,
              backgroundImage: `radial-gradient(rgba(37,99,235,0.8) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
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
          {/* Certifications */}
          <div
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <div style={{ marginBottom: "48px" }}>
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
                <span style={{ fontSize: "20px" }}>🏆</span>
                <span
                  style={{
                    color: "#2563EB",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Certifications
                </span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                Professional{" "}
                <span style={{ color: "#2563EB" }}>Credentials</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certifications.map((cert, index) => {
                const isOffensiveCert =
                  cert.fullName.toLowerCase().includes("offensive") ||
                  cert.name === "OSCP";
                const certPrimary = isOffensiveCert ? "#DC2626" : "#2563EB";
                const certLight = isOffensiveCert ? "#EF4444" : "#1D4ED8";
                const certRgb = isOffensiveCert ? "220, 38, 38" : "37, 99, 235";

                return (
                  <div
                    key={index}
                    style={{
                      padding: "24px",
                      borderRadius: "24px",
                      transition: "all 0.3s ease",
                      background: `linear-gradient(135deg, rgba(${certRgb},0.15) 0%, rgba(${certRgb},0.05) 100%)`,
                      border: `1px solid rgba(${certRgb},0.3)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "16px",
                        background: `linear-gradient(135deg, ${certPrimary} 0%, ${certLight} 100%)`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                          color: "#ffffff",
                          fontWeight: 700,
                          fontSize: "14px",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {cert.name}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        color: "#ffffff",
                        fontWeight: 600,
                        fontSize: "14px",
                        marginBottom: "4px",
                        lineHeight: 1.3,
                        letterSpacing: "0.01em",
                      }}
                    >
                      {cert.fullName}
                    </h4>
                    <p
                      style={{
                        fontFamily:
                          "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        letterSpacing: "0.01em",
                        fontWeight: 500,
                      }}
                    >
                      {cert.year === "in view" ? "In View" : cert.year}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SERVICES SECTION - Premium Redesign
// ============================================
const services = [
  {
    icon: "🌐",
    title: "Web Application Penetration Testing",
    description:
      "Comprehensive offensive security testing of web applications. I conduct deep reconnaissance, manual vulnerability exploitation, and proof-of-concept development to identify critical security flaws including injection attacks, authentication bypasses, and authorization vulnerabilities.",
    features: [
      "Manual Exploitation",
      "OWASP Top 10 Testing",
      "Proof-of-Concept Development",
    ],
  },
  {
    icon: "🔌",
    title: "API Security Testing",
    description:
      "Specialized penetration testing of REST and GraphQL APIs. I identify authentication bypasses, authorization flaws, insecure direct object references, and data exposure vulnerabilities through manual testing and custom tooling.",
    features: ["REST API Testing", "GraphQL Security", "Authentication Bypass"],
  },
  {
    icon: "�️",
    title: "Threat Modeling & Secure SDLC",
    description:
      "Embed security into the software development lifecycle from day one. I conduct threat modeling using STRIDE, DREAD, and LINDDUN frameworks to identify risks before code is written, and implement secure SDLC practices.",
    features: [
      "Threat Modeling Workshops",
      "Security Requirements Engineering",
      "Secure Design Reviews",
    ],
  },
  {
    icon: "⚙️",
    title: "DevSecOps & Security Automation",
    description:
      "Automate security gates in CI/CD pipelines with SAST, SCA, and DAST to catch vulnerabilities early. I help teams integrate security into their existing workflows without slowing them down.",
    features: [
      "SAST/SCA/DAST Integration",
      "CI/CD Pipeline Security",
      "Security Automation",
    ],
  },
  {
    icon: "🔍",
    title: "Secure Code Reviews",
    description:
      "Manual and automated code audits to identify vulnerabilities in web applications and APIs. I look for security flaws that automated scanners often miss, focusing on secure coding practices.",
    features: [
      "Manual Code Audits",
      "Secure Coding Guidance",
      "Vulnerability Remediation",
    ],
  },
  {
    icon: "🔬",
    title: "Product Security & Architecture",
    description:
      "Design and build security into products from the ground up. I work with product teams to ensure applications, APIs, and user data are protected at scale through robust security architecture.",
    features: [
      "Security Architecture Review",
      "Product Security Strategy",
      "Data Protection Controls",
    ],
  },
];

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "var(--section-y) 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Premium Background */}
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
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(37,99,235,0.05) 0%, transparent 60%)",
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
          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "var(--section-header-gap)",
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
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
              <span style={{ fontSize: "20px" }}>⚡</span>
              <span
                style={{
                  color: "#2563EB",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                My Approach
              </span>
            </div>
            <h2
              style={{
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "24px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textRendering: "optimizeLegibility",
              }}
            >
              Security Assessment{" "}
              <span style={{ color: "#2563EB" }}>Services</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                maxWidth: "900px",
                margin: "0 auto",
                fontSize: "clamp(17px, 2.2vw, 22px)",
                lineHeight: 1.75,
                letterSpacing: "-0.012em",
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontWeight: 400,
                textRendering: "optimizeLegibility",
                fontFeatureSettings: "'kern' 1, 'liga' 1",
              }}
            >
              I help organizations secure web and API-driven applications
              through a combination of defensive engineering and offensive
              security testing. From threat modeling and secure SDLC to
              penetration testing and DevSecOps, I work with teams to identify
              and mitigate risks early, ensuring systems are secure by design.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group"
                style={{
                  position: "relative",
                  padding: "48px 40px",
                  borderRadius: "24px",
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${index * 50}ms`,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.04) 100%)";
                  e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                {/* Hover gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "24px",
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                  className="group-hover:opacity-100"
                />

                <div style={{ position: "relative", zIndex: 10 }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "28px",
                      background:
                        "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.08) 100%)",
                      border: "1px solid rgba(37,99,235,0.25)",
                    }}
                  >
                    <span style={{ fontSize: "36px" }}>{service.icon}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "16px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily:
                        "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.8,
                      marginBottom: "24px",
                      fontSize: "16px",
                      letterSpacing: "-0.01em",
                      fontWeight: 400,
                      textRendering: "optimizeLegibility",
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {service.features.map((feature, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 500,
                          background: "rgba(37,99,235,0.1)",
                          color: "#2563EB",
                          border: "1px solid rgba(37,99,235,0.2)",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: "32px",
                    right: "32px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "all 0.3s ease",
                    background: "rgba(37,99,235,0.15)",
                    border: "1px solid rgba(37,99,235,0.2)",
                  }}
                  className="group-hover:opacity-100 group-hover:translate-x-1"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION - Premium Redesign
// ============================================
export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "var(--section-y) 0",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #020617 0%, #0F172A 50%, #020617 100%)",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Premium Background */}
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
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "800px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)",
              opacity: 0.6,
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 24px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px 20px",
                borderRadius: "9999px",
                marginBottom: "32px",
                background: "rgba(37,99,235,0.1)",
                border: "1px solid rgba(37,99,235,0.2)",
              }}
            >
              <span style={{ fontSize: "20px" }}>🚀</span>
              <span
                style={{
                  color: "#2563EB",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Let&apos;s Talk
              </span>
            </div>

            <h2
              style={{
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "24px",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                textRendering: "optimizeLegibility",
              }}
            >
              Let&apos;s <span style={{ color: "#2563EB" }}>Discuss</span>
              <br />
              Your Security Needs
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(17px, 2.2vw, 22px)",
                marginBottom: "48px",
                maxWidth: "720px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: 1.75,
                letterSpacing: "-0.012em",
                fontFamily:
                  "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                fontWeight: 400,
                textRendering: "optimizeLegibility",
                fontFeatureSettings: "'kern' 1, 'liga' 1",
              }}
            >
              I help teams strengthen their application security program, from{" "}
              <span style={{ color: "#2563EB", fontWeight: 600 }}>
                Secure SDLC
              </span>{" "}
              and{" "}
              <span style={{ color: "#2563EB", fontWeight: 600 }}>
                Threat Modeling
              </span>{" "}
              to{" "}
              <span style={{ color: "#2563EB", fontWeight: 600 }}>
                Product Security
              </span>
              ,{" "}
              <span style={{ color: "#06B6D4", fontWeight: 600 }}>
                DevSecOps
              </span>
              , and{" "}
              <span style={{ color: "#DC2626", fontWeight: 600 }}>
                Offensive Security
              </span>{" "}
              testing.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="sm:flex-row"
            >
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 44px",
                  borderRadius: "14px",
                  fontFamily:
                    "var(--font-satoshi), system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  background:
                    "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  boxShadow:
                    "0 4px 24px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 30px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 24px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
                }}
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
