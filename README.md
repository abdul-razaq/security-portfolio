# Security Professional Portfolio

A professional, modern portfolio website for offensive security professionals, penetration testers, and ethical hackers. Built with Next.js 16, TypeScript, Tailwind CSS, and Sanity.io for content management.

## Features

- 🎨 **Professional Design**: Burgundy and charcoal dark theme with Satoshi font family
- 🚀 **Next.js 16**: Latest version with App Router and React Server Components
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🎭 **Smooth Animations**: Framer Motion for elegant page transitions
- 🔍 **SEO Optimized**: Complete meta tags, sitemap, and robots.txt
- 📝 **Content Management**: Sanity.io integration for easy content updates
- ⚡ **Performance**: Optimized for speed and Core Web Vitals
- ♿ **Accessible**: Built with accessibility best practices

## Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Sanity.io
- **Font**: Satoshi (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity.io account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd security-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Sanity.io credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Initialize Sanity.io**
   ```bash
   npm run sanity init
   ```
   
   Follow the prompts to:
   - Create a new project or use an existing one
   - Configure the dataset
   - Set up the project structure

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your site.

6. **Start Sanity Studio** (in a new terminal)
   ```bash
   npm run sanity:studio
   ```
   
   Open [http://localhost:3333](http://localhost:3333) to access the Sanity Studio.

## Project Structure

```
security-portfolio/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles and theme
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt generation
├── components/            # React components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── Projects.tsx      # Projects showcase
│   ├── Skills.tsx        # Skills and certifications
│   └── Contact.tsx       # Contact form
├── sanity/                # Sanity.io configuration
│   ├── schemas/          # Content schemas
│   │   ├── project.ts    # Project schema
│   │   ├── skill.ts      # Skill schema
│   │   ├── certification.ts # Certification schema
│   │   └── experience.ts # Experience schema
│   └── lib/              # Sanity utilities
│       ├── client.ts     # Sanity client
│       └── image.ts      # Image URL builder
├── lib/                   # Utility functions
│   └── sanity.ts         # Sanity client export
└── public/                # Static assets
```

## Customization

### Colors

The burgundy and charcoal theme is defined in `app/globals.css`. You can customize:

- `--burgundy`: Main accent color (#800020)
- `--burgundy-light`: Lighter burgundy (#a00030)
- `--burgundy-dark`: Darker burgundy (#600015)
- `--charcoal`: Background color (#2d2d2d)
- `--charcoal-light`: Lighter charcoal (#3a3a3a)
- `--charcoal-dark`: Darker charcoal (#1a1a1a)

### Content

Update content through Sanity Studio or directly in the component files:

- **Hero Section**: `components/Hero.tsx`
- **About Section**: `components/About.tsx`
- **Projects**: Managed through Sanity or `components/Projects.tsx`
- **Skills**: `components/Skills.tsx`
- **Contact**: `components/Contact.tsx`

### SEO

Update SEO metadata in `app/layout.tsx`:

- Title and description
- Open Graph tags
- Twitter Card tags
- Keywords
- Author information

## Sanity.io Setup

### Creating Content Types

The project includes schemas for:

- **Projects**: Security assessments and penetration tests
- **Skills**: Technical skills with proficiency levels
- **Certifications**: Professional certifications
- **Experience**: Work history and positions

### Adding Content

1. Start Sanity Studio: `npm run sanity:studio`
2. Navigate to the content type you want to edit
3. Create new entries or edit existing ones
4. Content will automatically sync to your Next.js site

### Querying Content

Example query in your components:

```typescript
import { sanityClient } from '@/lib/sanity';

const projects = await sanityClient.fetch(`
  *[_type == "project" && featured == true] | order(publishedAt desc)
`);
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to set all environment variables in your hosting platform.

## Performance Optimization

- Images are optimized with Next.js Image component
- Fonts are loaded from Google Fonts with proper preconnect
- Code splitting is handled automatically by Next.js
- Static generation where possible

## SEO Features

- ✅ Semantic HTML structure
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Structured data ready
- ✅ Fast loading times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Design inspired by modern security professional portfolios
- Built with Next.js and the amazing open-source community

---

**Built with ❤️ for the security community**
