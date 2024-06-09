import { Sender } from "@core/senders";
import { Storage } from "@core/storages/Storage";

export interface Scraper {
  readonly name: string;
  readonly path: string;

  scrape(storage: Storage, sender: Sender): Promise<void>;
}
