# Pionex Growth Lab

Four AI-powered tools I'd ship in week one as your AI-Powered Growth Manager.

Built with Next.js 14, TypeScript, Tailwind CSS, and the Anthropic Claude API.

## Tools

1. **Competitor Teardown** — Analyze any competitor vs Pionex: positioning gaps, experiment ideas
2. **Content Angle Machine** — Generate viral hooks across 5 formats for any crypto topic
3. **Cold Outreach Personalizer** — Craft a personalized cold DM for Pionex BD outreach
4. **Growth Experiment Brainstormer** — Generate 3 testable growth experiments for any channel

## Local Development

```bash
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Railway

1. Push this repo to GitHub
2. Create a new project on [Railway](https://railway.app) → **Deploy from GitHub**
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Railway auto-detects Next.js, builds, and deploys
5. Go to **Settings → Domains** to generate a public URL

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
