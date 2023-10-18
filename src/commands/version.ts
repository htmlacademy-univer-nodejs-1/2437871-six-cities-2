import {readFileSync} from 'node:fs';
import {CommandInterface} from './commands.interface.js';
import chalk from 'chalk';

export default class VersionCommand implements CommandInterface {
  public readonly name = '--version';

  public async execute(): Promise<void> {
    const data = readFileSync('../package.json', 'utf-8');
    const content = JSON.parse(data);
    console.log(`${chalk.greenBright(content.version)}`);
  }
}
