-- Recurring billing idempotency: at most one occurrence row per subscription
-- per billing cycle, so parallel cron runs / manual "Generate Now" / retries
-- can never produce two invoices for the same cycle.
CREATE UNIQUE INDEX "RecurringInvoice_subscriptionId_scheduledFor_key" ON "RecurringInvoice"("subscriptionId", "scheduledFor");
DROP INDEX IF EXISTS "RecurringInvoice_subscriptionId_scheduledFor_idx";

-- Timer double-start guard: at most one running/paused timer per user.
CREATE UNIQUE INDEX "TimerSession_agencyId_userId_key" ON "TimerSession"("agencyId", "userId");

-- Recurring subscription retry/backoff + auto-pause bookkeeping.
ALTER TABLE "Subscription" ADD COLUMN     "consecutiveFailureCount" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Subscription" ADD COLUMN     "lastFailureAt" TIMESTAMP(3);
ALTER TABLE "Subscription" ADD COLUMN     "nextRetryAt" TIMESTAMP(3);
ALTER TABLE "Subscription" ADD COLUMN     "autoPausedAt" TIMESTAMP(3);
