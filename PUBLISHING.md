# Publishing status

Repo: https://github.com/wekex35/superkreator-cursor  
Org: Graphity Technology Private Limited · handle `@graphity`  
MCP: `https://superkreator.com/api/v1/mcp`  
Privacy: https://superkreator.com/privacy  
Support: support@superkreator.com

## Done

| Channel | Status |
| --- | --- |
| GitHub (multi-client package) | Live — Cursor + Claude + Codex + Agent Plugins manifests |
| Cursor Marketplace | Application submitted (manual review) |
| Claude self-serve marketplace | Ready — users run `claude plugin marketplace add wekex35/superkreator-cursor` |

## Needs your login (forms)

| Channel | URL | What to paste |
| --- | --- | --- |
| Claude Plugin Directory | https://platform.claude.com/plugins/submit | `https://github.com/wekex35/superkreator-cursor` |
| cursor.directory | https://cursor.directory/plugins/new | same GitHub URL (auto-detects `.mcp.json` + skills) |
| OpenAI Plugins (ChatGPT/Codex) | https://platform.openai.com → Apps / Plugins | MCP `https://superkreator.com/api/v1/mcp` + skills zip from repo |

## Blocked / later

| Channel | Why |
| --- | --- |
| Claude Connectors Directory | Needs Claude.ai Team/Enterprise Owner + portal; prefers OAuth (we use Bearer API keys — “custom connection”) |
| Smithery | Works for our hosted HTTP MCP, but needs Smithery account + registry publish |

## Instant install (no review)

```bash
# Claude Code
claude plugin marketplace add wekex35/superkreator-cursor
claude plugin install superkreator@superkreator-marketplace

# Any MCP client
# URL: https://superkreator.com/api/v1/mcp
# Header: Authorization: Bearer sk_live_...
```

Hosted skill (already public): https://superkreator.com/agents/skill.md
