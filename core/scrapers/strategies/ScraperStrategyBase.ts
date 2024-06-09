import * as core from '@actions/core';

import { Post } from "@core/models";
import { ScraperStrategy } from './ScraperStrategy';
import { Sender } from '@core/senders';
import { Storage } from '@core/storages/Storage';

export abstract class ScraperStrategyBase implements ScraperStrategy {
  abstract scrape(storage: Storage, sender: Sender): Promise<void>;

  protected printPostHead(post: Post) {
    core.info(`Post title: ${post.title}`);
    core.info(`Post href: ${post.href}`);
  }

  protected printPostBody(post: Post) {
    const json = JSON.stringify(post, null, 2)
      .split('\n')
      .map(line => '  ' + line)
      .join('\n');

    core.startGroup('Post :')
    core.info(json);
    core.endGroup();
  }
}
