import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable';
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';
const EMAIL = process.env.EMAIL || 'admin@gidoces.com';
const PASS = process.env.PASS || 'admin123';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const seen = { requests: [] };

  page.on('request', req => {
    if (req.url().includes('/api/token/') || req.url().includes('/api/users/profile/')) {
      seen.requests.push({ url: req.url(), method: req.method(), postData: req.postData() });
    }
  });

  page.on('response', async res => {
    if (res.url().includes('/api/token/') || res.url().includes('/api/users/profile/')) {
      try {
        const t = await res.text();
        seen.requests.push({ url: res.url(), status: res.status(), body: t.slice(0,2000) });
      } catch (e) {}
    }
  });

  console.log('[puppeteer] goto', FRONTEND);
  await page.goto(FRONTEND, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(500);

  // Fill and submit
  await page.type('input[type=email]', EMAIL).catch(()=>{});
  await page.type('input[type=password]', PASS).catch(()=>{});
  await Promise.all([
    page.click('button[type=submit]'),
    page.waitForResponse(r => r.url().includes('/api/token/') && r.request().method() === 'POST', { timeout: 5000 }).catch(()=>null)
  ]);

  await page.waitForTimeout(1000);
  const local = await page.evaluate(()=>({ access: localStorage.getItem('access_token'), refresh: localStorage.getItem('refresh_token') }));

  console.log('\n--- CAPTURED ---');
  console.log(JSON.stringify(seen.requests, null, 2));
  console.log('\nlocalStorage:', local);

  await browser.close();
  process.exit(0);
})();
