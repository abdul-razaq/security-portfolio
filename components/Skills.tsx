"use client";

import { getSkills, type Skill } from "@/lib/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

// Default App Sec skills
const defaultSkills: SkillCategory[] = [
  {
    category: "Defensive Security",
    icon: "🛡️",
    skills: [
      {
        _id: "def-1",
        name: "Secure SDLC",
        description:
          "Integrate security into every phase of software development from requirements to deployment.",
        level: 95,
        category: "Defensive Security",
        icon: "🔒",
      },
      {
        _id: "def-2",
        name: "Threat Modeling",
        description:
          "Systematic risk identification using STRIDE, MITRE's CAPEC, ATT&CK, OWASP Libraries and LINDDUN frameworks.",
        level: 90,
        category: "Defensive Security",
        icon: "🎯",
      },
      {
        _id: "def-3",
        name: "Product Security",
        description:
          "Design and implement secure products with robust architectures and controls.",
        level: 88,
        category: "Defensive Security",
        icon: "📦",
      },
      {
        _id: "def-4",
        name: "DevSecOps",
        description:
          "Embed security into CI/CD pipelines for automated vulnerability scanning.",
        level: 85,
        category: "Defensive Security",
        icon: "⚙️",
      },
      {
        _id: "def-5",
        name: "Secure Code Review",
        description:
          "Manual and automated code audits to identify and remediate security vulnerabilities.",
        level: 92,
        category: "Defensive Security",
        icon: "🔍",
      },
      {
        _id: "def-6",
        name: "Security Architecture",
        description:
          "Design and assess secure architectures for applications and APIs.",
        level: 87,
        category: "Defensive Security",
        icon: "🏗️",
      },
    ],
  },
  {
    category: "Offensive Security",
    icon: "🔴",
    skills: [
      {
        _id: "off-1",
        name: "Web Application Penetration Testing",
        description:
          "Comprehensive testing for injection, authentication bypass, and authorization flaws.",
        level: 94,
        category: "Offensive Security",
        icon: "🌐",
      },
      {
        _id: "off-2",
        name: "API Security Testing",
        description:
          "Specialized testing for REST and GraphQL API vulnerabilities.",
        level: 91,
        category: "Offensive Security",
        icon: "🔌",
      },
      {
        _id: "off-3",
        name: "Vulnerability Research",
        description:
          "Deep analysis to discover complex security flaws in applications and services.",
        level: 86,
        category: "Offensive Security",
        icon: "🔬",
      },
      {
        _id: "off-4",
        name: "Exploit Development",
        description:
          "Creating proof-of-concept exploits to demonstrate real-world security risks.",
        level: 80,
        category: "Offensive Security",
        icon: "💣",
      },
    ],
  },
  {
    category: "App Sec Tools",
    icon: "🛠️",
    skills: [
      {
        _id: "tool-1",
        name: "Burp Suite",
        description:
          "Comprehensive web vulnerability scanner and proxy for penetration testing.",
        level: 95,
        category: "App Sec Tools",
        icon: "🔧",
      },
      {
        _id: "tool-2",
        name: "SAST / DAST / SCA",
        description:
          "Static, Dynamic, and Software Composition Analysis for automated security testing.",
        level: 90,
        category: "App Sec Tools",
        icon: "📊",
      },
      {
        _id: "tool-3",
        name: "OWASP ZAP",
        description: "Open-source web application security scanner.",
        level: 85,
        category: "App Sec Tools",
        icon: "🛡️",
      },
      {
        _id: "tool-4",
        name: "Go Programming",
        description: "Develop high-performance security tools in Go.",
        level: 88,
        category: "App Sec Tools",
        icon: "🐹",
      },
      {
        _id: "tool-5",
        name: "Python for Security",
        description: "Build custom security tools and automation scripts.",
        level: 92,
        category: "App Sec Tools",
        icon: "🐍",
      },
      {
        _id: "tool-6",
        name: "GitLab CI/CD",
        description: "Implement security gates in CI/CD pipelines.",
        level: 87,
        category: "App Sec Tools",
        icon: "🔲",
      },
    ],
  },
  {
    category: "Methodologies & Frameworks",
    icon: "📋",
    skills: [
      {
        _id: "meth-1",
        name: "OWASP Top 10",
        description:
          "In-depth knowledge of critical web application security risks.",
        level: 96,
        category: "Methodologies & Frameworks",
        icon: "📜",
      },
      {
        _id: "meth-2",
        name: "OWASP API Top 10",
        description:
          "Specialized security testing for API-specific vulnerabilities.",
        level: 93,
        category: "Methodologies & Frameworks",
        icon: "🔌",
      },
      {
        _id: "meth-3",
        name: "STRIDE",
        description:
          "Threat modeling methodology for identifying spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege risks.",
        level: 90,
        category: "Methodologies & Frameworks",
        icon: "🧭",
      },
      {
        _id: "capec-1",
        name: "CAPEC Framework",
        description:
          "Common Attack Pattern Enumeration and Classification — a comprehensive dictionary of known attack patterns used to understand how adversaries exploit weaknesses in applications and systems.",
        level: 88,
        category: "MITRE CAPEC",
        icon: "🗂️",
      },
      {
        _id: "meth-4",
        name: "LINDDUN",
        description:
          "Privacy-focused threat modeling framework for linkability, identifiability, non-repudiation, detectability, disclosure of information, unawareness, and non-compliance.",
        level: 84,
        category: "Methodologies & Frameworks",
        icon: "🔐",
      },
      {
        _id: "meth-5",
        name: "DREAD",
        description:
          "Risk rating model for assessing damage potential, reproducibility, exploitability, affected users, and discoverability.",
        level: 82,
        category: "Methodologies & Frameworks",
        icon: "⚖️",
      },
      {
        _id: "attck-1",
        name: "ATT&CK Framework",
        description:
          "MITRE ATT&CK — a globally-accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world observations, used for threat modeling and red/blue team operations.",
        level: 90,
        category: "MITRE ATT&CK",
        icon: "🎯",
      },
    ],
  },
];

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
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
    async function fetchSkills() {
      setLoading(true);
      try {
        const skills = await getSkills();
        console.log("Fetched skills:", skills);
        console.log("Skills length:", skills?.length);

        if (!skills || skills.length === 0) {
          console.warn("No skills returned from API, using defaults");
          setSkillCategories(defaultSkills);
          setLoading(false);
          return;
        }

        // Group skills by category
        const categoryMap = new Map<string, SkillCategory>();

        skills.forEach((skill) => {
          const category = skill.category || "Other";
          if (!categoryMap.has(category)) {
            categoryMap.set(category, {
              category,
              icon: skill.icon || getCategoryIcon(category),
              skills: [],
            });
          }
          categoryMap.get(category)!.skills.push(skill);
        });

        // Convert to array and sort
        const categories = Array.from(categoryMap.values());
        categories.sort((a, b) => {
          const order = [
            "Defensive Security",
            "Offensive Security",
            "App Sec Tools",
            "Methodologies & Frameworks",
          ];
          const aIndex = order.indexOf(a.category);
          const bIndex = order.indexOf(b.category);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });

        console.log("Categories created:", categories);
        setSkillCategories(categories);
      } catch (error) {
        console.error("Error loading skills:", error);
        setSkillCategories(defaultSkills);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      "Defensive Security": "🛡️",
      "Offensive Security": "🔴",
      "App Sec Tools": "🛠️",
      "Methodologies & Frameworks": "📋",
    };
    return icons[category] || "💼";
  };

  const getCategoryAccent = (category: string) => {
    if (category === "Offensive Security") {
      return { primary: "#DC2626", light: "#EF4444", rgb: "220, 38, 38" };
    }
    if (category === "App Sec Tools") {
      return { primary: "#06B6D4", light: "#22D3EE", rgb: "6, 182, 212" };
    }
    return { primary: "#2563EB", light: "#1D4ED8", rgb: "37, 99, 235" };
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

        {/* Animated gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "5%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />

        {/* Enhanced grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.02,
            backgroundImage: `linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Subtle scan lines effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(37,99,235,0.02) 2px, rgba(37,99,235,0.02) 4px)",
            pointerEvents: "none",
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
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 24px",
              borderRadius: "9999px",
              marginBottom: "32px",
              background:
                "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.08) 100%)",
              border: "1px solid rgba(37,99,235,0.3)",
              boxShadow:
                "0 4px 20px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                boxShadow:
                  "0 0 12px rgba(37,99,235,0.8), 0 0 24px rgba(37,99,235,0.4)",
              }}
            />
            <span
              style={{
                color: "#2563EB",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Expertise & Mastery
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
            <span
              style={{
                background:
                  "linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #2563EB 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Application Security
            </span>{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #2563EB 0%, #1D4ED8 50%, #2563EB 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills
            </span>
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
            Expertise across the application security lifecycle, including
            Secure SDLC, Threat Modeling, Product Security, DevSecOps, and
            Offensive Security testing.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "120px 0" }}>
            <div
              style={{
                display: "inline-block",
                width: "56px",
                height: "56px",
                border: "4px solid rgba(37,99,235,0.2)",
                borderTopColor: "#2563EB",
                borderRadius: "50%",
              }}
            />
          </div>
        )}

        {/* Skills Categories */}
        {!loading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "80px",
            }}
          >
            {skillCategories.length === 0 && !loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "120px 0",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <p style={{ fontSize: "20px", marginBottom: "16px" }}>
                  No skills found.
                </p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>
                  <Link
                    href="/admin"
                    style={{ color: "#2563EB", textDecoration: "underline" }}
                  >
                    Add skills
                  </Link>{" "}
                  in the admin panel.
                </p>
              </div>
            )}
            {skillCategories.map((category, categoryIndex) => {
              const accent = getCategoryAccent(category.category);
              return (
                <div
                  key={category.category}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  {/* Category Header - Enhanced */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "24px",
                      marginBottom: "56px",
                      padding: "32px",
                      borderRadius: "24px",
                      background: `linear-gradient(135deg, rgba(${accent.rgb},0.1) 0%, rgba(${accent.rgb},0.03) 100%)`,
                      border: `1px solid rgba(${accent.rgb},0.2)`,
                      boxShadow: `0 4px 16px rgba(${accent.rgb},0.08), inset 0 1px 0 rgba(255,255,255,0.05)`,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Animated background accent */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "4px",
                        height: "100%",
                        background: `linear-gradient(180deg, ${accent.primary} 0%, rgba(${accent.rgb},0.5) 50%, transparent 100%)`,
                        boxShadow: `0 0 8px rgba(${accent.rgb},0.4)`,
                      }}
                    />

                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "36px",
                        background: `linear-gradient(135deg, rgba(${accent.rgb},0.2) 0%, rgba(${accent.rgb},0.1) 100%)`,
                        border: `2px solid rgba(${accent.rgb},0.3)`,
                        boxShadow: `0 4px 16px rgba(${accent.rgb},0.15), inset 0 1px 0 rgba(255,255,255,0.1)`,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: "-4px",
                          borderRadius: "24px",
                          background: `linear-gradient(135deg, rgba(${accent.rgb},0.2), transparent)`,
                          opacity: 0.4,
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>
                        {category.icon}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h2
                        style={{
                          fontSize: "clamp(32px, 4vw, 48px)",
                          fontWeight: 800,
                          color: "#ffffff",
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                          marginBottom: "8px",
                        }}
                      >
                        {category.category}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "2px",
                            background: `linear-gradient(90deg, ${accent.primary} 0%, transparent 100%)`,
                            boxShadow: `0 0 4px rgba(${accent.rgb},0.3)`,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.4)",
                            fontWeight: 500,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {category.skills.length}{" "}
                          {category.skills.length === 1 ? "Skill" : "Skills"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid - Enhanced */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill._id}
                        style={{
                          position: "relative",
                          padding: "32px",
                          borderRadius: "24px",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          boxShadow:
                            "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.borderColor =
                            "rgba(37,99,235,0.3)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 12px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.05)";
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(255,255,255,0.02) 100%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.06)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)";
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)";
                        }}
                      >
                        {/* Hover glow effect */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "200%",
                            height: "200%",
                            background:
                              "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
                            opacity: 0,
                            transition: "opacity 0.4s ease",
                            pointerEvents: "none",
                          }}
                          className="group-hover:opacity-100"
                        />

                        {/* Top accent line */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "2px",
                            background:
                              "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.4) 50%, transparent 100%)",
                            opacity: 0.5,
                          }}
                        />

                        {/* Skill Name */}
                        <h3
                          style={{
                            fontSize: "20px",
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                            marginBottom: "20px",
                          }}
                        >
                          {skill.name}
                        </h3>

                        {/* Description */}
                        <p
                          style={{
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.5)",
                            lineHeight: 1.7,
                            fontWeight: 400,
                          }}
                        >
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
