<div align="center">

# Pionex *Growth Lab*

**Four AI-powered tools I'd ship in week one as your AI-Powered Growth Manager.**

[Live Demo](https://pionex-growth-lab-production.up.railway.app) &nbsp;&middot;&nbsp; [Twitter](https://x.com/7abar_eth)

<br />

<img src="https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /> <img src="https://img.shields.io/badge/OpenRouter-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway" />

</div>

---

## What Is This?

A public demo built to showcase how I approach growth — fast prototyping, data-driven experiments, and AI-native workflows. Every tool maps to a real task I'd execute at **Pionex** from day one.

> Built in one session. Deployed on Railway. Powered by free models via OpenRouter.

---

## The 4 Tools

| # | Tool | What It Does |
|---|------|-------------|
| 1 | **Competitor Teardown** | Analyze any competitor vs Pionex — positioning gaps, actionable experiments |
| 2 | **Content Angle Machine** | Generate viral hooks across Twitter, YouTube, Reddit, Blog & Newsletter |
| 3 | **Cold Outreach Personalizer** | Craft a personalized cold DM for Pionex BD outreach (under 80 words) |
| 4 | **Growth Experiment Brainstormer** | Generate 3 testable experiments for any channel with effort ratings |

---

## Quick Start

```bash
git clone https://github.com/7abar/Pionex-Growth-Lab.git
cd Pionex-Growth-Lab
npm install
cp .env.example .env    # then add your API key
npm run dev
```

Open **http://localhost:3000**

---

## Deploy to Railway

1. Fork or push this repo to GitHub
2. Create a new project on [Railway](https://railway.app) → **Deploy from GitHub**
3. Set environment variables (see below)
4. Railway auto-detects Next.js → builds → deploys
5. **Settings → Domains** → generate your public URL

---

## Environment Variables

| Variable | Required | Default | Description |
|:---------|:--------:|:-------:|:------------|
| `API_PROVIDER` | No | `anthropic` | `anthropic` or `openrouter` |
| `MODEL` | No | auto | Model ID — leave empty for free model auto-fallback |
| `ANTHROPIC_API_KEY` | If Anthropic | — | Your Anthropic API key |
| `OPENROUTER_API_KEY` | If OpenRouter | — | Your OpenRouter API key |
| `SITE_URL` | No | — | Your deployed URL (for OpenRouter rankings) |

### Free Model Fallback Chain (OpenRouter)

When `MODEL` is not set and `API_PROVIDER=openrouter`, the app automatically tries free models in order:

```
openrouter/free → qwen3-coder → qwen-2.5-coder-32b → llama-3.3-70b → gemma-3-27b → mistral-small-3.1 → nemotron-70b
```

### Model Examples

| Provider | Model | `MODEL` value |
|:---------|:------|:-------------|
| Free | Auto-pick best free | *(leave empty)* |
| Anthropic | Claude Sonnet 4.5 | `anthropic/claude-sonnet-4-5` |
| OpenAI | GPT-4o | `openai/gpt-4o` |
| Google | Gemini 2.5 Pro | `google/gemini-2.5-pro` |
| Meta | Llama 4 Maverick | `meta-llama/llama-4-maverick` |

Full list at [openrouter.ai/models](https://openrouter.ai/models)

---

## Tech Stack

- **Framework** — Next.js 14 (App Router) + TypeScript
- **Styling** — Tailwind CSS, dark editorial theme, dot-grid background
- **Icons** — lucide-react
- **AI** — Anthropic SDK / OpenRouter (OpenAI-compatible)
- **Deploy** — Railway

---

## What I'd Build Next

- A/B test headline generator with statistical significance calculator
- SEO keyword cluster mapper for crypto trading terms
- Referral loop simulator with viral coefficient modeling
- User onboarding flow optimizer with drop-off analysis

---

<div align="center">

**Built with conviction** &nbsp;&middot;&nbsp; [Live Demo](https://pionex-growth-lab-production.up.railway.app) &nbsp;&middot;&nbsp; [@7abar_eth](https://x.com/7abar_eth)

</div>
