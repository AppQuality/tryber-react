type BugFormState = {
  mediaList: FileElement[];
  showError: boolean;
};

interface FileElement {
  id: string;
  fileName: string;
  fileType: string;
  mimeType: string;
  status: "success" | "failed" | "uploading";
  errorCode?: "FILE_TOO_BIG" | "NOT_VALID_FILE_TYPE" | "UPLOAD_ERROR";
  previewUrl?: string;
  uploadedFileUrl?: string;
  uploadId?: string;
}

type BugFormActions =
  | BugFormActions_SetMediaList
  | BugFormActions_AppendMediaList
  | BugFormActions_SetShowError;

/**
 *  Action types and their payloads
 */

type BugFormActions_SetMediaList = {
  type: "bugForm/setMediaList";
  payload: FileElement[];
};

type BugFormActions_AppendMediaList = {
  type: "bugForm/appendMediaList";
  payload: FileElement[];
};

type BugFormActions_SetShowError = {
  type: "bugForm/setShowError";
  payload: boolean;
};
