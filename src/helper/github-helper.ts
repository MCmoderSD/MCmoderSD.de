const CACHE_KEY_PREFIX = 'github-latest-tag:';

export async function fetchLatestGithubTag(githubUrl: string): Promise<string> {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)\/?$/);
  if (!match) {
    throw new Error(`Invalid GitHub repository URL: ${githubUrl}`);
  }

  const [, owner, repo] = match;
  const cacheKey = `${CACHE_KEY_PREFIX}${owner}/${repo}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return cached;
  }

  const tag = (await fetchViaApi(owner, repo)) ?? (await fetchViaRedirect(owner, repo));
  if (!tag) {
    throw new Error(`Could not determine latest release for ${owner}/${repo}`);
  }

  sessionStorage.setItem(cacheKey, tag);
  return tag;
}

async function fetchViaApi(owner: string, repo: string): Promise<string | null> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
  if (!response.ok) return null;

  const release: { tag_name: string } = await response.json();
  return release.tag_name;
}

async function fetchViaRedirect(owner: string, repo: string): Promise<string | null> {
  const response = await fetch(`/api/latest-tag/${owner}/${repo}`);
  if (!response.ok) return null;

  const { tag }: { tag: string } = await response.json();
  return tag;
}