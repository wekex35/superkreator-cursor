# Marketplace submission

Package everything in this folder as a **public** GitHub repository, then submit it to Cursor.

Public marketplace listings must be open source and are manually reviewed.

## 1. Create a public repo

Recommended: push **only** this folder as the repo root (not the whole SuperKreator monorepo).

```bash
# from monorepo root
cd cursor-plugin
git init
git add .
git commit -m "Initial SuperKreator Cursor plugin"
gh repo create wekex35/superkreator-cursor --public --source=. --remote=origin --push
```

Update `.cursor-plugin/plugin.json` `repository` / `homepage` if the GitHub path differs.

## 2. Pre-submit checklist

- [ ] `.cursor-plugin/plugin.json` has kebab-case `name`, version, description, author, license
- [ ] `mcp.json` uses `${SUPERKREATOR_API_KEY}` only (no real secrets)
- [ ] `variables` in `plugin.json` declares that key
- [ ] Skill has `name` + `description` frontmatter
- [ ] Command has `name` + `description` frontmatter
- [ ] `assets/logo.svg` is 1:1 with a background plate (also keep `assets/logo.png`)
- [ ] `README.md` covers install + configure
- [ ] `LICENSE` is present (MIT)
- [ ] Tested via `./scripts/install-local.sh` + Reload Window + `sk_whoami`
- [ ] Repo is **public**

## 3. Submit

1. Open https://cursor.com/marketplace/publish
2. Become a plugin publisher (org name, handle, contact email, logotype URL)
3. Paste the public GitHub repository URL
4. Wait for Cursor's manual review

Logotype URL example after push:

```text
https://raw.githubusercontent.com/wekex35/superkreator-cursor/main/assets/logo.svg
```

## 4. Team marketplace (optional)

On Teams/Enterprise, import this same repo under **Dashboard → Plugins & MCPs → Add Marketplace** without waiting for the public listing.

## 5. After listing

- Bump `version` in `.cursor-plugin/plugin.json` for each release
- Updates are re-reviewed before they go live
- Keep skill workflows aligned with https://superkreator.com/agents/skill.md
