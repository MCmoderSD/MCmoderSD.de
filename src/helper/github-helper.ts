interface GitHubRepository {
  owner: string;
  repo: string;
}

export async function fetchLatestGithubTag(githubUrl: string): Promise<string> {
  const repository: GitHubRepository = parseGithubUrl(githubUrl);
  const tag: string | null = await fetchViaApi(repository) || await fetchViaRedirect(repository);

  if (!tag) {
    throw new Error(`Could not fetch latest tag for ${githubUrl}`);
  }

  return tag;
}

function parseGithubUrl(githubUrl: string): GitHubRepository {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)\/?$/);

  if (!match) {
    throw new Error(`Invalid GitHub repository URL: ${githubUrl}`);
  }

  return { owner: match[1]!, repo: match[2]! };
}

async function fetchViaApi(repository: GitHubRepository): Promise<string | null> {
  const response: Response = await fetch(`https://api.github.com/repos/${repository.owner}/${repository.repo}/releases/latest`);
  if (!response.ok) return null;

  const release: { tag_name: string } = await response.json();
  return release.tag_name;
}

async function fetchViaRedirect(repository: GitHubRepository): Promise<string | null> {
  const response: Response = await fetch(`/api/latest-tag/${repository.owner}/${repository.repo}`);
  if (!response.ok) return null;

  const { tag }: { tag: string } = await response.json();
  return tag;
}