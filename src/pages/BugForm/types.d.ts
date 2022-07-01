// TODO types to review
type BugFormValues = {
  title: string;
  stepDescription: string;
  media: string[];
  device: number;
  severity:
    | ApiOperations["post-users-me-campaigns-campaign-bugs"]["responses"]["200"]["content"]["application/json"]["severity"]
    | "";
  type:
    | ApiOperations["post-users-me-campaigns-campaign-bugs"]["responses"]["200"]["content"]["application/json"]["type"]
    | "";
  replicability:
    | ApiOperations["post-users-me-campaigns-campaign-bugs"]["responses"]["200"]["content"]["application/json"]["replicability"]
    | "";
  useCase: string;
  expected: string;
  current: string;
  notes: string;
  additional: { [key: string]: any };
};
