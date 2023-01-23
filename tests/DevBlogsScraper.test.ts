import { testScraper } from 'core/testing';

import DevBlogsScraper from '../src/scrapers/DevBlogsScraper'

test('DevBlogs / TypeScript', async () => {
  await testScraper(() => new DevBlogsScraper('typescript'));
});
