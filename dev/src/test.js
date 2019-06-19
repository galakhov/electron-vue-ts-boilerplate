"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vuetify_cloudinary_upload_1 = tslib_1.__importDefault(require("vuetify-cloudinary-upload"));
const project = vuetify_cloudinary_upload_1.default.readDirectory(__dirname + '/..', {
    fileTransform: (file) => {
        return file.fullpath;
    },
});
console.log(JSON.stringify(project, null, 2));
//# sourceMappingURL=test.js.map