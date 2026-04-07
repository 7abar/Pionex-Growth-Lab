# Pionex Growth Lab

Four AI-powered tools I'd ship in week one as your AI-Powered Growth Manager.

Built with Next.js 14, TypeScript, Tailwind CSS, and the Anthropic Claude API (or any model via OpenRouter).

## Tools

1. **Competitor Teardown** — Analyze any competitor vs Pionex: positioning gaps, experiment ideas
2. **Content Angle Machine** — Generate viral hooks across 5 formats for any crypto topic
3. **Cold Outreach Personalizer** — Craft a personalized cold DM for Pionex BD outreach
4. **Growth Experiment Brainstormer** — Generate 3 testable growth experiments for any channel

## Local Development

```bash
npm install
cp .env.example .env
# Edit .env — set your API provider, model, and API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Railway

1. Push this repo to GitHub
2. Create a new project on [Railway](https://railway.app) → **Deploy from GitHub**
3. Add environment variables (see table below)
4. Railway auto-detects Next.js, builds, and deploys
5. Go to **Settings → Domains** to generate a public URL

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `API_PROVIDER` | No | `anthropic` | `anthropic` or `openrouter` |
| `MODEL` | No | `claude-sonnet-4-5-20250514` | Model ID to use (provider-specific) |
| `ANTHROPIC_API_KEY` | If provider = `anthropic` | — | Anthropic API key |
| `OPENROUTER_API_KEY` | If provider = `openrouter` | — | OpenRouter API key |
| `SITE_URL` | No | — | Your deployed URL (used for OpenRouter rankings) |

### OpenRouter Model Examples

| Model | `MODEL` value |
|---|---|
| Claude Sonnet 4.5 | `anthropic/claude-sonnet-4-5` |
| GPT-4o | `openai/gpt-4o` |
| Gemini 2.5 Pro | `google/gemini-2.5-pro` |
| Llama 4 Maverick | `meta-llama/llama-4-maverick` |

See [openrouter.ai/models](https://openrouter.ai/models) for full list.
