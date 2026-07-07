"use client";

import { useMemo, useState } from "react";

import type { Calculator, ToolInputs } from "@/lib/tools/types";
import { toNumber } from "@/lib/tools/format";
import { getCalculatorBySlug } from "@/lib/tools/calculators/registry";
import { FieldTooltip } from "./field-tooltip";
import { ResultsSummary } from "./results-summary";
import styles from "./calculator-form.module.css";

function defaultInputs(calculator: Calculator): ToolInputs {
  const inputs: ToolInputs = {};
  for (const field of calculator.fields) inputs[field.key] = field.defaultValue;
  return inputs;
}

/**
 * Fully generic calculator UI — every tool implements the same Calculator
 * contract (fields + calculate()), so this one component renders all of
 * them. Entirely client-side: no network call, all math runs in-browser.
 *
 * Takes a `toolSlug` (not a `Calculator` object) because a server component
 * can't pass a function prop (`calculate`) across the RSC boundary — this
 * component resolves the calculator itself from a calculator-only registry
 * (`@/lib/tools/calculators/registry`), which is safe since it's a plain
 * client-side module import, not a serialized prop. Deliberately does NOT
 * import `@/content/tools/tools` (the content+calculator registry used
 * server-side) — that registry also pulls in all 12 content files (FAQs,
 * benchmarks, prose), which would ship to the client bundle unnecessarily.
 */
export function CalculatorForm({ toolSlug, toolTitle }: { toolSlug: string; toolTitle: string }) {
  const calculator = getCalculatorBySlug(toolSlug);
  const [inputs, setInputs] = useState<ToolInputs>(() => (calculator ? defaultInputs(calculator) : {}));

  const result = useMemo(() => {
    if (!calculator) return null;
    const normalized: ToolInputs = Object.fromEntries(
      calculator.fields.map((f) => [
        f.key,
        f.type === "select" ? inputs[f.key] : toNumber(inputs[f.key], toNumber(f.defaultValue)),
      ]),
    );
    return calculator.calculate(normalized);
  }, [calculator, inputs]);

  function updateField(key: string, value: string) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  if (!calculator || !result) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {calculator.fields.map((field) => {
          const rawValue = inputs[field.key];
          const inputId = `field-${field.key}`;

          return (
            <div key={field.key} className={styles.field}>
              <label htmlFor={inputId} className={styles.label}>
                {field.label}
                {field.tooltip && <FieldTooltip text={field.tooltip} />}
              </label>

              {field.type === "select" ? (
                <select
                  id={inputId}
                  className={styles.input}
                  value={String(rawValue)}
                  onChange={(e) => updateField(field.key, e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className={styles.inputWrap}>
                  {field.type === "currency" && <span className={styles.prefix}>$</span>}
                  <input
                    id={inputId}
                    type="number"
                    className={styles.input}
                    style={field.type === "currency" ? { paddingLeft: "var(--m-space-6)" } : undefined}
                    value={String(rawValue)}
                    min={field.min}
                    max={field.max}
                    step={field.step ?? 1}
                    onChange={(e) => updateField(field.key, e.target.value)}
                  />
                  {field.unit && field.type !== "currency" && (
                    <span className={styles.suffix}>{field.unit}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ResultsSummary result={result} toolTitle={toolTitle} />
    </div>
  );
}
