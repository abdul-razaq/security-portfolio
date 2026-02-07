import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const homePage = await client.fetch(
      `*[_type == "homePage"][0] {
        hero {
          greeting,
          firstName,
          lastName,
          description,
          roles
        },
        about {
          title,
          description,
          features
        },
        services {
          title,
          description,
          services
        }
      }`,
    );

    // Default fallback content
    const defaultContent = {
      hero: {
        greeting: "Hello, I'm",
        firstName: "AbdulRazaq",
        lastName: "Suleiman",
        description:
          "As an Application Security Engineer, I conduct deep reconnaissance, comprehensive enumeration, and thorough vulnerability analysis to identify and exploit security weaknesses. My expertise encompasses full-spectrum penetration testing of web applications, identifying and exploiting vulnerabilities that automated tools miss. I focus on the critical flaws that pose real threats to application security.",
        roles: [
          "Offensive Security Engineer - Web & APIs",
          "Application Security Engineer",
          "Web Application Penetration Tester",
          "Offensive Security Specialist",
          "Web Penetration Tester",
          "Security Tool Developer",
          "Go Developer",
          "Penetration Tester",
        ],
      },
      about: {
        title: "Offensive Security Engineer - Web & APIs",
        description:
          "I specialize exclusively in offensive security testing of web applications. Through deep reconnaissance, comprehensive enumeration, and thorough vulnerability analysis, I identify and exploit security weaknesses in web apps before malicious actors can.\n\nMy expertise encompasses full-spectrum penetration testing of web applications—from manual exploitation techniques and custom tool development in Go to deep understanding of web architectures, authentication mechanisms, and OWASP Top 10 vulnerabilities. I focus on finding critical flaws that automated scanners miss.",
        features: [
          {
            icon: "🌐",
            title: "Web App Penetration Testing",
            description: "Full-spectrum offensive security testing",
          },
          {
            icon: "⚡",
            title: "Manual Exploitation",
            description: "Deep vulnerability analysis & exploitation",
          },
          {
            icon: "🛠️",
            title: "Custom Tool Development",
            description: "Go-based security testing tools",
          },
          {
            icon: "🔍",
            title: "OWASP Top 10 Focus",
            description: "Critical web app vulnerabilities",
          },
        ],
      },
      services: {
        title: "Security Assessment Services",
        description:
          "Specialized in offensive security testing of web applications. I conduct comprehensive penetration testing to identify critical vulnerabilities through manual exploitation, deep vulnerability analysis, and custom tool development before malicious actors can exploit them.",
        services: [
          {
            icon: "🌐",
            title: "Web Application Penetration Testing",
            description:
              "Comprehensive offensive security testing of web applications. I conduct deep reconnaissance, manual vulnerability exploitation, and proof-of-concept development to identify critical security flaws including injection attacks, authentication bypasses, and authorization vulnerabilities.",
            features: [
              "Manual Exploitation",
              "OWASP Top 10 Testing",
              "Proof-of-Concept Development",
            ],
          },
          {
            icon: "🔌",
            title: "API Security Testing",
            description:
              "Specialized penetration testing of REST and GraphQL APIs. I identify authentication bypasses, authorization flaws, insecure direct object references, and data exposure vulnerabilities through manual testing and custom tooling.",
            features: [
              "REST API Testing",
              "GraphQL Security",
              "Authentication Bypass",
            ],
          },
          {
            icon: "🛠️",
            title: "Custom Security Tool Development",
            description:
              "Develop custom web application security testing tools in Go to automate vulnerability identification, payload generation, and exploitation during penetration testing engagements.",
            features: [
              "Go/Golang Development",
              "Security Testing Tools",
              "Custom Payloads",
            ],
          },
          {
            icon: "🔍",
            title: "Deep Vulnerability Analysis",
            description:
              "Thorough analysis of web application vulnerabilities including injection flaws, broken authentication, sensitive data exposure, and other OWASP Top 10 risks. I go beyond automated scanners to find complex, chained vulnerabilities.",
            features: [
              "Vulnerability Chaining",
              "Deep Code Analysis",
              "Exploitation Techniques",
            ],
          },
        ],
      },
    };

    // If no home page content exists, return default structure
    if (!homePage) {
      return NextResponse.json(defaultContent);
    }

    // Merge defaults with fetched data
    const mergedContent = {
      hero: {
        ...defaultContent.hero,
        ...(homePage.hero || {}),
      },
      about: homePage.about || defaultContent.about,
      services: homePage.services || defaultContent.services,
    };

    return NextResponse.json(mergedContent, { status: 200 });
  } catch (error) {
    console.error("Error fetching home page content:", error);
    // Return default content on error
    return NextResponse.json(
      {
        hero: {
          greeting: "Hello, I'm",
          firstName: "AbdulRazaq",
          lastName: "Suleiman",
          description:
            "As an Application Security Engineer, I conduct deep reconnaissance, comprehensive enumeration, and thorough vulnerability analysis to identify and exploit security weaknesses. My expertise encompasses full-spectrum penetration testing of web applications, helping organizations strengthen their security posture before malicious actors can exploit vulnerabilities.",
          roles: [
            "Offensive Security Engineer - Web & APIs",
            "Application Security Engineer",
            "Web Application Penetration Tester",
            "Offensive Security Specialist",
            "Web Penetration Tester",
            "Security Tool Developer",
            "Go Developer",
            "Penetration Tester",
          ],
        },
        about: {
          title: "Offensive Security Engineer - Web & APIs",
          description:
            "I specialize exclusively in offensive security testing of web applications. Through deep reconnaissance, comprehensive enumeration, and thorough vulnerability analysis, I identify and exploit security weaknesses in web apps before malicious actors can.\n\nMy expertise encompasses full-spectrum penetration testing of web applications—from manual exploitation techniques and custom tool development in Go to deep understanding of web architectures, authentication mechanisms, and OWASP Top 10 vulnerabilities. I focus on finding critical flaws that automated scanners miss.",
          features: [
            {
              icon: "🌐",
              title: "Web App Penetration Testing",
              description: "Full-spectrum offensive security testing",
            },
            {
              icon: "⚡",
              title: "Manual Exploitation",
              description: "Deep vulnerability analysis & exploitation",
            },
            {
              icon: "🛠️",
              title: "Custom Tool Development",
              description: "Go-based security testing tools",
            },
            {
              icon: "🔍",
              title: "OWASP Top 10 Focus",
              description: "Critical web app vulnerabilities",
            },
          ],
        },
        services: {
          title: "Security Assessment Services",
          description:
            "Specialized in offensive security testing of web applications. I conduct comprehensive penetration testing to identify critical vulnerabilities through manual exploitation, deep vulnerability analysis, and custom tool development before malicious actors can exploit them.",
          services: [
            {
              icon: "🌐",
              title: "Web Application Penetration Testing",
              description:
                "Comprehensive offensive security testing of web applications. I conduct deep reconnaissance, manual vulnerability exploitation, and proof-of-concept development to identify critical security flaws including injection attacks, authentication bypasses, and authorization vulnerabilities.",
              features: [
                "Manual Exploitation",
                "OWASP Top 10 Testing",
                "Proof-of-Concept Development",
              ],
            },
            {
              icon: "🔌",
              title: "API Security Testing",
              description:
                "Specialized penetration testing of REST and GraphQL APIs. I identify authentication bypasses, authorization flaws, insecure direct object references, and data exposure vulnerabilities through manual testing and custom tooling.",
              features: [
                "REST API Testing",
                "GraphQL Security",
                "Authentication Bypass",
              ],
            },
            {
              icon: "🛠️",
              title: "Custom Security Tool Development",
              description:
                "Develop custom web application security testing tools in Go to automate vulnerability identification, payload generation, and exploitation during penetration testing engagements.",
              features: [
                "Go/Golang Development",
                "Security Testing Tools",
                "Custom Payloads",
              ],
            },
            {
              icon: "🔍",
              title: "Deep Vulnerability Analysis",
              description:
                "Thorough analysis of web application vulnerabilities including injection flaws, broken authentication, sensitive data exposure, and other OWASP Top 10 risks. I go beyond automated scanners to find complex, chained vulnerabilities.",
              features: [
                "Vulnerability Chaining",
                "Deep Code Analysis",
                "Exploitation Techniques",
              ],
            },
          ],
        },
      },
      { status: 200 },
    );
  }
}
