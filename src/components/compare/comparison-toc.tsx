import styles from "./comparison-toc.module.css";

const SECTIONS = [
  { id: "who-its-for", label: "Who it's for" },
  { id: "fit-guidance", label: "Better fit" },
  { id: "feature-matrix", label: "Feature comparison" },
  { id: "workflow", label: "Workflow comparison" },
  { id: "pricing", label: "Pricing philosophy" },
  { id: "migration", label: "Migration" },
  { id: "faq", label: "FAQ" },
];

/** Sticky in-page table of contents — pure CSS position:sticky, no client JS needed. */
export function ComparisonToc() {
  return (
    <nav className={styles.wrap} aria-label="On this page">
      <p className="mEyebrow">On this page</p>
      <ul className={styles.list}>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="mTocLink">
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
