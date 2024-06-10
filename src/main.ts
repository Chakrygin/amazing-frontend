import { App } from '@core/App';

import { DevBlogsScraper } from './scrapers/DevBlogsScraper';
import { HabrScraper } from './scrapers/HabrScraper';

const app = new App(() => [
  new DevBlogsScraper('typescript'),
  new HabrScraper('javascript'),
  new HabrScraper('typescript'),
]);

void app.run();
