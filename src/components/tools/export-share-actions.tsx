"use client";

import { useState } from "react";
import { Download, Mail, Save } from "lucide-react";

import { DownloadGateForm } from "@/components/email-capture/download-gate-form";
import styles from "./export-share-actions.module.css";

/**
 * Optional post-result actions — never a gate on seeing the calculator or
 * its results. "Email results" reuses the existing email-capture stub;
 * "Download PDF" and "Save report" are honestly labeled as coming soon
 * rather than faking a success state for something not built yet.
 */
export function ExportShareActions({ toolTitle }: { toolTitle: string }) {
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.actions}>
        <button type="button" className="mBtn mBtnSecondary" onClick={() => setEmailOpen((v) => !v)}>
          <Mail size={16} aria-hidden />
          Email results
        </button>
        <button type="button" className="mBtn mBtnGhost" disabled title="Coming soon">
          <Download size={16} aria-hidden />
          Download PDF
        </button>
        <button type="button" className="mBtn mBtnGhost" disabled title="Coming soon">
          <Save size={16} aria-hidden />
          Save report
        </button>
      </div>
      {emailOpen && (
        <div className={styles.emailForm}>
          <DownloadGateForm resourceTitle={`${toolTitle} results`} />
        </div>
      )}
    </div>
  );
}
