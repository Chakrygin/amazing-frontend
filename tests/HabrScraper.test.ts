import { testScraper } from '@core/testing';

import { HabrScraper } from '@src/scrapers/HabrScraper';

test('Habr / JavaScript', async () => {
  await testScraper(() => new HabrScraper('javascript'));
});

test('Habr / TypeScript', async () => {
  await testScraper(() => new HabrScraper('typescript'));
});
