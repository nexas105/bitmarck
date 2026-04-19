'use client';

import {useState, useCallback} from 'react';
import type {Project} from '@/data/projects';
import type {GitHubRepoData} from '@/lib/github';

type Props = {
  project?: Project;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseGitHubUrl(url: string): {owner: string; repo: string} | null {
  const match = url.match(/github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/);
  if (!match) return null;
  return {owner: match[1], repo: match[2].replace(/\.git$/, '')};
}

export function ProjectForm({project, onSubmit, onCancel}: Props) {
  const isEditing = !!project;

  const [slug, setSlug] = useState(project?.slug ?? '');
  const [titleKey, setTitleKey] = useState(project?.titleKey ?? '');
  const [descriptionKey, setDescriptionKey] = useState(project?.descriptionKey ?? '');
  const [techStack, setTechStack] = useState(project?.techStack.join(', ') ?? '');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? '');
  const [githubOwner, setGithubOwner] = useState(project?.githubOwner ?? '');
  const [githubRepo, setGithubRepo] = useState(project?.githubRepo ?? '');
  const [problemKey, setProblemKey] = useState(project?.detail.problemKey ?? '');
  const [approachKey, setApproachKey] = useState(project?.detail.approachKey ?? '');
  const [resultKey, setResultKey] = useState(project?.detail.resultKey ?? '');

  const [githubData, setGithubData] = useState<GitHubRepoData | null>(null);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState('');

  const handleTitleChange = useCallback(
    (value: string) => {
      setTitleKey(value);
      if (!isEditing) {
        setSlug(slugify(value));
      }
    },
    [isEditing]
  );

  const fetchGitHubData = useCallback(async (owner: string, repo: string) => {
    setGithubLoading(true);
    setGithubError('');
    setGithubData(null);

    try {
      const res = await fetch(`/api/github?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
      if (!res.ok) {
        const err = await res.json();
        setGithubError(err.error || 'Fehler beim Laden der GitHub-Daten');
        return;
      }
      const data: GitHubRepoData = await res.json();
      setGithubData(data);

      // Auto-suggest tech stack from languages
      if (data.languages && Object.keys(data.languages).length > 0) {
        const langs = Object.keys(data.languages).slice(0, 5);
        setTechStack(langs.join(', '));
      }

      // Auto-suggest description
      if (data.description) {
        setDescriptionKey(data.description);
      }
    } catch {
      setGithubError('Netzwerkfehler beim Laden der GitHub-Daten');
    } finally {
      setGithubLoading(false);
    }
  }, []);

  const handleGithubUrlChange = useCallback(
    (url: string) => {
      setGithubUrl(url);
      const parsed = parseGitHubUrl(url);
      if (parsed) {
        setGithubOwner(parsed.owner);
        setGithubRepo(parsed.repo);
        fetchGitHubData(parsed.owner, parsed.repo);
      }
    },
    [fetchGitHubData]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.set('slug', slug);
    formData.set('titleKey', titleKey);
    formData.set('descriptionKey', descriptionKey);
    formData.set('techStack', techStack);
    formData.set('githubUrl', githubUrl);
    formData.set('githubOwner', githubOwner);
    formData.set('githubRepo', githubRepo);
    formData.set('problemKey', problemKey);
    formData.set('approachKey', approachKey);
    formData.set('resultKey', resultKey);
    onSubmit(formData);
  }

  const inputClass =
    'w-full rounded-md border border-border bg-surface-raised px-md py-sm text-body text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';
  const labelClass = 'block text-label font-semibold text-text-primary mb-xs';

  return (
    <form onSubmit={handleSubmit} className="space-y-md">
      <h2 className="text-heading font-semibold text-text-primary">
        {isEditing ? 'Projekt bearbeiten' : 'Neues Projekt'}
      </h2>

      <div>
        <label htmlFor="titleKey" className={labelClass}>Titel (Translation Key)</label>
        <input
          id="titleKey"
          type="text"
          value={titleKey}
          onChange={(e) => handleTitleChange(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClass}>Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={inputClass}
          readOnly={isEditing}
          required
        />
      </div>

      <div>
        <label htmlFor="descriptionKey" className={labelClass}>Beschreibung (Translation Key)</label>
        <input
          id="descriptionKey"
          type="text"
          value={descriptionKey}
          onChange={(e) => setDescriptionKey(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="techStack" className={labelClass}>Tech Stack (kommagetrennt)</label>
        <input
          id="techStack"
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          className={inputClass}
          placeholder="React, TypeScript, Node.js"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className={labelClass}>GitHub URL</label>
        <input
          id="githubUrl"
          type="url"
          value={githubUrl}
          onChange={(e) => handleGithubUrlChange(e.target.value)}
          className={inputClass}
          placeholder="https://github.com/owner/repo"
        />
      </div>

      {githubLoading && (
        <div className="rounded-md border border-border bg-surface-subtle p-md text-label text-text-secondary">
          GitHub-Daten werden geladen...
        </div>
      )}

      {githubError && (
        <div className="rounded-md border border-destructive bg-surface-subtle p-md text-label text-destructive">
          {githubError}
        </div>
      )}

      {githubData && (
        <div className="rounded-md border border-accent bg-surface-subtle p-md text-label">
          <p className="font-semibold text-accent mb-xs">GitHub-Daten geladen</p>
          {githubData.description && (
            <p className="text-text-secondary">Beschreibung: {githubData.description}</p>
          )}
          <p className="text-text-secondary">
            Sprachen: {Object.keys(githubData.languages).join(', ') || 'Keine'}
          </p>
          <p className="text-text-secondary">Sterne: {githubData.stargazers_count}</p>
          <p className="mt-xs text-text-secondary italic">
            Felder wurden automatisch vorausgefuellt. Manuelle Aenderungen sind moeglich.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-md">
        <div>
          <label htmlFor="githubOwner" className={labelClass}>GitHub Owner</label>
          <input
            id="githubOwner"
            type="text"
            value={githubOwner}
            onChange={(e) => setGithubOwner(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="githubRepo" className={labelClass}>GitHub Repo</label>
          <input
            id="githubRepo"
            type="text"
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="problemKey" className={labelClass}>Problem (Translation Key)</label>
        <input
          id="problemKey"
          type="text"
          value={problemKey}
          onChange={(e) => setProblemKey(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="approachKey" className={labelClass}>Ansatz (Translation Key)</label>
        <input
          id="approachKey"
          type="text"
          value={approachKey}
          onChange={(e) => setApproachKey(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="resultKey" className={labelClass}>Ergebnis (Translation Key)</label>
        <input
          id="resultKey"
          type="text"
          value={resultKey}
          onChange={(e) => setResultKey(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      <div className="flex gap-md pt-sm">
        <button
          type="submit"
          className="rounded-md bg-accent px-lg py-sm text-label font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Speichern
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-lg py-sm text-label text-text-secondary transition-colors hover:border-text-secondary"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
