import {FileWriterInterface} from './file-writer.interface.js';
import {createWriteStream, WriteStream} from 'node:fs';
import {CHUCK_SIZE} from '../helpers/constants.js';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: CHUCK_SIZE,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (this.stream.write(`${row}\n`)) {
      return Promise.resolve();
    } else {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
  }
}
