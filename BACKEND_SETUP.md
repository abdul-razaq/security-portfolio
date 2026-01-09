# Backend Setup Guide

This guide will help you set up and use the Sanity CMS backend for managing your portfolio content.

## How Sanity Works (Like Strapi, but Cloud-Hosted)

**Sanity is a headless CMS** - similar to Strapi, but cloud-hosted. Here's how it works:

1. **Content Management**: You add/edit content in Sanity Studio (admin panel at `/admin`)
2. **Cloud Storage**: All content is stored in Sanity's cloud database
3. **API Access**: Your Next.js website fetches content via API routes (`/api/blog`, `/api/skills`, etc.)
4. **No Linking Needed**: Sanity is already connected! Just add content in the admin panel and it appears on your site

**Key Difference from Strapi:**
- Strapi: Self-hosted, you manage the server
- Sanity: Cloud-hosted, no server management needed
- Both: Headless CMS (content separate from frontend)

**All content is now backend-driven:**
- ✅ Blog posts → Fetched from `/api/blog`
- ✅ Skills → Fetched from `/api/skills`
- ✅ Experience → Fetched from `/api/experience`
- ✅ Education → Fetched from `/api/education`
- ✅ Home page content → Fetched from `/api/homepage`

## Prerequisites

1. A Sanity account (sign up at [sanity.io](https://www.sanity.io))
2. Node.js installed
3. Environment variables configured

## Step 1: Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-24
```

To get these values:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to API settings
4. Copy the Project ID and Dataset name

## Step 2: Start Sanity Studio (Admin Panel)

Run the following command to start the Sanity Studio locally:

```bash
npm run sanity:studio
```

This will start the admin panel at [http://localhost:3333](http://localhost:3333)

Alternatively, you can access it through your Next.js app at:
- **Local**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Production**: `https://your-domain.com/admin`

## Step 3: Create Your First Blog Post

1. Open the Sanity Studio (at `/admin` or `http://localhost:3333`)
2. Click on **"Blog Post"** in the sidebar
3. Click **"Create new"**
4. Fill in the form:
   - **Title**: Your blog post title
   - **Slug**: Will auto-generate from title (or customize it)
   - **Excerpt**: Short description (max 200 characters)
   - **Category**: Select from dropdown (Case Study, Tool Development, etc.)
   - **Tags**: Add relevant tags
   - **Featured**: Toggle if you want to feature this post
   - **Published At**: Set the publication date
   - **Reading Time**: e.g., "8 min read"
   - **Author**: Defaults to "AbdulRazaq Suleiman"
   - **Content**: Write your blog post content using the rich text editor
   - **Main Image** (optional): Upload a featured image

5. Click **"Publish"** to make it live

## Step 4: Manage Home Page Content

1. In Sanity Studio, click on **"Home Page Content"**
2. If no document exists, click **"Create new"**
3. Edit the sections:
   - **Hero Section**: Update greeting, name, description, and roles
   - **About Section**: Update title, description, and feature cards
   - **Services Section**: Update title, description, and services list

4. Click **"Publish"** to save changes

## Step 5: View Your Content

- **Blog Posts**: Visit `/blog` to see all posts
- **Individual Post**: Visit `/blog/[slug]` to view a specific post
- **Home Page**: The home page will automatically fetch content from Sanity

## API Endpoints

The following API endpoints are available:

### Get All Blog Posts
```
GET /api/blog
GET /api/blog?category=Case Study
GET /api/blog?featured=true
```

### Get Single Blog Post
```
GET /api/blog/[slug]
```

### Get Home Page Content
```
GET /api/homepage
```

## Content Types

### Blog Post Schema
- `title` (string, required)
- `slug` (slug, auto-generated from title)
- `excerpt` (text, max 200 chars)
- `category` (string, select from predefined list)
- `tags` (array of strings)
- `featured` (boolean)
- `publishedAt` (datetime)
- `readTime` (string)
- `author` (string)
- `content` (Portable Text - rich text editor)
- `mainImage` (image, optional)

### Home Page Schema
- `hero` (object)
  - `greeting`, `firstName`, `lastName`, `description`, `roles`
- `about` (object)
  - `title`, `description`, `features` (array)
- `services` (object)
  - `title`, `description`, `services` (array)

## Troubleshooting

### Content Not Appearing
1. Check that you've published the document in Sanity Studio
2. Verify environment variables are set correctly
3. Check browser console for API errors
4. Ensure Sanity project ID and dataset match your `.env.local`

### API Errors
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Verify the dataset name matches
- Ensure the Sanity project is active

### Studio Not Loading
- Make sure you're running `npm run dev` for the Next.js app
- Or `npm run sanity:studio` for standalone studio
- Check that port 3333 is not in use

## Next Steps

1. **Deploy Sanity Studio**: Run `npm run sanity:deploy` to deploy your studio online
2. **Add Authentication**: Set up authentication in Sanity for production
3. **Configure Webhooks**: Set up webhooks for automatic rebuilds when content changes
4. **Add More Content Types**: Extend schemas in `sanity/schemaTypes/` for additional content

## Support

For more information:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)
- [Portable Text Guide](https://www.sanity.io/docs/block-content)
