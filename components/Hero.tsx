'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getHomePageContent, type HomePageContent } from '@/lib/api';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getHomePageContent();
        setHomeContent(content);
      } catch (error) {
        console.error('Error loading home content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
    setMounted(true);
  }, []);

  const heroData = homeContent?.hero;
  const greeting = heroData?.greeting || "Hello, I'm";
  const firstName = heroData?.firstName || 'AbdulRazaq';
  const lastName = heroData?.lastName || 'Suleiman';
  const description = heroData?.description || 
    'Specializing in web application penetration testing, I conduct deep reconnaissance, comprehensive enumeration, and thorough vulnerability analysis to identify and exploit security weaknesses. My expertise encompasses full-spectrum penetration testing of web applications, helping organizations strengthen their security posture before malicious actors can exploit vulnerabilities.';

  return (
    <section className="hero-section">
      {/* Subtle Background */}
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>

      {/* Main Content Container */}
      <div className="hero-container">
        <div className={`hero-content ${mounted ? 'hero-content-visible' : ''}`}>
          
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
          </div>

          {/* Role Display */}
          <div className="hero-role-container">
            <span className="hero-role">I Focus on Offensive Web Application Security</span>
          </div>

          {/* Description - Refined Typography */}
          <div className="hero-description">
            <p className="hero-description-paragraph">
              <span className="hero-description-emphasis">Specializing in web application penetration testing</span>, I conduct <span className="hero-description-highlight">deep reconnaissance</span>, <span className="hero-description-highlight">comprehensive enumeration</span>, and <span className="hero-description-highlight">thorough vulnerability analysis</span> to identify and exploit security weaknesses.
            </p>
            <p className="hero-description-paragraph">
              My expertise encompasses <span className="hero-description-emphasis">full-spectrum penetration testing</span> of web applications, identifying and exploiting vulnerabilities that automated tools miss. I focus on the critical flaws that pose real threats to application security.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-wrapper">
            <Link
              href="/contact"
              className="hero-cta-primary"
            >
              <span className="hero-cta-text">Let&apos;s Talk</span>
            </Link>
            <Link
              href="/about"
              className="hero-cta-secondary"
            >
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%);
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
          background-image: radial-gradient(rgba(139,0,0,0.8) 1px, transparent 1px);
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
          max-width: 1120px;
          margin: 0 auto;
          padding: 200px 24px 160px;
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero-container {
            padding: 240px 40px 180px;
          }
        }

        @media (min-width: 1024px) {
          .hero-container {
            padding: 280px 60px 200px;
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
          background: rgba(139,0,0,0.1);
          border: 1px solid rgba(139,0,0,0.2);
        }

        .hero-badge-text {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ============================================
           HEADING
           ============================================ */
        .hero-heading-wrapper {
          margin-bottom: 40px;
        }

        .hero-name {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: clamp(64px, 12vw, 140px);
          font-weight: 700;
          line-height: 1.1;
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
          color: #8B0000;
        }

        /* ============================================
           ROLE
           ============================================ */
        .hero-role-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }

        .hero-role {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          letter-spacing: -0.02em;
          line-height: 1.4;
          position: relative;
        }

        .hero-role::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8B0000, transparent);
          opacity: 0.6;
        }

        /* ============================================
           DESCRIPTION
           ============================================ */
        .hero-description {
          max-width: 860px;
          margin: 0 auto 56px;
          text-align: center;
        }

        .hero-description-paragraph {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: clamp(17px, 2.2vw, 22px);
          line-height: 1.9;
          color: rgba(255,255,255,0.65);
          font-weight: 400;
          letter-spacing: -0.012em;
          font-feature-settings: 'kern' 1, 'liga' 1;
          text-rendering: optimizeLegibility;
          margin: 0 0 20px 0;
        }

        .hero-description-paragraph:last-child {
          margin-bottom: 0;
        }

        .hero-description-emphasis {
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
        }

        .hero-description-highlight {
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
        }

        /* ============================================
           CTA BUTTONS
           ============================================ */
        .hero-cta-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }

        .hero-cta-primary,
        .hero-cta-secondary {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          display: inline-block;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.01em;
          position: relative;
          cursor: pointer;
          line-height: 1.5;
        }

        .hero-cta-text {
          display: inline-block;
          position: relative;
        }

        .hero-cta-primary {
          color: #ffffff;
        }

        .hero-cta-primary .hero-cta-text {
          color: #ffffff;
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-cta-primary::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #8B0000 0%, rgba(139,0,0,0.6) 100%);
          transform-origin: left;
          transform: scaleX(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-cta-primary:hover {
          color: #ffffff;
        }

        .hero-cta-primary:hover .hero-cta-text {
          color: #8B0000;
        }

        .hero-cta-primary:hover::after {
          transform: scaleX(1);
          background: linear-gradient(90deg, #8B0000 0%, #a31515 100%);
          height: 2.5px;
        }

        .hero-cta-secondary {
          color: rgba(255,255,255,0.7);
        }

        .hero-cta-secondary .hero-cta-text {
          color: rgba(255,255,255,0.7);
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-cta-secondary::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%);
          transform-origin: left;
          transform: scaleX(0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-cta-secondary:hover {
          color: #8B0000;
        }

        .hero-cta-secondary:hover .hero-cta-text {
          color: #8B0000;
        }

        .hero-cta-secondary:hover::after {
          transform: scaleX(1);
          background: linear-gradient(90deg, #8B0000 0%, #a31515 100%);
          height: 2.5px;
        }

        /* ============================================
           STATS
           ============================================ */
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 64px;
          flex-wrap: wrap;
          padding: 80px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-stat-number {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .hero-stat-label {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .hero-stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255,255,255,0.06);
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
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: rgba(255,255,255,0.6);
          transition: all 0.3s ease;
        }

        .hero-social-link svg {
          transition: transform 0.3s ease;
        }

        .hero-social-link:hover {
          border-color: rgba(139,0,0,0.3);
          color: #8B0000;
          background: linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(139,0,0,0.04) 100%);
          transform: translateY(-2px);
        }

        .hero-social-link:hover svg {
          transform: scale(1.1);
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */
        @media (max-width: 768px) {
          .hero-container {
            padding: 180px 24px 140px;
          }

          .hero-stats {
            gap: 48px;
            padding: 64px 0;
          }

          .hero-stat-divider {
            display: none;
          }

          .hero-cta-wrapper {
            flex-direction: column;
            width: 100%;
            gap: 20px;
            margin-bottom: 96px;
          }

          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            padding: 22px 44px;
          }

          .hero-role-container {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 640px) {
          .hero-container {
            padding: 160px 20px 120px;
          }

          .hero-badge {
            padding: 12px 28px;
            margin-bottom: 48px;
          }

          .hero-name {
            font-size: clamp(64px, 14vw, 120px);
          }
        }
      `}</style>
    </section>
  );
}
