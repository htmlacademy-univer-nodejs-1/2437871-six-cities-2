import {FileReaderInterface} from './file-reader.interface.js';
import EventEmitter from 'node:events';
import {createReadStream} from 'node:fs';
import {CHUCK_SIZE} from '../helpers/constants.js';
export default class TSVFileReader extends EventEmitter implements FileReaderInterface {

  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: CHUCK_SIZE,
      encoding: 'utf-8',
    });

    let data = '';
    let nextLinePos = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      data += chunk.toString();

      while ((nextLinePos = data.indexOf('\n')) >= 0) {
        const completeRow = data.slice(0, nextLinePos + 1);
        data = data.slice(++nextLinePos);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('row', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
