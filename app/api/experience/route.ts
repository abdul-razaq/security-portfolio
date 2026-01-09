import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Default experiences to always return (most recent first)
const DEFAULT_EXPERIENCES = [
  {
    _id: 'default-3',
    title: 'Engineering Manager & Web App Penetration Tester',
    company: 'StraitPay',
    period: '2023 - Present',
    description: 'Leading engineering teams and delivering expert offensive security services for web applications. I architect and execute comprehensive security assessment programs, manage complex penetration testing engagements, and provide strategic security leadership. My work involves identifying critical vulnerabilities that automated tools miss, developing custom security testing methodologies, and guiding organizations in strengthening their security posture.',
    skills: ['Engineering Management', 'Web App Penetration Testing', 'Security Leadership', 'Strategic Security Consulting'],
    highlight: true,
    order: 3,
  },
  {
    _id: 'default-2',
    title: 'Web App Penetration Tester',
    company: 'Belema Fintech',
    period: '2022 - 2023',
    description: 'Delivered expert offensive security testing services for financial web applications. I led comprehensive penetration testing engagements, developed advanced manual exploitation techniques, and provided detailed security assessments. My expertise enabled the identification of critical vulnerabilities in high-value financial systems, with findings directly informing security remediation strategies.',
    skills: ['Offensive Security', 'Web App Penetration Testing', 'Manual Exploitation', 'Financial Security'],
    highlight: false,
    order: 2,
  },
  {
    _id: 'default-1',
    title: 'Security Specialist',
    company: 'The GIG Group',
    period: '2020 - 2022',
    description: 'Provided specialized security assessment services for web applications. I executed comprehensive penetration testing programs, identified critical security vulnerabilities, and delivered actionable remediation guidance to development teams. My work contributed to significant improvements in application security posture across multiple product lines.',
    skills: ['Web App Security', 'Penetration Testing', 'Vulnerability Assessment', 'Security Consulting'],
    highlight: false,
    order: 1,
  },
];

export async function GET() {
  try {
    const experiences = await client.fetch(
      `*[_type == "experience"] | order(order desc) {
        _id,
        title,
        company,
        period,
        description,
        skills,
        highlight,
        order
      }`
    ).catch(() => null);

    // Use Sanity experiences if they exist and have data, otherwise use defaults
    const experiencesToReturn = (experiences && Array.isArray(experiences) && experiences.length > 0) 
      ? experiences 
      : DEFAULT_EXPERIENCES;

    return NextResponse.json({ experiences: experiencesToReturn }, { status: 200 });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    // Always return default experiences on error
    return NextResponse.json({ experiences: DEFAULT_EXPERIENCES }, { status: 200 });
  }
}
