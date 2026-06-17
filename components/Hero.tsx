"use client";

import { getHomePageContent, type HomePageContent } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getHomePageContent();
        setHomeContent(content);
      } catch (error) {
        console.error("Error loading home content:", error);
      }
    }
    fetchContent();
    setMounted(true);
  }, []);

  const heroData = homeContent?.hero;
  const greeting = heroData?.greeting || "Hello, I'm";
  const firstName = heroData?.firstName || "AbdulRazaq";
  const lastName = heroData?.lastName || "Suleiman";

  return (
    <section className="hero-section">
      {/* Subtle Background */}
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>

      {/* Main Content Container */}
      <div className="hero-container">
        <div
          className={`hero-content ${mounted ? "hero-content-visible" : ""}`}
        >
          {/* Greeting Badge */}
          <div className="hero-badge">
            <span className="hero-badge-text">{greeting}</span>
          </div>

          {/* Main Heading */}
          <div className="hero-heading-wrapper">
            <h1 className="hero-name">
              <span className="hero-name-first">{firstName}</span>
              <span className="hero-name-last">{lastName}</span>
            </h1>
            <div className="hero-insignia" aria-label="Handle: Ant1g3n">
              <span className="hero-insignia-mark" aria-hidden="true">
                ◈
              </span>
              <span className="hero-insignia-bracket" aria-hidden="true">
                [
              </span>
              <span className="hero-insignia-name">Ant1g3n</span>
              <span className="hero-insignia-bracket" aria-hidden="true">
                ]
              </span>
            </div>
          </div>

          {/* Role & Value Proposition */}
          <div className="hero-role-block">
            <p className="hero-role">
              <span className="hero-role-primary">Application Security</span>
              <span className="hero-role-secondary"> Engineer</span>
            </p>
            <p className="hero-lead">
              I help teams ship{" "}
              <span className="hero-lead-highlight">secure software</span> with
              confidence through{" "}
              <span className="hero-lead-threat">threat modeling</span>,{" "}
              <span className="hero-lead-design">secure design</span>,{" "}
              <span className="hero-lead-review">secure code review</span>,{" "}
              <span className="hero-lead-devsecops">DevSecOps</span>, and{" "}
              <span className="hero-lead-hands">hands-on</span> application
              security testing.
            </p>
          </div>

          {/* AppSec Capability Pillars */}
          <ul
            className="hero-capabilities"
            aria-label="Application security focus areas"
          >
            <li className="hero-capability hero-capability-defensive">
              Secure SDLC
            </li>
            <li className="hero-capability hero-capability-defensive">
              Threat Modeling
            </li>
            <li className="hero-capability hero-capability-defensive">
              Product Security
            </li>
            <li className="hero-capability hero-capability-defensive">
              API Security
            </li>
            <li className="hero-capability hero-capability-engineering">
              DevSecOps
            </li>
            <li className="hero-capability hero-capability-offensive">
              Offensive Security
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className="hero-cta-wrapper">
            <Link href="/contact" className="hero-cta-primary">
              <span className="hero-cta-text">Let&apos;s Talk</span>
            </Link>
            <Link href="/about" className="hero-cta-secondary">
              <span className="hero-cta-text">Learn More</span>
            </Link>
          </div>

          {/* Stats - Premium Display */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">4+</span>
              <span className="hero-stat-label">Years Security Experience</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">Web Apps Tested</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-number">50+</span>
              <span className="hero-stat-label">Critical Bugs Found</span>
            </div>
          </div>

          {/* Social Links - Refined Design */}
          <div className="hero-social">
            <a
              href="https://x.com/ant1g3n"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="X (Twitter)"
            >
              <div className="hero-social-link-bg" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/abdulrazaq-suleiman"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn"
            >
              <div className="hero-social-link-bg" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/abdul-razaq"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <div className="hero-social-link-bg" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: calc(100vh - var(--header-height));
          min-height: calc(100dvh - var(--header-height));
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            180deg,
            #020617 0%,
            #0f172a 50%,
            #020617 100%
          );
          overflow: hidden;
        }

        /* ============================================
           BACKGROUND
           ============================================ */
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(37, 99, 235, 0.8) 1px,
            transparent 1px
          );
          background-size: 100px 100px;
          opacity: 0.02;
        }

        /* ============================================
           MAIN CONTAINER
           ============================================ */
        .hero-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: calc(var(--header-height) + 3rem) var(--container-x) 5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero-container {
            padding: calc(var(--header-height) + 4rem) var(--container-x) 6rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-container {
            padding: calc(var(--header-height) + 5rem) var(--container-x) 7rem;
          }
        }

        /* Content Animation */
        .hero-content {
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .hero-content-visible {
          opacity: 1;
        }

        /* ============================================
           BADGE
           ============================================ */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 12px 28px;
          margin-bottom: 48px;
          border-radius: 9999px;
          background: rgba(37, 99, 235, 0.1);
          border: 1px solid rgba(37, 99, 235, 0.2);
        }

        .hero-badge-text {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ============================================
           HEADING
           ============================================ */
        .hero-heading-wrapper {
          margin-bottom: 32px;
        }

        .hero-name {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(2.5rem, 9vw, 7.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0;
        }

        .hero-name-first {
          display: block;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .hero-name-last {
          display: block;
          color: #2563eb;
        }

        .hero-insignia {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          max-width: 100%;
          padding: 10px 20px;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.14) 0%,
            rgba(37, 99, 235, 0.05) 100%
          );
          border: 1px solid rgba(37, 99, 235, 0.4);
          box-shadow:
            0 0 32px rgba(37, 99, 235, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .hero-insignia-mark {
          color: #2563eb;
          font-size: 16px;
          line-height: 1;
          text-shadow: 0 0 12px rgba(37, 99, 235, 0.8);
        }

        .hero-insignia-bracket {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: rgba(37, 99, 235, 0.55);
          font-size: clamp(18px, 2.5vw, 26px);
          font-weight: 600;
          line-height: 1;
        }

        .hero-insignia-name {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: clamp(22px, 3.2vw, 32px);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #f8fafc;
          line-height: 1;
        }

        /* ============================================
           ROLE & VALUE PROPOSITION
           ============================================ */
        .hero-role-block {
          margin-bottom: 28px;
        }

        .hero-role {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(1.5rem, 3.2vw, 2.25rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.15;
          margin: 0 0 16px;
        }

        .hero-role-primary {
          color: #60a5fa;
        }

        .hero-role-secondary {
          color: #f8fafc;
        }

        .hero-lead {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(1.05rem, 1.8vw, 1.18rem);
          line-height: 1.75;
          color: rgba(241, 245, 249, 0.88);
          font-weight: 500;
          letter-spacing: -0.02em;
          max-width: 52rem;
          margin: 0 auto;
          text-wrap: pretty;
          text-shadow: 0 1px 0 rgba(15, 23, 42, 0.2);
        }

        .hero-lead-highlight {
          color: #f8fafc;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .hero-lead-threat {
          color: #93c5fd;
          font-weight: 600;
        }

        .hero-lead-design {
          color: #c4b5fd;
          font-weight: 600;
        }

        .hero-lead-review {
          color: #86efac;
          font-weight: 600;
        }

        .hero-lead-devsecops {
          color: #fde68a;
          font-weight: 600;
        }

        .hero-lead-hands {
          color: #fca5a5;
          font-weight: 600;
        }

        /* ============================================
           CAPABILITY PILLARS
           ============================================ */
        .hero-capabilities {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;
          max-width: 56rem;
          margin: 0 auto 36px;
          padding: 0;
          list-style: none;
        }

        .hero-capability {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 8px 14px;
          border-radius: 9999px;
          line-height: 1;
          white-space: nowrap;
        }

        .hero-capability-defensive {
          color: #93c5fd;
          background: rgba(37, 99, 235, 0.12);
          border: 1px solid rgba(37, 99, 235, 0.28);
        }

        .hero-capability-engineering {
          color: #67e8f9;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.28);
        }

        .hero-capability-offensive {
          color: #fca5a5;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.28);
        }

        /* ============================================
           DESCRIPTION
           ============================================ */
        .hero-description {
          max-width: 52rem;
          margin: 0 auto 48px;
          text-align: center;
        }

        .hero-description-paragraph {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.58);
          font-weight: 400;
          letter-spacing: -0.01em;
          font-feature-settings:
            "kern" 1,
            "liga" 1;
          text-rendering: optimizeLegibility;
          margin: 0;
        }

        .hero-description-emphasis {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
        }

        .hero-description-highlight {
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
        }

        .hero-description-pillar {
          color: #2563eb;
          font-weight: 600;
        }

        .hero-description-engineering {
          color: #06b6d4;
          font-weight: 600;
        }

        .hero-description-offensive {
          color: #dc2626;
          font-weight: 600;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
        }

        /* ============================================
           CTA BUTTONS
           ============================================ */
        .hero-cta-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }

        .hero-cta-primary,
        .hero-cta-secondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
          padding: 13px 22px;
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 0.98rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          border-radius: 999px;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
          cursor: pointer;
          line-height: 1;
        }

        .hero-cta-text {
          position: relative;
          z-index: 1;
          display: inline-block;
        }

        .hero-cta-primary {
          color: #f8fafc !important;
          background: linear-gradient(
            90deg,
            #1d4ed8 0%,
            #3b82f6 100%
          ) !important;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 10px 24px rgba(37, 99, 235, 0.3) !important;
          border: 1px solid rgba(147, 197, 253, 0.3) !important;
          text-transform: none !important;
        }

        .hero-cta-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            rgba(37, 99, 235, 0.98) 0%,
            rgba(14, 165, 233, 0.82) 100%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .hero-cta-primary:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            0 14px 30px rgba(37, 99, 235, 0.34);
        }

        .hero-cta-primary:hover::before {
          opacity: 1;
        }

        .hero-cta-primary:hover .hero-cta-text {
          color: #f8fafc;
        }

        .hero-cta-secondary {
          color: rgba(248, 250, 252, 0.9) !important;
          background: rgba(255, 255, 255, 0.06) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
        }

        .hero-cta-secondary:hover {
          color: #f8fafc !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(96, 165, 250, 0.4) !important;
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 10px 24px rgba(15, 23, 42, 0.22) !important;
        }

        /* ============================================
           STATS
           ============================================ */
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: start;
          justify-items: center;
          gap: 24px 32px;
          padding: 48px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          max-width: 160px;
        }

        .hero-stat-number {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .hero-stat-label {
          font-family:
            var(--font-satoshi),
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1.4;
        }

        .hero-stat-divider {
          display: none;
        }

        /* ============================================
           SOCIAL LINKS
           ============================================ */
        .hero-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 56px;
        }

        .hero-social-link {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.04) 0%,
            rgba(255, 255, 255, 0.01) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }

        .hero-social-link svg {
          transition: transform 0.3s ease;
        }

        .hero-social-link:hover {
          border-color: rgba(37, 99, 235, 0.3);
          color: #2563eb;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.08) 0%,
            rgba(37, 99, 235, 0.04) 100%
          );
          transform: translateY(-2px);
        }

        .hero-social-link:hover svg {
          transform: scale(1.1);
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 768px) {
          .hero-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px 24px;
            padding: 40px 0;
          }

          .hero-stats .hero-stat:last-child {
            grid-column: 1 / -1;
            max-width: 200px;
            justify-self: center;
          }

          .hero-cta-wrapper {
            flex-direction: column;
            width: 100%;
            max-width: 360px;
            margin-left: auto;
            margin-right: auto;
            gap: 16px;
            margin-bottom: 48px;
          }

          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            padding: 18px 32px;
          }
        }

        @media (max-width: 640px) {
          .hero-capabilities {
            gap: 8px;
            margin-bottom: 28px;
          }

          .hero-capability {
            font-size: 11px;
            padding: 7px 12px;
          }

          .hero-lead {
            font-size: 1rem;
          }
          .hero-badge {
            padding: 10px 20px;
            margin-bottom: 32px;
          }

          .hero-insignia {
            padding: 8px 16px;
          }

          .hero-insignia-name {
            font-size: clamp(18px, 5vw, 24px);
            letter-spacing: 0.08em;
          }

          .hero-social {
            margin-top: 40px;
          }
        }
      `}</style>
    </section>
  );
}
