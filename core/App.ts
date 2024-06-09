import * as core from '@actions/core'
import * as github from '@actions/github'

import path from 'path';

import { AppConfig } from './AppConfig';
import { AppRunner } from './AppRunner';

import { Scraper } from './scrapers';

import { getInput, getKnownHosts } from './utils';

export class App {
  constructor(
    private readonly createScrapers: (knownHosts: readonly string[]) => readonly Scraper[]) { }

  async run(): Promise<void> {
    try {

      // // Setup default axios retries.
      // axiosRetry(axios, {
      //   retryDelay: retryNumber => axiosRetry.exponentialDelay(retryNumber),
      // });

      // // Setup default moment locale.
      // moment.locale('en');

      // const TELEGRAM_TOKEN = getInput('TELEGRAM_TOKEN');
      // const TELEGRAM_PUBLIC_CHAT_ID = getInput('TELEGRAM_PUBLIC_CHAT_ID');
      // const TELEGRAM_PRIVATE_CHAT_ID = getInput('TELEGRAM_PRIVATE_CHAT_ID');

      const config = this.createConfig();
      const knownHosts = getKnownHosts(config.path);
      const scrapers = this.createScrapers(knownHosts);

      const runner = new AppRunner(config, scrapers);
      await runner.run();

      // this.setCommitMessage(updatedScraperNames);
    }
    catch (error: unknown) {
      core.setFailed(error as Error);
    }
  }

  private createConfig(): AppConfig {
    const config: AppConfig = {
      path: path.join(process.cwd(), 'data'),
      debug: github.context.ref !== 'refs/heads/main',
      manual: github.context.eventName !== 'schedule',
    };

    return config;
  }
}
