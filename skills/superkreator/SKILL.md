---
name: superkreator
description: Operate a SuperKreator creator workspace (link in bio, UPI store, Instagram AutoDM, publish, planner, AI copy, analytics, YouTube LIVE) via the hosted MCP or REST API. Use when the user wants to manage SuperKreator from Cursor, write captions, create products, set up AutoDM, or schedule posts.
---

# SuperKreator

You are operating SuperKreator, an India-first creator OS. Prefer the hosted MCP tools (`sk_*`) when available. Otherwise call the REST API with the user's scoped key.

## Auth

- Keys are created in the dashboard: [Settings → Agents](https://superkreator.com/dashboard/settings#agents)
- Header: `Authorization: Bearer sk_live_...` or `sk_test_...`
- Scopes: `read`, `write`, `publish`, `ai`
- Never print the full key after the user pastes it. Refer to it as "your SuperKreator key".

## Connect

This Cursor plugin wires the remote MCP at `https://superkreator.com/api/v1/mcp` with `SUPERKREATOR_API_KEY`.

If MCP tools are missing:

1. Confirm the plugin is installed and the API key is set under Plugins → Configure
2. Fall back to REST with curl

REST index: `https://superkreator.com/api/v1`  
OpenAPI: `https://superkreator.com/api/v1/openapi.json`  
Agent map: `https://superkreator.com/llms.txt`  
Canonical skill: `https://superkreator.com/agents/skill.md`

## Workflows

1. **Orient.** Call `sk_whoami` and `sk_get_credits`. Confirm the username and remaining AI credits.
2. **Sell.** `sk_create_product` with `priceInr` in rupees (499 = ₹499). DIGITAL products need `deliveryUrl` before `active: true`. SERVICE needs `bookingUrl`.
3. **Capture comments.** `sk_save_autodm` with trigger `COMMENT_POST_REEL`, keywords like `["link","price"]`, and a product button. Then `sk_set_autodm_status` to ACTIVE. Instagram must already be connected in the dashboard.
4. **Publish.** `sk_list_media` → pick a `mediaId` → `sk_list_accounts` → `sk_create_post` with `publishNow` or `scheduledAt`. You cannot upload bytes through this skill; media must already be in the library.
5. **Write copy.** `sk_generate` tasks: `publish_captions`, `product_copy`, `autodm`, `bio`, `campaign_pack`. Costs 1 AI credit.
6. **Plan the week.** `sk_save_planner` (POST/REMINDER/EVENT need `dueAt`).
7. **Report.** `sk_get_analytics`, `sk_list_orders`. Amounts in the API are rupees unless a field is named `*Paise`.

## Guardrails

- Every MCP/API call is scoped to the workspace that owns the API key. You cannot read or change another creator's data by passing their ids.
- Do not change usernames via API.
- Do not invent Cashfree payouts, refunds, or disconnect OAuth.
- LIVE slots are read-only here; starting a 24×7 stream stays in the dashboard.
- Free plan: 3 products, 30 AI credits/month, 60 API calls/hour.
- If a tool says the key is missing a scope, tell the user to create a new key with that scope.
- Always human-edit prices, delivery URLs, and DM copy before marking a product ACTIVE or an AutoDM ACTIVE.
- Never print the full API key. Never ask for another user's key or workspace id.

## Copy style

Write like SuperKreator: short, India-first, rupees, comments, DMs, UPI. No Silicon Valley filler.
