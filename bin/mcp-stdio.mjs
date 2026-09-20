#!/usr/bin/env node
/**
 * SuperKreator local MCP — stdio bridge to the hosted server.
 *
 *   SUPERKREATOR_API_KEY=sk_live_... node tools/mcp-stdio.mjs
 *   SUPERKREATOR_API_URL=https://dev.superkreator.com SUPERKREATOR_API_KEY=... node tools/mcp-stdio.mjs
 */
const { stdin, stdout, stderr } = process;
const base = (process.env.SUPERKREATOR_API_URL || "https://superkreator.com").replace(
  /\/$/,
  ""
);
const key = process.env.SUPERKREATOR_API_KEY || process.env.SK_API_KEY || "";

if (!key) {
  stderr.write("SUPERKREATOR_API_KEY is required\n");
  process.exit(1);
}

let buffer = "";
stdin.setEncoding("utf8");
stdin.on("data", (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (line) void forward(line);
  }
});

async function forward(line) {
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    return;
  }
  try {
    const res = await fetch(`${base}/api/v1/mcp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
    });
    if (res.status === 202) return;
    const text = await res.text();
    if (!text) return;
    stdout.write(`${text.trim()}\n`);
  } catch (err) {
    const id = message && message.id != null ? message.id : null;
    stdout.write(
      `${JSON.stringify({
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: err instanceof Error ? err.message : String(err),
        },
      })}\n`
    );
  }
}
