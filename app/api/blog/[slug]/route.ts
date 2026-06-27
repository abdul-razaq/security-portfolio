import { createClient } from "@sanity/client";
import { projectId, dataset, apiVersion } from "@/sanity/env";
import { NextResponse } from "next/server";

// Use a fresh no-CDN client for this route so images always resolve
const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // CDN can serve stale data; asset->url needs a live fetch
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const post = await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug && defined(slug.current)][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        category,
        tags,
        featured,
        publishedAt,
        "updatedAt": _updatedAt,
        readTime,
        author,
        content,
        "mainImage": mainImage.asset->url,
        "mainImageAlt": mainImage.alt
      }`,
      { slug },
      {
        // Always fetch the published version
        perspective: "published",
        // Disable Next.js fetch cache so images aren't stale
        cache: "no-store",
      },
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Sanity sometimes returns mainImage as null even when set —
    // log it so you can confirm what's coming back
    if (process.env.NODE_ENV === "development") {
      console.log("[blog/slug] post.mainImage →", post.mainImage);
      console.log("[blog/slug] post.mainImageAlt →", post.mainImageAlt);
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 404 },
    );
  }
}
