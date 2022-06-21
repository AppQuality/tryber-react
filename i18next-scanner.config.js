var flush = require("./i18next-scanner");
var typescriptTransform = require("i18next-scanner-typescript");

module.exports = {
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  removeUnusedKeys: true,
  sort: true,
  output: "./src",
  options: {
    contextFallback: false,
    sort: true,
    func: {
      list: ["t", "i18next.t", "i18n.t"],
      extensions: [".js", ".jsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: false,
      extensions: [".js", ".jsx"],
      acorn: {
        ecmaVersion: 2020,
        sourceType: "module", // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      },
    },
    lngs: ["en", "it", "es"],
    ns: ["links", "translation"],
    defaultLng: "en",
    defaultNs: "translation",
    defaultValue: "",
    resource: {
      loadPath: "locales/{{lng}}/{{ns}}.json",
      savePath: "locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "auto",
    },
    nsSeparator: false, // namespace separator
    keySeparator: ":::", // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: typescriptTransform({
    // default value for extensions
    extensions: [".tsx", ".ts"],
    tsOptions: {
      target: "es2017",
    },
  }),
  flush,
};
