const puppeteer = require('puppeteer');

const urlAlvo = 'http://127.0.0.1:3000/';

const dadosCpfs = [
  '',
  '321651651651',
  '65165165498',
  '1665165161',
  '',
  '13213165165'
];

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    slowMo: 250,
  });
  const page = await browser.newPage();

  try {
    await page.goto(urlAlvo);
    console.log('Acessando site: ' + urlAlvo);
  } catch (error) {
    console.log('Site fora do ar ! = ' + error);
  };

  for (let i = 0; i < dadosCpfs.length; i++) {
    const cpf = dadosCpfs[i];
    if (!cpf) {
      console.log('Não cpf ou está mal formatado!');
    } else {

      await page.waitForSelector('#cpf');
      await page.type('#cpf', cpf);
      await page.keyboard.press('Enter');
      console.log(`Dado => ${cpf} adicionado!`);
    }

  }

  try {
    for (let i = 0; i < dadosCpfs.length; i++) {
      const cpf = dadosCpfs[i];
      if (!cpf) {
        console.log('Não cpf ou está mal formatado!');
      } else {

        await page.waitForSelector('#cpf');
        await page.type('#cpf', cpf);
        await page.keyboard.press('Enter');
        console.log(`Dado => ${cpf} adicionado!`);
      }
    }
  } catch (error) {
    console.log('Dados ou objeto não achado!')
  }


  await browser.close();
})();