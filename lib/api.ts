/**
 * API utility functions for fetching data from Sanity
 */

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string | string[]; // Support both single string (backward compatibility) and array
  tags: string[];
  featured: boolean;
  publishedAt: string;
  readTime: string;
  author: string;
  content?: any; // Portable Text blocks
  mainImage?: string;
  mainImageAlt?: string;
}

export interface HomePageContent {
  hero?: {
    greeting?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    roles?: string[];
  };
  about?: {
    title?: string;
    description?: string;
    features?: Array<{
      icon?: string;
      title?: string;
      description?: string;
    }>;
  };
  services?: {
    title?: string;
    description?: string;
    services?: Array<{
      icon?: string;
      title?: string;
      description?: string;
      features?: string[];
    }>;
  };
}

/**
 * Fetch all blog posts
 */
export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const url = category && category !== 'All' 
      ? `/api/blog?category=${encodeURIComponent(category)}`
      : '/api/blog';
    
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/blog/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog post');
    }

    const data = await response.json();
    return data.post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Fetch home page content
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const response = await fetch('/api/homepage', {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch home page content');
    }

    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error('Error fetching home page content:', error);
    return {};
  }
}

export interface Skill {
  _id: string;
  name: string;
  level: number;
  description: string;
  category: string;
  icon?: string;
  order?: number;
}

/**
 * Fetch all skills
 */
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await fetch('/api/skills', {
      cache: 'no-store', // Always fetch fresh data on client side
    });

    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data.skills || [];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export interface Experience {
  _id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  skills?: string[];
  highlight?: boolean;
  order?: number;
}

/**
 * Fetch all work experiences
 */
export async function getExperiences(): Promise<Experience[]> {
  try {
    const response = await fetch('/api/experience', {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch experiences');
    }

    const data = await response.json();
    return data.experiences || [];
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
}

export interface Education {
  _id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
  order?: number;
}

export interface Certification {
  _id: string;
  name: string;
  fullName: string;
  year: string;
  issuer?: string;
  credentialId?: string;
  credentialUrl?: string;
}

/**
 * Fetch education and certifications
 */
export async function getEducation(): Promise<{ education: Education[]; certifications: Certification[] }> {
  try {
    const response = await fetch('/api/education', {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch education');
    }

    const data = await response.json();
    return {
      education: data.education || [],
      certifications: data.certifications || [],
    };
  } catch (error) {
    console.error('Error fetching education:', error);
    return { education: [], certifications: [] };
  }
}
