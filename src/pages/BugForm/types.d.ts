// TODO types to review
type BugFormValues = {
  title: string;
  stepDescription: string;
  media: string[];
  device: string;
  severity: string;
  type: string;
  replicability: string;
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
