import Link from "next/link";

const features = [
  {
    title: "Pre-built agent catalog",
    description: "15 single-task agents ready to deploy — lead follow-up, inbox triage, review requests, and more. Pick one, configure it, go live.",
    icon: "🤖",
  },
  {
    title: "10-minute onboarding",
    description: "Connect Gmail, Outlook, or your CRM in one wizard. Set behavior in plain English. No n8n, no agency setup.",
    icon: "⚡",
  },
  {
    title: "Plain-English activity log",
    description: "See exactly what your agent did and why — every email sent, every decision explained in human language.",
    icon: "📋",
  },
  {
    title: "Webhook + Zapier/Make",
    description: "Slot agents into your existing stack. Trigger via webhook, sync to HubSpot, log to Slack — zero lock-in.",
    icon: "🔗",
  },
  {
    title: "Usage dashboard",
    description: "Track actions per agent, weekly trends, and success rates. Know your ROI at a glance.",
    icon: "📊",
  },
  {
    title: "Weekly email digest",
    description: "Automated summary of everything your agents accomplished — templated, no manual writing required.",
    icon: "📬",
  },
];

const pricingPlans = [
  {
    name: "Single Agent",
    price: "$29",
    period: "/month",
    description: "One agent, one job. Perfect for testing the waters.",
    features: ["1 active agent", "Unlimited actions", "Activity log", "Webhook connector", "Weekly digest"],
    cta: "Start with one agent",
    highlighted: false,
  },
  {
    name: "3-Agent Bundle",
    price: "$69",
    period: "/month",
    description: "Most popular — cover sales, ops, and reputation in one bundle.",
    features: ["3 active agents", "Unlimited actions", "Priority support", "Zapier + Make connectors", "Weekly digest", "Bundle savings: $18/mo"],
    cta: "Get the bundle",
    highlighted: true,
  },
  {
    name: "Per-Agent Add-on",
    price: "$29",
    period: "/agent/mo",
    description: "Add more agents anytime. Same price, same simplicity.",
    features: ["Add agents à la carte", "Mix and match templates", "Volume discounts at 5+", "All integrations included"],
    cta: "Browse catalog",
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-surface-900 to-surface-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDUxLDE2MSwyNTUsMC4wMykiLz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Built for small business owners, not engineers
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              One agent.{" "}
              <span className="gradient-text">One job.</span>
              <br />
              Zero orchestration.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Plug-and-play AI agents for lead follow-up, inbox triage, review requests, and more.
              Go live in under 10 minutes — no agency, no n8n, no complexity.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                Try the interactive demo
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/research" className="btn-secondary px-8 py-3 text-base">
                How we found this idea
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Trusted by service businesses, agencies, and solo operators
            </p>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-white/10 bg-surface-800/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-8 sm:px-6 lg:px-8">
          {[
            { stat: "230", label: "actions this week" },
            { stat: "94%", label: "avg success rate" },
            { stat: "<10 min", label: "to go live" },
            { stat: "1.5 hrs", label: "owner time/week" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-display text-2xl font-bold text-white">{item.stat}</div>
              <div className="text-sm text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Everything you need. Nothing you don&apos;t.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Each agent does exactly one job, has one config screen, and produces one type of output.
              Radical simplicity as a product principle.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card group p-6 transition hover:border-brand-500/30 hover:bg-surface-700/50">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-500/10 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 bg-surface-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Live in 3 steps</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Pick an agent", desc: "Browse 15 pre-built templates. Each one does a single job — lead follow-up, inbox triage, review requests." },
              { step: "02", title: "Connect & configure", desc: "Link Gmail, Outlook, or your CRM. Set tone and rules in plain English. No code required." },
              { step: "03", title: "Go live", desc: "Your agent runs on autopilot via cron or webhooks. Watch the activity log and weekly digest roll in." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 font-display text-xl font-bold text-brand-400">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Simple pricing</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Per-agent subscription with bundle savings. No setup fees, cancel anytime.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card flex flex-col p-8 ${
                  plan.highlighted ? "border-brand-500/50 ring-1 ring-brand-500/20" : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block text-center ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-gradient-to-b from-surface-800/50 to-surface-900 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-heading">Stop orchestrating. Start automating.</h2>
          <p className="mt-4 text-slate-400">
            See the full product mock — agent catalog, onboarding wizard, activity log, integrations, and usage dashboard.
          </p>
          <Link href="/demo" className="btn-primary mt-8 inline-flex px-8 py-3 text-base">
            Launch the demo
          </Link>
        </div>
      </section>
    </>
  );
}
