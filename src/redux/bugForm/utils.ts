export const createFilesElementList = (
  files: File[],
  status: "success" | "failed" | "uploading",
  uploadId?: string
) => {
  const elements: FileElement[] = [];
  files.forEach((f) => {
    const type = f.type.split("/")[0];
    elements.push({
      id: `dropzone_id_${f.name}_${Date.now()}`,
      fileName: f.name,
      fileType: type,
      mimeType: f.type,
      status: status,
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
