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
      errorCode: status === "failed" ? "NOT_VALID_FILE_TYPE" : undefined,
      previewUrl:
        type === "image" || type === "video"
          ? URL.createObjectURL(f)
          : undefined,
      uploadId,
    });
  });
  return elements;
};

export const BUG_FORM_SUPPORTED_TYPES = [
  ".tif",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".mp4",
  ".m4a",
  ".m4v",
  ".f4v",
  ".mov",
  ".3gp",
  ".3g2",
  ".ogg",
  ".oga",
  ".ogv",
  ".ogx",
  ".wmv",
  ".wma",
  ".webm",
  ".flv",
  ".avi",
  ".mpeg",
  ".odt",
  ".ott",
  ".doc",
  ".docx",
  ".txt",
  ".log",
  ".pdf",
  ".dot",
  ".dotx",
  ".docm",
  ".dotm",
  ".xls",
  ".xlt",
  ".xla",
  ".xlsx",
  ".xltx",
  ".xlsm",
  ".xltm",
  ".xlam",
  ".xlsb",
  ".csv",
  ".json",
  ".dmp",
  ".zip",
  ".rar",
];
