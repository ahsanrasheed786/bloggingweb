// src/app/api/sitemap/route.js

import prisma from '@/utils/connect';
import { format } from 'date-fns';

export async function GET(req, res) {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      createdAt: true,
      updatedAt: true,
      img: true, 
    },
  });

  const websiteUrl = process.env.WEBSIT_URL || 'https://coolzonemaster.com';

  const staticUrls = [
    { url: '/', lastModified: new Date().toISOString(), priority: 0.9, changefreq: 'daily' },
    { url: 'about', lastModified: new Date().toISOString(), priority: 0.4, changefreq: 'yearly' },
    { url: 'contact', lastModified: new Date().toISOString(), priority: 0.4, changefreq: 'yearly' },
    { url: 'privacy-policy', lastModified: new Date().toISOString(), priority: 0.4, changefreq: 'yearly' },
    { url: 'terms-of-service', lastModified: new Date().toISOString(), priority: 0.4, changefreq: 'yearly' },
    { url: 'disclaimer', lastModified: new Date().toISOString(), priority: 0.4, changefreq: 'yearly' },

  ];

  const urls = [
    ...staticUrls.map((staticUrl) => ({
      url: `${websiteUrl}${staticUrl.url}`,
      lastModified: staticUrl.lastModified,
      priority: staticUrl.priority,
      changefreq: staticUrl.changefreq,
    })),
    ...posts.map((post) => ({
      url: `${websiteUrl}/posts/${post.slug}`,
      createdAt: post.createdAt.toISOString(),
      lastModified: post.updatedAt.toISOString(),
      priority: 0.7,  // Default priority for blog posts
      changefreq: 'weekly',  // Set change frequency for posts
      img: post.img ? post.img.replace(/&/g, '&amp;') : null, // Escape special characters
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${urls
        .map(
          (url) => `
        <url>
          <loc>${escapeXml(url.url)}</loc>
          <lastmod>${format(new Date(url.lastModified), 'yyyy-MM-dd')}</lastmod>
          <priority>${url.priority}</priority>
          <changefreq>${url.changefreq}</changefreq>
          ${url.img ? `<image:image><image:loc>${escapeXml(url.img)}</image:loc></image:image>` : ''}
        </url>
      `
        )
        .join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

// Function to escape XML special characters
function escapeXml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
}
