const express = require("express");
const morgan = require("morgan");
const { getSheetRowAsObject } = require("./services/googleSheetsService");
const { fillPowerPointTemplate } = require("./services/powerPointService");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/generate-document", async (req, res) => {
  try {
    const {
      spreadsheetId,
      range,
      rowIndex = 0,
      templatePath,
      outputFileName = "generated-document.pptx",
      staticData = {}
    } = req.body;

    if (!spreadsheetId || !range || !templatePath) {
      return res.status(400).json({
        error: "spreadsheetId, range, and templatePath are required"
      });
    }

    const sheetData = await getSheetRowAsObject({
      spreadsheetId,
      range,
      rowIndex
    });

    const mergedData = { ...sheetData, ...staticData };
    const outputBuffer = await fillPowerPointTemplate({
      templatePath,
      data: mergedData
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${outputFileName}"`
    );

    return res.send(outputBuffer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Document Generation API listening on port ${port}`);
});
