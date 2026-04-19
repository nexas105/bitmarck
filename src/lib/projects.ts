import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import type {Project} from '@/data/projects';

const DATA_FILE = join(process.cwd(), 'data', 'projects.json');

const SLUG_PATTERN = /^[a-z0-9-]+$/;

function validateSlug(slug: string): string {
  const sanitized = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!SLUG_PATTERN.test(sanitized) || sanitized.length === 0) {
    throw new Error(`Invalid slug: "${slug}". Only a-z, 0-9, and hyphens allowed.`);
  }
  return sanitized;
}

export function readProjects(): Project[] {
  try {
    const raw = readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function writeProjects(projects: Project[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
}

export function createProject(project: Project): void {
  const validSlug = validateSlug(project.slug);
  const projects = readProjects();

  if (projects.some((p) => p.slug === validSlug)) {
    throw new Error(`Project with slug "${validSlug}" already exists.`);
  }

  projects.push({...project, slug: validSlug});
  writeProjects(projects);
}

export function updateProject(slug: string, updates: Partial<Project>): void {
  const validSlug = validateSlug(slug);
  const projects = readProjects();
  const index = projects.findIndex((p) => p.slug === validSlug);

  if (index === -1) {
    throw new Error(`Project with slug "${validSlug}" not found.`);
  }

  // If slug is being changed, validate the new slug too
  if (updates.slug && updates.slug !== validSlug) {
    updates.slug = validateSlug(updates.slug);
  }

  projects[index] = {...projects[index], ...updates};
  writeProjects(projects);
}

export function deleteProject(slug: string): void {
  const validSlug = validateSlug(slug);
  const projects = readProjects();
  const filtered = projects.filter((p) => p.slug !== validSlug);

  if (filtered.length === projects.length) {
    throw new Error(`Project with slug "${validSlug}" not found.`);
  }

  writeProjects(filtered);
}
