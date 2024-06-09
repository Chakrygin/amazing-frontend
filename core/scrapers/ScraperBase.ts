import { Storage } from "@core/storages/Storage";
import { Scraper } from "./Scraper";
import { Sender } from "@core/senders";
import { Post } from "@core/models";

export abstract class ScraperBase implements Scraper {
  abstract name: string;
  abstract path: string;

  async scrape(storage: Storage, sender: Sender): Promise<void> {
  }

  protected abstract fetchPosts(): AsyncGenerator<Post>;

  protected enrichPost(post: Post): Promise<Post> {
    return Promise.resolve(post);
  }
}
