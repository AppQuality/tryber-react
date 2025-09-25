import { FileElement } from "./mediaSlice";

export const createFilesElementList = ({
  files,
  status,
  taskId,
  uploadId,
}: {
  files: File[];
  status: "success" | "failed" | "uploading";
  taskId: string;
  uploadId?: string;
}) => {
  const elements: FileElement[] = [];
  files.forEach((f) => {
    const type = f.type.split("/")[0];
    elements.push({
      id: `dropzone_id_${f.name}_${Date.now()}`,
      fileName: f.name,
      fileType: type,
      mimeType: f.type,
      status: status,
      taskId: taskId,
      errorCode: status === "failed" ? "INVALID_FILE_EXTENSION" : undefined,
      previewUrl:
        type === "image" || type === "video"
          ? URL.createObjectURL(f)
          : undefined,
      uploadId,
    });
  });
  return elements;
};
