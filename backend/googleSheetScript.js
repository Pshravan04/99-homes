// =============================================
// PASTE THIS IN Google Sheet > Extensions > Apps Script
// Then deploy as a Web App and provide the URL to the backend
// =============================================

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

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
