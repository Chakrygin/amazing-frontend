export interface Scraper {
  readonly name: string;
  readonly path: string;

  scrape(): Promise<void>;
}
