import { WorkflowSteps } from "@/components/solutions/workflow-steps";

/** Migration steps — reuses the solutions cluster's numbered-step visual language. */
export function MigrationGuidance({
  steps,
}: {
  steps: { step: string; description: string }[];
}) {
  return <WorkflowSteps items={steps} />;
}
