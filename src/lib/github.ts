export type GitHubRepoData = {
  languages: Record<string, number>;
  stargazers_count: number;
  pushed_at: string;
  description: string | null;
};

const cache = new Map<string, { data: GitHubRepoData; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function getRepoData(
  owner: string,
  repo: string
): Promise<GitHubRepoData | null> {
  const key = `${owner}/${repo}`;
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
  };

  const token = process.env.GITHUB_PAT;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const [repoRes, langRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!repoRes.ok) return null;

    const repoJson = await repoRes.json();
    const languages = langRes.ok ? await langRes.json() : {};

    const data: GitHubRepoData = {
      stargazers_count: repoJson.stargazers_count,
      pushed_at: repoJson.pushed_at,
      description: repoJson.description,
      languages,
    };

    cache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch {
    return null;
  }
}
