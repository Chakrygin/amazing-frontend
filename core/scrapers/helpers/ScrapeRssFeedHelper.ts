import * as core from '@actions/core';

import RssParser from 'rss-parser';

import { Post } from '../models';

export class ScrapeRssFeedHelper<TFeed, TItem> {
  constructor(
    private readonly url: string,
    private readonly options: RssParser.ParserOptions<TFeed, TItem>) { }
}
