import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { tools } from "@/lib/tools";

const API_PROVIDER = (process.env.API_PROVIDER || "anthropic").toLowerCase();

function getModel(): string {
  if (process.env.MODEL) return process.env.MODEL;
  // Sensible defaults per provider
  return API_PROVIDER === "openrouter"
    ? "anthropic/claude-sonnet-4-5"
    : "claude-sonnet-4-5-20250514";
}

async function callAnthropic(prompt: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Add it in Railway env vars.");
  }

  const client = new Anthropic({ apiKey });
  const message = await client.messages.create({
    model: getModel(),
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Anthropic");
  }
  return textBlock.text;
}

async function callOpenRouter(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY is not set. Add it in Railway env vars."
    );
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer":
        process.env.SITE_URL ||
        "https://pionex-growth-lab-production.up.railway.app",
      "X-Title": "Pionex Growth Lab",
    },
    body: JSON.stringify({
      model: getModel(),
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(
      `OpenRouter: ${data.error.message || JSON.stringify(data.error)}`
    );
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(
      "Empty response from OpenRouter. Response: " +
        JSON.stringify(data).slice(0, 200)
    );
  }
  return content as string;
}

function extractJSON(raw: string) {
  let cleaned = raw.trim();

  // Strip markdown code fences
  cleaned = cleaned.replace(/^```(?:json)?\s*/m, "").replace(/\s*```\s*$/m, "");
  cleaned = cleaned.trim();

  // Try parsing directly
  try {
    return JSON.parse(cleaned);
  } catch {
    // Try to extract JSON object from the text
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Could not parse JSON from model response");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool, input } = body;

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

    console.log(
      `[generate] provider=${API_PROVIDER} model=${getModel()} tool=${tool}`
    );

    const raw =
      API_PROVIDER === "openrouter"
        ? await callOpenRouter(prompt)
        : await callAnthropic(prompt);

    const parsed = extractJSON(raw);
    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    console.error("API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
