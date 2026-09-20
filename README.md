# SuperKreator — Cursor Plugin

Operate [SuperKreator](https://superkreator.com) from Cursor: link in bio, UPI store, Instagram AutoDM, social publish, planner, AI copy, analytics, and YouTube LIVE — via hosted MCP tools (`sk_*`) and an agent skill.

## What's included

| Component | Path | Purpose |
| --- | --- | --- |
| MCP | `mcp.json` | Remote MCP at `https://superkreator.com/api/v1/mcp` |
| Skill | `skills/superkreator/` | Workflows, guardrails, copy style |
| Command | `commands/connect-superkreator.md` | `/connect-superkreator` setup walkthrough |
| Stdio bridge | `bin/mcp-stdio.mjs` | Optional local bridge if you prefer stdio |

## Install (after Marketplace listing)

1. Open **Customize** in Cursor and install **SuperKreator**
2. Create an API key at [Settings → Agents](https://superkreator.com/dashboard/settings#agents)
3. Set `SUPERKREATOR_API_KEY` under **Plugins → SuperKreator → Configure**
4. Ask the agent to call `sk_whoami`

## Local test (before publish)

From this directory:

```bash
./scripts/install-local.sh
```

Then reload Cursor (**Developer: Reload Window**) and confirm the plugin under Customize. Set the API key when prompted.

Manual install:

```bash
mkdir -p ~/.cursor/plugins/local
rm -rf ~/.cursor/plugins/local/superkreator
cp -R . ~/.cursor/plugins/local/superkreator
```

## Manual MCP (without plugin)

```json
{
  "mcpServers": {
    "superkreator": {
      "url": "https://superkreator.com/api/v1/mcp",
      "headers": {
        "Authorization": "Bearer sk_live_..."
      }
    }
  }
}
```

Stdio alternative:

```bash
SUPERKREATOR_API_KEY=sk_live_... node bin/mcp-stdio.mjs
```

## Links

- Product: https://superkreator.com
- Agents: https://superkreator.com/agents
- OpenAPI: https://superkreator.com/api/v1/openapi.json
- Docs: https://superkreator.com/docs/28-agents-api
- Support: support@superkreator.com

## Publish

See [SUBMISSION.md](./SUBMISSION.md) for marketplace packaging and the submit form.
