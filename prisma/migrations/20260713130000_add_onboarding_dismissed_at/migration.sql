-- Dismissible dashboard Welcome Checklist, stored per agency.
ALTER TABLE "Agency" ADD COLUMN "onboardingDismissedAt" TIMESTAMP(3);
