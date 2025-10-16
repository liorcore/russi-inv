// Apps Script - פשוט ועובד
const SHEET_ID = '1p6YLE8UNypH8cQ2ONCQwIz1aSqy4Xs0E0BPscqIdtUA';
const SHEET_NAME = 'גיליון1';

function doGet(e) {
  var action = (e.parameter.action || '').toLowerCase();
  var callback = e.parameter.callback;

  if (action === 'getrsvps') {
    var rsvps = getRsvps();
    var payload = JSON.stringify({ rsvps: rsvps });
    
    if (callback) {
      return ContentService
        .createTextOutput(callback + '(' + payload + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    return ContentService
      .createTextOutput(payload)
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === 'submit') {
    try {
      var name = e.parameter.name || '';
      var status = e.parameter.status || '';
      var reason = e.parameter.reason || '';
      var sessionId = e.parameter.sessionId || '';
      
      saveRsvp(sessionId, name, status, reason);
      
      var okPayload = JSON.stringify({ ok: true });
      if (callback) {
        return ContentService
          .createTextOutput(callback + '(' + okPayload + ')')
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      return ContentService
        .createTextOutput(okPayload)
        .setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      var errPayload = JSON.stringify({ ok: false, error: String(err) });
      if (callback) {
        return ContentService
          .createTextOutput(callback + '(' + errPayload + ')')
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      return ContentService
        .createTextOutput(errPayload)
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// קריאה פשוטה מהגיליון
function getRsvps() {
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log('Sheet not found: ' + SHEET_NAME);
      return [];
    }
    
    var data = sheet.getDataRange().getValues();
    Logger.log('Total rows: ' + data.length);
    
    if (data.length <= 2) {
      Logger.log('No data rows');
      return [];
    }
    
    var rsvps = [];
    
    // מתחיל משורה 3 (דילוג על שורה ריקה ראשונה + כותרות)
    for (var i = 2; i < data.length; i++) {
      var row = data[i];
      // אם יש נתונים בעמודה C (name) ו-D (status)
      if (row[2] && row[3]) {
        rsvps.push({
          name: String(row[2]),
          status: String(row[3]),
          reason: String(row[4] || '')
        });
      }
    }
    
    Logger.log('Found ' + rsvps.length + ' RSVPs');
    return rsvps;
    
  } catch (error) {
    Logger.log('Error: ' + error);
    return [];
  }
}

// כתיבה פשוטה לגיליון
function saveRsvp(sessionId, name, status, reason) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error('Sheet not found');
  }
  
  var timestamp = new Date();
  sheet.appendRow([timestamp, sessionId, name, status, reason]);
  
  Logger.log('Saved: ' + name + ' - ' + status);
}
