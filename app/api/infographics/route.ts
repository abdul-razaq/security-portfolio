import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const query = `*[_type == "infographic"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      tags,
      publishedAt,
      "image": image.asset->url,
      "imageAlt": image.alt
    }`;

    const infographics = await client.fetch(query);

    return NextResponse.json(
      { infographics: infographics || [] },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching infographics:", error);
    return NextResponse.json({ infographics: [] }, { status: 200 });
  }
}
