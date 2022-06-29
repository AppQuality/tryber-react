// TODO types to review
type BugFormValues = {
  title: string;
  stepDescription: string;
  media: string[];
  device: number;
  severity: string;
  type: string;
  replicability: string;
  usecase: string;
  expected: string;
  current: string;
  notes: string;
  additional: { [key: string]: any };
};
