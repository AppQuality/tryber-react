// TODO types to review
type BugFormValues = {
  title: string;
  stepDescription: string;
  media: string[];
  device: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  type: "TYPO";
  replicability: "ONCE" | "SOMETIMES" | "NEVER";
  usecase: number;
  expected: string;
  current: string;
  notes: string;
};
