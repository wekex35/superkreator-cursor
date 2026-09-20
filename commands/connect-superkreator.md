---
name: connect-superkreator
description: Walk through creating a SuperKreator API key and verifying the Cursor MCP connection
---

# Connect SuperKreator

Help the user finish plugin setup:

1. Open https://superkreator.com/dashboard/settings#agents
2. Create a key with the scopes they need (`read`, `write`, `publish`, `ai`)
3. Paste it into Cursor under **Plugins → SuperKreator → Configure** as `SUPERKREATOR_API_KEY`
4. Call `sk_whoami` to confirm the workspace
5. Call `sk_get_credits` and report remaining AI credits

If auth fails, ask them to recreate the key and confirm they copied the full `sk_live_...` / `sk_test_...` token once.
