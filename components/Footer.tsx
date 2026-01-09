'use client';

import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/abdul-razaq', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
  { name: 'X', href: 'https://x.com/ant1g3n', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/abdulrazaq-suleiman', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Email', href: 'mailto:abdulrazaqsec@protonmail.com', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
];

const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Skills', href: '/skills' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <style jsx>{`
        .footer {
          position: relative;
          background: linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%);
          border-top: 1px solid rgba(139,0,0,0.2);
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #8B0000 50%, transparent 100%);
          opacity: 0.5;
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .footer-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(139,0,0,0.05) 0%, transparent 70%);
          opacity: 0.6;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 64px;
          }
        }

        .footer-brand {
          display: inline-flex;
          align-items: baseline;
          text-decoration: none;
          gap: 2px;
          margin-bottom: 24px;
          transition: all 0.3s ease;
        }

        .footer-brand-name {
          font-family: var(--font-signature), cursive;
          font-size: 32px;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 0.01em;
          line-height: 1;
        }

        .footer-brand-dot {
          font-family: var(--font-signature), cursive;
          font-size: 36px;
          font-weight: 400;
          color: #8B0000;
          line-height: 1;
        }

        .footer-brand:hover {
          opacity: 0.9;
        }

        .footer-description {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(255,255,255,0.6);
          max-width: 420px;
          margin-top: 20px;
          letter-spacing: -0.01em;
          font-weight: 400;
        }

        .footer-section-title {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: linear-gradient(90deg, #8B0000, transparent);
        }

        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-nav-link {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          letter-spacing: -0.01em;
          position: relative;
        }

        .footer-nav-link::before {
          content: '';
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 2px;
          background: #8B0000;
          transition: width 0.3s ease;
        }

        .footer-nav-link:hover {
          color: #8B0000;
          transform: translateX(6px);
        }

        .footer-nav-link:hover::before {
          width: 8px;
        }

        .footer-social-wrapper {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .footer-social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(139,0,0,0.2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-social-link svg {
          position: relative;
          z-index: 1;
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .footer-social-link:hover {
          background: rgba(139,0,0,0.15);
          border-color: rgba(139,0,0,0.4);
          color: #8B0000;
          transform: translateY(-2px);
        }

        .footer-social-link:hover::before {
          opacity: 1;
        }

        .footer-social-link:hover svg {
          transform: scale(1.15);
        }

        .footer-bottom {
          padding-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.08);
          text-align: center;
        }

        .footer-copyright {
          font-family: var(--font-satoshi), system-ui, -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          margin: 0;
          letter-spacing: 0.01em;
        }
      `}</style>

      {/* Background Effects */}
      <div className="footer-bg">
        <div className="footer-glow" />
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: `linear-gradient(rgba(139,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '96px 24px 48px',
      }}>
        <div className="footer-grid">
          {/* Brand Section */}
          <div>
            <Link href="/" className="footer-brand">
              <span className="footer-brand-name">AbdulRazaq</span>
              <span className="footer-brand-dot">.</span>
            </Link>
            <p className="footer-description">
              Specialized in offensive security testing of web applications. I conduct comprehensive penetration testing to identify critical vulnerabilities through manual exploitation, deep vulnerability analysis, and custom tool development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="footer-section-title">Connect</h4>
            <div className="footer-social-wrapper">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} AbdulRazaq Suleiman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
