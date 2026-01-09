import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let query = `*[_type == "post"] | order(publishedAt desc) {
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

    // Apply filters
    if (category && category !== 'All') {
      query = `*[_type == "post" && category == $category] | order(publishedAt desc) {
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
    }

    if (featured === 'true') {
      query = `*[_type == "post" && featured == true] | order(publishedAt desc) {
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
    }

    const posts = await client.fetch(query, category && category !== 'All' ? { category } : {});

    return NextResponse.json({ posts: posts || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array on error
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
