"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = tslib_1.__importDefault(require("vue"));
const vue_router_1 = tslib_1.__importDefault(require("vue-router"));
const Home_vue_1 = tslib_1.__importDefault(require("./views/Home.vue"));
vue_1.default.use(vue_router_1.default);
exports.default = new vue_router_1.default({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: Home_vue_1.default,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => Promise.resolve().then(() => tslib_1.__importStar(require(/* webpackChunkName: "about" */ './views/About.vue'))),
        },
    ],
});
//# sourceMappingURL=router.js.map