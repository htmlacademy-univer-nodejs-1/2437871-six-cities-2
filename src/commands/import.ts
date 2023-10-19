import TSVFileReader from '../file-reader/tsv-file-reader.interface.js';
import { CommandInterface } from './commands.interface.js';

export default class ImportCommand implements CommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
