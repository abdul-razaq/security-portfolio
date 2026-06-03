export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'AbdulRazaq Suleiman',
    alternateName: 'Ant1g3n',
    jobTitle: 'Application Security Engineer',
    description:
      'Application Security Engineer specializing in Secure SDLC, Threat Modeling, Product Security, DevSecOps, and Offensive Security testing.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    sameAs: [
      'https://x.com/ant1g3n',
      'https://github.com',
      'https://linkedin.com',
    ],
    knowsAbout: [
      'Application Security',
      'Secure SDLC',
      'Threat Modeling',
      'Product Security',
      'DevSecOps',
      'Offensive Security',
      'Penetration Testing',
      'Web Application Security',
      'API Security',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
