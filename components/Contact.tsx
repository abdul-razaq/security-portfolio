'use client';

import { useEffect, useState, useRef } from 'react';

const contactMethods = [
  {
    title: 'Email',
    value: 'abdulrazaqsec@protonmail.com',
    link: 'mailto:abdulrazaqsec@protonmail.com',
    description: 'Send me an email for project inquiries',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
  {
    title: 'X (Twitter)',
    value: '@ant1g3n',
    link: 'https://x.com/ant1g3n',
    description: 'Follow me on X for security updates',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    title: 'LinkedIn',
    value: 'linkedin.com/in/abdulrazaq-suleiman',
    link: 'https://linkedin.com/in/abdulrazaq-suleiman',
    description: 'Connect with me on LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'clamp(80px, 10vw, 120px) 0',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Premium Background Effects */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Top border glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #8B0000 50%, transparent 100%)',
          opacity: 0.5,
        }} />
        
        {/* Background glows */}
        <div style={{
          position: 'absolute',
          top: '25%',
          right: 0,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 60%)',
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: 0,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 60%)',
          opacity: 0.6,
        }} />
        
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: `radial-gradient(rgba(139,0,0,0.8) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
                </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(20px, 4vw, 24px)',
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          transition: 'opacity 0.6s ease',
          opacity: isVisible ? 1 : 0,
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px',
            borderRadius: '9999px',
            marginBottom: '24px',
            background: 'rgba(139,0,0,0.1)',
            border: '1px solid rgba(139,0,0,0.2)',
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#8B0000',
            }} />
            <span style={{
              color: '#8B0000',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Let&apos;s Talk
            </span>
                </div>
          <h1 style={{
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textRendering: 'optimizeLegibility',
          }}>
            Let&apos;s <span style={{ color: '#8B0000' }}>Talk</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.75,
            letterSpacing: '-0.012em',
            fontWeight: 400,
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: "'kern' 1, 'liga' 1",
          }}>
            I conduct offensive security assessments for web applications, identifying design flaws and vulnerabilities before they impact production. Reach out to discuss potential engagements.
          </p>
              </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '80px',
        }} className="lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Contact Form */}
          <div style={{
            transition: 'opacity 0.6s ease 0.1s',
            opacity: isVisible ? 1 : 0,
          }}>
            <div style={{
              padding: '40px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(28px, 3vw, 36px)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}>
                Send a Message
              </h2>
              <p style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '32px',
                lineHeight: 1.5,
              }}>
                Fill out the form below to discuss your security requirements.
              </p>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}>
                {/* Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '10px',
                    letterSpacing: '0.01em',
                  }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(255,255,255,0.02) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                />
              </div>

                {/* Email */}
              <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '10px',
                    letterSpacing: '0.01em',
                  }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(255,255,255,0.02) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                />
              </div>

                {/* Subject */}
              <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '10px',
                    letterSpacing: '0.01em',
                  }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(255,255,255,0.02) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                />
              </div>

                {/* Message */}
              <div>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '10px',
                    letterSpacing: '0.01em',
                  }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      borderRadius: '14px',
                      fontSize: '15px',
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      resize: 'vertical',
                      transition: 'all 0.3s ease',
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(255,255,255,0.02) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                />
              </div>

                {/* Submit Button */}
              <button
                type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '18px 36px',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    background: isSubmitting
                      ? 'rgba(139,0,0,0.3)'
                      : 'linear-gradient(135deg, #8B0000 0%, #6d0000 100%)',
                    border: '1px solid rgba(139,0,0,0.4)',
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #a31515 0%, #8B0000 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #8B0000 0%, #6d0000 100%)';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              </div>
            </form>
            </div>
          </div>

          {/* Right Column - Contact Methods */}
          <div style={{
            transition: 'opacity 0.6s ease 0.2s',
            opacity: isVisible ? 1 : 0,
          }}>
            <h2 style={{
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(28px, 3vw, 36px)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '8px',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}>
              Other Ways to Reach Me
            </h2>
            <p style={{
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '32px',
              lineHeight: 1.5,
            }}>
              Prefer a different method? Reach out through any of these channels.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {contactMethods.map((method, i) => (
                <a
                  key={i}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '28px',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(255,255,255,0.02) 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)';
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0.05) 100%)',
                    border: '1px solid rgba(139,0,0,0.2)',
                    flexShrink: 0,
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#8B0000' }}>
                      <path d={method.icon} />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}>
                      {method.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      fontSize: '15px',
                      color: '#8B0000',
                      marginBottom: '6px',
                      fontWeight: 500,
                      wordBreak: 'break-word',
                    }}>
                      {method.value}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.5,
                    }}>
                      {method.description}
                    </p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
