import { escapeHtml, type EmailContent } from "../design";
import { emailLayout, heading, paragraph, textSignature } from "../layout";

// ── Automation → Send Email action ──────────────────────────────────────────
export function automationNotification(data: {
  subject: string;
  message: string;
  fromAgency?: string;
}): EmailContent {
  const who = data.fromAgency ? escapeHtml(data.fromAgency) : "Sarion";
  const body =
    heading(escapeHtml(data.subject)) +
    paragraph(escapeHtml(data.message).replace(/\n/g, "<br />"));
  return {
    subject: data.subject,
    html: emailLayout({ preheader: data.message.slice(0, 140), body }),
    text: `${data.subject}

${data.message}

— ${who}

${textSignature()}`,
  };
}
