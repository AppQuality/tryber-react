var fs = require("fs");
var typescriptTransform = require("i18next-scanner-typescript");

const eol = require("eol");
const path = require("path");
const VirtualFile = require("vinyl");

function convertLineEndings(lineEndingOpt, text) {
  const lineEnding = String(lineEndingOpt).toLowerCase();
  if (lineEnding === "auto") {
    return eol.auto(text);
  }
  if (lineEnding === "\r\n" || lineEnding === "crlf") {
    return eol.crlf(text);
  }
  if (lineEnding === "\n" || lineEnding === "lf") {
    return eol.lf(text);
  }
  if (lineEnding === "\r" || lineEnding === "cr") {
    return eol.cr(text);
  }
  // Defaults to LF
  return eol.lf(text);
}

function merge(namespace, resContent) {
  const obj = mergeDeep(namespace, resContent);
  // {
  //   key: 'name',
  //   'Gender option': { Female: '', Male: '', 'Not Specified': '', Other: '' }
  //   key =  "name"
  //   namespace[key] = "Nome"
  // }
  Object.keys(obj).forEach((key) => {
    if (namespace[key] === undefined) {
      delete obj[key];
    }
  });

  return obj;
}

function getContent(resPath) {
  try {
    return JSON.parse(
      fs
        .readFileSync(fs.realpathSync(path.join("src", resPath)))
        .toString("utf-8")
    );
  } catch (e) {
    return {};
  }
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
function flush(done) {
  const { parser } = this;
  const { options } = parser;

  // Flush to resource store
  const resStore = parser.get({ sort: options.sort });
  const { jsonIndent } = options.resource;

  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];

    Object.keys(namespaces).forEach((ns) => {
      const resPath = parser.formatResourceSavePath(lng, ns);
      const resContent = getContent(resPath);

      const obj = merge(namespaces[ns], resContent);

      let text = JSON.stringify(obj, null, jsonIndent) + "\n";
      text = convertLineEndings(options.resource.lineEnding, text);

      this.push(
        new VirtualFile({
          path: resPath,
          contents: Buffer.from(text),
        })
      );
    });
  });

  done();
}

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
