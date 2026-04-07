export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  promptTemplate: (input: string) => string;
}

export const tools: ToolConfig[] = [
  {
    id: "competitor-teardown",
    title: "Competitor Teardown",
    description: "Analyze any competitor vs Pionex — positioning gaps, experiment ideas.",
    inputLabel: "Competitor name",
    inputPlaceholder: "e.g. 3Commas",
    promptTemplate: (input: string) =>
      `You are a crypto trading bot growth strategist for Pionex. Analyze competitor '${input}' vs Pionex. Return strict JSON: {"positioning":"1 sentence","gaps":["gap1","gap2","gap3"],"experiments":[{"name":"...","hypothesis":"...","channel":"..."}]}. JSON only, no markdown.`,
  },
  {
    id: "content-angles",
    title: "Content Angle Machine",
    description: "Generate viral hooks across 5 formats for any crypto topic.",
    inputLabel: "Topic",
    inputPlaceholder: "e.g. Grid trading bot",
    promptTemplate: (input: string) =>
      `You write viral content for crypto traders. Topic: '${input}' for Pionex. Return strict JSON: {"hooks":[{"format":"Twitter","text":"..."},{"format":"YouTube","text":"..."},{"format":"Reddit","text":"..."},{"format":"Blog","text":"..."},{"format":"Newsletter","text":"..."}]}. JSON only.`,
  },
  {
    id: "cold-outreach",
    title: "Cold Outreach Personalizer",
    description: "Craft a personalized cold DM for Pionex BD outreach.",
    inputLabel: "Lead description",
    inputPlaceholder: "e.g. Crypto YouTuber with 50k subs, focuses on DeFi",
    promptTemplate: (input: string) =>
      `Write a cold DM for Pionex BD outreach. Lead: '${input}'. Return strict JSON: {"subject":"...","message":"...","why_it_works":"1 sentence"}. Message under 80 words. JSON only.`,
  },
  {
    id: "growth-experiments",
    title: "Growth Experiment Brainstormer",
    description: "Generate 3 testable growth experiments for any channel.",
    inputLabel: "Channel",
    inputPlaceholder: "e.g. TikTok",
    promptTemplate: (input: string) =>
      `Generate growth experiments for Pionex on channel '${input}'. Return strict JSON: {"experiments":[{"name":"...","hypothesis":"If X then Y because Z","metric":"...","effort":"Low|Med|High"}]} with 3 experiments. JSON only.`,
  },
];
