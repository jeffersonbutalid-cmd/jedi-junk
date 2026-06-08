/**
 * JEDI Junk Removal — lead intake web app.
 *
 * Deploy steps (one-time, ~3 min):
 *   1. https://script.google.com/  →  New project  →  paste this file.
 *   2. Save (name it anything, e.g. "JEDI Leads").
 *   3. Deploy  →  New deployment.
 *      Type: Web app
 *      Execute as: Me (your account)
 *      Who has access: Anyone
 *   4. Click Deploy. Authorize the scopes when prompted
 *      (Sheets + Drive — these are needed to append rows and store photos).
 *   5. Copy the "Web app URL" Google gives you.
 *   6. Paste it into src/components/constants.js  →  LEAD_ENDPOINT.
 *   7. Rebuild + redeploy the site.
 *
 * Whenever you edit this script: Deploy → Manage deployments → pencil icon →
 * Version: New version → Deploy. The URL stays the same.
 */

const SHEET_ID = '1AF9-78QFSZZLnY252u-HSgsLxtli4GiFevKAyGY0rrs';
const SHEET_GID = 1343869397;

// Optional: paste a Drive folder ID to keep uploaded photos organized.
// Leave '' to drop them in My Drive root.
const PHOTO_FOLDER_ID = '';

function doPost(e) {
  try {
    // Two body formats supported:
    // 1) application/x-www-form-urlencoded (the live site — hidden iframe form
    //    POST). Apps Script auto-parses this into e.parameter.
    // 2) application/json (used by testPost() from the editor).
    let data = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      for (const k in e.parameter) data[k] = e.parameter[k];
    } else if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (_) { data = {}; }
    }

    // Upload photo to Drive (if present), capture shareable URL.
    let photoUrl = '';
    if (data.photo_base64 && data.photo_name) {
      const bytes = Utilities.base64Decode(data.photo_base64);
      const blob = Utilities.newBlob(bytes, data.photo_mime || 'image/jpeg', data.photo_name);
      const folder = PHOTO_FOLDER_ID
        ? DriveApp.getFolderById(PHOTO_FOLDER_ID)
        : DriveApp.getRootFolder();
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      photoUrl = file.getUrl();
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheets = ss.getSheets();
    let sheet = null;
    for (let i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === SHEET_GID) { sheet = sheets[i]; break; }
    }
    if (!sheet) sheet = sheets[0];

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.address || '',
      data.service || '',
      data.preferred_date || '',
      data.preferred_time || '',
      data.details || '',
      photoUrl,
      data.page_path || '',
      data.page_url || '',
      data.gclid || '',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || '',
      data.utm_term || '',
      data.utm_content || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('JEDI lead endpoint OK')
    .setMimeType(ContentService.MimeType.TEXT);
}
