// Normalizes accented characters in the file name (e.g. à becomes a)
export const normalizeFileName = (fileName: string) => {
  return fileName.normalize("NFD").replace(/\p{Diacritic}/gu, "");
};
