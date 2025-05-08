const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  // Akceptacja cookies (jeśli się pojawi)
  try {
    await page.click('button:has-text("Zgadzam się")', { timeout: 2000 });
  } catch (e) {}

  await page.fill('input[name="q"]', 'Jak pisać i klikać bez GUI?');
  await page.keyboard.press('Enter');

  await page.waitForSelector('h3');

  const titles = await page.$$eval('h3', elements => elements.map(el => el.textContent));
  console.log('🔍 Wyniki wyszukiwania:');
  titles.forEach((title, i) => console.log(`${i + 1}. ${title}`));

  await browser.close();
})();
