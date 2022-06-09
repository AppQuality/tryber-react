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
      status: status,
      previewUrl: type === "image" ? URL.createObjectURL(f) : undefined,
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
