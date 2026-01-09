import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
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
      }`,
      { slug }
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 404 }
    );
  }
}
