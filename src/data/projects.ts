export type Project = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  techStack: string[];
  githubUrl?: string;
  detail: {
    problemKey: string;
    approachKey: string;
    resultKey: string;
  };
};

const projects: Project[] = [
  {
    slug: 'auth-api',
    titleKey: 'ProjectData.authApi.title',
    descriptionKey: 'ProjectData.authApi.description',
    techStack: ['Node.js', 'TypeScript', 'JWT', 'RBAC', 'PostgreSQL', 'Prisma'],
    detail: {
      problemKey: 'ProjectData.authApi.problem',
      approachKey: 'ProjectData.authApi.approach',
      resultKey: 'ProjectData.authApi.result',
    },
  },
  {
    slug: 'next-cms',
    titleKey: 'ProjectData.nextCms.title',
    descriptionKey: 'ProjectData.nextCms.description',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'RLS', 'Docker'],
    detail: {
      problemKey: 'ProjectData.nextCms.problem',
      approachKey: 'ProjectData.nextCms.approach',
      resultKey: 'ProjectData.nextCms.result',
    },
  },
  {
    slug: 'myfitcoach',
    titleKey: 'ProjectData.myfitcoach.title',
    descriptionKey: 'ProjectData.myfitcoach.description',
    techStack: ['Flutter', 'Next.js', 'Strapi', 'Dart', 'TypeScript'],
    detail: {
      problemKey: 'ProjectData.myfitcoach.problem',
      approachKey: 'ProjectData.myfitcoach.approach',
      resultKey: 'ProjectData.myfitcoach.result',
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
