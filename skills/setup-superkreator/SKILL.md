---
name: setup-superkreator
description: Guide the user through creating a SuperKreator API key and connecting the hosted MCP. Use when the plugin is first installed or MCP auth fails.
---

# Set up SuperKreator MCP

1. Open https://superkreator.com/dashboard/settings#agents
2. Create an API key with the scopes needed (`read`, `write`, `publish`, `ai`)
3. Set `SUPERKREATOR_API_KEY` in the MCP / plugin config (Bearer token)
4. Call `sk_whoami` to confirm the workspace
5. Call `sk_get_credits` and report remaining AI credits

Never print the full key. Refer to it as "your SuperKreator key".

Docs: https://superkreator.com/agents  
OpenAPI: https://superkreator.com/api/v1/openapi.json  
Privacy: https://superkreator.com/privacy
