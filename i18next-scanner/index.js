var fs = require("fs");

const eol = require("eol");
const path = require("path");
const VirtualFile = require("vinyl");

function getContent(aPath) {
  try {
    return JSON.parse(
      fs
        .readFileSync(fs.realpathSync(path.join("src", aPath)))
        .toString("utf-8")
    );
  } catch (e) {
    console.warn(e);
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
  const flusher = new Flusher(parser);
  const translations = flusher.returnUpdatedTranslations();
  for (const namespaces of translations) {
    for (const language of namespaces) {
      this.push(
        new VirtualFile({
          path: language.path,
          contents: Buffer.from(language.items),
        })
      );
    }
  }

  done();
}

class Flusher {
  constructor(parser) {
    this.parser = parser;
    this.options = parser.options;
    this.jsonIndent = this.options.resource.jsonIndent;
    this.lineEnding = String(this.options.resource.lineEnding).toLowerCase();
    this.items = this.parser.get({ sort: this.options.sort });
  }

  convertObjectToText(anObject) {
    let results = JSON.stringify(anObject, null, this.jsonIndent) + "\n";
    return this.convertLineEndings(results);
  }

  convertLineEndings(text) {
    if (this.lineEnding === "auto") {
      return eol.auto(text);
    }
    if (this.lineEnding === "\r\n" || this.lineEnding === "crlf") {
      return eol.crlf(text);
    }
    if (this.lineEnding === "\n" || this.lineEnding === "lf") {
      return eol.lf(text);
    }
    if (this.lineEnding === "\r" || this.lineEnding === "cr") {
      return eol.cr(text);
    }
    return eol.lf(text);
  }

  mergeNewItemsInNamespace(data) {
    const path = this.getPath(data.language, data.namespace);

    const object = mergeDeep(data.items, getContent(path));
    Object.keys(object).forEach((key) => {
      if (data.items[key] === undefined) {
        delete object[key];
      }
    });
    return this.convertObjectToText(object);
  }

  getPath(language, namespace) {
    return this.parser.formatResourceSavePath(language, namespace);
  }

  returnUpdatedTranslations() {
    return Object.keys(this.items).map((language) =>
      this.getEnrichedParsedByLanguage(language)
    );
  }

  getEnrichedParsedByLanguage(language) {
    return Object.keys(this.items[language]).map((namespace) => {
      let data = {
        path: this.getPath(language, namespace),
        namespace: namespace,
        language: language,
        items: this.items[language][namespace],
      };
      data.items = this.mergeNewItemsInNamespace(data);
      return data;
    });
  }
}

module.exports = flush;
