type BugFormState = {
  mediaList: FileElement[];
  showError: boolean;
};

interface FileElement {
  fileName: string;
  fileType: string;
  mimeType: string;
  status: "success" | "failed" | "uploading";
  errorCode?: number;
  previewUrl?: string;
  uploadedFileUrl?: string;
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
