import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    // Base query structure
    const baseFields = `{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      tags,
      featured,
      publishedAt,
      readTime,
      author,
      content,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }`;

    let query: string;
    let params: Record<string, any> = {};

    // Build query based on filters
    if (featured === 'true') {
      // Featured posts only
      query = `*[_type == "post" && featured == true] | order(publishedAt desc) ${baseFields}`;
    } else if (category && category !== 'All') {
      // Filter by category - handle both array and string (backward compatibility)
      // Match posts where the category array contains the selected category, or where category equals it (old format)
      query = `*[_type == "post" && ($category in category || category == $category)] | order(publishedAt desc) ${baseFields}`;
      params = { category };
    } else {
      // All posts (no filter)
      query = `*[_type == "post"] | order(publishedAt desc) ${baseFields}`;
    }

    const posts = await client.fetch(query, params);

    return NextResponse.json({ posts: posts || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array on error
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
