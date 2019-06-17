import * as fs from 'fs';
// import Catch from '@/decorators/catchDecorator';

// @Catch
class RequestsService {
  // constructor() {}

  constructor(public fileId: number = 0, public textFileContent: string = '') {
    this.fileId = fileId;
    this.textFileContent = textFileContent;
  }

  initialize() {
    this.fileId = 0;
    this.textFileContent = '';
  }

  readFileInAsyncWay(path: string, opts = 'utf8') {
    // Promise Wrapping
    return new Promise<string>((resolve, reject) => {
      fs.readFile(path, opts, (err, data) => {
        if (err) {
          console.log('error reading the file...', path);
          reject(err);
          return;
        } else {
          // No error occurred, content is a string
          return resolve(data);
        }
      });
    });
  }

  // openAndRead(filePath: string) {
  //   let textFileContent;
  //   try {
  //     // filehandle = await this.fsPromises.open(filePath, 'r');
  //     this.readFileInAsyncWay(filePath).then(content => {
  //       if (content !== undefined) {
  //         textFileContent = content;
  //         console.log('where is it?!', content);
  //       } else {
  //         textFileContent = 'No content could be read.';
  //       }
  //       return textFileContent;
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  //   finally {
  //     if (textFileContent !== undefined) {
  //       // await filehandle.close();
  //       return textFileContent;
  //     }
  //   }
  // }
}

// Export a singleton instance in the global namespace
export const requestsService = new RequestsService();
