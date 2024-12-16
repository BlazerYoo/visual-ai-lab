function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  const page = json['page'];
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(page);
  const AUTH = env()['AUTH'];

  // If request made from authorized GitHub action
  if (json['auth'] === AUTH) {
    sheet.getRange('A6').setValue('SUCCESS');
    sheet.getRange('A7').setValue(json['commit_url']);
    spreadsheet.toast('SUCCESS!', 'VISUAL_AI');
    json.status = 'success';
    return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
  }

  // If request made from unauthorized user
  else {
    sheet.getRange('A6').setValue('FAIL');
    spreadsheet.toast('error', 'VISUAL_AI');
    json.status = 'error';
    json.message = 'unauthorized user';
    return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.JSON);
  }
}