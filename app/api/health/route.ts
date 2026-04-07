import { NextResponse } from "next/server";

export async function GET() {
  const provider = (process.env.API_PROVIDER || "anthropic").toLowerCase();
  const model = process.env.MODEL || (provider === "openrouter" ? "anthropic/claude-sonnet-4-5" : "claude-sonnet-4-5-20250514");

  const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
  const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY;

  const ready =
    (provider === "anthropic" && hasAnthropicKey) ||
    (provider === "openrouter" && hasOpenRouterKey);

  return NextResponse.json({
    status: ready ? "ok" : "misconfigured",
    provider,
    model,
    keys: {
      ANTHROPIC_API_KEY: hasAnthropicKey ? "set" : "missing",
      OPENROUTER_API_KEY: hasOpenRouterKey ? "set" : "missing",
    },
    hint: ready
      ? undefined
      : provider === "openrouter"
        ? "Set OPENROUTER_API_KEY in Railway env vars"
        : "Set ANTHROPIC_API_KEY in Railway env vars",
  });
}
