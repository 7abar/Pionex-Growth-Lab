import { NextResponse } from "next/server";

const FREE_MODELS = [
  "openrouter/free",
  "qwen/qwen3-coder:free",
  "qwen/qwen-2.5-coder-32b-instruct:free",
  "qwen/qwen2.5-vl-3b-instruct:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-3-27b-it:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "nvidia/llama-3.1-nemotron-70b-instruct:free",
];

export async function GET() {
  const provider = (process.env.API_PROVIDER || "anthropic").toLowerCase();
  const customModel = process.env.MODEL || null;

  const hasAnthropicKey = !!process.env.ANTHROPIC_API_KEY;
  const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY;

  const ready =
    (provider === "anthropic" && hasAnthropicKey) ||
    (provider === "openrouter" && hasOpenRouterKey);

  return NextResponse.json({
    status: ready ? "ok" : "misconfigured",
    provider,
    model: customModel || (provider === "openrouter" ? "auto (free tier)" : "claude-sonnet-4-5-20250514"),
    fallback_chain: provider === "openrouter" ? (customModel ? [customModel, ...FREE_MODELS] : FREE_MODELS) : undefined,
    keys: {
      ANTHROPIC_API_KEY: hasAnthropicKey ? "set" : "missing",
      OPENROUTER_API_KEY: hasOpenRouterKey ? "set" : "missing",
    },
    hint: ready
      ? "All good. Free models will be tried in order until one works."
      : provider === "openrouter"
        ? "Set OPENROUTER_API_KEY in Railway env vars"
        : "Set ANTHROPIC_API_KEY in Railway env vars",
  });
}
