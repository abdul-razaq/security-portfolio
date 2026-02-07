export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'AbdulRazaq Suleiman',
    jobTitle: 'Offensive Security Engineer - Web & APIs | Application Security Engineer',
    description:
      'Expert Offensive Security Engineer specializing in Web & APIs, Penetration Testing, and Application Security Engineering.',
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

