export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  price: number;
  active: boolean;
  actionsThisWeek: number;
  successRate: number;
}

export interface ActivityEntry {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  reason: string;
  status: "completed" | "skipped" | "failed";
  contact?: string;
  company?: string;
}

export interface UsageDay {
  day: string;
  actions: number;
  emails: number;
  webhooks: number;
}

export const agents: Agent[] = [
  { id: "lead-followup", name: "Lead Follow-Up", description: "Automatically follows up with new leads within 2 hours via email or SMS.", category: "Sales", icon: "📧", price: 29, active: true, actionsThisWeek: 47, successRate: 94 },
  { id: "inbox-triage", name: "Inbox Triage", description: "Sorts incoming emails, drafts replies, and flags urgent messages.", category: "Operations", icon: "📥", price: 29, active: true, actionsThisWeek: 128, successRate: 91 },
  { id: "review-request", name: "Review Request", description: "Sends personalized review requests 3 days after job completion.", category: "Reputation", icon: "⭐", price: 29, active: true, actionsThisWeek: 23, successRate: 87 },
  { id: "appointment-reminder", name: "Appointment Reminder", description: "Sends reminders 24h and 1h before scheduled appointments.", category: "Scheduling", icon: "📅", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "invoice-nudge", name: "Invoice Nudge", description: "Politely reminds clients about overdue invoices at 7, 14, and 30 days.", category: "Finance", icon: "💰", price: 29, active: true, actionsThisWeek: 12, successRate: 78 },
  { id: "quote-followup", name: "Quote Follow-Up", description: "Checks in on sent quotes after 3 and 7 days with a friendly nudge.", category: "Sales", icon: "📋", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "missed-call", name: "Missed Call Reply", description: "Texts callers back within 5 minutes when you miss a call.", category: "Operations", icon: "📞", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "onboarding-welcome", name: "Client Welcome", description: "Sends a welcome sequence to new clients with next steps.", category: "Onboarding", icon: "👋", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "referral-ask", name: "Referral Ask", description: "Asks happy clients for referrals 2 weeks after positive feedback.", category: "Growth", icon: "🤝", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "contract-renewal", name: "Contract Renewal", description: "Reminds clients 60 and 30 days before contract expiration.", category: "Retention", icon: "📝", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "social-proof", name: "Social Proof Collector", description: "Collects testimonials and case study quotes from satisfied clients.", category: "Marketing", icon: "📣", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "no-show", name: "No-Show Recovery", description: "Re-engages clients who missed appointments with rescheduling links.", category: "Scheduling", icon: "🔄", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "feedback-survey", name: "Feedback Survey", description: "Sends post-service satisfaction surveys and logs responses.", category: "Quality", icon: "📊", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "birthday-greeting", name: "Birthday Greeting", description: "Sends personalized birthday messages to clients and VIP contacts.", category: "Relationship", icon: "🎂", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
  { id: "inventory-alert", name: "Low Stock Alert", description: "Notifies you when inventory items drop below threshold levels.", category: "Operations", icon: "📦", price: 29, active: false, actionsThisWeek: 0, successRate: 0 },
];

export const activityLog: ActivityEntry[] = [
  { id: "1", timestamp: "2026-07-11T11:42:00Z", agentId: "lead-followup", agentName: "Lead Follow-Up", action: "Sent follow-up email to Marcus Chen", reason: "New lead from website form submitted 2 hours ago with no response yet. Applied warm, professional tone per your settings.", status: "completed", contact: "Marcus Chen", company: "Chen Plumbing Co." },
  { id: "2", timestamp: "2026-07-11T11:15:00Z", agentId: "inbox-triage", agentName: "Inbox Triage", action: "Drafted reply to Sarah Mitchell about rescheduling", reason: "Email classified as scheduling request (confidence 96%). Draft includes 3 available slots from your calendar.", status: "completed", contact: "Sarah Mitchell", company: "Mitchell Design Studio" },
  { id: "3", timestamp: "2026-07-11T10:58:00Z", agentId: "inbox-triage", agentName: "Inbox Triage", action: "Flagged urgent email from Apex Insurance", reason: "Detected deadline language ('by end of day') and insurance category. Moved to Priority inbox.", status: "completed", contact: "David Park", company: "Apex Insurance" },
  { id: "4", timestamp: "2026-07-11T10:30:00Z", agentId: "invoice-nudge", agentName: "Invoice Nudge", action: "Sent payment reminder for Invoice #1042", reason: "Invoice $2,450.00 is 14 days overdue. Used polite second-reminder template.", status: "completed", contact: "Jennifer Walsh", company: "Walsh & Associates" },
  { id: "5", timestamp: "2026-07-11T09:45:00Z", agentId: "review-request", agentName: "Review Request", action: "Sent Google review request to Tom Bradley", reason: "Job #8834 marked complete 3 days ago. Client satisfaction score from survey was 5/5.", status: "completed", contact: "Tom Bradley", company: "Bradley Home Services" },
  { id: "6", timestamp: "2026-07-11T09:12:00Z", agentId: "lead-followup", agentName: "Lead Follow-Up", action: "Skipped follow-up for Lisa Nguyen", reason: "Lead already replied to initial outreach 45 minutes ago. No duplicate follow-up needed.", status: "skipped", contact: "Lisa Nguyen", company: "Nguyen Legal Group" },
  { id: "7", timestamp: "2026-07-11T08:30:00Z", agentId: "inbox-triage", agentName: "Inbox Triage", action: "Archived 12 promotional emails", reason: "Batch classified as marketing/newsletters below priority threshold.", status: "completed" },
  { id: "8", timestamp: "2026-07-10T16:20:00Z", agentId: "lead-followup", agentName: "Lead Follow-Up", action: "Sent SMS follow-up to Robert Hayes", reason: "Email follow-up sent 48h ago with no open. Switched to SMS per escalation rules.", status: "completed", contact: "Robert Hayes", company: "Hayes Electric" },
  { id: "9", timestamp: "2026-07-10T15:05:00Z", agentId: "review-request", agentName: "Review Request", action: "Failed to send review request to Amanda Torres", reason: "Email bounced — address amanda@torreslandscaping invalid. Logged for manual review.", status: "failed", contact: "Amanda Torres", company: "Torres Landscaping" },
  { id: "10", timestamp: "2026-07-10T14:00:00Z", agentId: "invoice-nudge", agentName: "Invoice Nudge", action: "Sent first payment reminder for Invoice #1039", reason: "Invoice $875.00 is 7 days overdue. Used friendly first-reminder template.", status: "completed", contact: "Chris O'Brien", company: "O'Brien Consulting" },
  { id: "11", timestamp: "2026-07-10T11:30:00Z", agentId: "inbox-triage", agentName: "Inbox Triage", action: "Auto-replied to vendor inquiry from SupplyCo", reason: "Recognized as existing vendor. Sent standard pricing sheet attachment.", status: "completed", contact: "Mike Reynolds", company: "SupplyCo Direct" },
  { id: "12", timestamp: "2026-07-10T09:00:00Z", agentId: "lead-followup", agentName: "Lead Follow-Up", action: "Sent follow-up email to Priya Sharma", reason: "Referral lead from existing client Tom Bradley. Applied referral mention in opening line.", status: "completed", contact: "Priya Sharma", company: "Sharma Wellness" },
];

export const usageData: UsageDay[] = [
  { day: "Mon", actions: 34, emails: 28, webhooks: 6 },
  { day: "Tue", actions: 42, emails: 35, webhooks: 7 },
  { day: "Wed", actions: 38, emails: 31, webhooks: 7 },
  { day: "Thu", actions: 51, emails: 42, webhooks: 9 },
  { day: "Fri", actions: 45, emails: 38, webhooks: 7 },
  { day: "Sat", actions: 12, emails: 10, webhooks: 2 },
  { day: "Sun", actions: 8, emails: 6, webhooks: 2 },
];

export const webhookEvents = [
  { id: "wh-1", timestamp: "2026-07-11T11:42:15Z", event: "lead.followup.sent", status: "200 OK", destination: "Zapier → HubSpot" },
  { id: "wh-2", timestamp: "2026-07-11T10:58:30Z", event: "inbox.urgent.flagged", status: "200 OK", destination: "Make → Slack #urgent" },
  { id: "wh-3", timestamp: "2026-07-11T10:30:45Z", event: "invoice.reminder.sent", status: "200 OK", destination: "Zapier → QuickBooks" },
  { id: "wh-4", timestamp: "2026-07-10T16:20:10Z", event: "lead.followup.sms_sent", status: "200 OK", destination: "Make → Twilio log" },
  { id: "wh-5", timestamp: "2026-07-10T09:45:22Z", event: "review.request.sent", status: "502 Error", destination: "Zapier → Google Sheets" },
];

export const digestPreview = {
  weekOf: "July 7 – July 13, 2026",
  totalActions: 230,
  emailsSent: 190,
  leadsContacted: 47,
  reviewsRequested: 23,
  invoicesNudged: 12,
  topAgent: "Inbox Triage",
  highlights: [
    "47 leads followed up — 12 converted to booked calls",
    "128 emails triaged — saved ~4.2 hours of inbox time",
    "3 new 5-star Google reviews received after agent outreach",
    "2 overdue invoices paid within 24h of reminder",
  ],
};

export const integrations = [
  { id: "gmail", name: "Gmail", connected: true, email: "sarah@brightpathagency.com" },
  { id: "outlook", name: "Outlook", connected: false, email: "" },
  { id: "hubspot", name: "HubSpot CRM", connected: true, email: "Bright Path Agency" },
  { id: "quickbooks", name: "QuickBooks", connected: true, email: "brightpath.qb" },
  { id: "google-calendar", name: "Google Calendar", connected: true, email: "sarah@brightpathagency.com" },
  { id: "stripe", name: "Stripe Billing", connected: true, email: "acct_1NxK2..." },
];

export const categories = ["All", "Sales", "Operations", "Reputation", "Scheduling", "Finance", "Onboarding", "Growth", "Retention", "Marketing", "Quality", "Relationship"];
