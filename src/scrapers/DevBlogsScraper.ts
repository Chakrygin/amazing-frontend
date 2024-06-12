import { DevBlogsScraperBase } from '@core/scrapers/shared';

const blogs = {
  'typescript': 'TypeScript',
};

export class DevBlogsScraper extends DevBlogsScraperBase {
  constructor(id: keyof typeof blogs) {
    super(id, blogs[id]);
  }
}
