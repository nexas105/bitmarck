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
    techStack: ['TypeScript', 'Node.js', 'JWT', 'OAuth2', 'RBAC', 'PostgreSQL'],
    githubUrl: 'https://github.com/tobiasludwig/auth-api',
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
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Markdown'],
    detail: {
      problemKey: 'ProjectData.nextCms.problem',
      approachKey: 'ProjectData.nextCms.approach',
      resultKey: 'ProjectData.nextCms.result',
    },
  },
  {
    slug: 'server-cluster',
    titleKey: 'ProjectData.serverCluster.title',
    descriptionKey: 'ProjectData.serverCluster.description',
    techStack: ['Docker', 'Traefik', 'Prometheus', 'Grafana', 'Linux', 'Bash'],
    detail: {
      problemKey: 'ProjectData.serverCluster.problem',
      approachKey: 'ProjectData.serverCluster.approach',
      resultKey: 'ProjectData.serverCluster.result',
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
