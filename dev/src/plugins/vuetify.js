"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const vuetify_1 = tslib_1.__importDefault(require("vuetify"));
require("vuetify/dist/vuetify.min.css");
vue_1.default.use(vuetify_1.default, {
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
    },
    options: {
        customProperties: true,
    },
    iconfont: 'fa',
});
//# sourceMappingURL=vuetify.js.map