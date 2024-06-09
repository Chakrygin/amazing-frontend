import { Storage } from '@core/storages/Storage';
import { Scraper } from './Scraper';
import { Sender } from '@core/senders';
import { Post } from '@core/models';
import { ScraperStrategy, ScraperStrategyWithBreakIfPostExists, ScraperStrategyWithContinueIfPostExists } from './strategies';
import { HabrScraperBase } from './shared';
import { HtmlPageHelper, RssFeedHelper } from './helpers';

import RssParser from 'rss-parser';

export abstract class ScraperBase implements Scraper {
  abstract name: string;
  abstract path: string;

  scrape(storage: Storage, sender: Sender): Promise<void> {
    const strategy = this.createScraperStrategy();
    return strategy.scrape(storage, sender);
  }

  protected abstract fetchPosts(): AsyncGenerator<Post>;

  protected enrichPost(post: Post): Promise<Post | null> {
    return Promise.resolve(post);
  }

  protected createScraperStrategy(): ScraperStrategy {
    if (this instanceof HabrScraperBase) {
      return this.createScraperStrategyWithContinueIfPostExists();
    }

    return this.createScraperStrategyWithBreakIfPostExists();
  }

  protected createScraperStrategyWithBreakIfPostExists(): ScraperStrategy {
    const fetchPosts = this.fetchPosts.bind(this);
    const enrichPost = this.enrichPost.bind(this);
    return new ScraperStrategyWithBreakIfPostExists(fetchPosts, enrichPost);
  }

  protected createScraperStrategyWithContinueIfPostExists(): ScraperStrategy {
    const fetchPosts = this.fetchPosts.bind(this);
    const enrichPost = this.enrichPost.bind(this);
    return new ScraperStrategyWithContinueIfPostExists(fetchPosts, enrichPost);
  }

  protected fromHtmlPage(url: string): HtmlPageHelper {
    return new HtmlPageHelper(url);
  }

  protected fromRssFeed<TFeed, TItem>(url: string, options: RssParser.ParserOptions<TFeed, TItem> = {}): RssFeedHelper<TFeed, TItem> {
    return new RssFeedHelper<TFeed, TItem>(url, options);
  }
}
