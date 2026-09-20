# SuperKreator — Agent Plugin (MCP + Skills)

Operate [SuperKreator](https://superkreator.com) from Cursor, Claude, Codex, and other Agent Skills clients: link in bio, UPI store, Instagram AutoDM, social publish, planner, AI copy, analytics, and YouTube LIVE.

## Install

### Cursor
1. Install from [Cursor Marketplace](https://cursor.com/marketplace) when listed, or clone this repo into `~/.cursor/plugins/local/superkreator`
2. Set `SUPERKREATOR_API_KEY` under Plugins → Configure
3. Call `sk_whoami`

### Claude Code
```bash
claude plugin marketplace add wekex35/superkreator-cursor
claude plugin install superkreator@superkreator-marketplace
```
Or submit path: use this public repo in the [Claude plugin directory](https://platform.claude.com/plugins/submit).

### Remote MCP (any client)
```text
URL: https://superkreator.com/api/v1/mcp
Header: Authorization: Bearer sk_live_...
```

Create keys at [Settings → Agents](https://superkreator.com/dashboard/settings#agents).

### Codex / ChatGPT
Submit the production MCP URL + skills from this repo via the [OpenAI Plugins portal](https://developers.openai.com/plugins/build/plugins).

## Package layout

| Path | Client |
| --- | --- |
| `.cursor-plugin/plugin.json` | Cursor |
| `.claude-plugin/plugin.json` | Claude Code / Cowork |
| `.codex-plugin/plugin.json` | Codex compatibility |
| `plugin.json` | Agent Plugins open standard |
| `mcp.json` / `.mcp.json` | Hosted MCP |
| `skills/` | Agent Skills |

## Privacy

- Workspace-scoped API keys only — no cross-tenant access
- Privacy policy: https://superkreator.com/privacy
- Support: support@superkreator.com

## Links

- Product: https://superkreator.com
- Agents: https://superkreator.com/agents
- OpenAPI: https://superkreator.com/api/v1/openapi.json
- Skill (hosted): https://superkreator.com/agents/skill.md
- Smithery: https://smithery.ai/servers/graphity/superkreator

[![Smithery badge](./assets/smithery-badge.svg)](https://smithery.ai/servers/graphity/superkreator)

See [PUBLISHING.md](./PUBLISHING.md) for marketplace status.
