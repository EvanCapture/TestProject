const fs = require("fs/promises");
const path = require("path");

const PLACEHOLDER_REGEX = /\{\{\s*([A-Za-z0-9_.-]+)\s*\}\}/g;

function replacePlaceholdersInText(content, data) {
  return content.replace(PLACEHOLDER_REGEX, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return String(data[key]);
    }
    return match;
  });
}

async function fillPowerPointTemplate({ templatePath, data }) {
  const JSZip = require("jszip");

  const absoluteTemplatePath = path.resolve(templatePath);
  const templateBuffer = await fs.readFile(absoluteTemplatePath);
  const zip = await JSZip.loadAsync(templateBuffer);

  const slidePaths = Object.keys(zip.files).filter((filePath) =>
    /^ppt\/(slides|notesSlides)\/.+\.xml$/.test(filePath)
  );

  await Promise.all(
    slidePaths.map(async (slidePath) => {
      const original = await zip.file(slidePath).async("string");
      const updated = replacePlaceholdersInText(original, data);
      zip.file(slidePath, updated);
    })
  );

  return zip.generateAsync({ type: "nodebuffer" });
}

module.exports = {
  fillPowerPointTemplate,
  replacePlaceholdersInText
};
