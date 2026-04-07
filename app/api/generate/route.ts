import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { tools } from "@/lib/tools";

const client = new Anthropic();

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

    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from Claude" },
        { status: 500 }
      );
    }

    let raw = textBlock.text.trim();

    // Strip markdown json fences if present
    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
