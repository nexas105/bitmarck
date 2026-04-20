import type {MetadataRoute} from 'next';
import {getAllProjectSlugs} from '@/data/projects';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bitmarck-bewerbung.tjl-it.de';
const LOCALES = ['de', 'en'] as const;
const SKILL_SLUGS = ['iam', 'ba', 'devops', 'languages'] as const;
const CAREER_SLUGS = [
  'telekom',
  'mediacom',
  'biermann',
  'bwi',
  'bhf',
  'persona',
  'freelancer',
  'xecuro',
  'bitmarck',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const projectSlugs = getAllProjectSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const base = `${SITE_URL}/${locale}`;

    entries.push(
      {url: base, lastModified: now, changeFrequency: 'weekly', priority: 1},
      {url: `${base}/cv`, lastModified: now, changeFrequency: 'weekly', priority: 0.9},
      {url: `${base}/zertifikate`, lastModified: now, changeFrequency: 'monthly', priority: 0.7},
      {url: `${base}/interaktiv`, lastModified: now, changeFrequency: 'monthly', priority: 0.5},
    );

    for (const slug of projectSlugs) {
      entries.push({
        url: `${base}/projekte/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const slug of SKILL_SLUGS) {
      entries.push({
        url: `${base}/skills/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    for (const slug of CAREER_SLUGS) {
      entries.push({
        url: `${base}/karriere/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
