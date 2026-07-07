import { RelevantFeatures } from "@/components/solutions/relevant-features";
import type { ToolResult } from "@/lib/tools/types";
import { BarChart } from "./bar-chart";
import { DonutChart } from "./donut-chart";
import { RecommendationsList } from "./recommendations-list";
import { ExportShareActions } from "./export-share-actions";
import styles from "./results-summary.module.css";

export function ResultsSummary({ result, toolTitle }: { result: ToolResult; toolTitle: string }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.headline}>{result.headline}</p>

      <div className={styles.metrics}>
        {result.metrics.map((metric) => (
          <div key={metric.label} className={styles.metric}>
            <p className={styles.metricValue}>{metric.value}</p>
            <p className={styles.metricLabel}>{metric.label}</p>
            {metric.helpText && <p className={styles.metricHelp}>{metric.helpText}</p>}
          </div>
        ))}
      </div>

      {result.chart && (
        <div className={styles.chart}>
          {result.chart.type === "bar" ? (
            <BarChart data={result.chart.data} unit={result.chart.unit} />
          ) : (
            <DonutChart data={result.chart.data} unit={result.chart.unit} />
          )}
        </div>
      )}

      <div className={styles.lists}>
        <RecommendationsList title="Recommendations" items={result.recommendations} />
        <RecommendationsList title="Suggested next steps" items={result.nextSteps} />
      </div>

      {result.relevantFeatureEyebrows.length > 0 && (
        <div className={styles.features}>
          <p className={styles.featuresLabel}>Relevant Sarion features</p>
          <RelevantFeatures eyebrows={result.relevantFeatureEyebrows} />
        </div>
      )}

      <ExportShareActions toolTitle={toolTitle} />
    </div>
  );
}
