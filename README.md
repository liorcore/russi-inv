# בִּרְכַּת הַחֲמִישִׁי - מערכת אישורי הגעה

מערכת אישורי הגעה (RSVP) עם עיצוב תנכ"י ייחודי, מחוברת ל-Google Sheets.

## תכונות

- ✅ עיצוב קלף תנכ"י עתיק
- ✅ טפסים לאישור הגעה ואי-הגעה
- ✅ התחברות ל-Google Sheets לשמירת נתונים
- ✅ רשימות מגיעים ונעדרים בזמן אמת
- ✅ אנימציות קונפטי ופידבק ויזואלי
- ✅ רענון אוטומטי של הרשימות

## קבצים

- `INDEX.HTML` - הדף הראשי עם כל הקוד
- `Code.gs` - קוד Google Apps Script לשליפה ושמירה ב-Google Sheets

## התקנה

### 1. הגדרת Google Sheets

1. צור גיליון חדש ב-Google Sheets
2. בשורה 2 הוסף כותרות:
   - עמודה A: `Timestamp`
   - עמודה B: `sessionId`
   - עמודה C: `name`
   - עמודה D: `status`
   - עמודה E: `reason`

### 2. הגדרת Google Apps Script

1. לך ל-[script.google.com](https://script.google.com)
2. צור פרויקט חדש
3. העתק את הקוד מ-`Code.gs`
4. עדכן את ה-`SHEET_ID` ל-ID של הגיליון שלך
5. עדכן את ה-`SHEET_NAME` לשם הטאב שלך (ברירת מחדל: `גיליון1`)
6. שמור

### 3. פריסת Web App

1. לחץ על **Deploy** → **New deployment**
2. בחר **Web app**
3. הגדר:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. לחץ **Deploy**
5. העתק את ה-URL

### 4. עדכון INDEX.HTML

1. פתח את `INDEX.HTML`
2. חפש את `API_ENDPOINT`
3. החלף את ה-URL ב-URL שקיבלת מהפריסה
4. שמור

## שימוש

1. פתח את `INDEX.HTML` בדפדפן
2. לחץ על "מגיע" או "לא מגיע"
3. מלא את הפרטים בטופס
4. שלח

הנתונים ישמרו אוטומטית ב-Google Sheets והרשימות יתעדכנו בזמן אמת.

## טכנולוגיות

- HTML5
- JavaScript (Vanilla)
- Tailwind CSS
- Google Apps Script
- Google Sheets API
- JSONP לעקיפת CORS

## רישיון

MIT

---

נוצר עם ❤️ לכבוד יום חמישי

