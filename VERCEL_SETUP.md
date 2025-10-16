# הוראות הגדרת Vercel עם Environment Variables

## למה זה נדרש?

במקום לחשוף את ה-URL של Apps Script בקוד JavaScript, משתמשים ב-Vercel Serverless Function כ-Proxy. זה מסתיר את ה-URL האמיתי ומספק שכבת אבטחה נוספת.

## שלבים:

### 1. פרס את הפרויקט ב-Vercel

```bash
# אם טרם התקנת Vercel CLI:
npm i -g vercel

# פרס:
vercel
```

### 2. הוסף Environment Variable ב-Vercel

1. לך ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט שלך `russi-inv`
3. לחץ על **Settings**
4. לחץ על **Environment Variables**
5. הוסף משתנה חדש:
   - **Key**: `APPS_SCRIPT_URL`
   - **Value**: `https://script.google.com/macros/s/AKfycbw_Pl6uINIGlwlZnF1tbzFsLb_VYrE5cpMXkWX7sDtMbq79qxw7FkdnGfcV5qqFA6WUiQ/exec`
   - **Environment**: Production, Preview, Development (בחר את כולם)

6. לחץ **Save**

### 3. פרס מחדש (Redeploy)

לאחר הוספת Environment Variable, צריך לפרוס מחדש:

1. לך לטאב **Deployments**
2. בחר את הפריסה האחרונה
3. לחץ על שלוש הנקודות (...) → **Redeploy**

### 4. בדיקה

לאחר הפריסה המחודשת:
- פתח את האתר שלך
- בדוק שאישורי ההגעה עובדים
- פתח Developer Tools → Network
- וודא שהבקשות הולכות ל-`/api/rsvp` ולא ישירות ל-Apps Script

## תכונות אבטחה שהוספנו:

### 1. Rate Limiting (ב-Apps Script)
- מקסימום 50 בקשות לכל משתמש ב-6 דקות
- מקסימום 100 בקשות כוללות בדקה
- מונע שימוש לרעה מסיבי

### 2. URL Hiding (ב-Vercel)
- ה-URL האמיתי של Apps Script מוסתר ב-Environment Variable
- גישה רק דרך Vercel Serverless Function
- קשה יותר למצוא ולנצל את ה-endpoint

## אם אתה רוצה לפתח מקומית:

1. צור קובץ `.env.local` בשורש הפרויקט:
   ```
   APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

2. הרץ:
   ```bash
   vercel dev
   ```

זה ירוץ את הפרויקט במקומי עם ה-Environment Variables.

## תמיכה

אם יש בעיות, בדוק:
- Vercel Logs (Settings → Logs)
- Apps Script Logs (Apps Script Editor → Executions)
- Browser Console (Developer Tools → Console)

