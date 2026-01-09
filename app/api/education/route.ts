import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const education = await client.fetch(
      `*[_type == "education"] | order(order asc) {
        _id,
        degree,
        institution,
        period,
        description,
        order
      }`
    );

    const certifications = await client.fetch(
      `*[_type == "certification"] | order(year desc) {
        _id,
        name,
        fullName,
        year,
        issuer,
        credentialId,
        credentialUrl
      }`
    );

    // Default fallback certifications if none exist
    const defaultCertifications = certifications.length === 0 ? [
      {
        _id: 'default-bscp',
        name: 'BSCP',
        fullName: 'Burp Suite Certified Practitioner',
        year: 'in view',
        issuer: 'PortSwigger',
        credentialId: null,
        credentialUrl: null,
      },
    ] : certifications;

    return NextResponse.json({ 
      education: education || [], 
      certifications: defaultCertifications 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching education:', error);
    // Return default certifications on error
    return NextResponse.json({ 
      education: [],
      certifications: [
        {
          _id: 'default-bscp',
          name: 'BSCP',
          fullName: 'Burp Suite Certified Practitioner',
          year: 'in view',
          issuer: 'PortSwigger',
          credentialId: null,
          credentialUrl: null,
        },
      ]
    }, { status: 200 });
  }
}
