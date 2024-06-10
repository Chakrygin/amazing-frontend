import path from 'path';

import { Scraper } from '../scrapers';
import { createSender } from '../senders';
import { PostStorage } from '../storages';
import { getInput, getKnownHosts } from '../utils';

export async function testScraper(createScraper: (knownHosts: readonly string[]) => Scraper): Promise<void> {
  const TELEGRAM_TOKEN = getInput('TELEGRAM_PRIVATE_TOKEN');
  const TELEGRAM_CHAT_ID = getInput('TELEGRAM_PRIVATE_CHAT_ID');

  const knownHosts = getKnownHosts(
    path.join(process.cwd(), 'data'));
  const scraper = createScraper(knownHosts);
  const storage = new PostStorage(
    path.join(process.cwd(), 'tmp'));
  const sender = createSender(TELEGRAM_TOKEN, TELEGRAM_CHAT_ID);

  await scraper.scrape(storage, sender);
}
