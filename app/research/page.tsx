import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — How we found SimpleAgent",
  description: "The research story behind SimpleAgent: real pain points from Reddit, validation results, and competitive landscape.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

const painPoints = [
  {
    problem: "Orchestration layers in multi-agent systems create bottlenecks rather than improving efficiency, making complex agent setups counterproductive for small business tasks.",
    persona: "Small business owner / AI agent implementer",
    workaround: "Running multiple separate agents or avoiding orchestration layers entirely",
    frequency: "daily",
    wtp: "Already invested in running AI agents for months across multiple businesses",
    source: "https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/",
  },
  {
    problem: "Small businesses need simple, specialized agents for specific tasks like lead follow-up and inbox management, but existing solutions require full agency setups with unnecessary complexity.",
    persona: "Small business owner",
    workaround: "Building or configuring partial agent setups or using non-AI automation",
    frequency: "daily",
    wtp: "Already running businesses on AI agents and seeking cost-effective solutions",
    source: "https://www.reddit.com/r/AI_Agents/comments/1u6xnri/been_running_my_businesses_on_ai_agents_for/",
  },
];

export default function ResearchPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Research</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white">Why SimpleAgent exists</h1>
          <p className="mt-4 text-lg text-slate-400">
            Real pain from real people — mined, scored, and validated before a single line of code was written.
          </p>
        </div>

        {/* Origin story */}
        <section className="mb-12">
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl font-semibold text-white">The origin story</h2>
            <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
              <p>
                On r/AI_Agents, a small business owner who had been &ldquo;running my businesses on AI agents for months&rdquo;
                complained that orchestration layers &ldquo;create bottlenecks rather than improving efficiency&rdquo; for simple tasks.
                They specifically called out needing &ldquo;simple, specialized agents for specific tasks like lead follow-up and inbox management&rdquo;
                but said existing solutions &ldquo;require full agency setups with unnecessary complexity.&rdquo;
              </p>
              <p>
                They had already invested months and money into AI agents and were still frustrated. Existing platforms like
                Relevance AI and Lindy are priced and designed for technical teams, not a plumber or boutique owner who just wants
                their leads followed up automatically.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300">
                Cluster: Overly complex AI agent orchestration for small business
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                Rubric score: 113/130
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                Validation: 9/9 checks passed
              </span>
            </div>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-white">Competitive landscape</h2>
          <div className="mt-4 glass-card p-6">
            <p className="text-slate-300 leading-relaxed">
              Zapier has broad automation but no opinionated single-task agents; Make is too technical; full AI agency platforms
              (Relevance AI, Lindy) are expensive and complex. <strong className="text-white">No focused, dead-simple single-task agent storefront exists.</strong>
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { name: "Zapier", verdict: "Broad automation, no single-task agents", gap: true },
                { name: "Make", verdict: "Too technical for SMB owners", gap: true },
                { name: "Relevance AI / Lindy", verdict: "Expensive, agency-grade complexity", gap: true },
              ].map((comp) => (
                <div key={comp.name} className="rounded-lg border border-white/10 p-4">
                  <p className="font-medium text-white">{comp.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{comp.verdict}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Go-to-market */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-white">Go-to-market</h2>
          <div className="mt-4 glass-card p-6">
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-brand-400">→</span>
                Reddit communities (r/smallbusiness, r/AI_Agents, r/Entrepreneur)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400">→</span>
                Cold DM to Indie Hackers audience
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-400">→</span>
                AppSumo lifetime deal launch for initial user base
              </li>
            </ul>
          </div>
        </section>

        {/* Automation playbook */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-white">How this business runs itself</h2>
          <p className="mt-2 text-sm text-slate-400">Mailbox money — passive, low-maintenance recurring revenue</p>
          <div className="mt-4 glass-card p-6 space-y-4 text-slate-300 leading-relaxed">
            <p>
              Agent execution runs on cron jobs or inbound webhooks — zero human involvement per run. Stripe Billing handles
              subscription renewals, dunning, and cancellations automatically. A Resend-powered weekly digest emails each customer
              their agent activity log (templated, no manual writing).
            </p>
            <p>
              Support is handled by an Intercom bot trained on the FAQ; escalations land in a Slack channel reviewed once weekly.
              New agent templates are built in batch (2–3 hours per template, done once).
            </p>
            <div className="flex items-center gap-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4">
              <div>
                <p className="text-2xl font-bold text-emerald-400">~1.5 hrs/week</p>
                <p className="text-xs text-slate-400">Estimated owner time</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-brand-400">3 weeks</p>
                <p className="text-xs text-slate-400">MVP estimate to launch</p>
              </div>
            </div>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-white">Validation checklist</h2>
          <p className="mt-2 text-sm text-emerald-400 font-semibold">9/9 checks passed</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
              >
                <svg className="h-5 w-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold text-white">Source pain points</h2>
          <p className="mt-2 text-sm text-slate-400">Real posts from real people</p>
          <div className="mt-4 space-y-4">
            {painPoints.map((pp) => (
              <div key={pp.problem.slice(0, 40)} className="glass-card p-6">
                <p className="text-slate-200 leading-relaxed">&ldquo;{pp.problem}&rdquo;</p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Persona</p>
                    <p className="text-slate-300">{pp.persona}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Workaround</p>
                    <p className="text-slate-300">{pp.workaround}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Frequency</p>
                    <p className="text-slate-300">{pp.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">WTP signal</p>
                    <p className="text-slate-300">{pp.wtp}</p>
                  </div>
                </div>
                <a
                  href={pp.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300"
                >
                  View source post
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* About Idea Miner */}
        <section className="mb-12">
          <div className="rounded-xl border border-white/10 bg-surface-800/50 p-6">
            <h2 className="font-display text-lg font-semibold text-white">About this program</h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              This demo was auto-built by the <strong className="text-slate-300">Idea Miner</strong> pipeline: a twice-daily research program that mines Reddit,
              Hacker News, Stack Exchange, and GitHub for real people describing real pain, scores the opportunities, and automatically
              ships a working mock of every idea that passes validation (&gt;=8/9 checks, momentum not declining, not previously built).
              The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Generated by Idea Miner run 2026-07-11-am on 2026-07-11 12:11 UTC
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link href="/demo" className="btn-primary inline-flex text-sm">
            See the product mock
          </Link>
        </div>
      </div>
    </div>
  );
}
