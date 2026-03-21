// =============================================
// PASTE THIS IN Google Sheet > Extensions > Apps Script
// 1. Replace 'YOUR_SHEET_ID' with: 1OgoIvyOVnejUolFGmLJwV04lPKL9fMQi3jzjKJajFEo
// 2. Click 'Deploy' -> 'New Deployment'
// 3. Select Type: 'Web App'
// 4. Who has access: 'Anyone' (IMPORTANT: Not 'Anyone with Google account')
// 5. Click 'Deploy' and copy the URL.
// =============================================

var SHEET_ID = '1OgoIvyOVnejUolFGmLJwV04lPKL9fMQi3jzjKJajFEo';

function doPost(e) {
    try {
        var ss = SpreadsheetApp.openById(SHEET_ID);
        var sheet = ss.getSheets()[0]; // Targets the first tab

        // Add headers if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow([
                'Timestamp',
                'Name',
                'Mobile',
                'Configuration (BHK)',
                'Preferred Location',
                'Project Status'
            ]);
        }

        var data = JSON.parse(e.postData.contents);

        sheet.appendRow([
            new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            data.name || '',
            data.mobile || '',
            data.configuration || '',
            data.preferredLocation || '',
            data.projectStatus || ''
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead added to sheet' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet() {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'online', message: 'Script is ready to receive data' }))
        .setMimeType(ContentService.MimeType.JSON);
}
