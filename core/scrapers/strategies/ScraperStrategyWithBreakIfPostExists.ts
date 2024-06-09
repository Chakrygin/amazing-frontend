import * as core from '@actions/core';

import { Sender } from '@core/senders';
import { Storage } from '@core/storages';
import { ScraperStrategyBase } from './ScraperStrategyBase';
import { Post } from '@core/models';

export class ScraperStrategyWithBreakIfPostExists extends ScraperStrategyBase {
  constructor(
    private readonly fetchPosts: () => AsyncGenerator<Post>,
    private readonly enrichPost: (post: Post) => Promise<Post | null>) {
    super();
  }

  async scrape(storage: Storage, sender: Sender): Promise<void> {
    // let firstPostDate: moment.Moment | undefined;

    for await (const fetchedPost of this.fetchPosts()) {
      this.printPostHead(fetchedPost);

      //   if (storage.has(post.href)) {
      //     core.info('The post already exists in the storage. Break scraping.');
      //     break;
      //   }

      //   if (!firstPostDate) {
      //     firstPostDate = post.date;
      //   }
      //   else if (firstPostDate.diff(post.date, 'day') >= 1) {
      //     core.info('The post is too old. Break scraping.');
      //     break;
      //   }

      //   const enrichedPost = await this.enrichPost(post);

      //   if (!enrichedPost) {
      //     core.info('The post is not interesting. Continue scraping.');
      //     continue;
      //   }

      //   this.printPostJson(post);

      //   core.info('Sending the post...');
      //   await sender.send(enrichedPost);

      //   core.info('Storing the post...');
      //   storage.add(enrichedPost.href);
    }
  }
}
