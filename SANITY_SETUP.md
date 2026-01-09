# Sanity.io Setup Guide

This guide will help you set up Sanity.io for content management in your portfolio.

## Step 1: Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io)
2. Sign up for a free account
3. Create a new project

## Step 2: Initialize Sanity in Your Project

Run the following command in your project root:

```bash
npm run sanity init
```

Follow the prompts:

1. **Select "Create new project"** or choose an existing project
2. **Enter a project name** (e.g., "security-portfolio")
3. **Select a dataset** (use "production" for production, or create a "development" dataset)
4. **Choose project output path**: Press Enter to use the default (`./sanity`)
5. **Select project template**: Choose "Clean project with no predefined schemas"

## Step 3: Configure Environment Variables

After initialization, Sanity will provide you with:
- Project ID
- Dataset name
- API token (for write access)

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
```

## Step 4: Start Sanity Studio

Run the Sanity Studio locally:

```bash
npm run sanity:studio
```

This will start the Sanity Studio at [http://localhost:3333](http://localhost:3333)

## Step 5: Deploy Sanity Studio (Optional)

To make your Sanity Studio accessible online:

```bash
npm run sanity:deploy
```

This will deploy your studio to `https://your-project-name.sanity.studio`

## Step 6: Add Content

1. Open Sanity Studio (locally or deployed)
2. You'll see the content types defined in `sanity/schemas/`:
   - **Projects**: Add your security assessments and penetration tests
   - **Skills**: Add your technical skills
   - **Certifications**: Add your professional certifications
   - **Experience**: Add your work history

## Content Types Overview

### Projects
- Title, description, and detailed content
- Images and screenshots
- Technologies used
- Category (Penetration Testing, Web App Security, etc.)
- GitHub and live URLs
- Featured flag

### Skills
- Skill name and category
- Proficiency level (0-100)
- Icon or emoji

### Certifications
- Certification name and issuer
- Issue and expiry dates
- Credential ID and verification URL
- Certification image

### Experience
- Job title and company
- Location and dates
- Description and responsibilities
- Technologies used

## Querying Content in Next.js

Example of fetching projects in a component:

```typescript
import { sanityClient } from '@/lib/sanity';

async function getProjects() {
  const query = `*[_type == "project" && featured == true] | order(publishedAt desc)`;
  const projects = await sanityClient.fetch(query);
  return projects;
}
```

## Troubleshooting

### Studio won't start
- Make sure you've run `npm install`
- Check that your `.env.local` file has the correct project ID

### Can't see schemas in Studio
- Make sure `sanity.config.ts` is properly configured
- Restart the Studio: `npm run sanity:studio`

### Build errors related to Sanity
- Verify environment variables are set correctly
- Check that `NEXT_PUBLIC_SANITY_PROJECT_ID` is prefixed with `NEXT_PUBLIC_` (required for client-side access)

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/js-client)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)

