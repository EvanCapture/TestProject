# Document Generation API

This API reads row data from Google Sheets and fills predefined `{{placeholder}}` tokens in a PowerPoint template (`.pptx`).

## Features

- Reads data from a Google Sheet range.
- Maps sheet headers to placeholder keys.
- Replaces placeholders in PowerPoint slide and notes XML.
- Returns a generated `.pptx` as a downloadable response.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
export GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
export GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
export PORT=3000
```

3. Share the source Google Sheet with your service account email.

## Run

```bash
npm start
```

## API

### `POST /generate-document`

Generates a PowerPoint by replacing placeholders from Google Sheet row values.

#### Request Body

```json
{
  "spreadsheetId": "1abcDEF...",
  "range": "Sheet1!A1:Z100",
  "rowIndex": 0,
  "templatePath": "./templates/offer-template.pptx",
  "outputFileName": "offer-letter.pptx",
  "staticData": {
    "generated_date": "2026-01-01"
  }
}
```

- `spreadsheetId`: Google Spreadsheet ID.
- `range`: Sheet range including header row and data rows.
- `rowIndex`: Zero-based data row index (excluding header row).
- `templatePath`: Local path to `.pptx` template with placeholders such as `{{first_name}}`.
- `outputFileName`: Output file name in download response.
- `staticData`: Optional object merged on top of sheet data.

#### How placeholders work

If the header row includes columns:

- `first_name`
- `company`

And selected row values are:

- `Ava`
- `Contoso`

Then placeholders in the template:

- `{{first_name}}`
- `{{company}}`

are replaced with:

- `Ava`
- `Contoso`

## Health check

```bash
curl http://localhost:3000/health
```

## Test

```bash
npm test
```
