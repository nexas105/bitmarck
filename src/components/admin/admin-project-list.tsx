'use client';

import {useState, useTransition} from 'react';
import type {Project} from '@/data/projects';
import {ProjectForm} from '@/components/admin/project-form';

type Props = {
  projects: Project[];
  onCreate: (formData: FormData) => Promise<void>;
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
};

export function AdminProjectList({projects, onCreate, onUpdate, onDelete}: Props) {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editProject, setEditProject] = useState<Project | undefined>();
  const [isPending, startTransition] = useTransition();

  function handleEdit(project: Project) {
    setEditProject(project);
    setMode('edit');
  }

  function handleDelete(slug: string) {
    if (!confirm(`Projekt "${slug}" wirklich loeschen?`)) return;
    startTransition(async () => {
      const formData = new FormData();
      formData.set('slug', slug);
      await onDelete(formData);
    });
  }

  function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      if (mode === 'create') {
        await onCreate(formData);
      } else {
        await onUpdate(formData);
      }
      setMode('list');
      setEditProject(undefined);
    });
  }

  if (mode === 'create' || mode === 'edit') {
    return (
      <div className="mx-auto max-w-2xl">
        <ProjectForm
          project={editProject}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setMode('list');
            setEditProject(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-lg flex items-center justify-between">
        <h1 className="text-heading font-semibold text-text-primary">Projekte</h1>
        <button
          onClick={() => {
            setEditProject(undefined);
            setMode('create');
          }}
          className="rounded-md bg-accent px-lg py-sm text-label font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Neues Projekt
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-text-secondary">Keine Projekte vorhanden.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-body">
            <thead className="bg-surface-subtle text-label font-semibold text-text-secondary">
              <tr>
                <th className="px-md py-sm">Titel</th>
                <th className="px-md py-sm">Slug</th>
                <th className="px-md py-sm">Tech Stack</th>
                <th className="px-md py-sm">GitHub</th>
                <th className="px-md py-sm text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => (
                <tr key={project.slug} className="bg-surface-raised">
                  <td className="px-md py-sm font-semibold">{project.titleKey}</td>
                  <td className="px-md py-sm text-text-secondary">{project.slug}</td>
                  <td className="px-md py-sm text-text-secondary">
                    {project.techStack.slice(0, 3).join(', ')}
                    {project.techStack.length > 3 && ` +${project.techStack.length - 3}`}
                  </td>
                  <td className="px-md py-sm text-text-secondary">
                    {project.githubOwner && project.githubRepo
                      ? `${project.githubOwner}/${project.githubRepo}`
                      : '-'}
                  </td>
                  <td className="px-md py-sm text-right">
                    <button
                      onClick={() => handleEdit(project)}
                      className="mr-sm text-label text-accent hover:text-accent-hover"
                    >
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDelete(project.slug)}
                      disabled={isPending}
                      className="text-label text-destructive hover:text-destructive/80 disabled:opacity-50"
                    >
                      Loeschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
