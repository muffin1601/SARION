export type CommercialPage = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  intro: string;
  problemTitle: string;
  problems: { title: string; description: string }[];
  workflowTitle: string;
  workflow: { step: string; title: string; description: string }[];
  capabilities: { title: string; description: string; href: string }[];
  audience: string[];
  stackTitle: string;
  stackCopy: string;
  faq: { question: string; answer: string }[];
};

export const COMMERCIAL_PAGES: CommercialPage[] = [
  {
    slug: "agency-crm",
    eyebrow: "Agency CRM",
    title: "Agency CRM built for the work after the sale",
    metaTitle: "Agency CRM Software for Client Delivery | Sarion",
    description: "Manage agency clients, notes, projects, invoices, and portal activity from one connected CRM built for ongoing client delivery.",
    primaryKeyword: "agency CRM",
    keywords: ["CRM for agencies", "agency CRM software", "CRM for small agencies", "post-sales CRM", "CRM with project management and invoicing"],
    intro: "Sales CRMs are good at moving a lead toward a signed deal. Agency work becomes harder after that point: the account manager needs context, the delivery team needs a clear project, finance needs invoice visibility, and the client wants answers. Sarion keeps that ongoing relationship on one client record instead of handing it across disconnected tools.",
    problemTitle: "A client relationship is more than a pipeline stage",
    problems: [
      { title: "Context disappears after handoff", description: "Contact details may live in a CRM while delivery notes, decisions, and files move into inboxes and private documents." },
      { title: "Projects lose the client history", description: "A generic task board can show work in progress, but not the full relationship, invoice status, and client-facing experience around it." },
      { title: "Account managers chase answers", description: "Without one record, even a simple client question can require checking several systems and asking multiple teammates." },
    ],
    workflowTitle: "One client record connects the delivery lifecycle",
    workflow: [
      { step: "01", title: "Create the client once", description: "Store the company, contact details, phone number, notes, and relationship context on a searchable record." },
      { step: "02", title: "Attach delivery work", description: "Create projects and task checklists against that client so ownership, status, and due dates remain connected." },
      { step: "03", title: "Keep the client informed", description: "Share the client's unique portal link so project updates, comments, files, and invoices have one client-facing home." },
      { step: "04", title: "Track the commercial history", description: "Create and monitor invoices beside the client and project rather than rebuilding the relationship in a separate billing tracker." },
    ],
    capabilities: [
      { title: "Client records and activity", description: "Searchable details, notes, and history for every active relationship.", href: "/features/crm" },
      { title: "Client-linked projects", description: "Status, dates, tasks, and ownership tied back to the account.", href: "/features/projects" },
      { title: "Branded client portal", description: "A shareable space for updates, comments, files, and invoice visibility.", href: "/client-portal" },
      { title: "Invoices on the record", description: "Draft, sent, paid, overdue, and aging visibility in the same workspace.", href: "/agency-invoicing" },
    ],
    audience: ["Small agencies replacing spreadsheets", "Account managers responsible for ongoing clients", "Creative and digital teams that do not need a heavyweight sales CRM", "Consultants and freelancers managing repeat engagements"],
    stackTitle: "CRM, project management, and invoicing should share context",
    stackCopy: "Connecting three specialist tools can work, but it also creates duplicate records, permission maintenance, fragile automations, and reporting gaps. Sarion is designed for agencies that prefer a simpler operating model: a client record at the center, with delivery and billing attached. Teams that need complex prospecting, marketing automation, or enterprise sales forecasting may still prefer a dedicated sales CRM before Sarion.",
    faq: [
      { question: "What is an agency CRM?", answer: "An agency CRM organizes client relationships and the work around them. In Sarion, the client record connects contact details, notes, projects, invoices, activity, and a client portal, with an emphasis on delivery after a deal closes." },
      { question: "Does Sarion include a sales pipeline?", answer: "Sarion is focused on post-sale client management and delivery rather than complex lead scoring, deal forecasting, or marketing automation." },
      { question: "Can a small agency start free?", answer: "Yes. Sarion has a free plan for one client and one active project, and paid plans start with a 14-day trial without a credit card." },
      { question: "Can I migrate from spreadsheets?", answer: "Yes. You can move client details into structured records and then create the related projects and invoices. Concierge onboarding and migration are included on the Agency plan." },
    ],
  },
  {
    slug: "client-portal",
    eyebrow: "Client Portal for Agencies",
    title: "Give every client one clear place to follow the work",
    metaTitle: "Client Portal for Agencies | Branded Client Workspace",
    description: "Give clients a branded portal for project status, comments, files, and invoices—without another account or status-update email.",
    primaryKeyword: "client portal for agencies",
    keywords: ["client portal software", "agency client portal", "branded client portal", "white label client portal", "client portal with invoices"],
    intro: "Clients should not need to search old email threads to understand what is happening. Sarion gives each client a unique portal link where the information already maintained by your team becomes a clear, client-facing view. Status, due dates, comments, files, and invoices stay attached to the work.",
    problemTitle: "Status updates should not consume delivery time",
    problems: [
      { title: "Updates scatter across channels", description: "Important context gets split between email, chat, meetings, and task tools that clients cannot access." },
      { title: "Clients ask for information you already have", description: "When project status is internal-only, the team repeatedly rewrites the same update for external stakeholders." },
      { title: "Generic shared boards expose too much", description: "Inviting a client into an internal project tool can reveal operational detail and create a confusing experience." },
    ],
    workflowTitle: "A client-facing view powered by your live workspace",
    workflow: [
      { step: "01", title: "Add your agency identity", description: "Configure your agency name and logo; Growth adds a custom domain and Agency adds full white-label presentation." },
      { step: "02", title: "Share one unique link", description: "Each client receives a shareable portal link and does not need to create a separate account or remember a password." },
      { step: "03", title: "Publish progress through the work", description: "Project status, dates, activity, comments, and shared files give clients current context without a parallel report." },
      { step: "04", title: "Keep invoices visible", description: "Clients can see invoice status alongside delivery instead of searching email attachments or asking what is outstanding." },
    ],
    capabilities: [
      { title: "Branded presentation", description: "Agency identity on the client experience, with branding controls that vary by plan.", href: "/features/client-portal" },
      { title: "Project status and comments", description: "Contextual progress and conversation where the work is shown.", href: "/features/projects" },
      { title: "Files and activity", description: "Shared delivery context and recent changes in one destination.", href: "/features/activity-timeline" },
      { title: "Invoice visibility", description: "Paid and pending invoice context linked to the client.", href: "/agency-invoicing" },
    ],
    audience: ["Agencies fielding frequent status requests", "Studios that want a more polished client experience", "Remote teams working across time zones", "Freelancers who want delivery to feel structured"],
    stackTitle: "A portal is different from inviting clients into your task tool",
    stackCopy: "An internal project system is optimized for assignments, dependencies, and team discussion. A client portal should be calmer: it should show the information a client needs without exposing internal work. Sarion separates those perspectives while keeping them connected, so the agency updates its workspace and the client sees the relevant result.",
    faq: [
      { question: "Do clients need a Sarion account?", answer: "No. Each client can open a unique shareable portal link without creating an account or remembering a password." },
      { question: "Can the portal use my agency branding?", answer: "Yes. Branding capabilities depend on the plan: the free portal is powered by Sarion, Starter includes basic branding, Growth adds a branded portal and custom domain, and Agency includes full white-label." },
      { question: "What can clients see?", answer: "Clients can see the delivery information shared through their portal, including project status, dates, comments, files, activity, and invoice context." },
      { question: "Can I see the portal before signing up?", answer: "Yes. The public portal demo lets you explore the client experience with sample data." },
    ],
  },
  {
    slug: "project-management-for-agencies",
    eyebrow: "Agency Project Management",
    title: "Project management that keeps the client relationship attached",
    metaTitle: "Project Management Software for Agencies | Sarion",
    description: "Track agency projects, task checklists, owners, due dates, client updates, and invoices from one connected delivery workspace.",
    primaryKeyword: "project management software for agencies",
    keywords: ["agency project management", "client project management", "agency task management", "client project tracking", "project management with client portal"],
    intro: "Agency projects rarely fail because a board lacks another view. They fail when scope, client context, delivery status, and commercial reality drift apart. Sarion connects the project to the client, the work, the portal, and the invoice so teams can manage delivery without rebuilding context in every tool.",
    problemTitle: "A task board alone cannot run client delivery",
    problems: [
      { title: "Work and relationship data separate", description: "The team sees tasks, while account context and client commitments live elsewhere." },
      { title: "Status reporting becomes manual", description: "Someone translates internal activity into a recurring email or slide deck simply to keep the client informed." },
      { title: "Delivery and billing drift apart", description: "Completed work does not automatically provide the context needed to understand invoice and payment status." },
    ],
    workflowTitle: "Plan, deliver, communicate, and bill in sequence",
    workflow: [
      { step: "01", title: "Start from the client", description: "Create the project against the correct client record so the relationship and delivery history remain connected." },
      { step: "02", title: "Define the work", description: "Set status and due dates, add task checklists, assign owners, and keep project files with the engagement." },
      { step: "03", title: "Surface the right progress", description: "Let the client follow relevant updates and comment through their portal rather than inviting them into internal operations." },
      { step: "04", title: "Connect the commercial outcome", description: "Keep the related invoice visible beside the client and project for a clearer delivery-to-payment workflow." },
    ],
    capabilities: [
      { title: "Project tracking", description: "Client-linked statuses, dates, owners, and progress.", href: "/features/projects" },
      { title: "Task checklists", description: "Break delivery into clear, assignable next actions.", href: "/features/tasks" },
      { title: "Client visibility", description: "A focused portal for relevant status, comments, and files.", href: "/client-portal" },
      { title: "Team collaboration", description: "Shared ownership and a consistent operating view.", href: "/features/team-collaboration" },
    ],
    audience: ["Marketing teams running recurring campaigns", "Design and web studios delivering milestone-based work", "Consultancies managing multiple engagements", "Small teams that need clarity without enterprise configuration"],
    stackTitle: "Choose an agency workflow, not the most configurable board",
    stackCopy: "Highly configurable project platforms are a strong fit for organizations that want to design their own operating system. Sarion is for teams that want an opinionated client-delivery workflow with less setup. It connects the core objects agencies repeatedly need—clients, projects, tasks, portals, invoices, and activity—without requiring a custom database or a web of integrations.",
    faq: [
      { question: "What makes project management software agency-specific?", answer: "Agency-specific project management keeps client context, external communication, delivery status, and billing close together instead of treating work as an isolated set of tasks." },
      { question: "Does Sarion support task assignment?", answer: "Yes. Projects can include task checklists and owners so the team can see responsibility and progress." },
      { question: "Can clients track project status?", answer: "Yes. The client portal shows relevant project information and supports contextual comments without exposing the internal workspace." },
      { question: "Is Sarion suitable for large, highly customized workflows?", answer: "Sarion prioritizes a simple agency delivery workflow. Teams needing complex dependencies, portfolio governance, or deeply customized work structures may prefer a specialist enterprise project platform." },
    ],
  },
  {
    slug: "agency-invoicing",
    eyebrow: "Agency Invoicing",
    title: "Agency invoicing connected to clients and delivery",
    metaTitle: "Agency Invoicing Software & Invoice Tracking | Sarion",
    description: "Create and track agency invoices, due dates, payment status, and aging beside the client and project that generated the work.",
    primaryKeyword: "agency invoicing software",
    keywords: ["agency billing software", "invoice tracking", "overdue invoice tracking", "client invoicing software", "agency accounts receivable"],
    intro: "An invoice is easier to follow when it is not isolated in a finance spreadsheet. Sarion ties invoice records to the relevant client and project, giving delivery and account teams a shared view of what was billed, when it is due, and whether it is paid, pending, or overdue.",
    problemTitle: "Payment visibility should not depend on a private spreadsheet",
    problems: [
      { title: "Invoices lose delivery context", description: "A standalone billing record may not make it obvious which client relationship or project produced the charge." },
      { title: "Overdue work is noticed late", description: "When due dates and status are tracked manually, follow-up often starts only after cash flow is already affected." },
      { title: "Clients cannot self-serve", description: "Teams answer avoidable questions when invoice status lives only in an internal accounting view." },
    ],
    workflowTitle: "From completed work to visible payment status",
    workflow: [
      { step: "01", title: "Choose the client and project", description: "Create the invoice with the relationship already attached, rather than re-entering client context in a separate tracker." },
      { step: "02", title: "Add line items and dates", description: "Record the services, quantities, amounts, issue date, and due date in a consistent invoice." },
      { step: "03", title: "Track its lifecycle", description: "Monitor draft, sent, paid, and overdue states, with aging visibility for outstanding invoices." },
      { step: "04", title: "Share visibility with the client", description: "The client portal keeps invoice context beside the project relationship, reducing basic status questions." },
    ],
    capabilities: [
      { title: "Invoice creation", description: "Structured line items, issue dates, due dates, and totals.", href: "/features/invoices" },
      { title: "Status and aging", description: "See paid, pending, and overdue invoice records.", href: "/features/invoices" },
      { title: "Client connection", description: "Keep commercial history with the client record.", href: "/client-management-software" },
      { title: "Portal visibility", description: "Let clients see invoice context from their delivery portal.", href: "/client-portal" },
    ],
    audience: ["Small agencies tracking invoices manually", "Account managers who need payment context", "Freelancers managing several recurring clients", "Studios that want invoices visible alongside delivery"],
    stackTitle: "Operational invoice tracking, not a replacement for full accounting",
    stackCopy: "Sarion helps an agency create and monitor client invoices in the same workspace as delivery. It is not positioned as a general ledger, payroll system, tax filing service, or full accounting suite. Agencies with formal accounting requirements can keep their accounting platform while using Sarion for day-to-day client and delivery visibility.",
    faq: [
      { question: "Can Sarion track overdue invoices?", answer: "Yes. Invoice due dates and statuses support pending and overdue visibility, including aging information." },
      { question: "Are invoices connected to projects?", answer: "Invoices are linked to the relevant client and can be associated with project context, keeping delivery and billing easier to understand." },
      { question: "Can clients see invoices in their portal?", answer: "Yes. Invoice information is available in the client-facing portal alongside project information." },
      { question: "Does Sarion replace accounting software?", answer: "No. Sarion handles operational client invoicing and tracking; it is not a general ledger, payroll, or tax filing product." },
    ],
  },
  {
    slug: "client-management-software",
    eyebrow: "Client Management Software",
    title: "Manage every client relationship from one connected record",
    metaTitle: "Client Management Software for Agencies | Sarion",
    description: "Organize agency clients, notes, projects, invoices, activity, and portal access in one client management workspace.",
    primaryKeyword: "client management software for agencies",
    keywords: ["agency client management", "client relationship management for agencies", "manage multiple clients", "client tracking software", "client delivery management"],
    intro: "Managing clients means more than storing an email address. It means remembering decisions, knowing what is in progress, understanding what has been billed, and giving the client a reliable experience. Sarion organizes those responsibilities around one searchable client record.",
    problemTitle: "Client knowledge should belong to the agency, not one inbox",
    problems: [
      { title: "History lives in people's heads", description: "Notes and decisions disappear when they are not recorded against the relationship the whole team can find." },
      { title: "Every client uses a different process", description: "Without a shared operating model, account quality depends on who happens to manage the engagement." },
      { title: "Growth multiplies admin", description: "Adding clients creates more tabs, trackers, folders, and repeated updates instead of a more valuable operating system." },
    ],
    workflowTitle: "A repeatable system for ongoing client work",
    workflow: [
      { step: "01", title: "Centralize the relationship", description: "Keep the core contact details, notes, activity, and account context on a searchable record." },
      { step: "02", title: "Connect active engagements", description: "See projects, dates, tasks, files, and delivery status without leaving the client context." },
      { step: "03", title: "Standardize communication", description: "Use the client portal as a consistent destination for relevant progress, comments, files, and invoices." },
      { step: "04", title: "Review the whole account", description: "Bring delivery and commercial history together before reviews, renewals, or team handoffs." },
    ],
    capabilities: [
      { title: "Agency CRM", description: "Structured client records for ongoing delivery relationships.", href: "/agency-crm" },
      { title: "Project history", description: "Every active and completed engagement attached to the client.", href: "/project-management-for-agencies" },
      { title: "Client workspace", description: "A consistent external view for updates and communication.", href: "/client-portal" },
      { title: "Invoice history", description: "Commercial status available alongside delivery context.", href: "/agency-invoicing" },
    ],
    audience: ["Account managers overseeing several clients", "Founders who need a reliable view across the agency", "Delivery teams sharing relationship context", "Freelancers moving beyond folders and spreadsheets"],
    stackTitle: "Build a client operating record, not another contact database",
    stackCopy: "A contact database answers who the client is. A client management workspace should also answer what the agency is delivering, who owns it, what the client can see, and what has been invoiced. Sarion brings those operational questions together while remaining deliberately lighter than enterprise customer-success or sales platforms.",
    faq: [
      { question: "What is client management software?", answer: "Client management software organizes relationship information and the work around it. For agencies, that includes notes, projects, activity, invoices, and a reliable client-facing experience." },
      { question: "How does Sarion help manage multiple clients?", answer: "Each client has a searchable record with its own projects, invoices, notes, activity, and portal link, while shared views help the team work across the portfolio." },
      { question: "Is this the same as a sales CRM?", answer: "Not exactly. Sarion emphasizes ongoing delivery after a client is won rather than complex prospecting and pipeline automation." },
      { question: "Can teams collaborate on client accounts?", answer: "Yes. Paid plans support team collaboration, with limits and permission capabilities depending on the selected plan." },
    ],
  },
  {
    slug: "agency-operations",
    eyebrow: "Agency Operations Software",
    title: "Turn scattered agency admin into one operating workflow",
    metaTitle: "Agency Operations Software for Small Teams | Sarion",
    description: "Run client operations across CRM, projects, tasks, portals, invoicing, team activity, and reporting from one agency workspace.",
    primaryKeyword: "agency operations software",
    keywords: ["agency operations platform", "agency workflow software", "agency workflow management", "agency administration software", "streamline agency operations"],
    intro: "Agency operations is the connective tissue between selling work, delivering it, keeping clients informed, and getting paid. When each step has a different source of truth, founders and operations leads spend their time reconciling tools. Sarion creates a shared workflow around the client lifecycle.",
    problemTitle: "Operational drag hides between otherwise good tools",
    problems: [
      { title: "Duplicate data entry", description: "Client names, project context, and commercial details are recreated in multiple systems and slowly fall out of sync." },
      { title: "No shared operational view", description: "Delivery, account management, and finance each see a different fragment of agency performance." },
      { title: "Processes depend on memory", description: "Handoffs and follow-ups happen because someone remembers, not because the workspace makes the next action visible." },
    ],
    workflowTitle: "A connected path from client record to cash visibility",
    workflow: [
      { step: "01", title: "Organize the client base", description: "Give every relationship one home for details, notes, activity, and linked work." },
      { step: "02", title: "Run delivery consistently", description: "Use client-linked projects, task checklists, owners, and dates to keep commitments visible." },
      { step: "03", title: "Create external clarity", description: "Give clients a focused portal while the team retains its internal operating workspace." },
      { step: "04", title: "Review operations and billing", description: "Use dashboards, reporting, invoice status, and activity to identify what needs attention." },
    ],
    capabilities: [
      { title: "CRM and client context", description: "The relationship layer underneath agency delivery.", href: "/agency-crm" },
      { title: "Projects and team work", description: "The operating layer for commitments and ownership.", href: "/project-management-for-agencies" },
      { title: "Dashboards and reporting", description: "Shared visibility into work, clients, and operational signals.", href: "/features/reporting" },
      { title: "Automations and recurring work", description: "Reduce repeated administration where the product supports a defined workflow.", href: "/features" },
    ],
    audience: ["Agency founders becoming the operational bottleneck", "Operations leads consolidating a fragmented stack", "Growing teams that need repeatable client delivery", "Small agencies that want less configuration and maintenance"],
    stackTitle: "Consolidation is valuable when it removes handoffs",
    stackCopy: "The goal is not to replace every specialist application. Design, development, ad buying, and accounting may still need dedicated tools. Sarion consolidates the operational layer around the client: relationship context, delivery tracking, external visibility, invoicing, and team activity. That reduces the number of handoffs required to answer basic operational questions.",
    faq: [
      { question: "What does agency operations software manage?", answer: "It helps coordinate the recurring systems behind client delivery, including client records, projects, tasks, communication, invoices, team visibility, and reporting." },
      { question: "Can Sarion replace every agency tool?", answer: "No. Sarion consolidates the client-operations layer; specialist production, accounting, and channel tools may still have an important role." },
      { question: "Is Sarion suitable for small agencies?", answer: "Yes. The workflow and plan structure are designed for freelancers, studios, and small or growing agency teams." },
      { question: "Does Sarion support onboarding and migration?", answer: "The product is designed for straightforward setup, and the Agency plan includes concierge onboarding and migration support." },
    ],
  },
];

export function getCommercialPage(slug: string) {
  return COMMERCIAL_PAGES.find((page) => page.slug === slug);
}
