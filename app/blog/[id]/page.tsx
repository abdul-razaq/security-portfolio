'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, type BlogPost } from '@/lib/api';
import { portableTextToMarkdown } from '@/lib/portableText';

export default function BlogPostPage() {
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = params.id as string;

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        const fetchedPost = await getBlogPost(slug);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <section style={{
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            width: '48px',
            height: '48px',
            border: '3px solid rgba(139,0,0,0.3)',
            borderTopColor: '#8B0000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
        </div>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  if (!post) {
    return (
      <section style={{
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Post Not <span style={{ color: '#8B0000' }}>Found</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 500,
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #8B0000 0%, #6d0000 100%)',
              color: '#ffffff',
            }}
          >
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Parse content into structured format
  const parseContent = (content: any) => {
    if (!content) return [];
    
    // If content is already a string (markdown), split it
    if (typeof content === 'string') {
      const lines = content.split('\n');
      const parsed: Array<{ type: string; content: string; level?: number; meta?: any }> = [];
      let i = 0;
      
      while (i < lines.length) {
        const line = lines[i];
        
        if (line.startsWith('# ')) {
          parsed.push({ type: 'h1', content: line.replace('# ', '') });
          i++;
          continue;
        }
        if (line.startsWith('## ')) {
          parsed.push({ type: 'h2', content: line.replace('## ', '') });
          i++;
          continue;
        }
        if (line.startsWith('### ')) {
          parsed.push({ type: 'h3', content: line.replace('### ', '') });
          i++;
          continue;
        }
        if (line.startsWith('> ')) {
          parsed.push({ type: 'blockquote', content: line.replace('> ', '') });
          i++;
          continue;
        }
        if (line.startsWith('```')) {
          const lang = line.replace('```', '').trim() || 'text';
          const codeLines: string[] = [];
          i++;
          while (i < lines.length && !lines[i].startsWith('```')) {
            codeLines.push(lines[i]);
            i++;
          }
          parsed.push({ type: 'codeblock', content: codeLines.join('\n'), meta: { lang } });
          if (i < lines.length && lines[i].startsWith('```')) {
            i++;
          }
          continue;
        }
        if (line.startsWith('- ')) {
          parsed.push({ type: 'li', content: line.replace('- ', '') });
          i++;
          continue;
        }
        if (line.startsWith('![')) {
          const match = line.match(/!\[(.*?)\]\((.*?)\)/);
          if (match) {
            parsed.push({ type: 'image', content: match[2], meta: { alt: match[1] } });
            i++;
            continue;
          }
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          parsed.push({ type: 'strong', content: line.replace(/\*\*/g, '') });
          i++;
          continue;
        }
        if (line.trim() === '') {
          parsed.push({ type: 'spacer', content: '' });
          i++;
          continue;
        }
        {
          parsed.push({ type: 'p', content: line });
          i++;
        }
      }
      
      return parsed;
    }
    
    // If content is Portable Text, convert to markdown first
    const markdown = portableTextToMarkdown(content);
    return parseContent(markdown);
  };

  const parsedContent = parseContent(post.content);

  return (
    <article
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 12vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(139,0,0,0.2)',
        zIndex: 100,
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #8B0000 0%, #a31515 100%)',
          transition: 'width 0.1s ease',
          boxShadow: '0 0 10px rgba(139,0,0,0.5)',
        }} />
      </div>

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
          top: '10%',
          left: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,0,0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'float 25s ease-in-out infinite reverse',
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
        {/* Back Button */}
        <div style={{
          marginBottom: '48px',
          transition: 'all 1s ease',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              borderRadius: '12px',
              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              letterSpacing: '-0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8B0000';
              e.currentTarget.style.gap = '14px';
              e.currentTarget.style.background = 'rgba(139,0,0,0.1)';
              e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.gap = '10px';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <header style={{
          marginBottom: '64px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(139,0,0,0.2)',
          transition: 'all 1s ease 0.2s',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        }}>
          {/* Category Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '24px',
          }}>
            {((Array.isArray(post.category) ? post.category : (post.category ? [post.category] : [])).filter(Boolean)).map((cat, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: 'rgba(139,0,0,0.15)',
                  color: '#8B0000',
                  border: '1px solid rgba(139,0,0,0.25)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#8B0000',
                  boxShadow: '0 0 8px rgba(139,0,0,0.6)',
                }} />
                {cat}
              </div>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '32px',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: "'kern' 1, 'liga' 1",
          }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '32px',
            fontWeight: 400,
            letterSpacing: '-0.012em',
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: "'kern' 1, 'liga' 1",
          }}>
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            padding: '24px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            {/* Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8B0000 0%, #a31515 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(139,0,0,0.3)',
              }}>
                AS
              </div>
              <div>
              <div style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '2px',
                letterSpacing: '0.01em',
              }}>
                Written by
              </div>
                <div style={{
                  fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}>
                  {post.author || 'AbdulRazaq Suleiman'}
                </div>
              </div>
            </div>

            <div style={{
              width: '1px',
              height: '32px',
              background: 'rgba(255,255,255,0.1)',
            }} />

            {/* Date */}
            <div>
              <div style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '2px',
                letterSpacing: '0.01em',
              }}>
                Published
              </div>
              <div style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '-0.01em',
              }}>
                {formatDate(post.publishedAt)}
              </div>
            </div>

            <div style={{
              width: '1px',
              height: '32px',
              background: 'rgba(255,255,255,0.1)',
            }} />

            {/* Read Time */}
            <div>
              <div style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '2px',
                letterSpacing: '0.01em',
              }}>
                Reading time
              </div>
              <div style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '-0.01em',
              }}>
                {post.readTime || '5 min read'}
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '32px',
            }}>
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '-0.005em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139,0,0,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                    e.currentTarget.style.color = '#8B0000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div style={{
          transition: 'all 1s ease 0.4s',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        }}>
          <div style={{
            fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(18px, 2.2vw, 21px)',
            lineHeight: 1.95,
            color: 'rgba(255,255,255,0.95)',
            textRendering: 'optimizeLegibility',
            fontFeatureSettings: "'kern' 1, 'liga' 1",
            letterSpacing: '-0.01em',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontWeight: 400,
            maxWidth: '820px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '4px',
            paddingRight: '4px',
          }}>
            {parsedContent.map((item, i) => {
              if (item.type === 'h1') {
                return (
                  <h1
                    key={i}
                    style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      fontSize: 'clamp(36px, 4vw, 46px)',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginTop: '64px',
                      marginBottom: '28px',
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em',
                      position: 'relative',
                      paddingLeft: '20px',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.3em',
                      width: '4px',
                      height: '0.8em',
                      background: 'linear-gradient(180deg, #8B0000 0%, rgba(139,0,0,0.3) 100%)',
                      borderRadius: '2px',
                    }} />
                    {item.content}
                  </h1>
                );
              }
              if (item.type === 'h2') {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      fontSize: 'clamp(28px, 3.5vw, 36px)',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginTop: '56px',
                      marginBottom: '24px',
                      lineHeight: 1.35,
                      letterSpacing: '-0.015em',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                    }}
                  >
                    {item.content}
                  </h2>
                );
              }
              if (item.type === 'h3') {
                return (
                  <h3
                    key={i}
                    style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      fontSize: 'clamp(22px, 2.8vw, 26px)',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginTop: '40px',
                      marginBottom: '18px',
                      lineHeight: 1.4,
                      letterSpacing: '-0.01em',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                    }}
                  >
                    {item.content}
                  </h3>
                );
              }
              if (item.type === 'blockquote') {
                return (
                  <blockquote
                    key={i}
                    style={{
                      margin: '32px 0',
                      padding: '20px 24px',
                      borderLeft: '3px solid rgba(139,0,0,0.5)',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '12px',
                      color: 'rgba(255,255,255,0.85)',
                      fontStyle: 'italic',
                      lineHeight: 1.9,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.content}
                  </blockquote>
                );
              }
              if (item.type === 'li') {
                return (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      marginLeft: '26px',
                      marginBottom: '16px',
                      paddingLeft: '8px',
                      position: 'relative',
                      lineHeight: 1.95,
                      letterSpacing: '-0.01em',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                      color: 'rgba(255,255,255,0.95)',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      fontWeight: 400,
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '0.8em',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#8B0000',
                      boxShadow: '0 0 8px rgba(139,0,0,0.5)',
                    }} />
                    {item.content}
                  </li>
                );
              }
              if (item.type === 'strong') {
                return (
                  <strong
                    key={i}
                    style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      color: '#ffffff',
                      fontWeight: 600,
                      letterSpacing: '-0.005em',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility',
                    }}
                  >
                    {item.content}
                  </strong>
                );
              }
              if (item.type === 'spacer') {
                return <div key={i} style={{ height: '28px' }} />;
              }
              if (item.type === 'codeblock') {
                return (
                  <pre
                    key={i}
                    style={{
                      margin: '32px 0',
                      padding: '18px 20px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      overflowX: 'auto',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontSize: '0.95em',
                      lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    <code>{item.content}</code>
                  </pre>
                );
              }
              if (item.type === 'image') {
                return (
                  <div
                    key={i}
                    style={{
                      margin: '36px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img
                      src={item.content}
                      alt={(item.meta && item.meta.alt) || ''}
                      style={{
                        maxWidth: '100%',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                      }}
                    />
                    {item.meta && item.meta.alt && (
                      <span
                        style={{
                          fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.5)',
                          letterSpacing: '-0.005em',
                        }}
                      >
                        {item.meta.alt}
                      </span>
                    )}
                  </div>
                );
              }
              if (item.type === 'p') {
                // Check for bold text within paragraph
                const parts = item.content.split(/(\*\*.*?\*\*)/g);
                return (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                      marginBottom: '30px',
                      lineHeight: 1.98,
                      letterSpacing: '-0.01em',
                      textRendering: 'optimizeLegibility',
                      fontFeatureSettings: "'kern' 1, 'liga' 1",
                      color: 'rgba(255,255,255,0.95)',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      fontWeight: 400,
                    }}
                  >
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong
                            key={j}
                            style={{
                              fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                              color: '#ffffff',
                              fontWeight: 600,
                              letterSpacing: '-0.005em',
                              WebkitFontSmoothing: 'antialiased',
                              MozOsxFontSmoothing: 'grayscale',
                              textRendering: 'optimizeLegibility',
                            }}
                          >
                            {part.replace(/\*\*/g, '')}
                          </strong>
                        );
                      }
                      if (/`[^`]+`/.test(part)) {
                        const segments = part.split(/(`[^`]+`)/g);
                        return segments.map((seg, k) => {
                          if (seg.startsWith('`') && seg.endsWith('`')) {
                            return (
                              <code
                                key={`${j}-${k}`}
                                style={{
                                  background: 'rgba(255,255,255,0.06)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  borderRadius: '6px',
                                  padding: '2px 6px',
                                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                  fontSize: '0.95em',
                                  color: 'rgba(255,255,255,0.9)',
                                }}
                              >
                                {seg.slice(1, -1)}
                              </code>
                            );
                          }
                          return (
                            <span 
                              key={`${j}-${k}`}
                              style={{
                                color: 'rgba(255,255,255,0.95)',
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                              }}
                            >
                              {seg}
                            </span>
                          );
                        });
                      }
                      return (
                        <span 
                          key={j}
                          style={{
                            color: 'rgba(255,255,255,0.95)',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                          }}
                        >
                          {part}
                        </span>
                      );
                    })}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Article Footer */}
        <footer style={{
          marginTop: '80px',
          paddingTop: '48px',
          borderTop: '1px solid rgba(139,0,0,0.2)',
          transition: 'all 1s ease 0.6s',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}>
            {/* Share Section */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}>
                Share this article
              </h3>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                {[
                  { name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', href: 'https://x.com/ant1g3n' },
                  { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', href: 'https://linkedin.com/in/abdulrazaq-suleiman' },
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
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.6)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(139,0,0,0.15)';
                      e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)';
                      e.currentTarget.style.color = '#8B0000';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    aria-label={`Share on ${social.name}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Back to Blog */}
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(139,0,0,0.08) 0%, rgba(139,0,0,0.02) 100%)',
              border: '1px solid rgba(139,0,0,0.2)',
              textAlign: 'center',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '20px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}>
                Enjoyed this article?
              </h3>
              <p style={{
                fontFamily: 'var(--font-satoshi), system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '24px',
                lineHeight: 1.7,
                letterSpacing: '-0.01em',
              }}>
                Explore more security articles and case studies.
              </p>
              <Link
                href="/blog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #8B0000 0%, #6d0000 100%)',
                  boxShadow: '0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(139,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(139,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                }}
              >
                <span>View All Articles</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </article>
  );
}
