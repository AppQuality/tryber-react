import i18next from "i18next";

const localizedUrl = (url: string) => {
  return `${
    ["en", "cimode"].includes(i18next.language) ? "" : "/" + i18next.language
  }${url}`;
};

export default localizedUrl;
