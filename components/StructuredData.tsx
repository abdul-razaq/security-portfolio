export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Security Professional',
    jobTitle: 'Penetration Tester | Offensive Security Specialist | Application Security Engineer',
    description:
      'Expert offensive security professional specializing in penetration testing, offensive security, and application security engineering.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    sameAs: [
      'https://github.com',
      'https://linkedin.com',
      'https://twitter.com',
    ],
    knowsAbout: [
      'Penetration Testing',
      'Offensive Security',
      'Application Security',
      'Network Security',
      'Cloud Security',
      'Web Application Security',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

