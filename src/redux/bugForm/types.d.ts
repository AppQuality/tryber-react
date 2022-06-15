type BugFormState = {
  mediaList: FileElement[];
};

interface FileElement {
  fileName: string;
  fileType: string;
  mimeType: string;
  status: "success" | "failed" | "uploading";
  previewUrl?: string;
  uploadedFileUrl?: string;
}

type BugFormActions =
  | BugFormActions_SetMediaList
  | BugFormActions_AppendMediaList;

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
