'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getSkills, type Skill } from '@/lib/api';

interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      try {
        const skills = await getSkills();
        console.log('Fetched skills:', skills);
        console.log('Skills length:', skills?.length);
        
        if (!skills || skills.length === 0) {
          console.warn('No skills returned from API');
          setSkillCategories([]);
          setLoading(false);
          return;
        }
        
        // Group skills by category
        const categoryMap = new Map<string, SkillCategory>();
        
        skills.forEach((skill) => {
          const category = skill.category || 'Other';
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
          const order = ['Offensive Security', 'API Security', 'Tool Development', 'Methodologies'];
          const aIndex = order.indexOf(a.category);
          const bIndex = order.indexOf(b.category);
          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        
        console.log('Categories created:', categories);
        setSkillCategories(categories);
      } catch (error) {
        console.error('Error loading skills:', error);
        setSkillCategories([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Offensive Security': '🌐',
      'API Security': '🔌',
      'Tool Development': '🛠️',
      'Methodologies': '📋',
    };
    return icons[category] || '💼';
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
        
        {/* Animated gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 70%)',
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.04) 0%, transparent 70%)',
          opacity: 0.6,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 70%)',
          opacity: 0.6,
        }} />
        
        {/* Enhanced grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.02,
          backgroundImage: `linear-gradient(rgba(139,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.3) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
        
        {/* Subtle scan lines effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,0,0,0.02) 2px, rgba(139,0,0,0.02) 4px)',
          pointerEvents: 'none',
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
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            borderRadius: '9999px',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, rgba(139,0,0,0.15) 0%, rgba(139,0,0,0.08) 100%)',
            border: '1px solid rgba(139,0,0,0.3)',
            boxShadow: '0 4px 20px rgba(139,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B0000 0%, #a31515 100%)',
              boxShadow: '0 0 12px rgba(139,0,0,0.8), 0 0 24px rgba(139,0,0,0.4)',
            }} />
            <span style={{
              color: '#8B0000',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Expertise & Mastery
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            textRendering: 'optimizeLegibility',
          }}>
            Offensive Security <span style={{ 
              color: '#8B0000',
              background: 'linear-gradient(135deg, #8B0000 0%, #a31515 50%, #8B0000 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Skills</span>
          </h1>
          <p style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.75,
            letterSpacing: '-0.012em',
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            fontWeight: 400,
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: "'kern' 1, 'liga' 1",
          }}>
            Expertise in offensive security methodologies, vulnerability testing, and security tool creation. 
            Mastery honed through years of conducting security assessments of web applications.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{
              display: 'inline-block',
              width: '56px',
              height: '56px',
              border: '4px solid rgba(139,0,0,0.2)',
              borderTopColor: '#8B0000',
              borderRadius: '50%',
            }} />
          </div>
        )}

        {/* Skills Categories */}
        {!loading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
          }}>
            {skillCategories.length === 0 && !loading && (
              <div style={{
                textAlign: 'center',
                padding: '120px 0',
                color: 'rgba(255,255,255,0.5)',
              }}>
                <p style={{ fontSize: '20px', marginBottom: '16px' }}>No skills found.</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>
                  <Link href="/admin" style={{ color: '#8B0000', textDecoration: 'underline' }}>
                    Add skills
                  </Link> in the admin panel.
                </p>
              </div>
            )}
          {skillCategories.map((category, categoryIndex) => (
              <div
              key={category.category}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {/* Category Header - Enhanced */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  marginBottom: '56px',
                  padding: '32px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(139,0,0,0.1) 0%, rgba(139,0,0,0.03) 100%)',
                  border: '1px solid rgba(139,0,0,0.2)',
                  boxShadow: '0 4px 16px rgba(139,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Animated background accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(180deg, #8B0000 0%, rgba(139,0,0,0.5) 50%, transparent 100%)',
                    boxShadow: '0 0 8px rgba(139,0,0,0.4)',
                  }} />
                  
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    background: 'linear-gradient(135deg, rgba(139,0,0,0.2) 0%, rgba(139,0,0,0.1) 100%)',
                    border: '2px solid rgba(139,0,0,0.3)',
                    boxShadow: '0 4px 16px rgba(139,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: '-4px',
                      borderRadius: '24px',
                      background: 'linear-gradient(135deg, rgba(139,0,0,0.2), transparent)',
                      opacity: 0.4,
                    }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>{category.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      marginBottom: '8px',
                    }}>
                {category.category}
                    </h2>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #8B0000 0%, transparent 100%)',
                        boxShadow: '0 0 4px rgba(139,0,0,0.3)',
                      }} />
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.4)',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                      }}>
                        {category.skills.length} {category.skills.length === 1 ? 'Skill' : 'Skills'}
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
                        position: 'relative',
                        padding: '32px',
                        borderRadius: '24px',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.05)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139,0,0,0.06) 0%, rgba(255,255,255,0.02) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)';
                      }}
                    >
                      {/* Hover glow effect */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(139,0,0,0.05) 0%, transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: 'none',
                      }} className="group-hover:opacity-100" />
                      
                      {/* Top accent line */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: `linear-gradient(90deg, transparent 0%, rgba(139,0,0,${skill.level / 100 * 0.6}) 50%, transparent 100%)`,
                        opacity: 0.5,
                      }} />

                      {/* Skill Name & Level */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '20px',
                      }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          color: '#ffffff',
                          lineHeight: 1.3,
                          letterSpacing: '-0.01em',
                        }}>
                          {skill.name}
                        </h3>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          background: 'rgba(139,0,0,0.15)',
                          border: '1px solid rgba(139,0,0,0.3)',
                        }}>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#8B0000',
                          }}>
                        {skill.level}%
                      </span>
                    </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '12px',
                        borderRadius: '9999px',
                        background: 'rgba(255,255,255,0.05)',
                        marginBottom: '20px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
                      }}>
                        {/* Progress bar glow */}
                        <div
                          style={{
                            height: '100%',
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, 
                              #8B0000 0%, 
                              #a31515 30%,
                              #8B0000 60%,
                              #dc2626 100%
                            )`,
                            backgroundSize: '200% 100%',
                            borderRadius: '9999px',
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            transitionDelay: `${(categoryIndex * 150) + (skillIndex * 100)}ms`,
                            boxShadow: `
                              0 0 20px rgba(139,0,0,0.6),
                              0 0 40px rgba(139,0,0,0.3),
                              inset 0 1px 0 rgba(255,255,255,0.2)
                            `,
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          className={isVisible ? '' : ''}
                        >
                          {/* Animated shine effect */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                          }} />
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.7,
                        fontWeight: 400,
                      }}>
                        {skill.description}
                      </p>

                      {/* Skill level indicator dots */}
                      <div style={{
                        display: 'flex',
                        gap: '4px',
                        marginTop: '16px',
                        justifyContent: 'flex-end',
                      }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: i < Math.ceil(skill.level / 20) 
                                ? '#8B0000' 
                                : 'rgba(255,255,255,0.1)',
                              boxShadow: i < Math.ceil(skill.level / 20)
                                ? '0 0 8px rgba(139,0,0,0.6)'
                                : 'none',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
