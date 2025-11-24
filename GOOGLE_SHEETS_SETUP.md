# Google Sheets Setup Guide

This guide will help you set up Google Sheets as your data source for jerseys instead of a local CSV file.

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "New England Kits Inventory"

## Step 2: Set Up Your Columns

Copy the exact column headers from your `jerseys.csv` file into the first row:

```
image | name | team | price | status | sizes | stock
```

**Important:** The column order and names must match exactly:
- `image` - Image path (e.g., `img/jersey.jpg`)
- `name` - Jersey name
- `team` - Team name
- `price` - Price (number only, no $)
- `status` - Status (`Available` or `Sold Out`)
- `sizes` - Available sizes (e.g., `S M L XL`)
- `stock` - Stock quantity (number)

## Step 3: Copy Your Data

1. Copy all your jersey data from `jerseys.csv`
2. Paste it into your Google Sheet starting from row 2 (row 1 is headers)

## Step 4: Publish Your Sheet as CSV

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. In the dialog:
   - Select the sheet tab (usually "Sheet1")
   - Choose **CSV** as the format
   - Click **Publish**
3. Copy the generated URL (it will look like: `https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=...`)

## Step 5: Update Your Website Code

1. Open `script.js`
2. Find this line near the top (around line 304):
   ```javascript
   const GOOGLE_SHEETS_CSV_URL = 'jerseys.csv';
   ```
3. Replace `'jerseys.csv'` with your Google Sheets CSV URL in quotes:
   ```javascript
   const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID';
   ```

## Step 6: Test It

1. Save your changes
2. Refresh your website
3. Your jerseys should now load from Google Sheets!

## Tips

- **Updates are automatic**: When you update your Google Sheet, the website will show the changes (may need a refresh)
- **Keep the sheet public**: The sheet needs to be publicly accessible (via the published CSV link)
- **No need to re-publish**: Once published, the CSV URL stays the same even if you edit the sheet
- **Backup**: Keep a local copy of `jerseys.csv` as a backup

## Troubleshooting

**If jerseys don't load:**
- Check the browser console (F12) for errors
- Verify the Google Sheets URL is correct
- Make sure the sheet is published (File → Share → Publish to web)
- Check that column headers match exactly

**If you see CORS errors:**
- Google Sheets CSV export should work without CORS issues
- If you have problems, you may need to use a CORS proxy (not recommended for production)

## Example Google Sheets URL Format

```
https://docs.google.com/spreadsheets/d/1ABC123xyz789/export?format=csv&gid=0
```

Replace the URL in `script.js` with your actual URL.

