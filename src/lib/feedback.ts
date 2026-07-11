/** The three feedback categories surfaced in the widget. */
export const FEEDBACK_TYPES = ["feature_request", "bug_report", "general"] as const;

/** Workflow states an owner can move a submission through. */
export const FEEDBACK_STATUSES = ["open", "in_review", "planned", "completed", "declined"] as const;
