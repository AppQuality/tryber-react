export const createFilesElementList = (
  files: File[],
  status: "success" | "failed" | "uploading"
) => {
  const elements: FileElement[] = [];
  files.forEach((f) => {
    const type = f.type.split("/")[0];
    elements.push({
      fileName: f.name,
      fileType: type,
      mimeType: f.type,
      status: status,
      previewUrl:
        type === "image" || type === "video"
          ? URL.createObjectURL(f)
          : undefined,
    });
  });
  return elements;
};

export const checkFileName = (mediaList: FileElement[], filesToAdd: File[]) => {
  const newList = [...filesToAdd];
  mediaList.forEach((media) => {
    newList.forEach((f, i) => {
      if (f.name === media.fileName) {
        const newfile = new File(
          [newList[i]],
          f.name.replace(/(\.[\w\d_-]+)$/i, "_copy$1"),
          { type: newList[i].type }
        );
        newList.splice(i, 1, newfile);
      }
    });
  });

  return newList;
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
