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
  date: Date;
  time: Date;
};

interface FileElement {
  id: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  status: "success" | "failed" | "uploading";
  errorCode?: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
  previewUrl?: string;
  uploadedFileUrl?: string;
  uploadId?: string;
}
