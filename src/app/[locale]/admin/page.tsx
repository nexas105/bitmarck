import {setRequestLocale} from 'next-intl/server';
import {readProjects, createProject, updateProject, deleteProject} from '@/lib/projects';
import {revalidatePath} from 'next/cache';
import {getSession} from '@/lib/session';
import type {Project} from '@/data/projects';
import {AdminProjectList} from '@/components/admin/admin-project-list';

type Props = {
  params: Promise<{locale: string}>;
};

async function handleCreate(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session.isLoggedIn) throw new Error('Unauthorized');

  const project: Project = {
    slug: formData.get('slug') as string,
    titleKey: formData.get('titleKey') as string,
    descriptionKey: formData.get('descriptionKey') as string,
    techStack: (formData.get('techStack') as string).split(',').map((s) => s.trim()).filter(Boolean),
    githubUrl: (formData.get('githubUrl') as string) || undefined,
    githubOwner: (formData.get('githubOwner') as string) || undefined,
    githubRepo: (formData.get('githubRepo') as string) || undefined,
    detail: {
      problemKey: formData.get('problemKey') as string,
      approachKey: formData.get('approachKey') as string,
      resultKey: formData.get('resultKey') as string,
    },
  };

  createProject(project);
  revalidatePath('/');
}

async function handleUpdate(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session.isLoggedIn) throw new Error('Unauthorized');

  const slug = formData.get('slug') as string;
  const updates: Partial<Project> = {
    titleKey: formData.get('titleKey') as string,
    descriptionKey: formData.get('descriptionKey') as string,
    techStack: (formData.get('techStack') as string).split(',').map((s) => s.trim()).filter(Boolean),
    githubUrl: (formData.get('githubUrl') as string) || undefined,
    githubOwner: (formData.get('githubOwner') as string) || undefined,
    githubRepo: (formData.get('githubRepo') as string) || undefined,
    detail: {
      problemKey: formData.get('problemKey') as string,
      approachKey: formData.get('approachKey') as string,
      resultKey: formData.get('resultKey') as string,
    },
  };

  updateProject(slug, updates);
  revalidatePath('/');
}

async function handleDelete(formData: FormData) {
  'use server';
  const session = await getSession();
  if (!session.isLoggedIn) throw new Error('Unauthorized');

  const slug = formData.get('slug') as string;
  deleteProject(slug);
  revalidatePath('/');
}

export default async function AdminPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const projects = readProjects();

  return (
    <AdminProjectList
      projects={projects}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
