"use client";

import { useState } from "react";
import DevNote from "@/components/ui/DevNote";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import {
  agents as initialAgents,
  activityLog as initialActivity,
  usageData,
  webhookEvents as initialWebhooks,
  digestPreview,
  integrations as initialIntegrations,
  categories,
  type Agent,
  type ActivityEntry,
} from "@/lib/mockData";

type View = "dashboard" | "catalog" | "onboard" | "activity" | "integrations";

const sidebarItems: { id: View; label: string; icon: string }[] = [
  { id: "dashboard", label: "Usage Dashboard", icon: "📊" },
  { id: "catalog", label: "Agent Catalog", icon: "🤖" },
  { id: "onboard", label: "Onboarding Wizard", icon: "⚡" },
  { id: "activity", label: "Activity Log", icon: "📋" },
  { id: "integrations", label: "Webhooks & Connectors", icon: "🔗" },
];

export default function DemoApp() {
  const { showToast } = useToast();
  const [view, setView] = useState<View>("dashboard");
  const [agents, setAgents] = useState(initialAgents);
  const [activity, setActivity] = useState(initialActivity);
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [webhooks] = useState(initialWebhooks);

  // Catalog state
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentModalOpen, setAgentModalOpen] = useState(false);

  // Activity state
  const [activityFilter, setActivityFilter] = useState("all");
  const [activitySearch, setActivitySearch] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<ActivityEntry | null>(null);

  // Onboarding state
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAgent, setWizardAgent] = useState("lead-followup");
  const [wizardIntegration, setWizardIntegration] = useState("gmail");
  const [wizardTone, setWizardTone] = useState("professional");
  const [wizardDelay, setWizardDelay] = useState("2");
  const [wizardComplete, setWizardComplete] = useState(false);

  // Dashboard state
  const [chartMetric, setChartMetric] = useState<"actions" | "emails" | "webhooks">("actions");
  const [digestModalOpen, setDigestModalOpen] = useState(false);

  // Integrations state
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.zapier.com/hooks/catch/123456/abcdef/");
  const [selectedConnector, setSelectedConnector] = useState<"zapier" | "make">("zapier");
  const [testWebhookModal, setTestWebhookModal] = useState(false);

  const filteredAgents = agents.filter(
    (a) => categoryFilter === "All" || a.category === categoryFilter
  );

  const filteredActivity = activity.filter((entry) => {
    if (activityFilter !== "all" && entry.status !== activityFilter) return false;
    if (activitySearch) {
      const q = activitySearch.toLowerCase();
      return (
        entry.action.toLowerCase().includes(q) ||
        entry.agentName.toLowerCase().includes(q) ||
        entry.contact?.toLowerCase().includes(q) ||
        entry.company?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeAgents = agents.filter((a) => a.active);
  const maxChartVal = Math.max(...usageData.map((d) => d[chartMetric]));

  function toggleAgent(id: string) {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      showToast(
        agent.active ? `${agent.name} paused` : `${agent.name} activated`,
        "success"
      );
    }
  }

  function activateFromCatalog(agent: Agent) {
    if (!agent.active) {
      setAgents((prev) =>
        prev.map((a) => (a.id === agent.id ? { ...a, active: true, actionsThisWeek: 0, successRate: 0 } : a))
      );
      showToast(`${agent.name} activated — configure in onboarding`, "success");
    }
    setSelectedAgent(agent);
    setAgentModalOpen(true);
  }

  function completeWizard() {
    setWizardComplete(true);
    const agent = agents.find((a) => a.id === wizardAgent);
    if (agent && !agent.active) {
      setAgents((prev) =>
        prev.map((a) => (a.id === wizardAgent ? { ...a, active: true } : a))
      );
    }
    const newEntry: ActivityEntry = {
      id: `new-${Date.now()}`,
      timestamp: new Date().toISOString(),
      agentId: wizardAgent,
      agentName: agent?.name || "Agent",
      action: `Agent deployed and running`,
      reason: `Onboarding completed via ${wizardIntegration}. Tone: ${wizardTone}. Follow-up delay: ${wizardDelay} hours.`,
      status: "completed",
    };
    setActivity((prev) => [newEntry, ...prev]);
    showToast("Agent is live! First actions will appear in the activity log.", "success");
  }

  function toggleIntegration(id: string) {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, connected: !i.connected } : i
      )
    );
    const integ = integrations.find((i) => i.id === id);
    if (integ) {
      showToast(
        integ.connected ? `${integ.name} disconnected` : `${integ.name} connected`,
        integ.connected ? "warning" : "success"
      );
    }
  }

  function copyWebhook() {
    navigator.clipboard.writeText(webhookUrl);
    showToast("Webhook URL copied to clipboard", "info");
  }

  function testWebhook() {
    setTestWebhookModal(true);
    setTimeout(() => {
      showToast("Test webhook delivered — 200 OK", "success");
    }, 1500);
  }

  const wizardSteps = ["Choose agent", "Connect tools", "Set behavior", "Review & launch"];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-900">
      {/* Demo header bar */}
      <div className="border-b border-white/10 bg-surface-800/50 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              LIVE DEMO
            </span>
            <span className="text-sm text-slate-400">
              Bright Path Agency — <span className="text-slate-300">sarah@brightpathagency.com</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="hidden sm:inline">{activeAgents.length} agents active</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>{activity.length} log entries</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-white/10 p-4 lg:block">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                  view === item.id
                    ? "bg-brand-600/20 text-brand-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile nav */}
        <div className="flex w-full gap-1 overflow-x-auto border-b border-white/10 p-2 lg:hidden">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${
                view === item.id ? "bg-brand-600/20 text-brand-300" : "text-slate-400"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* DASHBOARD */}
          {view === "dashboard" && (
            <div className="animate-fade-in space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-2xl font-bold text-white">Usage Dashboard</h1>
                  <p className="text-sm text-slate-400">Week of July 7 – 13, 2026</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDigestModalOpen(true)}
                  className="btn-secondary text-sm"
                >
                  Preview weekly digest
                  <DevNote note="In production, Resend sends a templated weekly email digest to each customer summarizing agent activity. Cron job runs Sunday 8am per timezone." />
                </button>
              </div>

              {/* Stats cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total actions", value: "230", change: "+18%", color: "brand" },
                  { label: "Emails sent", value: "190", change: "+12%", color: "cyan" },
                  { label: "Active agents", value: String(activeAgents.length), change: "of 15", color: "emerald" },
                  { label: "Success rate", value: "91%", change: "+2%", color: "amber" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5">
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="mt-1 font-display text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-emerald-400">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="glass-card p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold text-white">
                    Weekly activity
                    <DevNote note="Production: metrics aggregated from agent run logs in Supabase, refreshed hourly. Chart uses Recharts or similar." />
                  </h2>
                  <div className="flex gap-1 rounded-lg bg-surface-700 p-1">
                    {(["actions", "emails", "webhooks"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setChartMetric(m)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                          chartMetric === m ? "bg-brand-600 text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex h-48 items-end gap-3">
                  {usageData.map((day) => (
                    <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                      <span className="text-xs font-medium text-slate-300">{day[chartMetric]}</span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-300"
                        style={{ height: `${(day[chartMetric] / maxChartVal) * 100}%`, minHeight: "8px" }}
                      />
                      <span className="text-xs text-slate-500">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Per-agent breakdown */}
              <div className="glass-card overflow-hidden">
                <div className="border-b border-white/10 px-6 py-4">
                  <h2 className="font-display text-lg font-semibold text-white">Per-agent breakdown</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-slate-400">
                        <th className="px-6 py-3 font-medium">Agent</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Actions</th>
                        <th className="px-6 py-3 font-medium">Success</th>
                        <th className="px-6 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents
                        .filter((a) => a.active)
                        .map((agent) => (
                          <tr key={agent.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-3">
                              <span className="mr-2">{agent.icon}</span>
                              <span className="text-white">{agent.name}</span>
                            </td>
                            <td className="px-6 py-3">
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                Running
                              </span>
                            </td>
                            <td className="px-6 py-3 text-slate-300">{agent.actionsThisWeek}</td>
                            <td className="px-6 py-3 text-slate-300">{agent.successRate}%</td>
                            <td className="px-6 py-3">
                              <button
                                type="button"
                                onClick={() => toggleAgent(agent.id)}
                                className="text-xs text-amber-400 hover:text-amber-300"
                              >
                                Pause
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CATALOG */}
          {view === "catalog" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Agent Catalog
                  <DevNote note="Production: agent templates stored as JSON configs in Supabase. Each template defines triggers, actions, and default prompts. New templates built in batch (2-3 hrs each)." />
                </h1>
                <p className="text-sm text-slate-400">15 pre-built single-task agents — pick one, configure, go live</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                      categoryFilter === cat
                        ? "bg-brand-600 text-white"
                        : "bg-surface-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`glass-card flex flex-col p-5 transition hover:border-brand-500/30 ${
                      agent.active ? "border-emerald-500/20" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-2xl">{agent.icon}</span>
                      {agent.active ? (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-400">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-surface-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500">
                          Available
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display font-semibold text-white">{agent.name}</h3>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-400">{agent.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{agent.category}</span>
                      <span className="text-sm font-semibold text-brand-400">${agent.price}/mo</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => activateFromCatalog(agent)}
                        className="btn-primary flex-1 text-xs"
                      >
                        {agent.active ? "Configure" : "Activate"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setAgentModalOpen(true);
                        }}
                        className="btn-secondary text-xs"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ONBOARDING */}
          {view === "onboard" && (
            <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Onboarding Wizard
                  <DevNote note="Production: OAuth flows for Gmail/Outlook/HubSpot. Config saved to Supabase. Agent deployed to serverless cron or webhook listener. Target: under 10 minutes end-to-end." />
                </h1>
                <p className="text-sm text-slate-400">Connect, configure, and go live in under 10 minutes</p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2">
                {wizardSteps.map((step, i) => (
                  <div key={step} className="flex flex-1 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => !wizardComplete && setWizardStep(i)}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                        wizardComplete || i < wizardStep
                          ? "bg-emerald-600 text-white"
                          : i === wizardStep
                            ? "bg-brand-600 text-white"
                            : "bg-surface-600 text-slate-400"
                      }`}
                    >
                      {wizardComplete || i < wizardStep ? "✓" : i + 1}
                    </button>
                    <span className={`hidden text-xs sm:inline ${i === wizardStep ? "text-white" : "text-slate-500"}`}>
                      {step}
                    </span>
                    {i < wizardSteps.length - 1 && <div className="h-px flex-1 bg-surface-600" />}
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                {wizardComplete ? (
                  <div className="text-center py-8">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
                      🎉
                    </div>
                    <h2 className="font-display text-xl font-bold text-white">Your agent is live!</h2>
                    <p className="mt-2 text-sm text-slate-400">
                      {agents.find((a) => a.id === wizardAgent)?.name} is now running. Check the activity log for updates.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setWizardComplete(false);
                        setWizardStep(0);
                      }}
                      className="btn-secondary mt-6 text-sm"
                    >
                      Deploy another agent
                    </button>
                  </div>
                ) : (
                  <>
                    {wizardStep === 0 && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-semibold text-white">Choose your agent</h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {agents.slice(0, 6).map((agent) => (
                            <button
                              key={agent.id}
                              type="button"
                              onClick={() => setWizardAgent(agent.id)}
                              className={`rounded-lg border p-4 text-left transition ${
                                wizardAgent === agent.id
                                  ? "border-brand-500 bg-brand-500/10"
                                  : "border-white/10 hover:border-white/20"
                              }`}
                            >
                              <span className="text-xl">{agent.icon}</span>
                              <p className="mt-2 text-sm font-medium text-white">{agent.name}</p>
                              <p className="mt-1 text-xs text-slate-400">{agent.description.slice(0, 60)}...</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {wizardStep === 1 && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-semibold text-white">Connect your tools</h2>
                        <div className="space-y-3">
                          {[
                            { id: "gmail", name: "Gmail", desc: "sarah@brightpathagency.com" },
                            { id: "outlook", name: "Outlook", desc: "Not connected" },
                            { id: "hubspot", name: "HubSpot CRM", desc: "Bright Path Agency" },
                          ].map((tool) => (
                            <button
                              key={tool.id}
                              type="button"
                              onClick={() => setWizardIntegration(tool.id)}
                              className={`flex w-full items-center justify-between rounded-lg border p-4 transition ${
                                wizardIntegration === tool.id
                                  ? "border-brand-500 bg-brand-500/10"
                                  : "border-white/10 hover:border-white/20"
                              }`}
                            >
                              <div className="text-left">
                                <p className="text-sm font-medium text-white">{tool.name}</p>
                                <p className="text-xs text-slate-400">{tool.desc}</p>
                              </div>
                              {wizardIntegration === tool.id && (
                                <span className="text-emerald-400 text-sm">Selected</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => showToast("OAuth flow would open in production", "info")}
                          className="btn-secondary w-full text-sm"
                        >
                          Connect {wizardIntegration === "gmail" ? "Gmail" : wizardIntegration === "outlook" ? "Outlook" : "HubSpot"}
                        </button>
                      </div>
                    )}

                    {wizardStep === 2 && (
                      <div className="space-y-5">
                        <h2 className="font-display text-lg font-semibold text-white">Set agent behavior</h2>
                        <div>
                          <label className="mb-2 block text-sm text-slate-400">Communication tone</label>
                          <div className="flex gap-2">
                            {["friendly", "professional", "casual"].map((tone) => (
                              <button
                                key={tone}
                                type="button"
                                onClick={() => setWizardTone(tone)}
                                className={`rounded-lg px-4 py-2 text-sm capitalize transition ${
                                  wizardTone === tone
                                    ? "bg-brand-600 text-white"
                                    : "bg-surface-700 text-slate-400 hover:text-white"
                                }`}
                              >
                                {tone}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-slate-400">
                            Follow-up delay: {wizardDelay} hours
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="48"
                            value={wizardDelay}
                            onChange={(e) => setWizardDelay(e.target.value)}
                            className="w-full accent-brand-500"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-slate-400">Custom instructions (optional)</label>
                          <textarea
                            className="w-full rounded-lg border border-white/10 bg-surface-700 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                            rows={3}
                            placeholder="e.g. Always mention our 10% referral discount..."
                            defaultValue="Mention we're booking 2 weeks out. Always include a link to schedule."
                          />
                        </div>
                      </div>
                    )}

                    {wizardStep === 3 && (
                      <div className="space-y-4">
                        <h2 className="font-display text-lg font-semibold text-white">Review & launch</h2>
                        <div className="space-y-3 rounded-lg bg-surface-700/50 p-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Agent</span>
                            <span className="text-white">{agents.find((a) => a.id === wizardAgent)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Integration</span>
                            <span className="text-white capitalize">{wizardIntegration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Tone</span>
                            <span className="text-white capitalize">{wizardTone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Follow-up delay</span>
                            <span className="text-white">{wizardDelay} hours</span>
                          </div>
                          <div className="flex justify-between border-t border-white/10 pt-3">
                            <span className="text-slate-400">Monthly cost</span>
                            <span className="font-semibold text-brand-400">$29/mo</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() => setWizardStep(Math.max(0, wizardStep - 1))}
                        disabled={wizardStep === 0}
                        className="btn-secondary text-sm disabled:opacity-30"
                      >
                        Back
                      </button>
                      {wizardStep < 3 ? (
                        <button
                          type="button"
                          onClick={() => setWizardStep(wizardStep + 1)}
                          className="btn-primary text-sm"
                        >
                          Continue
                        </button>
                      ) : (
                        <button type="button" onClick={completeWizard} className="btn-primary text-sm">
                          Launch agent
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ACTIVITY LOG */}
          {view === "activity" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Activity Log
                  <DevNote note="Production: every agent action logged to Supabase with timestamp, agent ID, action text, AI-generated reason, and status. Rendered in real-time via polling or SSE." />
                </h1>
                <p className="text-sm text-slate-400">Plain-English record of what your agents did and why</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Search by contact, company, or action..."
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-surface-700 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
                />
                <div className="flex gap-1 rounded-lg bg-surface-700 p-1">
                  {["all", "completed", "skipped", "failed"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActivityFilter(f)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                        activityFilter === f ? "bg-brand-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredActivity.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedActivity(entry)}
                    className="glass-card w-full p-4 text-left transition hover:border-brand-500/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            entry.status === "completed"
                              ? "bg-emerald-400"
                              : entry.status === "skipped"
                                ? "bg-amber-400"
                                : "bg-red-400"
                          }`}
                        />
                        <span className="text-sm font-medium text-white">{entry.action}</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(entry.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">{entry.reason}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded bg-surface-600 px-2 py-0.5 text-[10px] text-slate-300">
                        {entry.agentName}
                      </span>
                      {entry.contact && (
                        <span className="rounded bg-surface-600 px-2 py-0.5 text-[10px] text-slate-300">
                          {entry.contact}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INTEGRATIONS */}
          {view === "integrations" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-white">
                  Webhooks & Connectors
                  <DevNote note="Production: outbound webhooks fire on agent events (POST to customer URL). Zapier/Make use standard webhook triggers. Inbound webhooks trigger agent runs (e.g. new CRM lead)." />
                </h1>
                <p className="text-sm text-slate-400">Connect SimpleAgent to your existing stack</p>
              </div>

              {/* Connector tabs */}
              <div className="flex gap-1 rounded-lg bg-surface-700 p-1 w-fit">
                {(["zapier", "make"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedConnector(c)}
                    className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition ${
                      selectedConnector === c ? "bg-brand-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {c === "zapier" ? "Zapier" : "Make (Integromat)"}
                  </button>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Webhook config */}
                <div className="glass-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-white">Outbound webhook</h2>
                  <p className="text-xs text-slate-400">
                    Agent events are POSTed to this URL as JSON. Use with {selectedConnector === "zapier" ? "Zapier" : "Make"} &quot;Webhooks by {selectedConnector === "zapier" ? "Zapier" : "Make"}&quot; trigger.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-surface-700 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    />
                    <button type="button" onClick={copyWebhook} className="btn-secondary text-xs shrink-0">
                      Copy
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={testWebhook} className="btn-primary text-xs">
                      Send test event
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast("Webhook URL regenerated", "info")}
                      className="btn-secondary text-xs"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>

                {/* Connected integrations */}
                <div className="glass-card p-6 space-y-4">
                  <h2 className="font-display text-lg font-semibold text-white">Connected services</h2>
                  <div className="space-y-3">
                    {integrations.map((integ) => (
                      <div
                        key={integ.id}
                        className="flex items-center justify-between rounded-lg border border-white/10 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{integ.name}</p>
                          <p className="text-xs text-slate-400">
                            {integ.connected ? integ.email : "Not connected"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleIntegration(integ.id)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            integ.connected
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          }`}
                        >
                          {integ.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Webhook event log */}
              <div className="glass-card overflow-hidden">
                <div className="border-b border-white/10 px-6 py-4">
                  <h2 className="font-display text-lg font-semibold text-white">Recent webhook deliveries</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-slate-400">
                        <th className="px-6 py-3 font-medium">Timestamp</th>
                        <th className="px-6 py-3 font-medium">Event</th>
                        <th className="px-6 py-3 font-medium">Destination</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webhooks.map((wh) => (
                        <tr key={wh.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-3 text-slate-400">
                            {new Date(wh.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-6 py-3 font-mono text-xs text-brand-300">{wh.event}</td>
                          <td className="px-6 py-3 text-slate-300">{wh.destination}</td>
                          <td className="px-6 py-3">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                wh.status.includes("200")
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {wh.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agent detail modal */}
      <Modal open={agentModalOpen} onClose={() => setAgentModalOpen(false)} title={selectedAgent?.name || "Agent"} size="lg">
        {selectedAgent && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedAgent.icon}</span>
              <div>
                <p className="text-sm text-slate-400">{selectedAgent.category}</p>
                <p className="text-lg font-semibold text-white">${selectedAgent.price}/month</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">{selectedAgent.description}</p>
            {selectedAgent.active && (
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-surface-700/50 p-4">
                <div>
                  <p className="text-xs text-slate-400">Actions this week</p>
                  <p className="text-xl font-bold text-white">{selectedAgent.actionsThisWeek}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Success rate</p>
                  <p className="text-xl font-bold text-white">{selectedAgent.successRate}%</p>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (!selectedAgent.active) toggleAgent(selectedAgent.id);
                  setAgentModalOpen(false);
                  setView("onboard");
                  setWizardAgent(selectedAgent.id);
                  showToast("Opening onboarding wizard...", "info");
                }}
                className="btn-primary flex-1 text-sm"
              >
                {selectedAgent.active ? "Reconfigure" : "Activate & configure"}
              </button>
              <button type="button" onClick={() => setAgentModalOpen(false)} className="btn-secondary text-sm">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Activity detail modal */}
      <Modal
        open={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title="Activity detail"
        size="lg"
      >
        {selectedActivity && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                  selectedActivity.status === "completed"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : selectedActivity.status === "skipped"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-red-500/20 text-red-400"
                }`}
              >
                {selectedActivity.status}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(selectedActivity.timestamp).toLocaleString()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{selectedActivity.action}</p>
              <p className="mt-1 text-xs text-slate-400">via {selectedActivity.agentName}</p>
            </div>
            <div className="rounded-lg bg-surface-700/50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">Why the agent did this</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{selectedActivity.reason}</p>
            </div>
            {selectedActivity.contact && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Contact</p>
                  <p className="text-white">{selectedActivity.contact}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Company</p>
                  <p className="text-white">{selectedActivity.company}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Digest preview modal */}
      <Modal open={digestModalOpen} onClose={() => setDigestModalOpen(false)} title="Weekly digest preview" size="lg">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Week of {digestPreview.weekOf}</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Total actions", value: digestPreview.totalActions },
              { label: "Emails sent", value: digestPreview.emailsSent },
              { label: "Leads contacted", value: digestPreview.leadsContacted },
              { label: "Reviews requested", value: digestPreview.reviewsRequested },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-surface-700/50 p-3 text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium text-white">Highlights</p>
            <ul className="mt-2 space-y-2">
              {digestPreview.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-500">
            Top performing agent: <span className="text-brand-400">{digestPreview.topAgent}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              showToast("Digest preview sent to sarah@brightpathagency.com", "success");
              setDigestModalOpen(false);
            }}
            className="btn-primary w-full text-sm"
          >
            Send test digest
          </button>
        </div>
      </Modal>

      {/* Test webhook modal */}
      <Modal open={testWebhookModal} onClose={() => setTestWebhookModal(false)} title="Test webhook sent" size="sm">
        <div className="space-y-3 text-sm">
          <p className="text-slate-300">POST delivered to:</p>
          <code className="block rounded bg-surface-700 p-2 text-xs text-brand-300 break-all">{webhookUrl}</code>
          <pre className="rounded bg-surface-700 p-3 text-xs text-slate-300 overflow-x-auto">
{`{
  "event": "test.ping",
  "agent": "lead-followup",
  "timestamp": "${new Date().toISOString()}",
  "data": { "message": "Test from SimpleAgent" }
}`}
          </pre>
          <button type="button" onClick={() => setTestWebhookModal(false)} className="btn-primary w-full text-sm">
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
