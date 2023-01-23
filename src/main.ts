import { App } from 'core';

import DevBlogsScraper from './scrapers/DevBlogsScraper'
import HabrScraper from './scrapers/HabrScraper'

const app = new App(() => [
  new DevBlogsScraper('typescript'),
  new HabrScraper('javascript', { minRating: 10 }),
  new HabrScraper('typescript', { minRating: 10 }),
]);

void app.run();
