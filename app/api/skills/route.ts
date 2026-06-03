import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Default App Sec core skills
const DEFAULT_SKILLS = [
  // Defensive Security
  { _id: 'def-1', name: 'Secure SDLC', level: 95, description: 'Integrate security into every phase of software development from requirements to deployment.', category: 'Defensive Security', icon: '🔒', order: 1 },
  { _id: 'def-2', name: 'Threat Modeling', level: 90, description: 'Systematic risk identification using STRIDE, DREAD, and LINDDUN frameworks.', category: 'Defensive Security', icon: '🎯', order: 2 },
  { _id: 'def-3', name: 'Product Security', level: 88, description: 'Design and implement secure products with robust architectures and controls.', category: 'Defensive Security', icon: '📦', order: 3 },
  { _id: 'def-4', name: 'DevSecOps', level: 85, description: 'Embed security into CI/CD pipelines for automated vulnerability scanning.', category: 'Defensive Security', icon: '⚙️', order: 4 },
  { _id: 'def-5', name: 'Secure Code Review', level: 92, description: 'Manual and automated code audits to identify and remediate security vulnerabilities.', category: 'Defensive Security', icon: '🔍', order: 5 },
  { _id: 'def-6', name: 'Security Architecture', level: 87, description: 'Design and assess secure architectures for applications and APIs.', category: 'Defensive Security', icon: '🏗️', order: 6 },
  
  // Offensive Security
  { _id: 'off-1', name: 'Web Application Penetration Testing', level: 94, description: 'Comprehensive testing for injection, authentication bypass, and authorization flaws.', category: 'Offensive Security', icon: '🌐', order: 7 },
  { _id: 'off-2', name: 'API Security Testing', level: 91, description: 'Specialized testing for REST and GraphQL API vulnerabilities.', category: 'Offensive Security', icon: '🔌', order: 8 },
  { _id: 'off-3', name: 'Vulnerability Research', level: 86, description: 'Deep analysis to discover complex security flaws in applications and services.', category: 'Offensive Security', icon: '🔬', order: 9 },
  { _id: 'off-4', name: 'Exploit Development', level: 80, description: 'Creating proof-of-concept exploits to demonstrate real-world security risks.', category: 'Offensive Security', icon: '💣', order: 10 },
  
  // App Sec Tools
  { _id: 'tool-1', name: 'Burp Suite', level: 95, description: 'Comprehensive web vulnerability scanner and proxy for penetration testing.', category: 'App Sec Tools', icon: '🔧', order: 11 },
  { _id: 'tool-2', name: 'SAST / DAST / SCA', level: 90, description: 'Static, Dynamic, and Software Composition Analysis for automated security testing.', category: 'App Sec Tools', icon: '📊', order: 12 },
  { _id: 'tool-3', name: 'OWASP ZAP', level: 85, description: 'Open-source web application security scanner.', category: 'App Sec Tools', icon: '🛡️', order: 13 },
  { _id: 'tool-4', name: 'Go Programming', level: 88, description: 'Develop high-performance security tools in Go.', category: 'App Sec Tools', icon: '🐹', order: 14 },
  { _id: 'tool-5', name: 'Python for Security', level: 92, description: 'Build custom security tools and automation scripts.', category: 'App Sec Tools', icon: '🐍', order: 15 },
  { _id: 'tool-6', name: 'GitLab CI/CD', level: 87, description: 'Implement security gates in CI/CD pipelines.', category: 'App Sec Tools', icon: '🔲', order: 16 },
  
  // Methodologies & Frameworks
  { _id: 'meth-1', name: 'OWASP Top 10', level: 96, description: 'In-depth knowledge of critical web application security risks.', category: 'Methodologies & Frameworks', icon: '📜', order: 17 },
  { _id: 'meth-2', name: 'OWASP API Top 10', level: 93, description: 'Specialized security testing for API-specific vulnerabilities.', category: 'Methodologies & Frameworks', icon: '🔌', order: 18 },
  { _id: 'meth-3', name: 'NIST Cybersecurity Framework', level: 85, description: 'Industry-standard framework for managing cybersecurity risks.', category: 'Methodologies & Frameworks', icon: '🏛️', order: 19 },
  { _id: 'meth-4', name: 'MITRE ATT&CK', level: 82, description: 'Framework for adversary tactics, techniques, and procedures.', category: 'Methodologies & Frameworks', icon: '🎯', order: 20 },
];

export async function GET() {
  try {
    const skills = await client.fetch(
      `*[_type == "skill"] | order(order asc, level desc) {
        _id,
        name,
        level,
        description,
        category,
        icon,
        order
      }`
    ).catch(() => null);

    // Use Sanity skills if they exist and have data, otherwise use defaults
    const skillsToReturn = (skills && Array.isArray(skills) && skills.length > 0) 
      ? skills 
      : DEFAULT_SKILLS;

    return NextResponse.json({ skills: skillsToReturn }, { status: 200 });
  } catch (error) {
    console.error('Error fetching skills:', error);
    // Always return default skills on error
    return NextResponse.json({ skills: DEFAULT_SKILLS }, { status: 200 });
  }
}
