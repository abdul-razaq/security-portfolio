'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getHomePageContent, getExperiences, getEducation, type HomePageContent, type Experience, type Education, type Certification } from '@/lib/api';

// ============================================
// ABOUT SECTION - Premium Redesign
// ============================================
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
        console.error('Error loading home content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const aboutData = homeContent?.about;
  const defaultFeatures = [
    { icon: '🌐', title: 'Web App Penetration Testing', description: 'Full-spectrum offensive security testing' },
    { icon: '⚡', title: 'Manual Exploitation', description: 'Deep vulnerability analysis & exploitation' },
    { icon: '🛠️', title: 'Custom Tool Development', description: 'Go-based security testing tools' },
    { icon: '🔍', title: 'OWASP Top 10 Focus', description: 'Critical web app vulnerabilities' },
  ];
  const features = aboutData?.features && aboutData.features.length > 0 
    ? aboutData.features.map(f => ({ ...f, description: f.description || '' }))
    : defaultFeatures;

  return (
    <section 
      ref={sectionRef} 
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
      className="lg:py-40"
    >
      <div style={{ position: 'relative' }}>
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
          
          {/* Floating orbs */}
          <div style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '288px',
            height: '288px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,0,0.08) 0%, transparent 70%)',
            opacity: 0.6,
          }} />
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '40px',
            width: '384px',
            height: '384px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,0,0.06) 0%, transparent 70%)',
            opacity: 0.6,
          }} />
          
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
          padding: '0 clamp(20px, 4vw, 24px)',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
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
                Web App Security Specialist
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Specialized in <br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: '#8B0000' }}>Web Application</span>
                <svg style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '100%',
                  height: '8px',
                }} viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 4 50 7 100 7C150 7 150 1 200 1" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span> Offensive Security
            </h2>
          </div>

          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.1s',
          }}>
            {/* Description */}
            <div style={{ marginBottom: '48px' }}>
              {aboutData?.description ? (
                <p style={{
                  fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(17px, 2.2vw, 22px)',
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.75,
                  textAlign: 'center',
                  marginBottom: '24px',
                  whiteSpace: 'pre-line',
                  letterSpacing: '-0.012em',
                  fontWeight: 400,
                  textRendering: 'optimizeLegibility',
                  fontFeatureSettings: "'kern' 1, 'liga' 1",
                }}>
                  {aboutData.description}
                </p>
              ) : (
                <>
                  <p style={{
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: 'clamp(17px, 2.2vw, 22px)',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.75,
                    textAlign: 'center',
                    marginBottom: '24px',
                    letterSpacing: '-0.012em',
                    fontWeight: 400,
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: "'kern' 1, 'liga' 1",
                  }}>
                    I specialize exclusively in <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>offensive security testing of web applications</span>. Through deep reconnaissance, comprehensive enumeration, and thorough vulnerability analysis, I identify and exploit security weaknesses that automated tools miss.
                  </p>

                  <p style={{
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: 'clamp(17px, 2.2vw, 22px)',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.75,
                    textAlign: 'center',
                    letterSpacing: '-0.012em',
                    fontWeight: 400,
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: "'kern' 1, 'liga' 1",
                  }}>
                    My expertise encompasses full-spectrum penetration testing of web applications—from manual exploitation techniques and custom tool development in <span style={{ color: '#8B0000', fontWeight: 500 }}>Go</span> to deep understanding of web architectures, authentication mechanisms, and OWASP Top 10 vulnerabilities. I focus on finding critical flaws that automated scanners miss.
                  </p>
                </>
              )}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: '48px' }}>
              {features.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '32px 24px',
                    borderRadius: '20px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(139,0,0,0.04) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {/* Icon Container */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    background: 'linear-gradient(135deg, rgba(139,0,0,0.12) 0%, rgba(139,0,0,0.06) 100%)',
                    border: '1px solid rgba(139,0,0,0.2)',
                  }}>
                    <span style={{ fontSize: '28px', display: 'block' }}>{item.icon || '💼'}</span>
                  </div>
                  <h4 style={{
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    color: '#ffffff',
                    fontWeight: 600,
                    marginBottom: '8px',
                    fontSize: '17px',
                    letterSpacing: '0.01em',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{ 
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    color: 'rgba(255,255,255,0.6)', 
                    fontSize: '14px',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    margin: 0,
                  }}>{item.description || ''}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px 44px',
                  borderRadius: '14px',
                  fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #8B0000 0%, #6d0000 100%)',
                  boxShadow: '0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(139,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
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
        console.log('Fetched experiences:', data);
        setExperiences(data || []);
      } catch (error) {
        console.error('Error loading experiences:', error);
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
      className="lg:py-40"
    >
      <div style={{ position: 'relative' }}>
        {/* Premium Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #8B0000 50%, transparent 100%)',
            opacity: 0.5,
          }} />
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
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 24px)',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
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
                Professional Track Record
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textRendering: 'optimizeLegibility',
            }}>
              Professional <span style={{ color: '#8B0000' }}>Experience</span>
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Center line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              transform: 'translateX(-50%)',
              display: 'none',
              background: 'linear-gradient(to bottom, transparent, #8B0000 10%, #8B0000 90%, transparent)',
            }} className="hidden lg:block" />

            {/* Mobile line */}
            <div style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, #8B0000 10%, #8B0000 90%, transparent)',
            }} className="lg:hidden" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {loading && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 0',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  <p style={{ fontSize: '18px' }}>Loading experiences...</p>
                </div>
              )}
              {!loading && experiences.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '80px 0',
                  color: 'rgba(255,255,255,0.5)',
                }}>
                  <p style={{ fontSize: '18px', marginBottom: '16px' }}>No experience entries found.</p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
                    <Link href="/admin" style={{ color: '#8B0000', textDecoration: 'underline' }}>
                      Add experience
                    </Link> in the admin panel.
                  </p>
                </div>
              )}
              {!loading && experiences.map((exp, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.6s ease ${index * 100}ms`,
                  }}
                >
                  {/* Timeline node */}
                  <div style={{
                    position: 'absolute',
                    left: '24px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    background: exp.highlight ? '#8B0000' : '#1a1a1a',
                    border: '3px solid #8B0000',
                  }} className="md:left-8 lg:left-1/2">
                    {exp.highlight && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: '#8B0000',
                        opacity: 0.3,
                      }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{
                    marginLeft: '64px',
                    width: 'calc(100% - 64px)',
                  }} className="lg:ml-0 lg:w-[calc(50%-40px)] lg:mr-auto lg:pr-8">
                    <div
                      style={{
                        padding: '32px',
                        borderRadius: '24px',
                        transition: 'all 0.3s ease',
                        background: exp.highlight 
                          ? 'linear-gradient(135deg, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0.05) 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                        border: exp.highlight ? '1px solid rgba(139,0,0,0.3)' : '1px solid rgba(255,255,255,0.05)',
                    boxShadow: exp.highlight 
                      ? 'inset 0 1px 0 rgba(255,255,255,0.03)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.02)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Period badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{
                          padding: '6px 16px',
                          borderRadius: '9999px',
                          fontSize: '14px',
                          fontWeight: 600,
                          background: 'rgba(139,0,0,0.15)',
                          color: '#8B0000',
                        }}>
                          {exp.period}
                        </span>
                        {exp.highlight && (
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '12px',
                            fontWeight: 500,
                            background: '#8B0000',
                            color: '#ffffff',
                          }}>
                            Current
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '8px',
                        letterSpacing: '-0.01em',
                      }}>
                        {exp.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                        color: '#8B0000',
                        fontWeight: 500,
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '16px',
                        letterSpacing: '0.01em',
                      }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        {exp.company}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.8,
                        marginBottom: '24px',
                        fontSize: '16px',
                        letterSpacing: '-0.01em',
                        fontWeight: 400,
                        textRendering: 'optimizeLegibility',
                        fontFeatureSettings: "'kern' 1, 'liga' 1",
                      }}>
                        {exp.description}
                      </p>

                      {/* Skills */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {exp.skills.map((skill, i) => (
                            <span key={i} style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '14px',
                              color: 'rgba(255,255,255,0.7)',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.08)',
                            }}>
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
    degree: 'Master of Science in Cybersecurity',
    institution: 'University of Technology',
    period: '2017 - 2019',
    description: 'Specialized in offensive security and malware analysis. Graduated with distinction.',
    icon: '🎓',
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'State University',
    period: '2013 - 2017',
    description: 'Focused on software engineering and network security fundamentals.',
    icon: '📚',
  },
];

const certifications = [
  { name: 'OSCP', fullName: 'Offensive Security Certified Professional', year: '2024', color: '#8B0000' },
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
        console.error('Error loading education:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEducation();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
      className="lg:py-40"
    >
      <div style={{ position: 'relative' }}>
        {/* Premium Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #8B0000 50%, transparent 100%)',
            opacity: 0.5,
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.015,
            backgroundImage: `radial-gradient(rgba(139,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 24px)',
        }}>
          {/* Certifications */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}>
              <div style={{ marginBottom: '48px' }}>
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
                  <span style={{ fontSize: '20px' }}>🏆</span>
                  <span style={{
                    color: '#8B0000',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    Certifications
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}>
                  Professional <span style={{ color: '#8B0000' }}>Credentials</span>
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
              }} className="sm:grid-cols-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '24px',
                      borderRadius: '24px',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0.05) 100%)',
                      border: '1px solid rgba(139,0,0,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      background: 'linear-gradient(135deg, #8B0000 0%, #a31515 100%)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '14px',
                        letterSpacing: '0.01em',
                      }}>
                        {cert.name}
                      </span>
                    </div>
                    <h4 style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '14px',
                      marginBottom: '4px',
                      lineHeight: 1.3,
                      letterSpacing: '0.01em',
                    }}>
                      {cert.fullName}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '12px',
                      letterSpacing: '0.01em',
                      fontWeight: 500,
                    }}>
                      {cert.year === 'in view' ? 'In View' : cert.year}
                    </p>
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
// SERVICES SECTION - Premium Redesign
// ============================================
const services = [
  {
    icon: '🌐',
    title: 'Web Application Penetration Testing',
    description: 'Comprehensive offensive security testing of web applications. I conduct deep reconnaissance, manual vulnerability exploitation, and proof-of-concept development to identify critical security flaws including injection attacks, authentication bypasses, and authorization vulnerabilities.',
    features: ['Manual Exploitation', 'OWASP Top 10 Testing', 'Proof-of-Concept Development'],
  },
  {
    icon: '🔌',
    title: 'API Security Testing',
    description: 'Specialized penetration testing of REST and GraphQL APIs. I identify authentication bypasses, authorization flaws, insecure direct object references, and data exposure vulnerabilities through manual testing and custom tooling.',
    features: ['REST API Testing', 'GraphQL Security', 'Authentication Bypass'],
  },
  {
    icon: '🛠️',
    title: 'Custom Security Tool Development',
    description: 'Develop custom web application security testing tools in Go to automate vulnerability identification, payload generation, and exploitation during penetration testing engagements.',
    features: ['Go/Golang Development', 'Security Testing Tools', 'Custom Payloads'],
  },
  {
    icon: '🔍',
    title: 'Deep Vulnerability Analysis',
    description: 'Thorough analysis of web application vulnerabilities including injection flaws, broken authentication, sensitive data exposure, and other OWASP Top 10 risks. I go beyond automated scanners to find complex, chained vulnerabilities.',
    features: ['Vulnerability Chaining', 'Deep Code Analysis', 'Exploitation Techniques'],
  },
];

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
      className="lg:py-40"
    >
      <div style={{ position: 'relative' }}>
        {/* Premium Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #8B0000 50%, transparent 100%)',
            opacity: 0.5,
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(139,0,0,0.05) 0%, transparent 60%)',
          }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 24px)',
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
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
              <span style={{ fontSize: '20px' }}>⚡</span>
              <span style={{
                color: '#8B0000',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                My Approach
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textRendering: 'optimizeLegibility',
            }}>
              Security Assessment <span style={{ color: '#8B0000' }}>Services</span>
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              maxWidth: '900px',
              margin: '0 auto',
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              lineHeight: 1.75,
              letterSpacing: '-0.012em',
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontWeight: 400,
              textRendering: 'optimizeLegibility',
              fontFeatureSettings: "'kern' 1, 'liga' 1",
            }}>
              Specialized in offensive security testing of web applications. I conduct comprehensive penetration testing to identify critical vulnerabilities through manual exploitation, deep vulnerability analysis, and custom tool development. My approach goes beyond automated scanners to find complex, chained vulnerabilities that pose real threats.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  padding: '48px 40px',
                  borderRadius: '24px',
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${index * 50}ms`,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(139,0,0,0.04) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                }}
              >
                {/* Hover gradient */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  opacity: 0,
                  transition: 'opacity 0.5s ease',
                  background: 'linear-gradient(135deg, rgba(139,0,0,0.1) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} className="group-hover:opacity-100" />

                <div style={{ position: 'relative', zIndex: 10 }}>
                  {/* Icon */}
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    background: 'linear-gradient(135deg, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0.08) 100%)',
                    border: '1px solid rgba(139,0,0,0.25)',
                  }}>
                    <span style={{ fontSize: '36px' }}>{service.icon}</span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.8,
                    marginBottom: '24px',
                    fontSize: '16px',
                    letterSpacing: '-0.01em',
                    fontWeight: 400,
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: "'kern' 1, 'liga' 1",
                  }}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.features.map((feature, i) => (
                      <span key={i} style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 500,
                        background: 'rgba(139,0,0,0.1)',
                        color: '#8B0000',
                        border: '1px solid rgba(139,0,0,0.2)',
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  position: 'absolute',
                  top: '32px',
                  right: '32px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  background: 'rgba(139,0,0,0.15)',
                  border: '1px solid rgba(139,0,0,0.2)',
                }} className="group-hover:opacity-100 group-hover:translate-x-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2">
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 120px) 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
      className="lg:py-40"
    >
      <div style={{ position: 'relative' }}>
        {/* Premium Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #8B0000 50%, transparent 100%)',
            opacity: 0.5,
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(139,0,0,0.15) 0%, transparent 70%)',
            opacity: 0.6,
          }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '896px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 24px)',
          textAlign: 'center',
        }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              borderRadius: '9999px',
              marginBottom: '32px',
              background: 'rgba(139,0,0,0.1)',
              border: '1px solid rgba(139,0,0,0.2)',
            }}>
              <span style={{ fontSize: '20px' }}>🚀</span>
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

            <h2 style={{
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '24px',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              textRendering: 'optimizeLegibility',
            }}>
              Let&apos;s <span style={{ color: '#8B0000' }}>Discuss</span><br />Your Security Needs
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              marginBottom: '48px',
              maxWidth: '720px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.75,
              letterSpacing: '-0.012em',
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontWeight: 400,
              textRendering: 'optimizeLegibility',
              fontFeatureSettings: "'kern' 1, 'liga' 1",
            }}>
              I provide expert offensive security testing services for web applications. Through comprehensive penetration testing, deep vulnerability analysis, and custom exploitation techniques, I identify critical security flaws that automated tools miss. My findings enable organizations to address vulnerabilities before they can be exploited.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }} className="sm:flex-row">
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px 44px',
                  borderRadius: '14px',
                  fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #8B0000 0%, #6d0000 100%)',
                  boxShadow: '0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(139,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
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
