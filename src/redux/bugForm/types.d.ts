type BugFormState = {
  mediaList: FileElement[];
};

interface FileElement {
  fileName: string;
  fileType: string;
  status: "success" | "failed" | "uploading";
  previewUrl?: string;
  uploadedFileUrl?: string;
}

type BugFormActions = BugFormActions_SetMediaList | BugFormActions_UploadMedia;

/**
 *  Action types and their payloads
 */

type BugFormActions_SetMediaList = {
  type: "bugForm/setMediaList";
  payload: FileElement[];
};

type BugFormActions_UploadMedia = {
  type: "bugForm/uploadMedia";
  payload: File[];
};
