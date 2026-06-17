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
          "I help teams ship secure software with confidence through threat modeling, secure design, DevSecOps, and hands-on application security testing.",
        roles: [
          "Application Security Engineer",
          "Product Security Engineer",
          "DevSecOps Engineer",
          "Threat Modeling Specialist",
          "Offensive Security Tester",
          "Penetration Tester",
        ],
      },
      about: {
        title: "Application Security Engineer",
        description:
          "As an Application Security Engineer, I help teams ship secure software with confidence through threat modeling, secure design, DevSecOps, and hands-on application security testing.",
        features: [
          {
            icon: "🔒",
            title: "Secure SDLC",
            description: "Security embedded across design, build, and release",
          },
          {
            icon: "🎯",
            title: "Threat Modeling",
            description: "Systematic risk identification before code ships",
          },
          {
            icon: "🛡️",
            title: "Product Security",
            description:
              "Protecting applications, APIs, and user data at scale",
          },
          {
            icon: "⚙️",
            title: "DevSecOps",
            description: "Automated security gates in CI/CD pipelines",
          },
          {
            icon: "🔴",
            title: "Offensive Security",
            description: "Penetration testing and attack simulation",
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
            "As an Application Security Engineer, I embed security across the full software lifecycle, from Secure SDLC and Threat Modeling to Product Security, DevSecOps, and hands-on Offensive Security.",
          roles: [
            "Application Security Engineer",
            "Product Security Engineer",
            "DevSecOps Engineer",
            "Threat Modeling Specialist",
            "Offensive Security Tester",
            "Penetration Tester",
          ],
        },
        about: {
          title: "Application Security Engineer",
          description:
            "As an Application Security Engineer, I embed security across the full software lifecycle, from Secure SDLC and Threat Modeling to Product Security, DevSecOps, and hands-on Offensive Security.\n\nI bridge defensive engineering with rigorous attack simulation to validate controls and find what automated tools miss before adversaries do.",
          features: [
            {
              icon: "🔒",
              title: "Secure SDLC",
              description:
                "Security embedded across design, build, and release",
            },
            {
              icon: "🎯",
              title: "Threat Modeling",
              description: "Systematic risk identification before code ships",
            },
            {
              icon: "🛡️",
              title: "Product Security",
              description:
                "Protecting applications, APIs, and user data at scale",
            },
            {
              icon: "⚙️",
              title: "DevSecOps",
              description: "Automated security gates in CI/CD pipelines",
            },
            {
              icon: "🔴",
              title: "Offensive Security",
              description: "Penetration testing and attack simulation",
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
