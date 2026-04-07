import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { tools } from "@/lib/tools";

const API_PROVIDER = process.env.API_PROVIDER || "anthropic"; // "anthropic" | "openrouter"
const MODEL = process.env.MODEL || "claude-sonnet-4-5-20250514";

function getAnthropicClient() {
  return new Anthropic();
}

async function callAnthropic(prompt: string) {
  const client = getAnthropicClient();
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from model");
  }
  return textBlock.text;
}

async function callOpenRouter(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.SITE_URL || "https://pionex-growth-lab.up.railway.app",
      "X-Title": "Pionex Growth Lab",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error: ${res.status} — ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No text response from OpenRouter");
  }
  return content as string;
}

function parseResponse(raw: string) {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  return JSON.parse(cleaned);
}

export async function POST(req: NextRequest) {
  try {
    const { tool, input } = await req.json();

    if (!tool || !input) {
      return NextResponse.json(
        { error: "Missing tool or input" },
        { status: 400 }
      );
    }

    const toolConfig = tools.find((t) => t.id === tool);
    if (!toolConfig) {
      return NextResponse.json({ error: "Unknown tool" }, { status: 400 });
    }

    const prompt = toolConfig.promptTemplate(input);

    const raw =
      API_PROVIDER === "openrouter"
        ? await callOpenRouter(prompt)
        : await callAnthropic(prompt);

    const parsed = parseResponse(raw);
    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    console.error("API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
