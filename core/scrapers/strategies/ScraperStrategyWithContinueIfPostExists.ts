import * as core from '@actions/core';

import { Post } from '@core/models';
import { ScraperStrategyBase } from './ScraperStrategyBase';
import { Sender } from '@core/senders';
import { Storage } from '@core/storages';

export class ScraperStrategyWithContinueIfPostExists extends ScraperStrategyBase {
  constructor(
    private readonly fetchPosts: () => AsyncGenerator<Post>,
    private readonly enrichPost: (post: Post) => Promise<Post | null>) {
    super();
  }

  async scrape(storage: Storage, sender: Sender): Promise<void> {
    for await (const fetchedPost of this.fetchPosts()) {
      this.printPostHead(fetchedPost);

      if (storage.has(fetchedPost.href)) {
        core.info('The post already exists in the storage. Continue scraping.');
        continue;
      }

      const enrichedPost = await this.enrichPost(fetchedPost);

      if (!enrichedPost) {
        core.info('The post is not interesting. Continue scraping.');
        continue;
      }

      this.printPostBody(enrichedPost);

      core.info('Sending the post...');
      await sender.send(enrichedPost);

      core.info('Storing the post...');
      storage.add(enrichedPost.href);
    }
  }
}
