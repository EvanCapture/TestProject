const { getGoogleCredentials } = require("../config");

function mapRowToObject(values, rowIndex = 0) {
  if (!Array.isArray(values) || values.length < 2) {
    throw new Error("Sheet range must include at least a header row and one data row");
  }

  const [headers, ...rows] = values;
  const row = rows[rowIndex];

  if (!row) {
    throw new Error(`Row index ${rowIndex} is out of bounds`);
  }

  return headers.reduce((acc, header, index) => {
    acc[String(header).trim()] = row[index] ?? "";
    return acc;
  }, {});
}

async function getSheetRowAsObject({ spreadsheetId, range, rowIndex = 0 }) {
  const { google } = require("googleapis");

  const auth = new google.auth.JWT({
    ...getGoogleCredentials(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range
  });

  const values = response.data.values || [];
  return mapRowToObject(values, rowIndex);
}

module.exports = {
  getSheetRowAsObject,
  mapRowToObject
};
