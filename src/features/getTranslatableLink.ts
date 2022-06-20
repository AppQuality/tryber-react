export default (
  translatableLink: { en?: string; es?: string; it?: string } | undefined,
  language: string
) => {
  if (typeof translatableLink === "undefined") {
    return "#";
  }
  if (language === "en" && translatableLink.en) {
    return translatableLink.en;
  }
  if (language === "it" && translatableLink.it) {
    return translatableLink.it;
  }
  if (language === "es" && translatableLink.es) {
    return translatableLink.es;
  }
  return "#";
};
