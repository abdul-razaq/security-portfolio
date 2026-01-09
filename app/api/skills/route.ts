import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Default fallback skills for web app penetration testing
const DEFAULT_SKILLS = [
  // Offensive Security Tools & Techniques
  { _id: 'default-1', name: 'Burp Suite', level: 90, description: 'Advanced web application security testing and vulnerability scanning', category: 'Offensive Security', icon: '🔍', order: 1 },
  { _id: 'default-2', name: 'OWASP ZAP', level: 85, description: 'Open-source web application security scanner', category: 'Offensive Security', icon: '🛡️', order: 2 },
  { _id: 'default-3', name: 'Manual Exploitation', level: 88, description: 'Hands-on vulnerability exploitation and proof-of-concept development', category: 'Offensive Security', icon: '⚡', order: 3 },
  { _id: 'default-4', name: 'SQL Injection', level: 90, description: 'Advanced SQL injection techniques and database exploitation', category: 'Offensive Security', icon: '💉', order: 4 },
  { _id: 'default-5', name: 'XSS (Cross-Site Scripting)', level: 87, description: 'Reflected, stored, and DOM-based XSS exploitation', category: 'Offensive Security', icon: '🎯', order: 5 },
  { _id: 'default-6', name: 'Authentication Bypass', level: 85, description: 'Session management flaws and authentication bypass techniques', category: 'Offensive Security', icon: '🔓', order: 6 },
  { _id: 'default-7', name: 'Authorization Flaws', level: 86, description: 'IDOR, privilege escalation, and access control vulnerabilities', category: 'Offensive Security', icon: '🚪', order: 7 },
  { _id: 'default-8', name: 'File Upload Vulnerabilities', level: 82, description: 'Unrestricted file upload and remote code execution', category: 'Offensive Security', icon: '📁', order: 8 },
  
  // API Security
  { _id: 'default-9', name: 'REST API Testing', level: 88, description: 'Comprehensive REST API security assessment and testing', category: 'API Security', icon: '🔌', order: 9 },
  { _id: 'default-10', name: 'GraphQL Security', level: 80, description: 'GraphQL endpoint testing and vulnerability assessment', category: 'API Security', icon: '📊', order: 10 },
  { _id: 'default-11', name: 'JWT Token Manipulation', level: 85, description: 'JSON Web Token vulnerabilities and exploitation', category: 'API Security', icon: '🎫', order: 11 },
  { _id: 'default-12', name: 'API Authentication Bypass', level: 83, description: 'API key vulnerabilities and authentication mechanism flaws', category: 'API Security', icon: '🔑', order: 12 },
  
  // Tool Development
  { _id: 'default-13', name: 'Go (Golang)', level: 85, description: 'Custom security tool development in Go', category: 'Tool Development', icon: '🦫', order: 13 },
  { _id: 'default-15', name: 'JavaScript', level: 85, description: 'Web application security testing and client-side exploitation', category: 'Tool Development', icon: '📜', order: 14 },
  { _id: 'default-14', name: 'Python', level: 82, description: 'Security automation and penetration testing scripts', category: 'Tool Development', icon: '🐍', order: 15 },
  { _id: 'default-16', name: 'Custom Payload Development', level: 87, description: 'Creating custom exploits and proof-of-concept tools', category: 'Tool Development', icon: '🛠️', order: 16 },
  
  // Methodologies
  { _id: 'default-17', name: 'OWASP Top 10', level: 90, description: 'Deep understanding of OWASP Top 10 vulnerabilities', category: 'Methodologies', icon: '📋', order: 17 },
  { _id: 'default-18', name: 'Penetration Testing Methodology', level: 88, description: 'Structured approach to web app security assessment', category: 'Methodologies', icon: '🎯', order: 18 },
  { _id: 'default-19', name: 'Vulnerability Assessment', level: 87, description: 'Systematic identification and classification of security flaws', category: 'Methodologies', icon: '🔍', order: 19 },
  { _id: 'default-20', name: 'Security Testing Lifecycle', level: 85, description: 'End-to-end security testing process and reporting', category: 'Methodologies', icon: '🔄', order: 20 },
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
