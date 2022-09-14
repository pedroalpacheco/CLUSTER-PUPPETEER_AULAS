const { Cluster } = require('puppeteer-cluster');

const urls = [
  'https://www.google.com',
  'https://www.wikipedia444.org',
  'https://github.com'
];

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 3,
    puppeteerOptions: {
      // headless: false,
      // slowMo: 550,

    }
  });
  cluster.on('taskerror', (err, data) => {
    console.log(`Erro de ${data}: ${err.message}`);
  })

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    const hrefs = await page.$$eval('a', as => as.map(a => a.href));
    const nrLinks = hrefs.length;

    console.log(`SITE:${url},
                TOTAL DE LINKS: ${nrLinks},
                LINKS+>
                ${hrefs}
    `)
  });
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    cluster.queue(url);


  }

  await cluster.idle();
  await cluster.close();

})();