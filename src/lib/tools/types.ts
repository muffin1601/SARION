/**
 * Calculator engine contract. Every tool differs only in its field config
 * and formula function — CalculatorForm/ResultsSummary render any tool that
 * implements this contract, so adding tool #13+ needs no new components.
 */
export interface ToolFieldOption {
  value: string;
  label: string;
}

export interface ToolField {
  key: string;
  label: string;
  type: "number" | "currency" | "percent" | "select";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string;
  tooltip?: string;
  options?: ToolFieldOption[];
}

export interface ToolResultMetric {
  label: string;
  value: string;
  helpText?: string;
}

export interface ToolChartData {
  label: string;
  value: number;
}

export interface ToolChart {
  type: "bar" | "donut";
  data: ToolChartData[];
  unit?: string;
}

export interface ToolResult {
  headline: string;
  metrics: ToolResultMetric[];
  chart?: ToolChart;
  recommendations: string[];
  nextSteps: string[];
  /** Matches FeatureSection.eyebrow values in src/lib/marketing/features.ts. */
  relevantFeatureEyebrows: string[];
}

export type ToolInputs = Record<string, number | string>;
export type CalculatorFn = (inputs: ToolInputs) => ToolResult;

export interface Calculator {
  fields: ToolField[];
  calculate: CalculatorFn;
}
