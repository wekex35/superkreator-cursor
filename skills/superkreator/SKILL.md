---
name: superkreator
description: Operate a SuperKreator creator workspace (link in bio, UPI store, Instagram AutoDM, lead magnets, publishing, planner, AI copy, AI Influencer drafts, Faceless Reels, analytics, YouTube LIVE) via the hosted MCP or REST API. Use when the user wants to manage SuperKreator from Cursor, write captions, create products, set up AutoDM or lead magnets, or schedule posts.
---

# SuperKreator

You are operating SuperKreator, an India-first creator OS. Prefer the hosted MCP tools (`sk_*`) when available. Otherwise call the REST API with the user's scoped key.

The tools loaded in Cursor can lag a deployment: only call tools present in the connected tool list, and never claim a missing tool is available. For current details, use the tool input schema or https://superkreator.com/llms.txt.

## Auth

- Keys are created in the dashboard: [Settings → Agents](https://superkreator.com/dashboard/settings#agents)
- Header: `Authorization: Bearer sk_live_...` or `sk_test_...`
- Scopes: `read`, `write`, `publish`, `ai`
- Never print the full key after the user pastes it. Refer to it as "your SuperKreator key".

## Connect

This Cursor plugin wires the remote MCP at `https://superkreator.com/api/v1/mcp` with `SUPERKREATOR_API_KEY`.

If MCP tools are missing:

1. Confirm the plugin is installed and the API key is set under Plugins → Configure
2. Reload the window / refresh MCP
3. Fall back to REST with curl

REST index: `https://superkreator.com/api/v1`  
OpenAPI: `https://superkreator.com/api/v1/openapi.json`  
Agent map: `https://superkreator.com/llms.txt`  
Canonical skill: `https://superkreator.com/agents/skill.md`

## General rules

- Call `sk_version` then `sk_whoami` when the workspace, plan, or key scopes are unknown.
- Every resource is scoped to the authenticated workspace. Use IDs returned by this workspace's list/get tools; never guess IDs or cross workspace boundaries.
- Use `sk_get_credits` before optional AI generation. `sk_generate` generally costs one AI credit; Faceless render/media workflows use Faceless credits as reported by their tools.
- Publishing, activating a product or automation, changing public visibility, and scheduling posts are external side effects. Do them only when the user clearly requests that action.
- Report success only from the tool result. For queued jobs, report that they are queued and poll a read tool for completion.

## Tool catalog

### Workspace and profile

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_version` | read | Connected MCP endpoint, server version, environment, commit. |
| `sk_whoami` | read | Workspace, plan, profile URLs, and key scopes. |
| `sk_get_credits` | read | AI credit balance and text/image costs. |
| `sk_get_profile` | read | Read the creator profile and public URLs. |
| `sk_update_profile` | write | Patch `displayName`, `bio`, `isPublished`, or `storePublished`; username cannot be changed. |

### Store, products, orders, and customers

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_list_products` | read | List products; optional `status`, `limit`, `offset`. |
| `sk_get_product` | read | Read one product by `id`. |
| `sk_create_product` | write | Create DIGITAL, PHYSICAL, or SERVICE product. `priceInr` is rupees. DIGITAL needs `deliveryUrl` and SERVICE needs `bookingUrl` before activation. Defaults to draft. |
| `sk_update_product` | write | Patch product fields; setting `active: true` activates it. |
| `sk_set_product_status` | write | Set DRAFT, ACTIVE, or ARCHIVED. |
| `sk_list_orders` | read | List orders with optional pagination/status. Amounts are rupees unless named `*Paise`. |
| `sk_list_customers` | read | List customers and paid order/revenue summaries. |

### Planner, AutoDM, and lead magnets

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_list_planner` | read | List planner cards. |
| `sk_save_planner` | write | Create or update an item (`id` optional); kinds include IDEA, REMINDER, EVENT, CONTENT, POST. REMINDER/EVENT/POST need `dueAt`. |
| `sk_set_planner_status` | write | Set OPEN, DONE, or ARCHIVED. |
| `sk_list_autodm` | read | List Instagram AutoDM automations. |
| `sk_save_autodm` | write | Create/update automation. Trigger, keywords, DM, optional public replies. Destinations: PRODUCT + `productId`, STORE, CUSTOM + `customUrl`, LEAD_MAGNET + `leadMagnetId`, WEBHOOK + `webhookId`. Draft is the safe default. |
| `sk_set_autodm_status` | write | Set DRAFT, ACTIVE, or PAUSED. Activate only on explicit request. |
| `sk_list_lead_magnets` | read | List lead magnet forms with share URLs and submission counts. |
| `sk_save_lead_magnet` | write | Create/update a lead capture form (fields, CTA, success message, optional webhook). Returns `shareUrl` under `/forms/{id}`. |
| `sk_set_lead_magnet_status` | write | Enable or disable a lead magnet form. |
| `sk_list_lead_magnet_leads` | read | List submissions for one lead magnet form id. |

### Social accounts, publishing, and media

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_list_accounts` | read | List connected Instagram, YouTube, and LinkedIn accounts and `canPublish`. |
| `sk_list_posts` | read | Read scheduled, publishing, published, or failed posts. |
| `sk_create_post` | publish | Publish or schedule to `socialAccountIds` with uploaded `mediaId`, caption, and `publishNow` or future `scheduledAt`. LinkedIn supports image posts; YouTube requires video; Instagram caption limit is 2,200 characters. |
| `sk_cancel_post` | publish | Cancel an eligible DRAFT or SCHEDULED post by `id`. |
| `sk_list_media` | read | Browse media and get `mediaId`s. |
| `sk_upload_media` | write or publish | Upload with `dataBase64` plus filename or a fetchable public HTTPS `sourceUrl` (one only), max 25 MB. Defaults to `purpose: PUBLISH`. |
| `sk_create_upload` | write or publish | Reserve signed PUT upload for files up to 75 MB; returns upload ID and URL, expires in 15 minutes. |
| `sk_complete_upload` | write or publish | Confirm signed upload after raw bytes have been PUT; returns the media ID. |

A local path such as `/Users/.../photo.jpg` or a `file://` URL is not uploadable as `sourceUrl`. Prefer a public HTTPS URL, `dataBase64` when bytes are available, or the SuperKreator Media Library.

### Analytics, AI copy, LIVE, and bio links

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_get_analytics` | read | Workspace analytics for `days` (1–90, default 30). |
| `sk_generate` | ai | Generate copy. Tasks include `product_copy`, `autodm`, `form_success_message`, `bio`, `bio_link_titles`, `publish_captions`, `store_seo`, `coupon_kit`, `analytics_insights`, `live_titles`, `campaign_pack`, and more. Check credits first. Treat output as a draft. |
| `sk_list_live` | read | Read YouTube LIVE slots; does not start a stream. |
| `sk_list_links` | read | List bio links, long-text paragraphs, collections, galleries, forms, events. |
| `sk_save_link` | write | Create/update a normal link (`title` + `url`), long-text (`layout: longtext`, `body`), or collection (`layout: collection`, `title`, `steps`). Use `sk_save_lead_magnet` for lead capture forms. |

### AI Influencer

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_list_ai_influencers` | read | List active profiles and draft counts. |
| `sk_list_ai_influencer_drafts` | read | List drafts; optional `influencerId`, status, pagination. |
| `sk_get_ai_influencer_draft` | read | Read caption, hashtags, script, media, disclosure, and status. |
| `sk_generate_ai_influencer_draft` | ai | Queue Director generation for an active `influencerId`. Creates a draft; does not publish. |
| `sk_review_ai_influencer_draft` | write | Mark a DRAFT as APPROVED inside SuperKreator; does not publish. |
| `sk_publish_ai_influencer_autopilot_draft` | publish | Approve and schedule an Autopilot episode. Only on explicit publish/schedule request. |

### Faceless Reels

| Tool | Scope | Use |
| --- | --- | --- |
| `sk_list_faceless_formats` | read | List available Faceless formats and slugs. |
| `sk_list_faceless_series` | read | List workspace series. |
| `sk_create_faceless_series` | write | Create a manual-approval series; use a format slug from the formats tool. |
| `sk_set_faceless_series_status` | write | Set ACTIVE, PAUSED, or ARCHIVED. |
| `sk_list_faceless_episodes` | read | List episodes; optional `seriesId`, pagination. |
| `sk_get_faceless_episode` | read | Read script, scene IDs/prompts, image/render status and rendered URL. |
| `sk_create_faceless_episode` | write | Save externally authored title, hook, script, hashtags, and ordered scenes. |
| `sk_save_faceless_episode` | write | Edit title, script, and existing scenes. |
| `sk_upload_faceless_scene_images` | write | Upload/attach one image per scene (`dataBase64`, public `sourceUrl`, or workspace `mediaId`). |
| `sk_attach_faceless_scene_image` | write | Attach a workspace `mediaId` to one scene. |
| `sk_render_faceless_episode` | ai | Requires an image on every scene. Reuses attached images; may generate voiceover/captions. |
| `sk_generate_faceless_episode` | ai | SuperKreator generates script + media plan. |
| `sk_generate_faceless_media` | ai | Generate/retry missing episode media. |
| `sk_approve_faceless_episode` | publish | Queue a ready episode to connected social accounts. Only on explicit request. |

## Workflows

1. **Orient.** `sk_version` → `sk_whoami` → `sk_get_credits`.
2. **Sell.** `sk_create_product` with `priceInr` in rupees (499 = ₹499). DIGITAL needs `deliveryUrl` before `active: true`. SERVICE needs `bookingUrl`.
3. **Lead magnets + AutoDM.** `sk_save_lead_magnet` builds a shareable form (`fields`, CTA, success message; returns `shareUrl`). Wire AutoDM with `sk_save_autodm` (`COMMENT_POST_REEL`, keywords, optional `commentReplies`, `postId` + `postScope: "SPECIFIC"`). Destinations: PRODUCT / STORE / CUSTOM / LEAD_MAGNET / WEBHOOK. Leave DRAFT unless the user asks to activate. Read submissions with `sk_list_lead_magnet_leads`.
4. **Publish.** Upload via `sk_upload_media` / signed upload → `sk_list_accounts` → `sk_create_post` only with explicit authorization.
5. **Write copy.** `sk_generate` (`publish_captions`, `product_copy`, `autodm`, `bio`, `campaign_pack`, …). Check credits first.
6. **AI Influencer.** `sk_list_ai_influencers` → `sk_generate_ai_influencer_draft` → poll drafts. Publish Autopilot only on explicit request.
7. **Faceless Reels.** Create episode → attach one image per scene → `sk_render_faceless_episode` → review → `sk_approve_faceless_episode` only on explicit request.
8. **Plan the week.** `sk_save_planner` (POST/REMINDER/EVENT need `dueAt`).
9. **Bio.** `sk_save_link` for links, longtext paragraphs, or collections. Forms → `sk_save_lead_magnet`.
10. **Report.** `sk_get_analytics`, `sk_list_orders`. Amounts are rupees unless named `*Paise`.

## Guardrails

- Every MCP/API call is scoped to the workspace that owns the API key. You cannot read or change another creator's data by passing their ids.
- Do not change usernames via API.
- Do not invent Cashfree payouts, refunds, or disconnect OAuth.
- LIVE slots are read-only here; starting a 24×7 stream stays in the dashboard.
- Free plan: 3 products, limited AI credits/month, 60 API calls/hour.
- If a tool says the key is missing a scope, tell the user to create a new key with that scope.
- Always human-edit prices, delivery URLs, and DM copy before marking a product ACTIVE or an AutoDM ACTIVE.
- Never print the full API key. Never ask for another user's key or workspace id.
- Tool absent from the loaded catalog: treat as a deployment or MCP refresh issue. Do not substitute a tool with materially different effects.

## Copy style

Write like SuperKreator: short, India-first, rupees, comments, DMs, UPI. No Silicon Valley filler.
