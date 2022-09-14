const puppeteer = require('puppeteer');

// const urlAlvo = 'https://www.google.com';
const urlAlvoArr = [
  'https://github.com/pedroalpacheco',
  'https://www.google.com.br',
  'https://pedropachecodev.com.br/'
];

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  for (let i = 0; i < urlAlvoArr.length; i++) {
    const url = urlAlvoArr[i];
    try {
      await page.goto(url);
      console.log('Acessando site: ' + url)


    } catch (error) {
      console.log('Site fora do ar ! = ' + url);
    }

    try {
      await page.waitForSelector('.gLFyf.gsfi');
      const titulo = await page.evaluate(() => document.title);
      console.log(titulo);
    } catch (error) {
      console.log('Elemento não achado!');
    }

  }





  await browser.close();
})();