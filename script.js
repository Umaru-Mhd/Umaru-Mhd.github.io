const userEndpoint = "https://api.github.com/users/Umaru-Mhd";
const reposEndpoint = "https://api.github.com/users/Umaru-Mhd/repos?per_page=100&sort=updated";

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node && value !== undefined && value !== null) {
    node.textContent = value;
  }
};

const formatDate = (value) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(value));
};

const escapeHtml = (value) => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const loadGithubData = async () => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(userEndpoint, { headers: { Accept: "application/vnd.github+json" } }),
      fetch(reposEndpoint, { headers: { Accept: "application/vnd.github+json" } })
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return;
    }

    const user = await userResponse.json();
    const repos = await reposResponse.json();
    setText("[data-stat='repos']", user.public_repos);

    const list = document.querySelector("#repo-list");
    const publicRepos = repos
      .filter((repo) => !repo.fork)
      .slice(0, 3);

    if (list && publicRepos.length > 0) {
      list.innerHTML = publicRepos.map((repo) => {
        const description = repo.description || "Public repository from Umaru Mohammed's GitHub profile.";
        const language = repo.language || "Profile";
        const updated = repo.updated_at ? formatDate(repo.updated_at) : "Updated";

        return `
          <article class="project-card">
            <div class="card-topline">
              <span>${escapeHtml(language)}</span>
              <span>${escapeHtml(updated)}</span>
            </div>
            <h3>${escapeHtml(repo.full_name)}</h3>
            <p>${escapeHtml(description)}</p>
            <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">View repository</a>
          </article>
        `;
      }).join("");
    }
  } catch {
    // Static fallback content remains visible when GitHub API access is unavailable.
  }
};

document.querySelector("#year").textContent = new Date().getFullYear();
loadGithubData();
