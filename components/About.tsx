"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function About() {
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
    <section ref={sectionRef} className="about-section">
      <style jsx>{`
        .about-section {
          position: relative;
          min-height: 100vh;
          padding: clamp(80px, 10vw, 120px) 0;
          background: linear-gradient(
            180deg,
            #050505 0%,
            #0a0a0a 50%,
            #050505 100%
          );
          overflow: hidden;
        }

        .about-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .about-top-border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #8b0000 50%,
            transparent 100%
          );
          opacity: 0.5;
        }

        .about-glow-1 {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(139, 0, 0, 0.05) 0%,
            transparent 70%
          );
          opacity: 0.6;
        }

        .about-glow-2 {
          position: absolute;
          bottom: 10%;
          right: 10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(139, 0, 0, 0.04) 0%,
            transparent 70%
          );
          opacity: 0.6;
        }

        .about-grid {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          background-image:
            linear-gradient(rgba(139, 0, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 0, 0, 0.3) 1px, transparent 1px);
          background-size: 100px 100px;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px;
          border-radius: 9999px;
          margin-bottom: 24px;
          background: rgba(139, 0, 0, 0.1);
          border: 1px solid rgba(139, 0, 0, 0.2);
        }

        .about-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #8b0000;
        }

        .about-badge-text {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          color: #8b0000;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .about-heading {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 24px;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .about-subtitle {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(17px, 2.2vw, 22px);
          color: rgba(255, 255, 255, 0.65);
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.75;
          letter-spacing: -0.012em;
          font-weight: 400;
          text-rendering: optimizeLegibility;
          font-feature-settings:
            "kern" 1,
            "liga" 1;
        }

        .about-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
        }

        @media (min-width: 1024px) {
          .about-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
        }

        .about-section-title {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 32px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .about-text {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 17px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          letter-spacing: -0.01em;
        }

        .about-text-emphasis {
          color: #ffffff;
          font-weight: 600;
        }

        .about-text-highlight {
          color: #8b0000;
          font-weight: 500;
        }

        .about-tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }

        .about-tech-item {
          padding: 20px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          transition: all 0.3s ease;
        }

        .about-tech-item:hover {
          background: linear-gradient(
            135deg,
            rgba(139, 0, 0, 0.1) 0%,
            rgba(139, 0, 0, 0.05) 100%
          );
          border-color: rgba(139, 0, 0, 0.3);
          transform: translateY(-2px);
        }

        .about-tech-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .about-tech-name {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.01em;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 48px;
        }

        @media (min-width: 640px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .about-stat-card {
          padding: 32px;
          border-radius: 20px;
          text-align: center;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .about-stat-value {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 48px;
          font-weight: 700;
          color: #8b0000;
          margin-bottom: 8px;
          letter-spacing: -0.03em;
        }

        .about-stat-label {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.01em;
        }

        .about-highlights-card {
          padding: 40px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(139, 0, 0, 0.08) 0%,
            rgba(139, 0, 0, 0.02) 100%
          );
          border: 1px solid rgba(139, 0, 0, 0.25);
        }

        .about-highlights-title {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 28px;
          letter-spacing: -0.01em;
        }

        .about-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .about-highlight-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .about-highlight-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8b0000;
          flex-shrink: 0;
        }

        .about-highlight-text {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: -0.01em;
        }

        .about-cta-wrapper {
          margin-top: 100px;
          position: relative;
          z-index: 10;
        }

        .about-cta-content {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
          padding: 64px 32px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(139, 0, 0, 0.08) 0%,
            rgba(139, 0, 0, 0.02) 100%
          );
          border: 1px solid rgba(139, 0, 0, 0.25);
        }

        .about-cta-title {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 20px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .about-cta-description {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(16px, 2vw, 18px);
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
          letter-spacing: -0.01em;
        }

        .about-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px 44px;
          border-radius: 14px;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #8b0000 0%, #6d0000 100%);
          box-shadow:
            0 4px 24px rgba(139, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: #ffffff;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          position: relative;
          z-index: 1;
        }

        .about-cta-button:hover {
          transform: translateY(-3px);
          box-shadow:
            0 6px 30px rgba(139, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Background Effects */}
      <div className="about-bg">
        <div className="about-top-border" />
        <div className="about-glow-1" />
        <div className="about-glow-2" />
        <div className="about-grid" />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
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
          <div className="about-badge">
            <div className="about-badge-dot" />
            <span className="about-badge-text">About Me</span>
          </div>
          <h1 className="about-heading">
            Offensive Security <span style={{ color: "#8B0000" }}>Engineer</span>
          </h1>
          <p className="about-subtitle">
            Specializing in web application penetration testing and Application
            Security Engineering with a strong foundation in full stack
            development.
          </p>
        </div>

        {/* Main Content */}
        <div className="about-content-grid">
          {/* Left Column - Story */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.1s",
            }}
          >
            <h2 className="about-section-title">My Journey</h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <p className="about-text">
                My journey in technology began with{" "}
                <span className="about-text-emphasis">
                  full stack web development
                </span>
                , where I built robust applications using the{" "}
                <span className="about-text-highlight">JavaScript stack</span>
                —React, Node.js, Express, and modern frontend frameworks. This
                foundation gave me deep insight into how web applications are
                built, how they function, and where their vulnerabilities might
                lie.
              </p>
              <p className="about-text">
                I have a{" "}
                <span className="about-text-emphasis">
                  strong programming background
                </span>{" "}
                and a genuine love for{" "}
                <span className="about-text-highlight">Go</span> and{" "}
                <span className="about-text-highlight">Python</span>. These
                languages have become essential tools in my security work,
                allowing me to develop custom security testing tools, automate
                vulnerability assessments, and create proof-of-concept exploits
                that demonstrate real-world security risks.
              </p>
              <p className="about-text">
                While I appreciate the art of building applications, my true
                passion lies in{" "}
                <span className="about-text-emphasis">
                  offensive security and securing web applications
                </span>
                . The challenge of thinking like an attacker, identifying
                vulnerabilities before they're exploited, and systematically
                breaking down security defenses is what drives my work.
              </p>
              <p className="about-text">
                Today, I specialize in{" "}
                <span className="about-text-emphasis">
                  Application Security Engineering
                </span>
                , conducting comprehensive security assessments through manual
                testing, custom tool development, and deep understanding of web
                applications, architectures and APIs. My development background gives me a
                unique perspective—I understand both{" "}
                <span className="about-text-highlight">
                  how applications are built
                </span>{" "}
                and{" "}
                <span className="about-text-highlight">
                  how they can be broken
                </span>
                .
              </p>
              <p className="about-text">
                I focus extensively on the{" "}
                <span className="about-text-emphasis">OWASP Top 10</span>{" "}
                vulnerabilities, systematically testing for{" "}
                <span className="about-text-highlight">injection flaws</span>,{" "}
                <span className="about-text-highlight">
                  broken authentication
                </span>
                ,{" "}
                <span className="about-text-highlight">
                  sensitive data exposure
                </span>
                , and other{" "}
                <span className="about-text-emphasis">
                  critical security weaknesses
                </span>{" "}
                that pose real threats to web applications. This methodical
                approach ensures comprehensive coverage of the most common and
                dangerous vulnerabilities affecting modern web applications.
              </p>
            </div>

            {/* Security Tools */}
            <div className="about-tech-grid">
              <div className="about-tech-item">
                <div className="about-tech-icon">🔧</div>
                <div className="about-tech-name">Burp Suite</div>
              </div>
              <div className="about-tech-item">
                <div className="about-tech-icon">🛡️</div>
                <div className="about-tech-name">OWASP ZAP</div>
              </div>
              <div className="about-tech-item">
                <div className="about-tech-icon">🐹</div>
                <div className="about-tech-name">Go</div>
              </div>
              <div className="about-tech-item">
                <div className="about-tech-icon">🐍</div>
                <div className="about-tech-name">Python</div>
              </div>
              <div className="about-tech-item">
                <div className="about-tech-icon">📜</div>
                <div className="about-tech-name">JavaScript</div>
              </div>
              <div className="about-tech-item">
                <div className="about-tech-icon">📋</div>
                <div className="about-tech-name">OWASP Top 10</div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Highlights */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
          >
            {/* Stats Grid */}
            <div className="about-stats-grid">
              <div className="about-stat-card">
                <div className="about-stat-value">6</div>
                <div className="about-stat-label">Years Web Development</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-value">4+</div>
                <div className="about-stat-label">Years Security</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="about-highlights-card">
              <h3 className="about-highlights-title">What I Do</h3>
              <div className="about-highlights-list">
                {[
                  "Conduct penetration testing of web applications to identify vulnerabilities",
                  "Develop custom security tools in Go and Python",
                  "Create proof-of-concept exploits for identified vulnerabilities",
                  "Conduct manual security assessments",
                  "Leverage full stack development knowledge for security testing",
                  "Share knowledge through blogging and technical writing",
                ].map((item, i) => (
                  <div key={i} className="about-highlight-item">
                    <div className="about-highlight-dot" />
                    <span className="about-highlight-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="about-cta-wrapper"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}
        >
          <div className="about-cta-content">
            <h2 className="about-cta-title">
              Ready to <span style={{ color: "#8B0000" }}>Secure</span> Your Web
              Applications?
            </h2>
            <p className="about-cta-description">
              I provide expert penetration testing for web applications,
              uncovering and helping remediate critical vulnerabilities. Reach
              out to discuss how I can help secure your systems.
            </p>
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
                background: "linear-gradient(135deg, #8B0000 0%, #6d0000 100%)",
                boxShadow:
                  "0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                color: "#ffffff",
                letterSpacing: "0.02em",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 30px rgba(139,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
