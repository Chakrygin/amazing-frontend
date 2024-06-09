import { Sender } from '@core/senders';
import { Storage } from '@core/storages';

export interface ScraperStrategy {
  scrape(storage: Storage, sender: Sender): Promise<void>;
}
