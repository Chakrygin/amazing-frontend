import * as core from '@actions/core';

import path from 'path';

import { AppConfig } from './AppConfig';

import { Scraper } from './scrapers';
import { LastErrorStorage, LastUpdateStorage } from './storages';

export class AppRunner {
  constructor(
    private readonly config: AppConfig,
    private readonly scrapers: readonly Scraper[]) { }

  private readonly lastErrors = new LastErrorStorage(
    path.join(this.config.path, 'errors.json'));

  private readonly lastUpdates = new LastUpdateStorage(
    path.join(this.config.path, 'updates.json'));

  async run(): Promise<void> {
    for (const scraper of this.scrapers) {
      await core.group(scraper.name, async () => {
        try {
          await scraper.scrape();
        }
        catch (error) {
          if (error instanceof Error) {
            // if (lastError) {
            //   process.exitCode = 1;

            //   core.error(error, {
            //     title: `The '${scraper.name}' scraper failed.`,
            //   });
            // }
            // else {
            //   core.warning(error, {
            //     title: `The '${scraper.name}' scraper failed.`,
            //   });
            // }

            // this.lastErrors.set(scraper.name, error);
          }
        }
      });
    }
  }
}
