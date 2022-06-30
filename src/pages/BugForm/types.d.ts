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
