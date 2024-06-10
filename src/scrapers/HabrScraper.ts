import { HabrScraperBase } from "@core/scrapers/shared";

const hubs = {
  'javascript': 'JavaScript',
  'typescript': 'TypeScript',
};

export class HabrScraper extends HabrScraperBase {
  constructor(id: keyof typeof hubs) {
    super(id, hubs[id]);
  }
}
