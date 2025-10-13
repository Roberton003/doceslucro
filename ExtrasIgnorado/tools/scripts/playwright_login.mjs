import { chromium } from 'playwright';

(async () => {
  const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
  const EMAIL = process.env.EMAIL || 'admin@gidoces.com';
  const PASS = process.env.PASS || 'admin123';

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const seen = { tokenRequest: null, tokenResponse: null, profileResponse: null };

  page.on('request', req => {
    if (req.url().includes('/api/token/') && req.method() === 'POST') {
      seen.tokenRequest = { url: req.url(), method: req.method(), postData: req.postData() };
    }
  });

  page.on('response', async res => {
    try {
      if (res.url().includes('/api/token/') && res.request().method() === 'POST') {
        const body = await res.text();
        seen.tokenResponse = { status: res.status(), url: res.url(), body };
      }
      if (res.url().includes('/api/users/profile/')) {
        const body = await res.text();
        seen.profileResponse = { status: res.status(), url: res.url(), body };
      }
    } catch (e) {
      // ignore
    }
  });

  console.log('[playwright] opening', FRONTEND);
  await page.goto(FRONTEND, { waitUntil: 'networkidle' });

  // Fill the login form. Use type selectors as in the React app.
  await page.fill('input[type="email"]', EMAIL).catch(() => {});
  await page.fill('input[type="password"]', PASS).catch(() => {});

  // Submit and wait for token response and profile response
  const [tokenRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/token/') && r.request().method() === 'POST', { timeout: 5000 }).catch(() => null),
    page.click('button[type="submit"]')
  ]);

  if (!tokenRes && !seen.tokenResponse) {
    console.warn('[playwright] token response not captured');
  }

  // wait a bit for profile request triggered by the app
  await page.waitForTimeout(1000);

  // read localStorage
  const storage = await page.evaluate(() => ({
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token')
  }));

  console.log('\n--- CAPTURED REQUEST/RESPONSE ---');
  console.log('tokenRequest:', JSON.stringify(seen.tokenRequest, null, 2));
  console.log('tokenResponseStatus:', seen.tokenResponse && seen.tokenResponse.status);
  console.log('tokenResponseBodySnippet:', seen.tokenResponse && seen.tokenResponse.body && seen.tokenResponse.body.slice(0,500));
  console.log('profileResponseStatus:', seen.profileResponse && seen.profileResponse.status);
  console.log('profileResponseBodySnippet:', seen.profileResponse && seen.profileResponse.body && seen.profileResponse.body.slice(0,500));
  console.log('localStorage:', storage);

  await browser.close();
  process.exit(0);
})();
