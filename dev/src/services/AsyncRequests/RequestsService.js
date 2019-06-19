"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
// import Catch from '@/decorators/catchDecorator';
// @Catch
class RequestsService {
    // constructor() {}
    constructor(fileId = 0, textFileContent = '') {
        this.fileId = fileId;
        this.textFileContent = textFileContent;
        this.fileId = fileId;
        this.textFileContent = textFileContent;
    }
    initialize() {
        this.fileId = 0;
        this.textFileContent = '';
    }
    readFileInAsyncWay(path, opts = 'utf8') {
        // Promise Wrapping
        return new Promise((resolve, reject) => {
            fs.readFile(path, opts, (err, data) => {
                if (err) {
                    console.log('error reading the file...', path);
                    reject(err);
                    return;
                }
                else {
                    // No error occurred, content is a string
                    return resolve(data);
                }
            });
        });
    }
    openAndRead(filePath) {
        let textFileContent;
        try {
            // filehandle = await this.fsPromises.open(filePath, 'r');
            this.readFileInAsyncWay(filePath).then(content => {
                if (content !== undefined) {
                    textFileContent = content;
                    console.log('where is it?!', content);
                }
                else {
                    textFileContent = 'No content could be read.';
                }
                return textFileContent;
            });
        }
        catch (err) {
            console.error(err.message);
        }
        // finally {
        //   if (textFileContent !== undefined) {
        //     // await filehandle.close();
        //     return textFileContent;
        //   }
        // }
    }
}
// Export a singleton instance in the global namespace
exports.requestsService = new RequestsService();
//# sourceMappingURL=RequestsService.js.map