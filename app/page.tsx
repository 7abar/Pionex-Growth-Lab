"use client";

import { useState } from "react";
import {
  Crosshair,
  Pen,
  MessageSquare,
  FlaskConical,
  Loader2,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

const TOOLS = [
  {
    id: "competitor-teardown",
    title: "Competitor Teardown",
    description: "Analyze any competitor vs Pionex — positioning gaps, experiment ideas.",
    inputLabel: "COMPETITOR NAME",
    placeholder: "e.g. 3Commas",
    icon: Crosshair,
  },
  {
    id: "content-angles",
    title: "Content Angle Machine",
    description: "Generate viral hooks across 5 formats for any crypto topic.",
    inputLabel: "TOPIC",
    placeholder: "e.g. Grid trading bot",
    icon: Pen,
  },
  {
    id: "cold-outreach",
    title: "Cold Outreach Personalizer",
    description: "Craft a personalized cold DM for Pionex BD outreach.",
    inputLabel: "LEAD DESCRIPTION",
    placeholder: "e.g. Crypto YouTuber with 50k subs, focuses on DeFi",
    icon: MessageSquare,
  },
  {
    id: "growth-experiments",
    title: "Growth Experiment Brainstormer",
    description: "Generate 3 testable growth experiments for any channel.",
    inputLabel: "CHANNEL",
    placeholder: "e.g. TikTok",
    icon: FlaskConical,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ResultRenderer({ toolId, data }: { toolId: string; data: any }) {
  if (toolId === "competitor-teardown") {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-2">
            Positioning
          </p>
          <p className="text-stone-200 text-lg leading-relaxed">
            {data.positioning}
          </p>
        </div>
        <div>
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-3">
            Gaps Identified
          </p>
          <div className="space-y-2">
            {data.gaps?.map((gap: string, i: number) => (
              <div
                key={i}
                className="border border-stone-700 bg-stone-900/50 px-4 py-3 flex items-start gap-3"
              >
                <span className="text-amber-500 font-sans font-bold text-sm mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-stone-200">{gap}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-3">
            Experiments to Run
          </p>
          <div className="grid gap-3">
            {data.experiments?.map(
              (
                exp: { name: string; hypothesis: string; channel: string },
                i: number
              ) => (
                <div
                  key={i}
                  className="border border-stone-700 bg-stone-900/50 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-sans font-bold text-stone-100">
                      {exp.name}
                    </p>
                    <span className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 border border-amber-500/30 px-2 py-0.5">
                      {exp.channel}
                    </span>
                  </div>
                  <p className="text-stone-400 text-sm">{exp.hypothesis}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  if (toolId === "content-angles") {
    const formatColors: Record<string, string> = {
      Twitter: "text-sky-400 border-sky-400/30",
      YouTube: "text-red-400 border-red-400/30",
      Reddit: "text-orange-400 border-orange-400/30",
      Blog: "text-emerald-400 border-emerald-400/30",
      Newsletter: "text-violet-400 border-violet-400/30",
    };
    return (
      <div className="space-y-3">
        {data.hooks?.map(
          (hook: { format: string; text: string }, i: number) => (
            <div
              key={i}
              className="border border-stone-700 bg-stone-900/50 p-4 space-y-2"
            >
              <span
                className={`text-xs font-sans font-bold uppercase tracking-widest border px-2 py-0.5 ${formatColors[hook.format] || "text-amber-500 border-amber-500/30"}`}
              >
                {hook.format}
              </span>
              <p className="text-stone-200 leading-relaxed">{hook.text}</p>
            </div>
          )
        )}
      </div>
    );
  }

  if (toolId === "cold-outreach") {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-2">
            Subject Line
          </p>
          <p className="text-stone-100 text-xl font-sans font-bold">
            {data.subject}
          </p>
        </div>
        <div>
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-2">
            Message
          </p>
          <div className="border border-stone-700 bg-stone-900/50 p-5">
            <p className="text-stone-200 leading-relaxed whitespace-pre-wrap">
              {data.message}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-2">
            Why It Works
          </p>
          <p className="text-stone-400 italic">{data.why_it_works}</p>
        </div>
      </div>
    );
  }

  if (toolId === "growth-experiments") {
    const effortColors: Record<string, string> = {
      Low: "text-emerald-400 border-emerald-400/30",
      Med: "text-amber-400 border-amber-400/30",
      High: "text-red-400 border-red-400/30",
    };
    return (
      <div className="space-y-3">
        {data.experiments?.map(
          (
            exp: {
              name: string;
              hypothesis: string;
              metric: string;
              effort: string;
            },
            i: number
          ) => (
            <div
              key={i}
              className="border border-stone-700 bg-stone-900/50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-sans font-bold text-stone-100">
                  {exp.name}
                </p>
                <span
                  className={`text-xs font-sans font-bold uppercase tracking-widest border px-2 py-0.5 ${effortColors[exp.effort] || "text-stone-400 border-stone-600"}`}
                >
                  {exp.effort}
                </span>
              </div>
              <p className="text-stone-400 text-sm">{exp.hypothesis}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500">
                  Metric:
                </span>
                <span className="text-stone-300 text-sm">{exp.metric}</span>
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  return <pre className="text-stone-400 text-sm">{JSON.stringify(data, null, 2)}</pre>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [errors, setErrors] = useState<Record<number, string>>({});

  const tool = TOOLS[activeTab];

  async function handleRun() {
    const input = inputs[activeTab]?.trim();
    if (!input) return;

    setLoading((prev) => ({ ...prev, [activeTab]: true }));
    setErrors((prev) => ({ ...prev, [activeTab]: "" }));
    setResults((prev) => ({ ...prev, [activeTab]: null }));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: tool.id, input }),
      });

      const data = await res.json();
      if (data.error) {
        setErrors((prev) => ({ ...prev, [activeTab]: data.error }));
      } else {
        setResults((prev) => ({ ...prev, [activeTab]: data }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        [activeTab]: "Network error. Please try again.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [activeTab]: false }));
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-800 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight">
            Pionex{" "}
            <span className="italic text-amber-500 font-serif font-normal">
              Growth Lab
            </span>
          </h1>
          <p className="mt-3 text-stone-400 text-lg max-w-2xl">
            Four AI-powered tools I&apos;d ship in week one as your AI-Powered
            Growth Manager.
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-0 border border-stone-800 mb-8">
            {TOOLS.map((t, i) => {
              const Icon = t.icon;
              const isActive = i === activeTab;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-sans font-bold uppercase tracking-widest transition-colors border-r border-stone-800 last:border-r-0 ${
                    isActive
                      ? "bg-amber-500 text-stone-950"
                      : "bg-stone-900/50 text-stone-400 hover:bg-stone-800 hover:text-stone-200"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{t.title}</span>
                  <span className="md:hidden">{String(i + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          {/* Tool Panel */}
          <div className="border border-stone-800 bg-stone-950/80 backdrop-blur">
            <div className="border-b border-stone-800 p-6">
              <h2 className="text-2xl font-sans font-bold">{tool.title}</h2>
              <p className="text-stone-400 mt-1">{tool.description}</p>
            </div>

            <div className="p-6 space-y-4">
              <label className="block">
                <span className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500 mb-2 block">
                  {tool.inputLabel}
                </span>
                <div className="flex gap-0">
                  <input
                    type="text"
                    value={inputs[activeTab] || ""}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        [activeTab]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !loading[activeTab]) handleRun();
                    }}
                    placeholder={tool.placeholder}
                    className="flex-1 bg-stone-900 border border-stone-700 px-4 py-3 text-stone-100 placeholder:text-stone-600 font-sans text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    onClick={handleRun}
                    disabled={loading[activeTab] || !inputs[activeTab]?.trim()}
                    className="bg-amber-500 text-stone-950 px-6 py-3 font-sans font-bold uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading[activeTab] ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                    Run
                  </button>
                </div>
              </label>

              {errors[activeTab] && (
                <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400 text-sm font-sans">
                  {errors[activeTab]}
                </div>
              )}

              {results[activeTab] && (
                <div className="border-t border-stone-800 pt-6 mt-6">
                  <p className="text-xs font-sans font-bold uppercase tracking-widest text-stone-500 mb-4">
                    Results
                  </p>
                  <ResultRenderer
                    toolId={tool.id}
                    data={results[activeTab]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-3">
              Why This Demo
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              I built this in one session to show how I think about growth:
              start with user problems, prototype fast, measure everything.
              Every tool here maps to a real workflow I&apos;d execute at Pionex.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-3">
              What I&apos;d Build Next
            </h3>
            <ul className="text-stone-400 text-sm leading-relaxed space-y-1">
              <li>A/B test headline generator with statistical significance calc</li>
              <li>SEO keyword cluster mapper for crypto trading terms</li>
              <li>Referral loop simulator with viral coefficient modeling</li>
              <li>User onboarding flow optimizer with drop-off analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-amber-500 mb-3">
              Let&apos;s Talk
            </h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:hire@example.com"
                className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors"
              >
                <Mail size={14} />
                hire@example.com
              </a>
              <a
                href="https://github.com"
                className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-stone-800">
          <p className="text-stone-600 text-xs font-sans uppercase tracking-widest">
            Built with Next.js, Claude API &amp; conviction &mdash; Pionex Growth Lab 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
