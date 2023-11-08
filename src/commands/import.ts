import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CommandInterface } from './commands.interface.js';
import {createOffer} from '../helpers/offer.js';
import chalk from 'chalk';
import {throwErrorMessage} from '../helpers/error';

export default class ImportCommand implements CommandInterface {
  public readonly name = '--import';
  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows successfully imported`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('row', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`${chalk.redBright(`Can't read the file with error: ${throwErrorMessage(err)}`)}`);
    }
  }
}
