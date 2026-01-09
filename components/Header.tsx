'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Skills', href: '/skills' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effects
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* =====================================================
          HEADER 
          ===================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div 
          className="mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-5 transition-all duration-500"
          style={{
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: isScrolled ? '16px 28px' : '20px 32px',
              borderRadius: '16px',
              background: isScrolled
                ? 'rgba(8, 8, 8, 0.95)'
                : 'rgba(12, 12, 12, 0.85)',
              border: `1px solid ${isScrolled ? 'rgba(255,255,255,0.08)' : 'rgba(139,0,0,0.25)'}`,
              boxShadow: isScrolled
                ? '0 8px 32px rgba(0,0,0,0.5)'
                : '0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(139,0,0,0.1) inset',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
            }}
          >
            {/* Accent Line - Top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: isScrolled ? '30%' : '50%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #8B0000, transparent)',
                opacity: 0.6,
                transition: 'width 0.4s ease',
              }}
            />

            {/* ==================== LOGO ==================== */}
              <Link
                href="/"
              style={{
                display: 'flex',
                alignItems: 'baseline',
                textDecoration: 'none',
                gap: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-signature), cursive',
                  fontSize: '32px',
                  fontWeight: 400,
                  color: '#ffffff',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                }}
              >
                AbdulRazaq
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-signature), cursive',
                  fontSize: '36px',
                  fontWeight: 400,
                  color: '#8B0000',
                  lineHeight: 1,
                }}
              >
                .
              </span>
            </Link>

            {/* ==================== DESKTOP NAV ==================== */}
            <div
              className="hidden lg:flex"
              style={{
                alignItems: 'center',
                gap: '8px',
                padding: '6px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
                {navItems.map((item) => {
                const isActive = pathname === item.href;
                  return (
                      <Link
                    key={item.label}
                        href={item.href}
                    style={{
                      position: 'relative',
                      padding: '12px 22px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: isActive ? '#ffffff' : '#777777',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(139,0,0,0.2) 0%, rgba(139,0,0,0.1) 100%)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(139,0,0,0.35)'
                        : '1px solid transparent',
                      boxShadow: isActive
                        ? '0 2px 8px rgba(139,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)'
                        : 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#777777';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {item.label}
                    {/* Active Indicator */}
                    {isActive && (
                          <span
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '4px',
                          height: '4px',
                          background: '#8B0000',
                          borderRadius: '50%',
                          boxShadow: '0 0 8px #8B0000',
                        }}
                          />
                        )}
                      </Link>
                  );
                })}
            </div>


            {/* ==================== MOBILE TOGGLE ==================== */}
              <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center w-12 h-12 rounded-xl cursor-pointer transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
                aria-label="Toggle menu"
              >
              <div style={{ width: '20px', height: '14px', position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#ffffff',
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    top: isMobileMenuOpen ? '6px' : '0',
                    transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                  }}
                />
                  <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '6px',
                    height: '2px',
                    background: '#ffffff',
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  />
                  <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#ffffff',
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    top: isMobileMenuOpen ? '6px' : '12px',
                    transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'none',
                  }}
                  />
                </div>
              </button>
          </nav>
          </div>
      </header>

      {/* =====================================================
          MOBILE MENU OVERLAY
          ===================================================== */}
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(0,0,0,0.7)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* =====================================================
          MOBILE MENU PANEL
          ===================================================== */}
      <aside
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '380px',
          zIndex: 50,
          background: 'linear-gradient(180deg, #0a0a0a 0%, #080808 100%)',
          borderLeft: '1px solid rgba(139,0,0,0.2)',
          boxShadow: isMobileMenuOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Close Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
            }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
            </div>

        {/* Mobile Navigation */}
        <nav style={{ padding: '0 24px' }}>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '18px 20px',
                  marginBottom: '8px',
                  fontSize: '17px',
                  fontWeight: 500,
                  color: isActive ? '#ffffff' : '#888888',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0.08) 100%)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(139,0,0,0.25)'
                    : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>


        {/* Social Links */}
        <div 
          style={{ 
            position: 'absolute',
            bottom: '32px',
            left: '24px',
            right: '24px',
            opacity: isMobileMenuOpen ? 1 : 0,
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s ease',
            transitionDelay: isMobileMenuOpen ? '350ms' : '0ms',
          }}
        >
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
            Connect
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { name: 'GitHub', href: 'https://github.com/abdul-razaq', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
              { name: 'X', href: 'https://x.com/ant1g3n', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { name: 'LinkedIn', href: 'https://linkedin.com/in/abdulrazaq-suleiman', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#666',
                  transition: 'all 0.3s ease',
                }}
                aria-label={social.name}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
