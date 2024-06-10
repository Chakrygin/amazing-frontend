import { Scraper } from "@core/scrapers";
import { getKnownHosts } from "@core/utils";
import path from "path";

export async function testScraper(createScraper: (knownHosts: readonly string[]) => Scraper): Promise<void> {
  // const TELEGRAM_PRIVATE_TOKEN = getInput('TELEGRAM_PRIVATE_TOKEN');
  // const TELEGRAM_PRIVATE_CHAT_ID = getInput('TELEGRAM_PRIVATE_CHAT_ID');

  const knownHosts = getKnownHosts(
    path.join(process.cwd(), 'data'));
  const scraper = createScraper(knownHosts);
  const sender = createSender(TELEGRAM_TOKEN, TELEGRAM_CHAT_ID);
  const storage = new PostStorage(
    path.join(process.cwd(), 'data', 'tmp'),
    getPostId);

  await scraper.scrape(sender, storage);
}
