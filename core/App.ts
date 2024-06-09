import * as core from '@actions/core'

export class App {
  async run(): Promise<void> {
    core.info('Hello, GitHub Action!');
  }
}
