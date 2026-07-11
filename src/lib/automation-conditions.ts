/**
 * Condition catalog + evaluator for the Automation Builder. Scoped to fields
 * with real backing data — Invoice Amount, Outstanding Balance, Revenue, and
 * Health Score (reusing computeClientHealthScore from health-score.ts) all
 * come from Invoice/Client aggregates the engine already has to compute;
 * Project Status reads the Project.status enum directly. Client Tag,
 * Country, Industry, Custom Field, and Project Value are intentionally
 * omitted — no such fields exist on Client/Project/Invoice.
 */

export type ConditionOperator = ">" | "<" | ">=" | "<=" | "=";

export type ConditionValueType = "number" | "string";

export interface AutomationConditionField {
  field: string;
  label: string;
  valueType: ConditionValueType;
  /** Trigger values this field is meaningful for; omit to allow on any trigger. */
  appliesTo?: string[];
  options?: { value: string; label: string }[];
}

export const AUTOMATION_CONDITION_FIELDS: AutomationConditionField[] = [
  {
    field: "invoiceAmount",
    label: "Invoice Amount",
    valueType: "number",
    appliesTo: ["Invoice Created", "Invoice Paid", "Payment Received"],
  },
  {
    field: "outstandingBalance",
    label: "Outstanding Balance",
    valueType: "number",
  },
  {
    field: "revenue",
    label: "Revenue",
    valueType: "number",
  },
  {
    field: "healthScore",
    label: "Health Score",
    valueType: "number",
  },
  {
    field: "projectStatus",
    label: "Project Status",
    valueType: "string",
    appliesTo: ["Project Created", "Project Completed"],
    options: [
      { value: "PLANNED", label: "Planned" },
      { value: "ACTIVE", label: "Active" },
      { value: "COMPLETED", label: "Completed" },
      { value: "ON_HOLD", label: "On Hold" },
    ],
  },
];

export const CONDITION_OPERATORS: { value: ConditionOperator; label: string }[] = [
  { value: ">", label: "is greater than" },
  { value: "<", label: "is less than" },
  { value: ">=", label: "is at least" },
  { value: "<=", label: "is at most" },
  { value: "=", label: "equals" },
];

export interface AutomationCondition {
  field: string;
  operator: ConditionOperator;
  value: string | number;
}

/** Values the engine resolves from the triggering event before evaluating conditions. */
export type AutomationContext = Record<string, string | number | undefined>;

export function fieldsForTrigger(triggerType: string): AutomationConditionField[] {
  return AUTOMATION_CONDITION_FIELDS.filter((f) => !f.appliesTo || f.appliesTo.includes(triggerType));
}

function compare(operator: ConditionOperator, actual: string | number, expected: string | number): boolean {
  switch (operator) {
    case ">":
      return Number(actual) > Number(expected);
    case "<":
      return Number(actual) < Number(expected);
    case ">=":
      return Number(actual) >= Number(expected);
    case "<=":
      return Number(actual) <= Number(expected);
    case "=":
      return String(actual) === String(expected);
  }
}

/** AND-only evaluation — every condition must pass. Missing context values fail closed. */
export function evaluateConditions(conditions: AutomationCondition[], context: AutomationContext): boolean {
  return conditions.every((condition) => {
    const actual = context[condition.field];
    if (actual === undefined) return false;
    return compare(condition.operator, actual, condition.value);
  });
}
