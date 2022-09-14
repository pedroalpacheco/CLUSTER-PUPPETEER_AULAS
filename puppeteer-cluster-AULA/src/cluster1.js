const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
    monitor: true
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    const countUrls = await page.$$eval('a[href]', urls => urls.length);
    console.log(`O site ${url} tem ${countUrls} URLS`)
  });

  cluster.queue('https://www.wikipedia.org');
  cluster.queue('https://www.google.com');
  cluster.queue('https://www.github.com');

  await cluster.idle();
  await cluster.close();

})();