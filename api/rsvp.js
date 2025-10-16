// Vercel Serverless Function - Proxy ל-Apps Script
// זה מסתיר את ה-URL האמיתי של Apps Script

export default async function handler(req, res) {
  // הגדרת CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // תשובה ל-preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ה-URL של Apps Script מוסתר ב-Environment Variables
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;
  
  if (!APPS_SCRIPT_URL) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { action, sessionId, name, status, reason } = req.method === 'POST' 
      ? req.body 
      : req.query;

    // בניית URL עם הפרמטרים
    const params = new URLSearchParams({
      action: action || 'getRsvps',
      ...(sessionId && { sessionId }),
      ...(name && { name }),
      ...(status && { status }),
      ...(reason && { reason })
    });

    const fullUrl = `${APPS_SCRIPT_URL}?${params.toString()}`;

    // קריאה ל-Apps Script
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Apps Script returned ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
}

