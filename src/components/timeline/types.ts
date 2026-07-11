export interface TimelineActor {
  id: string;
  name: string;
  image: string | null;
}

/**
 * Presentation-only shape consumed by <Timeline>. Decoupled from Prisma's
 * Activity row so any future module (Projects, Invoices, Employees, Support
 * Tickets, ...) can map its own query result into this shape and reuse the
 * same timeline UI.
 */
export interface TimelineEntry {
  id: string;
  type: string;
  title: string;
  description: string;
  metadata: Record<string, unknown> | null;
  actor: TimelineActor | null;
  /** ISO timestamp string (serializable across the server/client boundary). */
  createdAt: string;
}

export interface TimelinePage {
  items: TimelineEntry[];
  nextCursor: string | null;
}
