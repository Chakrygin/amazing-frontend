import { Post } from '@core/models';
import { ScraperBase } from '../ScraperBase';

export abstract class HabrScraperBase extends ScraperBase {
  constructor(
    private readonly id: string,
    private readonly title: string) {
    super();
  }

  protected override fetchPosts(): AsyncGenerator<Post> {
    throw new Error();
  }
}
