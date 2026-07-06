"use client";

import { useState } from "react";
import {
  FolderKanban,
  FileText,
  Files,
  Activity as ActivityIcon,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  Bell,
} from "lucide-react";

import {
  PORTAL_COMPANY,
  PORTAL_PROJECTS as PROJECTS,
  PORTAL_INVOICES as INVOICES,
  PORTAL_ACTIVITY as ACTIVITY,
  PORTAL_COMMENTS,
  PORTAL_FILES,
  PORTAL_NOTIFICATIONS,
  PORTAL_INVOICE_LINE_ITEMS,
  PORTAL_TIMELINE_STAGES,
} from "@/lib/marketing/features";
import styles from "./portal-demo.module.css";

type ViewMode = "desktop" | "mobile";

export function PortalDemoClient() {
  const [expandedProject, setExpandedProject] = useState<string | null>(PROJECTS[0]?.name ?? null);
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("desktop");

  return (
    <div>
      <div className={styles.viewToggle} role="tablist" aria-label="Preview device">
        {(["desktop", "mobile"] as const).map((mode) => (
          <button
            key={mode}
            role="tab"
            aria-selected={view === mode}
            onClick={() => setView(mode)}
            className={`${styles.viewToggleBtn} ${view === mode ? styles.viewToggleBtnActive : ""}`}
          >
            {mode === "desktop" ? "Desktop" : "Mobile"}
          </button>
        ))}
      </div>

      <div className={styles.portal} data-view={view}>
        <header className={styles.portalHeader}>
          <div className={styles.company}>
            <span className={styles.companyMark}>{PORTAL_COMPANY.charAt(0)}</span>
            <div>
              <p className={styles.companyName}>{PORTAL_COMPANY}</p>
              <p className={styles.companySub}>Client Portal</p>
            </div>
          </div>
          <span className={styles.poweredBy}>Powered by Sarion</span>
        </header>

        <div className={styles.notifications}>
          {PORTAL_NOTIFICATIONS.map((n) => (
            <div key={n.text} className={styles.notification}>
              <Bell size={14} aria-hidden />
              <span>{n.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.portalBody}>
          {/* Projects — click a row to see the timeline + comment thread */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>
              <FolderKanban size={16} /> Projects
            </h3>
            <ul className={styles.list}>
              {PROJECTS.map((p) => {
                const isOpen = expandedProject === p.name;
                const comments = PORTAL_COMMENTS[p.name] ?? [];
                return (
                  <li key={p.name}>
                    <button
                      type="button"
                      className={styles.listRow}
                      onClick={() => setExpandedProject(isOpen ? null : p.name)}
                      aria-expanded={isOpen}
                    >
                      <div className={styles.rowMain}>
                        <CheckCircle2 size={16} className={styles.rowIcon} />
                        <div>
                          <p className={styles.rowTitle}>{p.name}</p>
                          <p className={styles.rowSub}>Due: {p.due}</p>
                        </div>
                      </div>
                      <div className={styles.rowEnd}>
                        <span className={`mBadge ${p.badge}`}>{p.status}</span>
                        <ChevronDown
                          size={16}
                          className={styles.chevron}
                          data-open={isOpen}
                          aria-hidden
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className={styles.expandPanel}>
                        <ol className={styles.timeline}>
                          {PORTAL_TIMELINE_STAGES.map((stage, i) => (
                            <li
                              key={stage}
                              className={styles.timelineStep}
                              data-active={i === p.stage}
                              data-done={i < p.stage}
                            >
                              <span className={styles.timelineDot} />
                              {stage}
                            </li>
                          ))}
                        </ol>

                        {comments.length > 0 && (
                          <div className={styles.commentThread}>
                            <p className={styles.commentThreadLabel}>
                              <MessageCircle size={14} aria-hidden /> Comments
                            </p>
                            {comments.map((c) => (
                              <div key={c.text} className={styles.comment}>
                                <p className={styles.commentMeta}>
                                  <strong>{c.author}</strong> · {c.time}
                                </p>
                                <p className={styles.commentText}>{c.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Invoices — click a row to see the line-item breakdown */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>
              <FileText size={16} /> Invoices
            </h3>
            <ul className={styles.list}>
              {INVOICES.map((inv) => {
                const isOpen = expandedInvoice === inv.number;
                const items = PORTAL_INVOICE_LINE_ITEMS[inv.number] ?? [];
                return (
                  <li key={inv.number}>
                    <button
                      type="button"
                      className={styles.listRow}
                      onClick={() => setExpandedInvoice(isOpen ? null : inv.number)}
                      aria-expanded={isOpen}
                    >
                      <p className={styles.rowTitle}>{inv.number}</p>
                      <div className={styles.rowEnd}>
                        <span className={`mBadge ${inv.badge}`}>{inv.status}</span>
                        <ChevronDown
                          size={16}
                          className={styles.chevron}
                          data-open={isOpen}
                          aria-hidden
                        />
                      </div>
                    </button>
                    {isOpen && items.length > 0 && (
                      <div className={styles.expandPanel}>
                        <ul className={styles.lineItems}>
                          {items.map((item) => (
                            <li key={item.label} className={styles.lineItem}>
                              <span>{item.label}</span>
                              <span>{item.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Files */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>
              <Files size={16} /> Files
            </h3>
            <ul className={styles.list}>
              {PORTAL_FILES.map((f) => (
                <li key={f.name} className={styles.listRow}>
                  <p className={styles.rowTitle}>{f.name}</p>
                  <span className={styles.rowSub}>{f.size}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Activity */}
          <section className={styles.panel}>
            <h3 className={styles.panelTitle}>
              <ActivityIcon size={16} /> Recent Activity
            </h3>
            <ul className={styles.activityList}>
              {ACTIVITY.map((a) => (
                <li key={a.text} className={styles.activityRow}>
                  <span className={styles.activityDot} />
                  <div>
                    <p className={styles.rowTitle}>{a.text}</p>
                    <p className={styles.rowSub}>{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
