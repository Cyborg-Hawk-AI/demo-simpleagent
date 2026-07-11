# SimpleAgent

> Plug-and-play single-task AI agents for small businesses, zero orchestration.

## What is SimpleAgent?

SimpleAgent is built for **Small business owners (service businesses, agencies, solo operators) who want AI automation for one specific job — lead follow-up, inbox triage, appointment reminders — without hiring an agency or learning n8n.**. Radical simplicity as a product principle — each agent does exactly one job, has one config screen, and produces one type of output. No orchestration layer, no multi-agent complexity. Built by someone who read the actual Reddit complaints.

### Core MVP features
- Catalog of 10–20 pre-built single-task agents (lead follow-up, inbox triage, review request, appointment reminder, invoice nudge)
- One-page onboarding wizard: connect Gmail/Outlook/CRM, set agent behavior, go live in under 10 minutes
- Plain-English activity log showing exactly what the agent did and why
- Webhook + Zapier/Make connector so agents slot into existing stacks
- Usage dashboard with weekly email digest of actions taken

**Pricing:** Per-agent monthly subscription; bundle discount for 3+ agents at $29/month per agent; $69/month for 3-agent bundle

## The research: why this exists

On r/AI_Agents, a small business owner who had been 'running my businesses on AI agents for months' complained that orchestration layers 'create bottlenecks rather than improving efficiency' for simple tasks. They specifically called out needing 'simple, specialized agents for specific tasks like lead follow-up and inbox management' but said existing solutions 'require full agency setups with unnecessary complexity.' They had already invested months and money into AI agents and were still frustrated. Existing platforms like Relevance AI and Lindy are priced and designed for technical teams, not a plumber or boutique owner who just wants their leads followed up automatically.

**Cluster:** Overly complex AI agent orchestration for small business | **Rubric score:** 113/130 | **Validation:** 9/9 checks passed

**Competitive landscape:** Zapier has broad automation but no opinionated single-task agents; Make is too technical; full AI agency platforms (Relevance AI, Lindy) are expensive and complex. No focused, dead-simple single-task agent storefront exists.

**Go-to-market:** Reddit communities (r/smallbusiness, r/AI_Agents, r/Entrepreneur), cold DM to Indie Hackers audience, AppSumo lifetime deal launch for initial user base

## How this business runs itself (mailbox money)

The goal is passive, low-maintenance recurring revenue: AI is how we build and operate the business, not necessarily what it sells.

Agent execution runs on cron jobs or inbound webhooks — zero human involvement per run. Stripe Billing handles subscription renewals, dunning, and cancellations automatically. A Resend-powered weekly digest emails each customer their agent activity log (templated, no manual writing). Support is handled by an Intercom bot trained on the FAQ; escalations land in a Slack channel reviewed once weekly. New agent templates are built in batch (2–3 hours per template, done once). Estimated owner time: 1.5 hours/week.

**Estimated owner time:** ~1.5 hour(s)/week

**MVP estimate:** Next.js frontend + Supabase + OpenAI Assistants API + Resend for email agents; 3 weeks to launch with 3 agents (lead follow-up, inbox triage, review request)

## Validation checklist (9/9)
- [x] 10+ posts with this pain
- [x] Paying for inferior solution
- [x] Reachable channel
- [x] MVP < 4 weeks
- [x] Price point high enough
- [x] Hair-on-fire problem
- [x] Can pre-sell
- [x] < 3 competitors
- [x] Low-maintenance ops (mailbox money)

## Source pain points (real posts)

### Orchestration layers in multi-agent systems create bottlenecks rather than improving efficiency, making complex agent setups counterproductive for small business tasks.
- **Persona:** Small business owner / AI agent implementer
- **Workaround:** Running multiple separate agents or avoiding orchestration layers entirely
- **Frequency:** daily
- **WTP signal:** Already invested in running AI agents for months across multiple businesses
- **Source:** https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/

### Small businesses need simple, specialized agents for specific tasks like lead follow-up and inbox management, but existing solutions require full agency setups with unnecessary complexity.
- **Persona:** Small business owner
- **Workaround:** Building or configuring partial agent setups or using non-AI automation
- **Frequency:** daily
- **WTP signal:** Already running businesses on AI agents and seeking cost-effective solutions
- **Source:** https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/


## About this program

This demo was auto-built by the **Idea Miner** pipeline: a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically ships a working mock of every idea that passes validation (>=8/9 checks, momentum not declining, not previously built). The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.

_Generated by Idea Miner run 2026-07-11-am on 2026-07-11 12:11 UTC_


## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build (required before deploy)
```

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, features, pricing, CTA |
| `/demo` | Interactive product mock — agent catalog, onboarding wizard, activity log, webhooks, usage dashboard |
| `/developers` | Feature documentation — what's mocked vs. production, integration notes |
| `/research` | Research story — origin, validation, pain points, competitive landscape |

### Tech stack

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** for styling — dark, professional aesthetic
- **Zero backend** — all demo interactivity is client-side React state with hardcoded mock data in `lib/mockData.ts`
- **Zero environment variables** — deploys to Vercel with no configuration

### Project structure

```
app/
  page.tsx          # Landing page
  demo/page.tsx     # Interactive demo (wraps DemoApp)
  developers/       # Developer feature docs
  research/         # Research story page
  layout.tsx        # Root layout with header/footer
  globals.css       # Tailwind + custom styles
components/
  demo/DemoApp.tsx  # Main demo application (all interactive views)
  layout/           # Header, Footer
  ui/               # DevNote, Modal, Toast
lib/
  mockData.ts       # All hardcoded sample data
```

### Deploy to Vercel

1. Push to a Git repository
2. Import the project in [Vercel](https://vercel.com)
3. No environment variables or build settings needed — defaults work out of the box
4. `npm run build` must pass locally before deploying
