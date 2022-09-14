const { Cluster } = require('puppeteer-cluster');

const urlAlvo = 'http://127.0.0.1:3000'

const dadosCpfs = [
  '',
  '321651651651',
  '65165165498',
  '1665165161',
  '',
  '13213165165'
];

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
    monitor: true
  });

  const adddata = async ({ page, data: nrcpf }) => {
    await page.goto(urlAlvo);
    await page.waitForSelector('#cpf');
    await page.type('#cpf', nrcpf);
    await page.keyboard.press('Enter');
    console.log(`Dado => ${nrcpf} adicionado!`);
  };

  for (let i = 0; i < dadosCpfs.length; i++) {
    const cpf = dadosCpfs[i];
    cluster.queue([cpf], adddata);

  }



  await cluster.idle();
  await cluster.close();

})();